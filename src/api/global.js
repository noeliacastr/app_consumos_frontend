const token = JSON.parse(localStorage.getItem("authState"))?.state?.token
export const TOKEN = token != null? token : "";