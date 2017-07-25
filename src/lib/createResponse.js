import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import expect from 'expect';

export const isAutotestingEnable = () =>
	existsSync(join(__dirname, '../../../../../../autotesting/inputData.json')) &&
	existsSync(join(__dirname, '../../../../../../autotesting/outputData.json')) &&
	existsSync(join(__dirname, '../../../../../../autotesting/errorData.json'));

/**
 * Creates a bizagi formatted response.
 * 
 * @param {Object} res HTTP request object
 * @param {Object} err Request error object
 * @param {String} statusCode How's the statusCode property called in the response object passed in.
 * @return {Object}
 */
export default function createResponse(res, err = '', statusCode = 'statusCode') {
	expect(res).toExist('The res parameter must be provided.');
	expect(res).toIncludeKey(statusCode, `The res parameter must include a ${statusCode} property.`);
	expect(res[statusCode]).toBeA('number', `The res.${statusCode} property must be a number.`);

	const didRequestSucceed = res[statusCode] >= 200 && res[statusCode] < 300;

	if (!didRequestSucceed) {	
		expect(err).toBeA('string', 'The err parameter must be a string.');
	}
	
	return {
		response: {
			outputs: {
				output: didRequestSucceed ? res : {},
				error: didRequestSucceed ? {} : err
			}
		},
		success,
		connectorstatuscode: res[statusCode],
		errormessage: didRequestSucceed ? '' : err,
		autotestingenabled: isAutotestingEnable()
	}
}
