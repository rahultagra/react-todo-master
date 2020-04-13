# Not another TODO APP

## Introduction

Hi! there, so I started this project with the intention to practice and stablish some best practices of development, reactJs, redux and reducers, tests, folder structure, naming, linting, configurations, and more.
I was thinking in which type of app should I create to apply those practices, after an hour I just said wait!, let's do it in the most common starter app! a ToDo App, 🤔 ok ?!?!. Then I realized that everyone has a ToDo App with the same styles or layout, so I said no! let's do something different but simple and there you have "Not Another ToDo App". Hope you enjoy it!.

## How AppDynamics have been Integrated

Following is the script we get from AppDynamics.

    <script type="text/javascript" charset="UTF-8">
      (function(config) {
        config.appKey = <APP-KEY/>;
        config.adrumExtUrlHttp = "http://cdn.appdynamics.com";
        config.adrumExtUrlHttps = "https://cdn.appdynamics.com";
        config.beaconUrlHttp = "http://col.eum-appdynamics.com";
        config.beaconUrlHttps = "https://col.eum-appdynamics.com";
        config.xd = { enable: true };
        config.spa = {
          spa2: true
        };
      })(window["adrum-config"] || (window["adrum-config"] = {}));

      (function(cfg) {
        if (cfg.beacon) cfg.beacon.neverSendImageBeacon = true;
        else cfg.beacon = { neverSendImageBeacon: true };
      })(window["adrum-config"] || (window["adrum-config"] = {}));
    </script>

    <script
      src="//cdn.appdynamics.com/adrum/adrum-latest.js"
      type="text/javascript"
      charset="UTF-8"
    >
    </script>

We need to put this script on our page to app and update the key with key generated for you app by appdynamics.

#### Problem Statement for using Appdynamics

Now in case of SPA's and microfrontend architectures, Where we don not refresh our page .So in those cases how appdynamics can track the page-views w.r.t different components ?

#### Solution

In those cases you can simply use

     window.ADRUM.markVirtualPageBegin("YOUR-COMPONENT-NAME", true);

And after mounting of your component call

     window.ADRUM.markVirtualPageEnd();

This is how we are tracking Virtual page views.

Note:

        config.spa = {
          spa2: true
        };

Must be added to make Appdynamics know that you are working with Single Page Applications made with react library.


#### Appdynamics Metrics

For base pages, Browser RUM calculates 
        
        End User Response Time (EURT)
        Visually Complete Time (VCT)
        Page Complete Time  (PCT). 
  
For virtual pages, Browser RUM calculates
        
        End User Response Time (EURT)
        Visually Complete Time (VCT)

##### End User Response Time

End User Response Time (EURT) calculates the total time for all content (visual and non-visual) to be loaded on a page. 

##### Visually Complete Time

Visually Complete Time (VCT) calculates the point in time when the browser has finished loading all visual content in the viewport.

##### Page Complete Time

Page Complete Time (PCT) is a SPA2 metric for base pages only. PCT calculates the point in time when the browser has finished loading all visual content on the page, regardless of whether the content is in or outside the viewport.

## App Link

You can see in action [here](https://luiggi370z.github.io/react-todo/).

## Stack

- ReactJS + hooks
- Redux + Reselect
- CSS Modules / Sass
- Date-fns
- Enzyme/Jest
- ESlint + Husky

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

### Deployment

### `npm run build` fails to minify

## Tests

### Notes

- I used `check-prop-types` for propTypes tests.
- Customize `jsconfig` to run correctly Jest from VS Code plugin.
- Customize `jsconfig` to use src as root folder for imports.
- Customize eslint rule to specify special files to ignore imports from dev dependencies rule.
- More details about best practices could be found in my repo `react-starter-kit`.
