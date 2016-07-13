import Backbone from 'backbone'

export const TweetModel = Backbone.Model.extend({
	url: '/api/tweets'
})


export const TweetCollection = Backbone.Collection.extend({
	url: '/api/tweets',
	model: TweetModel
})

