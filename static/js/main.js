angular.module('selheure.service', []).
	value('config', {
		db: 'selheure',
		lang: 'fr',
		urlPrefix: '#',
		projectName: "SEL'heure",
		collectifName: "Le CRIC",
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
	factory('db', function($q, $rootScope, $http, config) {
		//$.couch.urlPrefix = "http://127.0.0.1:5984";
		return {
			lib: $.couch,
			currentRequests: {},
			_asyncCall: function(method, argObj, arg) {
				console.log('_asyncCall', method, argObj, arg);
				var deferred = $q.defer();
				//var func = typeof method == 'function' ? method : this.lib[method];
				argObj = argObj ? argObj : {};
				argObj.success = function (data) {
					deferred.resolve(data);
					$rootScope.$apply();
				};
				argObj.error = function (status, message) {
					deferred.reject([status, message]);
					$rootScope.$apply();
				};
				if(arg !== undefined){
					this.lib[method](arg, argObj);
				}
				else {
					this.lib[method](argObj);
				}
				return deferred.promise;
			},
			getView: function(page, view, keys, group) {
				var deferred = $q.defer();
				var query = config.db + "/" + page + "/" + view + "/" + group;
				var args = {
					success: function(data) {
						this.jsonp = [query, status, data];
						var result = {data: {}};
						if(keys && keys.length){
							result.keys = keys;
						}
						if(data && data["rows"].length){
							result.data = data["rows"].map(function(e){ return e.value });
							console.log("resolve", result);
							deferred.resolve(result);
							$rootScope.$apply();
						} else {
							console.log(query, result);
							deferred.resolve(result);
							$rootScope.$apply();
						}
						//TODO: add timeout
						// or use Angular cache
						//delete this.currentRequests[query];
					},
					error: function(status, message) {
						console.log([status, message]);
						deferred.reject([status, message]);
						$rootScope.$apply();
					}
				};
				group = group === undefined ? true : group;
				if(group !== false) {
					args.group = group;
				}
				if(keys !== undefined) {
					args[keys[0]] = keys[1];
					query += "/" + keys[0] + "=" + args[keys[0]];
				}
				if(query in this.currentRequests){
					//console.log("already in");
					return this.currentRequests[query];
				}
				this.currentRequests[query] = deferred.promise;
				this.lib.db(config.db).view(page + "/" + view, args);
				return this.currentRequests[query];
			},
			saveDoc: function(doc) {
				var deferred = $q.defer();
				this.lib.db(config.db).saveDoc(doc, {
					success: function(data) {
						deferred.resolve(data);
						$rootScope.$apply();
					},
					error: function(status, message){
						deferred.reject([status, message]);
						$rootScope.$apply();
					},
				});
				return deferred.promise;
				//return this._asyncCall(this.lib.db(config.db).saveDoc, {}, doc);
			},
			openDoc: function(_id) {
				var deferred = $q.defer();
				this.lib.db(config.db).openDoc(_id, {
					success: function(data) {
						deferred.resolve(data);
						$rootScope.$apply();
					},
					error: function(status, message){
						deferred.reject([status, message]);
						$rootScope.$apply();
					},
				});
				return deferred.promise;
				//return this._asyncCall(this.lib.db(config.db).openDoc, {}, _id);
			},
			update: function(app, func, doc) {
				/*var deferred = $q.defer();
				function success(data) {
					deferred.resolve(data);
					$rootScope.$apply();
				}
				function error(status, message) {
					deferred.reject([status, message]);
					$rootScope.$apply();
				}*/
				console.log('update', doc);
				var query = '/' + config.db + '/_design/' + app + '/_update/' + func + '/';
				if(typeof doc === 'object' && !doc._id) {
					//$http.post(query, angular.toJson(doc)).success(success).error(error);
					return $http.post(query, angular.toJson(doc));
				} else {
					query += doc._id;
					//$http.put(query, angular.toJson(doc)).success(success).error(error);
					return $http.put(query, angular.toJson(doc));
				}
				//return deferred;
			},
			login: function(username, password) {
				return this._asyncCall('login', {
					name: username,
					password: password,
				});
			},
			logout: function() {
				return this._asyncCall('logout');
			},
			session: function() {
				return this._asyncCall('session');
			},
		}
	}).
	factory('url', function(config){
		return {
			announceList: config.urlPrefix + '/annonces/liste',
			announceNew: config.urlPrefix + '/annonces/nouvelle',
			announceEdit: function(id) { 
				return config.urlPrefix + '/annonces/' + id + '/modifier'
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
	factory('login', function(db, config, notification) {
		return  {
			user: {},
			login: function(username, password) {
				var _this = this;
				db.login(username, password).
				then(function(result) {
					console.log(result);
					_this.getUserData(result.name, true);
				}, function(error) {
						console.log(error);
				});
			},
			logout: function() {
				var _this = this;
				db.logout().
				then(function(result) {
					console.log("logged out", result);
					_this.user = {};
				});
			},
			loginRequired: function() {
				if(!this.user.id) {
					notification.warn('Vous devez être connecté pour réaliser cette action');
					return false;
				} else {
					//notification.clearAlert();
					return true;
				}
			},
			getUserSession: function() {
				var _this = this;
				return db.session().then(function(result) {
					console.log(result);
					if(result.userCtx.name !== null) {
						_this.getUserData(result.userCtx.name, true);
					}
				});
			},
			getUserData: function(name, loginProcess) {
				var _this = this;
				db.getView("selheure", "user_list", ['key', name], false).
				then(function(result) {
					if(loginProcess){
						if(result.data.length)
							_this.user = result.data[0];
						else
							_this.logout();
					} else
						return result.data[0];
				});
			},
			signup: function(newUser, password, doc) {
				var _this = this;
				return db.signup(newUser, password).then(function(result) {
					doc.type = 'user';
					delete doc.password;
					db.update('create_doc', doc).then(function(data) {
						_this.login(doc.id, password);
						notification.success("Votre compte a été enregistré avec succès !");
					}, function(status, error) {
						notification.error("Erreur dans la création de votre compte (" + error + ")");
					});
				}, function(status, error) {
					if(status == '409') {
						notification.error("Cet identifiant existe déjà !");
					} else {
						notification.error("Erreur dans la création de votre compte (" + error + ")");
					}
				});
			},
		}
	}).
	factory('notification', function() {
		return {
			level: '',
			message: '',
			alert: function(level, message) {
				console.log(level, message);
				this.level = level;
				this.message = message;
				window.scrollTo(0,0);
			},
			warn: function(message) { this.alert('warn', message) },
			error: function(message) { this.alert('error', message) },
			info: function(message) { this.alert('info', message) },
			success: function(message) { this.alert('success', message) },
			clearAlert: function() { this.level = ''; this.message = ''; }
		};
	});

angular.module('selheure.directive', ['selheure.service']).
	directive('user', function(url) {
		return {
			restrict: 'AE',
			scope: {name: '='},
			replace: true,
			template: '<a></a>',
			link: function(scope, elm, attrs) {
				elm.attr('href', url.userPage(scope.name));
				elm.html(scope.name);
			}
		}
	}).
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

angular.module('selheure', ['selheure.service', 'selheure.directive', 'selheure.filter', 'popup']).
	config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when('/annonces/liste', {templateUrl: 'partials/announces_list.html', controller: AnnounceListCtrl}).
		when('/annonces/nouvelle', {templateUrl: 'partials/announces_new.html', controller: AnnounceEditCtrl}).
		when('/annonces/:id_announce/detail', {templateUrl: 'partials/announces_detail.html', controller: AnnounceDetailCtrl}).
		when('/annonces/:id_announce/modifier', {templateUrl: 'partials/announces_edit.html', controller: AnnounceEditCtrl}).
		//when('/apropos', {templateUrl: 'partials/apropos.html', controller: AproposCtrl}).
		when('/utilisateurs/:user_name', {templateUrl: 'partials/user_page.html', controller: UserPageCtrl}).
		when('/echanges/nouvelle', {templateUrl: 'partials/transactions_new.html', controller: NewTransactionCtrl}).
		when('/travail_collectif', {templateUrl: 'partials/collective_work.html', controller: CollectiveWorkCtrl}).
		when('/logout', {redirectTo: '/'}).
		otherwise({redirectTo: '/'});
}]);


function MainCtrl($scope, $http, url, login, uiLang, config, notification){
	$scope.content = {
		projectName: config.projectName,
		collectifName: config.collectifName
	};
	uiLang.getTranslations('header').then(function(result){
		angular.extend($scope.content, result);
	});

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
		if(this.username && this.password){
			login.login(this.username, this.password);
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
	
	//$scope.patternTel = /\d\d \d\d \d\d \d\d \d\d/;
	$scope.signup = function() {
		$('#signUpModal').modal();
	}
	
	$scope.signUpSubmit = function() {
		$('#signUpModal').modal('hide');
		var newUser = {name: $scope.user.id};
		login.signup(newUser, $scope.user.password).then(function(result) {
			delete $scope.user;
		});
	}
}
/*

function LoginCtrl($scope, $http){


}
*/


function AnnounceListCtrl($scope, config, db, uiLang) {
	$scope.content = {announceTypes: config.announceTypes};
	uiLang.getTranslations('announces').then(function(result){
		angular.extend($scope.content, result);
	});
	$scope.announceTypes = config.announceTypes;
	db.getView('selheure', 'announce_list', [], false).then(function(result){
		$scope.announceList = result.data;
	}, function(error){
		console.log(error);
	});
}


function AnnounceDetailCtrl($scope) {

}

function AnnounceEditCtrl($scope, $routeParams, config, db, login, uiLang) {
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
			/*function setIdAndSend(doc, id, success) {
				doc.id = id;
				doc._id = "announce-" + id;
				$scope.couch.db('selheure').saveDoc(doc, {
					success: success, 
					error: function(status, error) {
						console.log(status, error);
						if(status == '409'){
							setIdAndSend(doc, id + 1, success)
						}
					}
				});
			}*/
			function updateAnnounce(announce, errbackLoop) {
				console.log(announce);
				var def = db.update('selheure', 'announce_edit', announce);
				if(errbackLoop){
					return def.then(function(){}, errbackLoop);
				}
			}
			if($scope.announce._id){
				updateAnnounce($scope.announce);
			} else {
				db.getView('selheure', 'announce_ids').then(function(result){
					var announce = angular.copy($scope.announce);
					console.log(announce);
					updateAnnounce(announce, function(error){
						console.log(error);
						if(error[0] == '409'){
							doc.id += 1;
							updateAnnounce(announce, this);
						}
					});
				});
			}
			/*$scope.couch.db('selheure').view("selheure/announce_ids", {
				success: function(data) {
					console.log(data);
					id = parseInt(data.rows[0].value.max) + 1;
					//$scope.announce.type = "announce";
					//$scope.announce.author = $scope.login.user.id;
					//$scope.announce.created_at = new Date().toISOString();
					$scope.$apply();
					console.log($scope.announce);
					setIdAndSend($scope.announce, id, function(data) {
						console.log("success!!", data);
						notification.success("Annonce sauvegardée avec succès !");
						$scope.announce = {};
						$scope.$apply();
					})
				},
			});*/
		}
	}
}


function UserPageCtrl($scope, $http, $routeParams, config, db, login, notification, uiLang, PopupService){
	var user_name = $routeParams['user_name'];
	$scope.content = {};
	uiLang.getTranslations('announces').then(function(result){
		$scope.content = result;
	});
	uiLang.getTranslations('userpage').then(function(result){
		angular.extend($scope.content, result);
	});

	$scope.announceTypes = config.announceTypes;
	$scope.close = PopupService.close;
	
	$scope.editAnnounceSubmit = function() {
		if(login.loginRequired()) {
			var doc = angular.copy($scope.announce);
			$('#editModal').modal('hide');
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
			db.update('selheure', 'validate', {_id: transaction._id}).
			then(function(result) {
				transaction.validated = true;
				notification.success("Echange validé avec succès !");
			}, function(status, error) {
				console.error(status, error);
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
		db.getView('selheure', 'announce_list', ['key', user_name], false).
		then(function(result) {
			if(result.data.length) { 
				$scope.user_announces = result.data;
			}
		});
		db.getView('selheure', 'transaction_list', ['key', user_name], false).
		then(function(result) {
			if(result.data.length) {
				$scope.transactionList = result.data;
			}
		});
		getUserBalance(user_name).then(function (result) {
			$scope.balance = 0;
			if(result.data.length) {
				$scope.balance = result.data[0];
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
		if(result.data.length) {
			$scope.user = result.data[0];
			loadPage(user_name);
		}
	});
	/*}*/

}

function NewTransactionCtrl($scope, $q, db, login, notification) {
	var uuid;
	$scope.transaction = {};
	$scope.userAnnounces = [];
	$scope.content = {
		from: "De",
		to: "A",
		amount: "Nombre de minutes",
		date: "Le",
		submit: "Valider",
	};
	$(".typeahead").typeahead({
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
	});
	$scope.newTransactionSubmit = function() {
		if(login.loginRequired()) {
			if(!$scope.transaction.to && $scope.tansaction.from != $scope.login.user.id){
				$scope.transaction.to = $scope.login.user.id;
			}
			$scope.transaction.type = "transaction";
			$scope.transaction.declared_by = $scope.login.user.id;
			//$scope.transaction.date = new Date().toISOString();
			console.log($scope.transaction);
			$scope.transaction.amount = parseInt($scope.transaction.amount);
			db.saveDoc($scope.transaction).then(function(data){
				console.log("success!!", data);
				notification.success("Déclaration sauvegardée avec succès !");
				$scope.transaction = {};
			});
			/*$scope.couch.db('selheure').saveDoc($scope.transaction, {
				success: function(data) {
					console.log("success!!", data);
					$scope.setAlertMessage('success', "Transaction sauvegardée avec succès !");
					$scope.transaction = {};
					$scope.$apply();
				},
				error: function(status, error) {
					console.error(status, error);
				}
			});*/
		}
	}
	/*var getUserAnnounces = function(name) {
		console.log(name, $scope.transaction.to);
		if(name !== undefined) {
			db.getView('selheure', 'announce_list', ['key', name])
			var deferred = $q.defer();
			$scope.couch.db('selheure').view("selheure/announce_list", {
				key: name,
				success: function (data) {
					if(data.rows.length) {
						var result = data.rows.map(function(e){ return e.value });
						console.log(result);
						deferred.resolve(result);
						$scope.$apply();
					}
				},
				error: function(status, message) {
					console.error(status, message);
				}
			});
			return deferred.promise;
		}
	};*/
	var fromUserAnnounces = [], toUserAnnounces = [];
	$scope.$watch("transaction.to", function(newVal, oldVal){
		if(newVal !== undefined) {
			db.getView('selheure', 'proposal_announce_list', ['key', newVal], false).then(function(result) {
				console.log(result);
				toUserAnnounces = result.data || [];
				$scope.userAnnounces = toUserAnnounces.concat(fromUserAnnounces);
			});
			//getUserAnnounces(newVal)
		}
	});
	$scope.$watch("transaction.from", function(newVal, oldVal){
		if(newVal !== undefined) {
			db.getView('selheure', 'demand_announce_list', ['key', newVal], false).then(function(result) {
				console.log(result);
				fromUserAnnounces = result.data || [];
				$scope.userAnnounces = fromUserAnnounces.concat(toUserAnnounces);
			});
		}
	});
}

function CollectiveWorkCtrl($scope, config, db, login, notification) {
	$scope.login = login;
	$scope.transaction = {
		from: config.collectifName,
		to: login.user.id,
	};
	
	$scope.newTransactionSubmit = function() {
		if(login.loginRequired()) {
			$scope.transaction.type = "transaction";
			$scope.transaction.declared_by = $scope.login.user.id;
			$scope.transaction.declared_at = new Date().toISOString();
			console.log($scope.transaction);
			$scope.transaction.amount = parseInt($scope.transaction.amount);
			db.saveDoc($scope.transaction).then(function(data){
				console.log("success!!", data);
				notification.success("Déclaration sauvegardée avec succès !");
				$scope.transaction = {};
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
