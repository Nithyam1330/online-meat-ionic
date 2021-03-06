

export const VALIDATION_PATTERNS = {
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NAME: /^[a-zA-Z ]*$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*]+$/i,
  PHONE: /\d{10}/,
  USERNAME: /^[a-z0-9A-Z]+$/i,
  POSITIVE_INTEGER: /^[0-9," "]+$/i,
  PINCODE : /^(\d{6})$/
};
