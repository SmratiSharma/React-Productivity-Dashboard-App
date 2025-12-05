import React from "react";
import "../styles/Input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
};

export default function Input({ label, helperText, id, ...rest }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input id={inputId} className="input-control" {...rest} />
      {helperText && <p className="input-helper">{helperText}</p>}
    </div>
  );
}
