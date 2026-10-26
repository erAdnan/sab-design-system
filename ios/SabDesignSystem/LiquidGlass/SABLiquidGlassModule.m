#import <React/RCTBridgeModule.h>
#import <UIKit/UIKit.h>

@interface SABLiquidGlassModule : NSObject <RCTBridgeModule>
@end

@implementation SABLiquidGlassModule

RCT_EXPORT_MODULE(SABLiquidGlassModule);

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

+ (BOOL)isLiquidGlassSupportedRuntime
{
  if (@available(iOS 26.0, tvOS 26.0, *)) {
    NSDictionary *infoPlist = [[NSBundle mainBundle] infoDictionary];
    BOOL requiresDesignCompatibility =
        [infoPlist[@"UIDesignRequiresCompatibility"] boolValue];
    BOOL hasGlassAPI = NSClassFromString(@"UIGlassEffect") != nil;

    return !requiresDesignCompatibility && hasGlassAPI;
  }

  return NO;
}

- (NSDictionary *)constantsToExport
{
  return @{
    @"isLiquidGlassSupported": @([SABLiquidGlassModule isLiquidGlassSupportedRuntime])
  };
}

RCT_EXPORT_SYNCHRONOUS_TYPED_METHOD(NSNumber *, isLiquidGlassSupportedSync)
{
  return @([SABLiquidGlassModule isLiquidGlassSupportedRuntime]);
}

@end
