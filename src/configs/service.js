const BASE_URL = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4';

const service = {
  GET_DATA: `${BASE_URL}/list`,
  GET_AREA: `${BASE_URL}/option_area`,
  GET_SIZE: `${BASE_URL}/option_size`
};

export default service;