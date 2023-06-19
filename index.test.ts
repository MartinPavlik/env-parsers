import { asBool, asBoolOr, asString, asStringOr, asArray, asArrayOr, asInt, asIntOr, asNumber, asNumberOr, asEnum, asEnumOr } from './index'

describe('asBool', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return true if env var is 1', () => {
    process.env.TEST = '1';
    expect(asBool('TEST')).toBe(true);
  });

  it('should return true if env var is true', () => {
    process.env.TEST = 'true';
    expect(asBool('TEST')).toBe(true);
  });

  it('should return false if env var is 0', () => {
    process.env.TEST = '0';
    expect(asBool('TEST')).toBe(false);
  });

  it('should return false if env var is false', () => {
    process.env.TEST = 'false';
    expect(asBool('TEST')).toBe(false);
  });

  it('should throw if env var is not set', () => {
    expect(() => asBool('TEST')).toThrowError('Missing key TEST on process.env object, expected type is boolean');
  });
});

describe('asBoolOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return true if env var is 1', () => {
    expect(asBoolOr('TEST', true)).toBe(true);
  });

  it('should return true if env var is true', () => {
    process.env.TEST = 'true';
    expect(asBoolOr('TEST', true)).toBe(true);
  })

  it('should return false if env var is 0', () => {
    process.env.TEST = '0';
    expect(asBoolOr('TEST', true)).toBe(false);
  })

  it('should return false if env var is false', () => {
    process.env.TEST = 'false';
    expect(asBoolOr('TEST', true)).toBe(false);
  })

  it('should return default if env var is not set', () => {
    expect(asBoolOr('TEST', true)).toBe(true);
  })

  it('should return default if env var is not set', () => {
    expect(asBoolOr('TEST', false)).toBe(false);
  })
});

describe('asString', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value if env var is set', () => {
    process.env.TEST = 'test';
    expect(asString('TEST')).toBe('test');
  });

  it('should throw if env var is not set', () => {
    expect(() => asString('TEST')).toThrowError('Missing key TEST on process.env object, expected type is string');
  });
});

// Same behaviour as asBoolOr only with strings
describe('asStringOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return default value if env prop is not set', () => {
    expect(asStringOr('TEST', 'defaultValue')).toBe('defaultValue');
  });

  it('should return value if env prop is set', () => {
    process.env.TEST = 'test';
    expect(asStringOr('TEST', 'defaultValue')).toBe('test');
  });
});

// Same behaviour as asArray only with strings
describe('asArray', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = 'test';
    expect(asArray('TEST')).toEqual(['test']);
    process.env.TEST = 'test,test2,test3';
    expect(asArray('TEST')).toEqual(['test','test2','test3']);
  });

  it('should throw an error if the process.env property is not set', () => {
      expect(() => asBool('TEST')).toThrowError('Missing key TEST on process.env object, expected type is boolean');
  });
});




// Same behaviour as asArray only with strings
describe('asArrayOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = 'test';
    expect(asArrayOr('TEST', ['lala'])).toEqual(['test']);
    process.env.TEST = 'test,test2,test3';
    expect(asArrayOr('TEST', ['lala'])).toEqual(['test','test2','test3']);
  });

  it('should return default value if process.env is not set', () => {
    expect(asArrayOr('TEST', ['test','test2','test3'])).toEqual(['test','test2','test3']);
  });
});

describe('asInt', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = '1';
    expect(asInt('TEST')).toBe(1);
    process.env.TEST = '55';
    expect(asInt('TEST')).toBe(55);
  });

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = 'xxx';
    expect(() => asInt('TEST')).toThrowError('Invalid configuration of key TEST: xxx');
  })


  it('should throw an error if the process.env property is not set', () => {
      expect(() => asInt('TEST')).toThrowError('Missing key TEST on process.env object, expected type is int');
  });
});

