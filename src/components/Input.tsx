import React, { forwardRef } from "react";
import "../styles/Input.css";

type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="input-container">
        {label && (
          <label className="input-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <input id={inputId} className="input-field" ref={ref} {...rest} />
      </div>
    );
  }
);

export default Input;
