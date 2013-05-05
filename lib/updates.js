
exports.validate = function(doc, req) {
	if(req.userCtx.name != doc[doc.validator]) {
		throw({forbidden: 'unauthorized'});	
	}
	doc.validated = true;
	return [doc, 'ok'];
};

exports.announce_edit = function(doc, req) {
	var form = JSON.parse(req.body),
		e;
	if(doc === null){
		form.type = 'announce';
		form._id = form.type + '-' + form.id;
		form.author = req.userCtx.name;
		form.created_at = new Date().toISOString();
		form.last_edit_at = form.created_at;
		return [form, 'ok'];
	} else {
		doc.last_edit_at = new Date().toISOString();
		for(e in doc) {
			if(e in form && form[e] != doc[e]) {
				log(e, form[e]);
				doc[e] = form[e];
			}
		}
		return [doc, 'ok']
	}
}