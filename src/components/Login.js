import React, { memo, useState } from 'react';
import { Alert, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { JumbotronWrapper } from './common';

function Login() {
	let [selected, setSelected] = useState([]);
	let history = useHistory();

	function handleChange(e) {
		const value = e.target.value.toUpperCase();
		console.log('value::::', value);
		let selected = [];
		selected.push(value);
		// for (let i = 0; i < options.length; i++) {
		// 	if (options[i].selected) {
		// 		selected.push(options[i].value);
		// 	}
		// }
		setSelected(selected);
	}

	function handleClick() {
		localStorage.setItem('roles', JSON.stringify(selected));
		history.push('/app');
	}

	return (
		<div className="login-form col-4">
			<div className="form-level">
				<Form.Group controlId="exampleForm.ControlSelect1">
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>LOGIN</Form.Label>
						<Form.Control
							type="text"
							required
							placeholder="Enter User"
							onChange={handleChange}
						/>
						<Form.Text className="text-muted">
							Based on roles, the app will show the menu list
						</Form.Text>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
				</Form.Group>
				<Button
					variant="outline-primary"
					onClick={handleClick}
					disabled={!selected.length}
				>
					Login
				</Button>
			</div>
		</div>
	);
}

export default memo(Login);
