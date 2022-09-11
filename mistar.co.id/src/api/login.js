import request from "@/utils/request";

export function api_login(username, password) {
  return request({
    method: "post",
    url: "cms/login",
    data: {
      username: username,
      password: password,
      device: "web",
      institution: process.env.VUE_APP_ID_SCHOOL
    }
  });
}

export function user_profile(token) {
  return request({
    method: "post",
    url: "profile",
    headers: { Authorization: "bearer " + token }
  });
}
