
import {combineReducers} from "redux";
import ProjectReducer from "./reducers/projetsReducer"


export default combineReducers ({
    project: ProjectReducer,
})
