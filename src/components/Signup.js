import React,{Component} from 'react'
import Header from './Header'
import { Field , reduxForm} from 'redux-form'
import * as firebase from 'firebase'
import { bindActionCreators,compose } from 'redux';
import { userLogin } from '../actions/userLogin';
import { connect } from 'react-redux';

class Signup extends Component{
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
                    <small id={field.name+"Help"} className="form-text text-muted col-md-2 ">{touched ? error : ''}</small>
                </div>
            </div>
        );
    }

    onSubmit(values){
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then(function(){
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    var uid = user.uid
                    firebase.database().ref('users/' + uid).set({
                        username: values.username,
                        email: values.email,
                    })
                }
                else{
                    console.log("user not login")
                }
            })
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
        })
        var userData = {}
        userData.uid = firebase.auth().currentUser.uid
        userData.username = values.username
        userData.email = values.email
        this.props.userLogin(userData)
        this.props.history.push('/login')
    }

    render(){
        const { handleSubmit } = this.props
        return(
            <Header>
                <div className="container-fluid">
                        <h1>Sign Up</h1>
                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <Field
                            label="Email"
                            name="email"
                            type="text"
                            placeholder="Enter Email"
                            component={this.renderField}
                        />
                        <Field
                            label="Username"
                            name="username"
                            type="text"
                            placeholder="Enter Username"
                            component={this.renderField}
                        />
                        <Field
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            component={this.renderField}
                        />
                        <Field
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            placeholder="Enter Password Again"
                            component={this.renderField}
                        />
                        <button type="submit" className="btn btn-primary ml-2">Signup</button>
                        </form>
                </div>
            </Header>
        )
    }
}

function validate(values){ //value in form
    const errors = {}
    if(!values.email || values.email.length < 8){
        errors.email = 'Please enter email that have length more than 8 character'
    }

    if(!values.username || values.username.length < 8){
        errors.username = 'Please enter username that have length more than 8 character'
    }

    if(!values.password || values.password.length < 8 ){
        errors.password = 'Please enter password that have length more than 8 character'
    }

    if(!values.confirmPassword || values.confirmPassword.length < 8){
        errors.confirmPassword = 'Please enter confirm password that have length more than 8 character'
    }

    if(values.password !== values.confirmPassword){
        errors.confirmPassword = "Password don't match"
    }
    return errors
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
        validate,
        form: 'signup',
    }),
    connect(mapStateToProps,mapDispatchToProps)
)(Signup)
