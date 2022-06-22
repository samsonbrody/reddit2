import React from "react";

export type PostProps = {
  id: number;
  title: string;
  subreddit_id: number;
  created_at: Date;
  image: string;
  username: string;
  body: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.username ? post.username : "Unknown author";
  return (
    <div className="w-full h-36 bg-blue-400">
      <h2>{post.title}</h2>
      <h5>By {post.username}</h5>
      <img className="max-w-lg object-fit" src={post.image} alt={post.title} />
    </div>
  );
};

export default Post;
