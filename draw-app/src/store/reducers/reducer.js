import {
  ACTION_ADD_COMMAND_LINE,
  ACTION_SET_CANVAS_VALUE,
  ACTION_CREATE_CANVAS,
  ACTION_SET_REQUEST_ERROR,
  ACTION_SET_IS_FETCHING
} from "../actions/actionTypes";

const initialState = {
  commands: [],
  error: "",
  isFetching: false,
  canvas: { width: 0, height: 0, value: [] }
};

export const figureReduser = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_ADD_COMMAND_LINE:
      return { ...state, commands: [action.payload, ...state.commands] };
    case ACTION_CREATE_CANVAS:
      return {
        ...state,
        canvas: {
          ...state.canvas,
          height: action.payload.height,
          width: action.payload.width
        }
      };
    case ACTION_SET_CANVAS_VALUE:
      return {
        ...state,
        canvas: { ...state.canvas, value: action.payload }
      };
    case ACTION_SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      };
    case ACTION_SET_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
