"use client";
import { paymentApi } from "@/api-client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import CopyModal from "@/components/Modal/CopyModal";
import { AuthContext } from "@/context/useAuthContext";
import convertNumbThousand from "@/utils/convertNumbThousand";
import { ClipboardIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface ItemType {
  key: string;
  created_at: string;
  total_amount_after: number;
  total_amount_before: number;
  amount: number;
  friend: string;
  content: string;
}
const Rechange: NextPage<any> = () => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [title, setTitle] = useState("");
  const { authState, accountExtendDetail, getAccountExtendDetails } = useContext(AuthContext);

  const handleCopy = (title: string) => {
    setIsOpenInfo(true);
    setTitle(title);
  };

  const { isPending, error, data } = useQuery<ItemType[]>({
    queryKey: ["getPaymentHistory", authState?.access_token],
    queryFn: async () => await paymentApi.paymentHistory(authState?.access_token ?? ""),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      getData(intervalId);
    }, 5000);
    getData(intervalId);
    return () => clearInterval(intervalId);
  }, [authState?.access_token]);

  const getData = async (clearId?: any) => {
    try {
      getAccountExtendDetails();
    } catch (error) {
      toast.error("Error when payment, please try again!");
    }
  };

  return (
    <AppLayout>
      <div className='w-full flex flex-col'>
        <div className='p-6'>
          <Header />
          <div className='h-[1px] bg-black bg-opacity-20 my-4 max-lg:hidden' />
        </div>
        <div className='w-full flex flex-col mb-10 items-center gap-y-6'>
          <div className='mt-4  w-[95%]  flex flex-wrap justify-between '>
            <div className='w-[30%] py-10 bg-white flex flex-col items-center    border shadow-md rounded-md '>
              <p className=' font-workSansSemiBold text-2xl text-primary-500'>
                {convertNumbThousand(accountExtendDetail?.total_amount)}
              </p>
              <p className='   text-sm font-workSansSemiBold  text-center mt-1'>Tổng Tiền Nạp</p>
            </div>
            <div className='w-[30%] py-10 bg-white flex flex-col items-center    border shadow-md rounded-md '>
              {accountExtendDetail?.total_amount && accountExtendDetail?.amount && (
                <p className=' font-workSansSemiBold text-2xl text-green-600'>
                  {convertNumbThousand(accountExtendDetail?.total_amount - accountExtendDetail?.amount)}
                </p>
              )}

              <p className='  text-sm font-workSansSemiBold  text-center mt-1'>Đã Sử Dụng</p>
            </div>
            <div className='w-[30%] py-10 flex bg-white flex-col items-center    border shadow-md rounded-md '>
              <p className=' font-workSansSemiBold text-2xl text-blue-500'>
                {convertNumbThousand(accountExtendDetail?.amount)}
              </p>
              <p className='text-sm font-workSansSemiBold text-center mt-1'>Còn Lại</p>
            </div>
          </div>
          <div className='w-[95%] justify-center flex flex-col  gap-y-8  bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4   py-5 flex gap-x-4'>
              <span className=' font-workSansBold text-white  bg-blue-500 rounded-md p-2 '>Chuyển khoản ngân hàng</span>

              <span className=' font-workSansSemiBold     rounded-md p-2 '>
                <p>USDT</p>
              </span>
            </div>

            <div className=' flex md:flex-col sm:flex-col flex-col lg:flex-row  pb-10  mx-6'>
              <div className=' w-full lg:w-1/2 flex flex-col gap-y-3'>
                <div className=' font-workSansSemiBold text-xl mb-4 '>Cách 1: Chuyển khoản ngân hàng</div>
                <div className='flex justify-between  text-sm bg-slate-100 rounded-md p-3 '>
                  <p className=' w-2/5 font-workSansMedium '>Ngân hàng</p>
                  <p className='w-2/5 font-workSansMedium '>TechcomBank</p>
                  <button
                    onClick={() => handleCopy("ngân hàng")}
                    className='w-1/5  font-workSansMedium flex flex-row  justify-around  items-center bg-blue-500 text-white rounded-md px-3 py-1 '
                  >
                    <ClipboardIcon className='h-4 w-4' /> Copy
                  </button>
                </div>
                <div className='flex  justify-between  text-sm bg-slate-100 rounded-md p-3 '>
                  <p className='w-2/5 font-workSansMedium '>Số tài khoản</p>
                  <p className='w-2/5 font-workSansMedium '>9804208888</p>
                  <button
                    onClick={() => handleCopy("số tài khoản")}
                    className='w-1/5  font-workSansMedium flex flex-row  justify-around  items-center bg-blue-500 text-white rounded-md px-3 py-1 '
                  >
                    <ClipboardIcon className='h-4 w-4' /> Copy
                  </button>
                </div>
                <div className='flex  justify-between text-sm bg-slate-100 rounded-md p-3 '>
                  <p className='w-2/5 font-workSansMedium '>Chủ tài khoản</p>
                  <p className='w-2/5 font-workSansMedium '>Lưu Văn Huy</p>
                  <button
                    onClick={() => handleCopy("chủ tài khoản")}
                    className='w-1/5  font-workSansMedium flex flex-row  justify-around  items-center bg-blue-500 text-white rounded-md px-3 py-1 '
                  >
                    <ClipboardIcon className='h-4 w-4' /> Copy
                  </button>
                </div>
                <div className='flex  justify-between  text-sm bg-slate-100 rounded-md p-3 '>
                  <p className=' w-2/5 font-workSansMedium '>Nội dung</p>
                  <p className='w-2/5  font-workSansMedium text-red-500 '>
                    {accountExtendDetail?.payment_content ? accountExtendDetail?.payment_content : "PAY"}
                  </p>
                  <button
                    onClick={() => handleCopy("nội dung chuyển tiền")}
                    className='w-1/5  font-workSansMedium flex flex-row  justify-around  items-center bg-blue-500 text-white rounded-md px-3 py-1 '
                  >
                    <ClipboardIcon className='h-4 w-4' /> Copy
                  </button>
                </div>

                {/* <div className='flex  justify-center text-sm bg-slate-100 rounded-md p-3 '>
                  {isShowPayment ? (
                    <button
                      onClick={() => setIsShowPayment(false)}
                      className=' font-workSansMedium flex flex-row  h-12 justify-around  items-center bg-blue-500 text-white rounded-md px-3 py-1 '
                    >
                      Đã chuyển khoản
                    </button>
                  ) : (
                    <div className='  bg-[#CEF4FC] rounded-md '>
                      <p className='flex  flex-row my-4  p-5 max-lg:p-1 text-[15px] text-[#06798F] font-workSansMedium text-center'>
                        Chúng Tôi đã nhận được thông tin chuyển khoản của bạn, tiền sẽ được cộng vào tài khoản của bạn
                        trong thời gian 1-5 phút.Xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi !
                      </p>
                    </div>
                  )}
                </div> */}
              </div>
              <div>
                <div className=' font-workSansSemiBold mt-4 lg:mt-0 text-xl mb-4 text-center '>Cách 2: Quét mã QR</div>
                <div className='  text-sm mb-4 text-center '>
                  Mở App Ngân hàng quét mã QRCode và nhập số tiền cần chuyển
                </div>
                <div className=' flex justify-center'>
                  {accountExtendDetail?.payment_content && (
                    <img
                      src={`https://api.vietqr.io/image/970407-9804208888-JLWd1gE.jpg?accountName=LUU%20VAN%20HUY&addInfo=${accountExtendDetail?.payment_content}`}
                      alt='bank'
                      className='w-2/3'
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='w-[95%] overflow-auto scrollmenu justify-center flex flex-col gap-y-8 bg-white  border shadow-md rounded-md '>
            <div className='border-b px-4 py-5'>
              <span className=' font-workSansSemiBold  text-2xl'>Lịch Sử Nạp Tiền</span>
            </div>
            <div className='scrollmenu  '>
              <table>
                <thead>
                  <tr className='flex gap-x-6 px-5 mb-5 mt-2 font-workSansBold  '>
                    <th className=' w-2  text-start'>
                      <span className=' font-semibold text-sm'># </span>{" "}
                    </th>
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='  text-sm '>Số tiền trước </span>{" "}
                    </th>
                    <th className='  w-32 max-w-64 text-center'>
                      <span className='   text-sm '> Số tiền nạp </span>{" "}
                    </th>

                    <th className=' w-32 max-w-64   text-center'>
                      <span className='   text-sm  '>Số tiền sau </span>{" "}
                    </th>
                    <th className=' w-32  text-center'>
                      <span className='  text-sm  '>Thời gian </span>{" "}
                    </th>
                    <th className=' w-64  text-center'>
                      <span className='   text-sm  '>Nội dung</span>{" "}
                    </th>
                  </tr>
                </thead>
                {!isPending && data && (
                  <tbody>
                    {data?.map((item, i: number) => (
                      <tr
                        key={i}
                        className={`flex  gap-x-6 py-5  px-5 border-b     ${i % 2 == 0 ? "bg-slate-100" : ""}`}
                      >
                        <td className=' text-start  w-2  '>
                          <span className='font-normal text-sm'>{i + 1} </span>
                        </td>
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>
                            {convertNumbThousand(item.total_amount_before)}
                            {"đ"}
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>{convertNumbThousand(item.amount)}đ</span>
                        </td>

                        <td className='text-center font-normal text-sm  w-32 max-w-64 '>
                          <span className=' font-normal text-sm  '>
                            {convertNumbThousand(item.total_amount_after)}đ
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm w-32    '>
                          <span className=' font-normal text-sm  '>
                            {moment(item.created_at).format("DD-MM-YYYY hh:mm:ss")}
                          </span>
                        </td>
                        <td className='text-center font-normal text-sm w-64    '>
                          <span className=' font-normal text-sm  '>{item.content} </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
      <CopyModal title={title} isOpen={isOpenInfo} closeModal={() => setIsOpenInfo(false)} />
    </AppLayout>
  );
};

export default Rechange;
