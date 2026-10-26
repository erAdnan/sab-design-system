#import <UIKit/UIKit.h>
#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>
#import <React/RCTComponent.h>

@interface SABNativeSegmentedControlView : UIView
@property (nonatomic, strong) UISegmentedControl *segmentedControl;
@property (nonatomic, strong) NSMutableArray<UIView *> *overlayViews;
@property (nonatomic, copy) NSArray<NSDictionary *> *items;
@property (nonatomic, assign) NSInteger selectedIndex;
@property (nonatomic, assign) BOOL iconMode;
@property (nonatomic, copy) RCTBubblingEventBlock onChange;
- (void)rebuildSegments;
- (void)applyImagesFromOverlays;
@end

@implementation SABNativeSegmentedControlView

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    self.backgroundColor = UIColor.clearColor;
    self.clipsToBounds = NO;
    _selectedIndex = 0;
    _overlayViews = [NSMutableArray array];

    _segmentedControl = [[UISegmentedControl alloc] initWithItems:@[]];
    _segmentedControl.translatesAutoresizingMaskIntoConstraints = YES;
    _segmentedControl.apportionsSegmentWidthsByContent = YES;
    _segmentedControl.clipsToBounds = NO;
    [_segmentedControl addTarget:self
                          action:@selector(handleValueChanged:)
                forControlEvents:UIControlEventValueChanged];
    [self addSubview:_segmentedControl];
  }
  return self;
}

- (UIImage *)placeholderIcon
{
  CGSize size = CGSizeMake(24, 24);
  UIGraphicsBeginImageContextWithOptions(size, NO, 0);
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return image ?: [[UIImage alloc] init];
}

- (UIImage *)paddedIconImage:(UIImage *)image
{
  if (image == nil) {
    return nil;
  }

  CGFloat horizontalPad = 2.0;
  CGFloat verticalPad = 2.0;
  CGSize size = CGSizeMake(
    image.size.width + horizontalPad * 2.0,
    image.size.height + verticalPad * 2.0
  );

  UIGraphicsBeginImageContextWithOptions(size, NO, image.scale);
  [image drawInRect:CGRectMake(horizontalPad, verticalPad, image.size.width, image.size.height)];
  UIImage *padded = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return padded ?: image;
}

- (UIImage *)snapshotView:(UIView *)view
{
  CGSize size = view.bounds.size;
  if (size.width < 1 || size.height < 1) {
    size = view.intrinsicContentSize;
  }
  if (size.width < 1 || size.height < 1) {
    size = CGSizeMake(24, 24);
  }

  UIGraphicsBeginImageContextWithOptions(size, NO, [UIScreen mainScreen].scale);
  CGContextRef context = UIGraphicsGetCurrentContext();
  if (context == NULL) {
    UIGraphicsEndImageContext();
    return nil;
  }
  [view.layer renderInContext:context];
  UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return image;
}

- (void)setItems:(NSArray *)items
{
  NSMutableArray<NSDictionary *> *normalized = [NSMutableArray array];
  for (id item in items) {
    if (![item isKindOfClass:[NSDictionary class]]) {
      continue;
    }
    NSDictionary *dict = (NSDictionary *)item;
    NSString *title = [dict[@"title"] isKindOfClass:[NSString class]] ? dict[@"title"] : @"";
    BOOL hasIcon = [dict[@"hasIcon"] boolValue];
    BOOL disabled = [dict[@"disabled"] boolValue];
    [normalized addObject:@{
      @"title": title,
      @"hasIcon": @(hasIcon),
      @"disabled": @(disabled),
    }];
  }

  if ([_items isEqualToArray:normalized]) {
    [self applyImagesFromOverlays];
    return;
  }

  _items = [normalized copy];
  [self rebuildSegments];
}

- (void)rebuildSegments
{
  [_segmentedControl removeAllSegments];

  BOOL anyIcon = NO;
  for (NSDictionary *item in _items) {
    if ([item[@"hasIcon"] boolValue]) {
      anyIcon = YES;
      break;
    }
  }
  _iconMode = anyIcon;
  _segmentedControl.apportionsSegmentWidthsByContent = !anyIcon;

  [_items enumerateObjectsUsingBlock:^(NSDictionary *item, NSUInteger idx, BOOL *stop) {
    NSString *title = item[@"title"];
    BOOL hasIcon = [item[@"hasIcon"] boolValue];
    BOOL disabled = [item[@"disabled"] boolValue];

    if (hasIcon) {
      [self.segmentedControl insertSegmentWithImage:[self paddedIconImage:[self placeholderIcon]]
                                            atIndex:idx
                                           animated:NO];
      [self.segmentedControl setWidth:0 forSegmentAtIndex:idx];
    } else {
      [self.segmentedControl insertSegmentWithTitle:title atIndex:idx animated:NO];
    }
    [self.segmentedControl setEnabled:!disabled forSegmentAtIndex:idx];
  }];

  [self applySelectedIndex];
  [self applyImagesFromOverlays];
}

