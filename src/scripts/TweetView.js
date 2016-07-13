import React from 'react'
import Backbone from 'backbone'
import {TweetModel} from './Models.js'


const TweetView = React.createClass({
	
	getInitialState: function(){
		return {
			tweetColl: this.props.tweetColl
		}
	},

	componentWillMount: function(){
		this.state.tweetColl.on('sync update', ()=>{
			this.setState({
				tweetColl: this.state.tweetColl
			})
		})
	},

	render: function(){
		console.log(this)
		return (
			<div>
				<Header />
				<Composer tweetColl={this.state.tweetColl} />
				<TweetContainer tweetColl={this.state.tweetColl} />
			</div>
			)
	}
})

const Header = React.createClass({
	render: function(){
		return (
			<div id="title">
				<h1>Twiddle</h1>
			</div>
			)
	}
})


const Composer = React.createClass({
	
	_handleTwid: function(event){
		// console.log(event)
		event.preventDefault()
		var tweetModel = new TweetModel({
			userHandle: event.target.username.value,
			content: event.target.twids.value,
		})
		tweetModel.save() //add the tweet to the collection
		this.props.tweetColl.add(tweetModel)
	},

	render: function(){
		return (
			<div id="composer">
				<form onSubmit={this._handleTwid} >
					<input name="username" placeholder="enter your username"/>
					<textarea name="twids" placeholder="enter your twid"/>
					<button type="submit">Submit</button>
				</form>
			</div>
			)
	}
})


const TweetContainer = React.createClass({
	
	// _mapIt: function(array){
	// var _JSX = array.map(function(model){
	// 		return <Tweet model={model} />
	// 	})
	// return _JSX
	// },

	render: function(){
		console.log(this.props.tweetColl)
		return (
			<div id="tweetContainer">
				{/*<Tweet tweetColl={this.props.tweetColl} />*/}
				{/*this._mapIt(this.props.tweetColl)*/}
				{this.props.tweetColl.map((model)=> {
					return <Tweet model={model} key={model.cid} />
				}
					)}
			</div>
			)
	}
})

const Tweet = React.createClass({
	render: function(){
		console.log(this)
		return (
			<div className="tweet">
				<h1>{this.props.model.get('userHandle')}</h1>
				<p>{this.props.model.get('content')}</p>
			</div>
			)
	}
})






export default TweetView