import { createStore, applyMiddleware } from 'redux';
import { figureReduser } from "./reducers/reducer";
import thunk from 'redux-thunk';


export const store = createStore(figureReduser, applyMiddleware(thunk));
