

import React from 'react';
import { Button } from '@material-ui/core';
import Translate from 'react-translate-component' ; 

const authenticateButton = (props) => {
  return (
    <div className="navigation__authButtons">

      {props.auth.user ?
        (<aux
        >        <Button
          onClick={props.panelClicked}
          title=""
          color="secondary"
          className="button button__transparent academy__header-searchBar--button navigation__authButtons--panleButton">
               
            <Translate content="Navigation.panelBtn" component="span" />
               </Button>
          <Button
            onClick={props.logout}
            title=""
            color="secondary"
            variant='fab'
            className="button  academy__header-searchBar--button navigation__authButtons--panleButton">
            <Translate content="Navigation.logoutBtn" component="span" />

            
                    </Button>

        </aux>)
        : <Button
          title=""
          onClick={props.authClicked}
          className="button button__yellow button__radios academy__header-searchBar--button">
            <Translate content="Navigation.authBtn" component="span" />
              
               </Button>
      }


    </div>
  );
}

export default authenticateButton;