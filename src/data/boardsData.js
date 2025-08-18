// 게시판 데이터 구조
export const boardsData = {
  board1: {
    id: 'board1',
    title: '종합 토론 게시판',
    description: '주식 투자 관련 자유로운 토론을 나눠보세요',
    icon: '💬',
    color: '#3b82f6',
    posts: [
      {
        id: 1,
        title: '2025년 투자 전망에 대해 어떻게 생각하시나요?',
        content: '새해를 맞아 올해 투자 전망에 대한 다양한 의견을 듣고 싶습니다.',
        author: '투자러버',
        date: '2025-01-18',
        views: 142,
        likes: 23,
        comments: 15
      },
      {
        id: 2,
        title: '초보자 추천 투자 서적 공유',
        content: '투자 초보분들께 도움이 될 만한 좋은 책들을 추천해주세요.',
        author: '북러버',
        date: '2025-01-17',
        views: 89,
        likes: 12,
        comments: 8
      }
    ]
  },
  board2: {
    id: 'board2',
    title: '종목 분석 게시판',
    description: '개별 종목에 대한 분석과 의견을 공유하세요',
    icon: '📊',
    color: '#10b981',
    posts: [
      {
        id: 1,
        title: '삼성전자 4분기 실적 분석',
        content: '삼성전자 4분기 실적 발표 후 주가 전망에 대해 분석해보겠습니다.',
        author: '애널리스트A',
        date: '2025-01-18',
        views: 234,
        likes: 45,
        comments: 28
      }
    ]
  },
  board3: {
    id: 'board3',
    title: '투자 정보 게시판',
    description: '유용한 투자 정보와 뉴스를 공유하세요',
    icon: '📈',
    color: '#8b5cf6',
    posts: [
      {
        id: 1,
        title: '미국 금리 인상 전망과 한국 증시 영향',
        content: '최근 미국 연준의 금리 정책 변화가 한국 증시에 미칠 영향을 분석해봅시다.',
        author: '경제분석가',
        date: '2025-01-18',
        views: 178,
        likes: 32,
        comments: 19
      }
    ]
  },
  board4: {
    id: 'board4',
    title: '질문답변 게시판',
    description: '투자 관련 궁금한 점을 질문하고 답변을 받아보세요',
    icon: '❓',
    color: '#f59e0b',
    posts: [
      {
        id: 1,
        title: '주식 초보인데 어떤 계좌를 개설해야 하나요?',
        content: '투자를 시작하려고 하는데 증권계좌 개설 방법과 추천 증권사를 알려주세요.',
        author: '투자초보',
        date: '2025-01-17',
        views: 156,
        likes: 28,
        comments: 22
      }
    ]
  },
  board5: {
    id: 'board5',
    title: '수익인증 게시판',
    description: '투자 수익을 인증하고 경험담을 공유하세요',
    icon: '💰',
    color: '#ef4444',
    posts: [
      {
        id: 1,
        title: '작년 수익률 30% 달성!',
        content: '작년 한 해 동안 꾸준한 투자로 30% 수익을 얻었습니다. 경험담을 공유합니다.',
        author: '성공투자자',
        date: '2025-01-16',
        views: 312,
        likes: 67,
        comments: 41
      }
    ]
  },
  board6: {
    id: 'board6',
    title: '자료실 게시판',
    description: '투자 관련 유용한 자료와 도구를 공유하세요',
    icon: '📚',
    color: '#06b6d4',
    posts: [
      {
        id: 1,
        title: '주식 분석 엑셀 템플릿 공유',
        content: '개인적으로 사용하는 주식 분석용 엑셀 템플릿을 공유합니다.',
        author: '엑셀마스터',
        date: '2025-01-15',
        views: 445,
        likes: 89,
        comments: 34
      }
    ]
  }
};

export default boardsData;