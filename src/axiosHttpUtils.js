import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8090';

axios.defaults.timeout = 5000;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

async function getAllPackages() {
  let response = await axios.get('/packages');
  return response.data || [];
}

async function getPackagesByParams(params) {
  let url = `/packages?1=1`;
  url += params.status !== '' ? `&status=${params.status}` : '';
  url += params.hasOrdered !== '' ? `&hasOrdered=${params.hasOrdered}` : '';
  let response = await axios.get(url);
  return response.data || [];
}

async function updatePackages(params) {
  let response = await axios.put(`/packages/${params.id}`, params);
  return response.data || [];
}

export {
  getAllPackages,
  getPackagesByParams,
  updatePackages
}
