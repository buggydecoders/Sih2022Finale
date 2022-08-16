import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initializeVoxeet } from "./SessionAndIntialization";
import { createConference, createSession, joinConference, startAudio, startVideo, stopAudio, stopVideo } from "./VoxeetUtils";
import { conference, session, notification } from "@voxeet/voxeet-web-sdk";
import MinimizedController from "./UI/controller/MinimizedController";
import Loader from 'react-spinners/PulseLoader'
import './common.scss';

import { useSelector } from "react-redux";
export const VideoChatContext = createContext(null);


const initialState = {
  mic: true,
  video: false,
  dolbyVoice: true,
  spatialAudio: true,
  screenShare: false,
  conferenceId: "null",
  isCall: false,
};

const actionTypes = {
  SET_MIC: "SET_MIC",
  SET_VIDEO: "SET_VIDEO",
  SET_CONFERENCE: "SET_CONFERENCE",
  SET_IS_CALL: "SET_IS_CALL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MIC:
      return { ...state, mic: action.payload };
    case actionTypes.SET_VIDEO:
      return { ...state, video: action.payload };
    case actionTypes.SET_CONFERENCE:
      return { ...state, conferenceId: action.payload };
    case actionTypes.SET_IS_CALL:
      return { ...state, isCall: action.payload };
    default:
      return state;
  }
};

export const VideoChatContextProvider = ({ children }) => {
  useEffect(() => {
    initializeVoxeet();
  }, []);



  const [participantList, setParticipantList] = useState([]);
  const [isUiLarge, setIsUiLarge] = useState(false);
  const [loading,setLoading] = useState('');

  const [controllerState, dispatch] = useReducer(reducer, initialState);

  const leaveCall = async () => {
    try {
      setLoading('Leaving Call..');
      await conference.leave();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: actionTypes.SET_CONFERENCE, payload: null });
      dispatch({ type: actionTypes.SET_IS_CALL, payload: false });
      setLoading('');
    }
  };


  const createVideoCall = async (confId, userName, userId,sendVideoChatNotification) => {
    dispatch({ type: actionTypes.SET_IS_CALL, payload: true });
    setIsUiLarge(false);
    setLoading('creating call...');
    const name = userName || "Kunal Sangtiani";
    const id = userId || "23222222";
    console.log('JOINED CALL WITH ',confId,userName,userId);
    await createSession(name, id);
    console.log("Session created for id", id);
    const conf = await createConference(confId);
    console.log(conf);
    dispatch({ type: actionTypes.SET_CONFERENCE, payload: confId });
    console.log("Conference Created...");
    const joinConf = { audio: true, dolbyVoice: true };
    setLoading('joining the call...');
    const join = await joinConference(conf, joinConf);
    console.log(join);
  
    console.log("JOINED CONFERENCE");
    setLoading('');
    
  };

  useEffect(()=>{

    return ()=>leaveCall();
  }, [])

  const toggleVideo = async()=>{
    const currentState = controllerState.video;
    dispatch({type : actionTypes.SET_VIDEO,payload : !currentState});
    if (!currentState) {
      setLoading('Turning on the video...')
      await startVideo();
      console.log('Video Started')
      setLoading('');
    }
    else {
      setLoading('Turning off the video');
      await stopVideo();
      console.log('Video Stopped')
      setLoading('');
    }
  }

  const toggleMic = async()=>{
    const currentState = controllerState.mic;
    dispatch({type : actionTypes.SET_MIC,payload : !currentState});
    if (!currentState) {
      await startAudio();
      console.log('Audio Started')
    }
    else {
      await stopAudio();
      console.log('Audio Stopped')
    }

  }
  

  const StreamUpdatedFunction = (participant, stream) => {
    console.log("STREAM UPDATED");

    // if (stream.type === "screen-share") return;
    const index = participantList.findIndex((ele) => {
      return ele.id === participant.id;
    });
    if (index === -1) {
      let nameToAdd = "";
      if (session.participant.id === participant.id) {
        nameToAdd = `${participant.info.name} (You)`;
      } else {
        nameToAdd = participant.info.name;
      }
      const newParticipantDetails = {
        name: nameToAdd,
        id: participant.id,
        participant: participant,
        stream: stream,
        isVideo: stream.getVideoTracks().length > 0,
        isAudio: participant.audio,
        isInactive: false,
      };
      const newList = [...participantList, newParticipantDetails];
      setParticipantList(newList);
    } else {
      let participantFromList = participantList[index];
      const updatedDetails = {
        ...participantFromList,
        stream: stream,
        isVideo: stream.getVideoTracks().length > 0,
        isAudio: true,
      };
      const newList = [...participantList];
      newList[index] = updatedDetails;
      setParticipantList(newList);
    }
  };

  const streamRemovedFunction = (participant, stream) => {
    if (participant.status === "Left") return;
    console.log(stream);

    const index = participantList.findIndex((ele) => {
      return ele.id === participant.id;
    });
    const newDetails = {
      name: participant.info.name,
      id: participant.id,
      participant: participant,
      stream: stream,
      isVideo: false,
      isAudio: participant.audio,
      isInactive: true,
    };
    const newList = [...participantList];
    newList[index] = newDetails;
    setParticipantList(newList);
  };

  const participantUpdatedFunction = (participant, stream) => {
    if (participant.status === "Left") {
      const newParticipantList = [...participantList].filter((el) => {
        return el.id !== participant.id;
      });
      setParticipantList(newParticipantList);

      return;
    }

    // const newParticipantList = [...participantList].filter((el) => {
    //   return el.id !== participant.id;
    // });
    // setParticipantList(newParticipantList);
  };

  useEffect(() => {
 
      console.log("Called!");
      conference.on("streamAdded", StreamUpdatedFunction);
      conference.on("streamUpdated", StreamUpdatedFunction);
      conference.on("streamRemoved", streamRemovedFunction);
      conference.on("participantAdded", (participant, stream) =>
        console.log(`${participant.info.name} Joined!`)
      );
      conference.on("participantUpdated", participantUpdatedFunction);
      conference.on("left", () => console.log("conference left"));
      notification.on("participantLeft", () => {
        console.log("left");
      });

      return () => {
        conference.off("streamAdded", StreamUpdatedFunction);
        conference.off("streamUpdated", StreamUpdatedFunction);
        conference.off("streamRemoved", streamRemovedFunction);
        conference.off("participantUpdated", participantUpdatedFunction);
      };
    
  }, [participantList, controllerState.isCall]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = {
    participantList,
    actionTypes,
    dispatch,
    createVideoCall,
    leaveCall,
    controllerState,
    isUiLarge,
    toggleVideo,
    toggleMic,
    setIsUiLarge,
  };

  return (
    <VideoChatContext.Provider value={value}>
      {children}{!isUiLarge&&controllerState.isCall&&<div className="minimized-controller"><MinimizedController/></div>}
      {loading&&<div className="video-loading">
      <Loader/>
      <div className="video-loading-text">{loading}</div>
      </div>}
    </VideoChatContext.Provider>
  );
};
