import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nasa from "./Images/nasa.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Moment from "moment";
import Modal from "react-bootstrap/Modal";

const Triadsquare = () => {
  const [nasaData, setNasaData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=2022-10-01&end_date=2022-10-29&thumbs=true"
      )
      .then((res) => {
        console.log(res.data);
        setNasaData(res.data);
      });
  }, []);

  //delete from
  var test = Moment(
    new Date(Math.max(...nasaData.map((e) => new Date(e.date))))
  ).format("DD-MM-YYYY");
  var dates = nasaData.filter((nasaD) => test === nasaD.date);
  console.log("dates", dates);
  console.log("test", test);
  var test2 = nasaData[nasaData.length - 1]; //latest object
  console.log("test2", test2);
  //to delete

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
          <Modal.Header closeButton>
            {/* <Modal.Title>Modal</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <img
              src={nasaData[nasaData.length - 1]?.url}
              width="100%"
              height="100%"
              alt="latest_image"
              style={{ cursor: "pointer" }}
            />
          </Modal.Body>
        </Modal>
      </div>
      <div style={{ width: "100%" }}>
        <Scroll nasaData={nasaData} />
      </div>
    </>
  );
};

const Scroll = (props) => {
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

  return (
    <div>
      <Slider {...settings}>
        {props.nasaData?.map((data, i) => {
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
                {/* <Modal.Header closeButton> */}
                {/* <Modal.Title>Modal</Modal.Title> */}
                {/* </Modal.Header> */}
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
                    <video width="100%" height="100%" controls>
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
};

export default Triadsquare;
