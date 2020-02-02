module.exports = {
    "env": {
        "node": true,
        "browser": true,
        "es6": true,
        "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        // "ecmaFeatures": {
        //     "jsx": true
        // },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //"react/no-direct-mutation-state": 0 直接修改state
        "react/no-render-return-value": 0,
        "require-atomic-updates": 0,
        "no-console": ["error", { allow: ["info"] }]
    },
    "settings": {
        "react": {
            "version": require("./package.json").dependencies.react,
        },
    }
};