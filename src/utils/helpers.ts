//escapes special characters in regex
export const escapeSpecialCharacters = (input: string) => {
    input = input.trim()
    input = input.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
    return input
}

const singleDelimiterPattern = /^\/\/(.)\n/;
const multiDelimiterPattern = /^\/\/(\[.*?\])+\n/;
const defaultDelimiterPattern = /,|\n/;

//parses input and returns parsed raw input and delimter match regex
export const parseInput = (input: string) => {
    //default delimiter
    let delimiterMatcher = defaultDelimiterPattern;

    //check if custom delimiter input is provided
    if(input.startsWith('//')){
        const singleDelimiterMatch = input.match(singleDelimiterPattern);

        // single character delimiter found
        if (singleDelimiterMatch) {
            const [delimiterSection, customDelimiter] = singleDelimiterMatch;
            delimiterMatcher = new RegExp(escapeSpecialCharacters(customDelimiter));

            // removing the delimiter declaration in input
            input = input.substring(delimiterSection.length);
        } else {
            // check for multiple delimiters enclosed in square brackets
            const multiDelimiterMatch = input.match(multiDelimiterPattern);

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
    return {rawInput: input, delimiterMatcher}
}

export const validateNumbers = (numbers: number[]): number[] => {
    numbers = numbers.filter(num => !isNaN(num));

    //check for negative numbers
    const negatives = numbers.filter(num => num < 0);
    if (negatives.length) {
        throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    const validNumbers = numbers.filter(num => num <= 1000);
    return validNumbers
}