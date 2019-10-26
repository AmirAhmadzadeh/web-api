


import React from 'react';

import CourseItem from './CourseItem/CourseItem';

import WithClass from '../../hoc/WithClass/WithClass';




export default (props) => (
    <WithClass classes="courses">

        <WithClass classes="row">
            {
                props.courses ? props.courses.map(item => {
                    return (
                        <CourseItem
                            key={item._id}
                            data={item}
                            courseItemClicked={props.ItemClicked}

                        />
                    )
                }) : "Loading ..."
            }
        </WithClass>
    </WithClass>
); 
