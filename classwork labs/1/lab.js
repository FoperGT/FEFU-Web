// Вариант 2

const getDigits = function() {
    let result = '';

    function extractDigits(number) {
        let uniqueDigits = '';
        const numStr = number.toString();
        for (let i = 0; i < numStr.length; i++) {
            const digit = numStr[i];
            if (!uniqueDigits.includes(digit)) {
                uniqueDigits += digit;
            }
        }
        return uniqueDigits;
    }

    for (let i = 0; i < arguments.length; i++) {
        const digits = extractDigits(arguments[i]);
        result += digits + ', ';
    }

    return result.slice(0, -2);
}

console.log(getDigits(123, 112, 456));