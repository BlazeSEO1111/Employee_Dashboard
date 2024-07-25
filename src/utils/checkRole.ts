import {roleDefault} from "@/constant"

export const roleAccount = (roleId: string) => {
    const checkRole = roleDefault.find((item: any) => item._id === roleId)
    return checkRole?.name
}