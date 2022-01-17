import React from "react";

export interface Props {
  key?: string;
  name: string;
  isPressed: boolean;
  setFilter: React.Dispatch<string>;
}

function FilterButton(props: Props) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  );
}



export default FilterButton;