
export * from './rules';

export function getParsedFieldErrors(fieldValues, errors) {
    let temp = {};

    for (let field in errors) {
        temp[field] = {
          value: fieldValues[field],
          errors: [new Error(errors[field][0] || 'error')]
        };
    }

    return temp;
}