import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarRowComponent } from './toolbar-row.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('ToolbarRowComponent', () => {
  let component: ToolbarRowComponent;
  let fixture: ComponentFixture<ToolbarRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarRowComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
