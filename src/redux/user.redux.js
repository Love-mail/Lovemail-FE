import axios from "../config/axios"

import history from "../config/history"
import checkAllInfo from "../config/checkInfo"
import { setCookie, clearCookie } from "../config/token"

const AUTH_UPDATE = "AUTH_UPDATE"
const CHANG_EREGISTE_RMSG = "CHANG_EREGISTE_RMSG"
const CHANG_RESET_RMSG = "CHANG_RESET_RMSG"
const CHANGE_CODE_BUTTON_DISABLE = "CHANGE_CODE_BUTTON_DISABLE"
const CHANGE_CODE_SENDED = "CHANGE_CODE_SENDED"
const CHANGE_CODE_BUTTON_TEXT = "CHANGE_CODE_BUTTON_TEXT"
const CHANGE_TIME_OUT = "CHANGE_TIME_OUT"
const ERROR_MSG = "ERROR_MSG"

const initState = {
  userData: "",
  errMsg: "",
  registerMsg: "注册",
  resetMsg: "重置密码",
  codeDisable: false,
  codeSended: false,
  checkText: "获取验证码",
  timeOut: 0
};

export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_UPDATE:
      return { ...state, userData: action.payload, errMsg: '' }
    case ERROR_MSG:
      return { ...state, errMsg: action.payload }
    case CHANG_EREGISTE_RMSG:
      return { ...state, registerMsg: action.payload }
    case CHANG_RESET_RMSG:
      return { ...state, resetMsg: action.payload }
    case CHANGE_CODE_BUTTON_DISABLE:
      return { ...state, codeDisable: action.payload }
    case CHANGE_CODE_SENDED:
      return { ...state, codeSended: action.payload }
    case CHANGE_CODE_BUTTON_TEXT:
      return { ...state, checkText: action.payload }
    case CHANGE_TIME_OUT:
      return { ...state, timeOut: action.payload }
    default:
      return state;
  }
}

// 更新用户信息
function AuthUpdate(obj) {
  return { type: AUTH_UPDATE, payload: obj }
}

// 错误处理文字
function errorMsg(msg) {
  return { type: ERROR_MSG, payload: msg }
}

// 改变注册文字
function changeRegisterMsg(msg) {
  return { type: CHANG_EREGISTE_RMSG, payload: msg }
}

// 改变重置密码文字
function changeResetMsg(msg) {
  return { type: CHANG_RESET_RMSG, payload: msg }
}

// 改变验证码按钮是否可以用
function changeCodeButtonDisable(msg) {
  return { type: CHANGE_CODE_BUTTON_DISABLE, payload: msg }
}

//改变验证码发送状态
function changeCodeed(msg) {
  return { type: CHANGE_CODE_SENDED, payload: msg }
}

// 改变获取验证码按钮文字
function changeCodeButtonText(msg) {
  return { type: CHANGE_CODE_BUTTON_TEXT, payload: msg }
}

// 改变倒计时时间
function changeTimeOut(msg) {
  return { type: CHANGE_TIME_OUT, payload: msg }
}
 
/**
 * 登录
 */
export function login(email, password) {
  const check = checkAllInfo('login',email, password)
  if (check.success) {
    return async dispatch => {
      const loginData = axios.post("/signin", {
        email,
        password
      })
      try {
        let result = await loginData
        if (result.status === 200) {
          history.push('/about')
          dispatch(AuthUpdate(result.data.data.accessToken))
          setCookie('token', result.data.data.accessToken)
        }
      } catch (e) {
        if(e.response){  //请求发出去后收到服务器错误响应
          dispatch(errorMsg(e.response.data.msg))
        } else {  // 请求发送失败本地错误响应
          dispatch(errorMsg(e.message))
        }
      }
    }
  } else {
    return errorMsg(check.msg);
  }
}

/**
 * 登录消除redux信息以及清除cookie中数据
 */
export function logout() {
  clearCookie('token')
  return { type: AUTH_UPDATE, payload: "" };
}

