import { API_URL } from "../constants/env-config";
import { setCookie,  checkResponse} from "./utils";

type TRequestInit = {
  headers: {
    'Content-Type': string,
    authorization: string
  }
}

export const updateToken = () => {
    return fetch(`${API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("authorization"),
      }),
    }).then(checkResponse);
  };

  export const fetchWithRefresh = async (url: string, options: TRequestInit) => {
    try {
      const res = await fetch(url, options);
      return await checkResponse(res);
    } catch (err: any) {
      if (err.message === "jwt expired") {
        const refreshData = await updateToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("authorization", refreshData.refreshToken);
        setCookie("authorization", refreshData.accessToken, {});
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options);
        return await checkResponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };
