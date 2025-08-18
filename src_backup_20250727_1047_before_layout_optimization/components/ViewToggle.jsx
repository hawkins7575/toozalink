import React from "react";
import PropTypes from "prop-types";

const ViewToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="view-toggle">
      <span className="view-toggle-label">보기 모드:</span>
      <div className="view-toggle-buttons">
        <button
          className={`view-toggle-btn ${viewMode === "compact" ? "active" : ""}`}
          onClick={() => onViewModeChange("compact")}
          title="컴팩트 뷰"
        >
          ▦
        </button>
        <button
          className={`view-toggle-btn ${viewMode === "detailed" ? "active" : ""}`}
          onClick={() => onViewModeChange("detailed")}
          title="상세 뷰"
        >
          ▦▦
        </button>
      </div>
    </div>
  );
};

ViewToggle.propTypes = {
  viewMode: PropTypes.oneOf(["compact", "detailed"]).isRequired,
  onViewModeChange: PropTypes.func.isRequired,
};

export default ViewToggle;