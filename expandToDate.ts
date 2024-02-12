export type ObjType = {
  curLine: string;
  fromPos: number;
  toPos: number;
};

/**
 * Tries to expand `parObj.from` and `parObj.to` to match a date in `parObj.curLine`.
 * Modifies `parObj.from` and `parObj.to` if a date is found and returns `true`.
 *
 * @param {ObjType} parObj - The object containing the parameters.
 * @returns {boolean} - `true` if `parObj.from` and `parObj.to` are modified, `false` otherwise.
 */
export function tryExpandPosToMachADate(parObj:ObjType):boolean {
    const dates = parObj.curLine.match(/\d{4}-\d{2}-\d{2}/g);
    if (dates) {
        for (const date of dates) {
            const datePos = parObj.curLine.indexOf(date);
            if (datePos <= parObj.fromPos && datePos + date.length >= parObj.toPos) {
                parObj.fromPos = datePos;
                parObj.toPos = datePos + date.length;
                return true;
            }
        }
    }
    return false;
}

