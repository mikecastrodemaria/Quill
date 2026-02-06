# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

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
