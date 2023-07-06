"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.asEnumOrRaw = exports.asEnumRaw = exports.asNumberOrRaw = exports.asNumberRaw = exports.asIntOrRaw = exports.asIntRaw = exports.asArrayOrRaw = exports.asArrayRaw = exports.asStringOrRaw = exports.asStringRaw = exports.asBoolOrRaw = exports.asBoolRaw = exports.ConfigurationError = void 0;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConfigurationError;
}(Error));
exports.ConfigurationError = ConfigurationError;
var createMissingKeyError = function (key, type) {
    return new ConfigurationError("Missing key '" + key + "' on configuration object, expected type is '" + type + "'");
};
var isUndefined = function (value) { return typeof value === 'undefined'; };
var asBoolRaw = function (source) { return function (key) {
    if (source[key]) {
        var value = source[key];
        var isTrue = value === '1' || value === 'true';
        var isFalse = value === '0' || value === 'false';
        if (!isTrue && !isFalse) {
            throw new ConfigurationError("Value of key '" + key + "': '" + source[key] + "' can not be parsed as boolean, expected: 1, 0, true or false");
        }
        return isTrue;
    }
    throw createMissingKeyError(key, 'boolean');
}; };
exports.asBoolRaw = asBoolRaw;
var asBoolOrRaw = function (source) { return function (key, defaultValue) {
    if (isUndefined(source[key]))
        return defaultValue;
    return exports.asBoolRaw(source)(key);
}; };
exports.asBoolOrRaw = asBoolOrRaw;
var asStringRaw = function (source) { return function (key) {
    if (isUndefined(source[key]))
        throw createMissingKeyError(key, 'string');
    return String(source[key]);
}; };
exports.asStringRaw = asStringRaw;
var asStringOrRaw = function (source) { return function (key, defaultValue) {
    if (isUndefined(source[key]))
        return defaultValue;
    return exports.asStringRaw(source)(key);
}; };
exports.asStringOrRaw = asStringOrRaw;
var asArrayRaw = function (source) { return function (key) {
    if (isUndefined(source[key]))
        throw createMissingKeyError(key, 'array (comma separated string, for example: value1,value2,value3)');
    var input = exports.asStringRaw(source)(key);
    return (input ? input.split(',') : []).map(function (x) { return x.trim(); });
}; };
exports.asArrayRaw = asArrayRaw;
var asArrayOrRaw = function (source) { return function (key, defaultValue) {
    if (isUndefined(source[key]))
        return defaultValue;
    return exports.asArrayRaw(source)(key);
}; };
exports.asArrayOrRaw = asArrayOrRaw;
var asIntRaw = function (source) { return function (key) {
    if (source[key]) {
        var int = parseInt(source[key], 10);
        if (Number.isInteger(int) && !Number.isNaN(int))
            return int;
        throw new ConfigurationError("Invalid configuration of key '" + key + "': '" + source[key] + "', expected type is 'integer'");
    }
    throw createMissingKeyError(key, 'integer');
}; };
exports.asIntRaw = asIntRaw;
var asIntOrRaw = function (source) { return function (key, defaultValue) {
    if (isUndefined(source[key]))
        return defaultValue;
    return exports.asIntRaw(source)(key);
}; };
exports.asIntOrRaw = asIntOrRaw;
var asNumberRaw = function (source) { return function (key) {
    if (source[key]) {
        var float = Number(source[key]);
        if (!Number.isNaN(float))
            return float;
        throw new ConfigurationError("Invalid configuration of key '" + key + "': '" + source[key] + "', expected type is 'number'");
    }
    throw createMissingKeyError(key, 'number');
}; };
exports.asNumberRaw = asNumberRaw;
var asNumberOrRaw = function (source) { return function (key, defaultValue) {
    if (isUndefined(source[key]))
        return defaultValue;
    return exports.asNumberRaw(source)(key);
}; };
exports.asNumberOrRaw = asNumberOrRaw;
var asEnumRaw = function (source) { return function (targetEnum) { return function (key) {
    var inputValue = source[key];
    if (isUndefined(inputValue)) {
        throw createMissingKeyError(key, "enum with values " + Object.values(targetEnum).join(", "));
    }
    var _a = Object.entries(targetEnum).find(function (_a) {
        var _key = _a[0], value = _a[1];
        // string enums
        return value === inputValue ||
            // int enums
            (Number(value) === Number(inputValue) &&
                !Number.isNaN(Number(value)) &&
                !Number.isNaN(Number(inputValue)));
    }) ||
        [], _enumKey = _a[0], enumValue = _a[1];
    if (enumValue !== undefined) {
        return enumValue;
    }
    throw new ConfigurationError("Can not parse value of key '" + key + "': '" + inputValue + "' as enum, expected values are: " + Object.values(targetEnum).join(", "));
}; }; };
exports.asEnumRaw = asEnumRaw;
var asEnumOrRaw = function (source) { return function (targetEnum) { return function (key, defaultValue) {
    var inputValue = source[key];
    if (isUndefined(inputValue)) {
        return defaultValue;
    }
    return exports.asEnumRaw(source)(targetEnum)(key);
}; }; };
exports.asEnumOrRaw = asEnumOrRaw;
