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
exports.asEnumOr = exports.asEnum = exports.asIntOr = exports.asInt = exports.asArrayOr = exports.asArray = exports.asStringOr = exports.asString = exports.asBoolOr = exports.asBool = exports.ConfigurationError = void 0;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConfigurationError;
}(Error));
exports.ConfigurationError = ConfigurationError;
var asBool = function (key) {
    if (process.env[key]) {
        var value = process.env[key];
        return value === '1' || value === 'true';
    }
    throw new ConfigurationError("Missing config key " + key);
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
    throw new ConfigurationError("Missing config key " + key);
};
exports.asString = asString;
var asStringOr = function (key, defaultValue) {
    if (process.env[key])
        return String(process.env[key]);
    return defaultValue;
};
exports.asStringOr = asStringOr;
var asArray = function (key) {
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
    throw new ConfigurationError("Missing config key " + key);
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
var asEnum = function (targetEnum) { return function (key) {
    var inputValue = process.env[key];
    if (!inputValue) {
        throw new ConfigurationError("Missing  key " + key);
    }
    var _a = Object.entries(targetEnum).find(function (_a) {
        var _key = _a[0], value = _a[1];
        return value === inputValue;
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
        return value === inputValue;
    }) ||
        [], _enumKey = _a[0], enumValue = _a[1];
    if (enumValue !== undefined) {
        return enumValue;
    }
    return defaultValue;
}; };
exports.asEnumOr = asEnumOr;
