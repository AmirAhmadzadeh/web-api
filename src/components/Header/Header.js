
import React from 'react';
import Navigation from '../Navigation/Navigation';
import TopHeader from '../TopHeader/TopHeader';

import { Typography, Divider } from '@material-ui/core';


export default (props) => (
  <header className="header">
        <TopHeader />
        <Divider />
        <Navigation
          logout={props.logout}
          menuItems={props.menus} panelClicked={props.panelClicked} authClicked={props.authClicked} auth={props.auth} />
  </header>
);
