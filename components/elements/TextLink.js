import Link from "next/link";
import trackEvent from "../../utils/trackEvent";

export default function TextLink({
  href,
  external = false,
  eventData,
  children,
  onClick,
  ...props
}) {
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
    <Link href={href} prefetch={false}>
      <a className={styles}>{children}</a>
    </Link>
  );
}
