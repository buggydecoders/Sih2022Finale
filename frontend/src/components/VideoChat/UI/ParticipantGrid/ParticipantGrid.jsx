import React, {useContext, useRef} from "react";
import "./ParticipantGrid.styles.scss";
import ParticipantItem from "../ParticipantItem/ParticipantItem";
import { motion } from "framer-motion";
import { VideoChatContext } from "../../VideoChatContext";

const screenShareVariant = {
  hidden : {
    y : 200,
    opacity : 0
  },
  visible : {
    y : 0,
    opacity : 1,
    transition : {
      duration : 0.5
    }
  }
}

const participantVariant = {
  hidden : {
    y : -200,
    opacity : 0,
  },
  visible : {
    y : 0,
    opacity : 1,
    transition : {
      duration : 0.5
    }
  }
}

const ParticipantGrid = (props) => {
  const screenShareRef = useRef();
  const {participantList}  =useContext(VideoChatContext);
  const len = participantList.length;
  return (
    <>
      <style>
        {`.pg__container-items{
          display : grid;
          grid-template-columns : repeat(${len > 4 ? 4 : len}, ${
          len > 4 ? len : 0.2
        }fr);
          ${len > 4 ? "grid-gap:25px" : ""}
        }`}
      </style>

      <div className="pg">
        <div className="pg__container">
          {!(false || false ) ? (
            <div className="pg__container-items">
              {participantList.map((participant) => {
                return (
                  <ParticipantItem
                    key={participant.id}
                    participant={participant}
                  />
                );
              })}
            </div>
          ) : (
            <div className="pg__container-2">
              <motion.div variants={screenShareVariant} exit='hidden' animate='visible' initial='hidden' className="pg__container-2-screenshare">
                {
                  <video
                    id="video-object"
                    className="participant-grid-item__video"
                    ref={screenShareRef}     
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    playsInline
                    autoPlay
                    muted
                  />
                }
              </motion.div>
              <motion.div variants={participantVariant} exit='hidden' animate='visible' initial='hidden' className="pg__container-2-participants">
              {participantList.map((participant) => {
                return (
                  <ParticipantItem
                    key={participant.id}
                    isScreenShare={false}
                    screenShareRef = {screenShareRef}
                    participant={participant}
                  />
                );
              })}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ParticipantGrid;
