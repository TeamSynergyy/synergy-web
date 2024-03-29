import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    {
      name: "remove-mock-service-worker",
      writeBundle: () => {
        const filePath = path.resolve(__dirname, "./dist/mockServiceWorker.js");
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      },
    },
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://synergyy.link",
        changeOrigin: true, // host 헤더를 변경합니다.
        secure: false, // SSL 설정 (https 프로토콜)
      },
      "/oauth2/authorization": {
        target: "https://synergyy.link",
        changeOrigin: true, // host 헤더를 변경합니다.
        secure: false, // SSL 설정 (https 프로토콜)
      },
    },
  },
});
