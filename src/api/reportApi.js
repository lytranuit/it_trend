import authHeader from "../service/authHeader";
import repository from "../service/repository";

const resoure = "report";
const area = "trend";
export default {
  limit(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/limit`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  xuatlimit(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/xuatlimit`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  xuatraw(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/xuatraw`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  xuattrend(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/xuattrend`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  drawChart(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/drawChart`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
  getChartData(id) {
    return repository
      .get(`/${area}/${resoure}/getChartData`, {
        params: { id_text: id },
        headers: authHeader(),
      })
      .then((res) => res.data);
  },
  uploadImage(params) {
    let headers = authHeader();
    headers["Content-Type"] = "multipart/form-data";
    return repository
      .post(`/${area}/${resoure}/uploadImage`, params, {
        headers: headers,
      })
      .then((res) => res.data);
  },
};
