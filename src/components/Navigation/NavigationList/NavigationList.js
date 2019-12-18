
import React from 'react';
import NavigationItem from './../NavigationItem/NavigationItem';

const navigationList = (props) => {
    return (
        <ul className="navigation__list">

            
            <NavigationItem
                    link='/academy'
                    name='آکادمی'
                    class="navigation__item"
                    linkClass="navigation__link"
                />)
            
            
            {

                props.menuItems ? props.menuItems.map(item => {
                    return (
                        <NavigationItem
                            link={item.link}
                            name={item.name}
                            class="navigation__item"
                            linkClass="navigation__link"
                        /> ) 
                }) : null
            }
        </ul>
    );
}

export default navigationList;