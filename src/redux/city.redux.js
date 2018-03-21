import axios from "../config/axios"


const GET_CITY_DATA = "GET_CITY_DATA"

const initState = {
  count: 0,
  rows: []
}

export function city(state = initState, action){
  switch (action.type) {
    case GET_CITY_DATA:
      return {...state, ...action.payload}
    default:
      return state
  }
}

function getDataSuccess(obj) {
  return { type: GET_CITY_DATA, payload: obj }
}

/**
 * 获取城市列表
 */
export function getCityData() {
  return async dispatch => {
    const getData = axios.get('/city/all')
    try {
      let result = await getData
      if (result.status === 200) {
        dispatch(getDataSuccess(result.data.data))
      }
    } catch (e) {

    }
  }
}