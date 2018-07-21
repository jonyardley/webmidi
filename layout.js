import Link from "next/link";
import Head from "next/head";

export default ({ children, title = "WebMidi Talk" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>
    {children}
  </div>
);
