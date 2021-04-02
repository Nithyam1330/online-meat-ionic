export const RequestEnums = {
  REGISTER: {
    type: 'POST',
    path: '/user/register',
    keys: [],
    values: [],
  },
  LOGIN: {
    type: 'POST',
    path: '/user/login',
    keys: [],
    values: [],
  },
  FORGOT_PASSWORD: {
    type: 'PUT',
    path: '/user/forgot-password',
    keys: [],
    values: [],
  },
  SAVE_PROFILE: {
    type: 'POST',
    path: '/user-details/:id',
    keys: ['id'],
    values: [],
  },
  GET_GENDER_TYPES: {
    type: 'GET',
    path: '/gender',
    keys: [],
    values: [],
  },
  RESET_PASSWORD: {
    type: 'PUT',
    path: '/user/reset-password/:id',
    keys: ['id'],
    values: [],
  },
  GET_USER_PROFILE_DATA: {
    type: 'GET',
    path: '/user-details/:id',
    keys: ['id'],
    values: [],
  },
  UPDATE_USER_PROFILE_DATA: {
    type: 'PUT',
    path: '/user-details/:id',
    keys: ['id'],
    values: [],
  },

};
