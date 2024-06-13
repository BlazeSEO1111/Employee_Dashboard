"use client";
import Header from "@/components/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";

const Profile: NextPage<any> = () => {
  return (
    <AppLayout>
      <div className="w-full  h-screen flex flex-col">
        <div className="p-6">
          <Header title="Hệ thống like sub"/>
          <div className="h-[1px] bg-black  bg-opacity-20 my-4 max-lg:hidden" />
          <div className="   bg-[#F8D7D9] rounded-xl ">
            <div className="  my-4  p-5 max-lg:p-1 text-[15px] text-red-700 text-xl font-workSansMedium text-start">
              <span className="flex mb-2 ">
                <InformationCircleIcon className="w-6 h-6    mr-2" />
                Lưu ý
              </span>
              <div className="flex flex-col gap-y-2">
                <p>
                  - Nghiêm cấm buff các đơn có nội dung vi phạm pháp luật, chính
                  trị, đồ trụy... Nếu cố tình buff bạn sẽ bị trừ hết tiền và ban
                  khỏi hệ thống vĩnh viễn, và phải chịu hoàn toàn trách nhiệm
                  trước pháp luật.
                </p>
                <p>
                  - Nếu đơn đang chạy trên hệ thống mà bạn vẫn mua ở các hệ
                  thống bên khác, nếu có tình trạng hụt, thiếu số lượng giữa 2
                  bên thì sẽ không được xử lí.
                </p>
                <p>
                  - Đơn cài sai thông tin hoặc lỗi trong quá trình tăng hệ thống
                  sẽ không hoàn lại tiền.
                </p>
                <p>
                  - Nếu gặp lỗi hãy nhắn tin hỗ trợ phía bên phải góc màn hình
                  hoặc vào mục liên hệ hỗ trợ để được hỗ trợ tốt nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};
export default Profile;
