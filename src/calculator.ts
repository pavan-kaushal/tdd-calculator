export default class Calculator {

    add(input: string) {
        if (!input) return 0;

        //default delimiter
        let delimiterMatcher = /,|\n/;

        //check if custom delimiter input is provided
        if(input.startsWith('//')){
            const singleDelimiterPattern = /^\/\/(.)\n/;
            const singleDelimiterMatch = input.match(singleDelimiterPattern);

            // Single character delimiter found
            if (singleDelimiterMatch) {
                const [delimiterSection, customDelimiter] = singleDelimiterMatch;
                delimiterMatcher = new RegExp(customDelimiter);

                // Update input by removing the delimiter declaration
                input = input.substring(delimiterSection.length);
            } else {
                // Check for multiple delimiters enclosed in square brackets
                const multiDelimiterPattern = /^\/\/(\[.*?\])+\n/;
                const multiDelimiterMatch = input.match(multiDelimiterPattern);

                if(!multiDelimiterMatch?.length){
                    throw new Error("Custom Delimiter Not Found")
                }

                // Extract all delimiters enclosed in square brackets
                const delimiterSection = multiDelimiterMatch[0];
                const delimiters = [...delimiterSection.matchAll(/\[([^\]]+)\]/g)].map(([section, delimiter]) => delimiter);

                // Create a regular expression to match any of the delimiters
                delimiterMatcher = new RegExp(delimiters.join('|'));

                // Update input to exclude the delimiter declaration part
                input = input.substring(delimiterSection.length);
            }
        }

        const numbers = input.split(delimiterMatcher).map(item => Number(item));
        const negatives = numbers.filter(num => num < 0);
        if (negatives.length) {
            throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
        }

        return numbers.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
    }
}