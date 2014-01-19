
angular.module('selheure.announces', ['dbConnector', 'user']).
	factory('announces', ['$q', 'db', function($q, db) {
		return {
			getLastAnnounces: function(nb) {
				var _this = this;
				var options = {descending: true};
				if(nb)
					options.limit = nb;
				return db.getView('selheure', 'announcesByDate', [], false, options)
				.then(function(list) {
					var result = [];
					var defCounter = 0;
					var deferred = $q.defer();
					function isFinished(announce) {
						defCounter -= 1;
						if(defCounter <= 0)
							deferred.resolve(result);
						return announce;
					}
					angular.forEach(list, function(_id) {
						defCounter += 1;
						result.push(_this.getAnnounce(_id).then(isFinished));
						//destObject.push(_this.getAnnounce(_id));
					});
					return deferred.promise;
				})
			},
			getAnnounce: function(_id) {
				return db.openDoc(_id);
			}
		}
	}]).
	directive('lastAnnounces', function(announces, config, login) {
		return {
			restrict: 'EA',
			scope: {number: '@'},
			replace: true,
			templateUrl: '/partials/announce_table.html',
			controller: function($scope) {
				$scope.login = login;
				//$scope.content = "Loading...";
				$scope.announceTypes = config.announceTypes;
				$scope.announceList = [];
				announces.getLastAnnounces($scope.number).then(function(result){
					$scope.announceList = result;
					//$scope.content = ;
				}, function(error) {
					//$scope.content = "Error while trying to get the last announces";
				})
			}
		}
	}).
	directive('announceLink', function(url, announces) {
		return {
			restrict: 'AE',
			scope: {id: '='},
			replace: true,
			//template: '<a></a>',
			template: '<span></span>',
			link: function(scope, elm, attrs) {
				console.log('get announce', scope.id)
				var _id = scope.id;
				if(_id !== undefined) {
					//elm.attr('href', url.announce(_id));
					announces.getAnnounce(_id).then(function(doc) {
						elm.html(doc.title);
					});
				}
			}
		}
	});


angular.module('selheure.transactions', ['dbConnector', 'user']).
	factory('transactions', ['db', function(db) {
		return {
			getLastTransactions: function(nb) {
				return db.getView('selheure', 'transaction_list', [], false, {
					limit: 10,
					descending: true
				}).then(function(list) {
					var result = [];
					angular.forEach(list, function(value, key) {
						console.log('get', value);
						result.push(db.openDoc(value));
					});
					return result;
				});
			},
			getUserLastTransactions: function(nb, username, status) {
				var view = 'user_transaction_list';
				if(status == 'validated')
					view = 'user_validated_transaction_list';
				else if(status == 'not validated')
					view = 'user_non_validated_transaction_list';
				return db.getView('selheure', view, [], false, {
					limit: 10,
					descending: true,
					startkey: [username, {}],
					endkey: [username]
				}).then(function(list) {
					var result = [];
					angular.forEach(list, function(value, key) {
						console.log('get', value);
						result.push(db.openDoc(value));
					});
					return result;
				});
			}
		}
	}]).
	directive('lastTransactions', function(transactions, db, notification, login, PopupService) {
		return {
			restrict: 'EA',
			scope: {number: '@', user: '=', status: '@'},
			replace: true,
			templateUrl: '/partials/transaction_table.html',
			link: function(scope, elm, attrs) {
				scope.validateTransaction = function(transaction) {
					console.log("validate trans", transaction);
					if(login.loginRequired()) {
						PopupService.close();
						db.update('validate', {_id: transaction._id}).
						then(function(result) {
							transaction.validated = true;
							notification.success("Echange validé avec succès !");
						}, function(error) {
							console.error(error);
							if(error[0] == 403)
								login.unAuthorizedNotification();
							else if(error[0] == 401)
								login.loginRequiredNotification();
						});
					} else {
						PopupService.close();
						PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
					}
				}
				scope.login = login;
				scope.content = {validatedLabels: {undefined: 'non validé', true: 'validé'}}
				//scope.transactionList = {};
				if(attrs.hasOwnProperty('user')) {
					scope.$watch('user', function(newValue) {
						if(newValue !== undefined) {
							transactions.getUserLastTransactions(scope.number, scope.user.id, scope.status).
							then(function(result) {
								scope.transactionList = result;
							});
						}
					})
				} else {
					transactions.getLastTransactions(scope.number).then(function(result) {
						scope.transactionList = result;
					})
				}
			},
			/*controller: function($scope) {
				//$scope.content = "Loading...";
				//$scope.watch('user', function(newVal, oldVal){
				//	if(newVal !== undefined) {
						$scope.transactionList = {};
						transactions.getLastTransactions($scope.number, $scope.user, $scope.transactionList).then(function(result){
							//$scope.content = ;
						}, function(error) {
							$scope.content = "Error while trying to get the last transactions";
				//		})
				//	}
				})
			}*/
		}
	})

