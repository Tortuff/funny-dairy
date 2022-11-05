import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Main.AppComponent } from './main.app.component';

describe('Main.AppComponent', () => {
  let component: Main.AppComponent;
  let fixture: ComponentFixture<Main.AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Main.AppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Main.AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
