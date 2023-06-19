export class ConfigurationError extends Error {}

const createMissingKeyError = (key: string, type: string) =>
  new ConfigurationError(`Missing key ${key} on process.env object, expected type is ${type}`);

export const asBool = (key: string): boolean => {
  if (process.env[key]) {
    const value = process.env[key];
    return value === '1' || value === 'true';
  }
  throw createMissingKeyError(key, 'boolean');
};

export const asBoolOr = (key: string, defaultValue: boolean): boolean => {
  if (process.env[key]) {
    const value = process.env[key];
    return value === '1' || value === 'true';
  }

  return defaultValue;
};

export const asString = (key: string): string => {
  if (process.env[key]) return String(process.env[key]);

  throw createMissingKeyError(key, 'string');
};

export const asStringOr = (key: string, defaultValue: string): string => {
  if (process.env[key]) return String(process.env[key]);

  return defaultValue;
};

export const asArray = (key: string) => {
  if (!process.env[key]) {
    throw createMissingKeyError(key, 'array (comma separated string, for example: value1,value2,value3)');
  }
  const input = asString(key);
  return (input ? input.split(',') : []).map((x) => x.trim());
};

export const asArrayOr = (key: string, defaultValue: string[]) => {
  const input = process.env[key];
  if (!input) return defaultValue;

  return input.split(',');
};

export const asInt = (key: string): number => {
  if (process.env[key]) {
    const int = parseInt(process.env[key], 10);

    if (Number.isInteger(int) && !Number.isNaN(int)) return int;

    throw new ConfigurationError(`Invalid configuration of key ${key}: ${process.env[key]}`);
  }

  throw createMissingKeyError(key, 'int');
};

export const asIntOr = (key: string, defaultValue: number): number => {
  if (process.env[key]) {
    const int = parseInt(process.env[key], 10);

    if (Number.isInteger(int) && !Number.isNaN(int)) return int;

    throw new ConfigurationError(`Invalid configuration of key ${key}: ${process.env[key]}`);
  }

  return defaultValue;
};

export const asNumber = (key: string): number => {
  if (process.env[key]) {
    const float = Number(process.env[key]);

    if (!Number.isNaN(float)) return float;

    throw new ConfigurationError(`Invalid configuration of key ${key}: ${process.env[key]}`);
  }

  throw createMissingKeyError(key, 'number');
};

export const asNumberOr = (key: string, defaultValue: number): number => {
  if (process.env[key]) {
    const float = Number(process.env[key]);

    if (!Number.isNaN(float)) return float;

    throw new ConfigurationError(`Invalid configuration of key ${key}: ${process.env[key]}`);
  }

  return defaultValue;
};


export const asEnum = <T extends string | number>(targetEnum: {
  [key: string]: T;
}) => (key: string): T => {
  const inputValue = process.env[key];

  if (!inputValue) {
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
    `Can not find ${key} in enum values ${Object.values(targetEnum).join(", ")}`
  );
};

export const asEnumOr = <T extends string | number>(targetEnum: {
  [key: string]: T;
}) => (key: string, defaultValue: T): T => {
  const inputValue = process.env[key];

  if (!inputValue) {
    return defaultValue;
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
    `Can not find ${key} in enum values ${Object.values(targetEnum).join(", ")}`
  );
};
