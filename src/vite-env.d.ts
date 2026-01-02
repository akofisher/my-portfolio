/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENROUTER_API_KEY: string;
  // add more variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
