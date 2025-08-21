# React Mini Project

이 저장소는 Next.js와 Material UI를 활용해 다양한 미니 프로젝트를 모아 둔 예시 애플리케이션입니다. 사이드 드로어에서 프로젝트를 선택하여 대시보드, 테트리스, 할 일 목록 등의 기능을 실행할 수 있습니다.

## 설치 및 실행
```bash
npm install
npm run dev
```

## 주요 기능 및 코드 하이라이트

### 1. 메인 페이지 네비게이션
- `useMemo`로 드로어 메뉴를 구성하여 필요할 때만 계산합니다【F:src/pages/MainPage.tsx†L32-L42】
- 선택된 메뉴에 따라 각 페이지 컴포넌트를 조건부 렌더링합니다【F:src/pages/MainPage.tsx†L120-L143】

### 2. 할 일 목록(TodoList)
- `useState`로 입력값과 작업 목록을 관리하고 엔터 입력 시 새 항목을 추가합니다【F:src/pages/TodoList.tsx†L12-L59】
- 체크박스와 삭제 버튼으로 완료 여부 및 삭제 기능을 제공합니다【F:src/pages/TodoList.tsx†L32-L43】【F:src/pages/TodoList.tsx†L67-L76】

## 스크립트
`package.json`에 정의된 주요 스크립트입니다:
```json
"dev": "next dev",
"build": "next build",
"start": "next start -p 3000",
"lint": "next lint"
```
각 스크립트는 개발 서버 실행, 빌드, 프로덕션 서버 실행, 린트 확인을 수행합니다【F:package.json†L5-L10】

## 디렉토리 구조
- `src/pages`: 페이지 컴포넌트
- `src/components`: 공통 UI 및 기능 컴포넌트
- `react-main`: 별도의 실험용 프로젝트 예시

## 기여 가이드
1. 포크 후 기능 추가 또는 버그 수정
2. `npm run lint`로 코드 스타일 검사
3. Pull Request 작성

---
본 README는 프로젝트 이해와 협업을 돕기 위해 작성되었습니다.

