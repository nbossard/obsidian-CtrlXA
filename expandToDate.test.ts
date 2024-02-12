import { tryExpandPosToMachADate, ObjType } from './expandToDate';

describe('tryExpandPosToMachADate', () => {
  it('should return true and modify from and to if pos is on a date', () => {
    const parObj: ObjType = {
      curLine: 'Lorem ipsum dolor sit amet, 2022-01-01 consectetur adipiscing elit.',
      fromPos: 33,
      toPos: 35,
    };

    const result = tryExpandPosToMachADate(parObj);

    expect(result).toBe(true);
    expect(parObj.fromPos).toBe(28);
    expect(parObj.toPos).toBe(38);
  });

  it('should return false and not modify from and to if pos is not on the date', () => {
    const parObj: ObjType = {
      curLine: 'Lorem ipsum dolor sit amet, 2022-01-01 consectetur adipiscing elit.',
      fromPos: 3,
      toPos: 5,
    };

    const result = tryExpandPosToMachADate(parObj);

    expect(result).toBe(false);
    expect(parObj.fromPos).toBe(3);
    expect(parObj.toPos).toBe(5);
  });

  it('should return false and not modify from and to if no date is found around position', () => {
    const parObj: ObjType = {
      curLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fromPos: 10,
      toPos: 15,
    };

    const result = tryExpandPosToMachADate(parObj);

    expect(result).toBe(false);
    expect(parObj.fromPos).toBe(10);
    expect(parObj.toPos).toBe(15);
  });

});


