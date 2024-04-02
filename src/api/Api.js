import authHeader from "../service/authHeader";
import repository from "../service/repository";

const resoure = "api";
const area = "v1";
export default {
  departments() {
    return repository
      .get(`/${area}/${resoure}/departments`, { headers: authHeader() })
      .then((res) => res.data);
  },
  objects() {
    return repository
      .get(`/${area}/${resoure}/objects`, { headers: authHeader() })
      .then((res) => res.data);
  },
  targets() {
    return repository
      .get(`/${area}/${resoure}/targets`, { headers: authHeader() })
      .then((res) => res.data);
  },
  locations() {
    return repository
      .get(`/${area}/${resoure}/locations`, { headers: authHeader() })
      .then((res) => res.data);
  },
  locationsWithPoint() {
    return repository
      .get(`/${area}/${resoure}/locationsWithPoint`, { headers: authHeader() })
      .then((res) => res.data);
  },
};