﻿angular.module('selheure.service', ['dbConnector', 'user']).
	value('config', {
		db: '',
		lang: 'fr',
		urlPrefix: '#',
		projectName: "SEL'heure",
		collectifName: "CRIC",
		translationDocPrefix: 'translation',
		announceTypes: {demand: "demande", proposal: "proposition"},
	}).
	factory('uiLang', function($q, config, db) {
		return {
			translations: {},
			returnCommonAndRequested: function(requested) {
				var obj = angular.copy(this.translations.common);
				return angular.extend(obj, this.translations[requested]);
			},
			getTranslations: function(name) {
				var deferred = $q.defer(),
					_this = this;
				if(name != 'common' && !this.translations['common']) {
					return this.getTranslations('common').then(function(result){
						return _this.getTranslations(name);
					});
				}
				if(name in this.translations) {
					deferred.resolve(this.returnCommonAndRequested(name));
				} else {
					db.openDoc(config.translationDocPrefix + '_' + name + '_' + config.lang).
					then(function(result){
						delete result._id;
						delete result._rev;
						delete result.type;
						_this.translations[name] = result;
						deferred.resolve(_this.returnCommonAndRequested(name));
					}, function(error){
						deferred.reject(error);
					});
				}
				return deferred.promise;
			},
		}
	}).
	factory('url', function(config){
		return {
			announceList: config.urlPrefix + '/annonces/liste',
			announceNew: config.urlPrefix + '/annonces/nouvelle',
			announceEdit: function(id) { 
				return config.urlPrefix + '/annonce/' + id + '/modifier'
			},
			about: config.urlPrefix + '/apropos',
			contact: config.urlPrefix + '/contact',
			userPage: function(user_name){
				return config.urlPrefix + '/utilisateurs/' + user_name;
			},
			logout: config.urlPrefix + '/logout',
			newTransaction: config.urlPrefix + '/echanges/nouvelle',
			collectiveWork: config.urlPrefix + '/travail_collectif',
		}
	}).
	factory('notification', function($timeout) {
		//TODO: add timeout
		return {
			level: '',
			message: '',
			alert: function(level, message) {
				console.log(level, message);
				this.level = level;
				this.message = message;
				window.scrollTo(0,0);
				var _this = this;
				$timeout(function() { _this.clear()}, 8000);
			},
			warn: function(message) { this.alert('warn', message) },
			error: function(message) { this.alert('error', message) },
			info: function(message) { this.alert('info', message) },
			success: function(message) { this.alert('success', message) },
			clear: function() {
				var _this = this; 
				_this.level = ''; 
				_this.message = '';
			}
		};
	});

