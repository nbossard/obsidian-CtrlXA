import { findCycle } from './cycle'

let cycles=	[
	["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
	["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
]

describe('findCycle function', () => {
  it('should return the next word in the cycle when going up', () => {
    expect(findCycle('Lundi', 1, cycles)).toBe('Mardi');
    expect(findCycle('Vendredi', 1, cycles)).toBe('Samedi');
    expect(findCycle('Sunday', 1, cycles)).toBe('Monday');
  });

  it('should return the previous word in the cycle when going down', () => {
    expect(findCycle('Mardi', -1, cycles)).toBe('Lundi');
    expect(findCycle('Samedi', -1, cycles)).toBe('Vendredi');
    expect(findCycle('Wednesday', -1, cycles)).toBe('Tuesday');
  });

  it('should return the same word if parCurWord is not found in any cycle', () => {
    expect(findCycle('Nonexistent', 1, cycles)).toBe('Nonexistent');
    expect(findCycle('Nonexistent', -1, cycles)).toBe('Nonexistent');
  });
});

