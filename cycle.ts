
/** function findCycle
 *
* will find next word in cycle of words
* will return same word if parCurWord is not found in any cycle
*
* @example findCycle("Lundi", 1, ...) will return "Mardi"
*
* @param parCurWord: current word to be replaced
* @param parDirection: 1 for going up, -1 for going down
* @param parCycles: array of cycles of words
* @return next word in cycle
*/
export function findCycle(parCurWord: string, parDirection: number, parCycles: string[][]): string {
	let curCycle: string[];
	let curCycleIndex: number;
	let curCycleWordIndex: number;

	// checking if it is a date
	// format: YYYY-MM-DD
	if (parCurWord.match(/^\d{4}-\d{2}-\d{2}$/)) {
		const curDate = new Date(parCurWord);
		curDate.setDate(curDate.getDate() + parDirection);
		return curDate.toISOString().slice(0, 10);
	}

	// checking if it is a number
	if (!isNaN(Number(parCurWord))) {
		// it is a number
		// First store the numbere of leading 0 if any
		const leadingZero = parCurWord.match(/^0+/);
		const newValue = String(Number(parCurWord) + parDirection);
		// Then add the leading 0 back
		const newValueStr = leadingZero ? leadingZero[0] + newValue : newValue;
		return newValueStr;
	}

	// searching in all cycles
	for (let i = 0; i < parCycles.length; i++) {
		curCycle = parCycles[i];
		curCycleIndex = curCycle.indexOf(parCurWord);
		if (curCycleIndex >= 0) {
			curCycleWordIndex = curCycleIndex + parDirection;
			if (curCycleWordIndex < 0) {
				curCycleWordIndex = curCycle.length - 1;
			} else if (curCycleWordIndex >= curCycle.length) {
				curCycleWordIndex = 0;
			}
			return curCycle[curCycleWordIndex];
		}
	}
	return parCurWord;
}
