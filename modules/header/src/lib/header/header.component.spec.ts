import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockComponent } from 'ng-mocks';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [provideMockStore()],
    })
      .overrideComponent(HeaderComponent, {
        set: {
          imports: [
            MatToolbarModule,
            MatIconModule,
            MockComponent(ThemeToggleComponent),
            // ng-mocks doesn't support the new signal based viewChild query
            // so we need to mock the component manually.
            // See also: https://github.com/help-me-mom/ng-mocks/issues/8634
            ToolbarRowComponentStub,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-toolbar-row',
  standalone: true,
  template: ``,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class ToolbarRowComponentStub {}
