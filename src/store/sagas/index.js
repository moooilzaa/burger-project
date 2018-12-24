import * as actionTypes from "../actions/actionTypes";

import { takeEvery, all, takeLatest } from "redux-saga/effects";

import {initIngredientsSaga} from './burgerBuilder'
import { purchaseBurgerSaga,fetchOrderSaga } from './order'

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);

}

export function* watchOrder(){
    yield all([
        takeLatest(actionTypes.PURCAHSE_BURGER, purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_ORDER, fetchOrderSaga)
    ]);

}