- (void)setSelectedIndex:(NSInteger)selectedIndex
{
  _selectedIndex = selectedIndex;
  [self applySelectedIndex];
}

- (void)applySelectedIndex
{
  if (self.segmentedControl.numberOfSegments == 0) {
    return;
  }

  NSInteger lastIndex = (NSInteger)self.segmentedControl.numberOfSegments - 1;
  NSInteger clamped = MAX(0, MIN(self.selectedIndex, lastIndex));
  if (self.segmentedControl.selectedSegmentIndex != clamped) {
    self.segmentedControl.selectedSegmentIndex = clamped;
  }
}

- (void)applyImagesFromOverlays
{
  if (!self.iconMode || self.overlayViews.count == 0) {
    return;
  }

  [self.overlayViews enumerateObjectsUsingBlock:^(UIView *view, NSUInteger idx, BOOL *stop) {
    if (idx >= (NSUInteger)self.segmentedControl.numberOfSegments ||
        idx >= self.items.count) {
      return;
    }
    if (![self.items[idx][@"hasIcon"] boolValue]) {
      return;
    }

    view.hidden = NO;
    view.alpha = 1;
    if (CGRectGetWidth(view.bounds) < 1 || CGRectGetHeight(view.bounds) < 1) {
      view.bounds = CGRectMake(0, 0, 24, 24);
    }

    UIImage *image = [self paddedIconImage:[self snapshotView:view]];
    if (image != nil) {
      [self.segmentedControl setImage:[image imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal]
                    forSegmentAtIndex:idx];
    }
    view.hidden = YES;
    view.userInteractionEnabled = NO;
  }];
}

- (void)layoutSubviews
{
  [super layoutSubviews];
  self.segmentedControl.frame = self.bounds;

  if (self.iconMode && self.segmentedControl.numberOfSegments > 0) {
    NSInteger count = self.segmentedControl.numberOfSegments;
    CGFloat total = CGRectGetWidth(self.bounds);
    CGFloat baseWidth = floor(total / (CGFloat)count);
    CGFloat used = 0;
    for (NSInteger index = 0; index < count; index++) {
      CGFloat width = (index == count - 1) ? (total - used) : baseWidth;
      [self.segmentedControl setWidth:width forSegmentAtIndex:index];
      used += width;
    }
  }

  [self applyImagesFromOverlays];
}

- (void)handleValueChanged:(UISegmentedControl *)sender
{
  _selectedIndex = sender.selectedSegmentIndex;
  if (self.onChange) {
    self.onChange(@{@"selectedIndex": @(sender.selectedSegmentIndex)});
  }
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
  subview.userInteractionEnabled = NO;
  subview.backgroundColor = UIColor.clearColor;
  if (atIndex >= 0 && atIndex <= (NSInteger)self.overlayViews.count) {
    [self.overlayViews insertObject:subview atIndex:atIndex];
  } else {
    [self.overlayViews addObject:subview];
  }
  [self insertSubview:subview aboveSubview:self.segmentedControl];
  [self setNeedsLayout];
}

- (void)removeReactSubview:(UIView *)subview
{
  [self.overlayViews removeObject:subview];
  [subview removeFromSuperview];
}

- (NSArray<UIView *> *)reactSubviews
{
  return [self.overlayViews copy];
}

- (void)didUpdateReactSubviews
{
  [self applyImagesFromOverlays];
  __weak SABNativeSegmentedControlView *weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    [weakSelf applyImagesFromOverlays];
  });
}

@end

@interface SABNativeSegmentedControlViewManager : RCTViewManager
@end

@implementation SABNativeSegmentedControlViewManager

RCT_EXPORT_MODULE(SABNativeSegmentedControl)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  return [[SABNativeSegmentedControlView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(items, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(colorScheme, NSString, SABNativeSegmentedControlView)
{
  NSString *scheme = json ? [RCTConvert NSString:json] : @"system";
  if ([scheme isEqualToString:@"dark"]) {
    view.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
  } else if ([scheme isEqualToString:@"light"]) {
    view.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
  } else {
    view.overrideUserInterfaceStyle = UIUserInterfaceStyleUnspecified;
  }
}

@end
