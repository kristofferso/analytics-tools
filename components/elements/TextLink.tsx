"use client";

import Link from "next/link";
import trackEvent from "../../utils/trackEvent";

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  eventData?: {
    name: string;
    props?: Record<string, any>;
  };
  onClick?: () => void;
  children: React.ReactNode;
}

export default function TextLink({
  href,
  external = false,
  eventData,
  children,
  onClick,
  ...props
}: TextLinkProps) {
  const styles = "link link-primary";
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        className={styles}
        rel="noreferrer"
        onClick={(e) => {
          if (eventData) {
            trackEvent(eventData);
          }
          if (onClick) onClick();
        }}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} prefetch={false} className={styles}>
      {children}
    </Link>
  );
}

