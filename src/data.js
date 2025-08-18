// 기본 주식 사이트 데이터
const defaultStockSites = [
  // ① 공식거래소·공시
  {
    id: 1,
    name: "한국거래소(KRX)",
    url: "http://www.krx.co.kr",
    description: "시장·공매도·파생상품 정보, 상장종목 현황",
    category: "공식거래소",
    tags: ["한국", "무료", "공시", "필수", "공공기관"],
    tips: "정보데이터시스템(MDC)에서 시장 기초통계와 공매도 현황 확인 필수",
    difficulty: "보통"
  },
  {
    id: 2,
    name: "KRX KIND",
    url: "https://kind.krx.co.kr",
    description: "상장공시, 불성실공시법인, 시장조치",
    category: "공식거래소",
    tags: ["한국", "무료", "공시", "필수", "공공기관"],
    tips: "종합공시채널로 실시간 공시정보와 시장조치 현황 확인",
    difficulty: "쉬움"
  },
  {
    id: 3,
    name: "DART 전자공시시스템",
    url: "https://dart.fss.or.kr",
    description: "공시문서, 기업보고서, 재무제표",
    category: "공식거래소",
    tags: ["한국", "무료", "공시", "필수", "금융감독원"],
    tips: "사업보고서, 분기보고서는 '요약정보'부터 확인. 검색할 때 정확한 회사명 입력 필요",
    difficulty: "보통"
  },
  {
    id: 4,
    name: "한국예탁결제원(KSD)",
    url: "https://www.ksd.or.kr",
    description: "증권 보관·관리통계, 예탁결제 현황",
    category: "공식거래소",
    tags: ["한국", "무료", "통계", "예탁결제"],
    tips: "증권 보관 및 결제 통계 데이터 확인 가능",
    difficulty: "보통"
  },
  
  // ② 공공데이터
  {
    id: 5,
    name: "공공데이터포털 (금융위 오픈API)",
    url: "https://www.data.go.kr",
    description: "주식시세 API, 실시간·과거 시세",
    category: "공공데이터",
    tags: ["한국", "무료", "API", "개발자용", "데이터"],
    tips: "데이터 활용 시 인증키 필요. 개발자를 위한 실시간 시세 API 제공",
    difficulty: "어려움"
  },
  {
    id: 6,
    name: "통계청·KOSIS",
    url: "https://kosis.kr",
    description: "코스피·산업별 투자지표 통계",
    category: "공공데이터",
    tags: ["한국", "무료", "통계", "경제지표"],
    tips: "국가통계포털에서 산업별 투자지표와 거시경제 통계 확인",
    difficulty: "보통"
  },
  
  // ③ 주요 포털
  {
    id: 7,
    name: "네이버 금융",
    url: "https://finance.naver.com",
    description: "시세, 차트, 공시, 환율, 뉴스, 스크리너",
    category: "포털사이트",
    tags: ["한국", "무료", "초보용", "뉴스", "종합정보"],
    tips: "종목 검색 후 '기업분석' 탭에서 재무제표와 실적을 한눈에 확인 가능",
    difficulty: "쉬움"
  },
  {
    id: 8,
    name: "다음 금융",
    url: "https://finance.daum.net",
    description: "코스피·코스닥 시세, 뉴스, 지수별 특징주",
    category: "포털사이트",
    tags: ["한국", "무료", "초보용", "뉴스"],
    tips: "깔끔한 인터페이스로 빠른 시세 확인에 최적화",
    difficulty: "쉬움"
  },
  {
    id: 9,
    name: "야후 파이낸스",
    url: "https://finance.yahoo.com",
    description: "글로벌 주식 정보 및 뉴스 제공",
    category: "포털사이트",
    tags: ["글로벌", "무료", "뉴스", "초보용"],
    tips: "미국 주식 기본 정보 확인에 최적. Statistics 탭에서 주요 지표 한눈에 파악",
    difficulty: "쉬움"
  },
  {
    id: 10,
    name: "한국경제 마켓맵·증권",
    url: "https://markets.hankyung.com",
    description: "시장지도, 이코노믹 캘린더, 종목 검색",
    category: "포털사이트",
    tags: ["한국", "무료", "시장지도", "경제지표"],
    tips: "시장지도로 섹터별 현황 파악, 이코노믹 캘린더로 주요 일정 확인",
    difficulty: "쉬움"
  },
  {
    id: 11,
    name: "매일경제 마켓",
    url: "https://stock.mk.co.kr",
    description: "지수·업종·종목랭킹·ETF·뉴스",
    category: "포털사이트",
    tags: ["한국", "무료", "랭킹", "ETF", "뉴스"],
    tips: "업종별 랭킹과 ETF 정보를 쉽게 확인 가능",
    difficulty: "쉬움"
  },
  
  // ④ 증권사 플랫폼
  {
    id: 12,
    name: "키움증권 영웅문4 / Open API+",
    url: "https://www.kiwoom.com",
    description: "HTS/Web/모바일, 차트·조건검색, 시세·잔고·주문 API",
    category: "증권사",
    tags: ["한국", "HTS", "API", "개발자용", "차트분석"],
    tips: "OCX 기반, REST API 지원. 개발자를 위한 강력한 API 제공",
    difficulty: "어려움"
  },
  {
    id: 13,
    name: "삼성증권 mPOP / POP 스탁",
    url: "https://www.samsungsecurities.com",
    description: "HTS·앱, 종합차트·뉴스·리서치",
    category: "증권사",
    tags: ["한국", "HTS", "리서치", "차트분석"],
    tips: "종합차트 기능과 리서치 보고서가 강점",
    difficulty: "보통"
  },
  {
    id: 14,
    name: "미래에셋증권 M-Stock",
    url: "https://securities.miraeasset.com",
    description: "HTS·앱, 리서치, 글로벌 투자",
    category: "증권사",
    tags: ["한국", "HTS", "글로벌", "리서치"],
    tips: "글로벌 투자 정보와 리서치가 풍부함",
    difficulty: "보통"
  },
  {
    id: 15,
    name: "한국투자증권 eFriend / Open API",
    url: "https://apiportal.koreainvestment.com",
    description: "HTS·앱·웹, REST API·웹소켓",
    category: "증권사",
    tags: ["한국", "HTS", "API", "개발자용"],
    tips: "REST API와 웹소켓을 지원하는 개발자 친화적 플랫폼",
    difficulty: "어려움"
  },
  {
    id: 16,
    name: "NH투자증권 QV",
    url: "https://m.nhqv.com",
    description: "HTS·앱, 맞춤형 퀵뷰",
    category: "증권사",
    tags: ["한국", "HTS", "맞춤형"],
    tips: "맞춤형 퀵뷰 기능으로 원하는 정보를 빠르게 확인",
    difficulty: "보통"
  },
  {
    id: 17,
    name: "KB증권 M-able",
    url: "https://www.kbsec.com",
    description: "HTS·앱, 편리한 UI·투자정보",
    category: "증권사",
    tags: ["한국", "HTS", "편리한UI"],
    tips: "직관적이고 편리한 UI가 특징",
    difficulty: "쉬움"
  },
  {
    id: 18,
    name: "신한금융투자 신한 i-Alpha",
    url: "https://www.shinhansec.com",
    description: "HTS·앱, 통합금융서비스·분석",
    category: "증권사",
    tags: ["한국", "HTS", "통합금융", "분석"],
    tips: "통합금융서비스와 분석 도구가 강점",
    difficulty: "보통"
  },
  {
    id: 19,
    name: "대신증권 크레온",
    url: "https://www.daishin.com",
    description: "HTS·앱, 차트분석·리서치",
    category: "증권사",
    tags: ["한국", "HTS", "차트분석", "리서치"],
    tips: "차트분석 도구와 리서치 정보가 풍부함",
    difficulty: "보통"
  },
  {
    id: 20,
    name: "유진투자증권 유진스마트",
    url: "https://www.eugenefn.com",
    description: "HTS·앱, 직관적 UI·효율적 거래",
    category: "증권사",
    tags: ["한국", "HTS", "직관적UI", "효율적거래"],
    tips: "직관적 UI로 효율적인 거래 환경 제공",
    difficulty: "쉬움"
  },
  {
    id: 21,
    name: "카카오페이증권",
    url: "https://kakaopaysec.com",
    description: "모바일 계좌개설·간편매매·이자지급",
    category: "증권사",
    tags: ["한국", "모바일", "간편매매", "카카오톡연계"],
    tips: "카카오톡 연계로 간편한 계좌개설과 매매 가능",
    difficulty: "쉬움"
  },
  
  // ⑤ 금융정보 포털
  {
    id: 22,
    name: "세이브로 (증권정보포털)",
    url: "https://seibro.or.kr",
    description: "기업·재무정보, 업종별, 신용등급, 리서치 보고서",
    category: "금융정보포털",
    tags: ["한국", "무료", "재무분석", "리서치", "신용등급"],
    tips: "공공·민간 리포트 결합으로 종합적인 기업정보 제공",
    difficulty: "보통"
  },
  {
    id: 23,
    name: "에프앤가이드 (Company FnGuide)",
    url: "https://www.fnguide.com",
    description: "실적 컨센서스, 예상 실적, 업종별 순위",
    category: "금융정보포털",
    tags: ["한국", "유료", "재무분석", "전문가용", "컨센서스"],
    tips: "EPS, PER, PBR 등 핵심 지표 확인. '컨센서스' 메뉴에서 애널리스트 전망 확인",
    difficulty: "보통"
  },
  {
    id: 24,
    name: "한경컨센서스",
    url: "https://consensus.hankyung.com",
    description: "애널리스트 리포트, 시장 전망",
    category: "금융정보포털",
    tags: ["한국", "무료", "리서치", "애널리스트", "시장전망"],
    tips: "애널리스트 리포트와 시장 전망을 한눈에 확인",
    difficulty: "보통"
  },
  {
    id: 25,
    name: "한국IR협의회",
    url: "https://www.iris.or.kr",
    description: "IR자료, 증권사 보고서, 기업설명회 중계",
    category: "금융정보포털",
    tags: ["한국", "무료", "IR", "기업설명회", "리서치"],
    tips: "기업 IR자료와 실시간 기업설명회 중계 시청 가능",
    difficulty: "쉬움"
  },
  {
    id: 26,
    name: "NICE기업정보 (NICE BizInfo)",
    url: "https://www.nicebizinfo.com",
    description: "신용등급, 경쟁사분석, 발행주식현황",
    category: "금융정보포털",
    tags: ["한국", "유료", "신용등급", "경쟁사분석"],
    tips: "유료 기능 일부 제공. 신용등급과 경쟁사 분석 정보 확인",
    difficulty: "보통"
  },
  {
    id: 27,
    name: "빅파이낸스 (BigFinance)",
    url: "https://bigfinance.co.kr",
    description: "분기별 사업부별 실적 조회",
    category: "금융정보포털",
    tags: ["한국", "무료", "실적분석", "사업부별"],
    tips: "가입 필요. 분기별 사업부별 세부 실적 분석 가능",
    difficulty: "보통"
  },
  {
    id: 28,
    name: "쿼타북 (Quotabook)",
    url: "https://quotabook.com",
    description: "주식기준보상·스톡옵션 관리, 주주총회",
    category: "금융정보포털",
    tags: ["한국", "유료", "기업대상", "주주총회", "스톡옵션"],
    tips: "기업 대상 ERP형 솔루션. 주식기준보상 및 주주총회 관리",
    difficulty: "어려움"
  },
  {
    id: 29,
    name: "알파스퀘어 (AlphaSquare)",
    url: "https://alphasquare.co.kr",
    description: "올인원 스마트 트레이딩 플랫폼",
    category: "금융정보포털",
    tags: ["한국", "유료", "스마트트레이딩", "올인원"],
    tips: "통합 트레이딩 플랫폼으로 다양한 분석 도구 제공",
    difficulty: "보통"
  },
  
  // ⑥ 커뮤니티·SNS
  {
    id: 30,
    name: "팍스넷 (Paxnet)",
    url: "https://www.paxnet.co.kr",
    description: "토론실, 리딩방, 공시·뉴스 게시판",
    category: "커뮤니티",
    tags: ["한국", "무료", "커뮤니티", "토론실", "리딩방"],
    tips: "종목 토론과 시황 정보 공유. 리딩방에서 전문가 의견 확인",
    difficulty: "쉬움"
  },
  {
    id: 31,
    name: "증권플러스 (StockPlus)",
    url: "https://www.stockplus.com",
    description: "종목진단, 토론, 투자정보",
    category: "커뮤니티",
    tags: ["한국", "무료", "커뮤니티", "앱기반", "종목진단"],
    tips: "앱 기반으로 종목진단과 투자정보 공유",
    difficulty: "쉬움"
  },
  {
    id: 32,
    name: "에토랜드 (etoland)",
    url: "https://www.etoland.co.kr",
    description: "종목토론, 투자전략 공유",
    category: "커뮤니티",
    tags: ["한국", "무료", "커뮤니티", "투자전략"],
    tips: "종목토론과 개인 투자전략 공유 커뮤니티",
    difficulty: "쉬움"
  },
  {
    id: 33,
    name: "땡글 (Ddengle)",
    url: "https://www.ddengle.com",
    description: "채굴·코인 중심, 주식 토론",
    category: "커뮤니티",
    tags: ["한국", "무료", "커뮤니티", "암호화폐", "주식"],
    tips: "암호화폐·주식 커버하는 종합 투자 커뮤니티",
    difficulty: "쉬움"
  },
  {
    id: 34,
    name: "The Bell",
    url: "https://www.thebell.co.kr",
    description: "기관투자자 대상 뉴스·리서치",
    category: "커뮤니티",
    tags: ["한국", "유료", "기관투자자", "뉴스", "리서치"],
    tips: "기관투자자 대상의 전문적인 뉴스와 리서치 제공",
    difficulty: "어려움"
  },
  
  // ⑦ 기타 (글로벌)
  {
    id: 35,
    name: "Yahoo Finance (글로벌)",
    url: "https://finance.yahoo.com",
    description: "글로벌·국내 지수·종목 실시간 시세",
    category: "글로벌포털",
    tags: ["글로벌", "무료", "뉴스", "초보용", "실시간시세"],
    tips: "미국 주식 기본 정보 확인에 최적. Statistics 탭에서 주요 지표 한눈에 파악",
    difficulty: "쉬움"
  },
  {
    id: 36,
    name: "Bloomberg",
    url: "https://www.bloomberg.com",
    description: "글로벌 뉴스·데이터, 무료 일부 제공",
    category: "글로벌포털",
    tags: ["글로벌", "유료", "뉴스", "전문가용", "데이터"],
    tips: "글로벌 금융 뉴스의 최고 권위. 무료 버전으로도 중요 뉴스 확인 가능",
    difficulty: "어려움"
  },
  {
    id: 37,
    name: "Reuters",
    url: "https://www.reuters.com/finance",
    description: "글로벌 금융 뉴스, 코스피·개별종목 보도",
    category: "글로벌포털",
    tags: ["글로벌", "무료", "뉴스", "코스피"],
    tips: "신뢰성 높은 글로벌 금융 뉴스. 코스피와 한국 주요 종목 보도도 확인",
    difficulty: "쉬움"
  },
  
  // ⑧ 정부기관
  {
    id: 58,
    name: "금융위원회",
    url: "https://www.fsc.go.kr",
    description: "금융정책 수립, 금융소비자 보호, 경제지표 제공, 법령정보, 보도자료",
    category: "정부기관",
    tags: ["한국", "무료", "정부기관", "금융정책", "소비자보호"],
    tips: "금융정책과 규제 정보, 금융위TV에서 최신 동향 확인",
    difficulty: "보통"
  },
  {
    id: 59,
    name: "한국은행",
    url: "https://www.bok.or.kr",
    description: "경제통계시스템(ECOS), 화폐박물관, 경제연구, 금융·경제 스냅샷",
    category: "정부기관",
    tags: ["한국", "무료", "중앙은행", "경제통계", "연구자료"],
    tips: "ECOS에서 각종 경제통계 데이터 확인, 전자도서관 활용",
    difficulty: "보통"
  },
  {
    id: 60,
    name: "금융감독원",
    url: "https://www.fss.or.kr",
    description: "금융기관 감독, 금융교육센터, 민원 처리, 금융상품 비교",
    category: "정부기관",
    tags: ["한국", "무료", "금융감독", "금융교육", "상품비교"],
    tips: "금융상품한눈에에서 상품 비교, 통합연금포털 활용",
    difficulty: "쉬움"
  },
  {
    id: 61,
    name: "금융결제원",
    url: "https://www.kftc.or.kr",
    description: "지급결제서비스, 전자금융공동망 운영, 금융결제 인프라 제공",
    category: "정부기관",
    tags: ["한국", "무료", "결제인프라", "전자금융", "공동망"],
    tips: "금융결제 시스템과 전자금융 인프라 정보 제공",
    difficulty: "보통"
  },
  
  // ⑨ 금융서비스
  {
    id: 62,
    name: "계좌정보통합관리서비스",
    url: "https://www.payinfo.or.kr",
    description: "계좌 및 카드 내역 조회, 자동이체 관리, 휴면예금 찾기, 환급금 조회",
    category: "금융서비스",
    tags: ["한국", "무료", "계좌통합", "휴면예금", "환급금"],
    tips: "개인 금융정보 통합 관리, 잊어버린 계좌 찾기 유용",
    difficulty: "쉬움"
  },
  {
    id: 63,
    name: "금융투자협회",
    url: "https://www.kofia.or.kr",
    description: "금융투자 통계 포털(FREESIS), 투자자 교육, 금융투자업 관련 정보",
    category: "금융서비스",
    tags: ["한국", "무료", "투자통계", "투자교육", "업계정보"],
    tips: "FREESIS에서 금융투자 통계 데이터 확인, 투자자 교육 프로그램 활용",
    difficulty: "보통"
  },
  {
    id: 64,
    name: "한국금융연구원",
    url: "https://www.kif.re.kr",
    description: "금융제도 및 정책 연구, 금융산업 발전을 위한 분석 및 자료 제공",
    category: "금융서비스",
    tags: ["한국", "무료", "금융연구", "정책분석", "산업발전"],
    tips: "금융정책과 제도 연구자료, 금융산업 동향 분석 참고",
    difficulty: "어려움"
  },
  {
    id: 65,
    name: "금융정보분석원",
    url: "https://www.kofiu.go.kr",
    description: "자금세탁 방지, 테러자금 조달 규제, 의심거래 보고, 국제 금융규범 준수",
    category: "금융서비스",
    tags: ["한국", "무료", "자금세탁방지", "금융규범", "의심거래"],
    tips: "금융거래 투명성과 규범 준수 관련 정보 제공",
    difficulty: "보통"
  },
  
  // ⑩ 거래소/증권
  {
    id: 66,
    name: "한국예탁결제원",
    url: "https://www.ksd.or.kr",
    description: "증권 예탁·결제, 주주명부 관리, 전자증권 서비스",
    category: "공식거래소",
    tags: ["한국", "무료", "예탁결제", "주주명부", "전자증권"],
    tips: "증권 예탁과 결제 시스템, 주주명부 서비스 이용",
    difficulty: "보통"
  },
  {
    id: 67,
    name: "한국투자증권",
    url: "https://www.truefriend.com",
    description: "국내외 주식거래, 리서치 보고서, 투자정보 제공",
    category: "증권사",
    tags: ["한국", "유료", "증권거래", "리서치", "투자정보"],
    tips: "HTS/MTS 활용한 거래, 투자정보와 리서치 보고서 참고",
    difficulty: "보통"
  },
  {
    id: 68,
    name: "삼성증권",
    url: "https://www.samsungpop.com",
    description: "주식거래, 해외투자, 투자정보 및 리서치 서비스",
    category: "증권사",
    tags: ["한국", "유료", "주식거래", "해외투자", "리서치"],
    tips: "Pop 시리즈 서비스와 해외투자 플랫폼 활용",
    difficulty: "보통"
  },
  {
    id: 69,
    name: "키움증권",
    url: "https://www.kiwoom.com",
    description: "영웅문 HTS, 주식거래, 투자정보, 리서치 서비스",
    category: "증권사",
    tags: ["한국", "유료", "영웅문", "주식거래", "리서치"],
    tips: "영웅문 HTS로 고급 차트분석, 투자정보 서비스 이용",
    difficulty: "보통"
  },
  {
    id: 70,
    name: "미래에셋증권",
    url: "https://www.miraeasset.com",
    description: "글로벌 투자, 주식거래, 투자정보, 자산관리 서비스",
    category: "증권사",
    tags: ["한국", "유료", "글로벌투자", "자산관리", "투자정보"],
    tips: "글로벌 투자 플랫폼과 자산관리 서비스 활용",
    difficulty: "보통"
  },
  {
    id: 71,
    name: "NH투자증권",
    url: "https://www.nhqv.com",
    description: "주식거래, WTS(웹거래시스템), 투자정보 서비스",
    category: "증권사",
    tags: ["한국", "유료", "WTS", "주식거래", "투자정보"],
    tips: "WTS 웹거래시스템과 투자정보 서비스 이용",
    difficulty: "보통"
  },
  {
    id: 72,
    name: "하나금융투자",
    url: "https://www.hanaw.com",
    description: "주식거래, 해외투자, 자산관리, 투자 상담 서비스",
    category: "증권사",
    tags: ["한국", "유료", "해외투자", "자산관리", "투자상담"],
    tips: "해외투자 서비스와 자산관리, 투자 상담 이용",
    difficulty: "보통"
  },
  {
    id: 73,
    name: "신한금융투자",
    url: "https://www.shinhaninvest.com",
    description: "주식거래, 투자정보, 리서치, 자산관리 서비스",
    category: "증권사",
    tags: ["한국", "유료", "주식거래", "리서치", "자산관리"],
    tips: "신한알파 시리즈와 투자정보, 리서치 서비스 활용",
    difficulty: "보통"
  },
  {
    id: 74,
    name: "KB증권",
    url: "https://www.kbsec.co.kr",
    description: "주식거래, 투자정보, 자산관리, 연금저축 서비스",
    category: "증권사",
    tags: ["한국", "유료", "주식거래", "자산관리", "연금저축"],
    tips: "KB스타뱅킹 연계 서비스와 자산관리 플랫폼 이용",
    difficulty: "보통"
  },
  
  // ⑪ 공공기관
  {
    id: 75,
    name: "한국자본시장연구원",
    url: "https://www.kcmi.re.kr",
    description: "자본시장 연구, 정책 제안, 시장 동향 분석",
    category: "공공기관",
    tags: ["한국", "무료", "자본시장연구", "시장동향", "정책제안"],
    tips: "자본시장 연구보고서와 정책 분석자료 참고",
    difficulty: "어려움"
  },
  {
    id: 76,
    name: "신용회복위원회",
    url: "https://www.ccrs.or.kr",
    description: "개인 신용회복 지원, 채무조정, 금융교육 제공",
    category: "공공기관",
    tags: ["한국", "무료", "신용회복", "채무조정", "금융교육"],
    tips: "개인 신용회복과 채무조정 서비스 이용",
    difficulty: "쉬움"
  },
  {
    id: 77,
    name: "금융투자협회",
    url: "https://www.kofia.or.kr",
    description: "금융투자업계 자율규제기관, 투자자 보호, 시장 발전",
    category: "공공기관",
    tags: ["한국", "무료", "자율규제", "투자자보호", "시장발전"],
    tips: "금융투자업계 규제 정보와 투자자 보호 서비스",
    difficulty: "보통"
  }
];

