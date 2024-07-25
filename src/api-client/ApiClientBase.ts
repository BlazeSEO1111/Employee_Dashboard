import {BASE_URL} from "@/utils/config";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {toast} from "react-toastify";

class ApiClientBase {
    protected instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: BASE_URL,
            timeout: 50000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.initializeResponseInterceptor();
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.get<T>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.instance.post<T>(url, data, config);
        return response.data;
    }

    protected handleError = (err: any) => {
        if (err?.response) {
            if (err?.response?.status == 401) {
                toast.error("Có lỗi xảy ra, vui lòng thử lại")
                // localStorage.removeItem("AQToken");
                // window.location.href = "/client/login";
            }
        }
        return Promise.reject(err);
    };

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use(this.handleResponse, this.handleError);
    };

    private handleResponse = (res: AxiosResponse) => {
        return res.data;
    };
}

export default ApiClientBase;
