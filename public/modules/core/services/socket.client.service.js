'use strict';
/*global io:false */

angular.module('core').factory('Socket', ['socketFactory', '$location',
	function(socketFactory, $location) {
		return socketFactory({
			prefix: '',
			ioSocket: io.connect($location.protocol() + '://' + $location.host() +
													 ':' + $location.port())
		});
	}
]);
