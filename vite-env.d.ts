/// <reference types="vite/client" />
declare module "*.pdf";

interface ImportMetaEnv {
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CALENDAR_API_KEY: string;
  readonly VITE_GOOGLE_CALENDAR_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
