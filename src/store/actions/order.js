import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const orderBurger = (orderData) => {
    return dispatch => {
        dispatch(orderBurgerStart())
        axios.post('/orders.json',orderData)
        .then(response => {
            console.log(response.data)
            dispatch(orderBurgerSuccess(response.data.name,orderData))
        })
        .catch(error => {
            dispatch(orderBurgerFail(error))
        });
    }
}

export const orderBurgerSuccess = (id,orderData) => {
    return {
        type: actionTypes.ORDER_BURGER,
        orderId: id,
        orderData: orderData
    }
}

export const orderBurgerFail = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAIL,
        error: error
    }
}

export const orderBurgerStart = () => {
    return{
        type: actionTypes.ORDER_BURGER_START
    }
}

export const orderInit = () => {
    return{
        type: actionTypes.ORDER_INIT
    }
}

//--------------------------- ORDER PAGE

export const fetchOrder = () => {
   
    return dispatch => {
        dispatch(fetchOrderStart())
        axios
        .get("/orders.json")
        .then(res => {
            
            const fetchedOrder = [];
            for (let key in res.data) {
                fetchedOrder.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrder))
        })
        .catch(err => {
            dispatch(fetchOrderFailed(err))
        });
    }
    
}

export const fetchOrderSuccess = (order) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders:order
    }
}

export const fetchOrderFailed = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAILED,
        error:error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const DelOrder = (orderId) =>{

    // const httpReqHeaders = {
    //   'Content-Type': 'application/json'
    // };
    // const axiosConfigObject = {headers: httpReqHeaders}; 

    console.log("orderId: " + orderId);
    return dispatch => {
        axios.get("/orders.json")
        .then(response => {
            dispatch(Del_status(orderId))
        })
    }
    

}

export const Del_status = (orderId) => {
    return{
        type: actionTypes.DEL_ORDER,
        orderId: orderId
    }
}

