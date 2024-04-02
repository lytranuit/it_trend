import repository from "../service/repository";

const resoure = "history";
const area = "v1";
export default {
  table(params) {
    return repository
      .post(`/${area}/${resoure}/table`, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
  export(params) {
    return repository
      .post(`/${area}/${resoure}/exportexcel`, params, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
};
