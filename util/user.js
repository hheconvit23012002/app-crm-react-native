import axios from 'axios';

const API_URL = 'http://103.72.97.224:8000/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    }
});

// Add a request interceptor to set the Bearer token on the header
axiosInstance.interceptors.request.use(
    config => {
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMGI3NTBmNDZhZjgyNzlmZTRlYzcxOTEwMjBhODA4MWY5NTU1MGJkY2I2MDQzZGQ5NDI5NjliMGNkZmRlZmM0ZTE4MWZiMDFjYmVlNTg0MjkiLCJpYXQiOjE3MTUxODY5NTUuNTM3ODk5LCJuYmYiOjE3MTUxODY5NTUuNTM3OTAyLCJleHAiOjE3NDY3MjI5NTUuNTI4MTk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Ltb5CjMMtbwVUN8GTR179XtulGWy9efwZygYj4ducgGM9PvHb0Vpyhosvih194kUwCP16j5WC_a3lfcz2umUNqtKciHHsGGeFfLH63RZw_gBCAnpTlw8XCnOhHR4MMif9ggCQb7XidDvjozxjwfJBIDurA0PRagsi2maHs3BkwQRnABK-z8pGSg4uinDOdEjV_AFJBB7UdRXsm_qKRV08JndbZ_QS_girvRPqaGLsrPvj0wcQfG91R0DOhUOTIa-l31ONrLUnwD1kRiaxnkif9SLJhdSDCwEnYr-lXSTUQ1VNVZqArEc9ELZoHLlKLp-SdkEbOhcbaRqBiIS9zwNDcElLMN2NKuS-QPYNYzLro7iCUqBiPzuokU1VJfXbPCAdOiqxOu88IcvFm91wDqmyG6FFSbk6W1LtOeNwTYkZVtgduw8fdAu4_EN1pHlWhdGaw3Wp6WLi_xOMVU9TIMn-4qZRRdS5zlS0BvjyBvGzh26ACYEyxx5GkvcUmx4gUMCtVIqDFcv-5Qf2-4mV8xd1sK1-mGmnboxl3kCIMfsA9gcVItULS54v3pMjJBriXuooU7N9JfGgccPXoXiN4a1WxnJZ-8SpzD2ib2Tz8UkmXqh9ttRTNZ0QxhjHHa6gUEWVx0Z7oLtjcn4bhd2wfg_-KOwwvNagTK1v5uS7rLdtuQ";
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;