import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';
import { FiGithub, FiExternalLink, FiFileText, FiMail } from 'react-icons/fi';
import './Resume.css';

export default function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="resume-page">
      <main className="resume-main">
        <div className="resume-container">
          
          {/* Intro Section - Split Layout */}
          <section className="resume-intro-split">
            <div className="resume-intro-left">
              <h1 className="resume-intro-title">백종현</h1>
              <h2 className="resume-intro-subtitle">Full Stack Developer</h2>
              
              <div className="resume-intro-links">
                <a href="https://github.com/jhyeon9185" target="_blank" rel="noreferrer"><FiGithub /> GitHub</a>
                <a href="https://jhyeon9185.github.io/" target="_blank" rel="noreferrer"><FiExternalLink /> Portfolio</a>
                <a href="mailto:uoou9677@gmail.com"><FiMail /> Email</a>
              </div>
            </div>
            
            <div className="resume-intro-right">
              <p>전체 흐름을 이해하고 집요하게 파고드는 백엔드 개발자입니다.</p>
              <p>단순한 기능 구현에 그치지 않고, 언제나 ‘왜’라는 물음표를 던지며 시스템의 근본적인 구조를 고민합니다.</p>
              <p>함께 일하고 싶은 동료로서, 유연하게 소통하며 더 나은 서비스를 만들어 가겠습니다.</p>
            </div>
          </section>

          {/* Experience Section */}
          <section className="resume-section">
            <h2 className="section-title">Experience & Projects</h2>
            
            <div className="experience-item">
              <div className="exp-meta">
                <span className="exp-period">2026.03 - 2026.04</span>
                <div className="exp-links">
                  <a href="https://github.com/jhyeon9185/daypoo" target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiGithub /> GitHub
                  </a>
                  <a href={`${import.meta.env.BASE_URL}portfolio_v3.pdf`} target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiFileText /> Portfolio PDF
                  </a>
                </div>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">DAYPOO (실시간 공공데이터 기반 건강 관리 서비스)</h3>
                <h4 className="exp-company">Frontend 개발 / UI·UX 설계 (3인 팀 프로젝트)</h4>
                <ul className="exp-details">
                  <li>Vite 기반 번들 66% 감소(1.8MB → 620KB)로 초기 로딩 속도 대폭 개선</li>
                  <li>SSE(Server-Sent Events) 기반 실시간 인증 구조 설계 및 보안 이슈 직접 해결</li>
                  <li>Redis 기반 실시간 랭킹 시스템 및 건강 리포트 연동 구현</li>
                  <li>PWA 적용으로 iOS 대응 및 크로스 플랫폼 환경 구축</li>
                  <li>Tailwind CSS를 활용한 60fps 애니메이션 UI 구현</li>
                  <li>Python & OpenAI를 활용한 개인화 건강 데이터 분석 및 조언 시스템 구현</li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-meta">
                <span className="exp-period">2026.01 - 2026.02</span>
                <div className="exp-links">
                  <a href="https://github.com/jhyeon9185/62-daeng-nyang-public" target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiGithub /> GitHub
                  </a>
                  <a href={`${import.meta.env.BASE_URL}portfolio_v3.pdf`} target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiFileText /> Portfolio PDF
                  </a>
                </div>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">62댕냥이 (유기동물 입양·임시보호 매칭 플랫폼)</h3>
                <h4 className="exp-company">Backend 개발 / Spring Security · JWT 설계 (팀 프로젝트)</h4>
                <ul className="exp-details">
                  <li>JWT Access / Refresh 이중 토큰 구조 직접 설계 및 구현</li>
                  <li>Spring Security 필터 체인 구성 및 Stateless 인증 처리 구현</li>
                  <li>Google · Kakao OAuth2 소셜 로그인 직접 구현 연동</li>
                  <li>역할 기반 API 접근 제어 (USER / SHELTER_ADMIN / SUPER_ADMIN) 적용</li>
                  <li>BCrypt 비밀번호 암호화 및 저장 신뢰성 검증 로직 추가</li>
                  <li>JWT Claims 역직렬화 시 Integer / Long 타입 불일치 문제 해결(Troubleshooting)</li>
                </ul>
              </div>
            </div>

            <div className="experience-item">
              <div className="exp-meta">
                <span className="exp-period">2025.04</span>
                <div className="exp-links">
                  <a href="https://github.com/jhyeon9185/moim" target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiGithub /> GitHub
                  </a>
                  <a href="https://moim.8o2.site" target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiExternalLink /> Live Demo
                  </a>
                  <a href={`${import.meta.env.BASE_URL}moim.pdf`} target="_blank" rel="noreferrer" className="exp-link-btn">
                    <FiFileText /> PDF
                  </a>
                </div>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">MOIM (가족·지인과 함께하는 일정 공유 플랫폼)</h3>
                <h4 className="exp-company">Fullstack 개발 / 기획·설계 (개인 프로젝트)</h4>
                <ul className="exp-details">
                  <li>카카오·구글 OAuth 2.0 소셜 로그인 및 JWT 인증 시스템 구축</li>
                  <li>SSE(Server-Sent Events) 기반 실시간 알림 시스템 설계 및 구현</li>
                  <li>UUID 기반 초대 코드 시스템 및 가입 신청/승인 멤버 관리 워크플로우 구현</li>
                  <li>SMTP 차단 이슈 해결을 위한 Resend HTTP API 전환 및 비동기 처리 적용</li>
                  <li>OpenAI & 외부 API 연동 기반 AI 비서 '모미' 구현 (일정 맞춤형 날씨·공기질 안내)</li>
                </ul>
              </div>
            </div>
            
          </section>

          {/* Education & Certificates Section */}
          <section className="resume-section">
            <h2 className="section-title">Education & Certificates</h2>
            <div className="experience-item">
              <div className="exp-meta">
                <span className="exp-period">2025.10 - 2026.04</span>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">[기업연계형] 챗 GPT 활용 및 Devops 개발자 부트캠프</h3>
                <h4 className="exp-company">수료</h4>
              </div>
            </div>
            <div className="experience-item">
              <div className="exp-meta">
                <span className="exp-period">2015</span>
              </div>
              <div className="exp-content">
                <h3 className="exp-role">잠실고등학교</h3>
                <h4 className="exp-company">졸업</h4>
              </div>
            </div>
            <div className="experience-item" style={{ marginBottom: 0 }}>
              <div className="exp-meta">
                <span className="exp-period">Certificates</span>
              </div>
              <div className="exp-content">
                <ul className="exp-details">
                  <li>프로그래밍 기능사</li>
                  <li>GTQ 포토샵</li>
                  <li>GTQ 일러스트</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills Section - Row Layout */}
          <section className="resume-section">
            <h2 className="section-title">Skills</h2>
            
            <div className="skills-table">
              <div className="skills-row">
                <div className="skills-row-label">Main Stack</div>
                <div className="skills-row-items">
                  {['Java', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL', 'React', 'Git'].map(skill => (
                    <span key={skill} className="skill-chip main-chip">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="skills-row">
                <div className="skills-row-label">Experienced</div>
                <div className="skills-row-items">
                  {['Tailwind CSS', 'OpenAI', 'Python', 'Docker', 'Vite', 'PostgreSQL', 'Redis', 'Figma'].map(skill => (
                    <span key={skill} className="skill-chip sub-chip">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
