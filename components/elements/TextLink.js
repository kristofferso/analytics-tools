import Link from "next/link";

export default function TextLink({ href, external = false, children }) {
  const styles = "link link-primary";
  if (external) {
    return (
      <a href={href} target="_blank" className={styles} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <a className={styles}>{children}</a>
    </Link>
  );
}
