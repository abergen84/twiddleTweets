let Router = require('express').Router;
const apiRouter = Router()

// let User = require('../db/schema.js').User
// let Post = require('../db/schema.js').Post
let Tweet = require('../db/schema.js').Tweet


// apiRouter.get('/users', function(req, res){
//   User.find({}, function(err, results){
//     res.json(results)
//   })
// })

//This is a great request to the DB to get all tweets
apiRouter.get('/tweets', function(request, response){
  //if its a get method directed to /tweets/, then run function(request, result)
  Tweet.find({}, function(error, results){
    if(error){
      response.json({
        message: error
      })
    }
    //we are putting an empty object into the find method to grab everything
    response.json(results)
    //when the results come back from the DB, we wrap it in JSON. take the results, wrap it in 
    //json, and then add it to the response we send back to the client
  })
})

apiRouter.post('/tweets', function(request, response){
  let newTweet = new Tweet(request.body) //new variable created on instance of Tweet
  //constructor, passing in tweet data sent by the client
  newTweet.save(function(error){ //save new tweet into database
    if(error){
      response.json({
        message: error
      })
    } else {
      response.json(newTweet)
      //send the new tweet back to client to confirm it was saved
    }  
  })

})

// //read many
// apiRouter.get('/posts/', function(req, res){
//   Post.find(req.query, function(err, results){
//     res.json(results)
//   })
// })

// //read one
// apiRouter.get('/posts/:_id', function(req, res){
//   Post.findOne(req.params, function(err, result){
//     res.json(result)
//   })
// })

// //create one
// apiRouter.post('/posts', function(req, res){
//   let newPost = new Post(req.body)
//   newPost.save(function(err){
//     if(err) return res.json({message: 'error saving'})
//       res.json(newPost)
//   })
// })

// //update one
// apiRouter.put('/posts/:_id', function(req,res) {
//   Post.findOne(req.params, function(err,record) {
//     for (var prop in req.body) {
//       record[prop] = req.body[prop]
//     }
//     record.save(function(err){
//       if(err) return res.json({message: 'error saving'})
//       res.json(record)
//     })
//   })
// })

// //delete one
// apiRouter.delete('/posts/:_id', (req,res) => {
//   Post.remove(req.params,(err) => {
//     res.status(204).json({msg: "record successfully deleted",
//       _id: req.params._id})
//   })
// })

module.exports = apiRouter