import React, { Component } from 'react';
import Axios from 'axios';
import '../App.css';


class User extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: null
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleChange(e) {
		this.setState({
			name: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		Axios.post(`http://localhost:3002/api/role/get`, {
			name: this.state.name
		}).then((response) => {
			if (response.data.empty_result) {
				alert("Đã phân phát hết role của trò chơi, bạn không thể đăng kí thêm");
				return;
			}
			alert("Role của bạn là: " + response.data.my_role);
		})
			.catch(function (error) {
				console.log(error);
			});
	}


	render() {
		return (
			<div className='main'>
				<div className='result' id='js-result'>
				</div>
				<div className="form">
					<form onSubmit={this.handleSubmit}>
						<div className='row'>
							<div className='label'>Welcom 2 Ma sói Ultimate. Vui lòng viết tên của bạn bên dưới sau đó ấn nút Get my role now</div>
							<input className='name' placeholder='Write your name, ex: mr.admin' onChange={this.handleChange} />
						</div>
						<button className='button'>Get my role now</button>
					</form>
				</div>
			</div>
		);
	}
}

export default User;