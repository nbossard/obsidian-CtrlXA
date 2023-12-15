
/** function findCycle
 *
* will find next word in cycle of words
* will return same word if parCurWord is not found in any cycle
*
* @example findCycle("Lundi", 1) will return "Mardi"
*
* @param parCurWord: current word to be replaced
* @param parDirection: 1 for going up, -1 for going down
* @return next word in cycle
*/
export function findCycle(parCurWord: string, parDirection: number, parCycles: string[][]): string {
	let curCycle: string[];
	let curCycleIndex: number;
	let curCycleWordIndex: number;

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
