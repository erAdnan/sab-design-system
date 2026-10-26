#import <React/RCTComponent.h>
#import <UIKit/UIKit.h>

#if __has_include("SabDesignSystem-Swift.h")
#import "SabDesignSystem-Swift.h"
#else
#import "SabDesignSystem/SabDesignSystem-Swift.h"
#endif

static void SABInsertReactSubview(UIView *container, UIView *subview, NSInteger atIndex)
{
  if ([container isKindOfClass:[UIVisualEffectView class]]) {
    UIVisualEffectView *effectView = (UIVisualEffectView *)container;
    [effectView.contentView insertSubview:subview atIndex:atIndex];
    effectView.contentView.userInteractionEnabled = YES;
    return;
  }

  [container insertSubview:subview atIndex:atIndex];
}

/**
 * Real children of a `UIVisualEffectView`-backed container live in
 * `effectView.contentView`, not in `container.subviews` directly.
 *
 * This matters because `-reactSubviews` (the default `UIView (React)`
 * category implementation) is backed by its own associated-object array
 * that is only populated by the *default* `insertReactSubview:`/
 * `removeReactSubview:`, which we override below and never call `super`
 * on. Left unfixed, `-reactSubviews` always reports empty/stale for our
 * view — and Fabric's Legacy Interop Layer
 * (`RCTLegacyViewManagerInteropComponentView`) uses
 * `index == paperView.reactSubviews.count` / `index < ...count` to decide
 * whether to detach a child immediately. With a permanently-empty count,
 * `unmountChildComponentView:` never takes the immediate-removal branch and
 * instead defers to a `_viewsToBeUnmounted` list that is only flushed on a
 * subsequent `finalizeUpdates:` — which never arrives when this whole view
 * is being torn down as part of a screen pop. The child is then still
 * attached to `contentView` when Fabric tries to recycle it, tripping
 * RN's `RCTAssert(componentViewDescriptor.view.superview == nil, ...)`
 * ("Attempt to recycle a mounted view") and crashing with SIGABRT.
 *
 * Returning `contentView.subviews` here keeps the interop layer's
 * bookkeeping accurate so children are detached synchronously and
 * reliably, even during a full screen unmount.
 */
static NSArray<UIView *> *SABReactSubviews(UIView *container)
{
  if ([container isKindOfClass:[UIVisualEffectView class]]) {
    return ((UIVisualEffectView *)container).contentView.subviews;
  }
  return container.subviews;
}

/**
 * Neutralizes an active (especially `isInteractive`) UIGlassEffect *before*
 * a React child is detached from `contentView`.
 *
 * Root cause of the back-navigation crash: `UIGlassEffect.isInteractive`
 * makes UIKit privately track touches against whatever child view sits
 * under the glass. Under Fabric's Legacy Interop Layer, that child gets
 * unmounted (removeReactSubview:) while the outer glass view can still be
 * momentarily alive/recycled — if the effect is still active at that
 * instant, UIKit's private tracking is left holding a stale reference to
 * the just-removed child, which the OS reads on the next frame ->
 * EXC_BAD_ACCESS. Clearing the effect synchronously right before removal
 * severs that reference safely. `layoutSubviews` (Swift side) reapplies the
 * glass on the next layout pass if the view is still alive and not tearing
 * down, so normal (non-teardown) child updates are unaffected visually.
 */
static void SABNeutralizeGlassBeforeRemoval(UIView *container)
{
  if (![container isKindOfClass:[UIVisualEffectView class]]) {
    return;
  }

  UIVisualEffectView *effectView = (UIVisualEffectView *)container;
  if (effectView.effect == nil) {
    return;
  }

  [UIView performWithoutAnimation:^{
    effectView.effect = nil;
  }];
}

/**
 * Route React Native children into UIVisualEffectView.contentView without
 * overriding addSubview (which causes EXC_BAD_ACCESS / infinite recursion).
 */
@implementation SABLiquidGlassViewImpl (ReactSubview)

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
  SABInsertReactSubview(self, subview, atIndex);
}

- (void)removeReactSubview:(UIView *)subview
{
  SABNeutralizeGlassBeforeRemoval(self);

  // Guard against a redundant removal racing with our own teardown
  // (willMove(toSuperview:nil) / removeFromSuperview) during screen pop.
  if (subview.superview != nil) {
    [subview removeFromSuperview];
  }
}

- (NSArray<UIView *> *)reactSubviews
{
  return SABReactSubviews(self);
}

// Insertion already happens synchronously in `insertReactSubview:atIndex:`
// above; the default `UIView (React)` implementation of this method would
// re-`addSubview:` each subview onto `self` (moving it out of
// `contentView`, since `addSubview:` re-parents), which would silently
// break the glass-content layering. No-op is correct here.
- (void)didUpdateReactSubviews
{
}

@end

@implementation SABLiquidGlassContainerViewImpl (ReactSubview)

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
  SABInsertReactSubview(self, subview, atIndex);
}

- (void)removeReactSubview:(UIView *)subview
{
  SABNeutralizeGlassBeforeRemoval(self);

  if (subview.superview != nil) {
    [subview removeFromSuperview];
  }
}

- (NSArray<UIView *> *)reactSubviews
{
  return SABReactSubviews(self);
}

- (void)didUpdateReactSubviews
{
}

@end
