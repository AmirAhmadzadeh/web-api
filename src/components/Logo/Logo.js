


import React from 'react'
import {
  IoLogoJavascript
} from 'react-icons/io';

const logo = (props) => {
    return (
        <a className={props.class} href="/">

            <IoLogoJavascript
                className={props.iconClass}
            />

        </a>
    );
}

export default logo;