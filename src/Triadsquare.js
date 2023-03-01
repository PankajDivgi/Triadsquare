import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nasa from "./Images/nasa.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
// import Moment from "moment";
import Modal from "react-bootstrap/Modal";

const Triadsquare = () => {
  const [nasaData, setNasaData] = useState([]);
  const [startDate, setStartDate] = useState("2022-10-01");
  const [endDate, setEndDate] = useState("2022-10-29");
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${startDate}&end_date=${endDate}&thumbs=true`
      )
      .then((res) => {
        console.log(res.data);
        setNasaData(res.data);
      });
  }, []);

  const [show, setShow] = useState(false);


  return (
    <>
      <div className="nav-bar">
        <div className="image-name">
          <img src={Nasa} width="80px" alt="nasa_logo" />
          <h6>Pankaj Divgi</h6>
        </div>
        <p>Astronomy Picture of the Day</p>
      </div>
      {nasaData.length >= 1 ? (
        <>
          <div className="spotlight">
            <div>
              <h5>{nasaData[nasaData.length - 1]?.title}</h5>
              <p>{nasaData[nasaData.length - 1]?.explanation}</p>
              <p>
                Author:{" "}
                {nasaData[nasaData.length - 1]?.copyright
                  ? nasaData[nasaData.length - 1]?.copyright
                  : "Unknown"}
              </p>
            </div>

            <img
              src={nasaData[nasaData.length - 1]?.url}
              width="300px"
              height="250px"
              alt="latest_image"
              onClick={() => setShow(true)}
              style={{ cursor: "pointer" }}
            />

            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
              <Modal.Body>
                <img
                  src={nasaData[nasaData.length - 1]?.url}
                  width="100%"
                  height="100%"
                  alt="latest_image"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShow(false)}
                />
              </Modal.Body>
            </Modal>
          </div>
          <div style={{ width: "100%" }}>
            <Scroll2 nasaData={nasaData} />
          </div>
        </>
      ) : (
        <div className="loading">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )}
    </>
  );
};

const Scroll2 = (props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  const [scrollShow, setScrollShow] = useState(false);
  const [imageUrl, setImageUrl] = useState(false);
  function handleShow(data) {
    setImageUrl(data);
    setScrollShow(true);
  }
  const rows = [];
  for (let i = 0; i < props.nasaData.length; i += 7) {
    rows.push(
      <div key={i}>
        <Slider {...settings}>
          {props.nasaData.slice(i, i + 7).map((data) => {
            return (
              <>
                <div className="scroll-images" key={i}>
                  <div>
                    {data.media_type === "image" ? (
                      <img
                        src={data.url}
                        width="100%"
                        height="300px"
                        alt="nasa_images"
                        onClick={() => handleShow(data)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <video
                        width="100%"
                        height="300px"
                        controls
                        onClick={() => handleShow(data)}
                        poster={Nasa}
                        autoPlay="1"
                      >
                        <source src={data.url} type="video/mp4" />
                      </video>
                    )}
                    <div style={{ padding: "10px 20px" }}>
                      <p className="mb-1">{data.title}</p>
                      <p className="mb-1">{data.date}</p>
                      <p className="mb-1">{data.copyright}</p>
                    </div>
                  </div>
                </div>
                <Modal
                  show={scrollShow}
                  fullscreen={true}
                  onHide={() => setScrollShow(false)}
                >
                  <Modal.Body>
                    {imageUrl.media_type === "image" ? (
                      <img
                        src={imageUrl.url}
                        width="100%"
                        height="100%"
                        alt="latest_image"
                        style={{ cursor: "pointer" }}
                        onClick={() => setScrollShow(false)}
                      />
                    ) : (
                      <video width="100%" height="100%" controls autoPlay="1" onClick={() => setScrollShow(false)}>
                        <source src={data.url} type="video/mp4" />
                      </video>
                    )}
                  </Modal.Body>
                </Modal>
              </>
            );
          })}
        </Slider>
      </div>
    );
  }
  return rows;
};

export default Triadsquare;