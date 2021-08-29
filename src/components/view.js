import React, { Component } from 'react';
import Axios from 'axios';
import '../App.css';

class View extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roles: []
		}
	};

	componentDidMount() {
		Axios.get('http://localhost:3002/api/roles/get')
			.then(res => {
				const roles = JSON.parse(res.data.roles);
				console.log(roles)
				this.setState({ roles });
			})
			.catch(error => console.log(error));
	};

	render() {
		return (
			<div className='main'>
				<div className="form">
					<h2>Danh sách người chơi</h2>
					<table>
						<tr>
							<th>Người chơi</th>
							<th>Role</th>
						</tr>
						{this.state.roles.map(item => (
							<tr key={item.index}>
								<td>{item.player}</td>
								<td>{item.name}</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		);
	}
}

export default View;