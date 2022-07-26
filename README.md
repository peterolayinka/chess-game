# Overview

A web application that enables users user play the chess game.

## How it works

This is a React app that integrates the chess.js and chessboardjsx library to build an interactive game that enables you:

- Parameterize game duration
- Undo and redo game moves
- Uses react context to store state across all components
- Caches the game state in the local storage using custom React hooks
- Play a responsive chess game that can be played on a mobile phone.

Sketch: https://excalidraw.com/#json=VFIeyW-YxF_6zHUSR25Xy,kVFtIuW_UjnNUfRqoUJulQ
Video: https://www.loom.com/share/480f0bcc8caa4e85bb536a57a3fab4fb

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Test Driven Approach
TDD was utilized to build out this game by checking for the following before building out the logic and interface:

- Ensure ChessBoard is rendered
- Ensure timer is rendered
- Ensure the Players name is displayed
- Ensure player's moves are rendered
- Ensure the cancel button is rendered
- Ensure the back and forward button is displayed
- Ensure imported chess logic/library is functional
- Ensure the back button can go back in game time and history
- Ensure the forward and backward button is functional
- Ensure the result page is rendered appropriately
- Ensure the game can be cancelled

## Requirements/Tools:
- [Chess visualization library](https://chessboardjsx.com/custom)
- [Chess Logic Library](https://github.com/jhlywa/chess.js/#game_over)
- Local Storage
- [Javascript/React.js](https://reactjs.org/)
