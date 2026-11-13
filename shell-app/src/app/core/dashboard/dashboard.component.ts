import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiInfo, ApiService } from '../api.service';
import { runtimeEnv } from '../runtime-config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard</h2>
    <p>API base URL (runtime): <code>{{ apiBaseUrl }}</code></p>
    <p>Remote entry (runtime): <code>{{ remoteAppUrl }}</code></p>

    <section>
      <h3>Backend health</h3>
      <button type="button" (click)="refresh()" [disabled]="loading">Refresh</button>
      <p *ngIf="loading">Loading…</p>
      <p *ngIf="error" class="error">{{ error }}</p>
      <dl *ngIf="info">
        <dt>App</dt>
        <dd>{{ info.app }}</dd>
        <dt>Version</dt>
        <dd>{{ info.version }}</dd>
        <dt>Env</dt>
        <dd>{{ info.env }}</dd>
      </dl>
    </section>
  `,
  styles: [
    `
      .error {
        color: #c0392b;
      }
      code {
        background: #f4f4f4;
        padding: 2px 6px;
        border-radius: 4px;
      }
      dl {
        display: grid;
        grid-template-columns: max-content auto;
        gap: 0.25rem 1rem;
      }
      dt {
        font-weight: 600;
      }
      dd {
        margin: 0;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  private readonly apiService = inject(ApiService);

  readonly apiBaseUrl = runtimeEnv.apiBaseUrl;
  readonly remoteAppUrl = runtimeEnv.remoteAppUrl;

  info: ApiInfo | undefined;
  loading = false;
  error: string | undefined;

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.loading = true;
    this.error = undefined;
    this.apiService.getInfo().subscribe({
      next: (res) => {
        this.info = res.data;
        this.loading = false;
      },
      error: (err: unknown) => {
        this.error = this.describeError(err);
        this.loading = false;
      },
    });
  }

  private describeError(err: unknown): string {
    if (err instanceof Error) {
      return err.message;
    }
    return 'Backend unreachable — is devops-spring-app running?';
  }
}