export function userDateUpdate(){
  return async dispatch => {
    const getUserData = axios.get("/user")
    try {
      let result = await getUserData
      if (result.status === 200) {
        dispatch(AuthUpdate(result.data.data))
      }
    } catch (e) {
      /**
       * TODO 获取数据失败处理
       */
    }
  }
}

/**
 * 注册
 */
export function register(email, password, code) {
  const check = checkAllInfo('register', email, password, code)
  if (check.success) {
    return async dispatch => {
      dispatch(changeRegisterMsg('正在注册'))
      const registerData = axios.post("/signup", {
        email,
        password,
        code
      })
      try {
        let result = await registerData
        if (result.status === 201) {
          dispatch(changeRegisterMsg('注册成功,正在跳转登录'))
          dispatch(errorMsg(''))
          setTimeout(() => {
            history.push("/login");
            dispatch(changeRegisterMsg('注册'))
          }, 1000);
        }
      } catch (e) {
        dispatch(changeRegisterMsg('注册'))
        if(e.response){  //请求发出去后收到服务器错误响应
          dispatch(errorMsg(e.response.data.msg))
        } else {  // 请求发送失败本地错误响应
          dispatch(errorMsg(e.message))
        }
      }
    }
  } else {
    return errorMsg(check.msg);
  }
}

/**
 * 重置密码
 */
export function reset(email, password, code) {
  const check = checkAllInfo('register', email, password, code)
  if (check.success) {
    return async dispatch => {
      dispatch(changeResetMsg('正在重置密码'))
      const registerData = axios.patch("/user/reset", {
        email,
        password,
        code
      })
      try {
        let result = await registerData
        if (result.status === 200) {
          dispatch(changeResetMsg('注册重置,正在跳转登录'))
          dispatch(errorMsg(''))
          setTimeout(() => {
            history.push("/login");
            dispatch(changeResetMsg('重置密码'))
          }, 1000);
        }
      } catch (e) {
        dispatch(changeResetMsg('重置密码'))
        if(e.response){  //请求发出去后收到服务器错误响应
          dispatch(errorMsg(e.response.data.msg))
        } else {  // 请求发送失败本地错误响应
          dispatch(errorMsg(e.message))
        }
      }
    }
  } else {
    return errorMsg(check.msg);
  }
}

/**
 * 获取验证码
 */
export function getCode(type,email) {
  const check = checkAllInfo('getCode', email)
  if (check.success) {
    return async dispatch => {
      dispatch(errorMsg(""))
      dispatch(changeCodeButtonDisable(true))
      dispatch(changeCodeButtonText("正在发送"))
      const getValidata = axios.post("/email/validate", {
        email,
        type
      })
      try {
        let result = await getValidata;
        if (result.status === 200) {
          dispatch(changeCodeButtonText("已发送"))
          dispatch(changeCodeed(true))
          let timeOut = 99;
          function timeDown() {
            timeOut--;
            if (timeOut === 0) {
              clearInterval(a);
              dispatch(changeTimeOut(99))
              dispatch(changeCodeButtonDisable(false))
              dispatch(changeCodeed(false))
              dispatch(changeCodeButtonText("获取验证码"))
            }
            dispatch(changeTimeOut(timeOut))
          }
          let a = setInterval(timeDown, 1000);
        }
      } catch (e) {
        dispatch(changeCodeButtonText("获取验证码"))
        dispatch(changeCodeButtonDisable(false))        
        dispatch(changeCodeed(false))
        if(e.response){  //请求发出去后收到服务器错误响应
          dispatch(errorMsg(e.response.data.msg))
        } else {  // 请求发送失败本地错误响应
          dispatch(errorMsg(e.message))
        }
        
      }
    }
  } else {
    return errorMsg(check.msg);
  }
}

/**
 * 页面卸载前清楚错误信息
 */
export function cleareMsg(){
  return { type: ERROR_MSG, payload: "" };
}