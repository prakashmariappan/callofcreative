import React, { useState, useEffect } from "react";
import Data from "../../data";
import Picture from "./picture";
import { useDrop } from "react-dnd";
import ImageComponent from "../../refimage";
import image from "../../Images/Level_6/ref.png";
import Win from "../win";
import Lose from "../lose";
import GameOver from "../gameover";
import Confirmfinish from "../confirmfinish";
import Backcomp from "../backcomp";

const Level6 = () => {
  //Image Component value
  const imageSrc = image;

  //Win Component value
  const src = "/Dashboard/Level7";
  const num = "6";

  //win or lose or Time Up popup function
  const [winmodal, setwinModal] = useState(false);
  const [losemodal, setloseModal] = useState(false);
  const [gameovermodal, setgameoverModal] = useState(false);

  const toggleWin = () => {
    setwinModal(!winmodal);
  };
  const toggleLose = () => {
    setloseModal(!losemodal);
  };
  const toggleGameOver = () => {
    setgameoverModal(!gameovermodal);
  };
  const [finishmodal, setfinishmodal] = useState(false);
  const togglefinish = () => {
    setfinishmodal(!finishmodal);
  };
  //eye function
  const [line, setline] = useState(false);
  function showlinefun() {
    setline((line) => !line); // Use a callback to ensure you get the updated value
  }
  function hidelinefun() {
    setline((line) => !line);
  }
  let showline = line ? "show" : "hide";

  //Drop function
  const [box1, setBox1] = useState([]);
  const [box2, setBox2] = useState([]);
  const [box3, setBox3] = useState([]);
  const [box4, setBox4] = useState([]);
  const [box5, setBox5] = useState([]);

  function useDropForBox(box, setBox) {
    const [{}, drop] = useDrop(() => ({
      accept: "image",
      drop: (item) => addImagetoBox(item.key),
    }));

    function addImagetoBox(key) {
      const data = Data.level6.filter((picture) => key === picture.id);
      setBox([...box, data[0]]);
    }

    return drop;
  }

  const drop1 = useDropForBox(box1, setBox1);
  const drop2 = useDropForBox(box2, setBox2);
  const drop3 = useDropForBox(box3, setBox3);
  const drop4 = useDropForBox(box4, setBox4);
  const drop5 = useDropForBox(box4, setBox5);

  //checking the dropbox for image function
  function checkimg() {
    togglefinish();
    if (
      box1.length === 0 ||
      box2.length === 0 ||
      box3.length === 0 ||
      box4.length === 0 ||
      box5.length === 0
    ) {
      toggleLose();
    } else {
      evaluation();
    }
  }

  //evaluation function
  function evaluation() {
    let first = document
      .getElementById("l6b1")
      .querySelector("img")
      .getAttribute("data-name");
    let second = document
      .getElementById("l6b2")
      .querySelector("img")
      .getAttribute("data-name");
    let third = document
      .getElementById("l6b3")
      .querySelector("img")
      .getAttribute("data-name");
    let four = document
      .getElementById("l6b4")
      .querySelector("img")
      .getAttribute("data-name");
    let five = document
      .getElementById("l6b5")
      .querySelector("img")
      .getAttribute("data-name");

    if (
      first === "1" &&
      second === "2" &&
      third === "3" &&
      four === "4" &&
      five === "5"
    ) {
      toggleWin();
    } else {
      toggleLose();
    }
  }

  const [timeLeft, setTimeLeft] = useState(90);
  // Function to be executed when the timer reaches zero
  const handleTimeout = () => {
    if (
      box1.length === 0 ||
      box2.length === 0 ||
      box3.length === 0 ||
      box4.length === 0 ||
      box5.length === 0
    ) {
      toggleGameOver();
    } else {
      evaluation();
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // 1000 milliseconds = 1 second

      // Clear the timer when the component unmounts or when the timer ends
      return () => clearTimeout(timer);
    } else {
      handleTimeout();
    }
  }, [timeLeft]);

  return (
    <>
      <div className="navbar">
        <div className="nav_left">
          <Backcomp />
        </div>
        <div className="nav_logo"></div>
        <div className="nav_right">
          <p className="time_left">Time Left: {timeLeft} seconds</p>
          <ImageComponent src={imageSrc} />
          <button
            onMouseEnter={showlinefun}
            onMouseLeave={hidelinefun}
            className="eye_icon navicon"
            title="Show Structure"
          ></button>
        </div>
      </div>
      <div className="box_con">
        <div className="drop_box">
        <div className="box_name">Drop Images here</div>
          <div className="level6_row">
            <div className="logo_box">
              <div className={showline} name="box" id="l6b1" ref={drop1}>
                {box1.map((picture) => {
                  return (
                    <Picture
                      id={picture.id}
                      key={picture.id}
                      name={picture.name}
                      image={picture.image}
                    />
                  );
                })}
              </div>
              <div className={showline} name="box" id="l6b2" ref={drop2}>
                {box2.map((picture) => {
                  return (
                    <Picture
                      id={picture.id}
                      key={picture.id}
                      name={picture.name}
                      image={picture.image}
                    />
                  );
                })}
              </div>
            </div>
            <div className={showline} name="box" id="l6b3" ref={drop3}>
              {box3.map((picture) => {
                return (
                  <Picture
                    id={picture.id}
                    key={picture.id}
                    name={picture.name}
                    image={picture.image}
                  />
                );
              })}
            </div>
            <div className={showline} name="box" id="l6b4" ref={drop4}>
              {box4.map((picture) => {
                return (
                  <Picture
                    id={picture.id}
                    key={picture.id}
                    name={picture.name}
                    image={picture.image}
                  />
                );
              })}
            </div>
          </div>
          <div className={showline} name="box" id="l6b5" ref={drop5}>
            {box5.map((picture) => {
              return (
                <Picture
                  id={picture.id}
                  key={picture.id}
                  name={picture.name}
                  image={picture.image}
                />
              );
            })}
          </div>
        </div>
        <div className="right_con">
          <div className="drag_box">
            <div className="box_name">Drag Images from here</div>
            <div className="drag_con">
              {Data.level6.map((picture) => {
                return (
                  <Picture
                    id={picture.id}
                    key={picture.id}
                    name={picture.name}
                    image={picture.image}
                    title={picture.title}
                  />
                );
              })}
            </div>
          </div>

          <button onClick={togglefinish} className="finish_btn" title="Finish">
            Finish
          </button>
        </div>
      </div>
      {winmodal && <Win src={src} num={num} />}
      {losemodal && <Lose />}
      {gameovermodal && <GameOver />}
      {finishmodal && (
        <Confirmfinish checkimg={checkimg} toggle={togglefinish} />
      )}
    </>
  );
};

export default Level6;
