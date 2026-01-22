import axios from "axios";

const baseUrl = "http://195.35.3.228:8000/api"
export const axiosInstance = axios.create({
    baseURL: baseUrl,
  });
  
  // ---------- Request Interceptor (واحد فقط) ----------
  axiosInstance.interceptors.request.use(
    async (config) => {
      // Try to get token from NextAuth session first (if in browser)
      if (typeof window !== "undefined") {
        try {
          const sessionResponse = await fetch("/api/auth/session");
          if (sessionResponse.ok) {
            const session = await sessionResponse.json();
            const token = session?.accessToken;
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        } catch (error) {
          // Fallback to other sources on error
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // ---------- Response Interceptor (واحد فقط) ----------
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export const  DOCTORS= {
    GET_ALL_DOCTORS: `${baseUrl}/doctors`,
    GET_DOCTOR_BY_ID: (id:string)=> `${baseUrl}/doctors/${id}`,
    CREATE_DOCTOR: `${baseUrl}/doctors/upload`,
    UPDATE_DOCTOR:(id:string)=> `${baseUrl}/doctors/${id}`,
    DELETE_DOCTOR: (id:string)=> `${baseUrl}/doctors/${id}`
}
