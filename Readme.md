# Test technique
**Prérequis:** `docker`, `docker-compose` et `make` d'installés

**Durée:** ~2h

**Technos utilisées:** NextJS, GraphQL, Python

# Déroulement
Vous disposez d'un squelette d'application NextJS, l'objectif de ce test est de récupérer des animés issue d'[anilist.co](https://anilist.co) et d'y ajouter la note SensCritique.

## 1°) 🖼 Javascript: Récupérer les animés et les afficher
* Récupérer la liste des animés d'AniList via l'[API GraphQL](https://anilist.gitbook.io/anilist-apiv2-docs/)
* Afficher les animés dans le projet (libre cours à votre imagination pour le design) avec une pagination simple
  * Pour accéder au site, rendez-vous sur [localhost:3000](https://localhost:3000)
* Sauvegarder les animés d'anilist en base de données  
  * Limitez-vous à quelques animés, pas besoin de sauvegarder 200 animés

## 2°) 🐍 Python: Scraper SensCritique et ajouter les notes SC en BDD
* Modifier le fichier `/scrapers/senscritique_note.py` afin de scraper SensCritique et de récupérer les notes SC
  * Le fichier python comporte deux fonctions d'aide pour vous connecter à la BDD et pour récupérer l'URL SensCritique d'un animé.
* Ajouter les notes SC de chaque animé en base de données
  * Dans ce projet, nous utilisons [Sequelize](https://sequelize.org/master/) pour gérer les migrations SQL

## Stack
Le makefile comporte quelques helpers pour vous simplifier la vie:
* Pour installer la stack taper `make install`
* Pour démarrer, stopper ou redémarrer la stack `make start`, `make stop`, `make restart`
* Pour accéder au conteneur node ou python : `make node-sh`, `make python-sh`
* Si vous désirez ajouter une migration SQL afin de modifier le schéma de la base de données : `make new-migration NAME=<nom de la migration>`

## Informations complémentaires
* Faites "simple et propre", évitez les fioritures
* Vous pouvez utiliser les technos/bibliothèques déjà fournies ou utiliser celles que vous préférez.
* La durée du test est estimée à 2h mais libre à vous de faire moins ou plus.
* Si vous rencontrez des difficultés, vous pouvez envoyer un mail à tech@senscritique.com

# Annexes
[📘 Sequelize](https://sequelize.org/master/)

[📘 GraphQL - ApolloClient](https://www.apollographql.com/docs/react/)

[📘 AniList](https://anilist.gitbook.io/anilist-apiv2-docs/)

[📘 NextJS](https://nextjs.org/docs/getting-started)