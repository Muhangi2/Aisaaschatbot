import { onGetBlogPost } from "@/actions/landing";
import { CardDescription } from "@/components/ui/card";
import { getMonthName } from "@/lib/utils";
import parse from "html-react-parser";
import React from "react";

type Props = { params: { id: string | number } };

const PostPage = async ({ params }: Props) => {
  console.log(params?.id, "params.id value");
  console.log(typeof params?.id, "params.id type");

  try {
    const id = params?.id ?? "";
    const post = await onGetBlogPost(String(id));

    if (!post) {
      console.error("Post not found!");
      return (
        <div className="container flex justify-center my-10">
          Post not found!
        </div>
      );
    }

    console.log(post?.content, "post.content");

    return (
      <div className="container flex justify-center my-10">
        <div className="lg:w-6/12 flex flex-col">
          <CardDescription>
            {getMonthName(new Date(post?.createdAt).getMonth())}{" "}
            {new Date(post?.createdAt).getDate()}{" "}
            {new Date(post?.createdAt).getFullYear()}
          </CardDescription>
          <h2 className="text-6xl font-bold">{post?.title}</h2>
          <div className="text-xl parsed-container flex flex-col mt-10 gap-10">
            {post?.content ? parse(post.content) : "No content to display"}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="container flex justify-center my-10">
        Error loading post!
      </div>
    );
  }
};

export default PostPage;
