import React from "react";
import "../styles/Card.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

type CardComponent = React.FC<CardProps> & {
  Header: React.FC<CardProps>;
  Body: React.FC<CardProps>;
  Footer: React.FC<CardProps>;
};

const Card: CardComponent = ({ children, className }: CardProps) => {
  return (
    <div className={["card", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

Card.Header = function Header({ children, className }: CardProps) {
  return (
    <div className={["header", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

Card.Body = function Body({ children, className }: CardProps) {
  return (
    <div className={["body", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

Card.Footer = function Footer({ children, className }: CardProps) {
  return (
    <div className={["footer", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
};

export default Card;
