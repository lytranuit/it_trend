import authHeader from "../service/authHeader";
import repository from "../service/repository";

const resoure = "Limit";
const area = "Trend";
export default {
  Save(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/Save`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },

  delete(id) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(
        `/${area}/${resoure}/delete`,
        { id: id },
        {
          headers: headers,
        }
      )
      .then((res) => res.data);
  },
  table(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/table`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  get(id) {
    return repository
      .get(`/${area}/${resoure}/Get`, {
        params: { id: id },
        headers: authHeader(),
      })
      .then((res) => res.data);
  },
  xuatexcel(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/xuatexcel`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
};
