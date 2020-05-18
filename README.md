# Progressive Weather App
[![Netlify Status](https://api.netlify.com/api/v1/badges/4ca056c9-b3f6-48a4-b28e-ac891850e4ed/deploy-status)](https://app.netlify.com/sites/progressive-weather-15d0d6/deploys)
[![PWA Shields](https://www.pwa-shields.com/1.0.0/series/classic/white/gray.svg)](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fprogressive-weather-15d0d6.netlify.app%2F&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext#pwa)

Progressive web app reporting weather forecast

Demo: [https://progressive-weather-15d0d6.netlify.app/](https://progressive-weather-15d0d6.netlify.app/)

## Installation

#### iOS
Visit https://progressive-weather-15d0d6.netlify.app/ on **Safari**. 
You can install the app by tapping the share button (square icon with upward arrow at the bottom bar) > Add to Home Screen > Add.

#### Android
Visit https://progressive-weather-15d0d6.netlify.app/ on Chrome.
You can install the app from the three dot menu (next to the address bar) > Add to Home screen or through the Add to Home screen banner.

#### Development
`yarn start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`yarn build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Features
- **7 Day Forecast for Your Location**: Using the Geolocation API, the app asks for your current location and displays the corresponding weather report.
- **Offline Mode**: The app works independent to internet connectivitiy thanks to service workers serving cached files. When network connection is not available, you will see the offline mode banner at the top. In addition to that, the app saves weather data in local storage allowing you to browse the saved forecasts offline.
- **Forecast for Cities Worldwide**: City forecasts are implemented on the route level such that the URL indicates the application state. This allows you to share a link (e.g. https://progressive-weather-15d0d6.netlify.app/tokyo) and the app automatically loads forecast for a specific city.
- **Mobile-friendly UI**: All UI elements are optimized for cross-platform support, creating an app-like experience on mobile devices even though it is built on web technologies.

#### Future Work
- **Full Cities Support**: ability to search and save new cities to your favourite list.
- **Hourly Forecast**: make use of the rich data provided by the API and create more detailed weather reports.
- **Other PWA Features**: provide features such as background sync and push notifications if the device/browser supports them.
- **Skeleton Screens**: progressive loading content to skeleton screens for a smoother app experience.


## Resources
This project was built with the following list of frameworks, APIs and resources:
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Web requests using [axios](https://www.npmjs.com/package/axios) library
- Open weather API - https://openweathermap.org/api/one-call-api
- Parsing dates with [Moment.js](https://momentjs.com/)
- Cross-platform mobile UI components from [Ionic](https://github.com/ionic-team/ionic)
- Deployed demo with [Netlify](https://www.netlify.com/)
