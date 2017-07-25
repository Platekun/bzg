import createResponse from './lib/createResponse';
import createError from './lib/createError';
import findMissingParams from './lib/findMissingParams';

/**
 * Returns a new bizagi connector action.
 * @param {Object} services An object containing all the connectors dependencies.
 * @param {function({ createResponse: (res: any, err?: any, statusCode?: string) => any, createError(errorType: string, params: { action: String; } | { code: Number; errorMessage: String; } | { paramName: String;}): string, findMissingParams: (params: any) => void }, Array, Object, Object):Promise} fn A bizagi custom connector callback.
 */
export default function bz(services, fn) {
    return function(globals, actionName, data, authenticationType, log, done) {
        fn(
            { createResponse, createResponse, findMissingParams },
            services,
            globals.authdata,
            data.inputs.input
        ).then(res => {
            log(res);
            done(res);
        });
    };
}