import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // base: "/skillconnect/", // uncomment & set when deploying to GitHub pages under repo name
});
