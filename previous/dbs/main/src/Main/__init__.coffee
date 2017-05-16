angular.module('selheure', [
  'ui.router',
  'notification',
  'translation',
  'transaction',
  'announce',
  'login',
  'user',
  'dbSelect',
  'configuration'
]).
value('db', {
}).
value("errors",
  loginRequired: "Vous devez être connecté(e) pour accéder à cette page"
  unauthorized: "Vous n'êtes pas autorisé(e) à accéder à cette page"
  unknownError: "Une erreur inattendue est survenue. Veuillez nous contacter en nous signalant le plus précisément possible ce qui s'est produit."
)