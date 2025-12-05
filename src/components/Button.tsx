import React from "react";
import "../styles/Button.css";

type ButtonVariant = "primary" | "outline" | "danger";

type PolymorphicProps<T extends React.ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as">;

export default function Button<T extends React.ElementType = "button">({
  as,
  children,
  variant = "primary",
  loading = false,
  disabled,
  ...rest
}: PolymorphicProps<T>) {
  const Component = (as || "button") as React.ElementType;
  const className = ["button", `button-${variant}`].filter(Boolean).join(" ");

  const isNativeButton = Component === "button";

  const sharedProps = {
    className,
    ...(isNativeButton ? { disabled: disabled || loading } : {}),
    ...rest,
  } as React.ComponentPropsWithoutRef<T>;

  return (
    <Component {...sharedProps}>
      {loading && <span className="spinner" aria-label="loading" />}
      {children}
    </Component>
  );
}
