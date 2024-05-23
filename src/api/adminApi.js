import authHeader from "../service/authHeader";
import repository from "../service/repository";

const resoure = "admin";
const area = "trend";
export default {
  chart(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/chart`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  actions(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/actions`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  alerts(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/alerts`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
};
