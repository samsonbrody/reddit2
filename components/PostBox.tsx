import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import { PhotographIcon, LinkIcon } from "@heroicons/react/solid";
import { useForm, useFormState } from "react-hook-form";
import axios from "axios";

import toast from "react-hot-toast";
type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  async function submitForm(values: FormData) {
    const notification = toast.loading("Creating new post...");
    let config = {
      method: "POST",
      url: "http://reddit2-theta.vercel.app/api/newpost",
      heeaders: {
        "Content-Type": "application/json",
      },
      data: values,
    };
    try {
      const response = await axios(config);
      console.log(response);

      // after the post has been added
      setValue("postBody", "");
      setValue("postTitle", "");
      setValue("postImage", "");
      setValue("subreddit", "");

      toast.success("post successfully created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Something went wrong on the backend", {
        id: notification,
      });
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="sticky top-20 z-50 bg-white border rounded-md border-gray-300 p-2"
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
              className="m-2 flex bg-blue-50 p-2 outline-none w-full"
              {...register("postBody")}
              type="text"
              placeholder="text (optional)"
            />
          </div>
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex bg-blue-50 p-2 outline-none w-full"
              {...register("subreddit", { required: true })}
              type="text"
              placeholder="ie cars or whatev"
            />
          </div>
          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex bg-blue-50 w-full p-2 outline-none"
                {...register("postImage")}
                type="text"
                placeholder="Paste in an image URL (strings are easier to save)"
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
