<div align="center">
# Portfolio
 
**Full Stack Developer 백종현**의 개인 포트폴리오 웹사이트입니다.<br>
React + Vite로 제작했으며, 진행한 프로젝트와 기술 스택, 이력을 소개합니다.
 
[![Portfolio](https://img.shields.io/badge/🔗_Live-jhyeon9185.github.io/portfolio-2ea5a1?style=for-the-badge)](https://jhyeon9185.github.io/portfolio/)
 
</div>
<br>
## About
 
> 사용자 경험과 시스템을 함께 고민합니다.
 
백엔드 설계부터 프론트엔드까지, 서비스 전체를 직접 구현하는 Full Stack Developer입니다.
실제 이슈를 끝까지 파고드는 것을 중요하게 생각합니다.
 
| | |
|---|---|
| **Role** | Full Stack Developer |
| **Location** | Seoul, Korea |
| **Status** | 🟢 Open to Work |
 
<br>
## Tech Stack
 
**Main**
 
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/Java_21-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white)
![JPA](https://img.shields.io/badge/JPA-59666C?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
 
**Experienced**
 
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=openai&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
 
**Collaboration**
 
![Slack](https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=flat-square&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
 
<br>
## Works
 
<details open>
<summary><b>01. 62댕냥이</b> — 유기동물 입양·임시보호 매칭 플랫폼</summary>
<br>
> 2026.01 ~ 2026.02 · 팀 프로젝트 · Backend · Spring Security · JWT 설계
 
`Java 21` `Spring Boot 3.2` `Spring Security` `JWT` `JPA` `MySQL 8.0` `Google/Kakao OAuth2`
 
**주요 기여**
- JWT Access/Refresh 이중 토큰 구조 직접 설계 및 구현
- Spring Security 필터 체인 커스터마이징 (Stateless 인증 처리)
- Google · Kakao OAuth2 소셜 로그인 직접 구현
- 역할 기반 API 접근 제어(RBAC) 구현 (USER / SHELTER_ADMIN / SUPER_ADMIN)
- BCrypt 비밀번호 암호화 및 저장 신뢰성 검증 로직 추가
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/jhyeon9185/62-daeng-nyang-public)
 
</details>
<details>
<summary><b>02. DAYPOO</b> — 실시간 공공데이터 기반 건강 관리 서비스</summary>
<br>
> 2026.03 ~ 2026.04 · 3인 팀 프로젝트 · Frontend · UI/UX 설계
 
`React` `TypeScript` `Python` `OpenAI` `Tailwind CSS` `SSE` `PWA` `Redis`
 
**주요 기여**
- Vite 전환으로 번들 크기 66% 감소 (1.8MB → 620KB), 초기 로딩 3.2s → 1.1s 개선
- SSE(Server-Sent Events) 인증 구조 설계 및 보안 이슈 직접 해결 (SSE 전용 단기 토큰 발급 방식)
- Redis 기반 실시간 랭킹 시스템 연동
- Python & OpenAI 기반 개인화 건강 데이터 분석/조언 시스템 구현
- PWA 적용으로 iOS 크로스 플랫폼 대응
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/jhyeon9185/daypoo)
 
</details>
<details>
<summary><b>03. MOIM (모임)</b> — 가족·지인과 함께하는 일정 공유 플랫폼</summary>
<br>
> 2025.04 · 개인 프로젝트 · Fullstack / 기획·설계
 
`React` `Spring Boot` `MySQL` `PostgreSQL` `JWT` `SSE` `OpenAI` `Render` `Vercel`
 
**주요 기여**
- 카카오·구글 OAuth2 소셜 로그인 및 JWT 인증 시스템 구축
- SSE 기반 실시간 알림 시스템 설계 및 구현
- UUID 기반 초대 코드 시스템 및 가입 신청/승인 멤버 관리 워크플로우 구현
- SMTP 차단 이슈 해결을 위한 Resend HTTP API 전환 및 비동기 처리
- OpenAI 연동 AI 비서 '모미' 구현 (일정 맞춤형 날씨·공기질 안내)
- PWA 지원
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/jhyeon9185/moim)
[![Live Demo](https://img.shields.io/badge/Live_Demo-2ea5a1?style=flat-square&logo=vercel&logoColor=white)](https://moim.8o2.site)
 
</details>
<br>
## Frontend Tech Stack (이 사이트)
 
| 영역 | 사용 기술 |
|---|---|
| Framework | React 19, Vite |
| Routing | React Router DOM |
| State Management | Zustand |
| Animation | Framer Motion (Rolling Text, Reveal, Magnetic Button, Silky Mouse Trail 등 커스텀 인터랙션 직접 구현) |
| Icons | React Icons |
| Deploy | GitHub Pages (gh-pages) |
