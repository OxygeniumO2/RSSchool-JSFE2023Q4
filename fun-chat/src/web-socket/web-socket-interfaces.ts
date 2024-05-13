import WebSocketMessageTypes from '../utils/websocket-msg-types';

interface BaseResponse {
  id: string;
  type: WebSocketMessageTypes;
}

interface UserAuthClient extends BaseResponse {
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

interface UserLogoutClient extends BaseResponse {
  payload: {
    user: {
      login: string;
      password: string;
    };
  };
}

interface GetAllOnlineUsersClientResp extends BaseResponse {
  payload: null;
}

interface GetAllOfflineUsersClientResp extends BaseResponse {
  payload: null;
}

interface UserServerResp {
  login: string;
  isLogined: boolean;
}

interface GetAllMessagesClientResp extends BaseResponse {
  payload: {
    user: {
      login: string;
    };
  };
}

interface SendMessageToUserData extends BaseResponse {
  payload: {
    message: {
      to: string;
      text: string;
    };
  };
}

interface EditMessage extends BaseResponse {
  payload: {
    message: {
      id: string;
      text: string;
    };
  };
}

interface ReadMessage extends BaseResponse {
  payload: {
    message: {
      id: string;
    };
  };
}

export {
  UserAuthClient,
  UserLogoutClient,
  GetAllOnlineUsersClientResp,
  GetAllOfflineUsersClientResp,
  GetAllMessagesClientResp,
  UserServerResp,
  SendMessageToUserData,
  EditMessage,
  ReadMessage,
};
