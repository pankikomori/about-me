# MVP 구현 가이드

## 1. 개발 목표
MVP 단계에서는 다음 기능을 우선 구현한다.

- 사용자 가입/로그인
- 매장 정보 등록
- 지원금 추천 기능
- 법률 가이드 챗 기능
- 알림 기능

## 2. 권장 기술 스택

### 프론트엔드
- React 또는 Next.js
- Tailwind CSS
- TypeScript

### 백엔드
- Node.js + Express 또는 Python + FastAPI
- PostgreSQL
- Redis

### AI
- OpenAI API 또는 유사 LLM 서비스
- 정책 데이터 정규화 파이프라인

## 3. 추천 폴더 구조

```text
src/
  app/
  components/
  pages/
  services/
  hooks/
  utils/
  types/
server/
  routes/
  controllers/
  services/
  models/
  jobs/
```

## 4. 개발 순서
1. 사용자 인증 기능 구현
2. 매장 정보 등록 기능 구현
3. 지원금 추천 로직 연동
4. 법률 가이드 챗 기능 구현
5. 알림 기능 구현
6. 테스트 및 배포

## 5. 구현 시 주의사항
- 정책/법률 정보는 최신성을 유지해야 한다.
- AI 응답은 참고용으로 안내하고, 법률 자문은 전문가 확인을 권장한다.
- UI는 소상공인 사용자가 쉽게 이해할 수 있도록 단순하게 구성한다.
