	value('config', {
		db: '',
		lang: 'fr',
		urlPrefix: '#',
		projectName: "SEL'heure",
		collectifName: "CRIC",
		translationDocPrefix: 'translation',
		announceTypes: {demand: "demande", proposal: "proposition"},
	}).

angular.module('selheure.filter', []).
	filter('selectFilter', function() {
		return function(items, element,selected) {
			var result = [], i;
			if(selected == null || selected === undefined){
				return items;
			}
			for(i in items) {
				if(items[i][element] == selected){
					result.push(items[i]);
				}
			}
			return result;
		}
	});
