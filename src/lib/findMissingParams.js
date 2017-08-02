import _ from 'lodash';
import createError from './createError';
import errorTypes from './errorTypes';

export function _findMissingParams(makeIterable, createError, params) {
    const doesntExist = x => _.isNull(x) || _.isUndefined(x) || _.isEmpty(x);
    const missingParams = _.filter(makeIterable(params), param => doesntExist(param.value));
    return missingParams.length ? createError('VAL.REQUIRED_PARAM', { paramName: missingParams.pop().key }) : '';
}

/**
 * Converts an Object into a iterable. Where each key,value pair will be an item of that collection.
 * @param {Array} Iterable collection
 */
export function _makeIterable(params) {
    const arr = [];
    for (let key in params) {
        arr.push({ key, value: params[key] });
    }
    return arr;
}

/**
 * Returns a string error if there's a missing param.
 * @param {Object} params Bizagi user input
 */
export default function findMissingParams(params) {
    _findMissingParams(_makeIterable, createError, params);
}