angular.module('selheure.directive', ['selheure.service', 'user']).
	directive('category', function() {
		return {
			restrict: 'E',
			scope: {options: '=', 'model': '='},
			replace: true,
			template: 	'<select ng-model="model" ng-options="id as name for (id, name) in options">' +
							'<option value=""></option>' +
						'</select>',
		}
	}).
	directive('subCategory', function() {
		return {
			restrict: 'E',
			scope: {options: '=', 'model': '=', parent: '='},
			replace: true,
			template: 	'<select ng-model="model" ng-options="id as name for (id, name) in options[parent]">' +
							'<option value=""></option>' +
						'</select>',
			link: function(scope, elm, attrs) {
				scope.$watch('parent', function(newVal, oldVal) {
					if(newVal !== undefined) {
						if(scope.model !== undefined && scope.model.indexOf(newVal + '-') != 0) {
							console.log(newVal, scope.model, scope.model.indexOf(newVal + '-'));
							scope.model = null;
						}
					}
				});
			}
		}
	});

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

var app = angular.module('selheure', ['selheure.service', 'selheure.directive', 'selheure.filter', 'dbConnector', 'user', 'selheure.announces', 'selheure.transactions', 'popup', 'ui.bootstrap']).
	config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/annonces/liste', {templateUrl: 'partials/announces_list.html', controller: AnnounceListCtrl}).
		when('/annonces/nouvelle', {templateUrl: 'partials/announces_edit.html'}).
		//when('/annonces/:id_announce/detail', {templateUrl: 'partials/announces_detail.html', controller: AnnounceDetailCtrl}).
		when('/annonce/:id_announce/modifier', {templateUrl: 'partials/announces_edit.html', controller: AnnounceEditCtrl}).
		//when('/apropos', {templateUrl: 'partials/apropos.html', controller: AproposCtrl}).
		when('/utilisateurs/:user_name', {templateUrl: 'partials/user_page.html', controller: UserPageCtrl}).
		when('/echanges/nouvelle', {templateUrl: 'partials/transactions_new.html', controller: NewTransactionCtrl}).
		when('/travail_collectif', {templateUrl: 'partials/collective_work.html', controller: CollectiveWorkCtrl}).
		when('/logout', {redirectTo: '/'}).
		when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl}).
		otherwise({redirectTo: '/'});
}]).
	run(function($location, $http, config) {
		//$http.get('/init').then(function(result) {
		//	config.db = result[0];
		//})
		// host: toto.selheure.org
		var host = $location.host().split('.');
		config.db = 'selheure-' + host[0];
	})


function MainCtrl($scope, url, login, uiLang, config, notification){
	$scope.content = {
		projectName: config.projectName,
		collectifName: config.collectifName
	};
	uiLang.getTranslations('header').then(function(result){
		angular.extend($scope.content, result);
	});
	//
	$scope.pageReady = config;

	/*$scope.config = {
		url_prefix: '#',
		db_server: 'http://127.0.0.1:5984',
	};
	$scope.config.db = $scope.config.db_server + '/selheure';
	*/
	$scope.couch = $.couch;
	//$scope.couch.urlPrefix = "http://127.0.0.1:8080/db";
	
	$scope.url = url;
	$scope.alert = notification;

	$scope.loginSubmit = function() {
		console.log("login attempt");
		if($scope.username && $scope.password){
			login.login($scope.username, $scope.password).then(function(result){
				delete $scope.password;
				delete $scope.username;
			}, function(error){
				delete $scope.password;
				delete $scope.username;
			});
		}
	};
	
	login.getUserSession();
	$scope.login = login;

	function getConfig() {
		$scope.couch.db('selheure').openDoc("selheure-config", {
			success: function(doc) {
				//console.log(doc);
				$scope.categories = doc.categories;
				$scope.subCategories = doc.sub_categories;
				$scope.announce_types = doc.types;
				$scope.$apply();
			}
		});
	}
	getConfig();
	
	$scope.patternTel = /\d\d \d\d \d\d \d\d \d\d/;
	$scope.signup = function() {
		$('#signUpModal').modal();
	}
	
	$scope.signUpSubmit = function() {
		$('#signUpModal').modal('hide');
		//var newUser = {name: $scope.user.id};
		var userDoc = angular.copy($scope.user);
		console.log("userDoc", userDoc)
		login.signup(userDoc).then(function(result) {
			delete $scope.user;
		});
	}
}


