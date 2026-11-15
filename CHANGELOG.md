# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

## [1.4.0] - 2026-11-15

### Ajouté
- **OVHcloud AI Endpoints** : nouveau fournisseur (API compatible OpenAI, hébergée en Europe). URL configurable, clé API facultative (accès anonyme limité), liste des modèles de chat chargée en direct
- Changement rapide de fournisseur depuis le menu Quill
- Listes de modèles chargées en direct pour Anthropic et OpenAI (bouton d'actualisation), avec liste de secours
- Bouton **Copier** dans la fenêtre de brouillon, envoi par Entrée dans le chat
- Bouton **Restaurer les actions par défaut**

### Modifié
- **Nouvelle interface** : menu, brouillon, chat et paramètres redessinés, plus compacts, et qui suivent le thème clair/sombre de Thunderbird
- La page des paramètres est entièrement traduite (EN/FR) et la langue change sans recharger la page
- Modèles Claude par défaut mis à jour ; le modèle déjà choisi est conservé à la mise à jour
- OpenAI : utilisation de `max_completion_tokens` (requis par les modèles récents)
- Messages d'erreur lisibles (clé invalide, limite de requêtes, serveur injoignable, délai dépassé)

### Corrigé
- « Paramètres » s'ouvrait dans le popup au lieu d'un onglet ; « Chat » s'ouvre dans sa propre fenêtre
- Le menu plantait à la première utilisation si les paramètres n'avaient jamais été enregistrés
- Le test de clé Anthropic reposait sur un ancien modèle et exigeait le préfixe `sk-ant-`
- « Régénérer » renvoyait la réponse précédente au modèle
- « Insérer » pouvait insérer un message d'erreur ; les sauts de ligne simples étaient perdus à l'insertion
- Le raisonnement interne (`<think>`) de certains modèles n'est plus inséré dans l'e-mail
- Les anciennes clés de stockage (copie de la clé API) sont supprimées à l'enregistrement

## [1.2.0] - 2026-02-06

### Ajouté
- **Renommage en Quill** : Nouveau nom reflétant le support multi-provider
- **Support Ollama** : Utilisation de modèles IA locaux (gratuit, sans clé API)
- Détection automatique des modèles installés sur Ollama
- Champ URL Ollama configurable (par défaut: http://localhost:11434)
- Documentation CORS détaillée pour macOS, Linux, Windows

### Corrigé
- Bug du chat : `messages: "[]"` → `messages: []` (tableau au lieu de chaîne)
- Même correction dans draft.js

### Modifié
- Interface mise à jour avec affichage conditionnel (clé API pour cloud, URL pour Ollama)
- Support de 3 providers : Anthropic (Claude), OpenAI (GPT), Ollama (Local)
- Nouveau ID d'extension : quill@supersoniquestudio.com
- Nouveau repo GitHub : github.com/mikecastrodemaria/Quill

## [1.1.0] - 2026-02-03

### Ajouté
- **Support multi-provider** : Anthropic (Claude) ET OpenAI (GPT)
- Sélecteur de provider dans les paramètres
- Modèles OpenAI : GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
- Détection automatique du provider selon le format de la clé API

### Modifié
- Interface mise à jour pour supporter les deux providers
- Les modèles se chargent dynamiquement selon le provider choisi

## [1.0.2] - 2026-02-03

### Corrigé
- Le sélecteur de modèles Claude se charge maintenant automatiquement
- Les noms des modèles sont maintenant lisibles (ex: "Claude Sonnet 4.5 (recommandé)")

## [1.0.1] - 2026-02-03

### Corrigé
- Encodage UTF-8 pour les caractères accentués français

### Ajouté
- Section "À propos" avec crédits et liens GitHub
- Informations Supersonique Studio SARL

## [1.0.0] - 2026-02-03

### Ajouté
- Fork initial de Aify adapté pour l'API Claude (Anthropic)
- Support de l'API Anthropic Messages
- 10 actions prédéfinies en français :
  - Résumer
  - Traduire FR / EN
  - Corriger FR / EN
  - Classer (analyse du ton)
  - Réécrire poli / formel
  - Répondre
  - Prompt custom
- Interface entièrement traduite en français
- Nouvelles icônes aux couleurs d'Anthropic
- Support des modèles Claude : Sonnet 4.5, 3.5 Sonnet, 3.5 Haiku, 3 Opus

### Modifié
- Remplacement de l'API OpenAI par l'API Anthropic
