import {API_URL} from '../../env';
import {fetchAPI} from '../../common/api';

function fetchStudent() {
  const url = `${API_URL}student/list`;
  return fetchAPI(url);
}

export const API = {
  fetchStudent,

};
