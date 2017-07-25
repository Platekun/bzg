# bzg
A set of functions to help you build Bizagi custom connectors easier.

# Installation
`npm install --save bzg`

# API
`createResponse(res, err, statusCode)`: Creates a Bizagi formatted response. This is a special format used by Bizagi studio.
* `res: Object`: HTTP request object.
* `err: Object`: Request error object.
* `statusCode: String`: How's the statusCode property called in the response object passed in. ex: "status", "status-code", etc.

`createError()`: Creates a human readable error. This is the error that users will see once the exception occurs doing the action.
* errorType: String: An object containing the type of error it will be passed on to Bizagi. The following errors are supported.
* * GLB.UNKNOW_ACTION
* * GLB.RESPONSE_ERROR
* * REQUIRED_PARAM
* `params: Object`: The parameters needed to build that type of error.
* * { action: String }
* * { code: Number, errorMessage: String }
* * { paramName: String }

`findMissingParams(params)`: Generic function that checks the user input the same way Bizagi studio expects. It returns a string error if there's a missing param.
* `params: Object`: Bizagi user input

# Use
```
import bzg from 'bzg';
import imgur from 'imgur';
import consumer from './some-path/consumer';

export function _action(handlers, services, authdata, input) {
    // handlers.findMissingParams({/**/});
    // services.imgur.setClientId('aCs53GSs4tga0ikp');
    // services.consumer.init(imgur);
    // ...
    // handlers.createResponse({ statusCode: 200 });
    // ...
    // Remenber to return a Promise.
}

export const invoke = bzg( [imgur, consumer], _action);
```
