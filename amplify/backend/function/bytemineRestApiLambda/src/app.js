/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
	API_BYTEMINEGRAPHAPI_BYTEMINEFILTERITEMTABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINEFILTERITEMTABLE_NAME
	API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINESUBTABLE_NAME
	API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_ARN
	API_BYTEMINEGRAPHAPI_BYTEMINEUSAGETABLE_NAME
	API_BYTEMINEGRAPHAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_BYTEMINEGRAPHAPI_GRAPHQLAPIIDOUTPUT
	AUTH_BYTEMINEF573E062_USERPOOLID
	ENV
	FUNCTION_BYTEMINEAIENRICHLAMBDA_NAME
	REGION
	STORAGE_BYTEMINESTORAGE_BUCKETNAME
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const helloRouter = require('./v1/hello');
const meRouter = require('./v1/me');
const collectionsRouter = require('./v1/collections');
const usersRouter = require('./v1/users');
const searchRouter = require('./v1/search');
const csvFiltersRouter = require('./v1/csv-filters');
const authRouter = require('./v1/auth');
const contactsRouter = require('./v1/contacts');
const enrichmentsRouter = require('./v1/enrich');
const filtersRouter = require('./v1/filters');
const subscriptionsRouter = require('./v1/subscriptions');
const webhookRouter = require('./v1/webhook');

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.use('/api/v1/hello', helloRouter);
app.use('/api/v1/me', meRouter);
app.use('/api/v1/collections', collectionsRouter);
app.use('/api/v1/lists', collectionsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/search', searchRouter);
app.use('/api/v1/csv-filters', csvFiltersRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/enrichments', enrichmentsRouter);
app.use('/api/v1/filters', filtersRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);
app.use('/api/v1/webhook', webhookRouter);

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
