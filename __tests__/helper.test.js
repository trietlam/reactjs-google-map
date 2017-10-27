import * as Helper from '../src/utils/helper'

test('timestamp compare function', () => {
    expect(Helper.getTimeDiffFromISOString(
        '2017-10-26T02:36:38.5254972Z','2017-10-26T02:36:37.5161645Z' )).toBeCloseTo(1009);        
  });

test('calculate angle',()=>{
    const result = Helper.getAngle(
        { latitude: -36.88235, longitude: 174.80816 },
        { latitude: -36.88236, longitude: 174.80839 })
    expect(result).toBeLessThan(23)
    expect(result).toBeGreaterThan(-23)
})  