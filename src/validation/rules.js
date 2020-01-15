/**
 * This rule is used to match value with other field's value. 
 * rule example:  { validator: confirm, message: 'Password mismatch.' , getFieldValue: () => this.props.form.getFieldValue('password') } 
 * 
 * @param Object rule 
 * @param string value 
 * @param callback callback 
 */
export function confirm(rule, value, callback) {

    let {message='Value does not match.', getFieldValue} = rule;

    if (value && value !== getFieldValue()) {
        callback(message);
    }

    callback();
}
