/* tslint:disable no-any no-unsafe-any */

interface ArrayLike<T = unknown> extends Array<any> {
  [ index: number ]: T;
}

interface ObjectLike {
  [ key: string ]: unknown;
}

export class CompareUtil {

  public static isArray<T>(value: any): value is ArrayLike<T> {
    return Object.prototype.toString.call(value) === '[object Array]';
  }

  public static isArrayAndNotEmpty<T>(value: any): value is ArrayLike<T> {
    return Object.prototype.toString.call(value) === '[object Array]' && value.length > 0;
  }

  public static isObject<T>(value: any): value is ObjectLike {
    return typeof value === 'object';
  }

  public static isObjectAndNotEmpty<T>(value: any): value is ObjectLike {
    return CompareUtil.isObject(value) && Object.keys(value).length !== 0;
  }

  public static isBoolean(value: any): value is boolean {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  }

  public static isDate(value: any): value is Date {
    return Object.prototype.toString.call(value) === '[object Date]';
  }

  public static isFunction(value: any): value is () => void {
    return Object.prototype.toString.call(value) === '[object Function]';
  }

  public static isNumber(value: any): value is number {
    return Object.prototype.toString.call(value) === '[object Number]';
  }

  public static isNumberAndNotNaN(value: any): value is number {
    return Object.prototype.toString.call(value) === '[object Number]' && !isNaN(value);
  }

  public static isString(value: any): value is string {
    return typeof value === 'string';
  }

  public static isStringAndNotEmpty(value: any): value is string {
    return CompareUtil.isString(value) && value.trim() !== '';
  }

  public static isJsonString(value: any): boolean {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  public static isNullOrUndefined(value: any): value is null | undefined {
    return value === null || value === undefined;
  }

  public static shallowEqualObjects(objA: object, objB: object): boolean {
    // tslint:disable-next-line: strict-comparisons
    if (objA === objB) {
      return true;
    }
    if (!objA || !objB) {
      return false;
    }
    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);
    const aKeysLen = aKeys.length;
    const bKeysLen = bKeys.length;

    if (aKeysLen !== bKeysLen) {
      return false;
    }
    for (let i = 0; i < aKeysLen; i++) {
      const key = aKeys[ i ];
      if (objA[ key ] !== objB[ key ]) {
        return false;
      }
    }
    return true;
  }

}
