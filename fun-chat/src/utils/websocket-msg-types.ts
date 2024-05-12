enum WebSocketMessageTypes {
  error = 'ERROR',
  msgEdit = 'MSG_EDIT',
  userExternalLogin = 'USER_EXTERNAL_LOGIN',
  userLogin = 'USER_LOGIN',
  userExternalLogout = 'USER_EXTERNAL_LOGOUT',
  userActive = 'USER_ACTIVE',
  userInactive = 'USER_INACTIVE',
  msgSend = 'MSG_SEND',
  msgFromUser = 'MSG_FROM_USER',
  msgDelete = 'MSG_DELETE',
  msgRead = 'MSG_READ',
  msgDeliver = 'MSG_DELIVER',
  userLogout = 'USER_LOGOUT',
}

export default WebSocketMessageTypes;
