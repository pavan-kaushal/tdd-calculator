import { escapeSpecialCharacters, parseInput, validateNumbers } from "./utils/helpers";

export default class Calculator {

    add(input: string) {
        input = input.trim()
        if (!input?.length) return 0;

        //default delimiter
        let {rawInput, delimiterMatcher} = parseInput(input);

        // Split input based on the delimiter and filter out empty values
        const numbers = rawInput.split(delimiterMatcher)
            .map(item => Number(item))

        // Edge case: ignore numbers greater than 1000
        const validNumbers = validateNumbers(numbers);

        // Return the sum of valid numbers
        return validNumbers.reduce((sum, num) => sum + num, 0);
    }
}