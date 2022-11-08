import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        `w-10 h-10 overflow-hidden relative rounded-full border-gray-300 bg-white ${
          large ? "w-20 h-20" : ""
        }`
      )}
    >
      <Image
        src={`https://avatars.dicebear.com/api/human/${
          seed || session?.user?.name || "jack"
        }.svg`}
        className="z-0"
        alt="user"
        fill
      />
    </div>
  );
}

export default Avatar;
