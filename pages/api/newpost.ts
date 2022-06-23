import prisma from "../../utils/supabaseClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const redditUser = session?.user?.name;

  // check for session
  if (session) {
    // Signed in

    if (req.method === "POST") {
      console.log("post request body: ", req.body);
      const { postTitle, postBody, subreddit, postImage } = req.body;

      const srCheck = await prisma.subreddit.upsert({
        create: {
          topic: subreddit,
        },
        update: {
          topic: subreddit,
        },
        where: {
          topic: subreddit,
        },
      });

      const newPostSubredditName = srCheck.topic;
      const newPostSubredditId = srCheck.id;

      try {
        const result = await prisma.post.create({
          data: {
            title: postTitle,
            body: postBody,
            image: postImage,
            username: redditUser,
            subreddit_id: newPostSubredditId,
          },
        });
        // console.log(
        //   `successful insert into the ${newPostSubredditName} subreddit`
        // );
        res.json(result);
      } catch (e) {
        console.error(e);
      }
    } else {
      res.json({ msg: "only post requests allowed on this route" });
    }
  } else {
    console.error("not signed in");
    res.status(401);
  }
}
