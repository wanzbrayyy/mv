import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://scrape-maverick.vercel.app',
  timeout: 30000,
});

export const executeApi = async ({ method = 'get', path, params = {}, body = {} }) => {
  const startTime = Date.now();
  try {
    const response = await apiClient.request({
      method,
      url: path,
      params: method.toLowerCase() === 'get' ? params : {},
      data: method.toLowerCase() === 'post' ? body : {},
    });
    const duration = Date.now() - startTime;
    return {
      status: response.status,
      data: response.data,
      duration,
      error: false,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    if (error.response) {
      return {
        status: error.response.status,
        data: error.response.data,
        duration,
        error: true,
      };
    }
    return {
      status: 503, // Service Unavailable
      data: { error: 'koneksi ke server gagal atau timeout.' },
      duration,
      error: true,
    };
  }
};
