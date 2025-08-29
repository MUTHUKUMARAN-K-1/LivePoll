import axiosInstance from "../helper/axiosInstance";

export async function checkUserService() {
    const response = await axiosInstance.get("/user/check");
    return response.data;
}