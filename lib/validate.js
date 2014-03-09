exports.validate_doc_update = function(newDoc, oldDoc, userCtx) {
	function assert(assertion, message) {
		if(!assertion && !isDbAdmin())
			throw({forbidden: message || 'unauth'});
	}
	function require(field, message) {
		message = 'missing_' + field;
		//if (!newDoc[field]) throw({forbidden : message});
		assert(newDoc[field], message)
	}
	function unchanged(field, message) {
		assert(!oldDoc || oldDoc[field] === undefined || toJSON(oldDoc[field]) == toJSON(newDoc[field]),
			message || 'changed_' + field);
	}
	var hasRole = function() {
		var roles = {};
		for(var i in userCtx.roles) {
			roles[userCtx.roles[i]] = null;
		}
		return function(role) {
			return role in roles;
		};
	}();
	function isLoggedIn() {
		return Boolean(userCtx.name);
	}
	function loginRequired() {
		//if(!isLoggedIn())
		//	throw({forbidden: 'loginreq'})
		assert(isLoggedIn(), 'loginreq');
	}
	function isAuthorized(username) {
		log(username + " " + userCtx.name + " " + userCtx.roles);
		return isLoggedIn() && (userCtx.name == username || hasRole(username) || isDbAdmin());
	}
	function authorizationRequired(username) {
		//if(!isAuthorized(username))
		//	throw({forbidden: 'unauth'});
		assert(isAuthorized(username));
	}
	function isDbAdmin() {
		return hasRole('_admin');
	}
	function isAdmin() {
		return isDbAdmin();
	}
	var e;
	require('_id');
	switch(newDoc.type) {
		case 'transaction':
			loginRequired();
			unchanged('type');
			if(!isAdmin()) {
				unchanged('validated', 'archived');
			}
			if(oldDoc && oldDoc.validated) {
				unchanged('amount');
				unchanged('declared_at');
				unchanged('declared_by')
				unchanged('execution_date');
				unchanged('from');
				unchanged('reason');
				unchanged('to');
				unchanged('validated_by');
				unchanged('validator');
			} else {
				if(newDoc.validated) {
					authorizationRequired(newDoc[newDoc.validator]);
					require('validated_by');
					assert(newDoc.validated_by == userCtx.name, 'error');
					assert(newDoc.validated_by != oldDoc.declared_by);
				} else if(oldDoc) {
					authorizationRequired(oldDoc.declared_by);
				}
				require('amount');
				require('declared_at');
				require('declared_by');
				require('execution_date');
				require('from');
				require('to');
				require('validator');
			}
			break;
	}
	
};
