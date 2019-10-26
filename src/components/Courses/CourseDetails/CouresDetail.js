import React, { useEffect } from 'react';

import { IconButton, Tabs, Tab } from '@material-ui/core';

import { FaCloudDownloadAlt } from 'react-icons/fa';

import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

import ReactHtmlParser from 'react-html-parser';

import CourseComments from '../CourseComments/CourseComments';

import Accessinfo from '../AccessInfo/AccessInfo'

import useValue from '../../../hooks/useValue';

import useEpisode from '../../../hooks/useEpisode';



function CouresDetail(props) {

  const [value, setValue] = useValue(0);

  const [selectedEpisode, setSelectedEpisode] = useEpisode([]);

  function handleChange(e, val) {

    setValue(val)

  }
  function downloadButtonClicked(props) {

    console.log(`download button clicked `);

  }


  function episdoeItemMoreInfoClicked(index) {

    setSelectedEpisode(index);

  }

  function registerCourse() {

    props.registerCourse();

  }
  function getTheTypeOfCourse(t) {

    switch (t) {

      case "cash":

        return "نقدی"

      case "free":

        return "رایگان";

      case "vip":

        return "عضویت ویژه";

      default:

        return "رایگان";

    }

  }

  function getContorollOnCourse(canUse, i) {

    if (canUse) {

      return (

        selectedEpisode[i] ? (

          <React.Fragment>

            <IconButton

              className="episode__donwloadButton"

              onClick={() => episdoeItemMoreInfoClicked(i)}

            >

              <IoIosArrowDropup />

            </IconButton>



            <IconButton

              className="episode__donwloadButton"

              onClick={() => downloadButtonClicked()}

            >

              <FaCloudDownloadAlt />

            </IconButton>

          </React.Fragment>

        ) : (

            <React.Fragment>

              <IconButton

                className="episode__donwloadButton"

                onClick={() => episdoeItemMoreInfoClicked(i)}>

                <IoIosArrowDropdown />



              </IconButton>



              <IconButton

                className="episode__donwloadButton"

                onClick={() => downloadButtonClicked()}

              >

                <FaCloudDownloadAlt />

              </IconButton>

            </React.Fragment>

          )

      )

    }

    return <p> برای مشاهده و دانلود دوره لطفا در دوره ثبت نام کنید!</p>

  }

  function getEpisodesInfo() {


    if (!props.auth) return 'برای مشاهده ی ویدیو ها باید وارد سایت شوید';

    return (
      <div className="course__episodes">

        <ul className="episode__list">

          {props.data ? props.data.episodes.map((e, i) => {

            let TyepeEpisdoe = getTheTypeOfCourse(e.type)

            let control = getContorollOnCourse(props.canUseCourse, i);

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



                  <div className={['episode__detail', selectedEpisode[i] ? 'episode__detail--open' : 'episode__detail--close'].join(' ')}>

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
    )

  }
  function getTabContent() {

    switch (value) {

      case 0:
        // episodes Info : 

        return getEpisodesInfo();

      case 1:
        // describe COurse  

        return (

          <div className="course__descriptions">

            {props.data ? ReactHtmlParser(props.data.body) : "Loading..."}


          </div>
        )

      case 2:

        // comments 

        return (

          <CourseComments data={props.data} auth={props.auth} sendComment={props.sendComment} />

        )

      default:

        break;
    }
  }

  function getAccessInfoAllert() {

    if (props.auth && props.canUseCourse) {

      switch (props.data.type) {

        case 'free':

          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText=" ثبت نام در دوره"

              accessTxt="این دوره رایگان است"
            />
          );

        case 'vip':
          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText=" تهیه ی عضویت ویژه"

              accessTxt="برای دسترسی به این دوره باید عضویت ویژه داشته باشید"
            />

          );

        case 'cash':

          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText="خرید وثبت نام در دوره"

              accessTxt=" این دوره نقدی است"
            />
          );

      }
    }
    else if (props.canUseCourse) {

      return 'شما برای همیشه به این دوره دسترسی دارید!! ';

    }
    else {

      return 'برای مشاهده ی جزییات لطفا واردسایت شوید ';

    }
  }

  function getContent() {

    if (props.data) {

      let accessInfo = getAccessInfoAllert();

      return (

        <React.Fragment>

          <header className="course__header">

            <h1 className="heading__first margin_bottom_min course__title">

              {props.data.title}

            </h1>

          </header>

          <div className="course__imageContainer margin_bottom_min">

            <img className="course__image" src={`http://localhost:8080/${props.data.file}`} />

          </div>

          <div className="course__accessInfo">

            {accessInfo}

          </div>

          <section className="course__details">

            <Tabs
              value={value}

              onChange={handleChange}

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

        </React.Fragment>
      );
    } else {

      return "Loading ...."; // soon add spinner 

    }
  }


  const tabsConetnt = getTabContent()

  const content = getContent()

  return (

    <div className="courses__details">

      {content}

    </div>
  )

}

export default CouresDetail;























