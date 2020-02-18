[![Build Status](https://travis-ci.org/mmennis/petclinic-react-bulma.svg?branch=master)](https://travis-ci.org/mmennis/petclinic-react-bulma)

## Frontend for Node Implementation of Petclinic REST service
Configuration in .env.example (change to .env).  Currently set to http://locallhost:4100

#To run docker files:

```docker-compose -f docker/docker-compose.yml build test```

```docker-compose -f docker/docker-compose.yml run --rm test```



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
