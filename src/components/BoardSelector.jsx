import React, { useState, useEffect } from 'react';
import BoardDetail from './BoardDetail';
import { getBoards, getBoardStats } from '../lib/boardApi';
import { useErrorHandler } from '../utils/errorHandler';
// styles-boards.css는 styles-consolidated.css에 포함됨

const BoardSelector = () => {
  const { handleError } = useErrorHandler();
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState([]);
  const [boardStats, setBoardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게시판 목록 로드
  useEffect(() => {
    const loadBoards = async () => {
      const timeout = setTimeout(() => {
        console.warn('게시판 로딩이 10초를 초과했습니다. 기본 데이터를 사용합니다.');
        setBoards([
          { id: 'board1', title: '종합 토론 게시판', description: '주식 투자 관련 자유로운 토론을 나눠보세요', icon: '💬', color: '#3b82f6' },
          { id: 'board2', title: '종목 분석 게시판', description: '개별 종목에 대한 분석과 의견을 공유하세요', icon: '📊', color: '#10b981' },
          { id: 'board3', title: '투자 정보 게시판', description: '유용한 투자 정보와 뉴스를 공유하세요', icon: '📈', color: '#8b5cf6' },
          { id: 'board4', title: '질문답변 게시판', description: '투자 관련 궁금한 점을 질문하고 답변을 받아보세요', icon: '❓', color: '#f59e0b' },
          { id: 'board5', title: '수익인증 게시판', description: '투자 수익을 인증하고 경험담을 공유하세요', icon: '💰', color: '#ef4444' },
          { id: 'board6', title: '자료실 게시판', description: '투자 관련 유용한 자료와 도구를 공유하세요', icon: '📚', color: '#06b6d4' }
        ]);
        setBoardStats({});
        setLoading(false);
      }, 10000);

      try {
        setLoading(true);
        console.log('게시판 데이터 로딩 시작...');
        
        const boardsData = await getBoards();
        clearTimeout(timeout);
        console.log('게시판 데이터:', boardsData);
        setBoards(boardsData);
        
        // 각 게시판의 통계 정보 로드 (비동기 병렬 처리)
        const stats = {};
        const statPromises = boardsData.map(async (board) => {
          try {
            const boardStat = await getBoardStats(board.id);
            stats[board.id] = boardStat;
          } catch (statError) {
            console.warn(`게시판 ${board.id} 통계 로드 실패:`, statError);
            stats[board.id] = { totalPosts: 0, totalViews: 0, totalLikes: 0, lastPost: null };
          }
        });
        
        // 모든 통계 요청 완료 대기 (최대 5초)
        await Promise.allSettled(statPromises);
        setBoardStats(stats);
        
        setError(null);
        console.log('게시판 데이터 로딩 완료');
      } catch (err) {
        clearTimeout(timeout);
        console.error('게시판 로딩 에러:', err);
        const safeMessage = handleError(err, { operation: 'loadBoards' }, false);
        setError(safeMessage);
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, [handleError]);

  const handleBoardSelect = (board) => {
    setSelectedBoard(board);
  };

  const handleBackToSelector = () => {
    setSelectedBoard(null);
  };

  // 선택된 게시판이 있으면 해당 게시판을 표시
  if (selectedBoard) {
    return (
      <BoardDetail 
        board={selectedBoard} 
        onBack={handleBackToSelector}
      />
    );
  }

  // 로딩 상태
  if (loading) {
    return (
      <div className="board-selector-layout">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>게시판을 불러오고 있습니다...</p>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="board-selector-layout">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 게시판 선택 화면
  return (
    <div className="board-selector-layout">
      <div className="board-selector-header">
        <h1>주식게시판</h1>
        <p>다양한 주제의 게시판에서 투자 관련 정보를 공유하고 소통하세요</p>
      </div>

      <div className="boards-grid">
        {boards.map((board) => {
          const stats = boardStats[board.id] || { totalPosts: 0, totalViews: 0 };
          return (
            <div 
              key={board.id} 
              className="board-card"
              onClick={() => handleBoardSelect(board)}
              style={{ '--board-color': board.color }}
            >
              <div className="board-icon">
                {board.icon}
              </div>
              
              <div className="board-info">
                <h3 className="board-title">{board.title}</h3>
                <p className="board-description">{board.description}</p>
                
                <div className="board-stats">
                  <div className="board-stat">
                    <span className="stat-label">게시글</span>
                    <span className="stat-value">{stats.totalPosts}</span>
                  </div>
                  <div className="board-stat">
                    <span className="stat-label">조회수</span>
                    <span className="stat-value">{stats.totalViews}</span>
                  </div>
                </div>
              </div>

              <div className="board-enter-btn">
                <span>입장하기</span>
                <span className="enter-arrow">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BoardSelector;