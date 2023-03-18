import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Routes from 'routes';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		window.addEventListener('storage', ({ oldValue, newValue }) => {
			// Note: For this app we don't have any server to verify role/roles, in your case you can verify role/roles from your server and update accordingly.
			alert(
				`You can not change role/roles from ${oldValue} to ${newValue}, if you want to change role/roles please log out and then log in with a different roles.`
			);
			localStorage.setItem('roles', oldValue);
		});
	}

	render() {
		return (
			<Container fluid>
				<div className="main-div">
					<Routes />
				</div>
			</Container>
		);
	}
}

export default App;
