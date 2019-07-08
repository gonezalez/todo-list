import axios from 'axios';

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

const getItems = () => (dispatch, getState) => {
    dispatch(setItemsLoading());
    axios
        .get('/api/todos', tokenConfig(getState))
        .then(res => dispatch(
                {
                    type: GET_ITEMS,
                    payload: res.data,
                }
            )
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

const deleteItem = id => (dispatch, getState) => {
    axios
        .delete(`/api/todos/${id}`, tokenConfig(getState))
        .then(res => dispatch(
                {
                    type: DELETE_ITEM,
                    payload: id,
                }
            )
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

const addItem = item => (dispatch, getState) => {
    axios
        .post('/api/todos', item, tokenConfig(getState))
        .then(res => dispatch(
            {
                type: ADD_ITEM,
                payload: res.data,
            }
        )
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));;
};

const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};

export {
    getItems,
    deleteItem,
    addItem,
    setItemsLoading,
}