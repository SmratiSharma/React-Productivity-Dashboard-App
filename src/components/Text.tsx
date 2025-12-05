import React from "react";

type TextProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
  underline?: boolean;
  muted?: boolean;
  bold?: boolean;
  italic?: boolean;
} & React.ComponentPropsWithoutRef<T>;

export default function Text<T extends React.ElementType = "p">({
  as,
  children,
  underline,
  muted,
  bold,
  italic,
  ...rest
}: TextProps<T>) {
  const Component = as || "p";

  const styles = [
    "text",
    underline && "text-underline",
    muted && "text-muted",
    bold && "text-bold",
    italic && "text-italic",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={styles} {...rest}>
      {children}
    </Component>
  );
}
