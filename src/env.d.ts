/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RETRO_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
