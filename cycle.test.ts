import { findCycle } from './cycle'

const cycles=	[
	["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
	["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
	["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
]

describe('findCycle function', () => {
  it('should return the next number if current word is a number', () => {
    expect(findCycle('1', 1, cycles)).toBe('2');
    expect(findCycle('7', 1, cycles)).toBe('8');
    expect(findCycle('7', -1, cycles)).toBe('6');
  });

  it ('should keep the prefixing 0 if the current word is a number with a leading 0', () => {
	expect(findCycle('01', 1, cycles)).toBe('02');
	expect(findCycle('007', 1, cycles)).toBe('008');
	expect(findCycle('0000007', -1, cycles)).toBe('0000006');
  });

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

