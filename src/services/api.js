// import axios from "axios";

// const api = axios.create({
//   baseURL: "/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // JWT auto attach
// api.interceptors.request.use((config) => {
//   debugger;
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// import axios from "axios";
// const api = axios.create({
//   baseURL: "/api", // change to your backend URL
//   timeout: 15000,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });        

// // REQUEST: token localStorage se
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");

//    if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

// Auto attach JWT
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
