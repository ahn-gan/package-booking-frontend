import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

axios.defaults.timeout = 5000;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

async function getAllPackages () {
  let response = await axios.get('/packages');
  return response.data || [];
}

export {
  getAllPackages
}
