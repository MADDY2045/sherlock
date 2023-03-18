import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedIn } from 'utils';

function TopNav(props) {
	let history = useHistory();

	function handleLogout() {
		localStorage.removeItem('roles');
		history.push('/');
	}

	return (
		<div className="columns">
			<div className="nav-menu">
				{props.routes.map(({ path, title }) => (
					<Link key={path} to={`${props.prefix}${path}`}>
						{title}
					</Link>
				))}
				{isLoggedIn() && <Button onClick={handleLogout}>Logout</Button>}
			</div>
		</div>
	);
}

TopNav.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			path: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired
		})
	).isRequired,
	prefix: PropTypes.string,
	className: PropTypes.string
};

TopNav.defaultProps = {
	prefix: '',
	className: ''
};

export default memo(TopNav);
