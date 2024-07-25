import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
    message: string;
    status: string;
}

class ApiGetAllUser extends ApiClientBase {
    constructor() {
        super();
    }


    public async getAllUserManage(accessToken: string): Promise<BaseResponse | any> {

        try {
            const res = await this.instance.get(`api/v1/users/get-all`, {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching user information:", error);
            throw error;
        }
    }

}

export default ApiGetAllUser;
