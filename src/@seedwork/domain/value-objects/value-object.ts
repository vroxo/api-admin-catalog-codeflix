import { deepFreeze } from '#seedwork/domain/utils'

export default abstract class ValueObject<Value = any> { 
  protected readonly _value: any

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }
  
  get value() {
    return this._value;
  }

  toString = () => {

    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch(e) {
        return `${this.value}`
      }
    }
    const valueString = this.value.toString();
    return valueString === "[object Object]" 
      ? JSON.stringify(this.value) 
      : valueString;
  }
}