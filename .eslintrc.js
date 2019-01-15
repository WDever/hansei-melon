module.exports = {
  "extends": [
      "react-app",
      "airbnb",
      "prettier"
    ],
    "rules": {
      "react/prefer-stateless-function": 0,
      "react/jsx-filename-extension": 0,
      "react/jsx-one-expression-per-line": 0,
      "react/prop-types": 1,
      "jsx-a11y/click-events-have-key-events": 1,
      "jsx-a11y/no-static-element-interactions": 1,
      "no-param-reassign": 0,
      "no-underscore-dangle": 1
    },
    "env": {
      "browser": true
    }
}