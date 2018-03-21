import axios from "../config/axios"


const GET_TEMP_DATA = "GET_TEMP_DATA"

const initState = {
  count: 0,
  rows: []
}

export function temp(state = initState, action) {
  switch (action.type) {
    case GET_TEMP_DATA:
      return { ...state, ...action.payload}
    default: 
      return state
  }
}


function GetDataSuccess(obj) {
  return { type: GET_TEMP_DATA, payload: obj}
}

/**
 * 获取所有模块
 */
export function getTempData() {
  return async dispatch => {
    const getData = axios.get('/temp/all')
    try {
      let result = await getData
      if (result.status === 200){
        dispatch(GetDataSuccess(result.data.data))
      }
      console.log(result)
    } catch (e) {

    }
  }
}