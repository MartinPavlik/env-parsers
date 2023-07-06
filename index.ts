export class ConfigurationError extends Error {}

// import all raw parsers
import {
  asBoolRaw,
  asBoolOrRaw,
  asStringRaw,
  asStringOrRaw,
  asArrayRaw,
  asArrayOrRaw,
  asIntRaw,
  asIntOrRaw,
  asNumberRaw,
  asNumberOrRaw,
  asEnumRaw,
  asEnumOrRaw,
} from './raw-parsers';

export type Source = Record<any, any>;

export const asBool = asBoolRaw(process.env);

export const asBoolOr = asBoolOrRaw(process.env);

export const asString = asStringRaw(process.env);

export const asStringOr = asStringOrRaw(process.env);

export const asArray = asArrayRaw(process.env);

export const asArrayOr = asArrayOrRaw(process.env);

export const asInt = asIntRaw(process.env);

export const asIntOr = asIntOrRaw(process.env);

export const asNumber = asNumberRaw(process.env);

export const asNumberOr = asNumberOrRaw(process.env);

export const asEnum = asEnumRaw(process.env);

export const asEnumOr = asEnumOrRaw(process.env);

export const createParser = (source: Source) => ({
  asBool: asBoolRaw(source),
  asBoolOr: asBoolOrRaw(source),
  asString: asStringRaw(source),
  asStringOr: asStringOrRaw(source),
  asArray: asArrayRaw(source),
  asArrayOr: asArrayOrRaw(source),
  asInt: asIntRaw(source),
  asIntOr: asIntOrRaw(source),
  asNumber: asNumberRaw(source),
  asNumberOr: asNumberOrRaw(source),
  asEnum: asEnumRaw(source),
  asEnumOr: asEnumOrRaw(source),
});
