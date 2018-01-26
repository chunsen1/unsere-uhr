import { isFunction } from "util";

function validate(request, selector, validations) {
    let value = null

    if (!Array.isArray(validations) && isFunction(validations)) {
        validations = [ validations ]
    }

    if (request 
        && request.body 
        && isFunction(selector)
        && (value = selector(request.body))
    ) {
        let results = validations.filter(v => v(value))
        
        if (results.length === 0) {

        } else {
            
        }
    }
}