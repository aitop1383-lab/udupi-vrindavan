/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BLOG_MODE: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_GOOGLE_SHEETS_URL: string;
  readonly VITE_CRM_SCRIPT_URL: string;
  readonly VITE_IMGBB_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
