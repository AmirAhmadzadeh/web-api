import React, { useEffect } from 'react';

import { connect } from 'react-redux';

import Logo from '../../components/Logo/Logo';

import {

  Button,
  
  Typography

} from '@material-ui/core';

import SearchBar from '../../components/TopHeader/SearchBar/SearchBar';

import CourseDetial from '../../components/Courses/CourseDetails/CouresDetail';

import Courses from '../../components/Courses/Courses';

import { FaArrowAltCircleLeft } from 'react-icons/fa';

import SideWrapperUi from '../../components/UI/SideWrapper';

import {

  getAcademy,

  getSinglePageCourseInfo,

  getUserData,

  registerCourse,

  getCanUseCourseForUser,

  sendComment

} from '../../store/actions/';


import WithClass from '../../hoc/WithClass/WithClass';

import useSinglePageCourse from '../../hooks/useSinglePageCourse'

import Translate from 'react-translate-component' ;


function Academy(props) {

  const [showSinglePageCourse, setShowSinglePageCourse] = useSinglePageCourse(false);

  useEffect(() => {

    // console.log('hello from useEff ')
    props.loadCourses();

    props.loadUserData();

  } , [] ) ; 

  function handleClickItem(courseId) {

    props.loadSingleCoursePage(courseId);

    props.getCanUse(courseId);

    setShowSinglePageCourse(true);

  }

  // function switchToAllCourses  ()  {
  //   setShowSinglePageCourse(false);
  // }

  function getContent() {

    if (showSinglePageCourse) {

      return (

        <CourseDetial

          sendComment={handleSendCm}

          data={props.selectedCourse}

          auth={props.auth.auth}

          registerCourse={registerCourse}

          canUseCourse={props.canUseCourse}

        />

      )

    }

    return (


      <React.Fragment>

        <SideWrapperUi />

        <WithClass classes="academy__middleTextArea">


          <WithClass classes="academy__middleTextArea--title">

            <h1 className="heading__first" >

               <Translate content="title" /> 

                 </h1>

            <p className=""> متخصص شوید</p>

          </WithClass>

          <Button

            variant="extendedFab"

            color="secondary"

            onClick={goToMainPage}

            className="button academy__middleTextArea-button"

          >  بازگشت به صفحه ی اصلی <FaArrowAltCircleLeft />  </Button>

        </WithClass>

        <Courses

          courses={props.courses}

          ItemClicked={handleClickItem}

        />

      </React.Fragment>

    )


  }

  function registerCourse() {

    // console.log(props.selectedCourse)

    props.registerCourse(props.selectedCourse);

  }

  function goToMainPage() {

    props.history.push('/');

  }


  function handleSendCm(cm) {

    //  console.log(props.auth.user)
    const comment = { comment: cm, user: props.auth.user }

    props.sendComment(comment);

  }

  const content = getContent();

  return (

    <WithClass classes="academy">

      <Typography component="header" className="academy__header">

        <nav className="academy__header-navigation">

          <WithClass classes="academy__header--logo">

            <Logo

              class=""

              iconClass="logo"

            />

            <div className="academy__header--logo-brand">

              <h2 className="academy__header--logo-brand-1 heading__first"> <Translate content="topHeader.title"/></h2>

              <h1 className="academy__header--logo-brand-sub  headin__secondary">
              <Translate content="topHeader.subTitle"/>
              </h1>

            </div>

          </WithClass>



          <WithClass classes="academy__searchBar">


            <SearchBar

              class="academy__searchBar"

              inpClass="academy__searchBar--inp"

              iconClass="academy__searchBar--icon"

            />

          </WithClass>

        </nav>

      </Typography>

      {content}

    </WithClass>

  );

}


// 
const mapDispatchToProps = dispatch => {

  return {

    loadCourses: () => dispatch(getAcademy()),

    loadSingleCoursePage: (id) => dispatch(getSinglePageCourseInfo(id)),

    loadUserData: () => dispatch(getUserData()),

    registerCourse: (course) => dispatch(registerCourse(course)),

    getCanUse: (id) => dispatch(getCanUseCourseForUser(id)),

    sendComment: (cm) => dispatch(sendComment(cm))

  }

}

const mapStateToProps = state => {

  return {

    courses: state.academy.courses,

    selectedCourse: state.academy.selectedCourse,

    canUseCourse: state.academy.canUseCourse,

    auth: state.auth
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Academy);
