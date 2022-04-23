import * as types from "./actionsType";
import axios from "axios";

const getUsers = (users) => ({
	type: types.GET_USERS,
	payload: users,
});

const userDeleted = () => ({
	type: types.DELETE_USERS,
});

const userAdded = () => ({
	type: types.ADD_USER,
});

const userUpdated = () => ({
	type: types.UPDATE_USER,
});

const getUser = (user) => ({
	type: types.GET_SINGLE_USER,
	payload: user,
});

const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_API_DEV, REACT_APP_API_PROD } = process.env;

export const loadUsers = () => {
	return function (dispatch) {
		axios
			.get(`${devEnv ? REACT_APP_API_DEV : REACT_APP_API_PROD}`)
			.then((resp) => {
				dispatch(getUsers(resp.data));
			})
			.catch((error) => console.log(error));
	};
};

export const deleteUser = (id) => {
	return function (dispatch) {
		axios
			.delete(`${devEnv ? REACT_APP_API_DEV : REACT_APP_API_PROD}/${id}`)
			.then((resp) => {
				dispatch(userDeleted());
				dispatch(loadUsers());
			})
			.catch((error) => console.log(error));
	};
};

export const addUser = (user) => {
	return function (dispatch) {
		axios
			.post(`${devEnv ? REACT_APP_API_DEV : REACT_APP_API_PROD}`, user)
			.then((resp) => {
				dispatch(userAdded());
				dispatch(loadUsers());
			})
			.catch((error) => console.log(error));
	};
};

export const getSingleUser = (id) => {
	return function (dispatch) {
		axios
			.get(`${devEnv ? REACT_APP_API_DEV : REACT_APP_API_PROD}/${id}`)
			.then((resp) => {
				dispatch(getUser(resp.data));
			})
			.catch((error) => console.log(error));
	};
};

export const updateUser = (user, id) => {
	return function (dispatch) {
		axios
			.put(
				`${devEnv ? REACT_APP_API_DEV : REACT_APP_API_PROD}/${id}`,
				user,
			)
			.then((resp) => {
				dispatch(userUpdated());
				dispatch(loadUsers());
			})
			.catch((error) => console.log(error));
	};
};