describe('asIntOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = '1';
    expect(asIntOr('TEST', 2)).toBe(1);
    process.env.TEST = '55';
    expect(asIntOr('TEST', 2)).toBe(55);
  });

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = 'xxx';
    expect(() => asIntOr('TEST', 55)).toThrowError('Invalid configuration of key TEST: xxx');
  })

  it('should return default value if process.env is not set', () => {
    expect(asIntOr('TEST', 2)).toBe(2);
  });
})

describe('asNumber', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = '1.5';
    expect(asNumber('TEST')).toBe(1.5);
    process.env.TEST = '55.5';
    expect(asNumber('TEST')).toBe(55.5);
  });

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = '55.5.5';
    expect(() => asNumber('TEST')).toThrowError('Invalid configuration of key TEST: 55.5.5');
  })

  it('should throw an error if the process.env property is not set', () => {
      expect(() => asNumber('TEST')).toThrowError('Missing key TEST on process.env object, expected type is number');
  });
})

describe('asNumberOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set', () => {
    process.env.TEST = '1.5';
    expect(asNumberOr('TEST', 2)).toBe(1.5);
    process.env.TEST = '55.5';
    expect(asNumberOr('TEST', 2)).toBe(55.5);
  });

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = '55.5.5';
    expect(() => asNumberOr('TEST', 55.5)).toThrowError('Invalid configuration of key TEST: 55.5.5');
  })

  it('should return default value if process.env is not set', () => {
    expect(asNumberOr('TEST', 2)).toBe(2);
  });
});

describe('asEnum', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set (string enums)', () => {
    process.env.TEST = 'ONE'
    enum TestEnum {
      ONE = 'ONE',
      TWO = 'TWO'
    }
    expect(asEnum(TestEnum)('TEST')).toBe(TestEnum.ONE);
    process.env.TEST = 'TWO';
    expect(asEnum(TestEnum)('TEST')).toBe(TestEnum.TWO);
  });

  it('should return value from process.env if it is set (int enums)', () => {
    process.env.TEST = '1'
    enum TestEnum {
      ONE = 1,
      TWO = 2,
    }
    expect(asEnum(TestEnum)('TEST')).toBe(TestEnum.ONE);
    process.env.TEST = '2';
    expect(asEnum(TestEnum)('TEST')).toBe(TestEnum.TWO);
  });

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = 'THREE';
    enum TestEnum {
      ONE,
      TWO,
    }
    expect(() => asEnum(TestEnum)('TEST')).toThrowError('Can not find TEST in enum values ONE, TWO, 0, 1');
  })

  it('should throw an error if the process.env property is not set', () => {
      enum TestEnum {
        ONE,
        TWO,
      }
      expect(() => asEnum(TestEnum)('TEST')).toThrowError('Missing key TEST on process.env object, expected type is enum with values ONE, TWO, 0, 1');
  });
});


describe('asEnumOr', () => {
  afterEach(() => {
    delete process.env.TEST;
  });
  it('should return value from process.env if it is set (string enums)', () => {
    process.env.TEST = 'ONE'
    enum TestEnum {
      ONE = 'ONE',
      TWO = 'TWO'
    }
    expect(asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toBe(TestEnum.ONE);
    process.env.TEST = 'TWO';
    expect(asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toBe(TestEnum.TWO);
  });

  it('should return value from process.env if it is set (int enums)', () => {
    process.env.TEST = '1'
    enum TestEnum {
      ONE = 1,
      TWO = 2,
    }
    expect(asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toBe(TestEnum.ONE);
    process.env.TEST = '2';
    expect(asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toBe(TestEnum.TWO);
  });

  it('should return default value if the process.env prop is not set', () => {
    enum TestEnum {
      ONE,
      TWO,
    }
    expect(asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toBe(TestEnum.TWO);
  })

  it('should throw an error if the value can not be parsed', () => {
    process.env.TEST = 'THREE';
    enum TestEnum {
      ONE,
      TWO,
    }
    expect(() => asEnumOr(TestEnum)('TEST', TestEnum.TWO)).toThrowError('Can not find TEST in enum values ONE, TWO, 0, 1');
  })
});
