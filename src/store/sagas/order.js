import { put } from 'redux-saga/effects';
import axios from "../../axios-order";
import * as actions from '../actions'

export function* purchaseBurgerSaga(action){
    yield put(actions.orderBurgerStart())
    try{
        const response = yield axios.post('/orders.json',action.orderData);
        yield put(actions.orderBurgerSuccess(response.data.name,action.orderData))
    }catch(error){
        yield put(actions.orderBurgerFail(error))
    }

}

export function* fetchOrderSaga(action){
   
    yield put(actions.fetchOrderStart());
    try{
        const response = yield axios.get("/orders.json");
        const fetchedOrder = [];
        for (let key in response.data) {
            fetchedOrder.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrderSuccess(fetchedOrder))
    }catch(error){
        yield put(actions.fetchOrderFailed(error))
    }

}