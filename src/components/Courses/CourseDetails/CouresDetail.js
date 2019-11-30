import React, { useEffect } from 'react';

import { IconButton, Tabs, Tab } from '@material-ui/core';

import { FaCloudDownloadAlt } from 'react-icons/fa';

import { IoIosArrowDropdown, IoIosArrowDropup } from 'react-icons/io';

import ReactHtmlParser from 'react-html-parser';

import CourseComments from '../CourseComments/CourseComments';

import Accessinfo from '../AccessInfo/AccessInfo'

import useValue from '../../../hooks/useValue';

import useEpisode from '../../../hooks/useEpisode';
import Translate from 'react-translate-component' ; 

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
        return getEpisodesInfo();
      case 1:
        return (
          <div className="course__descriptions">
            {props.data ? ReactHtmlParser(props.data.body) : "Loading..."}
          </div>
        )
      case 2:
        return (
          <CourseComments data={props.data} auth={props.auth} sendComment={props.sendComment} />
        )
      default:
        break;
    }
  }

  function getAccessInfoAllert() {

    if (props.auth && !props.canUseCourse) {

      switch (props.data.type) {

        case 'free':

          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText={<Translate content="freeCourseAccess.buyBtn"  />}

              accessTxt={<Translate content="freeCourseAccess.accessTxt"  />}
            />
          );

        case 'vip':
          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText={<Translate content="vipCourseAccess.buyBtn"  />}

              accessTxt={<Translate content="vipCourseAccess.accessTxt"  />}
            />

          );

        case 'cash':

          return (

            <Accessinfo

              registerCourse={registerCourse}

              buttonText={<Translate content="cashCourseAccess.buyBtn"  />}

              accessTxt={<Translate content="cashCourseAccess.accessTxt"  />}
            />
          );

      }
    }
    else if (props.canUseCourse) {

      return <Translate content="courseAccessInfo.accessAllTheTime" />;

    }
    else {

      return <Translate content="courseAccessInfo.forAccessLogin" />;

    }
  }

  function getContent() {

    if (props.data) {


      return (

        <React.Fragment>
          <header className="course__header">
            <h1 className="heading__first margin_bottom_min course__title">
              {props.data.title}
            </h1>
          </header>
          <div className="course__imageContainer margin_bottom_min">
            <img className="course__image" src={`${props.data.file}`} />
          </div>
          <div className="course__accessInfo">
            {getAccessInfoAllert()}
          </div>
          <section className="course__details">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label={<Translate content="courseDetails.sectionsTab"/>} className="tab" />
              <Tab label={<Translate content="courseDetails.describe"/>} className="tab" />
              <Tab label={<Translate content="courseDetails.comments"/>} className="tab" />
            </Tabs>
            <div className="course__details-area">
              { getTabContent() }
            </div>
          </section>
        </React.Fragment>
      );
    } else {
      return "Loading ...."; // soon add spinner 
    }
  }


  

  return (

    <div className="courses__details">
      {getContent()}
    </div>
  )

}

export default CouresDetail;























