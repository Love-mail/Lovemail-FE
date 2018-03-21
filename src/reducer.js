import { combineReducers } from "redux"

import { user } from "./redux/user.redux"
import { temp } from "./redux/temp.redux"
import { city } from "./redux/city.redux"

export default combineReducers({ user, temp, city })