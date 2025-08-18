export const stockSites = [
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
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "API", "개발자용", "차트분석"],
    tips: "OCX 기반, REST API 지원. 개발자를 위한 강력한 API 제공",
    difficulty: "어려움"
  },
  {
    id: 13,
    name: "삼성증권 mPOP / POP 스탁",
    url: "https://www.samsungsecurities.com",
    description: "HTS·앱, 종합차트·뉴스·리서치",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "리서치", "차트분석"],
    tips: "종합차트 기능과 리서치 보고서가 강점",
    difficulty: "보통"
  },
  {
    id: 14,
    name: "미래에셋증권 M-Stock",
    url: "https://securities.miraeasset.com",
    description: "HTS·앱, 리서치, 글로벌 투자",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "글로벌", "리서치"],
    tips: "글로벌 투자 정보와 리서치가 풍부함",
    difficulty: "보통"
  },
  {
    id: 15,
    name: "한국투자증권 eFriend / Open API",
    url: "https://apiportal.koreainvestment.com",
    description: "HTS·앱·웹, REST API·웹소켓",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "API", "개발자용"],
    tips: "REST API와 웹소켓을 지원하는 개발자 친화적 플랫폼",
    difficulty: "어려움"
  },
  {
    id: 16,
    name: "NH투자증권 QV",
    url: "https://m.nhqv.com",
    description: "HTS·앱, 맞춤형 퀵뷰",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "맞춤형"],
    tips: "맞춤형 퀵뷰 기능으로 원하는 정보를 빠르게 확인",
    difficulty: "보통"
  },
  {
    id: 17,
    name: "KB증권 M-able",
    url: "https://www.kbsec.com",
    description: "HTS·앱, 편리한 UI·투자정보",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "편리한UI"],
    tips: "직관적이고 편리한 UI가 특징",
    difficulty: "쉬움"
  },
  {
    id: 18,
    name: "신한금융투자 신한 i-Alpha",
    url: "https://www.shinhansec.com",
    description: "HTS·앱, 통합금융서비스·분석",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "통합금융", "분석"],
    tips: "통합금융서비스와 분석 도구가 강점",
    difficulty: "보통"
  },
  {
    id: 19,
    name: "대신증권 크레온",
    url: "https://www.daishin.com",
    description: "HTS·앱, 차트분석·리서치",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "차트분석", "리서치"],
    tips: "차트분석 도구와 리서치 정보가 풍부함",
    difficulty: "보통"
  },
  {
    id: 20,
    name: "유진투자증권 유진스마트",
    url: "https://www.eugenefn.com",
    description: "HTS·앱, 직관적 UI·효율적 거래",
    category: "증권사플랫폼",
    tags: ["한국", "HTS", "직관적UI", "효율적거래"],
    tips: "직관적 UI로 효율적인 거래 환경 제공",
    difficulty: "쉬움"
  },
  {
    id: 21,
    name: "카카오페이증권",
    url: "https://kakaopaysec.com",
    description: "모바일 계좌개설·간편매매·이자지급",
    category: "증권사플랫폼",
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
  }
];

