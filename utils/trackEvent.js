export default async function trackEvent({ name, props }) {
  const endpoint = "/api/track";
  const { pathname, host } = window.location;
  if (name) {
    await fetch(endpoint, {
      body: JSON.stringify({
        name,
        props: { ...props, pathname, host },
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  }
}
