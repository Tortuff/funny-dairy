import { TestBed } from '@angular/core/testing';

import { AppLoginService } from './app-login.service';

describe('AuthorizationServiceService', () => {
  let service: AppLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
