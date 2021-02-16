import React, { useState } from "react";
import "../styles/Cell.css";

interface IProps {
  symbol: string;
  onClick: Function;
}

export const Cell: React.FC<IProps> = (props) => {
  return (
    <div className="cell" onClick={() => props.onClick()}>
      {props.symbol}
    </div>
  );
};
