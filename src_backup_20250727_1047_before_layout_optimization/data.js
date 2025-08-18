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

// 유튜브 채널 (별도 데이터)
export const youtubeChannels = [
  {
    id: 38,
    name: "슈카월드",
    url: "https://youtube.com/@shukaworld",
    description: "경제, 금융, 주식 전반 분석, 인터넷 밈 활용, 대중적이고 재미있는 해설",
    category: "종합분석",
    tags: ["한국", "무료", "주식교육", "경제분석", "대중적"],
    tips: "210만 구독자, 재미있고 이해하기 쉬운 경제·주식 콘텐츠",
    difficulty: "쉬움"
  },
  {
    id: 39,
    name: "삼프로TV_경제의신과함께",
    url: "https://youtube.com/@3protv",
    description: "기업 분석, 창업 히스토리, 전문가 대담, 시장 동향",
    category: "종합분석",
    tags: ["한국", "무료", "기업분석", "창업", "전문가대담"],
    tips: "192만 구독자, 기업 분석과 창업 스토리 전문 채널",
    difficulty: "보통"
  },
  {
    id: 40,
    name: "신사임당",
    url: "https://youtube.com/@ShinsaImdang",
    description: "주식, 재테크, 부업, 초보 투자자向け 콘텐츠",
    category: "초보자용",
    tags: ["한국", "무료", "재테크", "초보자", "부업"],
    tips: "174만 구독자, 초보 투자자를 위한 친근한 주식·재테크 콘텐츠",
    difficulty: "쉬움"
  },
  {
    id: 41,
    name: "김작가 TV",
    url: "https://youtube.com/@KimJakgaTV",
    description: "주식 투자 전략, 시장 분석, 초보자 교육",
    category: "초보자용",
    tags: ["한국", "무료", "투자전략", "시장분석", "초보자교육"],
    tips: "127만 구독자, 주식 투자 전략과 시장 분석 전문",
    difficulty: "쉬움"
  },
  {
    id: 42,
    name: "키움증권 채널K",
    url: "https://youtube.com/@KiwoomTV",
    description: "증권사 공식, 시장 분석, 투자 전략, 교육 콘텐츠",
    category: "증권사공식",
    tags: ["한국", "무료", "증권사", "시장분석", "투자교육"],
    tips: "120만 구독자, 키움증권 공식 채널로 신뢰성 높은 투자 정보",
    difficulty: "보통"
  },
  {
    id: 43,
    name: "미래에셋 스마트머니",
    url: "https://youtube.com/@MiraeassetSmartMoney",
    description: "주식, 금융 상품, 투자 교육, 글로벌 투자 정보",
    category: "증권사공식",
    tags: ["한국", "무료", "금융상품", "투자교육", "글로벌투자"],
    tips: "112만 구독자, 미래에셋 공식 채널로 글로벌 투자 정보 제공",
    difficulty: "보통"
  },
  {
    id: 44,
    name: "삼성증권",
    url: "https://youtube.com/@SamsungSecurities",
    description: "증권사 공식, 한국 및 미국 시장 분석, 투자 전략",
    category: "증권사공식",
    tags: ["한국", "무료", "증권사", "미국시장", "투자전략"],
    tips: "107만 구독자, 삼성증권 공식 채널로 한국·미국 시장 분석",
    difficulty: "보통"
  },
  {
    id: 45,
    name: "부읽남TV_내집마련부터건물주까지",
    url: "https://youtube.com/@BuiknamTV",
    description: "재테크, 부동산, 주식, 직장인 중심 콘텐츠",
    category: "재테크종합",
    tags: ["한국", "무료", "재테크", "부동산", "직장인투자"],
    tips: "122만 구독자, 직장인을 위한 종합 재테크 채널",
    difficulty: "쉬움"
  },
  {
    id: 46,
    name: "한국경제TV",
    url: "https://youtube.com/@WOWTV",
    description: "24시간 경제·증권 뉴스, 파트너스 분석, 시장 시황",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "증권뉴스", "시장시황"],
    tips: "110만 구독자, 24시간 경제·증권 전문 방송",
    difficulty: "쉬움"
  },
  {
    id: 47,
    name: "E트렌드",
    url: "https://youtube.com/@Etrend",
    description: "주식 시장 트렌드, 종목 분석, 경제 뉴스",
    category: "종합분석",
    tags: ["한국", "무료", "시장트렌드", "종목분석", "경제뉴스"],
    tips: "82.7만 구독자, 주식 시장 트렌드와 종목 분석 전문",
    difficulty: "보통"
  },
  {
    id: 48,
    name: "MTN 머니투데이방송",
    url: "https://youtube.com/@MTNTV",
    description: "경제 및 주식 뉴스, 시장 시황, 전문가 인터뷰",
    category: "종합분석",
    tags: ["한국", "무료", "경제뉴스", "전문가인터뷰", "시장시황"],
    tips: "81.4만 구독자, 경제 전문 방송사의 공식 뉴스 채널",
    difficulty: "쉬움"
  },
  {
    id: 49,
    name: "박곰희TV",
    url: "https://youtube.com/@ParkGomHee",
    description: "배당주 투자, 기업 분석, 초보자 친화적 콘텐츠",
    category: "초보자용",
    tags: ["한국", "무료", "배당주", "기업분석", "초보자친화"],
    tips: "53.7만 구독자, 배당주 투자와 기업 분석 전문",
    difficulty: "쉬움"
  },
  {
    id: 50,
    name: "달란트투자",
    url: "https://youtube.com/@DallantInvestment",
    description: "경제 및 투자 지식, 심층 분석, 장기 투자 전략",
    category: "종합분석",
    tags: ["한국", "무료", "투자지식", "심층분석", "장기투자"],
    tips: "50만 구독자, 경제 및 투자 지식의 심층 분석 제공",
    difficulty: "보통"
  },
  {
    id: 51,
    name: "미국주식에 미치다 TV",
    url: "https://youtube.com/@MadForUSStocks",
    description: "미국 주식 전문, 포트폴리오 분석, 글로벌 시장 동향",
    category: "미국주식",
    tags: ["한국", "무료", "미국주식", "포트폴리오", "글로벌시장"],
    tips: "45만 구독자, 미국 주식 투자 전문 채널",
    difficulty: "보통"
  },
  {
    id: 52,
    name: "증시각도기",
    url: "https://youtube.com/@StockAngle",
    description: "시장 시황, 본질적 분석, 신한금융투자 전문가 콘텐츠",
    category: "증권사공식",
    tags: ["한국", "무료", "시장시황", "본질분석", "신한금융투자"],
    tips: "40만 구독자, 신한금융투자 전문가의 시장 분석",
    difficulty: "보통"
  },
  {
    id: 53,
    name: "가젯서울",
    url: "https://youtube.com/@GadgetSeoul",
    description: "IT 및 반도체 주식 분석, 기술 중심 투자 정보",
    category: "기술주전문",
    tags: ["한국", "무료", "IT주식", "반도체", "기술투자"],
    tips: "35만 구독자, IT·반도체 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 54,
    name: "소수몽키",
    url: "https://youtube.com/@Sosumonkey",
    description: "미국 시장, ETF, 배당주 투자, 직장인 투자 전략",
    category: "미국주식",
    tags: ["한국", "무료", "미국시장", "ETF", "배당주", "직장인투자"],
    tips: "30만 구독자, 직장인을 위한 미국 시장·배당주 투자",
    difficulty: "쉬움"
  },
  {
    id: 55,
    name: "LA 정교수 TV",
    url: "https://youtube.com/@LAProfessor",
    description: "전체 시장, 테슬라, 엔비디아 등 기술주 중심 분석",
    category: "기술주전문",
    tags: ["한국", "무료", "테슬라", "엔비디아", "기술주"],
    tips: "25만 구독자, 테슬라·엔비디아 등 기술주 전문 분석",
    difficulty: "보통"
  },
  {
    id: 56,
    name: "올랜도 킴 미국주식",
    url: "https://youtube.com/@OrlandoKim",
    description: "미국 주식, 창투사 출신의 전문 분석, 테슬라 및 엔비디아 중심",
    category: "기술주전문",
    tags: ["한국", "무료", "미국주식", "창투사", "테슬라", "엔비디아"],
    tips: "20만 구독자, 창투사 출신의 전문적인 미국 주식 분석",
    difficulty: "보통"
  },
  {
    id: 57,
    name: "써티퍼센트_작전주,경제차트분석",
    url: "https://youtube.com/@ThirtyPercent",
    description: "작전주 분석, 경제 차트, 기술적 분석 중심",
    category: "기술주전문",
    tags: ["한국", "무료", "작전주", "차트분석", "기술적분석"],
    tips: "15만 구독자, 작전주와 기술적 분석 전문",
    difficulty: "어려움"
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

export const youtubeCategories = [
  "전체",
  "종합분석",
  "증권사공식", 
  "초보자용",
  "미국주식",
  "기술주전문",
  "재테크종합"
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