import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, ProgressBar, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

// Questions du quiz
const questions = [
  {
    question: "En Python, que renvoie len(\"IT Business\") ?",
    options: ["9", "10", "11", "12"],
    correctOption: 2,
    points: 5
  },
  {
    question: "En JavaScript, que vaut typeof NaN ?",
    options: ["number", "undefined", "NaN", "object"],
    correctOption: 0,
    points: 5
  },
  {
    question: "En Java, quel mot-clé est utilisé pour hériter d'une classe ?",
    options: ["this", "super", "extends", "inherits"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle est la sortie du code Python : print(2 ** 3 ** 2) ?",
    options: ["64", "512", "256", "36"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Que fait la fonction JSON.stringify() en JavaScript ?",
    options: [
      "Convertit une chaîne en JSON",
      "Convertit un objet JSON en chaîne",
      "Convertit du HTML en JSON",
      "Analyse un objet JSON"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle commande SQL sélectionne tous les enregistrements de la table \"users\" ?",
    options: [
      "SELECT * FROM users;",
      "GET ALL FROM users;",
      "SHOW TABLE users;",
      "FETCH * users;"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est la différence principale entre SQL et NoSQL ?",
    options: [
      "NoSQL utilise uniquement Excel",
      "SQL est non relationnel",
      "NoSQL est relationnel",
      "SQL est relationnel, NoSQL est non-relationnel"
    ],
    correctOption: 3,
    points: 5
  },
  {
    question: "Dans MongoDB, comment insérer un document ?",
    options: [
      "db.collection.insertOne()",
      "insert db.collection",
      "db.collection.add()",
      "collection.insertAll()"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est l’équivalent de “sauvegarder” en Git ?",
    options: ["git save", "git push", "git commit", "git backup"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle commande Docker exécute un conteneur en arrière-plan ?",
    options: ["docker exec -d", "docker run -d", "docker launch -b", "docker up -d"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil CI/CD est principalement utilisé avec Jenkins ?",
    options: ["Dockerfile", "Pipeline", "Gantt Chart", "Subversion"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel fichier configure une image Docker ?",
    options: ["Jenkinsfile", "Docker.yml", "Dockerfile", "Config.json"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle commande Git crée une nouvelle branche ?",
    options: [
      "git create branch <name>",
      "git checkout <name>",
      "git branch <name>",
      "git new branch <name>"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel service AWS permet de stocker des objets ?",
    options: ["AWS RDS", "AWS Lambda", "AWS S3", "AWS EC2"],
    correctOption: 2,
    points: 5
  },
  {
    question: "GCP est une plateforme cloud proposée par :",
    options: ["Microsoft", "Google", "Amazon", "IBM"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel service Azure permet de créer des machines virtuelles ?",
    options: ["Azure SQL", "Azure DevOps", "Azure VM", "Azure Docker"],
    correctOption: 2,
    points: 5
  },
  {
    question: "En Pandas, que fait df.head() ?",
    options: [
      "Affiche les dernières lignes",
      "Affiche les premières lignes",
      "Renomme les colonnes",
      "Supprime les lignes"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Power BI est principalement utilisé pour :",
    options: [
      "Le stockage de données",
      "L’analyse et la visualisation de données",
      "Le codage",
      "La gestion de version"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle commande Linux affiche le répertoire courant ?",
    options: ["ls", "dir", "cd", "pwd"],
    correctOption: 3,
    points: 5
  },
  {
    question: "Microsoft Intune est un outil pour :",
    options: [
      "Analyser des données",
      "Gérer des appareils à distance",
      "Développer des applications",
      "Partager des documents"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel est le rôle de GitHub dans le développement logiciel ?",
    options: [
      "Compiler les applications",
      "Gérer le code source et la collaboration",
      "Créer des bases de données",
      "Automatiser les tests uniquement"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil est utilisé pour la gestion de conteneurs ?",
    options: ["Git", "Jenkins", "Docker", "Azure DevOps"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Lequel des services suivants est un PaaS ?",
    options: ["Amazon EC2", "Microsoft Azure App Service", "Google Cloud Storage", "Docker"],
    correctOption: 1,
    points: 5
  },
  {
    question: "En SQL, que signifie 'JOIN' ?",
    options: [
      "Ajouter une ligne",
      "Fusionner deux bases de données",
      "Associer des tables selon une condition",
      "Créer une nouvelle table"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Dans un fichier Dockerfile, quelle instruction est utilisée pour exécuter une commande ?",
    options: ["RUN", "EXEC", "CMD", "DO"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande permet de cloner un dépôt distant Git ?",
    options: ["git pull", "git fork", "git clone", "git init"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Que signifie CI dans CI/CD ?",
    options: ["Continuous Innovation", "Continuous Integration", "Code Injection", "Central Integration"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Lequel de ces systèmes de gestion de bases de données est NoSQL ?",
    options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel est l’objectif principal de SCCM ?",
    options: [
      "Gérer les appareils, les mises à jour et la sécurité dans une entreprise",
      "Créer des sites web dynamiques",
      "Analyser les données des capteurs",
      "Automatiser le déploiement Docker"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En JavaScript, que renvoie `null == undefined` ?",
    options: ["true", "false", "error", "undefined"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil permet de créer des tableaux de bord interactifs à partir de données ?",
    options: ["Power BI", "Azure CLI", "GitHub", "Jenkins"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est le rôle du fichier package.json dans un projet Node.js ?",
    options: [
      "Gérer les dépendances et scripts",
      "Stocker les logs",
      "Configurer Docker",
      "Créer une base de données"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Linux liste les fichiers d’un répertoire ?",
    options: ["ls", "pwd", "mkdir", "cat"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel composant Azure permet d'héberger des bases de données relationnelles ?",
    options: ["Azure VM", "Azure Blob", "Azure SQL Database", "Azure DevOps"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle est la commande Git pour envoyer les changements locaux vers le dépôt distant ?",
    options: ["git push", "git fetch", "git update", "git pull"],
    correctOption: 0,
    points: 5
  },
  {
    question: "En Python, que fait la fonction range(3) ?",
    options: [
      "Renvoie [0, 1, 2]",
      "Renvoie [1, 2, 3]",
      "Renvoie [0, 1, 2, 3]",
      "Renvoie une erreur"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est l’objectif principal d’un pipeline Jenkins ?",
    options: [
      "Créer des machines virtuelles",
      "Automatiser les tâches de développement",
      "Surveiller le réseau",
      "Exécuter des scripts Python"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle instruction SQL est utilisée pour supprimer une table ?",
    options: ["REMOVE TABLE", "DROP TABLE", "DELETE TABLE", "ERASE TABLE"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil Microsoft permet la collaboration documentaire dans le cloud ?",
    options: ["Microsoft SCCM", "Microsoft Teams", "Microsoft Intune", "Microsoft SharePoint"],
    correctOption: 3,
    points: 5
  },
  {
    question: "En pandas, que fait df.describe() ?",
    options: [
      "Affiche les lignes",
      "Donne des statistiques sur les données numériques",
      "Supprime une colonne",
      "Convertit un fichier"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "En Python, que fait la méthode append() sur une liste ?",
    options: [
      "Supprime un élément",
      "Ajoute un élément à la fin",
      "Trie la liste",
      "Inverse la liste"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Dans un fichier YAML utilisé par Docker Compose, quelle clé définit les conteneurs ?",
    options: ["images", "containers", "services", "apps"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel est le rôle principal de GitLab CI/CD ?",
    options: [
      "Déployer des VM",
      "Gérer la facturation cloud",
      "Automatiser les builds et tests",
      "Héberger des sites web"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel outil permet d’orchestrer plusieurs conteneurs Docker ?",
    options: ["Jenkins", "Kubernetes", "Azure CLI", "Git"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Dans une architecture cloud, que signifie IaaS ?",
    options: [
      "Infrastructure as a Software",
      "Infrastructure as a Service",
      "Internet as a Service",
      "Interface as a Solution"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle commande permet de créer un nouveau projet React ?",
    options: [
      "npx create-react-app",
      "npm start react",
      "node init react-app",
      "react new project"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle extension de fichier est utilisée pour les scripts Python ?",
    options: [".py", ".js", ".java", ".html"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est la commande Linux pour afficher les processus en cours ?",
    options: ["ls", "top", "jobs", "cd"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Dans Power BI, un 'dashboard' est :",
    options: [
      "Un tableau Excel",
      "Une interface pour gérer les permissions",
      "Un ensemble de visualisations",
      "Un modèle de données"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "En SQL, quelle commande permet de modifier la structure d'une table ?",
    options: ["UPDATE", "MODIFY", "CHANGE", "ALTER"],
    correctOption: 3,
    points: 5
  },
  {
    question: "Que signifie le statut ‘404’ en HTTP ?",
    options: [
      "Requête réussie",
      "Serveur non disponible",
      "Page non trouvée",
      "Redirection"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Que permet de faire Microsoft Endpoint Manager ?",
    options: [
      "Créer des APIs",
      "Gérer les appareils et la sécurité",
      "Héberger des machines virtuelles",
      "Automatiser la CI/CD"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Que signifie CRUD en développement web ?",
    options: [
      "Create, Read, Update, Delete",
      "Control, Run, Upload, Download",
      "Compile, Run, Use, Debug",
      "Check, Read, Use, Deploy"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Que permet la fonction `merge()` en Pandas ?",
    options: [
      "Fusionner deux dataframes",
      "Trier un dataframe",
      "Réinitialiser les index",
      "Remplacer les valeurs nulles"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel langage est principalement utilisé avec TensorFlow ?",
    options: ["Java", "Python", "C++", "PHP"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle est la méthode JavaScript pour filtrer un tableau ?",
    options: ["map()", "forEach()", "filter()", "reduce()"],
    correctOption: 2,
    points: 5
  },
  {
    question: "En cloud, une 'instance' est généralement :",
    options: [
      "Une application web",
      "Une base de données",
      "Une machine virtuelle",
      "Une API"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel composant Azure permet de stocker des fichiers non structurés ?",
    options: ["Azure SQL", "Azure App Service", "Azure Blob Storage", "Azure VM"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle méthode Python renvoie la longueur d’une chaîne ?",
    options: ["length()", "count()", "size()", "len()"],
    correctOption: 3,
    points: 5
  },
  {
    question: "Dans Git, que fait la commande 'git pull' ?",
    options: [
      "Télécharge les modifications distantes et les fusionne",
      "Supprime les branches distantes",
      "Envoie les changements vers le dépôt distant",
      "Crée un nouveau commit"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel mot-clé est utilisé pour déclarer une fonction en Python ?",
    options: ["func", "function", "def", "declare"],
    correctOption: 2,
    points: 5
  },
  {
    question: "En Java, quel mot-clé est utilisé pour créer une classe ?",
    options: ["function", "class", "object", "new"],
    correctOption: 1,
    points: 5
  },
  {
    question: "En JavaScript, que fait '===’ ?",
    options: [
      "Compare la valeur uniquement",
      "Compare la valeur et le type",
      "Attribue une valeur",
      "Compare la longueur"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "En SQL, quelle commande permet de sélectionner toutes les colonnes ?",
    options: ["SELECT ALL", "GET *", "SELECT *", "CHOOSE *"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Lequel est un exemple de base de données NoSQL ?",
    options: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel outil DevOps permet de créer des pipelines CI/CD ?",
    options: ["Docker", "Jenkins", "Git", "Slack"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Dans un fichier YAML Jenkins, quel mot-clé définit un pipeline ?",
    options: ["script", "pipeline", "job", "node"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel service cloud est proposé par Google ?",
    options: ["AWS Lambda", "Azure Functions", "GCP Cloud Run", "EC2"],
    correctOption: 2,
    points: 5
  },
  {
    question: "Dans AWS, que signifie S3 ?",
    options: [
      "Secure Simple Storage",
      "Simple Storage Service",
      "System Storage Solution",
      "Serverless Storage Service"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil permet de versionner du code ?",
    options: ["Git", "Slack", "npm", "VS Code"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle plateforme propose un hébergement de dépôt Git avec CI/CD intégré ?",
    options: ["Bitbucket", "GitHub", "GitLab", "DockerHub"],
    correctOption: 2,
    points: 5
  },
  {
    question: "En Power BI, une 'mesure' est :",
    options: [
      "Un champ texte",
      "Une relation entre tables",
      "Un calcul dynamique",
      "Un graphique"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Dans Pandas, que fait la méthode groupby() ?",
    options: [
      "Trie les données",
      "Sélectionne les colonnes",
      "Crée un histogramme",
      "Agrège les données par groupe"
    ],
    correctOption: 3,
    points: 5
  },
  {
    question: "Quelle commande Linux permet de changer les permissions ?",
    options: ["chmod", "cd", "ls -l", "sudo"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil permet de gérer les appareils Windows dans un environnement cloud ?",
    options: ["SharePoint", "Microsoft Intune", "Azure SQL", "Power BI"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel est le rôle principal de SharePoint ?",
    options: [
      "Suivi des bugs",
      "Visualisation de données",
      "Gestion documentaire et collaboration",
      "Création de bases de données"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quel composant SCCM est utilisé pour déployer des logiciels ?",
    options: ["Update Center", "Software Center", "Task Manager", "Application Hub"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Que permet de faire `docker build` ?",
    options: [
      "Télécharger une image Docker",
      "Exécuter un conteneur",
      "Créer une image Docker à partir d’un Dockerfile",
      "Mettre à jour Docker"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle commande Git crée une branche ?",
    options: ["git switch", "git fork", "git create", "git branch"],
    correctOption: 3,
    points: 5
  },
  {
    question: "Quel service Azure permet de stocker des blobs (objets) ?",
    options: ["Azure Compute", "Azure Blob Storage", "Azure Logic App", "Azure Pipelines"],
    correctOption: 1,
    points: 5
  },
  {
    question: "En Python, que fait la fonction 'len()' ?",
    options: [
      "Retourne la longueur d'une chaîne ou d'une liste",
      "Convertit une chaîne en entier",
      "Crée une nouvelle liste",
      "Supprime un élément"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Git permet d’annuler un commit local avant de le pousser ?",
    options: [
      "git revert",
      "git reset --soft HEAD~1",
      "git push --force",
      "git clone"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel fichier Docker décrit les instructions pour construire une image ?",
    options: [
      "docker-compose.yml",
      "Dockerfile",
      "docker.yaml",
      "container.json"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle est la portée d’une variable déclarée avec 'let' en JavaScript ?",
    options: [
      "Globale",
      "Locale au bloc",
      "Locale à la fonction",
      "Statique"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "En SQL, quelle clause permet de filtrer les lignes après un GROUP BY ?",
    options: ["WHERE", "HAVING", "FILTER", "GROUP BY"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel service AWS permet d’exécuter du code sans gérer les serveurs ?",
    options: [
      "EC2",
      "Lambda",
      "S3",
      "RDS"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil Jenkins utilise-t-il pour exécuter des scripts dans un pipeline ?",
    options: [
      "Groovy",
      "Python",
      "Bash",
      "Ruby"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Linux affiche les 10 premières lignes d’un fichier ?",
    options: ["head", "tail", "cat", "less"],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle technologie est utilisée pour la conteneurisation ?",
    options: ["VMware", "Docker", "VirtualBox", "Hyper-V"],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel composant SharePoint permet de créer un site d’équipe ?",
    options: [
      "Liste",
      "Bibliothèque",
      "Site Communication",
      "Site d’équipe"
    ],
    correctOption: 3,
    points: 5
  },
  {
    question: "Que signifie 'commit' en gestion de version Git ?",
    options: [
      "Enregistrer les changements dans l’historique",
      "Fusionner deux branches",
      "Créer une nouvelle branche",
      "Télécharger un dépôt"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Jenkins déclenche un build manuel ?",
    options: [
      "Build Now",
      "Run Pipeline",
      "Trigger Job",
      "Start Build"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service GCP permet d’héberger des bases de données relationnelles ?",
    options: [
      "Cloud SQL",
      "Cloud Storage",
      "BigQuery",
      "Cloud Functions"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel protocole est utilisé pour accéder à un serveur Linux à distance ?",
    options: [
      "FTP",
      "SSH",
      "HTTP",
      "SMTP"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel système de fichiers Linux est le plus couramment utilisé ?",
    options: [
      "NTFS",
      "FAT32",
      "ext4",
      "HFS+"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Quelle commande PowerShell permet d’installer un module ?",
    options: [
      "Install-Module",
      "Add-Module",
      "Import-Module",
      "Get-Module"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Dans Pandas, quelle méthode permet de lire un fichier CSV ?",
    options: [
      "read_csv()",
      "load_csv()",
      "import_csv()",
      "open_csv()"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil Microsoft est utilisé pour la gestion centralisée des mises à jour ?",
    options: [
      "SCCM",
      "Intune",
      "Azure DevOps",
      "Power BI"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel type de données est utilisé dans MongoDB ?",
    options: [
      "Document JSON",
      "Table relationnelle",
      "CSV",
      "XML"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Docker affiche les conteneurs en cours d’exécution ?",
    options: [
      "docker ps",
      "docker ls",
      "docker containers",
      "docker run"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est l’avantage principal de l’utilisation de Docker ?",
    options: [
      "Isolation des applications dans des conteneurs légers",
      "Augmentation de la mémoire RAM",
      "Meilleure qualité graphique",
      "Gestion automatique des versions Git"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Git permet d’envoyer les modifications locales vers un dépôt distant ?",
    options: ["git pull", "git push", "git commit", "git clone"],
    correctOption: 1,
    points: 5
  },
  {
    question: "En JavaScript, comment crée-t-on un tableau ?",
    options: [
      "var tab = {}",
      "var tab = []",
      "var tab = ()",
      "var tab = <>"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quelle commande SQL permet de supprimer une table ?",
    options: [
      "DROP TABLE",
      "DELETE TABLE",
      "REMOVE TABLE",
      "ERASE TABLE"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service Azure est utilisé pour l’orchestration de conteneurs ?",
    options: [
      "Azure Blob Storage",
      "Azure Kubernetes Service (AKS)",
      "Azure Functions",
      "Azure DevOps"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "Quel outil est utilisé pour la surveillance et l’analyse des performances sur AWS ?",
    options: [
      "CloudWatch",
      "CloudTrail",
      "CloudFormation",
      "CloudFront"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Dans Jenkins, que fait un 'job' ?",
    options: [
      "Exécute une tâche automatisée",
      "Crée un dépôt Git",
      "Gère les utilisateurs",
      "Surveille les conteneurs Docker"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel langage est principalement utilisé pour les scripts Jenkins Pipeline ?",
    options: [
      "Groovy",
      "Python",
      "Shell",
      "JavaScript"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Linux permet de changer le répertoire courant ?",
    options: [
      "cd",
      "ls",
      "pwd",
      "mkdir"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle est la commande pour créer une nouvelle branche en Git et s’y positionner ?",
    options: [
      "git branch -m <nom>",
      "git checkout -b <nom>",
      "git create <nom>",
      "git init <nom>"
    ],
    correctOption: 1,
    points: 5
  },
  {
    question: "En Python, que fait la commande 'import pandas as pd' ?",
    options: [
      "Charge la bibliothèque pandas avec l’alias pd",
      "Crée une nouvelle variable pd",
      "Supprime la bibliothèque pandas",
      "Renomme un fichier en pd"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service Microsoft Intune permet de gérer ?",
    options: [
      "Les appareils mobiles et PC",
      "Les bases de données SQL",
      "Les serveurs web",
      "Les machines virtuelles"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel format de fichier est principalement utilisé pour stocker des données dans MongoDB ?",
    options: [
      "BSON",
      "XML",
      "CSV",
      "JSON"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service AWS est conçu pour le stockage d’objets volumineux et non structurés ?",
    options: [
      "Amazon S3",
      "Amazon EC2",
      "Amazon RDS",
      "Amazon Lambda"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Dans un pipeline CI/CD, quel est l’objectif principal ?",
    options: [
      "Automatiser le déploiement et les tests",
      "Créer des graphiques",
      "Gérer la base de données",
      "Rédiger du code"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En Power BI, quelle fonctionnalité permet de combiner plusieurs tables ?",
    options: [
      "Merge Queries",
      "Sort",
      "Filter",
      "Group By"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel protocole est utilisé pour envoyer des emails ?",
    options: [
      "SMTP",
      "HTTP",
      "FTP",
      "SSH"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil est utilisé pour la gestion des configurations dans Microsoft Endpoint Manager ?",
    options: [
      "SCCM",
      "Azure DevOps",
      "GitLab",
      "Docker"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Git récupère les changements du dépôt distant sans les fusionner ?",
    options: [
      "git fetch",
      "git pull",
      "git clone",
      "git merge"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En JavaScript, quelle méthode permet d’ajouter un élément à la fin d’un tableau ?",
    options: [
      "push()",
      "pop()",
      "shift()",
      "unshift()"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Git permet de fusionner deux branches ?",
    options: [
      "git merge",
      "git rebase",
      "git commit",
      "git branch"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est le rôle principal de Kubernetes ?",
    options: [
      "Orchestration de conteneurs",
      "Gestion des bases de données",
      "Développement d’applications web",
      "Analyse de données"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle méthode Pandas permet de supprimer des valeurs nulles dans un DataFrame ?",
    options: [
      "dropna()",
      "fillna()",
      "remove_null()",
      "null_drop()"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel langage est principalement utilisé pour les fonctions AWS Lambda ?",
    options: [
      "Python",
      "SQL",
      "JavaScript",
      "Les deux premières réponses"
    ],
    correctOption: 3,
    points: 5
  },
  {
    question: "En SQL, que signifie la clause DISTINCT ?",
    options: [
      "Supprime les doublons",
      "Trie les résultats",
      "Limite le nombre de résultats",
      "Filtre les données"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Linux permet de voir les processus actifs ?",
    options: [
      "ps",
      "ls",
      "top",
      "grep"
    ],
    correctOption: 2,
    points: 5
  },
  {
    question: "Dans Docker, que fait la commande 'docker build' ?",
    options: [
      "Construire une image à partir d’un Dockerfile",
      "Lancer un conteneur",
      "Lister les conteneurs",
      "Supprimer une image"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil permet de créer des tableaux de bord interactifs pour l’analyse des données ?",
    options: [
      "Power BI",
      "Docker",
      "GitHub",
      "Jenkins"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service cloud fournit une base de données NoSQL ?",
    options: [
      "AWS DynamoDB",
      "Azure Blob Storage",
      "Google Cloud Functions",
      "AWS Lambda"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Git permet de voir l’historique des commits ?",
    options: [
      "git log",
      "git status",
      "git show",
      "git history"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En JavaScript, que fait la méthode 'map()' ?",
    options: [
      "Transforme chaque élément d’un tableau",
      "Filtre les éléments",
      "Ajoute un élément à la fin",
      "Supprime un élément"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel système d’exploitation est majoritairement utilisé pour les serveurs Linux ?",
    options: [
      "Ubuntu",
      "Windows 10",
      "macOS",
      "Android"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quelle commande Linux affiche le chemin du répertoire courant ?",
    options: [
      "pwd",
      "ls",
      "cd",
      "mkdir"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En SQL, quelle commande ajoute une nouvelle ligne à une table ?",
    options: [
      "INSERT INTO",
      "UPDATE",
      "SELECT",
      "DELETE"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil est utilisé pour gérer les mises à jour et configurations dans Microsoft Intune ?",
    options: [
      "Microsoft Endpoint Manager",
      "SCCM",
      "Azure DevOps",
      "PowerShell"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est le rôle de Jenkins dans un pipeline DevOps ?",
    options: [
      "Automatiser les tests et déploiements",
      "Stocker les données",
      "Surveiller le réseau",
      "Gérer les utilisateurs"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel service AWS est conçu pour héberger des machines virtuelles ?",
    options: [
      "EC2",
      "S3",
      "Lambda",
      "DynamoDB"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel est le principal avantage de GitLab ?",
    options: [
      "Plateforme intégrée de gestion de code, CI/CD, et gestion de projet",
      "Service de stockage cloud",
      "Outil de gestion de base de données",
      "Serveur web"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "En Python, quelle bibliothèque est principalement utilisée pour l’analyse de données ?",
    options: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn"
    ],
    correctOption: 0,
    points: 5
  },
  {
    question: "Quel outil Microsoft est utilisé pour la gestion documentaire collaborative ?",
    options: [
      "SharePoint",
      "Power BI",
      "Intune",
      "Teams"
    ],
    correctOption: 0,
    points: 5
  }

];

const QuizScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const theme = useTheme();

  const handleAnswer = (selectedIndex) => {
    setSelectedAnswer(selectedIndex);
    if (selectedIndex === questions[currentQuestion].correctOption) {
      setScore(score + questions[currentQuestion].points);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
      navigation.navigate('Result', {
        score: score,
        totalQuestions: questions.length,
        maxScore: questions.length * 5
      });
    }
  };

  const progress = (currentQuestion + 1) / questions.length;

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.questionNumber}>
              Question {currentQuestion + 1}/{questions.length}
            </Text>
            <Text style={styles.question}>
              {questions[currentQuestion].question}
            </Text>
            <View style={styles.optionsContainer}>
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption
                  ]}
                  onPress={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.score}>Score: {score}</Text>
          <ProgressBar
            progress={progress}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
          {selectedAnswer !== null && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestion < questions.length - 1 ? 'Suivant' : 'Terminer'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    borderRadius: 15,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#4c669f',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    marginTop: 10,
    alignItems: 'center',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  progressBar: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    marginTop: -5,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4c669f',
  },
});

export default QuizScreen; 