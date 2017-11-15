import React,{Component} from 'react'
import Header from './Header'
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class PetList extends Component{

    state = {
        petData: null
    }

    renderpets(){
        return _.map(this.state.petData,pets => {
            return _.map(pets,pet => {
                console.log(pet)
                return(
                    <li className='list-group-item'>
                        {pet.petName}
                    </li>
                )
            })
        })
    }

    componentDidMount(){
        let petData
        let root = this
        if(this.props.user){
            firebase.database().ref('/pets').once('value').then(function(snapshot){
                var valueFromFirebase = snapshot.val()
                //.orderByChild("username").equalTo(this.props.user.username)
                petData = valueFromFirebase
                console.log('ownerr',this.props.user);
                console.log('pet data:',petData);
            })
            .then(function() {
                root.setState({petData:petData})
            })
        }
    }

    render(){
        if(!this.props.user){
            return(
                <Header>
                    <div>this is your first page</div>
                </Header>
            )
        }
        else{
            return(
                <Header>
                      <div>
                        <button className="btn btn-primary ml-2">
                            <Link to="/petAdd">Add pet</Link>
                        </button>
                      </div>
                    <h1 className="ml-2">All pet</h1>
                    <ul className='list-group'>
                        {this.renderpets()}
                    </ul>
                </Header>
            )
        }

    }
}

function mapStateToProps(state){
    return{
      user: state.user,
    };
}


export default connect(mapStateToProps)(PetList)
