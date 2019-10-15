import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux';
import { IconButton, Tabs, Tab, Button, FormControl } from '@material-ui/core';
import { Link, Route } from 'react-router-dom';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';
import ReactHtmlParser from 'react-html-parser';
import CourseComments from '../CourseComments/CourseComments' ; 
import Accessinfo from '../AccessInfo/AccessInfo'

// single page course cmp 
class CouresDetail extends Component {


  state = {
    value: 0,
    // selectedEpisode: {}
    selectedEpisode: []

  }

  downloadButtonClicked = () => {
    console.log(`youre downloadin soon`);
  }
  handleChange = (event, value) => {
    this.setState(prevState => {
      return {
        value
      }
    });
  }

  componentDidMount = () => {
    window.scroll(0, 0);
  }

  episdoeItemMoreInfoClicked = (index) => {


    const newArray = [...this.state.selectedEpisode];

    if (newArray[index]) {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = false;
      }
    } else {
      for (let i = 0; i < newArray.length; i++) {
        newArray[i] = false;
      }
      newArray[index] = true;
    }

    this.setState({
      selectedEpisode: newArray
    });

  }

  registerCourse = () => {

    this.props.registerCourse();
  }
  render() {

    let content = null;
    let tabsConetnt = null;
    switch (this.state.value) {
      case 0:
        // episodes
        tabsConetnt = this.props.auth ? (
        <div className="course__episodes">

        <ul className="episode__list">
          {this.props.data ? this.props.data.episodes.map((e, i) => {

            let TyepeEpisdoe = null;
            switch (e.type) {
              case "cash":
                TyepeEpisdoe = "نقدی"
                break;
              case "free":
                TyepeEpisdoe = "رایگان";
                break;
              case "vip":
                TyepeEpisdoe = "عضویت ویژه";
                break;
              default:
                TyepeEpisdoe = "رایگان";
                break;
            }

            let control = null;
            if (this.props.canUseCourse) {
              control = (
                this.state.selectedEpisode[i] ? (
                  <React.Fragment>
                    <IconButton
                      className="episode__donwloadButton"
                      onClick={() => this.episdoeItemMoreInfoClicked(i)}
                    >
                      <IoIosArrowDropup />
                    </IconButton>

                    <IconButton
                      className="episode__donwloadButton"
                      onClick={() => this.downloadButtonClicked()}
                    >
                      <FaCloudDownloadAlt />
                    </IconButton>
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      <IconButton
                        className="episode__donwloadButton"
                        onClick={() => this.episdoeItemMoreInfoClicked(i)}>
                        <IoIosArrowDropdown />

                      </IconButton>

                      <IconButton
                        className="episode__donwloadButton"
                        onClick={() => this.downloadButtonClicked()}
                      >
                        <FaCloudDownloadAlt />
                      </IconButton>
                    </React.Fragment>
                  )
              )
                } else {
                  control = <p> برای مشاهده و دانلود دوره لطفا در دوره ثبت نام کنید!</p>
                }
                return (
                  <React.Fragment>
                    <li className="episode__listItem" key={e.id}>
                      <a className="episode__link">
                        <span className="episode__counter">{i}</span>
                        <span className="episode__name">
                          {e.title}
                        </span>

                        <span className="episode__type">
                          {TyepeEpisdoe}
                        </span>
                      </a>
                      {control}


                      <div className={['episode__detail', this.state.selectedEpisode[i] ? 'episode__detail--open' : 'episode__detail--close'].join(' ')}>
                        <div className="episode__detail--body">
                          <h2 className="heading__secondary">
                            {e.title}
                          </h2>
                          {ReactHtmlParser(e.body)}
                        </div>

                        <video
                          controls
                          className="video"
                          height="70%"
                          width="100%"
                          controlsList="nodownload"
                          className="episode__detail-video">
                          <source src={'http://localhost:8080/' + e.videoUrl} type="video/mp4" />
                          <source src={e.videoUrl} type="video/ogg" />
                        </video>
                      </div>

                    </li>

                  </React.Fragment>
                )
              }) : null}

            </ul>
          </div>
        ) : 'برای مشاهده ی ویدیو ها باید وارد سایت شوید';
        break;





      case 1:
        // course detail def 
        tabsConetnt = (
          <div className="course__descriptions">
            {this.props.data ? ReactHtmlParser(this.props.data.body) : "Loading..."}

          </div>)

        break;
      case 2:
        // comments 
        tabsConetnt = (
          <CourseComments data = {this.props.data} auth={this.props.auth}  sendComment={this.props.sendComment}/>
         )

        break;
      default:
        break;
    }

    if (this.props.data) {


      let accessInfo = null;

      if (this.props.auth && !this.props.canUseCourse) {
        switch (this.props.data.type) {
          case 'free':
            accessInfo = (
              
                  <Accessinfo
                    registerCourse = {this.registerCourse}
                    buttonText=" ثبت نام در دوره"
                    accessTxt = "این دوره رایگان است"
                  />
            );
            break;
          case 'vip':
            accessInfo = (
      
                <Accessinfo
                registerCourse = {this.registerCourse}
                buttonText=" تهیه ی عضویت ویژه"
                accessTxt = "برای دسترسی به این دوره باید عضویت ویژه داشته باشید"
              />
            
            );
            break;
          case 'cash':
            accessInfo = (
                <Accessinfo
                  registerCourse = {this.registerCourse}
                  buttonText="خرید وثبت نام در دوره"
                  accessTxt = " این دوره نقدی است"
              />
            );
            break
        }
      }
      else if (this.props.canUseCourse) {
        accessInfo = 'شما برای همیشه به این دوره دسترسی دارید!! ';
      }
      else {
        accessInfo = 'برای مشاهده ی جزییات لطفا واردسایت شوید ';

      }
      content = (
        <Aux>
          <header className="course__header">
            <h1 className="heading__first margin_bottom_min course__title">
              {this.props.data.title}
            </h1>
          </header>
          <div className="course__imageContainer margin_bottom_min">
            <img className="course__image" src={`http://localhost:8080/${this.props.data.file}`} />
          </div>

          <div className="course__accessInfo">
            {accessInfo}
          </div>
          <section className="course__details">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="جلسات" className="tab" />
              <Tab label="توضیحات" className="tab" />
              <Tab label="نظرات" className="tab" />

            </Tabs>

            <div className="course__details-area">
              {tabsConetnt}
            </div>
          </section>
        </Aux>
      )
        ;
    } else {
      content = "Loading ....";
    }

    return (
      <div className="courses__details">
        {content}
      </div>
    )
  }
}







export default CouresDetail; 