function HomeCtrl($scope, url) {
	
}


function AnnounceListCtrl($scope, config, db, announces, uiLang) {
	$scope.content = {announceTypes: config.announceTypes};
	uiLang.getTranslations('announces').then(function(result){
		angular.extend($scope.content, result);
	});
	$scope.announceTypes = config.announceTypes;
	/*$scope.announceList = db.getView('selheure', 'announcesByDate', [], false).then(function(list) {
		var result = [];
		angular.forEach(list, function(_id) {
			result.push(_this.getAnnounce(_id));
			//destObject.push(_this.getAnnounce(_id));
		});
		return result;
	}, function(error){
		console.log(error);
	});*/
	$scope.announceList = [];
	announces.getLastAnnounces().then(function(result) {
		$scope.announceList = result;
		console.log(result);
	}, function(error){
		console.log(error);
	});
}


function AnnounceDetailCtrl($scope) {

}

function AnnounceEditCtrl($scope, $routeParams, $location, url, config, db, login, uiLang, notification) {
	var id = $routeParams['id_announce'];
	$scope.content = {};
	uiLang.getTranslations('announces').then(function(result){
		angular.extend($scope.content, result);
	});
	$scope.announceTypes = config.announceTypes;
	$scope.announce = {};
	if(id) {
		db.openDoc('announce-'+id).then(function(result) {
			$scope.announce = result;
			console.log($scope.announce);
		});
	}
	
	$scope.announceSubmit = function() {
		var id;
		if(login.loginRequired()) {
			function onSuccessRedirect(result, edit) {
				notification.success(edit !== undefined ? "Annonce mise à jour" : "L'annonce a bien été créée");
				$location.path(url.announceList.substr(1));
			}
			function creationLoop(announce, errbackLoop) {
				console.log(announce);
				var def = db.update('announce_edit', announce);
				if(errbackLoop){
					return def.then(onSuccessRedirect, errbackLoop);
				}
			}
			if($scope.announce._id){
				db.update('announce_edit', $scope.announce).then(function(result) {
					onSuccessRedirect(result, true);
				});
			} else {
				db.getView('selheure', 'announce_ids').then(function(result){
					var announce = angular.copy($scope.announce);
					announce.id = result.max ? parseInt(result.max) + 1 : 1;
					console.log(result.max, announce);
					creationLoop(announce, function(error){
						console.log(error);
						if(error[0] == '409'){
							doc.id += 1;
							creationLoop(announce, this);
						} else {
							notification.error('Une erreur est survenue lors de la création/modification de cette annonce (' + error[0] + ', ' + error[1] + ')');
						}
					});
				});
			}
		}
	}
}


