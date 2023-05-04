import { crx, defineManifest } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const manifest = defineManifest({
  manifest_version: 3,
  name: "download-hls",
  version: "0.0.1",
  permissions: [],
  action: {
    default_popup: "index.html",
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
