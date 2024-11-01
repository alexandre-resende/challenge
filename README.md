## This framework aims to test the endpoints of an API, designed using the Chai, Mocha, Supertest and Typescript

* Supports multiple environments, but currently only PROD (default) is mapped;
* Validates all possible errors in the response, instead of stopping at the first error;
* It has an implicit timeout of 10 seconds, which can be changed in the test if necessary;
* The mochawesome reporter is being created at the end of the run.

### Pre-requisites:
* Verify that the environments are correctly defined in `src/environment.ts`
* Generate a valid token on https://apilayer.com/marketplace/fixer-api

### Setup environment
* Run the script to generate the .env file: `npm run setup`
* Fill the `API_KEY` value on .env file

### How to Run Test
* Execute the command: `npm test`