// 기본 유튜브 채널 데이터
const defaultYoutubeChannels = [
  {
    id: 1001,
    name: "슈카월드",
    url: "https://www.youtube.com/channel/UCsJ6RuBiTVWRX156FVbeaGg",
    description: "경제, 금융, 주식 전반 분석, 인터넷 밈 활용, 대중적이고 재미있는 해설",
    category: "종합분석",
    tags: ["한국", "무료", "주식교육", "경제분석", "대중적"],
    tips: "280만+ 구독자, 재미있고 이해하기 쉬운 경제·주식 콘텐츠",
    difficulty: "쉬움"
  },
  {
    id: 1002,
    name: "삼프로TV_경제의신과함께",
    url: "https://www.youtube.com/channel/UChlv4GSd7OQl3js-jkLOnFA",
    description: "기업 분석, 창업 히스토리, 전문가 대담, 시장 동향",
    category: "종합분석",
    tags: ["한국", "무료", "기업분석", "창업", "전문가대담"],
    tips: "200만+ 구독자, 기업 분석과 창업 스토리 전문 채널",
    difficulty: "보통"
  },
  {
    id: 1003,
    name: "신사임당",
    url: "https://www.youtube.com/channel/UCaJdckl6MBdDPDf75Ec_bJA",
    description: "주식, 재테크, 부업, 초보 투자자向け 콘텐츠 (현재 디피가 운영)",
    category: "초보자용",
    tags: ["한국", "무료", "재테크", "초보자", "부업"],
    tips: "180만+ 구독자, 초보 투자자를 위한 친근한 주식·재테크 콘텐츠 (2022년 채널 매각)",
    difficulty: "쉬움"
  },
  {
    id: 1004,
    name: "한국투자증권",
    url: "https://www.youtube.com/channel/UC7wlcTF1wjWRgnyW17ipQ3A",
    description: "증권사 공식 채널, 시장 분석, 투자 전략, 리서치 리포트",
    category: "증권사공식",
    tags: ["한국", "무료", "증권사", "시장분석", "리서치"],
    tips: "대형 증권사의 공식 분석 자료와 전문가 의견",
    difficulty: "보통"
  },
  {
    id: 1005,
    name: "김작가TV",
    url: "https://www.youtube.com/channel/UC-nLj_VYfpg8_MIBmgOLN8A",
    description: "재테크, 주식 투자 전략, 시장 분석, 전문가 인터뷰",
    category: "종합분석",
    tags: ["한국", "무료", "재테크", "투자전략", "전문가인터뷰"],
    tips: "213만 구독자, 재테크 분야 전문가 인터뷰 채널",
    difficulty: "보통"
  },
  {
    id: 1006,
    name: "키움증권 채널K",
    url: "https://www.youtube.com/channel/UCZW1d7B2nYqQUiTiOnkirrQ",
    description: "증권사 공식 채널, 실시간 시장 분석, 투자 전략, 라이브 방송",
    category: "증권사공식",
    tags: ["한국", "무료", "증권사", "실시간방송", "시장분석"],
    tips: "120만+ 구독자, 매일 8시-4시 장중 라이브 방송 제공",
    difficulty: "보통"
  },
  {
    id: 1007,
    name: "미래에셋 스마트머니",
    url: "https://www.youtube.com/@MiraeAssetSmartMoney",
    description: "주식, 금융 상품, 투자 교육, 글로벌 투자 정보",
    category: "증권사공식",
    tags: ["한국", "무료", "금융상품", "투자교육", "글로벌투자"],
    tips: "112만 구독자, 미래에셋 공식 채널로 글로벌 투자 정보 제공",
    difficulty: "보통"
  },
  {
    id: 1008,
    name: "삼성증권",
    url: "https://www.youtube.com/@samsungsecurities",
    description: "증권사 공식, 한국 및 미국 시장 분석, 투자 전략",
    category: "증권사공식",
    tags: ["한국", "무료", "증권사", "미국시장", "투자전략"],
    tips: "107만 구독자, 삼성증권 공식 채널로 한국·미국 시장 분석",
    difficulty: "보통"
  },
  {
    id: 1009,
    name: "부읽남TV_내집마련부터건물주까지",
    url: "https://www.youtube.com/@부읽남TV",
    description: "재테크, 부동산, 주식, 직장인 중심 콘텐츠",
    category: "재테크종합",
    tags: ["한국", "무료", "재테크", "부동산", "직장인투자"],
    tips: "122만 구독자, 직장인을 위한 종합 재테크 채널",
    difficulty: "쉬움"
  },
  {
    id: 1010,
    name: "한국경제TV",
    url: "https://www.youtube.com/@HankookTV",
    description: "24시간 경제·증권 뉴스, 파트너스 분석, 시장 시황",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "증권뉴스", "시장시황"],
    tips: "110만 구독자, 24시간 경제·증권 전문 방송",
    difficulty: "쉬움"
  },
  {
    id: 1011,
    name: "E트렌드",
    url: "https://www.youtube.com/@etrend",
    description: "주식 시장 트렌드, 종목 분석, 경제 뉴스",
    category: "종합분석",
    tags: ["한국", "무료", "시장트렌드", "종목분석", "경제뉴스"],
    tips: "82.7만 구독자, 주식 시장 트렌드와 종목 분석 전문",
    difficulty: "보통"
  },
  {
    id: 1012,
    name: "MTN 머니투데이방송",
    url: "https://www.youtube.com/@MTNofficial",
    description: "경제 및 주식 뉴스, 시장 시황, 전문가 인터뷰",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "전문가인터뷰", "시장시황"],
    tips: "81.4만 구독자, 경제 전문 방송사의 공식 뉴스 채널",
    difficulty: "쉬움"
  },
  {
    id: 1013,
    name: "박곰희TV",
    url: "https://www.youtube.com/@parkgomhee",
    description: "배당주 투자, 기업 분석, 초보자 친화적 콘텐츠",
    category: "초보자용",
    tags: ["한국", "무료", "배당주", "기업분석", "초보자친화"],
    tips: "53.7만 구독자, 배당주 투자와 기업 분석 전문",
    difficulty: "쉬움"
  },
  {
    id: 1014,
    name: "달란트투자",
    url: "https://www.youtube.com/@talantinvest",
    description: "경제 및 투자 지식, 심층 분석, 장기 투자 전략",
    category: "종합분석",
    tags: ["한국", "무료", "투자지식", "심층분석", "장기투자"],
    tips: "50만 구독자, 경제 및 투자 지식의 심층 분석 제공",
    difficulty: "보통"
  },
  {
    id: 1015,
    name: "미국주식에 미치다 TV",
    url: "https://www.youtube.com/@USstockMania",
    description: "미국 주식 전문, 포트폴리오 분석, 글로벌 시장 동향",
    category: "미국주식",
    tags: ["한국", "무료", "미국주식", "포트폴리오", "글로벌시장"],
    tips: "45만 구독자, 미국 주식 투자 전문 채널",
    difficulty: "보통"
  },
  {
    id: 1016,
    name: "증시각도기",
    url: "https://www.youtube.com/@koreanstockrider",
    description: "시장 시황, 본질적 분석, 신한금융투자 전문가 콘텐츠",
    category: "증권사공식",
    tags: ["한국", "무료", "시장시황", "본질분석", "신한금융투자"],
    tips: "40만 구독자, 신한금융투자 전문가의 시장 분석",
    difficulty: "보통"
  },
  {
    id: 1017,
    name: "가젯서울",
    url: "https://www.youtube.com/@gadgetseoul",
    description: "IT 및 반도체 주식 분석, 기술 중심 투자 정보",
    category: "기술주전문",
    tags: ["한국", "무료", "IT주식", "반도체", "기술투자"],
    tips: "35만 구독자, IT·반도체 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 1018,
    name: "소수몽키",
    url: "https://www.youtube.com/@sosoomonkey",
    description: "미국 시장, ETF, 배당주 투자, 직장인 투자 전략",
    category: "미국주식",
    tags: ["한국", "무료", "미국시장", "ETF", "배당주", "직장인투자"],
    tips: "30만 구독자, 직장인을 위한 미국 시장·배당주 투자",
    difficulty: "쉬움"
  },
  {
    id: 1019,
    name: "LA 정교수 TV",
    url: "https://www.youtube.com/@LAprofessorTV",
    description: "전체 시장, 테슬라, 엔비디아 등 기술주 중심 분석",
    category: "기술주전문",
    tags: ["한국", "무료", "테슬라", "엔비디아", "기술주"],
    tips: "25만 구독자, 테슬라·엔비디아 등 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 1020,
    name: "올랜도 킴 미국주식",
    url: "https://www.youtube.com/@OrlandoKim",
    description: "미국 주식, 창투사 출신의 전문 분석, 테슬라 및 엔비디아 중심",
    category: "기술주전문",
    tags: ["한국", "무료", "미국주식", "창투사", "테슬라", "엔비디아"],
    tips: "20만 구독자, 창투사 출신의 전문적인 미국 주식 분석",
    difficulty: "보통"
  },
  {
    id: 1021,
    name: "써티퍼센트_작전주,경제차트분석",
    url: "https://www.youtube.com/@thirtypercent",
    description: "작전주 분석, 경제 차트, 기술적 분석 중심",
    category: "기술주전문",
    tags: ["한국", "무료", "작전주", "차트분석", "기술적분석"],
    tips: "15만 구독자, 작전주와 기술적 분석 전문",
    difficulty: "어려움"
  },
  {
    id: 1022,
    name: "정영진 챔프연구소",
    url: "https://www.youtube.com/channel/UCMcOxrv5HUHsI3dNgOFZvpQ",
    description: "차트 분석, 기술적 분석, 투자 심리, 시장 매매법",
    category: "기술주전문",
    tags: ["한국", "무료", "차트분석", "기술적분석", "매매법"],
    tips: "100만+ 구독자, 차트 분석의 대가 정영진의 전문적인 기술 분석",
    difficulty: "어려움"
  },
  {
    id: 1023,
    name: "부읽남TV_내집마련부터건물주까지",
    url: "https://www.youtube.com/c/부읽남TV",
    description: "재테크, 부동산, 주식, 직장인 중심 콘텐츠",
    category: "재테크종합",
    tags: ["한국", "무료", "재테크", "부동산", "직장인투자"],
    tips: "122만 구독자, 직장인을 위한 종합 재테크 채널",
    difficulty: "쉬움"
  },
  {
    id: 1024,
    name: "한국경제TV",
    url: "https://www.youtube.com/c/한국경제TV",
    description: "24시간 경제·증권 뉴스, 파트너스 분석, 시장 시황",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "증권뉴스", "시장시황"],
    tips: "110만 구독자, 24시간 경제·증권 전문 방송",
    difficulty: "쉬움"
  },
  {
    id: 1025,
    name: "E트렌드",
    url: "https://www.youtube.com/c/이트렌드",
    description: "주식 시장 트렌드, 종목 분석, 경제 뉴스",
    category: "종합분석",
    tags: ["한국", "무료", "시장트렌드", "종목분석", "경제뉴스"],
    tips: "82.7만 구독자, 주식 시장 트렌드와 종목 분석 전문",
    difficulty: "보통"
  },
  {
    id: 1026,
    name: "MTN 머니투데이방송",
    url: "https://www.youtube.com/c/MTN머니투데이방송",
    description: "경제 및 주식 뉴스, 시장 시황, 전문가 인터뷰",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "전문가인터뷰", "시장시황"],
    tips: "81.4만 구독자, 경제 전문 방송사의 공식 뉴스 채널",
    difficulty: "쉬움"
  },
  {
    id: 1027,
    name: "박곰희TV",
    url: "https://www.youtube.com/c/박곰희TV",
    description: "배당주 투자, 기업 분석, 초보자 친화적 콘텐츠",
    category: "초보자용",
    tags: ["한국", "무료", "배당주", "기업분석", "초보자친화"],
    tips: "53.7만 구독자, 배당주 투자와 기업 분석 전문",
    difficulty: "쉬움"
  },
  {
    id: 1028,
    name: "달란트투자",
    url: "https://www.youtube.com/c/달란트투자",
    description: "경제 및 투자 지식, 심층 분석, 장기 투자 전략",
    category: "종합분석",
    tags: ["한국", "무료", "투자지식", "심층분석", "장기투자"],
    tips: "50만 구독자, 경제 및 투자 지식의 심층 분석 제공",
    difficulty: "보통"
  },
  {
    id: 1029,
    name: "미국주식에 미치다 TV",
    url: "https://www.youtube.com/c/미국주식에미치다TV",
    description: "미국 주식 전문, 포트폴리오 분석, 글로벌 시장 동향",
    category: "미국주식",
    tags: ["한국", "무료", "미국주식", "포트폴리오", "글로벌시장"],
    tips: "45만 구독자, 미국 주식 투자 전문 채널",
    difficulty: "보통"
  },
  {
    id: 1030,
    name: "증시각도기",
    url: "https://www.youtube.com/@koreanstockrider",
    description: "시장 시황, 본질적 분석, 신한금융투자 전문가 콘텐츠",
    category: "증권사공식",
    tags: ["한국", "무료", "시장시황", "본질분석", "신한금융투자"],
    tips: "40만 구독자, 신한금융투자 전문가의 시장 분석",
    difficulty: "보통"
  },
  {
    id: 1031,
    name: "가젯서울",
    url: "https://www.youtube.com/c/가젯서울",
    description: "IT 및 반도체 주식 분석, 기술 중심 투자 정보",
    category: "기술주전문",
    tags: ["한국", "무료", "IT주식", "반도체", "기술투자"],
    tips: "35만 구독자, IT·반도체 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 1032,
    name: "소수몽키",
    url: "https://www.youtube.com/c/소수몽키",
    description: "미국 시장, ETF, 배당주 투자, 직장인 투자 전략",
    category: "미국주식",
    tags: ["한국", "무료", "미국시장", "ETF", "배당주", "직장인투자"],
    tips: "30만 구독자, 직장인을 위한 미국 시장·배당주 투자",
    difficulty: "쉬움"
  },
  {
    id: 1033,
    name: "LA 정교수 TV",
    url: "https://www.youtube.com/c/LA정교수TV",
    description: "전체 시장, 테슬라, 엔비디아 등 기술주 중심 분석",
    category: "기술주전문",
    tags: ["한국", "무료", "테슬라", "엔비디아", "기술주"],
    tips: "25만 구독자, 테슬라·엔비디아 등 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 1034,
    name: "올랜도 킴 미국주식",
    url: "https://www.youtube.com/c/올랜도킴미국주식",
    description: "미국 주식, 창투사 출신의 전문 분석, 테슬라 및 엔비디아 중심",
    category: "기술주전문",
    tags: ["한국", "무료", "미국주식", "창투사", "테슬라", "엔비디아"],
    tips: "20만 구독자, 창투사 출신의 전문적인 미국 주식 분석",
    difficulty: "보통"
  }
];

