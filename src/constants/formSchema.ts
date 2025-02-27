// Validation schemas for the login page
export const emailSchema = {
  required: "Email field is requred",
  pattern: {
    value:
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Email is not valid!",
  },
};

export const passwordSchema = {
  required: "password is required",
  minLength: {
    value: 6,
    message: "password must be at least 6 characters",
  },
};

export const displayNameSchema = {
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name cannot be less than 3 characters",
  },
};
