"use client";
import {
    AdsSideBarIcon,
    AffiliateIcon,
    ContactIcon,
    FacebookIcon,
    HistoryIcon,
    ManageUser,
    ProfileIcon,
    ServiceIcon,
    TeleGramIcon,
    TicketIcon
} from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import Avatar from "../Avatar";
import {AuthContext} from "@/context/useAuthContext";
import {LoginIcon} from "@/assets/icon";
import {MailOutlined, SkypeOutlined} from '@ant-design/icons';
import {roleAdmin} from "@/constant";

interface MenuItemType {
    key: string;
    icon: any;
    label: string;
    active: boolean;
}

const SideMenu = () => {
    let pathname = usePathname();
    const {authState} = useContext(AuthContext);
    const menuItems: MenuItemType[] = [
        // {
        //     key: "client/profile-employee",
        //     icon: UserIcon,
        //     label: "Hồ sơ",
        //     active: false,
        // },
        {
            key: "client/service-partner",
            icon: ServiceIcon,
            label: "Service Partner",
            active: false,
        },
        {
            key: "client/voucher",
            icon: ServiceIcon,
            label: "Voucher",
            active: false,
        },
        {
            key: "client/ad-codes",
            icon: AdsSideBarIcon,
            label: "Mã Quảng Cáo",
            active: false,
        },
        {
            key: "client/service-manage",
            icon: AffiliateIcon,
            label: "Quản lý dịch vụ",
            active: false,
        },

    ]
    const [listMenu, setListMenu] = useState<MenuItemType[]>(menuItems);

    useEffect(() => {
        if (authState?.role === roleAdmin) {
            setListMenu(prevMenu => [
                ...prevMenu,
                {
                    key: "client/manage-user",
                    icon: ManageUser,
                    label: "Quản lý user",
                    active: false,
                }
            ]);
        }
    }, [authState?.role]);

    const [listMenu2] = useState<MenuItemType[]>([
        {
            key: "client/recharge",
            icon: FacebookIcon,
            label: "Nạp Tiền",
            active: false,
        },
        {
            key: "client/profile",
            icon: ProfileIcon,
            label: "Thông tin cá nhân",
            active: false,
        },
        {
            key: "order/history",
            icon: HistoryIcon,
            label: "Lịch sử giao dịch",
            active: false,
        },
        {
            key: "client/tickets",
            icon: TicketIcon,
            label: "Ticket hỗ trợ",
            active: false,
        },
        {
            key: "client/affiliates",
            icon: AffiliateIcon,
            label: "Cộng tác viên",
            active: false,
        },
    ]);

    const [listMenu3] = useState<MenuItemType[]>([]);
    const [listMenu4] = useState<MenuItemType[]>([
        {
            key: "client/contact",
            icon: ContactIcon,
            label: "Liên hệ",
            active: false,
        },
    ]);

    const _checkActiveTab = (item: MenuItemType, index?: number) => {
        if (`${pathname}` === `/${item.key}`) return true;
        return false;
    };

    const handleLogOut = () => {
        localStorage.clear();
        window.location.href = '/';
    };
    if (!authState?.accessToken) return <></>
    return (
        <aside
            className="fixed transition-all bg-white  overflow-auto  duration-300 top-0 left-0 z-40 w-80 h-screen border-r border-black  border-opacity-10  py-6 max-lg:hidden">
            <ul className="w-full    ">
                <li className="mb-4 border-b border-black border-opacity-10">
                    <div className="flex mb-4">
                        {authState ? (
                            <Avatar/>
                        ) : (
                            <a
                                href="/client/login"
                                className="flex w-full justify-center text-white "
                            >
                                <div
                                    className="flex w-[90%] rounded-full items-center  justify-around    font-workSansSemiBold text-md
                   bg-gradient-to-r  from-[#FF5E6A] to-[#FF8C50] h-12"
                                >
                                    <Image
                                        src={LoginIcon}
                                        className=" size-6"
                                        alt="avatar"
                                    ></Image>
                                    <span>Đăng nhập</span>
                                    <span></span>
                                </div>
                            </a>
                        )}
                    </div>
                </li>
                {authState?.accessToken ?
                    <>
                        <div className=" border-b border-black border-opacity-10">
                            <p className="px-[10px] pl-5  font-workSansSemiBold text-sm text-gray-600 ">
                                Hệ thống
                            </p>
                            {listMenu.map((value, index) => {
                                return (
                                    <li className="mt-1 text-[15px] " key={value.key}>
                                        <div
                                            className={`p-[10px] pl-5     border-l-4   transition-all duration-300 ${_checkActiveTab(value)
                                                ? "bg-[#daf5f0] !text-[#02c39a]"
                                                : ""
                                            } w-full`}
                                        >
                                            <Link
                                                href={`/${value.key}`}
                                                className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${_checkActiveTab(value) ? "text-[#02c39a]" : ""
                                                }    duration-300 ${pathname === value.key
                                                    ? "text-dark-900 font-workSansSemiBold"
                                                    : "  font-workSansMedium text-dark-900"
                                                }`}
                                            >
                                                <Image
                                                    src={value.icon}
                                                    width={30}
                                                    height={30}
                                                    alt="home-bg"
                                                    className=" size-7 mr-4   "
                                                />
                                                {/* {value.icon} */}
                                                {value.label}
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                        <div className=" border-b border-black border-opacity-10">
                            {/* <p className="px-[10px] pl-5 mt-4 font-workSansSemiBold text-md  text-gray-600 ">
            Công cụ
          </p> */}
                            {listMenu3.map((value, index) => {
                                return (
                                    <li className="mt-1  text-[15px] " key={index}>
                                        <div
                                            className={`p-[10px] pl-5    border-l-4   transition-all duration-300  ${_checkActiveTab(value)
                                                ? "bg-select-500 border-select-700"
                                                : ""
                                            } w-full`}
                                        >
                                            <Link
                                                href={`${value.key}`}
                                                className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${_checkActiveTab(value) ? "text-select-700" : ""
                                                }   duration-300 ${pathname === value.key
                                                    ? "text-dark-900 font-workSansSemiBold"
                                                    : "  font-workSansMedium text-dark-900"
                                                }`}
                                            >
                                                <Image
                                                    src={value.icon}
                                                    width={30}
                                                    height={30}
                                                    alt="home-bg"
                                                    className=" size-7 mr-4   "
                                                />
                                                {/* {value.icon} */}
                                                {value.label}
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                        <div className="   border-black border-opacity-10  pl-5">
                            <p className="px-[10px] mt-4 font-workSansSemiBold text-md  text-gray-600 ">
                                Liên hệ
                            </p>
                            <div className="flex flex-col gap-5 mt-5">
                                <div className="flex gap-3">
                                    <SkypeOutlined/>
                                    <p>live:.cid.5bed127eed70c63b</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Image src={TeleGramIcon} alt="telegram" width={15} height={3}
                                           className="w-[15px] h-[15px]"/>
                                    <p>max_clickAD</p>
                                </div>
                                <div className="flex gap-3">
                                    <MailOutlined/>
                                    <p>maxevdok@clickadilla.com</p>
                                </div>
                            </div>
                            {listMenu4.map((value, index) => {
                                return (
                                    <li className="mt-1  text-[15px] " key={value.key}>
                                        <div
                                            className={`p-[10px] pl-5    border-l-4   transition-all duration-300  ${_checkActiveTab(value)
                                                ? "bg-select-500 border-select-700"
                                                : ""
                                            } w-full`}
                                        >
                                            <Link
                                                href={`/${value.key}`}
                                                className={`flex transition-all  items-center  hover:font-workSansSemiBold  hover:px-2  ${_checkActiveTab(value) ? "text-select-700" : ""
                                                }   duration-300 ${pathname === value.key
                                                    ? "text-dark-900 font-workSansSemiBold"
                                                    : "  font-workSansMedium text-dark-900"
                                                }`}
                                            >
                                                <Image
                                                    src={value.icon}
                                                    width={30}
                                                    height={30}
                                                    alt="home-bg"
                                                    className=" size-7 mr-4   "
                                                />
                                                {/* {value.icon} */}
                                                {value.label}
                                            </Link>
                                        </div>
                                    </li>
                                );
                            })}
                            {authState?.accessToken ? <div onClick={handleLogOut}
                                                           className="font-semibold text-[30px] text-red-500 hover:cursor-pointer">LOGOUT</div> : <></>}

                        </div>
                    </>
                    :
                    <></>
                }
            </ul>

        </aside>
    );
};

export default SideMenu;
