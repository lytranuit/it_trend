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
  points() {
    return repository
      .get(`/${area}/${resoure}/points`, { headers: authHeader() })
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
  targetsOfObject(object_id) {
    return repository
      .get(`/${area}/${resoure}/targetsOfObject`, {
        params: { object_id: object_id },
        headers: authHeader(),
      })
      .then((res) => res.data);
  },
  locationsWithPoint(filter_object = null, filter_target = null, filter_type_bc = null) {
    return repository
      .get(`/${area}/${resoure}/locationsWithPoint`, {
        params: { filter_object: filter_object, filter_target: filter_target, filter_type_bc: filter_type_bc },
        headers: authHeader(),
      })
      .then((res) => res.data);
  },
};
