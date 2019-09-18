var constraints = {
    email: {
      presence: {
        "allowEmpty": false
      },
      exclusion: {
        within: ["nicklas"],
        message: "'%{value}' is not allowed"
      },
      email: true
    },
    password: {
        presence: {
            "allowEmpty": false
        },
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    }
  };

export default constraints;