function UserPageCtrl($scope, $routeParams, url, config, db, login, notification, uiLang, PopupService){
	var user_name = $routeParams['user_name'];
	$scope.url = url;
	$scope.content = {};
	uiLang.getTranslations('announces').then(function(result){
		angular.extend($scope.content, result);
	});
	uiLang.getTranslations('userpage').then(function(result){
		angular.extend($scope.content, result);
	});
	console.log($scope.content)
	$scope.announceTypes = config.announceTypes;
	$scope.close = PopupService.close;
	
	$scope.editAnnounceSubmit = function() {
		if(login.loginRequired()) {
			var doc = angular.copy($scope.announce);
			//$('#editModal').modal('hide');
			$scope.couch.db('selheure').saveDoc(doc, {
				success: function(data) {
					notification.success("Modification sauvegardée avec succès !");
					angular.copy($scope.announce, $scope.announceToEdit);
					$scope.announce = {};
					$scope.announceToEdit = {};
					$scope.$apply();
				}, 
				error: function(status, error) {
					console.error(status, error);
				}
			});
		}
	}
	
	
	$scope.deleteAnnounce = function(key) {
		if(login.loginRequired()) {
			$scope.announceKeyToDelete = key;
			PopupService.close();
			$scope.couch.db('selheure').removeDoc($scope.user_announces[key], {
				success: function(data) {
					notification.success("Annonce supprimée avec succès !");
					$scope.user_announces.splice(key, 1);
					$scope.$apply();
				},
				error: function(status, error) {
					console.error(status, error);
				}
			});
		} else {
			PopupService.close();
			PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
		}
	}
	
	$scope.validateTransaction = function(transaction) {
		console.log("validate trans", transaction);
		if(login.loginRequired()) {
			PopupService.close();
			db.update('validate', {_id: transaction._id}).
			then(function(result) {
				transaction.validated = true;
				notification.success("Echange validé avec succès !");
			}, function(error) {
				console.error(error);
				if(error[0] == 403)
					login.unAuthorizedNotification();
				else if(error[0] == 401)
					login.loginRequiredNotification();
			});
		} else {
			PopupService.close();
			PopupService.alert('Vous n\'êtes pas connecté(e)', 'Vous devez vous connecter pour effectuer cette action', 'Ok', 'close()');
		}
	}
	$scope.editAnnounce = function(announce) {
		if(login.loginRequired()) {
			$scope.announceToEdit = announce;
			$scope.announce = angular.copy(announce);
			console.log("edit", $scope.announce);
			$('#editModal').modal();
		}
	}
	
	function getUserBalance(user_name) {
		return db.getView('selheure', 'balances', ['key', user_name]);
	}
	function loadPage(user_name) {
		console.log("load user page");
		db.getView('selheure', 'AnnouncesByUserDate', ['key', user_name], false, {
			startkey: user_name,
			endkey: [user_name, {}],
		}).
		then(function(result) {
			if(result.length) {
				$scope.user_announces = result;
			}
		});
		/*db.getView('selheure', 'transaction_list', ['key', user_name], false).
		then(function(result) {
			if(result.length) {
				$scope.transactionList = result;
			}
		});*/
		getUserBalance(user_name).then(function (result) {
			$scope.balance = {value: 0, unity: 'minutes'};
			if(result.length) {
				$scope.balance.value = result[0];
			}
			//$scope.$apply();
		});
	}
	console.log(user_name, $scope.login.user.id);
	//console.log($scope.login);
	/*if(user_name == $scope.login.user.id) {
		$scope.user = $scope.login.user;
		loadPage(user_name);
	} else {*/
	db.getView('selheure', 'user_list', ['key', user_name], false).
	then(function(result) {
		if(result.length) {
			$scope.user = result[0];
			loadPage(user_name);
		}
	});
	/*}*/
	$scope.$watch('transactionTable', function(newVal, oldVal) {
		if(newVal) {
			$http.get('/partials/transaction_table.html').success(function (data) {
				$('#transaction-table').html($compile(data)($scope));
			});
		}
	});
}

function UserPageTransactionTableCtrl($scope) {
	
	
	
}

