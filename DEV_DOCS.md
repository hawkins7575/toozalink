# My Stock Link - 개발 문서

## 프로젝트 개요

주식 투자 관련 사이트와 유튜브 채널을 카테고리별로 정리하고, 사용자가 즐겨찾기를 관리할 수 있는 React 기반 웹 애플리케이션입니다.

## 기술 스택

- **Frontend**: React 19.1.0
- **언어**: JavaScript (ES6+)
- **스타일링**: CSS3 (CSS Variables)
- **폰트**: Pretendard
- **빌드 도구**: Create React App
- **패키지 관리**: npm
- **타입 검증**: PropTypes

## 프로젝트 구조

```
src/
├── components/
│   ├── Dashboard.jsx      # 메인 대시보드
│   ├── SiteCard.jsx       # 사이트/채널 카드 컴포넌트
│   └── YoutubeSection.jsx # 유튜브 채널 섹션
├── data.js               # 사이트 및 채널 데이터
├── styles.css           # 전역 스타일
├── App.jsx             # 메인 애플리케이션
└── index.js           # 진입점
```

## 주요 기능

### 1. 네비게이션
- **대시보드**: 즐겨찾기 및 추천 콘텐츠 요약
- **주식 사이트**: 37개 주식 관련 사이트 모음
- **유튜브 채널**: 20개 투자 관련 유튜브 채널

### 2. 카테고리 시스템

#### 주식 사이트 (8개 카테고리)
- 공식거래소: KRX, DART 등 공공기관
- 공공데이터: API 및 통계 데이터
- 포털사이트: 네이버금융, 다음금융 등
- 증권사플랫폼: 키움, 삼성증권 등 HTS
- 금융정보포털: 세이브로, 에프앤가이드 등
- 커뮤니티: 팍스넷, 에토랜드 등
- 글로벌포털: Yahoo Finance, Bloomberg 등

#### 유튜브 채널 (6개 카테고리)
- 종합분석: 슈카월드, 삼프로TV 등
- 증권사공식: 키움증권, 미래에셋 등
- 초보자용: 신사임당, 김작가TV 등
- 미국주식: 미국주식에미치다TV 등
- 기술주전문: 가젯서울, LA정교수 등
- 재테크종합: 부읽남TV 등

### 3. 즐겨찾기 관리
- localStorage를 통한 영구 저장
- 사이트와 유튜브 채널 독립적 관리
- 대시보드에서 통합 표시

### 4. 방문 기록
- 최근 방문한 10개 항목 추적
- 대시보드에서 최근 6개 표시

## 컴포넌트 상세

### App.jsx
메인 애플리케이션 컨테이너
- **상태 관리**: 즐겨찾기, 뷰 모드, 유튜브 즐겨찾기
- **localStorage 관리**: 즐겨찾기 데이터 영구 저장
- **라우팅**: currentView 상태로 페이지 전환

### Dashboard.jsx  
개인화된 대시보드
- **퀵 스탯**: 즐겨찾기 및 방문 통계
- **즐겨찾기 섹션**: 사이트/유튜브 최대 4개 표시
- **추천 콘텐츠**: 초보자용 사이트/채널 추천
- **최근 방문**: 방문 기록 최대 6개 표시

### SiteCard.jsx
재사용 가능한 카드 컴포넌트
- **Props**: site, isFavorite, onToggleFavorite
- **기능**: 즐겨찾기 토글, 외부 링크 오픈
- **최적화**: React.memo로 렌더링 최적화

### YoutubeSection.jsx
유튜브 채널 전용 섹션
- **독립적 상태**: 자체 즐겨찾기 관리
- **카테고리 필터**: youtubeCategories 기반
- **즐겨찾기 표시**: 상단에 별도 섹션

## 데이터 구조 (data.js)

### 사이트 객체
```javascript
{
  id: number,           // 고유 식별자
  name: string,         // 사이트명
  url: string,          // URL
  description: string,  // 설명
  category: string,     // 카테고리
  tags: string[],       // 태그 배열
  tips: string,         // 사용 팁
  difficulty: string    // 난이도 (쉬움/보통/어려움)
}
```

