import React, { Component } from 'react';
import '../App.css'
import Axios from 'axios';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roles: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(e) {
		this.setState({
			roles: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		Axios.post(`http://localhost:3002/api/roles/create`, {
			roles: this.state.roles
		}).then((response) => {
			alert("Tạo ván chơi thành công");
		})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		return (
			<div className='wrapper'>
				<div className='main'>
					<div className="form">
						<form onSubmit={this.handleSubmit}>
							<div className='row'>
								<div className='label'>Vui lòng nhập các role trong trò chơi masoi của bạn vào đây, các role cách nhau bởi dấu phẩy</div>
								<textarea type='name' placeholder='Ví dụ: sói, sói, người, tiên tri' onChange={this.handleChange}></textarea>
							</div>
							<button className='button'>Khởi tạo roles và bắt đầu trò chơi</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;