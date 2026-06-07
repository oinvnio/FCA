# File Convert App

문서 파일 변환 웹앱 프로토타입입니다.

## 지원 변환

- pptx → pdf
- pdf → pptx
- docx → pdf
- pdf → docx
- html → pdf
- pdf → html
- hwp → docx
- docx → hwp

## 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Drizzle ORM + PostgreSQL
- LibreOffice + libreoffice-convert
- Capacitor (Android APK 래핑)

## 로컬 실행

```bash
npm install
npm run dev
```

> 변환 API는 서버에 LibreOffice(headless) 실행 환경이 있어야 정상 동작합니다.

## GitHub Actions로 Android APK 빌드

이 저장소에는 `.github/workflows/android-apk.yml` 이 포함되어 있습니다.

1. GitHub 저장소 Settings → Secrets and variables → Actions 에서 아래 시크릿 추가
   - `CAPACITOR_SERVER_URL` = 배포된 웹앱 URL (예: `https://your-app.example.com`)
2. `main` 브랜치로 push 또는 Actions에서 수동 실행(`workflow_dispatch`)
3. 실행 완료 후 Artifacts에서 `file-convert-debug-apk` 다운로드

## 릴리즈로 배포 권장

- GitHub Actions 완료 후 APK를 GitHub Releases에 첨부
- 안드로이드 사용자에게 Releases 링크 공유

## 오픈소스 원작자 표기

- LibreOffice — The Document Foundation and contributors (MPL v2.0 / LGPL v3+)
- libreoffice-convert — elwerene and contributors (MIT)
- Next.js — Vercel and contributors (MIT)