### 유튜브 채널 객체
사이트 객체와 동일한 구조 (id: 38-57)

## 스타일링

### CSS Variables
```css
--background: #ffffff
--foreground: #0f1419  
--primary: #2563eb
--card: #ffffff
--border: #e2e8f0
```

### 반응형 디자인
- 최대 너비: 1400px
- 모바일 우선 접근 방식
- 그리드 레이아웃 활용

## 개발 가이드라인

### 1. 컴포넌트 추가
새 컴포넌트 생성 시:
```javascript
import PropTypes from 'prop-types';

const NewComponent = ({ prop1, prop2 }) => {
  // 컴포넌트 로직
};

NewComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func.isRequired,
};

export default React.memo(NewComponent);
```

### 2. 데이터 추가
새 사이트/채널 추가 시 `data.js`에서:
- 고유한 id 할당
- 모든 필수 필드 입력
- 적절한 카테고리 분류
- tags 배열에 검색 키워드 추가

### 3. localStorage 사용
```javascript
// 읽기
const [state, setState] = useState(() => {
  try {
    const saved = localStorage.getItem('key');
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.warn('Failed to load:', error);
    return defaultValue;
  }
});

// 쓰기
useEffect(() => {
  try {
    localStorage.setItem('key', JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to save:', error);
  }
}, [state]);
```

## 빌드 및 배포

### 개발 환경
```bash
npm start          # 개발 서버 (http://localhost:3000)
npm test           # 테스트 실행
npm run build      # 프로덕션 빌드
```

### 프로덕션 빌드
- `build/` 폴더에 정적 파일 생성
- 코드 압축 및 최적화
- 해시를 포함한 파일명으로 캐싱 최적화

## 성능 최적화

### 현재 적용된 최적화
- **React.memo**: SiteCard 컴포넌트 불필요한 리렌더링 방지
- **useMemo**: 필터링된 데이터 캐싱
- **CSS Variables**: 스타일 재계산 최소화

### 추가 최적화 가능성
- 코드 스플리팅 (React.lazy)
- 가상화 (react-window)
- 이미지 최적화
- Service Worker 캐싱

## 보안 고려사항

### 현재 취약점
- `window.open()` 사용 시 `rel="noopener noreferrer"` 누락

### 권장 보안 조치
```javascript
// 안전한 외부 링크 오픈
const openSafely = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};
```

## 접근성 (A11y)

### 개선 필요 사항
- 키보드 네비게이션 지원
- ARIA 라벨 추가
- 색상 대비 확인
- 스크린 리더 호환성

## 테스팅

### 현재 설정
- Jest + React Testing Library
- 기본 테스트 설정만 있음

### 테스트 전략 권장
```javascript
// 컴포넌트 테스트 예시
test('SiteCard renders correctly', () => {
  render(<SiteCard site={mockSite} isFavorite={false} onToggleFavorite={jest.fn()} />);
  expect(screen.getByText(mockSite.name)).toBeInTheDocument();
});
```

## 향후 개발 계획

### 단기 개선사항
1. TypeScript 마이그레이션
2. 커스텀 훅으로 localStorage 로직 추출
3. 보안 취약점 수정
4. 접근성 개선

### 장기 기능 추가
1. 사용자 계정 시스템
2. 리뷰 및 평점 기능
3. 검색 기능 강화
4. PWA 변환
5. 다크 모드 지원

## 문제 해결

### 일반적인 문제
1. **localStorage 에러**: 시크릿 모드에서 접근 제한
2. **빌드 실패**: package.json 의존성 확인
3. **스타일 깨짐**: CSS 변수 지원 브라우저 확인

### 디버깅 팁
- React DevTools 사용
- console.warn으로 localStorage 에러 추적
- 네트워크 탭에서 리소스 로딩 확인