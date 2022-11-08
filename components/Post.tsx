import React, { useEffect, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import TimeAgo from "react-timeago";
import Link from "next/link";
import { Jelly } from "@uiball/loaders";

import Avatar from "./Avatar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_VOTES_BY_POST_ID } from "../graphql/queries";
import { ADD_VOTE } from "../graphql/mutations";

type Props = {
  post: Post;
};

function Post({ post }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const { data, loading } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  });

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, "getVoteUsingPostId"],
  });

  const [vote, setVote] = useState<boolean>();

  useEffect(() => {
    const votes: Vote[] = data?.getVoteUsingPostId;

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name
    )?.upvote;

    setVote(vote);
  }, [data, session?.user?.name]);

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      return toast("You'll need to login to vote");
    }

    if (vote && isUpvote) return;
    if (vote === false && !isUpvote) return;

    console.log("Voting...", isUpvote);

    await addVote({
      variables: {
        post_id: post?.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    });
  };

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVoteUsingPostId;
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0
    );

    if (votes?.length === 0) return 0;

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1;
    }

    return displayNumber;
  };

  if (!post)
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#ff4501" />
      </div>
    );

  return (
    <Link href={`/post/${post.id}`}>
      <div className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUpIcon
            onClick={() => {
              // e.stopPropagation();
              upVote(true);
            }}
            className={`voteButtons hover:text-red-400 ${
              vote ? "text-red-400" : ""
            }`}
          />
          <p className="text-xs font-bold text-black">{displayVotes(data)}</p>
          <ArrowDownIcon
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false ? "text-blue-400" : ""
            }`}
          />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <div className="flex items-center space-x-2">
            <Avatar seed={post.subreddit?.topic} />
            <p className="text-xs text-gray-400">
              <span
                onClick={() =>
                  router.push(`/subreddit/${post.subreddit?.topic}`)
                }
                className="font-bold text-black hover:text-blue-400 hover:underline"
              >
                r/{post.subreddit?.topic}
              </span>{" "}
              . Posted by u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </div>

          {/* body */}
          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          {/* Image */}
          {post.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt={post.title} className="w-full" />
          )}

          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className="postButtons">
              <ChatBubbleLeftIcon className="h-6 w-6 " />
              <p>{post.commentList?.length ?? ""} Comments</p>
            </div>
            <div className="postButtons">
              <GiftIcon className="h-6 w-6 " />
              <p className="hidden sm:inline"> Award</p>
            </div>
            <div className="postButtons">
              <ShareIcon className="h-6 w-6 " />
              <p className="hidden sm:inline"> Share</p>
            </div>
            <div className="postButtons">
              <BookmarkIcon className="h-6 w-6 " />
              <p className="hidden sm:inline"> Save</p>
            </div>
            <div className="postButtons">
              <EllipsisHorizontalIcon className="h-6 w-6 " />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
