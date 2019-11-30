
import React from 'react';
import ContactInfo from '../ContactInfo/ContactInfo';
import { FaSearch } from 'react-icons/fa';
import Translate from 'react-translate-component';
const searchBar = (props) => {
    return (
        <div className={props.class}>
            <input
                type="text"
                className={props.inpClass}
                // placeholder="نام مقاله یا آموزش را جستوجوکنید!" 
                // placeholder={<Translate content="searchBar" />}
            />

            <Translate content="searchBar" component="span" className="pAbsolute" />
            <FaSearch
                className={props.iconClass}

            />

        </div>
    );
}

export default searchBar;