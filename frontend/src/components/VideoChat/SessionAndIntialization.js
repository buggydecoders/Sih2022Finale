import '@voxeet/voxeet-web-sdk';
import VoxeetSDK from '@voxeet/voxeet-web-sdk';

const initialize = VoxeetSDK.initialize.bind(VoxeetSDK);

const consumerKey = '-OTfFAHh3IZEmo_dhlYJ5A==';
const consumerSecret = '1pPXsTusX4650vL1w2WzEiLPEmB7xV7BTpCnj1IzXMM=';

export const initializeVoxeet = () => {
  initialize(consumerKey, consumerSecret);
};