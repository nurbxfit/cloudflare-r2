// import axios, { AxiosRequestConfig } from "axios";
// import { IHTTPClient } from "../types/IHTTPClient";

// class AxiosHTTPClient implements IHTTPClient {
// 	async request(url: string, options: RequestInit): Promise<any> {
// 		try {
// 			const axiosOptions: AxiosRequestConfig = {
// 				method: options.method as AxiosRequestConfig["method"],
// 				headers: options.headers,
// 				data: options.body,
// 			};

// 			const response = await axios(url, axiosOptions);
// 			return response.data;
// 		} catch (error) {
// 			throw new Error(`HTTP request failed: ${error.message}`);
// 		}
// 	}
// }

// export default AxiosHTTPClient;
