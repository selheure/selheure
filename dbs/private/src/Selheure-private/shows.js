exports.init = function(doc, req) {
	return {
		body: JSON.stringify([req.path[0], req.path[2]])
	}
};
