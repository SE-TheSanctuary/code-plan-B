import React,{Component} from 'react'
import Header from './Header'
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class ShopList extends Component{

    state = {
        shopData: null
    }

    renderShops(){
        return _.map(this.state.shopData,shops => {
            return _.map(shops,shop => {
                console.log(shop)
                return(
                    <li className='list-group-item'>
                        {shop.shopName}
                    </li>
                )
            })
        })
    }

    componentDidMount(){
        let shopData
        let root = this
        if(this.props.user){
            firebase.database().ref('/shops').once('value').then(function(snapshot){
                var valueFromFirebase = snapshot.val()
                shopData = valueFromFirebase
            })
            .then(function() {
                root.setState({shopData:shopData})
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
                    <div>welcome {this.props.user.username}</div>
                    <button className="btn btn-primary ml-2">
                        <Link to="/shopAdd">Add Shop</Link>
                    </button>
                    <h1 className="ml-2">All Shop</h1>
                    <ul className='list-group'>
                        {this.renderShops()}
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


export default connect(mapStateToProps)(ShopList)
