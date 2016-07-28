export const SUBMIT_VIDEO = 'SUBMIT_VIDEO';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const PAUSE_VIDEO = 'PAUSE_VIDEO';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const ADD_RESPONSE = 'ADD_RESPONSE';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
 
export function submitVideo(url) {
  return {
    type: SUBMIT_VIDEO,
    url: url
  }
}

export function playVideo() {
  return {
    type: PLAY_VIDEO
  }
}

export function pauseVideo() {
  return {
    type: PAUSE_VIDEO
  }
}

export function addMessage() {
  return { 
    type: ADD_MESSAGE 
  }
}
 
export function addResponse(message) {
  return { 
    type: ADD_RESPONSE, 
    text: message 
  }
}

export function updateMessage(message) {
  return { 
    type: UPDATE_MESSAGE, 
    text: message 
  }
}