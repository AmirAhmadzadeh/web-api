import React from 'react';

import ReactHtmlParser from 'react-html-parser';

import WithClass from '../../../hoc/WithClass/WithClass';

import { Typography } from '@material-ui/core';

export default (props) => {

    function handleCourseItemClicked() {

        props.courseItemClicked(props.data.id)

    }

    return (

        <WithClass classes="col-md-4 courses__item" clicked={handleCourseItemClicked}>

            <WithClass classes="courses__item-boxColor" />

            <img

                className="courses__item-image"

                src={props.data.file}
            />


            <Typography

                component="h1"

                className="heading__secondary">

                {props.data.title}

            </Typography>

            <WithClass classes="courses__item-text">
             
                  {ReactHtmlParser(props.data.body)}
            
            </WithClass>

            <footer className="courses__item-footer"></footer>
        
        </WithClass >
    )

}

