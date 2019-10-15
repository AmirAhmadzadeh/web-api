
import React from 'react';   
import { Button } from '@material-ui/core';



const AccessInfo = (props) => {
    return ( 
        <React.Fragment>             
                 <div style={{ display: 'inline-block' }}> {props.accessTxt}  </div>

                <Button
                  type="submit"
                  className="button"
                  variant="contained"
                  onClick={props.registerCourse}

                >
                    {props.buttonText}

                </Button>

          </React.Fragment>
     );
}
 
export default AccessInfo;