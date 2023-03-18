import React from 'react';

const CenterToScreen = (Component) => (props) => {
	return (
		<div>
			<Component {...props} />
		</div>
	);
};

export default CenterToScreen;
