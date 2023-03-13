import { TestBed } from '@angular/core/testing';

import { ToasterInterceptor } from './toast.interceptor';

describe('ToastInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ToasterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ToasterInterceptor = TestBed.inject(ToasterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
