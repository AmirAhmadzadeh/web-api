

import React from 'react';
import { Button } from '@material-ui/core';
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
            پنل مدیریت
               </Button>
          <Button
            onClick={props.logout}
            title=""
            color="secondary"
            variant='fab'
            className="button  academy__header-searchBar--button navigation__authButtons--panleButton">

            خروج
                    </Button>

        </aux>)
        : <Button
          title=""
          onClick={props.authClicked}
          className="button button__yellow button__radios academy__header-searchBar--button">
          ورود و ثبت نام
               </Button>
      }


    </div>
  );
}

export default authenticateButton;