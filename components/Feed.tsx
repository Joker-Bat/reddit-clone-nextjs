import { useQuery } from "@apollo/client";
import { Jelly } from "@uiball/loaders";
import React from "react";
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from "../graphql/queries";
import Post from "./Post";

type Props = {
  topic?: string;
};

function Feed({ topic }: Props) {
  const { loading, data } = !topic
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery(GET_ALL_POSTS)
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      useQuery(GET_ALL_POSTS_BY_TOPIC, {
        variables: {
          topic,
        },
      });

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  return (
    <div className="mt-5 space-y-4 flex-1 flex flex-col">
      {loading ? (
        <div className="flex w-full items-center justify-center p-10 text-xl">
          <Jelly size={50} color="#ff4501" />
        </div>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />) ?? null
      )}
    </div>
  );
}

export default Feed;
