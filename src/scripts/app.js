import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {TweetCollection} from './Models.js'
import TweetView from './TweetView.js'

const app = function() {

	const TweetRouter = Backbone.Router.extend({
		routes: {
			"home": "showTweets",
			"*catchall": "routeHome"
		},

		showTweets: function(){
			var tweetColl = new TweetCollection()
			tweetColl.fetch()
			ReactDOM.render(<TweetView tweetColl={tweetColl} />, document.querySelector('.container'))
		},

		routeHome: function(){
			location.hash = "home"
		},

		initialize: function(){
			Backbone.history.start()
		}
	})

new TweetRouter()


}

app()