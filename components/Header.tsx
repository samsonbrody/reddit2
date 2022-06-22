import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

function Header() {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 flex bg-white px-4 items-center py-2 shadow-sm z-50">
      <div className="relative h-10 w-20 mr-4 flex-shrink-0 cursor-pointer">
        <Image
          objectFit="contain"
          src="https://links.papareact.com/fqy"
          layout="fill"
        />
      </div>
      {/* <div className="sm:flex items-center mx-7 hidden xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div> */}
      {/* SEARCH */}
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button hidden type="submit" />
      </form>

      <div className="text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <ChatIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>
      <div className="ml-5 items-center lg:hidden">
        <MenuIcon className="icon" />
      </div>
      {/* sign in/sign out */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="h-5 w-5 relative flex-shrink-0">
            <Image layout="fill" src="https://links.papareact.com/23l" alt="" />
          </div>
          <div className="flex-1 text-xs">
            <p className="truncate">{`Hi, ${session?.user?.name}`}</p>
            <p className="text-gray-400 hover:text-gray-200">Sign Out</p>
          </div>
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 border border-gray-100 p-2 cursor-pointer"
        >
          <div className="h-5 w-5 relative flex-shrink-0">
            <Image layout="fill" src="https://links.papareact.com/23l" alt="" />
          </div>
          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
