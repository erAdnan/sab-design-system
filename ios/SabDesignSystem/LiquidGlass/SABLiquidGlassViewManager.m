#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import <React/RCTConvert.h>

#if __has_include("SabDesignSystem-Swift.h")
#import "SabDesignSystem-Swift.h"
#else
#import "SabDesignSystem/SabDesignSystem-Swift.h"
#endif

@interface SABLiquidGlassViewManager : RCTViewManager
@end

@implementation SABLiquidGlassViewManager

RCT_EXPORT_MODULE(SABLiquidGlassView)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  return [[SABLiquidGlassViewImpl alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(interactive, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(effect, NSString, SABLiquidGlassViewImpl)
{
  if (@available(iOS 26.0, *)) {
    NSString *effect = json ? [RCTConvert NSString:json] : @"regular";
    SABLiquidGlassEffect style = SABLiquidGlassEffectRegular;

    if ([effect isEqualToString:@"clear"]) {
      style = SABLiquidGlassEffectClear;
    } else if ([effect isEqualToString:@"none"]) {
      style = SABLiquidGlassEffectNone;
    }

    view.style = style;
    [view setupView];
  }
}

RCT_CUSTOM_VIEW_PROPERTY(tintColor, UIColor, SABLiquidGlassViewImpl)
{
  if (@available(iOS 26.0, *)) {
    view.effectTintColor = json ? [RCTConvert UIColor:json] : nil;
    [view setupView];
  }
}

RCT_CUSTOM_VIEW_PROPERTY(colorScheme, NSString, SABLiquidGlassViewImpl)
{
  if (@available(iOS 26.0, *)) {
    NSString *scheme = json ? [RCTConvert NSString:json] : @"system";

    if ([scheme isEqualToString:@"dark"]) {
      view.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
    } else if ([scheme isEqualToString:@"light"]) {
      view.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
    } else {
      view.overrideUserInterfaceStyle = UIUserInterfaceStyleUnspecified;
    }

    [view setupView];
  }
}

@end
