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
exports.asEnumOr = exports.asEnum = exports.asNumberOr = exports.asNumber = exports.asIntOr = exports.asInt = exports.asArrayOr = exports.asArray = exports.asStringOr = exports.asString = exports.asBoolOr = exports.asBool = exports.ConfigurationError = void 0;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConfigurationError;
}(Error));
exports.ConfigurationError = ConfigurationError;
var createMissingKeyError = function (key, type) {
    return new ConfigurationError("Missing key " + key + " on process.env object, expected type is " + type);
};
var asBool = function (key) {
    if (process.env[key]) {
        var value = process.env[key];
        return value === '1' || value === 'true';
    }
    throw createMissingKeyError(key, 'boolean');
};
exports.asBool = asBool;
var asBoolOr = function (key, defaultValue) {
    if (process.env[key]) {
        var value = process.env[key];
        return value === '1' || value === 'true';
    }
    return defaultValue;
};
exports.asBoolOr = asBoolOr;
var asString = function (key) {
    if (process.env[key])
        return String(process.env[key]);
    throw createMissingKeyError(key, 'string');
};
exports.asString = asString;
var asStringOr = function (key, defaultValue) {
    if (process.env[key])
        return String(process.env[key]);
    return defaultValue;
};
exports.asStringOr = asStringOr;
var asArray = function (key) {
    if (!process.env[key]) {
        throw createMissingKeyError(key, 'array (comma separated string, for example: value1,value2,value3)');
    }
    var input = exports.asString(key);
    return (input ? input.split(',') : []).map(function (x) { return x.trim(); });
};
exports.asArray = asArray;
var asArrayOr = function (key, defaultValue) {
    var input = process.env[key];
    if (!input)
        return defaultValue;
    return input.split(',');
};
exports.asArrayOr = asArrayOr;
var asInt = function (key) {
    if (process.env[key]) {
        var int = parseInt(process.env[key], 10);
        if (Number.isInteger(int) && !Number.isNaN(int))
            return int;
        throw new ConfigurationError("Invalid configuration of key " + key + ": " + process.env[key]);
    }
    throw createMissingKeyError(key, 'int');
};
exports.asInt = asInt;
var asIntOr = function (key, defaultValue) {
    if (process.env[key]) {
        var int = parseInt(process.env[key], 10);
        if (Number.isInteger(int) && !Number.isNaN(int))
            return int;
        throw new ConfigurationError("Invalid configuration of key " + key + ": " + process.env[key]);
    }
    return defaultValue;
};
exports.asIntOr = asIntOr;
var asNumber = function (key) {
    if (process.env[key]) {
        var float = Number(process.env[key]);
        if (!Number.isNaN(float))
            return float;
        throw new ConfigurationError("Invalid configuration of key " + key + ": " + process.env[key]);
    }
    throw createMissingKeyError(key, 'number');
};
exports.asNumber = asNumber;
var asNumberOr = function (key, defaultValue) {
    if (process.env[key]) {
        var float = Number(process.env[key]);
        if (!Number.isNaN(float))
            return float;
        throw new ConfigurationError("Invalid configuration of key " + key + ": " + process.env[key]);
    }
    return defaultValue;
};
exports.asNumberOr = asNumberOr;
var asEnum = function (targetEnum) { return function (key) {
    var inputValue = process.env[key];
    if (!inputValue) {
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
    throw new ConfigurationError("Can not find " + key + " in enum values " + Object.values(targetEnum).join(", "));
}; };
exports.asEnum = asEnum;
var asEnumOr = function (targetEnum) { return function (key, defaultValue) {
    var inputValue = process.env[key];
    if (!inputValue) {
        return defaultValue;
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
    throw new ConfigurationError("Can not find " + key + " in enum values " + Object.values(targetEnum).join(", "));
}; };
exports.asEnumOr = asEnumOr;
