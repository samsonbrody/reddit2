import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { PhotographIcon, LinkIcon } from "@heroicons/react/solid";
import { useForm, useFormState } from "react-hook-form";
import { useMutation } from "@apollo/client";
import client from "../apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import { ADD_SUBREDDIT, ADD_POST } from "../graphql/mutations";
import toast from "react-hot-toast";
type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("creating a new post");

    try {
      // query for subreddit topic

      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });
      console.log(getSubredditListByTopic);

      const subredditExists = getSubredditListByTopic.length > 0;
      if (!subredditExists) {
        // create subreddit
        console.log("subreddit is new -> creating a newsubreddit!");

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });

        console.log("creating post", formData);
        const image = formData.postImage || "";
        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
        console.log(newPost);
      } else {
        // use existing subreddit
        console.log("subreddit exists already, using existing subreddit");

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });
      }
      // after post has been added
      setValue("postBody", "");
      setValue("postImage", "");
      setValue("postTitle", "");
      setValue("subreddit", "");
      toast.success("posted!", {
        id: notification,
      });
    } catch (error) {
      toast.error("oops! something went wrong", { id: notification });
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          type="text"
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          placeholder={session ? "Create a post" : "Sign in to post"}
        />

        <PhotographIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 ${
            imageBoxOpen && "text-blue-300"
          } cursor-pointer`}
        />
        <LinkIcon className="h-6 text-gray-300 hover:text-gray-600 cursor-pointer" />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex bg-blue-50 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex bg-blue-50 p-2 outline-none"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="ie 'cars'"
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex bg-blue-50 p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>A Post Title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
