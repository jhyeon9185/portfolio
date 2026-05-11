# React + Vite

이 템플릿은 Vite 환경에서 HMR(Hot Module Replacement)과 일부 ESLint 규칙이 적용된 최소한의 React 설정 환경을 제공합니다.

현재 두 가지 공식 플러그인을 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) (Oxc 사용)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) (SWC 사용)

## React Compiler

React Compiler는 개발 및 빌드 성능에 미치는 영향으로 인해 이 템플릿에서는 기본적으로 활성화되어 있지 않습니다. 사용 방법은 [해당 문서](https://react.dev/learn/react-compiler/installation)를 참고하세요.

## ESLint 설정 확장하기

실무용 애플리케이션을 개발 중이라면, 타입 인식(type-aware) 린트 규칙이 활성화된 TypeScript 사용을 권장합니다. 프로젝트에 TypeScript와 [`typescript-eslint`](https://typescript-eslint.io)를 통합하는 방법에 대해서는 [TS 템플릿](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)을 확인해 보세요.
