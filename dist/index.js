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
exports.createParser = exports.asEnumOr = exports.asEnum = exports.asNumberOr = exports.asNumber = exports.asIntOr = exports.asInt = exports.asArrayOr = exports.asArray = exports.asStringOr = exports.asString = exports.asBoolOr = exports.asBool = exports.ConfigurationError = void 0;
var ConfigurationError = /** @class */ (function (_super) {
    __extends(ConfigurationError, _super);
    function ConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ConfigurationError;
}(Error));
exports.ConfigurationError = ConfigurationError;
// import all raw parsers
var raw_parsers_1 = require("./raw-parsers");
exports.asBool = raw_parsers_1.asBoolRaw(process.env);
exports.asBoolOr = raw_parsers_1.asBoolOrRaw(process.env);
exports.asString = raw_parsers_1.asStringRaw(process.env);
exports.asStringOr = raw_parsers_1.asStringOrRaw(process.env);
exports.asArray = raw_parsers_1.asArrayRaw(process.env);
exports.asArrayOr = raw_parsers_1.asArrayOrRaw(process.env);
exports.asInt = raw_parsers_1.asIntRaw(process.env);
exports.asIntOr = raw_parsers_1.asIntOrRaw(process.env);
exports.asNumber = raw_parsers_1.asNumberRaw(process.env);
exports.asNumberOr = raw_parsers_1.asNumberOrRaw(process.env);
exports.asEnum = raw_parsers_1.asEnumRaw(process.env);
exports.asEnumOr = raw_parsers_1.asEnumOrRaw(process.env);
var createParser = function (source) { return ({
    asBool: raw_parsers_1.asBoolRaw(source),
    asBoolOr: raw_parsers_1.asBoolOrRaw(source),
    asString: raw_parsers_1.asStringRaw(source),
    asStringOr: raw_parsers_1.asStringOrRaw(source),
    asArray: raw_parsers_1.asArrayRaw(source),
    asArrayOr: raw_parsers_1.asArrayOrRaw(source),
    asInt: raw_parsers_1.asIntRaw(source),
    asIntOr: raw_parsers_1.asIntOrRaw(source),
    asNumber: raw_parsers_1.asNumberRaw(source),
    asNumberOr: raw_parsers_1.asNumberOrRaw(source),
    asEnum: raw_parsers_1.asEnumRaw(source),
    asEnumOr: raw_parsers_1.asEnumOrRaw(source)
}); };
exports.createParser = createParser;
