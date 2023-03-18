import React, { Fragment } from 'react';
import { Redirect, useRouteMatch } from 'react-router-dom';
import { getAllowedRoutes, isLoggedIn } from 'utils';
import { PrivateRoutesConfig } from 'config';
import { TopNav } from 'components/common';
import MapAllowedRoutes from 'routes/MapAllowedRoutes';

function PrivateRoutes() {
	const match = useRouteMatch('/app');
	let allowedRoutes = [];

	if (isLoggedIn()) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
	else return <Redirect to="/" />;

	return (
		<div className="flexcontainer">
			<TopNav routes={allowedRoutes} prefix={match.path} />
			<div className="columns">FILTER MENU</div>
			<MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound />
		</div>
	);
}

export default PrivateRoutes;
