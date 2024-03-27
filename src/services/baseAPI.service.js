const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const makeApiRequest = async (endpoint, options) => {
  return await fetch(`${VITE_APP_BASE_URL}${endpoint}`, options);
}

export default makeApiRequest;