// 기본 카테고리 데이터
const defaultCategories = [
  "전체",
  "증권사",
  "뉴스/정보",
  "분석/데이터",
  "커뮤니티"
];

const defaultYoutubeCategories = [
  "전체",
  "종합분석",
  "경제뉴스",
  "기술분석",
  "투자교육"
];

export const allTags = [
  "한국", "글로벌", "무료", "유료", "초보용", "전문가용",
  "공시", "필수", "공공기관", "금융감독원", "API", "개발자용", 
  "데이터", "통계", "경제지표", "뉴스", "종합정보", "스크리너",
  "시장지도", "랭킹", "ETF", "HTS", "차트분석", "리서치",
  "맞춤형", "편리한UI", "통합금융", "분석", "직관적UI", "효율적거래",
  "모바일", "간편매매", "카카오톡연계", "재무분석", "신용등급",
  "컨센서스", "애널리스트", "시장전망", "IR", "기업설명회",
  "경쟁사분석", "실적분석", "사업부별", "기업대상", "주주총회",
  "스톡옵션", "스마트트레이딩", "올인원", "토론실", "리딩방",
  "앱기반", "종목진단", "투자전략", "암호화폐", "주식",
  "기관투자자", "실시간시세", "코스피", "예탁결제",
  "경제분석", "대중적", "기업분석", "창업", "전문가대담",
  "재테크", "초보자", "부업", "투자전략", "시장분석", "초보자교육",
  "증권사", "투자교육", "금융상품", "글로벌투자", "미국시장",
  "부동산", "직장인투자", "경제뉴스", "증권뉴스", "시장시황",
  "시장트렌드", "종목분석", "전문가인터뷰", "배당주", "기업분석", "초보자친화",
  "투자지식", "심층분석", "장기투자", "미국주식", "포트폴리오", "글로벌시장",
  "본질분석", "신한금융투자", "IT주식", "반도체", "기술투자",
  "미국시장", "ETF", "직장인투자", "테슬라", "엔비디아", "기술주",
  "창투사", "작전주", "차트분석", "기술적분석"
];

