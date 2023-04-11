import React from "react";
import { ToolbarProps } from "react-big-calendar";

const CustomToolbar: React.FC<ToolbarProps> = (props) => {
  const { onNavigate, label } = props;

  return (
    <div className="rbc-toolbar">
      <button type="button" onClick={() => onNavigate("PREV")}>
        이전
      </button>
      <span className="rbc-toolbar-label">{label}</span>
      <button type="button" onClick={() => onNavigate("NEXT")}>
        다음
      </button>
    </div>
  );
};

export default CustomToolbar;
