# Sample MUI Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Clone repository and Install required packages

```sh
cd ~/mui-starter-kit
npm install
```

### Enviornment Variables

Rename `.env.example` to `.env` and update your project envirnment variables

```
...
REACT_APP_API_URL=http://localhost:5000
...
```

Also use development, test and production envirnments (Rename filenames as to remove `.example`)

In the project directory, you can run:

## Runs the app in the development mode.

```sh
npm run start
```

## Launches the test runner in the interactive watch mode.

```sh
npm run test
```

## Format code with Prettier

```sh
npm run format
```

## Builds the app for production to the `build` folder.

```sh
npm run build
```

## Use Prettier and ESLintr formatter into development envirnment

Find the configuration respectively `.prettierrc.json` and `.eslinterrc.json`

## Project Structure

-   Consider using Material UI to design componets (find reference [here](https://mui.com/material-ui/getting-started/overview/))
-   Create and use modules, For example `\services\auth.js` for localStorage for auth managment
-   Create and Use application hooks in `\hooks\*` folder
-   Test you componets and create snapshot for it. Find some tests into `__test__\*` folder
-   Consume application store to manage data `\redux` (find reference [here](https://redux-toolkit.js.org/introduction/getting-started))
    -   Define actions and respective reducers for that actions `\redux\actions\*` and `\redux\reduces\*`
    -   Dispatch different actions from componets and Consume different states from their reducers
