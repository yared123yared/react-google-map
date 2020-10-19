import React, { useState, useEffect, useRef } from "react";

import "./Stories.css";


import MoreHoriz from "@material-ui/icons/MoreHoriz";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

import { Story as StoryModel } from "../../Model/Story";
import {ForStories} from "../../Model/Story"
import video1 from './video'
interface Props {
  onClose: Function;
  stories: StoryModel[];
  forStories:ForStories;
}

export default function Story({ onClose, stories ,forStories}: Props) {
  const [storyPaused, setStoryPaused] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const storyIndexRef = useRef(0);

  useEffect(() => {
    const video = document.getElementById("video") as HTMLVideoElement;

    if (video) {
      video.onended = (e) => {
        if (storyIndexRef.current === stories.length - 1) {
          onClose();
        } else {
          setStoryIndex((value) => value + 1);
        }
      };
    }
  }, []);

  useEffect(() => {
    storyIndexRef.current = storyIndex;
  }, [storyIndex]);

  useEffect(() => {
    if (storyPaused) {
      (document.getElementById("video") as HTMLVideoElement).pause();
    } else {
      (document.getElementById("video") as HTMLVideoElement).play();
    }
  }, [storyPaused]);

  function onClickStory(element: EventTarget) {
    if ((element as HTMLElement).className === "story-container") onClose();
  }

  function getProgressBarClassName(index: number) {
    if (index < storyIndex) {
      return "progress-bar progress-bar-finished";
    } else if (index === storyIndex) {
      return storyPaused ? "progress-bar progress-bar-active progress-bar-paused" : "progress-bar progress-bar-active";
    } else {
      return "progress-bar";
    }
  }
  // let assetsPath = require.context('../../data/Assets/videos/', false, /\.(mp4|mkv)$/); 

function getImage(index:number){
  var imageUrl;
  switch(index){
    case 0:imageUrl=require('../../Data/Assets/videos/Restaurant Promo Video - Sigma 30mm f_1.4.mp4');
    break;
    case 1:imageUrl=require('../../Data/Assets/videos/Bait & Hook - Restaurant Promo Video (Sony a6300 + Zhiyun Crane).mp4');
    break;
    case 2:imageUrl=require('../../Data/Assets/videos/Restaurant food cinematic video advertisement.mp4');
    break;
     case 3:imageUrl=require('../../Data/Assets/videos/restaurant videos - YouTube.mkv');
    break;
 default :imageUrl=require('../../Data/Assets/videos/Restaurant Promo Video - Sigma 30mm f_1.4.mp4');
 break;

  }
  return(imageUrl);
}

  return (
    <div onClick={(e) => onClickStory(e.target)} className="story-container">
      <div className="story">
        <div className="title">
		<img src={forStories.imgSrc} alt="" />
          <div className="details">
		  <span>{forStories.name}</span>
							<span>{forStories.rating}</span>
          </div>
          <div className="spacer"></div>
          {storyPaused && <div className="pause">PAUSED</div>}
          <MoreHoriz />
        </div>
        <div className="progress-bars">
          {stories.map((story, index) => (
            <div className="progress-bar-container">
              <div style={{ animationDuration: `${story.duration}s` }} className={getProgressBarClassName(index)}></div>
            </div>
          ))}
        </div>
        <div className="video">
          <video onMouseDown={(e) => setStoryPaused(true)} onMouseUp={(e) => setStoryPaused(false)} id="video"   src={getImage(storyIndex)} autoPlay/>

          
		  
								
							
		  
          {storyIndex !== 0 && <ChevronLeft onClick={(e) => setStoryIndex((value) => value - 1)} className="previous hoverable" />}
          {storyIndex !== stories.length - 1 && <ChevronRight onClick={(e) => setStoryIndex((value) => value + 1)} className="next hoverable" />}
        </div>
      </div>
    </div>
  );
} 