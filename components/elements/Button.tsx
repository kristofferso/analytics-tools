"use client";

import Link from "next/link";
import React from "react";
import trackEvent from "../../utils/trackEvent";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  type?: "primary" | "primarySquare" | "primaryOutline" | "secondaryGray" | "secondaryOutline";
  external?: boolean;
  className?: string;
  href: string;
  children: React.ReactNode;
  eventData?: {
    name: string;
    props?: Record<string, any>;
  };
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function Button({
  type = "primary",
  external,
  className = "",
  href,
  children,
  eventData,
  onClick,
  ...props
}: ButtonProps) {
  const style: Record<string, string> = {
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
    <Link 
      href={href} 
      prefetch={false}
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
    </Link>
  );
}

