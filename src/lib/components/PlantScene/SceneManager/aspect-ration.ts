type Orientation = 'landscape' | 'portrait';
type AspectRatio = number;

interface GetScreenOrientationReturn {
    aspectRatio: AspectRatio;
    orientation: Orientation;
}

function getScreenOrientation(): GetScreenOrientationReturn {
    const aspectRatio = document.body.clientWidth / document.body.clientHeight;
    
    return {
        aspectRatio,
        orientation: aspectRatio > 1 ? 'landscape' : 'portrait'
    };
}

export { getScreenOrientation };