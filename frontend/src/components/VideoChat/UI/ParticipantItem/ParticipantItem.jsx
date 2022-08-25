import React, { useEffect, useRef, useCallback, useState } from "react";
import "./Participant.styles.scss";


import { conference } from "@voxeet/voxeet-web-sdk";
import { motion } from "framer-motion";

const participantVariant = {
  hidden : {
    x : '300',
    opacity : 0,
  },
  visible : {
    x : 0,
    opacity : 1,
  
  }
}

const ParticipantItem = ({ participant, isSelf, controls,...props }) => {
  const ref = useRef();
  const { id, stream, isVideo } = participant;
  const videoRef = useRef();

  const [speakingState, setSpeakingState] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      conference.isSpeaking(participant.participant, (isSpeaking) => {
        if (isSpeaking) {
          if (!speakingState){
          setSpeakingState(true);
          }
        } else {
          setSpeakingState(false);
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const setupVideo = useCallback(({ stream }) => {
    if (stream.type==='ScreenShare' && (false || false)) {
      navigator.attachMediaStream(props.screenShareRef.current, stream);
      return;
    }
    navigator.attachMediaStream(videoRef.current, stream);

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // watcher for stream
  useEffect(() => {
    if (isVideo) {
      setupVideo({ stream });
    }
  }, [isVideo, stream, ref, id, setupVideo])// eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      <style>{`.${participant.id}{border : ${
        speakingState ? "4px solid lightgreen" : "none"
      }}`}</style>
      
      <motion.div name={participant.name} width={'12rem'}  variants={participantVariant} initial="hidden" animate="visible" className={`participantItem ${participant.id} ${(false || false)?'screenshared':'nonshared'}`} ref={ref}>
        {isVideo ? (
          <video
            id="video-object"
            className="participant-grid-item__video"
            ref={videoRef}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            playsInline
            autoPlay
            muted
          />
        ) : (
          <i className="fas fa-video-slash" />
        )}
      </motion.div>
    </>
  );
};

export default ParticipantItem;
