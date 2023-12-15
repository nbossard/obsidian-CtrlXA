import { findCycle } from './cycle'

describe('findCycle function', () => {
  it('should return the next word in the cycle when going up', () => {
    expect(findCycle('Lundi', 1)).toBe('Mardi');
    expect(findCycle('Vendredi', 1)).toBe('Samedi');
    expect(findCycle('Sunday', 1)).toBe('Monday');
  });

  it('should return the previous word in the cycle when going down', () => {
    expect(findCycle('Mardi', -1)).toBe('Lundi');
    expect(findCycle('Samedi', -1)).toBe('Vendredi');
    expect(findCycle('Wednesday', -1)).toBe('Tuesday');
  });

  it('should return the same word if parCurWord is not found in any cycle', () => {
    expect(findCycle('Nonexistent', 1)).toBe('Nonexistent');
    expect(findCycle('Nonexistent', -1)).toBe('Nonexistent');
  });
});

