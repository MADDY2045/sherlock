import { Roles } from 'config';
import sherlock from '../assets/images/detectiveHat.png';
import accuracy from '../assets/images/accuracy.png';
import forecast from '../assets/images/forecast.png';
import exception from '../assets/images/exception.png';
import profile from '../assets/images/profile.png';
import search from '../assets/images/search.png';
// Components
import {
	Accuracy,
	Forecast,
	Exception,
	Profile,
	ModuleNChild1,
	ModuleNChild2,
	ModuleNChild3,
	Search,
	Sherlock
} from 'components';

// TODO:
/*
 * 1. Make title optional
 * 2. Make title multi type support ie: (string, node, react element)
 * 3. Add child route support
 * */

/*
 * Route config object supports all react-router's route component props with some additional props ie: (title, permission, children)
 * you can add or remove props from config object it's means it is super customizable and support upto N nesting, child routes must follow the same parent shape,
 * it means the config object is same for both there is no additional key for child nor for parent.
 * you can find route props from here https://reactrouter.com/web/api/Route let's take a look at some additional props
 * 1. permission: permission is an optional prop and it's type is an array of roles, permission is used for allowing certain users/roles
 *  	to have access of that route and if you skip/omit the permission or it's an empty array that means every authenticated user/role have access to that route.
 * 2. title: title is an optional prop and it's type is a string|node it is used for mapping route link into a navigation
 * 3. children: children is also an optional prop and it's type is an array of route config objects, children are used for nested routes
 * */

export default [
	{
		component: Accuracy,
		path: '/accuracy',
		title: 'Accuracy',
		src: accuracy
	},
	{
		component: Forecast,
		path: '/',
		title: 'Forecast',
		src: forecast,
		exact: true
	},
	{
		component: Exception,
		path: '/exception',
		title: 'Exception',
		src: exception
	},
	{
		component: Profile,
		path: '/profile',
		title: 'Profile',
		src: profile,
		permission: [Roles.SUPER_ADMIN, Roles.ADMIN, Roles.MANAGER],
		children: [
			{
				component: ModuleNChild1,
				path: '/child-1',
				title: 'Child - 1'
			},
			{
				component: ModuleNChild2,
				path: '/child-2',
				title: 'Child - 2'
			},
			{
				component: ModuleNChild3,
				path: '/child-3',
				title: 'Child - 3',
				permission: [Roles.SUPER_ADMIN, Roles.ADMIN]
			}
		]
	},
	{
		component: Search,
		path: '/search',
		title: 'Search',
		src: search,
		permission: [Roles.SUPER_ADMIN, Roles.ADMIN]
	},
	{
		component: Sherlock,
		path: '/sherlock',
		title: 'Sherlock',
		permission: [Roles.SUPER_ADMIN, Roles.ADMIN],
		src: sherlock
	}
];
