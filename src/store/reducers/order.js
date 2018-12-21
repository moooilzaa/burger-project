import * as actionTypes from "../actions/actionTypes";
import {updateObject} from '../utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const deleteResult = (state,action) =>{
    const updatedArray = state.orders.filter(
        result => result.id !== action.orderId);
        console.log(updatedArray)
    return updateObject(state, { results: updatedArray });
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ORDER_INIT:
			return updateObject(state,{
                purchased: false
            })
        case actionTypes.ORDER_BURGER_START:
            return updateObject(state,{
                loading: true
            })

		case actionTypes.ORDER_BURGER:
			const newOrder = {
				...action.orderData,
				id: action.orderId
            };
            const updateState = {
                orders: state.orders.concat(newOrder),
				loading: false,
				purchased: true
            }
            return updateObject(state,updateState)

        case actionTypes.ORDER_BURGER_FAIL:
            return updateObject(state,{
                loading: false
            })
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state,{
                loading: true
            })

        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state,{
                orders: action.orders,
                loading: false
            })

        case actionTypes.FETCH_ORDER_FAILED:
            return updateObject(state,{
                loading: false
            })
        case actionTypes.DEL_ORDER:
            return  deleteResult(state,action)
		default:
			return state;
	}
};

export default reducer;
