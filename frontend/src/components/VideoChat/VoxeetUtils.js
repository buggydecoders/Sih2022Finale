import {
    session,
    conference,
    mediaDevice,
  } from '@voxeet/voxeet-web-sdk';

  const createConference = (alias) => {
    return new Promise((resolve, reject) => {
      conference
        .create({ alias })
        .then((cellConference) => {
          resolve(cellConference);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };
  
  // conference in/out
  const joinConference = (conf) => {
    return new Promise((resolve, reject) => {
      conference
        .join(conf, {
            audio : true,
            video : false,
        })
        .then((conf) => {
          resolve(conf);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  };
  
  const leaveConference = async () => {
    await conference.leave();
  };
  
  // video
  const startVideo = () => {
    return new Promise((resolve, reject) => {
      conference
        .startVideo(session.participant)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  };
  
  const stopVideo = () => {
    conference
      .stopVideo(session.participant)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  
  // audio
  const startAudio = () => {
    conference
      .startAudio(session.participant)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  
  const stopAudio = () => {
    conference
      .stopAudio(session.participant)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  
  // media devices
  const getAudioDevices = () => {
    return new Promise((resolve, reject) => {
      mediaDevice
        .enumerateAudioDevices()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  const getVideoDevices = () => {
    return new Promise((resolve, reject) => {
      mediaDevice
        .enumerateVideoDevices()
        .then((value) => {
          resolve(value);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  const changeAudioDevice = (deviceId) => {
    mediaDevice
      .selectAudioInput(deviceId)
      .then(() => {})
      .catch((err) => console.error);
  };
  
  const changeVideoDevice = (deviceId) => {
    mediaDevice
      .selectVideoInput(deviceId)
      .then(() => {})
      .catch((err) => console.error);
  };
  

 export const createSession = async (name,id)=>{
      if (!session.isOpen()) {
      await session.open({name,id})
      console.log('Session Created! with id' + id)
      }
  }

export const fetchConference = async(id)=>{
  const conf = await conference.fetch(id);
  return conf;
}

export const startScreenShare = () => {
  conference
    .startScreenShare()
    .then(() => {console.log('Screen Share Started!!')})
    .catch((e) => {console.log('Error in starting Screeen + e')});
};

export const stopScreenShare = () => {
  conference
    .stopScreenShare()
    .then(() => {return 'Screen Share stopped!'})
    .catch((e) => {console.log('Error in stoping screen' + e)});
};

// export const ConfigureSpatial = ()=>{
//   [conference.participants].map((val) => {
//     const participant = val[1];

//     const videoTile = document.getElementByClass(`${participant.id}`);

//     const elementPosition = videoTile.getBoundingClientRect();

   
//     conference.setSpatialPosition(participant, {
//         x: elementPosition.x + (elementPosition.width / 2),
//         y: elementPosition.y + (elementPosition.height / 2),
//         z: 0
//     });
// });
// }


  export {
    createConference,
    joinConference,
    leaveConference,
    startVideo,
    stopVideo,
    startAudio,
    stopAudio,
    getAudioDevices,
    getVideoDevices,
    changeAudioDevice,
    changeVideoDevice,
  };
