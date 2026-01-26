import axios from "axios";

const baseUrl = "https://testdevelopment.top:7330/api"
export const axiosInstance = axios.create({
    baseURL: baseUrl,
  });
  
  // ---------- Request Interceptor (واحد فقط) ----------
  // axiosInstance.interceptors.request.use(
  //   async (config) => {
  //     // Try to get token from NextAuth session first (if in browser)
  //     if (typeof window !== "undefined") {
  //       try {
  //         const sessionResponse = await fetch("/api/auth/session");
  //         if (sessionResponse.ok) {
  //           const session = await sessionResponse.json();
  //           const token = session?.accessToken;
  //           if (token) {
  //             config.headers.Authorization = `Bearer ${token}`;
  //           }
  //         }
  //       } catch (error) {
  //         // Fallback to other sources on error
  //       }
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  
  // ---------- Response Interceptor (واحد فقط) ----------
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export const  PROFESSIONALS= {
    GET_ALL_TYPES: `${baseUrl}/professional-types`,
    GET_ALL_PROFESSIONALS: `${baseUrl}/professionals`,
    GET_PROFESSIONAL_BY_ID: (id:string)=> `${baseUrl}/professionals/${id}`,
    CREATE_PROFESSIONAL: `${baseUrl}/professionals/upload`,
    UPDATE_PROFESSIONAL:(id:string)=> `${baseUrl}/professionals/${id}`,
    DELETE_PROFESSIONAL: (id:string)=> `${baseUrl}/professionals/${id}`,
    SEARCH_BY_TYPE:(professional_type:string)=> `${baseUrl}/professionals/search/by-type?professional_type=${professional_type}`,
    SEARCH_BY_SPECIALIZATION:(specialization:string)=> `${baseUrl}/professionals/search/by-specialization?specialization=${specialization}`,
    GET_STATS:`${baseUrl}/stats`
}
