import {
  ACTION_ADD_COMMAND_LINE,
  ACTION_SET_CANVAS_VALUE,
  ACTION_SET_REQUEST_ERROR,
  ACTION_SET_IS_FETCHING
} from "./actionTypes";

export const actionAddCommandLine = line => dispatch => {
  dispatch(actionSetIsFetching(true));
  fetch("http://localhost:3001/command", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ line })
    // mode: "no-cors"
  })
    .then(result =>
      result.json().then(data => {
        dispatch({
          type: ACTION_ADD_COMMAND_LINE,
          payload: line
        });
        dispatch(actionSetCanvasValue(data));
        dispatch(actionSetIsFetching(false));
        dispatch(actionSetRequestError(""));
      })
    )
    .catch(err => {
      dispatch(actionSetRequestError("Wrong command"));
      dispatch(actionSetIsFetching(false));
    });
};

export const actionSetCanvasValue = data => {
  return {
    type: ACTION_SET_CANVAS_VALUE,
    payload: data
  };
};

export const actionSetIsFetching = isFetching => {
  return {
    type: ACTION_SET_IS_FETCHING,
    payload: isFetching
  };
};

export const actionSetRequestError = error => {
  return {
    type: ACTION_SET_REQUEST_ERROR,
    payload: error
  };
};
