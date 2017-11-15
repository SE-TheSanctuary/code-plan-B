import React,{Component} from 'react'
import Header from './Header'
import * as firebase from 'firebase'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import _ from 'lodash';

class Index extends Component{

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
                <div class="jumbotron">
                  <h1 class="display-3">The-Sanctua</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                      <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                  </div>
                </Header>
            )
        }
        else{
            return(
                <Header>

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


export default connect(mapStateToProps)(Index)
