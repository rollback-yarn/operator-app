import moment from 'moment';

class ApiClient {

  getCreelSides = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    });
    return [
      {
        id: 'aaa',
        machine_name: 'Machine A',
        side: 'A',
        creel_id: 'Abt 1122',
        created_at: moment().format('X'),
      },
      {
        id: 'abb',
        machine_name: 'Machine A',
        side: 'B',
        creel_id: 'Abt 1122',
        created_at: moment().format('X'),

      },
      {
        id: 'abc',
        machine_name: 'Machine A',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abd',
        machine_name: 'Machine B',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abe',
        machine_name: 'Machine B',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abf',
        machine_name: 'Machine C',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abg',
        machine_name: 'Machine D',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abh',
        machine_name: 'Machine E',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      }, {
        id: 'abi',
        machine_name: 'Machine F',
        side: 'B',
        creel_id: 'Abt 1121',
        created_at: moment().format('X'),

      },

    ]
  }
}

const apiClient = new ApiClient();
export default apiClient;
