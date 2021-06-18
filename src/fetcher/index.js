import axios from 'axios';
import { SERVICES } from '../configs';
import uniq from 'lodash/uniq';

export const getData = async () => {
	try {
		const response = await axios.get(`${SERVICES.GET_DATA}`);
		const data = response.data.map((item, index) => ({
			...item,
			id: item.uuid,
			isEdit: false,
			isOpen: true
		}));

		return data;
	} catch (e) {
		console.error(e);
		return [];
	}
};

export const getArea = async () => {
	try {
		const response = await axios.get(`${SERVICES.GET_AREA}`);
		const province = uniq(response.data.map((item) => item.province)).map(i => ({
			key: i,
			value: i
		}));

		const list = response.data;

		return { province, list };
	} catch (e) {
		console.error(e);
		return { province: [], list: []};
	}
};

export const getSize = async () => {
	try {
		const response = await axios.get(`${SERVICES.GET_SIZE}`);
		const size = response.data.map((item) => ({
			...item
		}));

		return size;
	} catch (e) {
		console.error(e);
		return [];
	}
};
