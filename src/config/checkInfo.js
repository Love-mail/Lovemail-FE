export default function checkAllInfo(type, email, password, code) {
  console.log('test')
  let reg = new RegExp(
    "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
  );
  if (!reg.test(email)) {
    return {
      success: false,
      msg:  "请输入正确的邮箱"
    }
  } else if (type!=="getCode" && password.length <= 3) {
    return {
      success: false,
      msg:  "请输入正确的密码(4位以上)"
    }
  } else if (type!=="getCode" && type!=="login" && code.length <= 0) {
    return {
      success: false,
      msg:  "请输入验证码"
    }
  } else {
    return {
      success: true,
      msg:  "验证成功"
    }
  }
}

// console.log(checkAllInfo('null'))

