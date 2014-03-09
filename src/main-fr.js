


function AboutCtrl($scope){
	$scope.content = {
		whyTitle: "Pourquoi ?",
		whyParagraph: "Parce que la vie privée privée et la liberté d'expression sont de moins en moins respectées sur internet. Parce que ",
		openSourceTitle: "Un logiciel libre",
		openSourceParagraph: "Ce sera un logiciel libre",
		crowdfundingTitle: "Financé par vous",
		crowdfundingParagraph: "",
	}
}

function WhatCtrl($scope){
	$scope.content = {
		title: "C'est COi ??... C'est Internet 2.5 !",
		rows: [
			{
				title: "Etape 1 : \"We Are The Cloud\"",
				subtitle: "Un système de stockage en ligne décentralisé et sécurisé",
				paragraphs: [
					"Un cloud composé de simples utilisateurs (aucun serveur), chacun partageant un peu de son disque dur et de sa bande passante. Vos données sont accessibles sur ce cloud, depuis n'importe où, même quand votre ordinateur est éteint. Vous décidez de qui accède à quoi. Vous partagez ce que vous voulez avec qui vous le souhaitez. Aucun entreprise ou individu n'a accès à vos données. Aucune entreprise n'a le pouvoir de couper ce service.",
					"Et tout ceci, dans votre navigateur ! Et même dans vos smartphones et tablettes, dans un second temps : lorsque les navigateurs de ceux-ci seront suffisamment compatibles avec le HTML5.",
					"Ceux qui risquent de ne pas aimer : Dropbox, Méga, etc. (même Diaspora)",
				],
			}, {
				title: "Etape 2 : \"The Internet Of People\"",
				subtitle: "Un réseau social unifié et décentralisé",
				paragraphs: [
					"Parce que nous voulons partager autre chose que nos photos, par exemple, des informations sur nous, ce que nous faisons, ce qui nous intéresse, ce qui nous plaît, parce que nous voulons communiquer sans qu'une entreprise n'utilise toutes ces informations, nous prévoyons de créer un réseau social décentralisé, à partir du cloud Let's CO (voir ci-dessus). Il ne sera ni personnel, ni professionnel, ni public, ni privé, il sera ce que vous en ferez ! Chaque personne pourra avoir plusieurs profils et pour chacun partager les informations qu'elle voudra (parcours professionnel, goûts personnels, activité en cours, etc.).",
					"Parce que nous voyons ce réseau social comme un lieu unique de notre vie numérique, il contiendra : un agenda, un carnet d'adresses, un gestionnaire de mots de passe, un gestionnaire de marque page, un sytème de prise de notes, etc. et tout cela pourra être synchronisé entre différents systèmes (ordinateurs, smartphones et tablettes) et partagés, en partie ou totalement, avec d'autres personnes, ou non : c'est vous qui gérez vos données, c'est vous qui décidez ce que vous en faites !",
					"Un réseau social ne doit-il pas être doté de tous les moyens de communications les plus utilisés ? Nous pensons que si ! On pourra donc s'envoyer des mails, clavarder (\"chatter\" pour ceux qui n'ont pas d'amis québécois), téléphoner, à 2 ou plus, avec ou sans vidéo, partager tout ou partie de son écran, etc. Contrairement aux logiciels les plus utilisés pour remplir ces fonctions, Let's CO fera en sorte que les conversations privées le demeurent. La protection de la vie privée est notre priorité.",
					"Et tout ceci, dans votre navigateur ! Et même dans vos smartphones et tablettes, dans un second temps : lorsque les navigateurs de ceux-ci seront suffisamment compatibles avec le HTML5.",
					"Ils ne vont probablement pas nous sponsoriser : Facebook, Twitter, LinkedIn, Viadéo, Skype,  etc.",
				]
			}, {
				title: "Etape 3 : \"The Web By People\"",
				subtitle: "Un Web décentralisé et collaboratif",
				paragraphs: [
					"A ses origines le Web était totalement décentralisé. Des institutions (surtout des universités et centres de recherches) et personnes avaient des pages Web statiques, contenant des liens vers d'autres pages, locales ou distantes (i.e. d'une autre institution/personne). Depuis le Web s'est \"professionnalisé\"",
					"Et tout ceci, dans vos navigateur, smartphones et tablettes ;-)",
					"Ils risquent d'avoir une dent contre nous : Google/Bing, Youtube/DailyMotion, Blogger/Blogspot, Wordpress, Tumblr, Pinterest, Google Maps, Le bon coin/eBay, covoiturage.fr, couch-surfing.com, appartager.com, GitHub",
					"Ils vont nous aimer parce que l'on va dans le même sens qu'eux, en réduisant leurs coûts : Wikipédia"
				]
			},
		],
	}
}

