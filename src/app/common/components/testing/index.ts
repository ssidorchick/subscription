import { By } from '@angular/platform-browser';

export function getChildComponent<T>(fixture, T): T {
  const element = fixture.debugElement.query(By.directive(T));
  return element.injector.get(T) as T;
}

export function getChildComponentByCSS<T>(fixture, T, css): T {
  const element = fixture.debugElement.query(By.css(css));
  return element.injector.get(T) as T;
}
