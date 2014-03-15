angular.module('selheure', ['ngRoute', 'url', 'user']).
value('config', {
  db: '',
  lang: 'fr',
  urlPrefix: '#',
  collectifName: "CRIC",
  translationDocPrefix: 'translation',
  announceTypes: {demand: "demande", proposal: "proposition"},
});
