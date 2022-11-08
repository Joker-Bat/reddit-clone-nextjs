import Image from "next/image";
import React from "react";

import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  Bars4Icon,
} from "@heroicons/react/24/solid";
import {
  BellIcon,
  ChatBubbleOvalLeftIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 flex bg-white px-4 py-2 shadow-sm items-center z-50">
      <div className="relative w-20 h-10 flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo.png"
            alt="Logo"
            fill
          />
        </Link>
      </div>

      <div className="flex mx-7 items-center xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search box */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent outline-none"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden></button>
      </form>

      <div className="mx-5 items-center space-x-2 text-gray-500 hidden lg:flex">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerWaveIcon className="icon" />
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <Bars4Icon className="icon" />
      </div>

      {/* Sign in or out button */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 border p-2 border-gray-100 cursor-pointer"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZQJ5D9-9GD74bYFs0awRvW57AQz3hQahQg&usqp=CAU"
              alt="Brand"
              fill
            />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name ?? ""}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border p-2 border-gray-100 cursor-pointer"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZQJ5D9-9GD74bYFs0awRvW57AQz3hQahQg&usqp=CAU"
              alt="Brand"
              fill
            />
          </div>

          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
};

export default Header;
