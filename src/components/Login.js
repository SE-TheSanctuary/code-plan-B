import React,{Component} from 'react'
import {Field , reduxForm} from 'redux-form'
import Header from './Header'
import * as firebase from 'firebase'
import { userLogin } from '../actions/userLogin';
import { bindActionCreators,compose } from 'redux';
import { connect } from 'react-redux';

class Login extends Component{

    renderField(field){
        const {meta: {touched,error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label className="ml-2">{field.label}</label>
                <div className="row ml-2">
                <input 
                    type={field.type} 
                    className="form-control col-md-4" 
                    id={"loginForm"+field.name} aria-describedby={field.name+"help"}
                    placeholder={field.placeholder}
                    {...field.input} />
                </div>
            </div>
        );
    } 

    onSubmit(values){
        let userLoginAction = this.props.userLogin
        let router = this.props.history
        //console.log(values)
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        });
        let userData = {}
        userData.uid = firebase.auth().currentUser.uid
        userData.email = values.email
        firebase.database().ref('/users/' +  userData.uid).once('value')
        .then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
            userData.username = username
        })
        .then(function(){
            userLoginAction(userData)
            router.push('/')
        })
    }

    render(){
        const { handleSubmit } = this.props
        if(!this.props.user){
            return(
                <Header>
                    <div className="container-fluid">
                        <h1>Log In</h1>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter Email"
                            component={this.renderField}
                        />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            component={this.renderField}
                        />
                        <button type="submit" className="btn btn-primary ml-2">Login</button>
                        </form>
                    </div>
                </Header>
            )
        }
        else{
            return(
                <Header>
                    <h1>Log In By {this.props.user.username}</h1>
                </Header>
            )
        }
              
    }
}


function mapStateToProps(state){
    return {
        user : state.user
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({userLogin: userLogin},dispatch);
}

export default compose(
    reduxForm({
        form: 'login',
    }),
    connect(mapStateToProps,mapDispatchToProps)
)(Login)
