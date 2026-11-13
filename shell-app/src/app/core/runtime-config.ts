import { environment } from '../../environments/environment';

export interface RuntimeEnv {
  apiBaseUrl: string;
  remoteAppUrl: string;
}

interface WindowWithEnv extends Window {
  __env?: Partial<RuntimeEnv>;
}

function readRuntimeEnv(): RuntimeEnv {
  const env = (window as WindowWithEnv).__env ?? {};
  return {
    apiBaseUrl: env.apiBaseUrl ?? environment.apiBaseUrl,
    remoteAppUrl: env.remoteAppUrl ?? environment.remoteAppUrl,
  };
}

export const runtimeEnv: RuntimeEnv = readRuntimeEnv();
