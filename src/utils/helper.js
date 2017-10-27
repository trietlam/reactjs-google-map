
export function getTimeDiffFromISOString(s1, s2){
    var t1 = Date.parse(s1);
    var t2 = Date.parse(s2);
    return t1-t2
}

export function getAngle(startPnt, endPnt){
    // angle in degrees
    var angleDeg = Math.atan2(endPnt.latitude - startPnt.latitude, endPnt.longitude - startPnt.longitude) * 180 / Math.PI;
    return angleDeg
}