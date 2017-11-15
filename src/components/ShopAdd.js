import React,{Component} from 'react'
import Header from './Header'
import {Field , reduxForm} from 'redux-form'
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as firebase from 'firebase'
import { fetchShop } from '../actions/userLogin';

class ShopAdd extends Component{

    renderField(field){
        const {meta: {touched,error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <div className="row ml-2">
                <input
                    type={field.type}
                    className="form-control col-md-4"
                    id={"addShop "+field.name} aria-describedby={field.name+"help"}
                    placeholder={field.placeholder}
                    {...field.input} />
                </div>
            </div>
        );
    }

    onSubmit(values){
        let router = this.props.history
        console.log(values)
        if(this.props.user){
            firebase.database().ref('shops/' + this.props.user.uid).push().set({
                shopName: values.shopname,
                shopTel: values.phonenumber,
                shopLocation: values.location,
                shopAnimalType: values.animal,
                shopCreatedBy: this.props.user.username
            })
            .then(function(){
                router.push('/shoplist')
            })
        }
    }

    render(){
        const { handleSubmit } = this.props
        return(
            <Header>
                <div className="container-fluid">
                    <h1>Add Shop</h1>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <label className="ml-2">Shop Name</label>
                    <Field
                        name="shopname"
                        type="text"
                        placeholder="Enter your shop name"
                        component={this.renderField}
                    />
                    <label className="ml-2">Animal Type</label>
                    <div>
                        <label className="ml-2">
                        <Field
                            name="animal"
                            component="input"
                            type="radio"
                            value="dog"
                        />{' '}
                        dog
                        </label>
                        <label className="ml-2">
                        <Field
                            name="animal"
                            component="input"
                            type="radio"
                            value="cat"
                        />{' '}
                        cat
                        </label>
                        <label className="ml-2">
                        <Field
                            name="animal"
                            component="input"
                            type="radio"
                            value="bird"
                        />{' '}
                        bird
                        </label>
                    </div>
                    <label className="ml-2">Tel</label>
                    <Field
                        name="phonenumber"
                        type="text"
                        placeholder="Enter your phone number"
                        component={this.renderField}
                    />
                    <label className="ml-2">Location</label>
                    <Field
                        name="location"
                        type="text"
                        placeholder="Enter your location shop"
                        component={this.renderField}
                    />
                    <button type="submit" className="btn btn-primary ml-2">Add shop</button>
                    </form>
                </div>
            </Header>
        )
    }
}
function mapStateToProps(state){
    return {
        user : state.user
    };
}

export default compose(
    reduxForm({
        form: 'shopAdd',
    }),
    connect(mapStateToProps)
)(ShopAdd)
