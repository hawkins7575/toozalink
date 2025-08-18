import React, { useState } from "react";
import PropTypes from "prop-types";
import { categories, youtubeCategories } from "../data";

const AddSite = ({ isOpen, onClose, onSubmit, type = "site" }) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category: type === "site" ? categories[1] : youtubeCategories[1], // 첫 번째 실제 카테고리
    tags: "",
    tips: "",
    difficulty: "쉬움"
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 에러 클리어
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "사이트/채널명을 입력해주세요";
    }
    
    if (!formData.url.trim()) {
      newErrors.url = "URL을 입력해주세요";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = "올바른 URL 형식을 입력해주세요 (예: https://example.com)";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }
    
    if (!formData.category || formData.category === "전체") {
      newErrors.category = "카테고리를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // URL이 http/https로 시작하지 않으면 https 추가
    let finalUrl = formData.url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    const submissionData = {
      ...formData,
      url: finalUrl,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      difficulty: formData.difficulty || "쉬움",
      tips: formData.tips || "사용자 추천 사이트입니다.",
      submittedBy: "user",
      submittedAt: new Date().toISOString()
    };

    onSubmit(submissionData);
    
    // 폼 리셋
    setFormData({
      name: "",
      url: "",
      description: "",
      category: type === "site" ? categories[1] : youtubeCategories[1],
      tags: "",
      tips: "",
      difficulty: "쉬움"
    });
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      name: "",
      url: "",
      description: "",
      category: type === "site" ? categories[1] : youtubeCategories[1],
      tags: "",
      tips: "",
      difficulty: "쉬움"
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const availableCategories = type === "site" ? categories : youtubeCategories;
  const typeLabel = type === "site" ? "사이트" : "유튜브 채널";

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>새로운 {typeLabel} 추가</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <form className="add-site-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">{typeLabel} 이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={`${typeLabel} 이름을 입력하세요`}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="url">URL *</label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className={errors.url ? "error" : ""}
            />
            {errors.url && <span className="error-message">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={`${typeLabel}에 대한 간단한 설명을 입력하세요`}
              rows="3"
              className={errors.description ? "error" : ""}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? "error" : ""}
            >
              <option value="">카테고리를 선택하세요</option>
              {availableCategories.filter(cat => cat !== "전체").map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">태그 (선택사항)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="쉼표로 구분하여 입력 (예: 무료, 초보용, 한국)"
            />
            <small className="form-help">태그는 쉼표(,)로 구분하여 입력하세요</small>
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">난이도</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option value="쉬움">쉬움</option>
              <option value="보통">보통</option>
              <option value="어려움">어려움</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="tips">사용 팁 (선택사항)</label>
            <textarea
              id="tips"
              name="tips"
              value={formData.tips}
              onChange={handleInputChange}
              placeholder={`${typeLabel} 사용 시 도움이 되는 팁을 입력하세요`}
              rows="2"
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleClose} className="btn-cancel">
              취소
            </button>
            <button type="submit" className="btn-submit">
              {typeLabel} 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddSite.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["site", "youtube"]).isRequired
};

export default AddSite;