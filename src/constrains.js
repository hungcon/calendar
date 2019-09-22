var constraints = {
    email: {
      presence: {
        "allowEmpty": false
      },
      email: true
    },
    password: {
        presence: {
            "allowEmpty": false
        },
      length: {
        minimum: 6,
        maximum: 15,
        message: "must be at least 6 characters and less than 15 characters"
      }
    },
    confirmPassword: {
      equality: "password"
    },
    clientName: {
      presence: {
          "allowEmpty": false
      }
    },
    startTime: {
      presence: {
          "allowEmpty": false
      }
    },
    duration: {
      presence: {
          "allowEmpty": false
      },
      numericality: true,
      notLessThanOrEqualTo: 0
    },
    location: {
      presence: {
          "allowEmpty": false
      }
    },
    staffName: {
      presence: {
          "allowEmpty": false
      }
    }

  };

export default constraints;