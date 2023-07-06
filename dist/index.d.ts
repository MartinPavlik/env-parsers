export declare class ConfigurationError extends Error {
}
export declare type Source = Record<any, any>;
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
export declare const createParser: (source: Source) => {
    asBool: (key: string) => boolean;
    asBoolOr: (key: string, defaultValue: boolean) => boolean;
    asString: (key: string) => string;
    asStringOr: (key: string, defaultValue: string) => string;
    asArray: (key: string) => string[];
    asArrayOr: (key: string, defaultValue: string[]) => string[];
    asInt: (key: string) => number;
    asIntOr: (key: string, defaultValue: number) => number;
    asNumber: (key: string) => number;
    asNumberOr: (key: string, defaultValue: number) => number;
    asEnum: <T extends string | number>(targetEnum: {
        [key: string]: T;
    }) => (key: string) => T;
    asEnumOr: <T_1 extends string | number>(targetEnum: {
        [key: string]: T_1;
    }) => (key: string, defaultValue: T_1) => T_1;
};
//# sourceMappingURL=index.d.ts.map