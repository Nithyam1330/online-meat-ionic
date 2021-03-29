import { HttpHeaders } from '@angular/common/http';
export const RequestEnums = {
    REGISTER: {
        type: 'POST',
        path: '/user/register',
        keys: [],
        values: [],
        // header: new HttpHeaders({
        //      "Content-Type": "application/json"
        // })
    },
    LOGIN: {
        type: 'POST',
        path: '/user/login',
        keys: [],
        values: [],
    },
    FORGOT_PASSWORD:{
        type: 'PUT',
        path: '/user/forgot-password',
        keys: [],
        values: [],
    },
    SAVE_PROFILE:{
      type: 'POST',
      path: '/user-details',
      keys: [],
      values: [],
  }
};

