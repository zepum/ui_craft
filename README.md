# UI Crafts

UI Crafts는 재사용 가능한 React UI 컴포넌트 모음을 개발하는 모노레포 프로젝트예요. 이 가이드는 프로젝트에 처음 기여하는 분들을 위한 설정 및 개발 방법을 안내합니다.

## 프로젝트 구조

```
ui_craft/
├── packages/          # 모든 패키지가 포함된 디렉토리
│   ├── core/          # 핵심 유틸리티 및 공통 컴포넌트
│   ├── crafts/        # 개별 UI 컴포넌트 (각각의 "craft")
│   └── utils/         # 유틸리티 함수 및 헬퍼
├── package.json       # 루트 패키지 설정
└── README.md          # 프로젝트 문서
```

## 개발 환경 설정

### 사전 요구사항

- [Node.js](https://nodejs.org/) (LTS 버전 권장해요)
- [pnpm](https://pnpm.io/) v9.6.0 이상

### 설정 단계

1. **저장소 클론**
   ```bash
   git clone https://github.com/zepum/ui_craft.git
   cd ui_craft
   ```

2. **VSCode 플러그인 설치**
   - [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) - 코드 포매터
   - [TSX Definition Filter](https://marketplace.visualstudio.com/items?itemName=RoyalMist.tsx-definition-filter) (선택) - .tsx에서 module.css 파일로 쉽게 이동할 수 있어요

3. **의존성 설치 및 빌드**
   ```bash
   pnpm i && pnpm build && pnpm i
   ```
   - 첫 번째 `pnpm i`는 의존성을 설치해요
   - `pnpm build`는 모든 패키지를 빌드합니다
   - 두 번째 `pnpm i`는 빌드된 로컬 패키지를 연결해요

## 개발 워크플로우

### 새 컴포넌트 생성

```bash
pnpm craft
```
이 명령어를 실행하면 대화형 프롬프트가 나타나며 새 UI craft를 생성할 수 있어요.

### 개발 서버 실행

```bash
pnpm dev
```
이 명령어는 [Ladle](https://ladle.dev/)을 사용하여 개발 서버를 시작해요. Ladle은 Storybook과 유사한 컴포넌트 개발 환경을 제공합니다.

### 핵심 패키지 빌드

핵심 패키지를 변경한 후 다음 명령어로 빌드하고 업데이트할 수 있어요:
```bash
pnpm update:core
```

### 타입 검사

```bash
pnpm ts-check
```

### 빌드 및 정리

```bash
# 모든 패키지 빌드
pnpm build

# 스토리 빌드
pnpm build:story

# 빌드 파일 정리
pnpm clean

# 모든 빌드 파일 및 node_modules 정리
pnpm clean:hard
```

## 프로젝트 기술 스택

- **React** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **pnpm** - 패키지 관리자
- **Turborepo** - 모노레포 빌드 시스템
- **Ladle** - 컴포넌트 개발 및 문서화
- **Biome** - 코드 포매팅
- **tsup** - TypeScript 빌드 도구

## 기여 가이드라인

1. 새로운 기능이나 버그 수정을 위한 브랜치를 생성해주세요
2. 변경사항이 잘 동작하는지 Ladle을 통해 테스트해보세요
3. 풀 리퀘스트를 생성해주세요

## 모범 사례

- 컴포넌트는 독립적이고 재사용 가능하게 설계해주세요
- 모든 컴포넌트에 적절한 타입을 지정해요

## 도움이 필요하신가요?

질문이나 문제가 있으시면 이슈를 생성하거나 프로젝트 관리자에게 연락해주세요.

---

이 프로젝트에 기여해 주셔서 감사해요! 🎉
