exports.validate_doc_update = function(newDoc, oldDoc, userCtx) {
	function require(field, message) {
		message = 'missing_' + field;
		if (!newDoc[field]) throw({forbidden : message});
	}
	function unchanged(field) {
	if (oldDoc && toJSON(oldDoc[field]) != toJSON(newDoc[field]))
		throw({forbidden: 'changed_' + field});
	}
	log(userCtx);
	var has_role = function() {
		var roles = {};
		for(var i in userCtx.roles) {
			roles[userCtx.roles[i]] = null;
		}
		log(roles);
		return function(role) {
			return role in roles;
		};
	}()
	function is_admin() {
		return has_role('_admin');
	}
	var e;
	switch(newDoc.type) {
		case 'transaction':
			unchanged('type');
			if(oldDoc.validated && !is_admin()) {
				throw({forbidden: 'no_more_changeable'});
			}
			if(newDoc.validated) {
				if(userCtx.name != newDoc[newDoc.validator]) {
					throw({forbidden: 'wrong_validator'});
				}
				unchanged('amount');
				unchanged('execution_date');
				unchanged('from');
				unchanged('id');
				unchanged('reason');
				unchanged('to');
				unchanged('validator');
			} else {
				require('amount');
				require('execution_date');
				require('from');
				require('id');
				require('to');
				require('validator');
			}
			break;
	
	}
	
};