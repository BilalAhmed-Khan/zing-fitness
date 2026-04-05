import { create } from 'apisauce';
import {
  API_TIMEOUT,
  API_URL,
  BASE_URL,
  REQUEST_TYPE,
} from '../config/WebServices';

const api = create({
  baseURL: `${BASE_URL}${API_URL}`,
  timeout: API_TIMEOUT,
});

export const callRequest = async (url, payload, params = '', headers = {}) => {
  // get attributes from url
  let { route, type } = url;

  // log sending data
  console.log('Route ::', route);
  console.log('Params ::', params);
  console.log('Payload ::', payload);

  let response;

  switch (type) {
    case REQUEST_TYPE.GET:
      response = await api.get(route, params);
      break;
    case REQUEST_TYPE.POST:
      response = await api.post(route, payload, { headers });
      break;
    case REQUEST_TYPE.DELETE:
      response = await api.delete(route, payload);
      break;
    case REQUEST_TYPE.PUT:
      response = await api.put(route, payload);
      break;
    case REQUEST_TYPE.PATCH:
      response = await api.patch(route, payload);
      break;
    default:
      response = await api.get(route, payload);
  }

  console.log(`${route} response => `, response);
};

api.addRequestTransform(request => {});
