export declare class ConfigurationError extends Error {
}
export declare const asBool: (key: string) => boolean;
export declare const asBoolOr: (key: string, defaultValue: boolean) => boolean;
export declare const asString: (key: string) => string;
export declare const asStringOr: (key: string, defaultValue: string) => string;
export declare const asArray: (key: string) => string[];
export declare const asArrayOr: (key: string, defaultValue: string[]) => string[];
export declare const asInt: (key: string) => number;
export declare const asIntOr: (key: string, defaultValue: number) => number;
export declare const asNumber: (key: string) => number;
export declare const asNumberOr: (key: string, defaultValue: number) => number;
export declare const asEnum: <T extends string | number>(targetEnum: {
    [key: string]: T;
}) => (key: string) => T;
export declare const asEnumOr: <T extends string | number>(targetEnum: {
    [key: string]: T;
}) => (key: string, defaultValue: T) => T;
//# sourceMappingURL=index.d.ts.map