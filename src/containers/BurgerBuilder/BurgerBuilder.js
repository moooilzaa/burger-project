import React, { Component } from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";



class BurgerBuilder extends Component {
	// constructor(props){
	//     super(props);
	//     this.state = {...}
	// }
	state = {
		purchasing: false,
		loading: false
	};

	componentDidMount() {
		console.log(this.props);
		axios
			.get("https://react-burger-t.firebaseio.com/ingredients.json")
			.then(response => {
				this.setState({ ingredients: response.data });
			});
	}

	updatePurchaseState(ingredients) {
		// const ingredients = {...this.state.ingredients};
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);

		// console.log('sum : '+sum)
		return sum > 0;
	}

	// addIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	const updateIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	updateIngredients[type] = updatedCount;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;

	// 	this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
	// 	this.updatePurchaseState(updateIngredients);
	// };

	// removeIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	const updateIngredients = { ...this.state.ingredients };
	// 	updateIngredients[type] = updatedCount;

	// 	const priceDeduction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceDeduction;

	// 	this.setState({ totalPrice: newPrice, ingredients: updateIngredients });
	// 	this.updatePurchaseState(updateIngredients);
	// };

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchaseContinueHandler = () => {
		// const queryParams = [];
		// for (let i in this.state.ingredients) {
		// 	queryParams.push(
		// 		encodeURIComponent(i) +
		// 			"=" +
		// 			encodeURIComponent(this.state.ingredients[i])
		// 	);
		// }
		// queryParams.push("price=" + this.state.totalPrice);
		// const queryString = queryParams.join("&");

		// this.props.history.push({
		// 	pathname: "/checkout",
		// 	search: "?" + queryString
		// });

		this.props.history.push('/checkout');
	};

	render() {
		// DO disable button
		const disableInfo = {
			...this.props.ings
		};
		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0;
			//{salad:true, meat:false,...}
		}

		let burger = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);
		let orderSummary = null;
		if (this.props.ings) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disableInfo}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						totalPrice={this.props.price}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);

			orderSummary = (
				<OrderSummary
					ingredients={this.props.ings}
					purchaseCancelled={this.purchaseCancelHandler}
					puchaseContinued={this.purchaseContinueHandler}
					price={this.props.price}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<Aux>
				<Modal
					show={this.state.purchasing}
					modelClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStatehToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}
const mapDispatchToProps = dispatch => {
	return{
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS , ingredientName: ingName }),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS , ingredientName: ingName})
	}
}

export default connect(mapStatehToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
