import expect from 'expect';
import errorTypes from './errorTypes';

/**
 * Creates a human readable error.
 * 
 * @param {String} errorType An object containing the type of error it will be passed on to bizagi.
 * @param {{action: String}|{code: Number, errorMessage: String}|{paramName: String}} params The parameters that will be used to build the error string.
 * @return {String} Pretty error reason that the user will see.
 */
export default function createError(errorType, params) {
	expect(errorType).toBeA('string', 'The error type must be a string.');
	
	switch (errorType) {
		case errorTypes.unknownAction:
			expect(params).toExist('The params parameter must be provided.');
			expect(params).toBeA('object');
			expect(params).toIncludeKey('action', 'The error parameters must include an action property.');
			expect(params.action).toBeA('string', 'The action property must be a string.');
			return `Unknown action: ${params.action}.`;

		case errorTypes.responseError:
			expect(params).toExist('The params parameter must be provided.');
			expect(params).toIncludeKey('code', 'errorMessage', 'The params parameter must include a code and an errorMessage property.');
			expect(params.code).toBeA('number', 'The code property must be a number.');
			expect(params.errorMessage).toBeA('string', 'The error message must be a string.');
			return `An error was obtained by processing the request. The HTTP Code is: ${params.code} and the server's response was: ${params.errorMessage}.`;

		case errorTypes.requiredParam:
			expect(params).toExist('The params parameter must be provided');
			expect(params).toIncludeKey('paramName', 'The error parameters must include a paramName property.');
			expect(params.paramName).toBeA('string', 'The paramName property must be a string.');
			return `The parameter ${params.paramName} is required.`;

		default: return 'Unknown error type provided.';
	}
}
