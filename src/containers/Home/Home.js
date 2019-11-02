



import React, { useEffect } from 'react'
import Header from '../../components/Header/Header';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getHome, getUserData, logout, getAcademy, registerCourse, getSinglePageCourseInfo, getCanUseCourseForUser } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import useBooleanState from '../../hooks/useBooleanState';
import Courses from './../../components/Courses/Courses';
import WithClass from '../../hoc/WithClass/WithClass';
import CourseDetial from '../../components/Courses/CourseDetails/CouresDetail';

function home(props) {
  const [authPage, setAuth] = useBooleanState(false);
  const [showCoursePage, setShowSinglePageCourse] = useBooleanState(false);

  useEffect(() => {
    loadHome();
    loadUserData();
    loadCourses();
  }, []);
  const canUseCourse = useSelector(state => state.academy.canUseCourse)
  const menus = useSelector(state => state.home.menus);
  const auth = useSelector(state => state.auth);
  const courses = useSelector(state => state.academy.courses)
  const dispatch = useDispatch();
  const loadHome = () => dispatch(getHome());
  const loadUserData = () => dispatch(getUserData());
  const userLogout = () => dispatch(logout());
  const loadCourses = () => dispatch(getAcademy());

  const showAuthPage = () => {
    props.history.push('/auth')
  }
  const showPanel = () => {
    props.history.push('/panel');
  }
  const logoutHandler = () => {
    // console.log('clicked');
    userLogout();
  }

  const handleSendCm = () => {

  }
  const registerCHandler = () => dispatch(registerCourse());
  const selectedCourse = useSelector(state => state.academy.selectedCourse)
  function registerCourseHandler() {
    registerCHandler(selectedCourse);
  }
  const loadSingleCoursePage = (id) => dispatch(getSinglePageCourseInfo(id));
  const getCanUse = (id) => dispatch(getCanUseCourseForUser(id));
  function handleClickItem(courseId) {
    loadSingleCoursePage(courseId);
    getCanUse(courseId);
    setShowSinglePageCourse(true);
  }

  if (showCoursePage) return (

    <WithClass classes="academy academy__home">
      <Button variant="contained"
        color="secondary"
        onClick={() => setShowSinglePageCourse(false)} > برگشت به صفحه ی اصلی ! </Button>
      <CourseDetial
        sendComment={handleSendCm}
        data={selectedCourse}
        auth={auth.auth}
        registerCourse={registerCourseHandler}
        canUseCourse={canUseCourse}
      />
    </WithClass>

  )
  return (
    <div>
      <Typography component="div" className="home">
        <Header menus={menus}
          logout={logoutHandler}
          panelClicked={showPanel}
          authClicked={showAuthPage}
          auth={auth} />
        <WithClass classes="academy academy__home">
          <Courses
            courses={courses}
            ItemClicked={handleClickItem}
          />
        </WithClass>
      </Typography>

    </div>
  )
}
export default withRouter(home); 