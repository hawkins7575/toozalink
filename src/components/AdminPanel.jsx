import React, { useState, useEffect } from 'react';
import { getStockSites, getYoutubeChannels, getCategories, getYoutubeCategories } from '../data';

const AdminPanel = ({ onClose, onDataUpdate }) => {
  const [activeTab, setActiveTab] = useState('sites');
  const [sites, setSites] = useState([]);
  const [channels, setChannels] = useState([]);
  const [siteCategories, setSiteCategories] = useState([]);
  const [ytCategories, setYtCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // 동적 데이터 로드
    const sites = getStockSites();
    const channels = getYoutubeChannels();
    const siteCategories = getCategories();
    const ytCategories = getYoutubeCategories();
    
    setSites(sites);
    setChannels(channels);
    setSiteCategories(siteCategories);
    setYtCategories(ytCategories);

    // 관리자 데이터가 없으면 기본 데이터를 관리자 데이터로 저장
    if (!localStorage.getItem('adminSites')) {
      localStorage.setItem('adminSites', JSON.stringify(sites));
    }
    if (!localStorage.getItem('adminChannels')) {
      localStorage.setItem('adminChannels', JSON.stringify(channels));
    }
    if (!localStorage.getItem('adminSiteCategories')) {
      localStorage.setItem('adminSiteCategories', JSON.stringify(siteCategories));
    }
    if (!localStorage.getItem('adminYtCategories')) {
      localStorage.setItem('adminYtCategories', JSON.stringify(ytCategories));
    }
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    // 메인 애플리케이션에 데이터 업데이트 알림
    if (onDataUpdate) {
      onDataUpdate();
    }
  };

  const handleAddSite = () => {
    const newSite = {
      id: Math.max(...sites.map(s => s.id)) + 1,
      name: formData.name,
      url: formData.url,
      description: formData.description,
      category: formData.category,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      tips: formData.tips || '',
      difficulty: formData.difficulty || '보통'
    };
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    saveToLocalStorage('adminSites', updatedSites);
    setShowAddForm(false);
    setFormData({});
  };

  const handleEditSite = (site) => {
    setEditingItem(site.id);
    setFormData({
      name: site.name,
      url: site.url,
      description: site.description,
      category: site.category,
      tags: site.tags.join(', '),
      tips: site.tips,
      difficulty: site.difficulty
    });
  };

  const handleUpdateSite = () => {
    const updatedSites = sites.map(site => 
      site.id === editingItem ? {
        ...site,
        name: formData.name,
        url: formData.url,
        description: formData.description,
        category: formData.category,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        tips: formData.tips,
        difficulty: formData.difficulty
      } : site
    );
    setSites(updatedSites);
    saveToLocalStorage('adminSites', updatedSites);
    setEditingItem(null);
    setFormData({});
  };

  const handleDeleteSite = (id) => {
    if (window.confirm('정말로 이 사이트를 삭제하시겠습니까?')) {
      const updatedSites = sites.filter(site => site.id !== id);
      setSites(updatedSites);
      saveToLocalStorage('adminSites', updatedSites);
    }
  };

  const handleAddChannel = () => {
    const newChannel = {
      id: Math.max(...channels.map(c => c.id)) + 1,
      name: formData.name,
      url: formData.url,
      description: formData.description,
      category: formData.category,
      subscribers: formData.subscribers || '정보없음',
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      tips: formData.tips || '',
      difficulty: formData.difficulty || '보통'
    };
    const updatedChannels = [...channels, newChannel];
    setChannels(updatedChannels);
    saveToLocalStorage('adminChannels', updatedChannels);
    setShowAddForm(false);
    setFormData({});
  };

  const handleEditChannel = (channel) => {
    setEditingItem(channel.id);
    setFormData({
      name: channel.name,
      url: channel.url,
      description: channel.description,
      category: channel.category,
      subscribers: channel.subscribers,
      tags: channel.tags.join(', '),
      tips: channel.tips,
      difficulty: channel.difficulty
    });
  };

  const handleUpdateChannel = () => {
    const updatedChannels = channels.map(channel => 
      channel.id === editingItem ? {
        ...channel,
        name: formData.name,
        url: formData.url,
        description: formData.description,
        category: formData.category,
        subscribers: formData.subscribers,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        tips: formData.tips,
        difficulty: formData.difficulty
      } : channel
    );
    setChannels(updatedChannels);
    saveToLocalStorage('adminChannels', updatedChannels);
    setEditingItem(null);
    setFormData({});
  };

  const handleDeleteChannel = (id) => {
    if (window.confirm('정말로 이 채널을 삭제하시겠습니까?')) {
      const updatedChannels = channels.filter(channel => channel.id !== id);
      setChannels(updatedChannels);
      saveToLocalStorage('adminChannels', updatedChannels);
    }
  };

  const handleAddCategory = (type) => {
    const categoryName = prompt(`새 카테고리 이름을 입력하세요:`);
    if (categoryName && categoryName.trim()) {
      if (type === 'site') {
        const updatedCategories = [...siteCategories, categoryName.trim()];
        setSiteCategories(updatedCategories);
        saveToLocalStorage('adminSiteCategories', updatedCategories);
      } else {
        const updatedCategories = [...ytCategories, categoryName.trim()];
        setYtCategories(updatedCategories);
        saveToLocalStorage('adminYtCategories', updatedCategories);
      }
    }
  };

  const handleDeleteCategory = (categoryName, type) => {
    if (window.confirm(`정말로 "${categoryName}" 카테고리를 삭제하시겠습니까?`)) {
      if (type === 'site') {
        const updatedCategories = siteCategories.filter(cat => cat !== categoryName);
        setSiteCategories(updatedCategories);
        saveToLocalStorage('adminSiteCategories', updatedCategories);
      } else {
        const updatedCategories = ytCategories.filter(cat => cat !== categoryName);
        setYtCategories(updatedCategories);
        saveToLocalStorage('adminYtCategories', updatedCategories);
      }
    }
  };

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    channel.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSiteForm = () => (
    <div className="admin-form">
      <h3>{editingItem ? '사이트 수정' : '새 사이트 추가'}</h3>
      <div className="form-group">
        <label>이름:</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="사이트 이름"
        />
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input
          type="url"
          value={formData.url || ''}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://example.com"
        />
      </div>
      <div className="form-group">
        <label>설명:</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="사이트 설명"
        />
      </div>
      <div className="form-group">
        <label>카테고리:</label>
        <select
          value={formData.category || ''}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="">카테고리 선택</option>
          {siteCategories.filter(cat => cat !== '전체').map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>태그 (쉼표로 구분):</label>
        <input
          type="text"
          value={formData.tags || ''}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          placeholder="태그1, 태그2, 태그3"
        />
      </div>
      <div className="form-group">
        <label>팁:</label>
        <textarea
          value={formData.tips || ''}
          onChange={(e) => setFormData({...formData, tips: e.target.value})}
          placeholder="사용 팁"
        />
      </div>
      <div className="form-group">
        <label>난이도:</label>
        <select
          value={formData.difficulty || '보통'}
          onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
        >
          <option value="쉬움">쉬움</option>
          <option value="보통">보통</option>
          <option value="어려움">어려움</option>
        </select>
      </div>
      <div className="form-actions">
        <button onClick={editingItem ? handleUpdateSite : handleAddSite} className="btn-primary">
          {editingItem ? '수정' : '추가'}
        </button>
        <button onClick={() => {
          setShowAddForm(false);
          setEditingItem(null);
          setFormData({});
        }} className="btn-secondary">
          취소
        </button>
      </div>
    </div>
  );

  const renderChannelForm = () => (
    <div className="admin-form">
      <h3>{editingItem ? '채널 수정' : '새 채널 추가'}</h3>
      <div className="form-group">
        <label>이름:</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="채널 이름"
        />
      </div>
      <div className="form-group">
        <label>URL:</label>
        <input
          type="url"
          value={formData.url || ''}
          onChange={(e) => setFormData({...formData, url: e.target.value})}
          placeholder="https://youtube.com/..."
        />
      </div>
      <div className="form-group">
        <label>설명:</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="채널 설명"
        />
      </div>
      <div className="form-group">
        <label>카테고리:</label>
        <select
          value={formData.category || ''}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="">카테고리 선택</option>
          {ytCategories.filter(cat => cat !== '전체').map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>구독자 수:</label>
        <input
          type="text"
          value={formData.subscribers || ''}
          onChange={(e) => setFormData({...formData, subscribers: e.target.value})}
          placeholder="예: 10만명"
        />
      </div>
      <div className="form-group">
        <label>태그 (쉼표로 구분):</label>
        <input
          type="text"
          value={formData.tags || ''}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          placeholder="태그1, 태그2, 태그3"
        />
      </div>
      <div className="form-group">
        <label>팁:</label>
        <textarea
          value={formData.tips || ''}
          onChange={(e) => setFormData({...formData, tips: e.target.value})}
          placeholder="시청 팁"
        />
      </div>
      <div className="form-group">
        <label>난이도:</label>
        <select
          value={formData.difficulty || '보통'}
          onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
        >
          <option value="쉬움">쉬움</option>
          <option value="보통">보통</option>
          <option value="어려움">어려움</option>
        </select>
      </div>
      <div className="form-actions">
        <button onClick={editingItem ? handleUpdateChannel : handleAddChannel} className="btn-primary">
          {editingItem ? '수정' : '추가'}
        </button>
        <button onClick={() => {
          setShowAddForm(false);
          setEditingItem(null);
          setFormData({});
        }} className="btn-secondary">
          취소
        </button>
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>관리자 패널</h2>
        <button onClick={onClose} className="btn-close">×</button>
      </div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'sites' ? 'tab-active' : ''}
          onClick={() => setActiveTab('sites')}
        >
          사이트 관리
        </button>
        <button 
          className={activeTab === 'channels' ? 'tab-active' : ''}
          onClick={() => setActiveTab('channels')}
        >
          유튜브 관리
        </button>
        <button 
          className={activeTab === 'categories' ? 'tab-active' : ''}
          onClick={() => setActiveTab('categories')}
        >
          카테고리 관리
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'sites' && (
          <div>
            <div className="admin-controls">
              <input
                type="text"
                placeholder="사이트 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button 
                onClick={() => setShowAddForm(true)} 
                className="btn-primary"
              >
                새 사이트 추가
              </button>
            </div>

            {(showAddForm || editingItem) && renderSiteForm()}

            <div className="admin-list">
              <h3>사이트 목록 ({filteredSites.length}개)</h3>
              {filteredSites.map(site => (
                <div key={site.id} className="admin-item">
                  <div className="item-info">
                    <h4>{site.name}</h4>
                    <p>{site.description}</p>
                    <span className="item-category">{site.category}</span>
                    <span className="item-difficulty">{site.difficulty}</span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditSite(site)} className="btn-edit">
                      수정
                    </button>
                    <button onClick={() => handleDeleteSite(site.id)} className="btn-delete">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div>
            <div className="admin-controls">
              <input
                type="text"
                placeholder="채널 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button 
                onClick={() => setShowAddForm(true)} 
                className="btn-primary"
              >
                새 채널 추가
              </button>
            </div>

            {(showAddForm || editingItem) && renderChannelForm()}

            <div className="admin-list">
              <h3>채널 목록 ({filteredChannels.length}개)</h3>
              {filteredChannels.map(channel => (
                <div key={channel.id} className="admin-item">
                  <div className="item-info">
                    <h4>{channel.name}</h4>
                    <p>{channel.description}</p>
                    <span className="item-category">{channel.category}</span>
                    <span className="item-subscribers">{channel.subscribers}</span>
                    <span className="item-difficulty">{channel.difficulty}</span>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEditChannel(channel)} className="btn-edit">
                      수정
                    </button>
                    <button onClick={() => handleDeleteChannel(channel.id)} className="btn-delete">
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <div className="category-section">
              <h3>사이트 카테고리</h3>
              <button 
                onClick={() => handleAddCategory('site')} 
                className="btn-primary"
              >
                새 카테고리 추가
              </button>
              <div className="category-list">
                {siteCategories.filter(cat => cat !== '전체').map(category => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    <button 
                      onClick={() => handleDeleteCategory(category, 'site')} 
                      className="btn-delete-small"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="category-section">
              <h3>유튜브 카테고리</h3>
              <button 
                onClick={() => handleAddCategory('youtube')} 
                className="btn-primary"
              >
                새 카테고리 추가
              </button>
              <div className="category-list">
                {ytCategories.filter(cat => cat !== '전체').map(category => (
                  <div key={category} className="category-item">
                    <span>{category}</span>
                    <button 
                      onClick={() => handleDeleteCategory(category, 'youtube')} 
                      className="btn-delete-small"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;