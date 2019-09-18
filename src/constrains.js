var constraints = {
    email: {
      presence: true,
      exclusion: {
        within: ["nicklas"],
        message: "'%{value}' is not allowed"
      },
      format: {
        pattern : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/,
        message : "not is a valid email",
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    }
  };

export default constraints;