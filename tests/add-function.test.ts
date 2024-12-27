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

  it('should support multiple custom delimiters', () => {
    expect(calculator.add('//[;][uu]\n1;2uu8')).toBe(11);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => calculator.add('1,-2,3')).toThrow('Negatives not allowed: -2');
    expect(() => calculator.add('-1,-2')).toThrow('Negatives not allowed: -1, -2');
  });

  it('should ignore numbers greater than 1000', () => {
    expect(calculator.add('2,1001')).toBe(2);
    expect(calculator.add('1000,1001')).toBe(1000);
  });

  it('should ignore empty and NaN values', () => {
    expect(calculator.add('1,,,x,,2,3')).toBe(6);
  });

  it('should handle numbers with leading and trailing whitespace', () => {
    expect(calculator.add(' 1 , 2 ,  6 ')).toBe(9);
  });

  it('should match special characters in delimiters', () => {
    expect(calculator.add('//[$][^]\n1$2^6')).toBe(9);
    expect(calculator.add('//|\n1|2|6')).toBe(9);
  });

  it('should handle multiple numbers separated by different delimiters', () => {
    expect(calculator.add('//[;][@]\n1;2@3')).toBe(6);
  });

  it('should return 0 when input contains only delimiters', () => {
    expect(calculator.add('//;\n;;;')).toBe(0);
  });

  it('should handle input with leading custom delimiter declaration and numbers', () => {
    expect(calculator.add('//;\n;1;2')).toBe(3);
  });

  it('should return the sum of numbers with multiple delimiters and empty values', () => {
    expect(calculator.add('//[;][,]\n1;;,2,3')).toBe(6);
  });

  it('should return 0 if no valid numbers are found after delimiters', () => {
    expect(calculator.add('//;\n;x;yy;')).toBe(0);
  });

  it('should allow multiple custom delimiters and ignore extra spaces', () => {
    expect(calculator.add('//[;][|]\n1 ;2 | 3')).toBe(6);
  });
});
