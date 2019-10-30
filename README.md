## Can Sarah [Drasner's ecommerce-netlify](https://github.com/sdras/ecommerce-netlify) be more amazing?

# Yeah, it can be PWAmazing!

[![Netlify Status](https://api.netlify.com/api/v1/badges/fbf53d4a-d931-4768-a7ee-3d9fffb9f407/deploy-status)](https://app.netlify.com/sites/ecommerce-netlify-pwa/deploys)

The motivation of this repository is to show the transformation of a project into a PWA in demo time for my [JSNight 2019.2](https://www.meetup.com/es-ES/canarias-javascript/events/265096702) and [JSDay Canarias 2019](https://jsdaycanarias.com/) talks

We will use two different approaches, using the [@nuxtjs/pwa](https://pwa.nuxtjs.org/) module and [Google's Workbox Libraries](https://developers.google.com/web/tools/workbox)

- Give it offline capabilities
- Make it installable on different devices
- Use of runtime cache
- Different caching strategies
- The use of precaching
- Friendly handling of application updates
- Offline Google Analytics with background synchronization
- Push notifications using [OneSignal](https://onesignal.com/)
- Client-side DB working even offline with automatic background synchronization [WIP]
- ...
- More to come!

**Demo site is here:** [E-Commerce Store PWA](https://ecommerce-netlify-pwa.netlify.com/)

**NOTE:** To get a better idea of why and how of some decisions and different ways of doing things, here is the order of the branches to follow for both approaches

| Oder 	| @nuxtjs/pwa                        	|   	| Oder 	| workbox-webpack-plugin      	|
|:----:	|------------------------------------	| --- |:----:	|-----------------------------	|
|   0  	| original                           	|   	|   0  	| original                    	|
|   1  	| add-pwa-module                     	|   	|   1  	| inject-manifest-precache    	|
|   2  	| pwa-module-installable             	|   	|   2  	| skip-waiting-confirmation   	|
|   3  	| pwa-module-basic-register-route    	|   	|   3  	| inject-manifest-installable 	|
|   4  	| pwa-module-precache-dynamic-assets 	|   	|   4  	| google-analytics            	|
|   5  	| pwa-module-offline                 	|   	|     	|                             	|
|   6  	| pwa-module-offline-analytics       	|   	|     	|                             	|
|   7  	| pwa-module-push-notifications      	|   	|     	|                             	|

### ORIGINAL README.MD
> 
> # 🛍 Ecommerce Store with Netlify Functions and Stripe
> 
> > A serverless function to process stripe payments with Nuxt, Netlify, and Lambda
> 
> Demo site is here: [E-Commerce Store](https://ecommerce-netlify.netlify.com/)
> 
> ![screenshot of site](https://s3-us-west-2.amazonaws.com/s.cdpn.io/28963/ecommerce-screenshot.jpg "E-Commerce Netlify Site")
> 
> There are two articles explaining how this site is set up:
> * Explanation of Netlify Functions and Stripe: [Let's Build a JAMstack E-Commerce Store with Netlify Functions](https://css-tricks.com/lets-build-a-jamstack-e-commerce-store-with-netlify-functions/)
> * Explanation of dynamic routing in Nuxt for the individual product pages: [Creating Dynamic Routes in Nuxt Application](https://css-tricks.com/creating-dynamic-routes-in-a-nuxt-application/)
> 
> ## Build Setup
> 
> ``` bash
> # install dependencies
> $ yarn install or npm install
> 
> # serve with hot reload at localhost:3000
> $ yarn dev or npm dev
> 
> # build for production and launch server
> $ yarn build or npm build
> $ yarn start or npm start
> 
> # generate static project
> $ yarn generate or npm generate
> ```
> 
> For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
> 
