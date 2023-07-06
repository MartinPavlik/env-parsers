export declare class ConfigurationError extends Error {
}
export declare type Source = Record<any, any>;
export declare const asBoolRaw: (source: Source) => (key: string) => boolean;
export declare const asBoolOrRaw: (source: Source) => (key: string, defaultValue: boolean) => boolean;
export declare const asStringRaw: (source: Source) => (key: string) => string;
export declare const asStringOrRaw: (source: Source) => (key: string, defaultValue: string) => string;
export declare const asArrayRaw: (source: Source) => (key: string) => string[];
export declare const asArrayOrRaw: (source: Source) => (key: string, defaultValue: string[]) => string[];
export declare const asIntRaw: (source: Source) => (key: string) => number;
export declare const asIntOrRaw: (source: Source) => (key: string, defaultValue: number) => number;
export declare const asNumberRaw: (source: Source) => (key: string) => number;
export declare const asNumberOrRaw: (source: Source) => (key: string, defaultValue: number) => number;
export declare const asEnumRaw: (source: Source) => <T extends string | number>(targetEnum: {
    [key: string]: T;
}) => (key: string) => T;
export declare const asEnumOrRaw: (source: Source) => <T extends string | number>(targetEnum: {
    [key: string]: T;
}) => (key: string, defaultValue: T) => T;
//# sourceMappingURL=raw-parsers.d.ts.map