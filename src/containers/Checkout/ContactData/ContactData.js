import React, {Component} from 'react'
import {connect} from "react-redux";
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-order'

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postcode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

         this.setState({loading: true});
        const order = {
            ingredient: this.props.ings,
            price: this.props.price,
            customer:{
                name: 'Max',
                address: {
                    streer: 'test street',
                    zipCode: '41351',
                    country: 'Thailand'
                },
                email:'test@mail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json',order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            // console.log('PURCHASING: '+this.state.purchasing);
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
        });

        console.log(this.props.ings)
    }

    render(){
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your name"></input>
                <input className={classes.Input} type="email" name="email" placeholder="Your email"></input>
                <input className={classes.Input} type="text" name="street" placeholder="street"></input>
                <input className={classes.Input} type="text" name="postcode" placeholder="postcode"></input>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData)
