# synergy-web

## 로컬 개발환경

먼저, 프로젝트를 로컬에서 실행하기 위해 다음과 같은 소프트웨어가 설치되어 있어야 합니다:

- Node.js (최소 버전 14.x)
- pnpm (최소 버전 8.7.6)

### Node.js 설치

Node.js를 설치하려면 [Node.js 공식 사이트](https://nodejs.org/)에서 설치 프로그램을 다운로드하여 설치하십시오.

설치 후, 터미널 또는 명령 프롬프트에서 다음 명령어로 올바르게 설치되었는지 확인합니다:

```sh
node -v
```

### pnpm 설치

pnpm을 설치하려면, 터미널 또는 명령 프롬프트에서 다음 명령어를 실행하십시오:

```sh
npm install -g pnpm
```

설치 후, 다음 명령어로 올바르게 설치되었는지 확인합니다:

```sh
pnpm -v
```

### 설치 및 설정

1. **리포지토리 클론**

   ```sh
   git clone https://github.com/TeamSynergyy/synergy-web.git
   cd synergy-web
   ```

2. **의존성 설치**

   pnpm을 사용하여 모든 패키지를 설치합니다.

   ```sh
   pnpm install
   ```

3. **환경 변수 파일 설정**

   프로젝트 루트 디렉터리에 `.env` 파일을 생성하고 다음 내용을 추가합니다(값은 임시값입니다. 실행환경에 맞춰 변경하세요):

   ```env
   VITE_API_URL=http://localhost:8080
   VITE_WEBSOCKET_URL=ws://localhost:8081/ws
   VITE_KAKAOMAP_API_KEY=exampleapikey1234567890abcdef
   ```

4. **개발 서버 시작**
   ```sh
   pnpm dev
   ```
