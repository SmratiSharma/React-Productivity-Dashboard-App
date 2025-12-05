/*
Text (Polymorphic Component)
	• Supports as prop (e.g., "p", "h1", "a")
    Should allow basic styling props (underline, muted, etc.)

*/


import { Component } from "react";

type TextProps<T extends React.ElementType> = {
    as? : T; //because the default value of as will be <p>
    children : React.ReactNode;
    underlined? : boolean;
    muted? : boolean;
    bold? : boolean;
    italic? : boolean;
} & React.ComponentPropsWithoutRef<T>;

export default function Text<T extends React.ElementType = "p" > ({as, children, underline, muted, bold, italic, ...rest} : TextProps<T>) 
{
    const component = as || "p";
    const styles = [
        "text",
        underline && "text-underline",
        muted && "text-muted",
        bold && "text-bold",
        italic && "text-italic"
    ]
    .filter(Boolean)
    .join(" ");

    //this is an array which stores the styles of the component be it "a", "h1", "p" which checks which props are sent to be added as style of the component abd then fillters this array and then joins with " "

    return (
        <Component className={styles} {...rest}>
            {children}
        </Component>
    );
}