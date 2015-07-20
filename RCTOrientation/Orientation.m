//
//  Orientation.m
//

#import "Orientation.h"
#import "AppDelegate.h"

@implementation Orientation

@synthesize bridge = _bridge;

- (instancetype)init
{
  if ((self = [super init])) {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(deviceOrientationDidChange:) name:@"UIDeviceOrientationDidChangeNotification" object:nil];
  }
  return self;
  
}

- (NSUInteger)supportedInterfaceOrientations{
  return UIInterfaceOrientationMaskLandscape;
}

- (void)dealloc
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)deviceOrientationDidChange:(NSNotification *)notification
{
  
  UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];

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

  [_bridge.eventDispatcher sendDeviceEventWithName:@"orientationDidChange"
                                              body:@{@"orientation": orientationStr}];
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(shouldRotate:(BOOL *)b)
{
  //NSLog(@"Bool value: %d",b);
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  delegate.shouldRotate = b;
  
}


@end
