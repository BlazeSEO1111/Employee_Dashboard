import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
    message: string;
    status: string;
}

class ApiProfile extends ApiClientBase {
    constructor() {
        super();
    }

    /**
     * getLinkPayment
     */

    public async getInformPublisher(accessToken: string, userId: string): Promise<BaseResponse | any> {

        try {
            const res = await this.instance.get(`/api/v1/users/get-user-by-id/${userId}`, {
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

    public async editInformPublisher(accessToken: string, userId: string, payload: any): Promise<BaseResponse | any> {
        try {
            const res = await this.instance.put(`/api/v1/users/update/${userId}`, payload, {
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

    public async editPassword(accessToken: string, userId: string, payload: any): Promise<BaseResponse | any> {
        try {
            const res = await this.instance.put(`/api/v1/users/reset-password/${userId}`, payload, {
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

export default ApiProfile;
