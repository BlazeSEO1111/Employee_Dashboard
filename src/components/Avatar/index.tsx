"use client";

import { DashBoardIcon } from "@/assets/images";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";

import Image from "next/image";
import { FC, useContext } from "react";

interface Props {
  isShowRole?: boolean;
}

const Avatar: FC<Props> = ({ isShowRole = false }) => {
  const { accountExtendDetail } = useContext(AuthContext);
  return (
    <div className='flex '>
      <div className=' w-full flex gap-2 '>
        <div>
          <Image
            src={DashBoardIcon}
            width={40}
            height={40}
            alt='home-bg'
          />
        </div>
        <div>
          <p className="uppercase text-[13px] font-extrabold text-[#02c39a]">Publisher</p>
          <p className="uppercase text-[11px] font-extrabold text-[#02c39a]">Dashboard</p>
        </div>

      </div>
    </div>

  );
};

export default Avatar;
