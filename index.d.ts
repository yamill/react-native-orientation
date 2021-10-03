
export type OrientationType =
'PORTRAIT' |
'LANDSCAPE' |
'PORTRAITUPSIDEDOWN' |
'LANDSCAPE-LEFT' |
'LANDSCAPE-RIGHT' |
'FACEUP' |
'FACEDOWN' |
'UNKNOWN';

type OrientationCallback = (error: Object, orientation: OrientationType) => void;
type Callback = (orientation: OrientationType) => void;

declare namespace Orientation {
function getOrientation(cb: OrientationCallback): void;

function getSpecificOrientation(cb: OrientationCallback): void;

function lockToPortrait(): void;

function lockToLandscape(): void;

function lockToLandscapeRight(): void;

function lockToLandscapeLeft(): void;

function unlockAllOrientations(): void;

function addOrientationListener(cb: Callback): void;

function removeOrientationListener(cb: Callback): void;

function addSpecificOrientationListener(cb: Callback): void;

function removeSpecificOrientationListener(cb: Callback): void;

function getInitialOrientation(): OrientationType;
}

export default Orientation;