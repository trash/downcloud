var util = {};

util.errorsToString = function (errors) {
	var string = '';
	Object.keys(errors).forEach(function (key) {
		string += key + ' ';
	});

	return string.slice(0, string.length-1);
};

module.exports = util;