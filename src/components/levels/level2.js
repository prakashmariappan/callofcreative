import React, { useState, useEffect } from 'react';
import Data from '../../data';
import Picture from './picture';
import { useDrop } from 'react-dnd';
import ImageComponent from '../../refimage';
import image from '../../Images/Level_2/ref.png';
import Win from '../win';
import Lose from '../lose';
import GameOver from '../gameover';
import Confirmfinish from '../confirmfinish';
import Backcomp from '../backcomp';

const Level2 = () => {
    
    //Image Component value
    const imageSrc = image;

    //Win Component value
    const src = '/Dashboard/Level4';
    const num = '2';
    
   
    
    //win or lose or Time Up popup function  
const [winmodal, setwinModal] = useState(false);
const [losemodal, setloseModal] = useState(false);
const [gameovermodal, setgameoverModal] = useState(false);
const [finishmodal, setfinishmodal] = useState(false);

const toggleWin = () => {
    setwinModal(!winmodal);
};
const toggleLose = () => {
    setloseModal(!losemodal);
};
const toggleGameOver = () => {
    setgameoverModal(!gameovermodal);
};
const togglefinish =()=>{
    setfinishmodal(!finishmodal)
   }

    //eye function 
    const [line, setline] = useState(false);
    function showlinefun() { 
        setline((line) => !line); // Use a callback to ensure you get the updated value
    }
    function hidelinefun(){
        setline((line) => !line);
    }
    let showline = line? 'show':'hide';

     //Drop function
     const[box1, setBox1] = useState([]);
     const[box2, setBox2] = useState([]);
     const[box3, setBox3] = useState([]);
     const[box4, setBox4] = useState([]);
 
     function useDropForBox(box, setBox) {
         const [{}, drop] = useDrop(() => ({
             accept: "image",
             drop: (item) => addImagetoBox(item.key),
         }));
     
         function addImagetoBox(key) {
             const data = Data.level2.filter((picture) => key === picture.id);
             setBox([...box,data[0]]);
         }
     
         return drop;
     }
     
     const drop1 = useDropForBox(box1, setBox1);
     const drop2 = useDropForBox(box2, setBox2);
     const drop3 = useDropForBox(box3, setBox3);
     const drop4 = useDropForBox(box4, setBox4);
 
     //checking the dropbox for image function
     function checkimg() {
        togglefinish();
     if (box1.length === 0 || box2.length === 0 || box3.length === 0 || box4.length === 0)  {
        toggleLose();
     } else {
         evaluation();
     }
     };
     
    //evaluation function
    function evaluation(){
    let first= document.getElementById('l2b1').querySelector("img").getAttribute("data-name");
    let second= document.getElementById('l2b2').querySelector("img").getAttribute("data-name");
    let third= document.getElementById('l2b3').querySelector("img").getAttribute("data-name");
    let four= document.getElementById('l2b4').querySelector("img").getAttribute("data-name");

        if(first==='1' && second==='2' && third==='3' && four==='4'){  
            toggleWin();
          }
          else{
              toggleLose();
          }
    };
    
    const [timeLeft, setTimeLeft] = useState(70);
    // Function to be executed when the timer reaches zero
     const handleTimeout = () => {
        if (box1.length === 0 || box2.length === 0 || box3.length === 0 || box4.length === 0) {
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
        }
        else {
            handleTimeout();
        }
    }, [timeLeft]);

    return (
        <>
       <div className='navbar'>
            <div className='nav_left'>
            <Backcomp/>
            </div>
            <div className='nav_logo'></div>
            <div className='nav_right'>
            <p className='time_left'>Time Left: {timeLeft} seconds</p>    
            <ImageComponent src={imageSrc}/>
            <button  onMouseEnter={showlinefun} onMouseLeave={hidelinefun} className='eye_icon navicon'></button>
            </div>      
        </div>
        <div className='box_con'>
            <div className='drop_box'>
                <div className={showline} name='box'  id='l2b1' ref={drop1}>
                {box1.map((picture) => {
                    return <Picture id={picture.id} key={picture.id} name={picture.name} image={picture.image}/>;
                })}     
                </div>        
                <div className={showline} name='box' id='l2b2' ref={drop2}>
                {box2.map((picture) => {
                    return <Picture id={picture.id} key={picture.id} name={picture.name} image={picture.image}/>;
                })}     
                </div>   
                <div className={showline} name='box' id='l2b3' ref={drop3}>
                {box3.map((picture) => {
                    return <Picture id={picture.id} key={picture.id} name={picture.name} image={picture.image}/>;
                })}     
                </div>
                <div className={showline} name='box' id='l2b4' ref={drop4}>
                {box4.map((picture) => {
                    return <Picture id={picture.id} key={picture.id} name={picture.name} image={picture.image}/>;
                })}     
                </div>  
            </div>
            <div className='right_con'>
            <div className='drag_box'>  
            <div className='drag_con'>
                {Data.level2.map((picture)=>{
                return <Picture  id={picture.id} key={picture.id} name={picture.name} image={picture.image} />;
            })}
            </div>
            </div> 
            
            <button onClick={togglefinish} className='finish_btn'>Finish</button>
            </div>
        </div>
        {winmodal && (
           <Win src={src} num={num}/>
        )}
        {losemodal && (
            <Lose/>
        )}
        {gameovermodal && (
            <GameOver/>
        )}
        {finishmodal && (
           <Confirmfinish checkimg={checkimg} toggle={togglefinish}/>
        )}
        </>
    );
}

export default Level2;