import { escapeSpecialCharacters } from "./utils/helpers";

export default class Calculator {

    private singleDelimiterPattern = /^\/\/(.)\n/;
    private multiDelimiterPattern = /^\/\/(\[.*?\])+\n/;
    private defaultDelimiterPattern = /,|\n/;

    add(input: string) {
        if (!input) return 0;

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

        const numbers = input.split(delimiterMatcher).map(item => Number(item));
        
        // checking for negative numbers
        const negatives = numbers.filter(num => num < 0);
        if (negatives.length) {
            throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
        }

        return numbers.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
    }
}