//
//  Orientation.m
//

#import "Orientation.h"
#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#else
#import "RCTEventDispatcher.h"
#endif

@implementation Orientation
@synthesize bridge = _bridge;

static UIInterfaceOrientationMask _orientation = UIInterfaceOrientationMaskAllButUpsideDown;
+ (void)setOrientation: (UIInterfaceOrientationMask)orientation {
  _orientation = orientation;
}
+ (UIInterfaceOrientationMask)getOrientation {
  return _orientation;
}

- (instancetype)init
{
  if ((self = [super init])) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceOrientationDidChange:) name:@"UIDeviceOrientationDidChangeNotification" object:nil];
  }
  return self;

}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (void)dispatchOrientationChangeEvent:(UIDeviceOrientation)orientation {
    [self.bridge.eventDispatcher sendDeviceEventWithName:@"specificOrientationDidChange"
                                                body:@{@"specificOrientation": [self getSpecificOrientationStr:orientation]}];

    [self.bridge.eventDispatcher sendDeviceEventWithName:@"orientationDidChange"
                                                body:@{@"orientation": [self getOrientationStr:orientation]}];
}

- (void)lockToOrientationWithMask:(UIInterfaceOrientationMask)maskOrientation interfaceOrientation:(UIInterfaceOrientation)interfaceOrientation deviceOrientation:(UIDeviceOrientation)deviceOrientation {
    if (@available(iOS 16, *)) {
        dispatch_sync(dispatch_get_main_queue(), ^{
            NSArray *array = [[[UIApplication sharedApplication] connectedScenes] allObjects];
            UIWindowScene *scene = (UIWindowScene *)array[0];
            [UIViewController attemptRotationToDeviceOrientation];
            UIWindowSceneGeometryPreferencesIOS *geometryPreferences = [[UIWindowSceneGeometryPreferencesIOS alloc] initWithInterfaceOrientations:maskOrientation];
            [scene requestGeometryUpdateWithPreferences:geometryPreferences errorHandler:^(NSError * _Nonnull error) {}];
        });
        [self dispatchOrientationChangeEvent:deviceOrientation];
    } else {
        [[NSOperationQueue mainQueue] addOperationWithBlock:^ {
            [[UIDevice currentDevice] beginGeneratingDeviceOrientationNotifications];
            [[UIDevice currentDevice] setValue:[NSNumber numberWithInteger:interfaceOrientation] forKey:@"orientation"];
        }];
    }
}

- (void)deviceOrientationDidChange:(NSNotification *)notification
{
    UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
    [self dispatchOrientationChangeEvent:orientation];
}

- (NSString *)getOrientationStr: (UIDeviceOrientation)orientation {
  NSString *orientationStr;
  switch (orientation) {
    case UIDeviceOrientationPortrait:
      orientationStr = @"PORTRAIT";
      break;
    case UIDeviceOrientationLandscapeLeft:
    case UIDeviceOrientationLandscapeRight:

      orientationStr = @"LANDSCAPE";
      break;

    case UIDeviceOrientationPortraitUpsideDown:
      orientationStr = @"PORTRAITUPSIDEDOWN";
      break;

    default:
      // orientation is unknown, we try to get the status bar orientation
      switch ([[UIApplication sharedApplication] statusBarOrientation]) {
        case UIInterfaceOrientationPortrait:
          orientationStr = @"PORTRAIT";
          break;
        case UIInterfaceOrientationLandscapeLeft:
        case UIInterfaceOrientationLandscapeRight:

          orientationStr = @"LANDSCAPE";
          break;

        case UIInterfaceOrientationPortraitUpsideDown:
          orientationStr = @"PORTRAITUPSIDEDOWN";
          break;

        default:
          orientationStr = @"UNKNOWN";
          break;
      }
      break;
  }
  return orientationStr;
}

