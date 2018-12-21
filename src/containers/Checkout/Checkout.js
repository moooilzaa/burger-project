import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
	// state = {
	// 	ingredients: {},
	// 	totalPrice: 0
	// };
	// componentDidMount() {
	// 	const query = new URLSearchParams(this.props.location.search);
	// 	const ingredients = {};
	// 	let price = 0;
	// 	for (let param of query.entries()) {
	// 		//['salad','1']
	// 		if (param[0] === "price") {
	// 			price = param[1];
	// 		} else {
	// 			ingredients[param[0]] = +param[1];
	// 		}
	// 	}
	// 	this.setState({ ingredients: ingredients, totalPrice: price });
	// }


	CancelHandler = () => {
		this.props.history.goBack();
	};

	ContinueHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		let summary = <Redirect to="/" />;
		
		if (this.props.ings) {
			const purchaseRedirect = this.props.purchased ? <Redirect to ='/'/> : null
			summary = (
				<div>
				{purchaseRedirect}
				<CheckoutSummary
					ingredients={this.props.ings}
					CheckoutCancel={this.CancelHandler}
					CheckoutContinue={this.ContinueHandler}
				/>
				<Route
					path={this.props.match.path + "/contact-data"}
					component={ContactData}
					// render={props => (
					// 	<ContactData
					// 		ingredients={this.props.ingredients}
					// 		price={this.props.totalPrice}
					// 		{...props}
					// 	/>
					// )}
				/></div>
			);
		}
		return summary;

	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
