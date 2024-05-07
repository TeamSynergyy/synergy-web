// vite.config.ts
import { defineConfig } from "file:///Users/yeoularu/workspace/synergy-web/node_modules/.pnpm/vite@4.4.11/node_modules/vite/dist/node/index.js";
import react from "file:///Users/yeoularu/workspace/synergy-web/node_modules/.pnpm/@vitejs+plugin-react-swc@3.4.0_vite@4.4.11/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///Users/yeoularu/workspace/synergy-web/node_modules/.pnpm/vite-tsconfig-paths@4.2.1_typescript@5.2.2_vite@4.4.11/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///Users/yeoularu/workspace/synergy-web/node_modules/.pnpm/vite-plugin-svgr@2.4.0_vite@4.4.11/node_modules/vite-plugin-svgr/dist/index.mjs";
import fs from "fs";
import path from "path";
var __vite_injected_original_dirname = "/Users/yeoularu/workspace/synergy-web";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    {
      name: "remove-mock-service-worker",
      writeBundle: () => {
        const filePath = path.resolve(__vite_injected_original_dirname, "./dist/mockServiceWorker.js");
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://synergyy.link",
        changeOrigin: true,
        // host 헤더를 변경합니다.
        secure: false
        // SSL 설정 (https 프로토콜)
      },
      "/oauth2/authorization": {
        target: "https://synergyy.link",
        changeOrigin: true,
        // host 헤더를 변경합니다.
        secure: false
        // SSL 설정 (https 프로토콜)
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMveWVvdWxhcnUvd29ya3NwYWNlL3N5bmVyZ3ktd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMveWVvdWxhcnUvd29ya3NwYWNlL3N5bmVyZ3ktd2ViL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy95ZW91bGFydS93b3Jrc3BhY2Uvc3luZXJneS13ZWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5pbXBvcnQgc3ZnciBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnclwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICBzdmdyKCksXG4gICAge1xuICAgICAgbmFtZTogXCJyZW1vdmUtbW9jay1zZXJ2aWNlLXdvcmtlclwiLFxuICAgICAgd3JpdGVCdW5kbGU6ICgpID0+IHtcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vZGlzdC9tb2NrU2VydmljZVdvcmtlci5qc1wiKTtcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgICAgZnMudW5saW5rU3luYyhmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL3N5bmVyZ3l5LmxpbmtcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBob3N0IFx1RDVFNFx1QjM1NFx1Qjk3QyBcdUJDQzBcdUFDQkRcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gICAgICAgIHNlY3VyZTogZmFsc2UsIC8vIFNTTCBcdUMxMjRcdUM4MTUgKGh0dHBzIFx1RDUwNFx1Qjg1Q1x1RDFBMFx1Q0Y1QylcbiAgICAgIH0sXG4gICAgICBcIi9vYXV0aDIvYXV0aG9yaXphdGlvblwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL3N5bmVyZ3l5LmxpbmtcIixcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBob3N0IFx1RDVFNFx1QjM1NFx1Qjk3QyBcdUJDQzBcdUFDQkRcdUQ1NjlcdUIyQzhcdUIyRTQuXG4gICAgICAgIHNlY3VyZTogZmFsc2UsIC8vIFNTTCBcdUMxMjRcdUM4MTUgKGh0dHBzIFx1RDUwNFx1Qjg1Q1x1RDFBMFx1Q0Y1QylcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLG9CQUFvQjtBQUM5VCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUxqQixJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUEsSUFDZCxLQUFLO0FBQUEsSUFDTDtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sYUFBYSxNQUFNO0FBQ2pCLGNBQU0sV0FBVyxLQUFLLFFBQVEsa0NBQVcsNkJBQTZCO0FBQ3RFLFlBQUksR0FBRyxXQUFXLFFBQVEsR0FBRztBQUMzQixhQUFHLFdBQVcsUUFBUTtBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUE7QUFBQSxRQUNkLFFBQVE7QUFBQTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLHlCQUF5QjtBQUFBLFFBQ3ZCLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQTtBQUFBLFFBQ2QsUUFBUTtBQUFBO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
