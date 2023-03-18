import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { getAllowedRoutes } from 'utils';
import MapAllowedRoutes from 'routes/MapAllowedRoutes';

const basePath = '/app/module-n';
function ModuleN({ children }) {
	const allowedRoutes = getAllowedRoutes(children);
	// return (
	// 	<>
	// 		<>ModuleN</>
	// 		{allowedRoutes.map(({ path, title }) => (
	// 			<Link
	// 				key={path}
	// 				to={`${basePath}${path}`}
	// 				style={{ marginRight: '10px' }}
	// 			>
	// 				{title}
	// 			</Link>
	// 		))}
	// 		<MapAllowedRoutes routes={allowedRoutes} basePath={basePath} />
	// 	</>
	// );
	return <div className="columns">MODULE N</div>;
}

export default memo(ModuleN);
