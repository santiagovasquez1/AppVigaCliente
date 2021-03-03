import { Injector } from "@angular/core";


export class MyInjector {

  private static injector: Injector;

  static setInjector(injector: Injector) {
    MyInjector.injector = injector;
  }

  static getInjector(): Injector {
    return MyInjector.injector;
  }

}
