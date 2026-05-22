import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private readonly baseUrl = environment.apiBaseUrl;

  getInfo(): Observable<ApiResponse<ApiInfo>> {
    return this.http.get<ApiResponse<ApiInfo>>(`${this.baseUrl}/api/info`);
  }
}
