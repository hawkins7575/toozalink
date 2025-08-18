# 개발 원칙 및 규칙

## 핵심 원칙

### 🔒 절대 금지사항
1. **기존 사이트 데이터 삭제 금지**
   - `data.js`의 stockSites, youtubeChannels 배열에서 기존 항목 삭제 불가
   - 기존 37개 사이트, 20개 유튜브 채널 유지 필수

2. **구조 파괴적 변경 금지**
   - 컴포넌트 파일명 변경 금지
   - 기존 props 인터페이스 변경 시 하위 호환성 유지
   - localStorage 키 변경 금지 (사용자 데이터 보존)

3. **베이스 백업 삭제 금지**
   - `src_backup_v1.0` 폴더 절대 삭제 금지
   - 언제든 완전 롤백 가능하도록 유지

### ✅ 허용되는 변경사항

#### 데이터 추가 (권장)
```javascript
// ✅ 새 사이트 추가 (기존 ID 이후)
{
  id: 58,  // 기존 최대 ID + 1
  name: "새로운 사이트",
  // ... 기존 구조 유지
}

// ✅ 새 카테고리 추가
export const categories = [
  "전체",
  "공식거래소",
  // ... 기존 카테고리 유지
  "새로운카테고리"  // 맨 뒤에 추가
];
```

#### 컴포넌트 개선 (권장)
```javascript
// ✅ 기존 props 유지하면서 새 props 추가
const SiteCard = ({ 
  site, 
  isFavorite, 
  onToggleFavorite,  // 기존 props 유지
  newFeature = false  // 새 기능은 선택적
}) => {
  // ...
};
```

#### 스타일 개선 (권장)
```css
/* ✅ 새 CSS 클래스 추가 */
.new-feature-class {
  /* 새 스타일 */
}

/* ✅ 기존 클래스 개선 (비파괴적) */
.site-card {
  /* 기존 스타일 유지하면서 개선 */
  transition: transform 0.2s; /* 추가 */
}
```

### 🔄 안전한 개발 워크플로우

#### 1. 변경 전 백업
```bash
# 현재 상태 백업
cp -r src "src_backup_$(date +%Y%m%d_%H%M)"
```

#### 2. 작은 단위 변경
- 한 번에 하나의 기능만 추가/수정
- 컴포넌트별로 개별 테스트
- 즉시 동작 확인

#### 3. 호환성 테스트
- 기존 즐겨찾기 동작 확인
- 모든 카테고리 필터링 테스트
- 대시보드 정상 표시 확인

#### 4. 문제 발생 시 즉시 롤백
```bash
# 문제 발생 시
rm -rf src
cp -r src_backup_v1.0 src
npm start
```

### 📋 변경 로그 작성 규칙

#### VERSION_HISTORY.md 업데이트
```markdown
## v1.1 - 2025-07-XX

### 추가된 기능
- [NEW] 검색 기능 추가
- [NEW] 사이트 5개 추가

### 개선사항  
- [IMPROVE] SiteCard 호버 효과 개선
- [FIX] localStorage 에러 핸들링 개선

### 유지된 기능 (변경 없음)
- ✅ 기존 37개 사이트 모두 유지
- ✅ 기존 20개 유튜브 채널 모두 유지
- ✅ 즐겨찾기 데이터 호환성 유지
```

### 🚫 위험한 변경 예시

```javascript
// ❌ 절대 금지: 기존 사이트 삭제
export const stockSites = [
  // { id: 1, name: "한국거래소(KRX)", ... }, // 삭제 금지!
  { id: 2, name: "KRX KIND", ... },
];

// ❌ 절대 금지: 기존 props 제거
const SiteCard = ({ 
  // site,  // 기존 props 제거 금지!
  newProps 
}) => {

// ❌ 절대 금지: localStorage 키 변경
localStorage.getItem("newFavorites"); // "favorites" 변경 금지!
```

### ✅ 안전한 변경 예시

```javascript
// ✅ 안전: 기존 유지하면서 추가
export const stockSites = [
  // 기존 37개 모두 유지
  { id: 1, name: "한국거래소(KRX)", ... },
  // ... 기존 모두 유지 ...
  { id: 58, name: "새로운 사이트", ... }, // 새 추가
];

// ✅ 안전: 하위 호환성 유지
const SiteCard = ({ 
  site, 
  isFavorite, 
  onToggleFavorite,  // 기존 props 유지
  showRating = false  // 새 기능은 선택적
}) => {

// ✅ 안전: 추가 localStorage 키 사용
const ratings = localStorage.getItem("siteRatings"); // 새 키 사용
const favorites = localStorage.getItem("favorites"); // 기존 키 유지
```

### 🔍 체크리스트

변경 전 확인사항:
- [ ] 기존 사이트/채널 데이터 삭제하지 않았는가?
- [ ] 기존 컴포넌트 인터페이스 깨뜨리지 않았는가?
- [ ] localStorage 키 변경하지 않았는가?
- [ ] 백업 생성했는가?
- [ ] 롤백 방법 확인했는가?

변경 후 확인사항:
- [ ] 모든 기존 사이트 정상 표시되는가?
- [ ] 즐겨찾기 기능 정상 동작하는가?
- [ ] 카테고리 필터링 정상 동작하는가?
- [ ] 대시보드 정상 동작하는가?
- [ ] 새 기능 정상 동작하는가?