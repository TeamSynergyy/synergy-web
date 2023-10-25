import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "https://synergyy.link",
        changeOrigin: true, // host 헤더를 변경합니다.
        secure: false, // SSL 설정 (https 프로토콜)
      },
      "localhost:8080/api": {
        target: "http://localhost:8080",
        changeOrigin: true, // host 헤더를 변경합니다.
        secure: false, // SSL 설정 (https 프로토콜)
      },
    },
  },
});
