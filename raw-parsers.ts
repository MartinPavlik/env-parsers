export class ConfigurationError extends Error {}

const createMissingKeyError = (key: string, type: string) =>
  new ConfigurationError(`Missing key '${key}' on configuration object, expected type is '${type}'`);

const isUndefined = <T> (value: T | undefined): value is undefined => typeof value === 'undefined';

export type Source = Record<any, any>;

export const asBoolRaw = (source: Source) => (key: string): boolean => {
  if (source[key]) {
    const value = source[key];
    const isTrue = value === '1' || value === 'true';
    const isFalse = value === '0' || value === 'false';

    if (!isTrue && !isFalse) {
      throw new ConfigurationError(`Value of key '${key}': '${source[key]}' can not be parsed as boolean, expected: 1, 0, true or false`);
    }

    return isTrue;
  }
  throw createMissingKeyError(key, 'boolean');
};

export const asBoolOrRaw = (source: Source) => (key: string, defaultValue: boolean): boolean => {
  if (isUndefined(source[key])) return defaultValue;
  return asBoolRaw(source)(key);
};

export const asStringRaw = (source: Source) => (key: string): string => {
  if (isUndefined(source[key])) throw createMissingKeyError(key, 'string');
  return String(source[key]);
};

export const asStringOrRaw = (source: Source) => (key: string, defaultValue: string): string => {
  if (isUndefined(source[key])) return defaultValue;
  return asStringRaw(source)(key);
};

export const asArrayRaw = (source: Source) => (key: string) => {
  if (isUndefined(source[key])) throw createMissingKeyError(key, 'array (comma separated string, for example: value1,value2,value3)');
  const input = asStringRaw(source)(key);
  return (input ? input.split(',') : []).map((x) => x.trim());
};

export const asArrayOrRaw = (source: Source) => (key: string, defaultValue: string[]) => {
  if (isUndefined(source[key])) return defaultValue;
  return asArrayRaw(source)(key);
};

export const asIntRaw = (source: Source) => (key: string): number => {
  if (source[key]) {
    const int = parseInt(source[key], 10);

    if (Number.isInteger(int) && !Number.isNaN(int)) return int;

    throw new ConfigurationError(`Invalid configuration of key '${key}': '${source[key]}', expected type is 'integer'`);
  }

  throw createMissingKeyError(key, 'integer');
};

export const asIntOrRaw = (source: Source) => (key: string, defaultValue: number): number => {
  if (isUndefined(source[key])) return defaultValue;
  return asIntRaw(source)(key);
};

export const asNumberRaw = (source: Source) => (key: string): number => {
  if (source[key]) {
    const float = Number(source[key]);

    if (!Number.isNaN(float)) return float;

    throw new ConfigurationError(`Invalid configuration of key '${key}': '${source[key]}', expected type is 'number'`);
  }

  throw createMissingKeyError(key, 'number');
};

export const asNumberOrRaw = (source: Source) => (key: string, defaultValue: number): number => {
  if (isUndefined(source[key])) return defaultValue;
  return asNumberRaw(source)(key);
};


export const asEnumRaw = (source: Source) => <T extends string | number>(targetEnum: {
  [key: string]: T;
}) => (key: string): T => {
  const inputValue = source[key];

  if (isUndefined(inputValue)) {
    throw createMissingKeyError(key, `enum with values ${Object.values(targetEnum).join(", ")}`);
  }

  const [_enumKey, enumValue] =
    Object.entries(targetEnum).find(([_key, value]) =>
      // string enums
      value === inputValue ||
      // int enums
      (
        Number(value) === Number(inputValue) &&
        !Number.isNaN(Number(value)) &&
        !Number.isNaN(Number(inputValue))
      )
    ) ||
    [];

  if (enumValue !== undefined) {
    return enumValue;
  }

  throw new ConfigurationError(
    `Can not parse value of key '${key}': '${inputValue}' as enum, expected values are: ${Object.values(targetEnum).join(", ")}`
  );
};

export const asEnumOrRaw = (source: Source) => <T extends string | number>(targetEnum: {
  [key: string]: T;
}) => (key: string, defaultValue: T): T => {
  const inputValue = source[key];

  if (isUndefined(inputValue)) {
    return defaultValue;
  }

  return asEnumRaw(source)(targetEnum)(key);
};
