import React, { useState } from 'react';
import boardsData from '../data/boardsData.js';
import BoardDetail from './BoardDetail';
import '../styles-boards.css';

const BoardSelector = () => {
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleBoardSelect = (boardId) => {
    setSelectedBoard(boardId);
  };

  const handleBackToSelector = () => {
    setSelectedBoard(null);
  };

  // 선택된 게시판이 있으면 해당 게시판을 표시
  if (selectedBoard) {
    return (
      <BoardDetail 
        board={boardsData[selectedBoard]} 
        onBack={handleBackToSelector}
      />
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
        {Object.values(boardsData).map((board) => (
          <div 
            key={board.id} 
            className="board-card"
            onClick={() => handleBoardSelect(board.id)}
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
                  <span className="stat-value">{board.posts.length}</span>
                </div>
                <div className="board-stat">
                  <span className="stat-label">조회수</span>
                  <span className="stat-value">
                    {board.posts.reduce((total, post) => total + post.views, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="board-enter-btn">
              <span>입장하기</span>
              <span className="enter-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSelector;