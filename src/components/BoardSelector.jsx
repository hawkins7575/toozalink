import React, { useState, useEffect } from 'react';
import BoardDetail from './BoardDetail';
import { getBoards, getBoardStats } from '../lib/boardApi';
import '../styles-boards.css';

const BoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boards, setBoards] = useState([]);
  const [boardStats, setBoardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 게시판 목록 로드
  useEffect(() => {
    const loadBoards = async () => {
      try {
        setLoading(true);
        const boardsData = await getBoards();
        setBoards(boardsData);
        
        // 각 게시판의 통계 정보 로드
        const stats = {};
        for (const board of boardsData) {
          const boardStat = await getBoardStats(board.id);
          stats[board.id] = boardStat;
        }
        setBoardStats(stats);
        
        setError(null);
      } catch (err) {
        console.error('게시판 로드 실패:', err);
        setError('게시판을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadBoards();
  }, []);

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