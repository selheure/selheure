SEL'heure
========

SEL'heure est un service web dédié à la gestion d'un SEL (Système d'Échange Local).

Principales fonctionnalités :
- création de comptes utilisateurs
- création/modification d'annonces (proposition ou demande de services ou d'objets)
- liste des annonces filtrable par rubriques et sous-rubriques
- création
- déclaration/validation de transactions
- déclaration/validation de travail collectif
- déclaration/validation d'une participation à un atelier
- liste des transactions
- comptabilité en unités de temps pour chaque utilisateur
- une page publique pour chaque utilisateur (état du compte-temps, info de contact, transactions)
- auto-administration des comptes utilisateurs
 - création de compte (autorisation par un admin)
 - modification des informations de contact
- compte collectif
 - rôle "valideur" pour ce compte
 - traçabilité : on sait qui fait quelle action au nom du compte collectif

Futures fonctionnalités :
- page d'administration
 - validation des inscriptions
 - édition des rubriques / sous-rubriques
- statistiques (globales, par utilisateur, richesse générée...)
- gestion mdp (perte & changement)
- supprimer un compte
- compte de solidarité
- extraction du catalogue (totale ou partielle)
- "échanges" hors-compta, partage


Techniquement :
SEL'heure est basée sur CouchDB, Kanso, AngularJS, NodeJS et Coffeescript.

Dépendences : kanso, npm, node, coffeescript, grunt-cli, bower
TODO : installation des dépendences

Déploiement :
 - installation des outils :
    - `cd tools/dbForBots/ && npm install`
    - `cd ../couchdb_install_bots/ && npm install`
  - installation des dépendances pour les dbs :
    - `cd dbs/main && kanso install && npm install && bower install`
    - `cd ../private && kanso install`
    - `cd ../_users && kanso install`
  - installation des sous-modules
    - `git submodule init && git submodule update`
  - déployer
    - `coffee deploy.coffee <url> <app> <env>`
  - add configuration object
Licence :
SEL'heure est sous licence AGPLv3.
