



import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import { connect } from 'react-redux';
import { getHome, getUserData, logout } from '../../store/actions';

import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';

class Home extends Component {
  
  state = {
    authPage: false
  }
  
  componentDidMount = () => {

    this.props.loadHome();
    this.props.loadUserData() ;
  }

  showAuthPage = () => {
    this.props.history.push('/auth')
    
  }

  showPanel = () => {
    this.props.history.push('/panel');
  }
  logout = () => {

    console.log('clicked');
    this.props.userLogout();
  }
  render() {
    return (
      <Typography component="header" className="home">
            <Header menus={this.props.menus}
              logout={this.logout}
              panelClicked={this.showPanel}
              authClicked={this.showAuthPage}
              auth={this.props.auth} />
      </Typography>
    )
  }
}

const mapDispatchToProps = dispatch => {

  return {
    loadHome: () => dispatch(getHome()),
    loadUserData: () => dispatch(getUserData()),
    userLogout: () => dispatch(logout())
  }
}


const mapStateToProps = state => {

  return {
    menus: state.home.menus,
    auth: state.auth
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home)); 