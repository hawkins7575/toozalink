# 롤백 가이드

## 이전 버전으로 복원하는 방법

### v1.0으로 롤백
현재 베이스 버전으로 완전 복원:

```bash
# 현재 src 폴더 삭제
rm -rf src

# 백업된 v1.0 복원
cp -r src_backup_v1.0 src

# 의존성 재설치 (필요시)
npm install

# 개발 서버 재시작
npm start
```

### 부분 롤백
특정 파일만 복원:

```bash
# 특정 컴포넌트 복원
cp src_backup_v1.0/components/SiteCard.jsx src/components/

# 데이터 파일 복원
cp src_backup_v1.0/data.js src/

# 스타일 복원
cp src_backup_v1.0/styles.css src/
```

### 백업 전략

#### 자동 백업 (권장)
새로운 기능 개발 전:
```bash
# 현재 날짜로 백업
cp -r src "src_backup_$(date +%Y%m%d_%H%M)"
```

#### 수동 백업
중요한 변경 전 항상 백업 생성:
- 새 컴포넌트 추가 전
- 기존 컴포넌트 대폭 수정 전  
- 데이터 구조 변경 전
- 스타일 대폭 변경 전

### 안전한 개발 절차

1. **변경 전 백업 생성**
2. **작은 단위로 변경**
3. **테스트 후 다음 단계 진행**
4. **문제 발생 시 즉시 롤백**
5. **안정화 후 다음 기능 개발**

### 백업 파일 관리

```
my-stock-link/
├── src/                    # 현재 개발 버전
├── src_backup_v1.0/       # 베이스 버전 (삭제 금지)
├── src_backup_20250727_1430/  # 임시 백업들
└── src_backup_20250727_1530/
```

### 주의사항
- `src_backup_v1.0`는 절대 삭제하지 말 것
- 새 기능 추가 시 기존 기능 동작 확인
- localStorage 데이터는 보존됨 (사용자 즐겨찾기 유지)