function HowCtrl($scope){
	$scope.content = {
		title: "Ok, mais COmment ?",
		rows: [
			{
				title: "Financé par vous, la foule !",
				paragraphs: [
					"Peut-être avez-vous déjà entendu parlé du \"crowdfunding\" (financement par la foule) ou, en Français, du financement participatif. Il s'agit d'une idée simple et probablement vieille comme le monde mais qui est en train de revenir à la mode et par là même de révolutionner l'économie : permettre à chacun de participer financièrement à un projet et c'est le nombre de contributeur qui le rendra économique possible.",
					"Que diriez-vous d'être impliqué dans l'évolution d'un logiciel, dans le choix des nouvelles fonctionnalités, d'être tenu informé régulièrement de son évolution, de pouvoir participer aux tests des versions bêtas... En fait, ce que l'on vous propose se résume en deux mots : pouvoir participer.",
				]
			}, {
				title: "Développé par nous... et vous aussi !",
				paragraphs: [
					"La participation est ouverte à tout développeur, graphiste, etc. Chacun peut apporter sa pierre à l'édifice ! Il est même tout à fait possible de le faire de manière professionnelle (comme nous). Pour cela, nous vous demandons de participer 10h bénévolement",
				]
			}, {
				title: "Un logiciel libre !",
				paragraphs: [
					"Le code source du logiciel sera disponible pendant toute la vie du projet (que nous souhaitons longue !)"
				]
			}, {
				title: "Un développement Agile !",
				paragraphs: [
					"Livrer une version testable toutes les 2 semaines, tel est notre engagement ! Ainsi vous pourrez suivre l'évolution du projet"
				]
			}, {
				title: "Un projet COmmunautaire !",
				paragraphs: [
					"Il n'y a pas d'entreprise derrière ce logiciel, seulement des entrepreneurs individuels payés à la tâche ; pas de rentier non plus, votre contribution, qui reste optionnelle, ne finance que le développement du logiciel"
				]
			}
		]
	}
}

function WhyCtrl($scope){
	$scope.content = {
		title: "Why",
		rows : [
			{
				title: "Et tous ces \"CO\", c'est COi ??",
				paragraphs: [
					"CO-voiturage, COlocation, CO-working, COllectif, COmmunauté,",
					"CO = ensemble",
					"D'autres concepts auxquels on pourrait trouver un nom commençant par \"CO\" : ",
                    "Bref, la CO-révolution, COi !"
				]
			}, {
				title: "Et Let's CO dans tout ça ?",
				paragraphs: [
					""
				]
			}
		]
	}
}

function WhoCtrl($scope){
	$scope.content = {
		title: "Who",
		rows : []
	};

	$scope.contributors = [
		{
			firstname: 'Sylvain',
			lastname: 'Duchesne',
			photo: 'contributors/sylvain_duchesne.jpg',
			roles: "Conception, coordination, communication, développement",
			location: 'Paris/France',
			contacts: {
				twitter: 'slaivyn',
				linkedIn: '',
				//email: 'pro@sylvainduchesne.com',
				website: 'http://sylvainduchesne.com',
				//facebook: '',
			}
		}
	];
}

function WhereCtrl($scope){
	$scope.content = {
		title: "Where",
		rows : []
	}
}