- (NSString *)getSpecificOrientationStr: (UIDeviceOrientation)orientation {
  NSString *orientationStr;
  switch (orientation) {
    case UIDeviceOrientationPortrait:
      orientationStr = @"PORTRAIT";
      break;

    case UIDeviceOrientationLandscapeLeft:
      orientationStr = @"LANDSCAPE-LEFT";
      break;

    case UIDeviceOrientationLandscapeRight:
      orientationStr = @"LANDSCAPE-RIGHT";
      break;

    case UIDeviceOrientationPortraitUpsideDown:
      orientationStr = @"PORTRAITUPSIDEDOWN";
      break;

    default:
      // orientation is unknown, we try to get the status bar orientation
      switch ([[UIApplication sharedApplication] statusBarOrientation]) {
        case UIInterfaceOrientationPortrait:
          orientationStr = @"PORTRAIT";
          break;
        case UIInterfaceOrientationLandscapeLeft:
        case UIInterfaceOrientationLandscapeRight:

          orientationStr = @"LANDSCAPE";
          break;

        case UIInterfaceOrientationPortraitUpsideDown:
          orientationStr = @"PORTRAITUPSIDEDOWN";
          break;

        default:
          orientationStr = @"UNKNOWN";
          break;
      }
      break;
  }
  return orientationStr;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getOrientation:(RCTResponseSenderBlock)callback)
{
  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
  NSString *orientationStr = [self getOrientationStr:orientation];
  callback(@[[NSNull null], orientationStr]);
}

RCT_EXPORT_METHOD(getSpecificOrientation:(RCTResponseSenderBlock)callback)
{
  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
  NSString *orientationStr = [self getSpecificOrientationStr:orientation];
  callback(@[[NSNull null], orientationStr]);
}

RCT_EXPORT_METHOD(lockToPortrait)
{
  #if DEBUG
    NSLog(@"Locked to Portrait");
  #endif
    [Orientation setOrientation:UIInterfaceOrientationMaskPortrait];
    [self lockToOrientationWithMask:UIInterfaceOrientationMaskPortrait interfaceOrientation:UIInterfaceOrientationPortrait deviceOrientation:UIDeviceOrientationPortrait];
}

RCT_EXPORT_METHOD(lockToLandscape)
{
  #if DEBUG
    NSLog(@"Locked to Landscape");
  #endif
  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
  NSString *orientationStr = [self getSpecificOrientationStr:orientation];
  if ([orientationStr isEqualToString:@"LANDSCAPE-LEFT"]) {
      [Orientation setOrientation:UIInterfaceOrientationMaskLandscapeRight];
      [self lockToOrientationWithMask:UIInterfaceOrientationMaskLandscapeRight interfaceOrientation:UIInterfaceOrientationLandscapeRight deviceOrientation:UIDeviceOrientationLandscapeRight];
  } else {
      [Orientation setOrientation:UIInterfaceOrientationMaskLandscapeLeft];
      [self lockToOrientationWithMask:UIInterfaceOrientationMaskLandscapeLeft interfaceOrientation:UIInterfaceOrientationLandscapeLeft deviceOrientation:UIDeviceOrientationLandscapeLeft];
  }
}

RCT_EXPORT_METHOD(lockToLandscapeLeft)
{
  #if DEBUG
    NSLog(@"Locked to Landscape Left");
  #endif
    [Orientation setOrientation:UIInterfaceOrientationMaskLandscapeLeft];
    [self lockToOrientationWithMask:UIInterfaceOrientationMaskLandscapeLeft interfaceOrientation:UIInterfaceOrientationLandscapeLeft deviceOrientation:UIDeviceOrientationLandscapeLeft];
}

RCT_EXPORT_METHOD(lockToLandscapeRight)
{
  #if DEBUG
    NSLog(@"Locked to Landscape Right");
  #endif
    [Orientation setOrientation:UIInterfaceOrientationMaskLandscapeRight];
    [self lockToOrientationWithMask:UIInterfaceOrientationMaskLandscapeRight interfaceOrientation:UIInterfaceOrientationLandscapeRight deviceOrientation:UIDeviceOrientationLandscapeRight];
}

RCT_EXPORT_METHOD(unlockAllOrientations)
{
  #if DEBUG
    NSLog(@"Unlock All Orientations");
  #endif
  [Orientation setOrientation:UIInterfaceOrientationMaskAllButUpsideDown];
//  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//  delegate.orientation = 3;
}

- (NSDictionary *)constantsToExport
{

  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
  NSString *orientationStr = [self getOrientationStr:orientation];

  return @{
    @"initialOrientation": orientationStr
  };
}

@end