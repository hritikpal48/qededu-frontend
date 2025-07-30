import axios, { AxiosInstance, AxiosHeaderValue } from "axios";
import { environmentVariables } from "@/config/app.config";
import { getTokenServerSide } from "@/utils/authTokensServer"
interface RawAxiosHeaders {
    [key: string]: AxiosHeaderValue
}

type CreateHttpServiceParams = {
    baseURL: string,
    config?: {
        timeout?: number,
        headers?: RawAxiosHeaders
    },
    sendAuthToken?: boolean
}


export const defaultConfig: CreateHttpServiceParams = {
    baseURL: environmentVariables.NEXT_PUBLIC_API_HOST ?? '',
    config: {
        headers: {
            "Content-Type": "application/json",
        },
        timeout: 4000

    },
    sendAuthToken: true
}

export const createHttpService = (params: CreateHttpServiceParams): AxiosInstance => {
    const axiosInstance = axios.create({
        baseURL: params?.baseURL,
        timeout: params?.config?.timeout ?? 10000,
        headers: params?.config?.headers ?? {},
    });

    // Request interceptor
    axiosInstance.interceptors.request.use(
        async (config) => {
            if (params?.sendAuthToken) {
                const token = await getTokenServerSide();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => {
            console.error("Request error:", error);
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    console.warn("Unauthorized. Redirecting to login...");
                } else if (status === 500) {
                    console.error("Server error");
                }
            } else if (error.request) {
                console.error("No response from server");
            } else {
                console.error("Axios error", error.message);
            }

            return Promise.reject(error);
        }
    );
    return axiosInstance
}

const HttpService = createHttpService(defaultConfig);
export default HttpService;
