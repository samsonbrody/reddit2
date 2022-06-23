import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import PostBox from "../components/PostBox";
import prisma from "../utils/supabaseClient";
import Post, { PostProps } from "../components/Post";

type Props = {
  feed: PostProps[];
};

const Home = (props: Props) => {
  const newPosts = props.feed;
  console.log(newPosts);
  return (
    <div className="mx-4 sm:mx-2">
      <div className="max-w-4xl my-7 mx-auto">
        <Head>
          <title>Reddit Clone</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Post Box  */}
        <PostBox />
        <div className="flex flex-col">
          {[...newPosts]?.reverse().map((np) => {
            return (
              <div
                className="w-full my-6 flex-col overflow-hidden border rounded-2xl bg-gray-100 flex"
                key={np.id}
              >
                <p className="mb-2 mt-6 text-xl font-semibold  w-full flex items-center justify-center">
                  {np.title}
                </p>
                <p className="my-2 w-full flex items-center justify-center">
                  Posted by:{" "}
                  <span className="cursor-pointer ml-2 underline underline-offset-2">
                    {np.username}
                  </span>
                </p>
                <p className="my-4 px-6 w-full flex text-sm items-center justify-center">
                  {np.body}
                </p>
                <img
                  src={np.image}
                  alt=""
                  className="max-w-7xl object-center"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/feed");
  const feed = await res.json();
  console.log(feed);
  return { props: { feed } };
};

export default Home;
