import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function Register() {
	return (
		<>
			<Link to="/login">Back to login</Link>
		</>
	);
}

export default memo(Register);