export const categories = [
  "전체",
  "공식거래소",
  "공공데이터", 
  "포털사이트",
  "증권사플랫폼",
  "금융정보포털",
  "커뮤니티",
  "글로벌포털"
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
  "기관투자자", "실시간시세", "코스피", "예탁결제"
];// 유튜브 채널 데이터
const youtubeChannels = [
  {
    id: 38,
    name: "신사임당 (신영증권)",
    url: "https://www.youtube.com/@sinsaimdang",
    description: "데일리 시황, 종목 분석, 투자 전략",
    category: "유튜브",
    tags: ["한국", "무료", "시황분석", "종목분석", "투자전략"],
    tips: "매일 아침 시황 분석과 주요 종목 리뷰 제공",
    difficulty: "쉬움"
  },
  {
    id: 39,
    name: "삼프로TV",
    url: "https://www.youtube.com/@sampro3",
    description: "실시간 주식방송, 시황 분석, 종목 추천",
    category: "유튜브",
    tags: ["한국", "무료", "실시간방송", "시황분석", "종목추천"],
    tips: "실시간 주식방송으로 장중 시황과 종목 분석 확인",
    difficulty: "쉬움"
  },
  {
    id: 40,
    name: "작전타임",
    url: "https://www.youtube.com/@jakjeontime",
    description: "주식 기술적 분석, 차트 분석, 매매 전략",
    category: "유튜브",
    tags: ["한국", "무료", "기술적분석", "차트분석", "매매전략"],
    tips: "기술적 분석과 차트 패턴을 활용한 매매 전략 제공",
    difficulty: "보통"
  },
  {
    id: 41,
    name: "한국경제TV 주식",
    url: "https://www.youtube.com/@한국경제TV",
    description: "경제 뉴스, 시장 분석, 전문가 인터뷰",
    category: "유튜브",
    tags: ["한국", "무료", "경제뉴스", "시장분석", "전문가인터뷰"],
    tips: "경제 전문 방송사의 공식 채널로 신뢰성 높은 정보 제공",
    difficulty: "쉬움"
  },
  {
    id: 42,
    name: "부꾸미 (부자되는 꾸준한 미래)",
    url: "https://www.youtube.com/@buccumi",
    description: "가치투자, 재무제표 분석, 장기투자 전략",
    category: "유튜브",
    tags: ["한국", "무료", "가치투자", "재무제표분석", "장기투자"],
    tips: "기업 분석과 가치투자 관점의 장기투자 전략 제공",
    difficulty: "보통"
  },
  {
    id: 43,
    name: "이진우의 손에 잡히는 경제",
    url: "https://www.youtube.com/@ezeconomy",
    description: "거시경제 분석, 경제지표 해석, 투자 인사이트",
    category: "유튜브",
    tags: ["한국", "무료", "거시경제", "경제지표", "투자인사이트"],
    tips: "거시경제 관점에서 투자 방향성과 인사이트 제공",
    difficulty: "보통"
  },
  {
    id: 44,
    name: "슈카월드",
    url: "https://www.youtube.com/@shukaworld",
    description: "주식 교육, 투자 심리, 매매 기법",
    category: "유튜브",
    tags: ["한국", "무료", "주식교육", "투자심리", "매매기법"],
    tips: "주식 초보자를 위한 교육 콘텐츠와 심리적 접근법 제공",
    difficulty: "쉬움"
  },
  {
    id: 45,
    name: "김작가TV",
    url: "https://www.youtube.com/@kimjakga",
    description: "종목 분석, 투자 아이디어, 시황 리뷰",
    category: "유튜브",
    tags: ["한국", "무료", "종목분석", "투자아이디어", "시황리뷰"],
    tips: "개별 종목 분석과 투자 아이디어 발굴에 특화",
    difficulty: "보통"
  },
  {
    id: 46,
    name: "주식왕 김정환",
    url: "https://www.youtube.com/@stockking",
    description: "단타 매매, 기술적 분석, 차트 패턴",
    category: "유튜브",
    tags: ["한국", "무료", "단타매매", "기술적분석", "차트패턴"],
    tips: "단기 매매와 기술적 분석을 통한 차트 패턴 해석",
    difficulty: "어려움"
  },
  {
    id: 47,
    name: "파비TV (파이낸셜 빅데이터)",
    url: "https://www.youtube.com/@pabiTV",
    description: "데이터 기반 분석, 퀀트 투자, 통계적 접근",
    category: "유튜브",
    tags: ["한국", "무료", "데이터분석", "퀀트투자", "통계적접근"],
    tips: "빅데이터와 통계를 활용한 정량적 투자 접근법 제공",
    difficulty: "어려움"
  },
  {
    id: 48,
    name: "정완진TV",
    url: "https://www.youtube.com/@jungwanjin",
    description: "해외주식, 글로벌 투자, 섹터 분석",
    category: "유튜브",
    tags: ["한국", "무료", "해외주식", "글로벌투자", "섹터분석"],
    tips: "해외 주식과 글로벌 투자 트렌드 분석에 특화",
    difficulty: "보통"
  },
  {
    id: 49,
    name: "매경TV 주식",
    url: "https://www.youtube.com/@매일경제TV",
    description: "매경 증시 브리핑, 전문가 토론, 시황 분석",
    category: "유튜브",
    tags: ["한국", "무료", "증시브리핑", "전문가토론", "언론사"],
    tips: "매일경제 공식 채널로 신뢰성 높은 증시 정보 제공",
    difficulty: "쉬움"
  },
  {
    id: 50,
    name: "염블리 (염승환의 블로그)",
    url: "https://www.youtube.com/@yeomseunghwan",
    description: "미국 주식, 테크 주식, 성장주 분석",
    category: "유튜브",
    tags: ["한국", "무료", "미국주식", "테크주식", "성장주분석"],
    tips: "미국 주식, 특히 테크 주식과 성장주 분석에 전문성",
    difficulty: "보통"
  },
  {
    id: 51,
    name: "조던TV",
    url: "https://www.youtube.com/@jordantv",
    description: "실전 투자, 포트폴리오 관리, 리스크 관리",
    category: "유튜브",
    tags: ["한국", "무료", "실전투자", "포트폴리오관리", "리스크관리"],
    tips: "실전 투자 경험을 바탕으로 한 포트폴리오와 리스크 관리법 제공",
    difficulty: "보통"
  }
];