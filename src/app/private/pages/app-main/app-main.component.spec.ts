import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMainComponent } from '@private/pages/app-main/app-main.component';

describe('AppMainComponent', () => {
  let component: AppMainComponent;
  let fixture: ComponentFixture<AppMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
