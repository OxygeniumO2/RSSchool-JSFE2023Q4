interface UserAuthClient {
  id: string;
  type: 'USER_LOGIN';
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

interface UserLogoutClient {
  id: string;
  type: 'USER_LOGOUT';
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

interface GetAllOnlineUsersClientResp {
  id: string;
  type: 'USER_ACTIVE';
  payload: null;
}

interface GetAllOfflineUsersClientResp {
  id: string;
  type: 'USER_INACTIVE';
  payload: null;
}

type UsersServerResp = UserServerResp[];

interface UserServerResp {
  login: string;
  isLogined: boolean;
}

interface GetAllMessagesClientResp {
  id: string;
  type: 'MSG_FROM_USER';
  payload: {
    user: {
      login: string;
    };
  };
}

export {
  UserAuthClient,
  UserLogoutClient,
  GetAllOnlineUsersClientResp,
  GetAllOfflineUsersClientResp,
  UsersServerResp,
  GetAllMessagesClientResp,
};
