//
//  Orientation.m
//

#import "Orientation.h"
#import "AppDelegate.h"


@implementation AppDelegate (Orientation)

- (NSUInteger)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  int orientation = [Orientation getOrientation];
  switch (orientation) {
    case 1:
      return UIInterfaceOrientationMaskPortrait;
      break;
    case 2:
      return UIInterfaceOrientationMaskLandscape;
      break;
    case 3:
      return UIInterfaceOrientationMaskAllButUpsideDown;
      break;
    default:
      return UIInterfaceOrientationMaskPortrait;
      break;
  }
}

@end


@implementation Orientation

@synthesize bridge = _bridge;

static int _orientation = 3;
+ (void)setOrientation: (int)orientation {
  _orientation = orientation;
}
+ (int)getOrientation {
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
- (void)deviceOrientationDidChange:(NSNotification *)notification
{

  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
  NSString *orientationStr = [self getOrientationStr:orientation];

  [_bridge.eventDispatcher sendDeviceEventWithName:@"orientationDidChange"
                                              body:@{@"orientation": orientationStr}];
}

- (NSString *)getOrientationStr: (UIDeviceOrientation)orientation {
  NSString *orientationStr;
  switch (orientation) {
    case UIDeviceOrientationPortrait:
    case UIDeviceOrientationPortraitUpsideDown:
      orientationStr = @"PORTRAIT";
      break;
    case UIDeviceOrientationLandscapeLeft:
    case UIDeviceOrientationLandscapeRight:

      orientationStr = @"LANDSCAPE";
      break;
    default:
      orientationStr = @"UNKNOWN";
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

RCT_EXPORT_METHOD(lockToPortrait)
{
  NSLog(@"Locked to Portrait");
  [Orientation setOrientation:1];
//  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//  delegate.orientation = 1;

}

RCT_EXPORT_METHOD(lockToLandscape)
{
  NSLog(@"Locked to Landscape");
  [Orientation setOrientation:2];
//  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//  delegate.orientation = 2;

}

RCT_EXPORT_METHOD(unlockAllOrientations)
{
  NSLog(@"Unlock All Orientations");
  [Orientation setOrientation:3];
//  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
//  delegate.orientation = 3;

}


@end
