# Tooza Link - 투자 링크 플랫폼 🚀

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/hawkins7575/toozalink)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB.svg)](https://reactjs.org/)
[![Status](https://img.shields.io/badge/status-stable-green.svg)](#)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](#)

투자자를 위한 종합 링크 관리 플랫폼입니다. 주식 사이트, 유튜브 채널, 투자 정보를 한 곳에서 관리할 수 있습니다.

## 🌟 주요 기능

### 📈 주식 사이트 관리
- **4개 섹션 그리드 레이아웃**: 국내증권사, 해외증권사, 투자정보, 뉴스/커뮤니티
- **즐겨찾기 시스템**: 자주 사용하는 사이트 빠른 접근
- **최근 방문 사이트**: 방문 기록 자동 저장
- **카테고리별 필터링**: 섹션별 사이트 분류 및 정리

### 📺 유튜브 채널 관리
- **카테고리별 분류**: 투자 교육, 시장 분석, 개인 투자자, 기관 투자자
- **채널 정보**: 구독자 수, 난이도, 설명, 팁 제공
- **즐겨찾기 관리**: 선호 채널 즐겨찾기 등록
- **사용자 제출**: 새로운 채널 추천 기능

### 💬 커뮤니티 게시판
- **6개 게시판 시스템**:
  - 📈 주식 토론 게시판
  - 💰 투자 상품 리뷰
  - 📚 투자 교육 자료
  - 🔥 핫한 종목 토론
  - ❓ 투자 질문 답변
  - 📊 시장 분석 게시판
- **게시글 작성/조회**: 실시간 커뮤니티 소통
- **댓글 시스템**: 게시글별 의견 교환
- **추천 시스템**: 좋은 게시글 추천 기능

### 🏆 투자의 대가
- **투자 마스터 프로필**: 유명 투자자 정보 및 철학
- **투자 전략**: 각 투자자의 대표 투자 전략
- **관련 콘텐츠**: 책, 영상, 인터뷰 링크

### 👤 사용자 관리
- **회원가입/로그인**: 개인화된 서비스 이용
- **프로필 관리**: 사용자 정보 수정
- **관리자 패널**: 콘텐츠 관리 시스템
- **데이터 동기화**: 즐겨찾기, 방문 기록 저장

## 🛠 기술 스택

### Frontend
- **React 19.1.0**: 최신 React 버전으로 구현
- **JavaScript ES6+**: 모던 자바스크립트 문법
- **CSS3**: 반응형 디자인 및 애니메이션
- **LocalStorage**: 클라이언트 사이드 데이터 저장

### Development Tools
- **Create React App 5.0.1**: 프로젝트 기본 설정
- **React Scripts**: 빌드 및 개발 도구
- **Testing Library**: 컴포넌트 테스트 프레임워크
- **PropTypes**: 컴포넌트 타입 검증

### Design System
- **CSS Custom Properties**: 일관된 디자인 토큰
- **Flexbox & Grid**: 현대적 레이아웃 시스템
- **Responsive Design**: 모바일 최적화
- **Accessibility**: WCAG 준수 접근성

## 📁 프로젝트 구조

```
my-stock-link/
├── public/                     # 정적 파일
│   ├── index.html             # 메인 HTML 템플릿
│   ├── manifest.json          # PWA 매니페스트
│   ├── robots.txt            # SEO 로봇 설정
│   └── sitemap.xml           # 사이트맵
├── src/                       # 소스 코드
│   ├── components/           # React 컴포넌트
│   │   ├── Dashboard.jsx     # 대시보드 메인
│   │   ├── FourSectionLayout.jsx  # 4섹션 그리드
│   │   ├── YoutubeSection.jsx     # 유튜브 섹션
│   │   ├── BoardSelector.jsx      # 게시판 선택
│   │   ├── InvestmentMasters.jsx  # 투자의 대가
│   │   ├── Login.jsx         # 로그인
│   │   ├── Register.jsx      # 회원가입
│   │   ├── UserProfile.jsx   # 사용자 프로필
│   │   ├── AdminPanel.jsx    # 관리자 패널
│   │   └── ...              # 기타 컴포넌트들
│   ├── data/                 # 데이터 파일
│   │   ├── boardsData.js     # 게시판 데이터
│   │   └── investmentMasters.js  # 투자 대가 데이터
│   ├── hooks/                # 커스텀 훅
│   │   ├── useAuth.js        # 인증 훅
│   │   └── useUserSubmissions.js  # 사용자 제출 훅
│   ├── styles/               # CSS 스타일
│   │   ├── styles.css        # 메인 스타일
│   │   ├── styles-new.css    # 추가 스타일
│   │   ├── styles-four-section.css  # 4섹션 스타일
│   │   ├── styles-youtube-category.css  # 유튜브 스타일
│   │   ├── styles-boards.css # 게시판 스타일
│   │   └── ...              # 기타 스타일들
│   ├── App.jsx               # 메인 앱 컴포넌트
│   ├── index.js              # 앱 진입점
│   └── data.js               # 메인 데이터
├── package.json              # 프로젝트 설정
└── README.md                 # 프로젝트 문서
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 8.0.0 이상

### 설치 및 실행

1. **저장소 클론**
```bash
git clone https://github.com/hawkins7575/toozalink.git
cd toozalink
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
npm start
```
- 브라우저에서 `http://localhost:3000` 접속
- 코드 변경 시 자동 새로고침

4. **프로덕션 빌드**
```bash
npm run build
```
- `build` 폴더에 최적화된 파일 생성
- 배포 준비 완료

### 추가 스크립트
```bash
npm test          # 테스트 실행
npm run test:coverage  # 테스트 커버리지 확인
npm run analyze   # 번들 크기 분석
```

## 🎨 디자인 시스템

### 색상 팔레트
```css
:root {
  /* Primary Colors */
  --primary: #3b82f6;
  --primary-dark: #2563eb;
  --primary-light: #dbeafe;
  
  /* Secondary Colors */
  --secondary: #64748b;
  --accent: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  
  /* Background */
  --background: #ffffff;
  --background-secondary: #f8fafc;
  --card: #ffffff;
  --card-border: #e2e8f0;
  
  /* Text */
  --foreground: #0f172a;
  --foreground-secondary: #475569;
  --muted-foreground: #94a3b8;
}
```

### 반응형 브레이크포인트
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

### 컴포넌트 네이밍 규칙
- **PascalCase**: React 컴포넌트 (예: `Dashboard`, `FourSectionLayout`)
- **camelCase**: 함수 및 변수 (예: `toggleFavorite`, `currentView`)
- **kebab-case**: CSS 클래스 (예: `site-card`, `favorite-btn`)

## 🔧 개발 가이드

### 컴포넌트 구조
```jsx
// 컴포넌트 예시 구조
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2, onAction }) => {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // 사이드 이펙트 처리
  }, [dependencies]);
  
  const handleAction = () => {
    // 이벤트 처리
    onAction(data);
  };
  
  return (
    <div className="component-name">
      {/* JSX 구조 */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.array,
  onAction: PropTypes.func.isRequired,
};

export default ComponentName;
```

### 상태 관리 패턴
- **LocalStorage**: 사용자 설정, 즐겨찾기
- **useState**: 컴포넌트 로컬 상태
- **useEffect**: 사이드 이펙트 관리
- **Custom Hooks**: 재사용 가능한 로직

### 데이터 흐름
1. **App.jsx**: 최상위 상태 관리
2. **Components**: Props를 통한 데이터 전달
3. **Hooks**: 비즈니스 로직 분리
4. **LocalStorage**: 영구 데이터 저장

## 📊 성능 최적화

### 코드 분할
- **React.lazy**: 동적 임포트
- **Suspense**: 로딩 상태 관리
- **Route-based**: 페이지별 코드 분할

### 이미지 최적화
- **WebP 포맷**: 최신 이미지 형식 사용
- **Lazy Loading**: 뷰포트 진입 시 로드
- **Responsive Images**: 디바이스별 최적화

### 번들 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Minification**: 코드 압축
- **Gzip Compression**: 서버 압축 설정

## 🔒 보안 고려사항

### 데이터 보안
- **입력 검증**: XSS 공격 방지
- **HTTPS**: 데이터 전송 암호화
- **Content Security Policy**: 스크립트 실행 제한

### 인증/인가
- **토큰 관리**: 안전한 토큰 저장
- **세션 관리**: 자동 로그아웃
- **권한 검증**: 기능별 접근 제어

## 🌐 브라우저 지원

### 지원 브라우저
- **Chrome**: 최신 2개 버전
- **Firefox**: 최신 2개 버전
- **Safari**: 최신 2개 버전
- **Edge**: 최신 2개 버전

### 호환성 확인
```bash
npx browserslist
```

## 📈 SEO 최적화

### 메타데이터
- **Title Tags**: 페이지별 제목
- **Meta Descriptions**: 페이지 설명
- **Open Graph**: 소셜 미디어 최적화
- **Structured Data**: 구조화된 데이터

### 사이트맵
- **sitemap.xml**: 검색엔진 크롤링 가이드
- **robots.txt**: 크롤러 접근 설정

## 🧪 테스트

### 테스트 전략
- **Unit Tests**: 컴포넌트 단위 테스트
- **Integration Tests**: 컴포넌트 간 상호작용
- **E2E Tests**: 사용자 플로우 테스트

### 테스트 실행
```bash
npm test                # 단위 테스트
npm run test:watch     # 감시 모드
npm run test:coverage  # 커버리지 리포트
```

## 📦 배포

### 빌드 준비
```bash
npm run build
npm run analyze  # 번들 분석
```

### 배포 플랫폼
- **Vercel**: 자동 배포
- **Netlify**: 정적 사이트 호스팅
- **GitHub Pages**: 무료 호스팅
- **AWS S3**: 클라우드 배포

## 🔄 업데이트 로그

### v1.0.0 (2025-01-18)
- ✨ 초기 릴리스
- 🎨 4섹션 그리드 레이아웃 구현
- 📺 유튜브 채널 관리 시스템
- 💬 6개 게시판 커뮤니티 시스템
- 🏆 투자의 대가 프로필 섹션
- 👤 사용자 인증 시스템
- 📱 반응형 디자인 완성
- 🔍 SEO 최적화
- ♿ 접근성 개선

## 🤝 기여하기

### 개발 환경 설정
1. 이슈 확인 또는 새 이슈 생성
2. 피처 브랜치 생성: `git checkout -b feature/새기능`
3. 커밋: `git commit -m 'feat: 새 기능 추가'`
4. 푸시: `git push origin feature/새기능`
5. Pull Request 생성

### 커밋 메시지 규칙
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

## 📞 문의

- **GitHub**: [hawkins7575/toozalink](https://github.com/hawkins7575/toozalink)
- **Issues**: [GitHub Issues](https://github.com/hawkins7575/toozalink/issues)

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.

---

## 🛠 개발자를 위한 추가 정보

### 프로젝트 철학
- **사용자 중심**: 투자자의 실제 니즈 반영
- **성능 우선**: 빠른 로딩과 반응성
- **접근성**: 모든 사용자가 이용 가능
- **확장성**: 기능 추가가 용이한 구조

### 아키텍처 결정
- **단일 페이지 애플리케이션**: 빠른 네비게이션
- **컴포넌트 기반**: 재사용성과 유지보수성
- **훅 기반 상태 관리**: 간단하고 직관적인 상태 관리
- **CSS-in-JS 미사용**: 성능과 번들 크기 최적화

투자자를 위한 최고의 링크 관리 플랫폼, **Tooza Link**에 오신 것을 환영합니다! 🎉