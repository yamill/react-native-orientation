//
//  Orientation.h
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>

@interface Orientation : NSObject <RCTBridgeModule>
+ (void)setOrientation: (UIInterfaceOrientationMask)orientation;
+ (UIInterfaceOrientationMask)getOrientation;
@end
