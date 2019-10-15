

import React from 'react'  ;  
import NavigationList from './NavigationList/NavigationList' ;  

import AuthenticateButtons from './AuthenticateButtons/AuthenticateButtons' ;

const navigation = (props) => {
    return ( 
        <nav className="navigation">
            
            <NavigationList menuItems={props.menuItems} />
            <AuthenticateButtons
             logout = {props.logout}
             authClicked ={props.authClicked}
             panelClicked={props.panelClicked} 
             auth={props.auth}/>
        </nav>
     );
}
 
export default navigation;