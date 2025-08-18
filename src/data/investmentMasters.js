// 투자의 대가들 데이터
export const investmentMasters = [
  {
    id: 1,
    name: "워렌 버핏",
    nameEn: "Warren Buffett",
    title: "오마하의 현인",
    company: "버크셔 해서웨이",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "가치투자의 아버지로 불리는 세계 최고의 투자자",
    philosophy: "가치투자",
    famousQuote: "Rule No.1: Never lose money. Rule No.2: Never forget rule No.1",
    achievements: [
      "버크셔 해서웨이 회장 겸 CEO",
      "50년간 연평균 20% 수익률 달성",
      "세계 10대 부자 중 한 명",
      "기부 서약에 참여한 최초의 억만장자"
    ],
    investmentStyle: [
      "장기 보유 투자",
      "기업의 내재가치 분석",
      "경쟁우위가 있는 기업 선호",
      "경영진의 능력과 정직함 중시"
    ],
    majorInvestments: [
      "코카콜라",
      "애플",
      "아메리칸 익스프레스",
      "GEICO 보험"
    ],
    books: [
      "버핏의 투자 원칙",
      "현명한 투자자",
      "증권분석"
    ],
    biography: "1930년 네브래스카 오마하에서 태어난 워렌 버핏은 11세에 첫 주식을 구매했습니다. 벤저민 그레이엄의 가르침을 받아 가치투자의 철학을 체득했으며, 1965년 버크셔 해서웨이를 인수한 후 50년 넘게 연평균 20%의 수익률을 기록하며 세계 최고의 투자자로 인정받고 있습니다."
  },
  {
    id: 2,
    name: "피터 린치",
    nameEn: "Peter Lynch",
    title: "전설적인 펀드매니저",
    company: "피델리티 매젤란 펀드",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "일반 투자자들도 전문가를 이길 수 있다고 주장한 투자 대가",
    philosophy: "성장주 투자",
    famousQuote: "Invest in what you know",
    achievements: [
      "매젤란 펀드 13년간 운용",
      "연평균 29.2% 수익률 달성",
      "펀드 규모를 180억 달러로 성장시킴",
      "월스트리트 최고의 펀드매니저로 인정"
    ],
    investmentStyle: [
      "Bottom-up 분석",
      "소비자 관점에서 기업 분석",
      "성장주와 가치주 혼합 투자",
      "직접 경험할 수 있는 기업 선호"
    ],
    majorInvestments: [
      "던킨도너츠",
      "토이저러스",
      "볼보",
      "크라이슬러"
    ],
    books: [
      "월스트리트를 이기는 법",
      "피터 린치의 투자 이야기",
      "전설로 떠나는 월스트리트의 영웅"
    ],
    biography: "피터 린치는 1944년 보스턴에서 태어났으며, 1977년부터 1990년까지 피델리티 매젤란 펀드를 운용하며 연평균 29.2%의 놀라운 수익률을 기록했습니다. 그는 일반 투자자들도 충분히 좋은 투자를 할 수 있다고 믿었으며, '아는 것에 투자하라'는 철학으로 유명합니다."
  },
  {
    id: 3,
    name: "벤저민 그레이엄",
    nameEn: "Benjamin Graham",
    title: "가치투자의 아버지",
    company: "그레이엄-뉴먼 파트너십",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
    description: "현대 증권분석과 가치투자 이론의 창시자",
    philosophy: "가치투자",
    famousQuote: "Investment is most intelligent when it is most businesslike",
    achievements: [
      "컬럼비아 대학교 교수",
      "가치투자 이론 확립",
      "워렌 버핏의 스승",
      "증권분석의 아버지로 불림"
    ],
    investmentStyle: [
      "내재가치 대비 저평가된 주식 투자",
      "안전마진 확보",
      "정량적 분석 중시",
      "감정보다는 이성적 판단"
    ],
    majorInvestments: [
      "GEICO 보험",
      "정부 채권",
      "저평가 우량주",
      "특별상황 투자"
    ],
    books: [
      "증권분석",
      "현명한 투자자",
      "벤저민 그레이엄의 가치투자"
    ],
    biography: "1894년 런던에서 태어난 벤저민 그레이엄은 1929년 대공황을 겪으며 리스크 관리의 중요성을 깨달았습니다. 그는 기업의 내재가치를 정확히 분석하여 저평가된 주식에 투자하는 가치투자 이론을 확립했으며, 워렌 버핏을 비롯한 수많은 투자자들의 스승이 되었습니다."
  },
  {
    id: 4,
    name: "존 보글",
    nameEn: "John Bogle",
    title: "인덱스 펀드의 아버지",
    company: "뱅가드 그룹",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "인덱스 펀드를 통해 일반 투자자들의 투자 비용을 혁신적으로 낮춘 투자철학자",
    philosophy: "인덱스 투자",
    famousQuote: "Don't look for the needle in the haystack. Just buy the haystack!",
    achievements: [
      "뱅가드 그룹 창립자",
      "최초의 인덱스 뮤추얼 펀드 출시",
      "투자 비용 혁명 주도",
      "TIME지 선정 세계에서 가장 영향력 있는 100인"
    ],
    investmentStyle: [
      "패시브 인덱스 투자",
      "저비용 장기투자",
      "시장 전체 분산투자",
      "단순하고 일관된 전략"
    ],
    majorInvestments: [
      "S&P 500 인덱스",
      "전체 주식시장 인덱스",
      "채권 인덱스",
      "국제주식 인덱스"
    ],
    books: [
      "존 보글의 투자 상식",
      "뮤추얼 펀드 상식",
      "충분"
    ],
    biography: "1929년 뉴저지에서 태어난 존 보글은 1975년 뱅가드를 설립하고 세계 최초의 인덱스 뮤추얼 펀드를 출시했습니다. 그는 높은 수수료로 투자자들을 괴롭히는 금융업계에 도전하여 저비용 인덱스 투자의 혁명을 일으켰으며, 일반 투자자들이 시장 수익률을 얻을 수 있도록 도왔습니다."
  },
  {
    id: 5,
    name: "조지 소로스",
    nameEn: "George Soros",
    title: "퀀텀 펀드의 전설",
    company: "소로스 펀드 매니지먼트",
    profileImage: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    description: "거시경제 분석을 통한 투기적 투자로 유명한 헤지펀드 대가",
    philosophy: "거시경제 투자",
    famousQuote: "It's not whether you're right or wrong that's important, but how much money you make when you're right and how much you lose when you're wrong",
    achievements: [
      "퀀텀 펀드 설립",
      "영국 파운드 공매도로 10억 달러 수익",
      "30년간 연평균 30% 수익률",
      "세계적인 자선사업가"
    ],
    investmentStyle: [
      "거시경제 분석 기반 투자",
      "높은 레버리지 활용",
      "통화 및 채권 투기",
      "반사성 이론 적용"
    ],
    majorInvestments: [
      "영국 파운드 공매도",
      "아시아 통화위기 베팅",
      "일본 엔화 투자",
      "유럽 채권 투자"
    ],
    books: [
      "소로스의 투자와 철학",
      "금융연금술",
      "열린사회와 그 적들"
    ],
    biography: "1930년 헝가리 부다페스트에서 태어난 조지 소로스는 1992년 영국 파운드를 공매도하여 하루 만에 10억 달러를 벌어들이며 '영국 은행을 무너뜨린 남자'로 불리게 되었습니다. 그는 철학자 칼 포퍼의 영향을 받아 반사성 이론을 개발했으며, 거시경제 분석을 통한 투기적 투자로 큰 성공을 거두었습니다."
  },
  {
    id: 6,
    name: "레이 달리오",
    nameEn: "Ray Dalio",
    title: "브리지워터의 창립자",
    company: "브리지워터 어소시에이츠",
    profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=300&h=300&fit=crop&crop=face",
    description: "원칙에 기반한 체계적 투자와 경제 사이클 분석의 대가",
    philosophy: "원칙 기반 투자",
    famousQuote: "He who lives by the crystal ball will eat shattered glass",
    achievements: [
      "세계 최대 헤지펀드 브리지워터 창립",
      "올웨더 포트폴리오 개발",
      "경제사이클 예측의 대가",
      "투명한 기업문화 구축"
    ],
    investmentStyle: [
      "거시경제 사이클 분석",
      "리스크 패리티 전략",
      "체계적 분산투자",
      "데이터 기반 의사결정"
    ],
    majorInvestments: [
      "올웨더 포트폴리오",
      "글로벌 거시경제 베팅",
      "통화 헤징 전략",
      "상품 및 채권 투자"
    ],
    books: [
      "원칙",
      "경제와 투자의 원칙",
      "변화하는 세계질서"
    ],
    biography: "1949년 뉴욕에서 태어난 레이 달리오는 1975년 자신의 아파트에서 브리지워터를 설립했습니다. 그는 투명성과 원칙에 기반한 독특한 기업문화를 구축했으며, 경제 사이클을 분석하여 리스크를 관리하는 체계적 투자 방법론으로 세계 최대의 헤지펀드를 만들어냈습니다."
  }
];

export default investmentMasters;