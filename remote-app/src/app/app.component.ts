import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>
      <strong>Remote App</strong>
      <span>standalone instance (port 4201)</span>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: system-ui, sans-serif;
      }
      header {
        padding: 1rem;
        border-bottom: 1px solid #ddd;
        display: flex;
        gap: 1rem;
        align-items: baseline;
      }
      header span {
        color: #888;
        font-size: 0.85rem;
      }
      main {
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {}
