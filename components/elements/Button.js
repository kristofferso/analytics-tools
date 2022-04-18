import Link from "next/link";
import React from "react";
import trackEvent from "../../utils/trackEvent";

export default function Button({
  type = "primary",
  external,
  className,
  href,
  children,
  eventData,
  onClick,
  ...props
}) {
  const style = {
    primary: "btn-primary rounded-full",
    primarySquare: "btn-primary",
    primaryOutline: "btn-primary btn-outline rounded-full",
    secondaryGray: "btn-sm",
    secondaryOutline: "btn-sm btn-outline",
  };
  if (external) {
    return (
      <a
        className={`btn ${style[type]} ${className}`}
        href={href}
        onClick={(e) => {
          if (eventData) {
            trackEvent(eventData);
          }
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a
        className={`btn ${style[type]} ${className}`}
        onClick={(e) => {
          if (eventData) {
            trackEvent(eventData);
          }
          if (onClick) onClick(e);
        }}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
}
