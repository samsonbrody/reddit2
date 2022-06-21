import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import PostBox from "../components/PostBox";
import { supabase } from "../utils/supabaseClient";

const Home: NextPage = (props) => {
  return (
    <div className="max-w-5xl my-7 mx-auto">
      <Head>
        <title>Reddit Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Post Box  */}
      <PostBox />
      <div className="flex">{/* Feed */}</div>
    </div>
  );
};

export default Home;
