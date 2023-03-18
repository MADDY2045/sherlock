import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
	return <Link to="/login">login</Link>;
}

export default memo(ForgotPassword);
