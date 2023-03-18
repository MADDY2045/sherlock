import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Routes from 'routes';
import './App.css';

const App = (props) => {
	useEffect(() => {
		console.log('rendered:::');
		window.addEventListener('storage', ({ oldValue, newValue }) => {
			// Note: For this app we don't have any server to verify role/roles, in your case you can verify role/roles from your server and update accordingly.
			alert(
				`You can not change role/roles from ${oldValue} to ${newValue}, if you want to change role/roles please log out and then log in with a different roles.`
			);
			localStorage.setItem('roles', oldValue);
		});
	}, []);

	return (
		<div className={'flexcontainer'}>
			<Routes />
		</div>
	);
};

export default App;
