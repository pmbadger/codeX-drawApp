import { ACTION_FILE_TO_FILE } from "./actionTypes";
import { actionSetIsFetching, actionSetRequestError } from "./commands";

export const actionFileToFile = () => dispatch => {
  dispatch(actionSetIsFetching(true));
  fetch("http://localhost:3001/download")
    .then(() => {
      dispatch(actionSetIsFetching(false));
      dispatch({
        type: ACTION_FILE_TO_FILE,
        payload: "data"
      });
      dispatch(actionSetRequestError(""));
    })

    .catch(err => {
      dispatch(actionSetRequestError("Wrong command"));
      dispatch(actionSetIsFetching(false));
    });
};
