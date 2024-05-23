import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  private readonly document = inject(DOCUMENT);
  private readonly themeLinkId = 'theme';

  protected darkTheme = true;

  toggleTheme() {
    if (this.darkTheme) {
      this.enableLightTheme();
    } else {
      this.disableLightTheme();
    }

    this.darkTheme = !this.darkTheme;
  }

  private enableLightTheme() {
    this.getThemeLinkElement().setAttribute('href', 'light-theme.css');
  }

  private disableLightTheme() {
    const existingLinkElement = this.getExistingThemeLinkElement();
    if (existingLinkElement) {
      this.document.head.removeChild(existingLinkElement);
    }
  }

  private getThemeLinkElement() {
    return this.getExistingThemeLinkElement() || this.createThemeLinkElement();
  }

  private getExistingThemeLinkElement() {
    return this.document.head.querySelector(
      `link[rel="stylesheet"]#${this.themeLinkId}`,
    );
  }

  private createThemeLinkElement() {
    const linkEl = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.id = this.themeLinkId;
    this.document.head.appendChild(linkEl);
    return linkEl;
  }
}
