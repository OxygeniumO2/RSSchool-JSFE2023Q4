enum WebSocketMessageTypes {
  Error = 'ERROR',
  MsgEdit = 'MSG_EDIT',
  UserExternalLogin = 'USER_EXTERNAL_LOGIN',
  UserLogin = 'USER_LOGIN',
  UserExternalLogout = 'USER_EXTERNAL_LOGOUT',
  UserActive = 'USER_ACTIVE',
  UserInactive = 'USER_INACTIVE',
  MsgSend = 'MSG_SEND',
  MsgFromUser = 'MSG_FROM_USER',
  MsgDelete = 'MSG_DELETE',
  MsgRead = 'MSG_READ',
  MsgDeliver = 'MSG_DELIVER',
  UserLogout = 'USER_LOGOUT',
}

export default WebSocketMessageTypes;
