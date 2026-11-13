import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { runtimeEnv } from './runtime-config';

export interface ApiInfo {
  app: string;
  version: string;
  env: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = runtimeEnv.apiBaseUrl;

  getInfo(): Observable<ApiResponse<ApiInfo>> {
    return this.http.get<ApiResponse<ApiInfo>>(`${this.baseUrl}/api/info`);
  }
}
