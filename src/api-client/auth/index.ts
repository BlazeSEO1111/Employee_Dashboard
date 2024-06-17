import ApiClientBase from "../ApiClientBase";
import { AccountDetailResponse, LoginParamsType, LoginResponseType, RegisterParamsType } from "../types/AuthType";

class ApiAuth extends ApiClientBase {
  constructor() {
    super();
    this.instance.defaults.headers["Content-Type"] = "application/json";
  }

  /**
   * Login
   */
  public async login(params: LoginParamsType): Promise<LoginResponseType | any> {
    const res = await this.instance.post("/api/v1/auth/sign-in", params);
    return res;
  }

  /**
   * sign up
   */
  public async signUp(params: RegisterParamsType): Promise<any> {
    const res = await this.instance.post("/api/v1/auth/sign-up", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  /**
   * confirm email123123@123123@123123@
   */
  public async confirmEmail(token: string, access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/confirm-email",
      {
        token: token.replaceAll(" ", "+"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async verifyEmail(access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/verify-email",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async canCancel(access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/payment/can-cancel",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async getAccountExtendDetails(accessToken: string, userId: string): Promise<AccountDetailResponse> {
    const res = await this.instance.get(`/api/v1/users/${userId}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    return res.data;
  }

  public async changePassword(access_token: string, currentPassword: string, newPassword: string): Promise<any> {
    const res = await this.instance.post(
      `/api/app/account-extend/change-password?currentPassword=${currentPassword}&newPassword=${newPassword}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async resetPassword(email: string): Promise<any> {
    const res = await this.instance.post(`/api/app/account-extend/reset-password?email=${email}`, {});
    return res.data;
  }

  public async confirmResetPassword(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    const tokenFormat = token.replaceAll(" ", "+");
    const res = await this.instance.post(
      `/api/app/account-extend/confirm-reset-password`,
      {
        email,
        token: tokenFormat,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
}

export default ApiAuth;
