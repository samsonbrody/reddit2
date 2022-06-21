import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  seed?: string;
  large?: boolean;
};

function Avatar({ seed, large }: Props) {
  const { data: session } = useSession();
  return (
    <div
      className={`overflow-hidden relative h-10 w-10 rounded-full bg-white ${
        large && "h-20 w-20"
      }`}
    >
      <Image
        layout="fill"
        src={`https://avatars.dicebear.com/api/open-peeps/${
          session?.user?.name || "placeholder"
        }.svg`}
        alt=""
      />
    </div>
  );
}

export default Avatar;
