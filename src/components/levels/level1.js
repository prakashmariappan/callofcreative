import React, { useState, useEffect } from "react";
import Data from "../../data";
import Picture from "./picture";
import { useDrop } from "react-dnd";
import image from "../../Images/Level_1/ref.png";
import ImageComponent from "../../refimage";
import Win from "../win";
import Lose from "../lose";
import GameOver from "../gameover";
import Confirmfinish from "../confirmfinish";
import Backcomp from "../backcomp";
const Level1 = () => {
  //Image Component value
  const imageSrc = image;

  //Win Component value
  const src = "/Dashboard/Level2";
  const num = "1";

  //win / lose / Time Up / confirm finish popup function
  const [winmodal, setwinModal] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [losemodal, setloseModal] = useState(false);
  const [gameovermodal, setgameoverModal] = useState(false);
  const [finishmodal, setfinishmodal] = useState(false);

  const toggleWin = () => {
    setwinModal(!winmodal);
    setShowStars(true);
    // After a delay, reset the animation state
    setTimeout(() => {
      setShowStars(false);
    }, 2000);
    {
      showStars && <div className="stars" />;
    }
  };
  const toggleLose = () => {
    setloseModal(!losemodal);
  };
  const toggleGameOver = () => {
    setgameoverModal(!gameovermodal);
  };
  const togglefinish = () => {
    setfinishmodal(!finishmodal);
  };
  //eye function
  const [line, setline] = useState(false);
  let showline = line ? "show" : "hide";
  function showlinefun() {
    setline((line) => !line);
  }
  function hidelinefun() {
    setline((line) => !line);
  }

  //Drop function
  const [box1, setBox1] = useState([]);
  const [box2, setBox2] = useState([]);
  const [box3, setBox3] = useState([]);

  function useDropForBox(box, setBox) {
    const [{}, drop] = useDrop(() => ({
      accept: "image",
      drop: (item) => addImagetoBox(item.key),
    }));

    function addImagetoBox(key) {
      const data = Data.level1.filter((picture) => key === picture.id);
      setBox([...box, data[0]]);
    }

    return drop;
  }

  const drop1 = useDropForBox(box1, setBox1);
  const drop2 = useDropForBox(box2, setBox2);
  const drop3 = useDropForBox(box3, setBox3);

  //checking the dropbox for image function
  function checkimg() {
    togglefinish();
    if (box1.length === 0 || box2.length === 0 || box3.length === 0) {
      toggleLose();
    } else {
      evaluation();
    }
  }
  //evaluation function
  function evaluation() {
    let first = document
      .getElementById("l1b1")
      .querySelector("img")
      .getAttribute("data-name");
    let second = document
      .getElementById("l1b2")
      .querySelector("img")
      .getAttribute("data-name");
    let third = document
      .getElementById("l1b3")
      .querySelector("img")
      .getAttribute("data-name");
    if (first === "1" && second === "2" && third === "3") {
      toggleWin();
    } else {
      toggleLose();
    }
  }

  const [timeLeft, setTimeLeft] = useState(100);
  // Function to be executed when the timer reaches zero
  const handleTimeout = () => {
    if (box1.length === 0 || box2.length === 0 || box3.length === 0) {
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
          <ImageComponent src={imageSrc}/>
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
        <div className="box_name">Drop Box</div>
          <div className={showline} name="box" id="l1b1" ref={drop1}>
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
          <div className={showline} name="box" id="l1b2" ref={drop2}>
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
          <div className={showline} name="box" id="l1b3" ref={drop3}>
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
        </div>
        <div className="right_con">
          <div className="drag_box">
            <div className="box_name">Drag Images from here</div>
            <div className="drag_con">
              {Data.level1.map((picture) => {
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
export default Level1;
