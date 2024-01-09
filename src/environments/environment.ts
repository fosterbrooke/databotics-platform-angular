// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiEndPoint: "https://api.databotics.io/",
  apiEndPoint: "http://192.168.128.48:4006/",
  // newEndPoint: "http://139.59.33.108:1337/",
  // covidEndPoint: "http://139.59.33.108:1337/",
  newEndPoint: "https://api.databotics.io/",
  // apiEndPoint: "http://ec2-3-231-255-189.compute-1.amazonaws.com:4006",
  linxupEndPoint: "https://www.linxup.com/ibis/rest/linxupmobile",
  linxupApiEndPoint: 'https://www.linxup.com/ibis/rest/api/v2/',
  linxupDBEndPoint: 'http://ec2-3-225-207-252.compute-1.amazonaws.com:8081'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
