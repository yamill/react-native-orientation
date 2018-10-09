declare module "react-native-orientation" {
    class Orientation {
        static lockToPortrait(): void;

        static lockToLandscape(): void;

        static lockToLandscapeLeft(): void;

        static lockToLandscapeRight(): void;

        static unlockAllOrientations(): void;

        static addSpecificOrientationListener(handler: (orientation: OrientationType) => void): void;

        static removeSpecificOrientationListener(handler: (orientation: OrientationType) => void): void;
    }

    export default Orientation;

    export type OrientationType =
        "LANDSCAPE-LEFT" |
        "LANDSCAPE-RIGHT" |
        "PORTRAIT" |
        "PORTRAITUPSIDEDOWN" |
        "UNKNOWN";
}
