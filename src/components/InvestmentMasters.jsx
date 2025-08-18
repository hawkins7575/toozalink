import React, { useState } from 'react';
import investmentMasters from '../data/investmentMasters.js';
import '../styles-investment-masters.css';

const InvestmentMasters = () => {
  const [selectedMaster, setSelectedMaster] = useState(null);

  const handleCardClick = (master) => {
    setSelectedMaster(master);
  };

  const handleCloseModal = () => {
    setSelectedMaster(null);
  };

  return (
    <div className="investment-masters-layout">
      <div className="masters-header">
        <h1>투자의 대가</h1>
        <p>세계적인 투자 거장들의 철학과 투자 원칙을 만나보세요</p>
      </div>

      <div className="masters-grid">
        {investmentMasters.map((master) => (
          <div 
            key={master.id} 
            className="master-card"
            onClick={() => handleCardClick(master)}
          >
            <div className="master-image-container">
              <img 
                src={master.profileImage} 
                alt={master.name}
                className="master-image"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(master.name)}&size=300&background=6366f1&color=ffffff&font-size=0.6`;
                }}
              />
              <div className="master-overlay">
                <span className="master-view-icon">👁️</span>
              </div>
            </div>
            
            <div className="master-info">
              <h3 className="master-name">{master.name}</h3>
              <p className="master-title">{master.title}</p>
              <p className="master-company">{master.company}</p>
              <div className="master-philosophy">
                <span className="philosophy-label">투자철학</span>
                <span className="philosophy-value">{master.philosophy}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 모달 */}
      {selectedMaster && (
        <div className="master-modal-overlay" onClick={handleCloseModal}>
          <div className="master-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="master-modal-header">
              <div className="master-modal-image">
                <img 
                  src={selectedMaster.profileImage} 
                  alt={selectedMaster.name}
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMaster.name)}&size=300&background=6366f1&color=ffffff&font-size=0.6`;
                  }}
                />
              </div>
              <div className="master-modal-basic-info">
                <h2>{selectedMaster.name}</h2>
                <p className="master-name-en">{selectedMaster.nameEn}</p>
                <p className="master-modal-title">{selectedMaster.title}</p>
                <p className="master-modal-company">{selectedMaster.company}</p>
                <div className="master-modal-philosophy">
                  <strong>투자철학:</strong> {selectedMaster.philosophy}
                </div>
              </div>
              <button className="modal-close-btn" onClick={handleCloseModal}>×</button>
            </div>

            <div className="master-modal-content">
              <div className="master-description">
                <h3>소개</h3>
                <p>{selectedMaster.description}</p>
              </div>

              <div className="master-quote">
                <h3>명언</h3>
                <blockquote>"{selectedMaster.famousQuote}"</blockquote>
              </div>

              <div className="master-biography">
                <h3>인물 소개</h3>
                <p>{selectedMaster.biography}</p>
              </div>

              <div className="master-details-grid">
                <div className="master-achievements">
                  <h3>주요 성과</h3>
                  <ul>
                    {selectedMaster.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="master-investment-style">
                  <h3>투자 스타일</h3>
                  <ul>
                    {selectedMaster.investmentStyle.map((style, index) => (
                      <li key={index}>{style}</li>
                    ))}
                  </ul>
                </div>

                <div className="master-investments">
                  <h3>주요 투자</h3>
                  <ul>
                    {selectedMaster.majorInvestments.map((investment, index) => (
                      <li key={index}>{investment}</li>
                    ))}
                  </ul>
                </div>

                <div className="master-books">
                  <h3>추천 도서</h3>
                  <ul>
                    {selectedMaster.books.map((book, index) => (
                      <li key={index}>{book}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentMasters;