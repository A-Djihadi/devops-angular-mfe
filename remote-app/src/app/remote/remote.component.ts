import { Component } from '@angular/core';

@Component({
  selector: 'app-remote',
  standalone: true,
  template: `
    <div class="remote-card">
      <h2>Remote Feature</h2>
      <p>This component is loaded from the remote micro frontend via Module Federation.</p>
      <p class="badge">remote-app — port 4201</p>
    </div>
  `,
  styles: [
    `
      .remote-card {
        border: 2px solid #0b5fff;
        border-radius: 8px;
        padding: 1.5rem;
        max-width: 480px;
      }
      .badge {
        display: inline-block;
        background: #0b5fff;
        color: #fff;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 0.8rem;
      }
    `,
  ],
})
export class RemoteComponent {}
