import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../components/Logo/Logo';
import {
  Button
  ,Typography
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
  getCanUseCourseForUser ,
  sendComment
} from '../../store/actions/';
import WithClass from '../../hoc/WithClass/WithClass';


class Academy extends Component {

  state = {
    showSinglePageCourse: false
  }

  componentDidMount = () => {
    this.props.loadCourses();
    this.props.loadUserData();

  }

  handleClickItem = (courseId) => {

    this.props.loadSingleCoursePage(courseId);
    this.props.getCanUse(courseId);
    this.setState({
      showSinglePageCourse: true
    });
  }

  switchToAllCourses = () => {
    this.setState({
      showSinglePageCourse: false
    });
  }
  registerCourse = () => {
    // console.log(this.props.selectedCourse)
    this.props.registerCourse(this.props.selectedCourse);
  }

  goToMainPage = () => {
    this.props.history.push('/');
  }

  handleSendCm = (cm) => { 
    //  console.log('babay Im here ' , cm) ;
     console.log(this.props.auth.user)
      const comment = { comment : cm , user : this.props.auth.user  }
      this.props.sendComment(comment);
  }


  render() {
    let content = null;

    if (this.state.showSinglePageCourse) {
      content = (
        <CourseDetial
          sendComment={this.handleSendCm}
          data={this.props.selectedCourse}
          auth={this.props.auth.auth}
          registerCourse={this.registerCourse}
          canUseCourse={this.props.canUseCourse}
        />
      )
    } else {
      content = (

        <React.Fragment>
          <SideWrapperUi />
          <WithClass classes="academy__middleTextArea">

            <WithClass classes="academy__middleTextArea--title">
              <h1 className="heading__first" >
                دوره های آموزشی
                 </h1>
              <p className=""> متخصص شوید</p>

            </WithClass>

            <Button
              variant="extendedFab"
              color="secondary"
              onClick={this.goToMainPage}
              className="button academy__middleTextArea-button"
            >  بازگشت به صفحه ی اصلی <FaArrowAltCircleLeft />  </Button>
          </WithClass>
          <Courses
            courses={this.props.courses}
            ItemClicked={this.handleClickItem}
          />
        </React.Fragment>
      )
    }

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
                <h2 className="academy__header--logo-brand-1 heading__first"> آکادمی امیر</h2>
                <h1 className="academy__header--logo-brand-sub  headin__secondary">آموزش ۰ تا۱۰۰ طراحی وب</h1>
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
}


const mapDispatchToProps = dispatch => {

  return {
    loadCourses: () => dispatch(getAcademy()),
    loadSingleCoursePage: (id) => dispatch(getSinglePageCourseInfo(id)),
    loadUserData: () => dispatch(getUserData()),
    registerCourse: (course) => dispatch(registerCourse(course)),
    getCanUse: (id) => dispatch(getCanUseCourseForUser(id)),
    sendComment : (cm) => dispatch(sendComment(cm)) 
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




{/* <header component="header" className="academy__header">
            <nav component="nav" className="academy__header-navigation">
              <WithClass classes="academy__header--logo">
                <Logo
                  class=""
                  iconClass="logo"
                />
                <Typography component="h1" className="academy__header--logo-brand academy__header--logo-brand-1 heading__first">
                  آکادمی امیر</Typography>
                <Typography component="h2" className="academy__header--logo-brand-sub academy__header--logo-brand headin__secondary">
                  آموزش ۰ تا۱۰۰ طراحی وب</Typography>

              </WithClass>
              <ul className="academy__header-navigation-list ">
                <NavigationItem
                  name="صفحه ی اصلی"
                  link="/"
                  class="academy__header-navigation--item"
                  linkClass="academy__header-navigation--link"
                />
              </ul>
            </nav>

            <WithClass classes="academy__searchBar">

              <Button
                onClick={this.switchToAllCourses}
                title=""
                className="button button__transparent button__radios academy__header-searchBar--button">

                همه ی دوره ها
              </Button>

              <SearchBar
                class="academy__searchBar"
                inpClass="academy__searchBar--inp"
                iconClass="academy__searchBar--icon"
              />


              <Button title="" className="button button__yellow button__radios academy__header-searchBar--button">
                ورود و ثبت نام
               </Button>
            </WithClass>

          </header> */}
