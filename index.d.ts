declare module "react-native-orientation" {
    type OrientationType = "PORTRAIT" | "LANDSCAPE" | "UNKNOWN" | "PORTRAITUPSIDEDOWN";
    type SpecificOrientationType = "PORTRAIT" | "LANDSCAPE-LEFT" | "LANDSCAPE-RIGHT" | "UNKNOWN" | "PORTRAITUPSIDEDOWN";
    export default class Orientation {
        static getOrientation(cb: (error: any, orientation: OrientationType) => void): void;
        static getSpecificOrientation(cb: (error: any, orientation: SpecificOrientationType) => void): void;
        static lockToPortrait(): void;
        static lockToLandscape(): void;
        static lockToLandscapeRight(): void;
        static lockToLandscapeLeft(): void;
        static unlockAllOrientations(): void;
        static addOrientationListener(cb: (orientation: OrientationType) => void): void;
        static removeOrientationListener(cb: (orientation: OrientationType) => void): void;
        static addSpecificOrientationListener(cb: (orientation: SpecificOrientationType) => void): void;
        static removeSpecificOrientationListener(cb: (orientation: SpecificOrientationType) => void): void;
        static getInitialOrientation(): OrientationType;
    }
}
