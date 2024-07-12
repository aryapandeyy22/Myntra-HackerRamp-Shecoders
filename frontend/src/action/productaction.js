import axios from 'axios';

export const fetchProductsRequest = () => ({
    type: 'FETCH_PRODUCTS_REQUEST'
});

export const fetchProductsSuccess = (products) => ({
    type: 'FETCH_PRODUCTS_SUCCESS',
    payload: products
});

export const fetchProductsFailure = (error) => ({
    type: 'FETCH_PRODUCTS_FAILURE',
    payload: error
});

export const fetchProducts = () => {
    return async (dispatch) => {
        dispatch(fetchProductsRequest());
        try {
            const response = await axios.get('http://localhost:3000/api/thrift/h/all_items');
            dispatch(fetchProductsSuccess(response.data));
        } catch (error) {
            dispatch(fetchProductsFailure(error.message));
        }
    };
};
