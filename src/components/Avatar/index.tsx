"use client";
import { AvatarIcon, DollarIcon } from "@/assets/icon";
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
    <a href='/client/profile' className='cursor-pointer flex flex-col ml-4 w-full justify-center'>
      <div className='flex '>
        <div className='flex  w-full   gap-2 '>
          <div className='flex border border-red-500 size-11 items-center justify-center bg-white rounded-full  '>
            <Image src={AvatarIcon} className=' size-7' alt='avatar'></Image>
          </div>

          <div className='flex flex-col justify-center items-start  ml-1  '>
            <div className='flex'>
              <span className=' font-workSansSemiBold'>{accountExtendDetail?.full_name}</span>
            </div>
            {!isShowRole ? (
              <div className='flex text-sm  font-workSansSemiBold  -ml-2  gap-x-2 px-2 h-5 bg-[#FFF1CC] justify-around items-center rounded-2xl'>
                <Image src={DollarIcon} className=' size-4' alt='avatar'></Image>
                <span> {convertNumbThousand(accountExtendDetail?.amount)}</span>
                <span>-</span>
                <span className=' text-red-500'>0%</span>
              </div>
            ) : (
              <div className='flex text-sm  font-workSansSemiBold   items-center justify-center'>
                <span className=' text-red-500'>{accountExtendDetail?.role_key === 0 ? "Admin" : "Member "}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <a
      href="/"
      className=" font-workSansBold mb-2 text-3xl text-center"
    >
      BM2FA.COM{" "}
    </a> */}
    </a>
  );
};

export default Avatar;
