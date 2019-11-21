/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var fetch = require('node-fetch')
var bluebird = require('bluebird')
var axios = require('axios')
fetch.Promise = bluebird;
// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
function successWithCors(result) {
  return { 
       statusCode: 200,
       body: JSON.stringify(result),
       headers: {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*' 
      }
 };
}

/**********************
 * Example get method *
 **********************/
// app.get('/celebImages', async (req, res, next) => {
//   //req.body to get empty dictionary 
//   let names = ['Lindsay Lohan', 'Ryan Higa']
//   let photosAndNames = [];
//   try {
//     for(let i=0; i<names.length; i++) {
//       let nameOfArtist = names[i];
//       const getId = await fetch(`https://api.themoviedb.org/3/search/person?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US&query=${nameOfArtist}&page=1`);
//       const json = await getId.json();
//       if(json.results[0]) {
//         let id = json.results[0].id;
//         const getInfo = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US`);
//         const json2 = await getInfo.json();
//         const returns = {
//           name: json.results[0].name,
//           photo: "https://image.tmdb.org/t/p/w1280" + json.results[0].profile_path,
//           info: json2.biography
//         };
//         photosAndNames.push(returns);
//         console.log("checking this: " + photosAndNames[i]);
//       }
//     }
//     res.json({
//       message: photosAndNames,
//       error: false
//     });
//   } catch(e) {
//     console.log(e);
//       res.json({
//         message: "Encountered Error",
//         error: true
//     });
//   }
// });


app.get('/search', async (req, res, next ) => {
  let name = req.query.name;
  let page = req.query.page;
  // Add your code here
 // res.json({success: 'get call succeed!', url: req.url, n:name, p:page});
  try {
    console.log("HI");
    const getId = await fetch(`https://api.themoviedb.org/3/search/person?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US&query=${name}&page=1`);
    const json= await getId.json();
    //console.log(json.results[0]);
    if (json.results[0]) {
        const id = json.results[0].id;
        const getMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast=${id}&page=${page}`);
        const json2 = await getMovies.json();
        const getInfo = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US`)
        const json3 = await getInfo.json();
        //console.log(json2.results);
        const returns = {
            id: json.results[0].id,
            name: json.results[0].name,
            photo: "https://image.tmdb.org/t/p/w1280" + json.results[0].profile_path,
            movies: json2.results,
            total: json2.total_results,
            pages: Math.ceil(json2.total_results/20),
            info: json3.biography
        };
        console.log(json2.results.length);
        console.log(returns);
        res.json({
          message:returns,
          error: false
        });
    }
    else {
      res.json({
        message:"Item not found",
        error: true
      });
    }
  } catch (e) {
      console.log(e);
      res.json({
        message: "Encountered Error",
        error: true
      });
    }
});

app.get('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/search', function(req, res) {
    const name1 = "Lindsay Lohan";
    const page1 = "1";
    return successWithCors("MADE IT");
    // try {
    //     console.log("HI");
    //     const getId = await fetch(`https://api.themoviedb.org/3/search/person?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US&query=${name}&page=1`);
    //     const json= await getId.json();
    //     //console.log(json.results[0]);
    //     if (json.results[0]) {
    //         const id = json.results[0].id;
    //         const getMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast=${id}&page=${page}`);
    //         const json2 = await getMovies.json();
    //         const getInfo = await fetch(`https://api.themoviedb.org/3/person/${json.results[0].id}?api_key=2cbde4075edb513172b32b5126a770d4&language=en-US`)
    //         //console.log(json2.results);
    //         const returns = {
    //             id: json.results[0].id,
    //             name: json.results[0].name,
    //             photo: "https://image.tmdb.org/t/p/w1280" + json.results[0].profile_path,
    //             movies: json2.results,
    //             total: json2.total_results,
    //             pages: Math.ceil(json2.total_results/20),
    //             info: getInfo
    //         };
    //         console.log(json2.results.length);
    //         console.log(returns);
    //         res.json({
    //           status:200,
    //           headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Credentials": true
    //           },
    //           message:JSON.stringify(returns)
    //         });
    //     }
    //     else {
    //       res.json({
    //         status:500,
    //         headers: {
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Credentials": true
    //         },
    //         error:JSON.stringify("Item not found")
    //       });
    //     }
    //   } catch (e) {
    //       console.log(e);
    //       res.json({
    //         status:500,
    //         headers: {
    //           "Access-Control-Allow-Origin": "*",
    //           "Access-Control-Allow-Credentials": true
    //         },
    //         error:JSON.stringify("Error encountered.")
    //       });
    //     }
});

app.post('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/search', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/search', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/search/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app