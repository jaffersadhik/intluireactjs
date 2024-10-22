export const validateInput = (value, regex, errorMessage) => {
    if (!regex.test(value)) {
        return errorMessage; // Return error message if validation fails
    }
    return ''; // No error
};