// 동적 데이터 로딩 함수들
export const getStockSites = () => {
  try {
    const adminSites = localStorage.getItem('adminSites');
    return adminSites ? JSON.parse(adminSites) : defaultStockSites;
  } catch (error) {
    console.warn('Failed to load admin sites:', error);
    return defaultStockSites;
  }
};

export const getYoutubeChannels = () => {
  try {
    const adminChannels = localStorage.getItem('adminChannels');
    return adminChannels ? JSON.parse(adminChannels) : defaultYoutubeChannels;
  } catch (error) {
    console.warn('Failed to load admin channels:', error);
    return defaultYoutubeChannels;
  }
};

export const getCategories = () => {
  try {
    const adminCategories = localStorage.getItem('adminSiteCategories');
    return adminCategories ? JSON.parse(adminCategories) : defaultCategories;
  } catch (error) {
    console.warn('Failed to load admin categories:', error);
    return defaultCategories;
  }
};

export const getYoutubeCategories = () => {
  try {
    const adminYtCategories = localStorage.getItem('adminYtCategories');
    return adminYtCategories ? JSON.parse(adminYtCategories) : defaultYoutubeCategories;
  } catch (error) {
    console.warn('Failed to load admin YouTube categories:', error);
    return defaultYoutubeCategories;
  }
};

// 기존 export를 동적 함수로 대체
export const stockSites = getStockSites();
export const youtubeChannels = getYoutubeChannels();
export const categories = getCategories();
export const youtubeCategories = getYoutubeCategories();