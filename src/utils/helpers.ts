export const escapeSpecialCharacters = (input: string) => {
    input = input.trim()
    input = input.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
    return input
}