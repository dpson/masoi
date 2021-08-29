import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css'

import Admin from './components/admin';
import User from './components/user';
import View from './components/view';

class App extends Component {
	render() {
		return (
			<div className='wrapper'>
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<User />
						</Route>
						<Route path="/admin">
							<Admin />
						</Route>
						<Route path="/view">
							<View />
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
