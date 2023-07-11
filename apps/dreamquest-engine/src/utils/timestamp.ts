export class Timestamp extends Date {
  constructor(...args: any[]) {
    if (args.length === 0) {
      super();
    } else {
      const dateInstance = Reflect.construct(Date, args);
      Object.setPrototypeOf(dateInstance, Timestamp.prototype);
      return dateInstance;
    }
  }
}
