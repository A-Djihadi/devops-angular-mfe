import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/remote" routerLinkActive="active">Remote MFE</a>
      </nav>
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
      }
      nav a {
        margin-right: 1rem;
        text-decoration: none;
        color: #333;
      }
      nav a.active {
        font-weight: 700;
        color: #0b5fff;
      }
      main {
        padding: 1rem;
      }
    `,
  ],
})
export class AppComponent {}
