
import React from 'react';
import ContactInfo from '../ContactInfo/ContactInfo';
import { FaSearch } from 'react-icons/fa' ;  

const searchBar = (props) => {
    return (
        <div className={props.class}>
            <input
                type="text"
                className={props.inpClass}
                placeholder="نام مقاله یا آموزش را جستوجوکنید!" />
            <FaSearch 
            className={props.iconClass} 
            
            />

        </div>
    );
}

export default searchBar;