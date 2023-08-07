Library of Congress Collections Application

I. What the Application Does

This is an app that works with data from the Library of Congress' Collections API and displays a set of information in a readable and browsable format with the aim of generating interest in the library's resources. I was motivated to work with this API to better acquaint myself with all The Library of Congress has to offer, and I hope that using my application benefits you in the same way!

II. How to Spin Up the App

Pull the code down from the Github Repository, and then run `npm start` from the terminal once you are in the root directory in your code editor. Once the server is up, you should be able to see the application if you navigate to http://localhost:3000 in your browser.


III. How To Use It

The site displays a paginated list of the collections available. When a user clicks on a list item, it leads to a show page with an image related to the collection and a description of the collection provided by the library. From there, you can click on a link that leads to that collection's page on the Library of Congress' website or can navigate back to the collection list using the back button. The list is searchable; if you type into the search bar and click the magnifying glass icon, the collection list will be narrowed based on matches with collection titles. If you clear the search, you get the full list back.

I hope that you enjoy familiarizing yourself with the Library of Congress' Collections!

IV. Video Demo of the Application

https://www.loom.com/share/0a4500bfd7b34f33b6b1e088a0beada9?sid=9573f35b-fddd-4681-83f7-a7592ed28753

V. Notes on the Technology Used and Potential Future Modifications

I used a React front-end framework for this application because of the ease of writing JavaScript with JSX and because of the benefits of other tools that come with it, for example hooks that help with state management and methods for handling lifecycle events. 

As it currently is, this fully functions as a front-end application, but to improve performance in the future and extend the uses of the app, I would add a back-end framework such as Ruby on Rails. If there was a back-end, I would make the fetches to the API through a controller and would also improve current routing to better manage the display of index and show pages.

The maintainability and scalabilty of the code could be improved by writing unit and integration tests and by incorporporating React's reducer hook to replace the reliance on passing down props.

It works as a small-scale app for demo purposes as is, but that is an indication of the direction I could take if I continued to build up the application! Thank you for taking the time to explore this project!





<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
