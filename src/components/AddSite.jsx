import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { getCategories, getYoutubeCategories } from "../data";

const AddSite = React.memo(({ isOpen, onClose, onSubmit, type = "site" }) => {
  const [categories, setCategories] = useState([]);
  const [youtubeCategories, setYoutubeCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    category: "",
    tags: "",
    tips: "",
    difficulty: "쉬움"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 카테고리 데이터 로드
  useEffect(() => {
    const loadCategories = () => {
      const siteCategories = getCategories();
      const ytCategories = getYoutubeCategories();
      setCategories(siteCategories);
      setYoutubeCategories(ytCategories);
      
      // 첫 번째 실제 카테고리를 기본값으로 설정
      const defaultCategory = type === "site" 
        ? (siteCategories.find(cat => cat !== '전체') || siteCategories[0])
        : (ytCategories.find(cat => cat !== '전체') || ytCategories[0]);
      
      setFormData(prev => ({
        ...prev,
        category: defaultCategory || ""
      }));
    };

    if (isOpen) {
      loadCategories();
      
      // 카테고리 업데이트 이벤트 감지
      const handleCategoryUpdate = () => {
        loadCategories();
      };
      
      window.addEventListener('categoryUpdate', handleCategoryUpdate);
      
      return () => {
        window.removeEventListener('categoryUpdate', handleCategoryUpdate);
      };
    }
  }, [isOpen, type]);

  const handleInputChange = useCallback((e) => {
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
  }, [errors]);

  const validateForm = useCallback(() => {
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
  }, [formData]);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
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

      await onSubmit(submissionData);
      
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
    } catch (error) {
      console.error('Failed to add item:', error);
      setErrors({ submit: '추가 중 오류가 발생했습니다. 다시 시도해주세요.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit, type]);

  const handleClose = useCallback(() => {
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
  }, [type, onClose]);

  if (!isOpen) return null;

  const availableCategories = type === "site" ? categories : youtubeCategories;
  const typeLabel = type === "site" ? "사이트" : "유튜브 채널";

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2 id="modal-title">새로운 {typeLabel} 추가</h2>
          <button 
            className="close-btn" 
            onClick={handleClose}
            aria-label="모달 닫기"
            type="button"
          >
            ×
          </button>
        </header>
        
        <form className="add-site-form" onSubmit={handleSubmit} noValidate>
          {errors.submit && (
            <div className="error-message" role="alert" aria-live="polite">
              {errors.submit}
            </div>
          )}
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
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
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
              aria-invalid={!!errors.url}
              aria-describedby={errors.url ? 'url-error' : undefined}
            />
            {errors.url && <span id="url-error" className="error-message" role="alert">{errors.url}</span>}
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
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && <span id="description-error" className="error-message" role="alert">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">카테고리 *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={errors.category ? "error" : ""}
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'category-error' : undefined}
            >
              <option value="">카테고리를 선택하세요</option>
              {availableCategories.filter(cat => cat !== "전체").map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <span id="category-error" className="error-message" role="alert">{errors.category}</span>}
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
            <button 
              type="button" 
              onClick={handleClose} 
              className="btn-cancel"
              disabled={isSubmitting}
            >
              취소
            </button>
            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
              aria-describedby="submit-help"
            >
              {isSubmitting ? '추가 중...' : `${typeLabel} 추가`}
            </button>
            <div id="submit-help" className="sr-only">
              필수 항목을 모두 입력한 후 추가 버튼을 클릭하세요.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

AddSite.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["site", "youtube"]).isRequired,
};

AddSite.displayName = 'AddSite';

export default AddSite;