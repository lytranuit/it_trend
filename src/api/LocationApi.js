import authHeader from "../service/authHeader";
import repository from "../service/repository";

const resoure = "location";
const area = "trend";
export default {
  get() {
    return repository
      .get(`/${area}/${resoure}/get`, { headers: authHeader() })
      .then((res) => {
        var url = "/Identity/Account/Login";
        if (res.request.responseURL.indexOf(url) != -1) location.reload();
        return res.data;
      });
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
  remove(items) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/remove`, items, {
        headers: headers,
      })
      .then((res) => {
        var url = "/Identity/Account/Login";
        if (res.request.responseURL.indexOf(url) != -1) location.reload();
        return res.data;
      });
  },
  save(items) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/save`, items, {
        headers: headers,
      })
      .then((res) => {
        var url = "/Identity/Account/Login";
        if (res.request.responseURL.indexOf(url) != -1) location.reload();
        return res.data;
      });
  },
  saveorder(items) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(
        `/${area}/${resoure}/saveorder`,
        { data: items },
        {
          headers: headers,
        }
      )
      .then((res) => {
        var url = "/Identity/Account/Login";
        if (res.request.responseURL.indexOf(url) != -1) location.reload();
        return res.data;
      });
  },
};
