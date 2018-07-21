import Link from "next/link";
import Head from "next/head";

export default ({ children, title = "WebMidi Talk" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <script src="/static/processing.min.js" />
      <style>
        {`
        * {
          padding: 0;
          margin: 0;
        }`}
      </style>
    </Head>
    {children}
  </div>
);
