import { DUMMY_CREEL_SIDES, NEW_CREEL_SIDES } from './dummy';

const BASE_URL = 'http://yarnone.eu-central-1.elasticbeanstalk.com'
// const BASE_URL = 'http://localhost:8081'
// const BASE_URL = 'https://36afdfb5.eu.ngrok.io'


let creelSidesLoad = 0;
class ApiClient {

  _makeRequest = async (endpoint, { method, body } = {}) => {
    try {
      const response = await fetch(BASE_URL + endpoint, {
        method: method || 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body && JSON.stringify(body),
      });


      return response.json();

    } catch (e) {
      console.error(e);
    }
  };

  lightCreelSides = async (machineName, off = false) => {
    return this._makeRequest('/lightCreelSides', {
      method: 'POST',
      body: {
        machine_name: machineName,
        switch_off: off,
      }
    })
  }

  getCreelSides = async () => {
    creelSidesLoad++;
    if (creelSidesLoad > 1) {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500)
      });
    }
    if (creelSidesLoad < 2) {
      return DUMMY_CREEL_SIDES;
    }
    return [...NEW_CREEL_SIDES, ...DUMMY_CREEL_SIDES];
  }
}

const apiClient = new ApiClient();
export default apiClient;
