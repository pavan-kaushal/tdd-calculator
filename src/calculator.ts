import { escapeSpecialCharacters } from "./utils/helpers";

export default class Calculator {

    private singleDelimiterPattern = /^\/\/(.)\n/;
    private multiDelimiterPattern = /^\/\/(\[.*?\])+\n/;
    private defaultDelimiterPattern = /,|\n/;

    add(input: string) {
        if (!input.trim()) return 0;

        //default delimiter
        let delimiterMatcher = this.defaultDelimiterPattern;

        //check if custom delimiter input is provided
        if(input.startsWith('//')){
            const singleDelimiterMatch = input.match(this.singleDelimiterPattern);

            // single character delimiter found
            if (singleDelimiterMatch) {
                const [delimiterSection, customDelimiter] = singleDelimiterMatch;
                delimiterMatcher = new RegExp(escapeSpecialCharacters(customDelimiter));

                // removing the delimiter declaration in input
                input = input.substring(delimiterSection.length);
            } else {
                // check for multiple delimiters enclosed in square brackets
                const multiDelimiterMatch = input.match(this.multiDelimiterPattern);

                if(!multiDelimiterMatch?.length){
                    throw new Error("Custom Delimiter Not Found")
                }

                // extract all delimiters enclosed in square brackets
                const delimiterSection = multiDelimiterMatch[0];
                const delimiters = [...delimiterSection.matchAll(/\[([^\]]+)\]/g)].map(([section, delimiter]) => escapeSpecialCharacters(delimiter));

                // create a regular expression to match any of the delimiters
                delimiterMatcher = new RegExp(delimiters.join('|'));

                // removing the delimiter declaration in input
                input = input.substring(delimiterSection.length);
            }
        }

        // Split input based on the delimiter and filter out empty values
        const numbers = input.split(delimiterMatcher)
            .map(item => Number(item))
            .filter(num => !isNaN(num));

        // Edge case: if no valid numbers exist after parsing
        if (numbers.length === 0) {
            return 0
        }

        // Edge case: check for negative numbers
        const negatives = numbers.filter(num => num < 0);
        if (negatives.length) {
            throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
        }

        // Edge case: ignore numbers greater than 1000
        const validNumbers = numbers.filter(num => num <= 1000);

        // Return the sum of valid numbers
        return validNumbers.reduce((sum, num) => sum + num, 0);
    }
}