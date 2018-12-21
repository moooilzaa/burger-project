import React, { Component } from "react";
import {connect} from 'react-redux'
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {

	componentDidMount() {
	// 	axios
	// 		.get("/orders.json")
	// 		.then(res => {
	// 			console.log(res.data)
	// 			const fetchedOrder = [];
	// 			for (let key in res.data) {
	// 				fetchedOrder.push({
	// 					...res.data[key],
	// 					id: key
	// 				});
	// 			}
	// 			this.setState({ loading: false, orders: fetchedOrder });
	// 		})
	// 		.catch(err => {
	// 			this.setState({ loading: false });
	// 		});
		this.props.onFetchOrders()
	}

	render() {
		let orders = <Spinner/>
		if(!this.props.loading){
			orders = <div>
				{this.props.orders.map(order => (
					<Order key={order.id} ingredients={order.ingredient} price={order.price} clicked={() => this.props.onDelOrders(order.id)}/>
				))}
			</div>
		}
		return (
			<div>{orders}</div>
		);
	}
}

const mapStateToProps = state => {
	return{
		orders: state.order.orders,
		loading: state.order.loading
		
	};
};

const mapDispatchToProps = dispatch => {
	return{
		onFetchOrders: () => dispatch(actions.fetchOrder()),
		onDelOrders: (id) => dispatch(actions.DelOrder(id))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));
