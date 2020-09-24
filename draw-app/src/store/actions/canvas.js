import { ACTION_CREATE_CANVAS } from "./actionTypes";
import {
  actionSetCanvasValue,
  actionSetRequestError,
  actionSetIsFetching
} from "./commands";

export const actionCreateCanvas = ({
  widthCanvas,
  heightCanvas
}) => dispatch => {
  dispatch(actionSetIsFetching(true));
  fetch("http://localhost:3001/createCanvas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ widthCanvas, heightCanvas })
    // mode: "no-cors"
  })
    .then(result =>
      result.json().then(data => {
        dispatch({
          type: ACTION_CREATE_CANVAS,
          payload: { widthCanvas, heightCanvas }
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
