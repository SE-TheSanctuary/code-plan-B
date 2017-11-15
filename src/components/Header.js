import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
const navColor = {
    backgroundColor : '#e7e7e7',
}

class NavigateBar extends Component {

    render(){
        //console.log(this.props.user)
        if(!this.props.user){
            return(
                <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-faded" style={navColor}>
                    <Link className="navbar-brand" to="/">Sanctuary</Link>
                    <div className="collapse navbar-collapse justify-content-end" id="nav-content">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                    {this.props.children}
                </div>
            );
        }
        else{
            return(
                <div>
                <nav className="navbar navbar-expand-sm navbar-light bg-faded" style={navColor}>
                    <Link className="navbar-brand" to="/">Sanctuary</Link>
                    <ul class="navbar-nav mr-auto">
                      <li class="nav-item">
                        <Link className="nav-link" to="/petlist">petlist</Link>
                      </li>
                      <li class="nav-item">
                        <Link className="nav-link" to="/shoplist">Shoplist</Link>
                      </li>
                    </ul>
                    <div className="collapse navbar-collapse justify-content-end" id="nav-content">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <div>Logged in as {this.props.user.username}</div>
                            </li>
                        </ul>
                    </div>
                </nav>
                    {this.props.children}
                </div>
            )
        }

    }

}
function mapStateToProps(state){
    return{
      user: state.user
    };
}
export default connect(mapStateToProps)(NavigateBar);
