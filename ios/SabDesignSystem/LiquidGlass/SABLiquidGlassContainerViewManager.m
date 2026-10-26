#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>

#if __has_include("SabDesignSystem-Swift.h")
#import "SabDesignSystem-Swift.h"
#else
#import "SabDesignSystem/SabDesignSystem-Swift.h"
#endif

@interface SABLiquidGlassContainerViewManager : RCTViewManager
@end

@implementation SABLiquidGlassContainerViewManager

RCT_EXPORT_MODULE(SABLiquidGlassContainerView)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  return [[SABLiquidGlassContainerViewImpl alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(spacing, CGFloat, SABLiquidGlassContainerViewImpl)
{
  if (@available(iOS 26.0, *)) {
    view.spacing = json ? [RCTConvert CGFloat:json] : 0;
  }
}

@end
