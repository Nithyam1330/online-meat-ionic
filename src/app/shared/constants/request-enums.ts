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
  ADD_NEW_ADDRESS: {
    type: 'POST',
    path: '/user-details/:id/address',
    keys: ['id'],
    values: [],
  },
  UPDATE_ADDRESS: {
    type: 'PUT',
    path: '/user-details/:id/address/:address_id',
    keys: ['id', 'address_id'],
    values: [],
  },
  GET_ALL_ADDRESS: {
    type: 'GET',
    path: '/user-details/:id/address',
    keys: ['id'],
    values: [],
  },
  DELETE_ADDRESS_BY_ADDRESS_ID: {
    type: 'DELETE',
    path: '/user-details/:id/address/:addressId',
    keys: ['id', 'addressId'],
    values: [],
  },
  GET_ADDRESS_BY_ADDRESS_ID: {
    type: 'GET',
    path: '/user-details/:id/address/:addressId',
    keys: ['id', 'addressId'],
    values: [],
  }

};
