import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import ApplicationContext from "../src/Context/appContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
        <link
          rel="stylesheet"
          href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css"
          type="text/css"
        />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Unbounded:wght@500&display=swap" rel="stylesheet"/>
        <script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"></script>
        <script src="https://atlas.microsoft.com/sdk/javascript/service/2/atlas-service.min.js"></script>
      </Head>
      <ApplicationContext>
        <div className="w-full h-full">
          <Component {...pageProps} />
        </div>
      </ApplicationContext>
    </>
  );
}
