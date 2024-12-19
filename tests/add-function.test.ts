import Calculator from "../src/calculator";

describe('Calculator Add Function', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should return 0 for an empty string', () => {
    expect(calculator.add('')).toBe(0);
  });

  it('should return the number itself for a single number', () => {
    expect(calculator.add('5')).toBe(5);
  });

  it('should return the sum of two numbers separated by a comma', () => {
    expect(calculator.add('1,2')).toBe(3);
  });

  it('should handle newlines as delimiters', () => {
    expect(calculator.add('1\n2,3')).toBe(6);
  });

  it('should support custom delimiters', () => {
    expect(calculator.add('//;\n1;2')).toBe(3);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => calculator.add('1,-2,3')).toThrow('Negatives not allowed: -2');
    expect(() => calculator.add('-1,-2')).toThrow('Negatives not allowed: -1, -2');
  });

  it('should ignore numbers greater than 1000', () => {
    expect(calculator.add('2,1001')).toBe(2);
    expect(calculator.add('1000,1001')).toBe(1000);
  });
});
