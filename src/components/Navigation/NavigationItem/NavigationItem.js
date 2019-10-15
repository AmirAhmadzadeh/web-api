

import React from 'react' ;
import { NavLink }  from 'react-router-dom' ; 


const navigationItem = (props) => {
    return ( 
        <li className={props.class} >
            <NavLink 
               to={props.link}
               className={props.linkClass}
             >
               {props.name} 
             </NavLink>

        </li>
     );
}
 


export default navigationItem;