function NewTransactionCtrl($scope, $q, $filter, db, login, notification) {
	$scope.transaction = {
	};
	$scope.userAnnounces = [];
	$scope.content = {
		from: "De",
		to: "A",
		amount: "Nombre de minutes",
		date: "Le",
		submit: "Valider",
	};
	$scope.login = login
	/*$(".typeahead").typeahead({
		source: function(query, process) {
			$scope.couch.db('selheure').view("selheure/user_list", {
				startkey: query,
				success: function(data){
					if(data.rows.length) {
						process(data.rows.map(function(e){ return e.key }));
					} else
						process([]);
				}
			});
		}
	});*/
	db.getView('selheure', 'username_list', [], false).then(function(result) {
		$scope.userList = {};
		$scope.userListArray = result;
		angular.forEach(result, function(value) {
			$scope.userList[value] = value;
		});
		console.log($scope.userList)
	})/*.
	then(function(result) {
		if(result.length) {
			$scope.user = result[0];
			loadPage(user_name);
		}
	});
	$scope.couch.db('selheure').view("selheure/user_list", {
		startkey: query,
		success: function(data){
			if(data.rows.length) {
				process(data.rows.map(function(e){ return e.key }));
			} else
				process([]);
		}
	});*/
	$scope.newTransactionSubmit = function() {
		if(login.loginRequired()) {
			var transaction = angular.copy($scope.transaction);
			var date = $scope.transaction.execution_date.split('/');
			console.log(date);
			// à améliorer
			// datepicker
			transaction.execution_date = new Date(date[2], parseInt(date[1]) - 1, date[0], '01').toISOString();
			console.log(transaction);
			db.update('transaction_edit', transaction).then(function(result) {
				console.log("success!!", result);
				notification.success("Déclaration sauvegardée avec succès !");
				$scope.transaction = {};
			},function(error) {
				console.log(error);
			});
		}
	}
	var fromUserAnnounces = [], toUserAnnounces = [];
	$scope.$watch("transaction.to", function(newVal, oldVal){
		if(newVal !== undefined && $scope.userList.hasOwnProperty(newVal)) {
			db.getView('selheure', 'proposal_announce_list', ['key', newVal], false).then(function(result) {
				console.log(result);
				toUserAnnounces = result instanceof Array ? result : [];
				$scope.userAnnounces = toUserAnnounces.concat(fromUserAnnounces);
			});
			//getUserAnnounces(newVal)
		}
	});
	$scope.$watch("transaction.fromButton", function(newVal, oldVal){
		if(newVal !== undefined){
			console.log($filter('filter')(login.user.proxyFor, newVal))
			if(newVal == login.user.id || 
					login.user.proxyFor && $filter('filter')(login.user.proxyFor, newVal).length){
				$scope.transaction.toButton = false;
				$scope.transaction.from = $scope.transaction.fromButton;
			}
			else {
				$scope.transaction.from = "";
				$scope.transaction.toButton = login.user.id;
			}
		}
	});
	$scope.$watch("transaction.toButton", function(newVal, oldVal){
		if(newVal !== undefined){
			if(newVal == login.user.id || 
					login.user.proxyFor && $filter('filter')(login.user.proxyFor, newVal).length){
				$scope.transaction.to = $scope.transaction.toButton;
			} else
				$scope.transaction.to = "";
		}
	});
	$scope.$watch("transaction.from", function(newVal, oldVal){
		if(newVal !== undefined && $scope.userList.hasOwnProperty(newVal)) {
			db.getView('selheure', 'demand_announce_list', ['key', newVal], false).then(function(result) {
				console.log(result);
				fromUserAnnounces = result instanceof Array ? result : [];
				console.log(fromUserAnnounces);
				$scope.userAnnounces = fromUserAnnounces.concat(toUserAnnounces);
			});
		}
	});
}

function CollectiveWorkCtrl($scope, config, db, login, notification) {
	$scope.login = login;
	$scope.transaction = {
		from: config.collectifName,
		//to: login.user.id,
	};
	
	$scope.newTransactionSubmit = function() {
		if(login.loginRequired()) {
			console.log($scope.transaction);
			db.update('transaction_edit', $scope.transaction).then(function(result) {
				console.log("success!!", result);
				notification.success("Déclaration sauvegardée avec succès !");
				$scope.transaction = {};
			},function(error) {
				console.log(error);
			});
		}
	}
}

/*function Cntl($scope) {
    $scope.updateBudgets = function(b, b_total) {
        $scope.budget_finance;
    }
	
	.directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('keydown', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(elm.html());
                });
            });
            // model -> view
            ctrl.$render = function(value) {
                elm.html(value);
            };
            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
})
*/
