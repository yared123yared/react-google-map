import React, { Component } from 'react';
import Map from './Components/map';
import Story from './Components/Story/Stories';
import stories from './Components/Story/stories.json';

class App extends Component {
	constructor(props) {
		super(props);
		this.openStoriesFunciton = this.openStoriesFunciton.bind(this);
		this.closeStoriesFunction = this.closeStoriesFunction.bind(this);
	}
	state = {
		storiesOpen: false,
		stories: null
	};

	openStoriesFunciton(story) {
		console.log('this is the story rendering function used to render the stories from the item');
		console.log('Story', story);

		const storiesOpen = true;

		this.setState({ storiesOpen: storiesOpen, stories: story });
	}
	closeStoriesFunction() {
		const storiesOpen = false;
		this.setState({ storiesOpen });
	}

	render() {
		console.log('counter-rendered');

		return (
			<div>
				<Map onStoriesOpen={this.openStoriesFunciton} />
				{this.state.storiesOpen && (
					<Story forStories={this.state.stories} stories={stories} onClose={this.closeStoriesFunction} />
				)}
			</div>
		);
	}
}

export default App;
