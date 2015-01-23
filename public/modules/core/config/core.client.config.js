'use strict';

// Configuring the Articles module
angular.module('core').run(['Menus',
function(Menus) {
  // Set top bar menu items
	Menus.addMenuItem('topbar', 'Personnel', 'personnel', 'dropdown');
	Menus.addSubMenuItem('topbar', 'personnel', 'Contractors', '/#!/');
	Menus.addSubMenuItem('topbar', 'personnel', 'Traffic', '/#!/');
	Menus.addSubMenuItem('topbar', 'personnel', 'Visitors', '/#!/');

  Menus.addMenuItem('topbar', 'Security', 'security', 'dropdown');
	Menus.addSubMenuItem('topbar', 'security', 'Events', '/#!/');
	Menus.addSubMenuItem('topbar', 'security', 'Item Deposit', '/#!/');
	Menus.addSubMenuItem('topbar', 'security', 'Key Control', '/#!/');
  Menus.addSubMenuItem('topbar', 'security', 'Sentry Activity', 'sentry-activity');
	Menus.addSubMenuItem('topbar', 'security', 'Suspicious Persons', '/#!/');
	Menus.addSubMenuItem('topbar', 'security', 'Unauthorized Access', '/#!/');

	Menus.addMenuItem('topbar', 'Health', 'health', 'dropdown');
}
]);
