import { ApolloProvider } from "@apollo/client";
import { AnilistClient } from "../http/AnilistClient";
import { DefaultComponent } from "../components/DefaultComponent";
import Head from "next/head";

export default function Home() {
  return (
    <ApolloProvider client={AnilistClient}>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <main className="flex flex-col items-center py-20 gap-10">
        <h1 className="font-bold text-4xl">Anilist</h1>
        <DefaultComponent />
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0 auto;
          width: 100%;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </ApolloProvider>
  );
}
