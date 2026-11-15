# ✒️ Quill - Assistant Email IA pour Thunderbird

<p align="center">
  <img src="plugin/images/icon-64px.png" alt="Quill Logo" width="80" height="80">
</p>

<p align="center">
  <strong>Traitez vos emails avec l'IA directement dans Thunderbird</strong><br>
  <em>Résumer • Traduire • Corriger • Répondre • Chatter</em>
</p>

<p align="center">
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-providers-supportés">Providers</a> •
  <a href="#-installation">Installation</a> •
  <a href="#%EF%B8%8F-configuration">Configuration</a> •
  <a href="#-utilisation">Utilisation</a> •
  <a href="#-faq">FAQ</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.4.0-blue" alt="Version">
  <img src="https://img.shields.io/badge/licence-GPL--3.0-green" alt="Licence">
  <img src="https://img.shields.io/badge/thunderbird-78%2B-orange" alt="Thunderbird">
</p>

---

## 🌟 Fonctionnalités

| Action | Description |
|--------|-------------|
| **Résumer** | Transforme les longs emails en puces concises |
| **Traduire FR** | Traduit en français |
| **Traduire EN** | Traduit en anglais britannique |
| **Corriger FR** | Corrige orthographe et grammaire (français) |
| **Corriger EN** | Corrige orthographe et grammaire (anglais) |
| **Classer** | Analyse le ton : politesse, chaleur, formalité |
| **Réécrire poli** | Rend le texte plus poli |
| **Réécrire formel** | Rend le texte plus formel |
| **Répondre** | Génère un brouillon de réponse |
| **Prompt custom** | Exécute vos propres instructions |

### Fonctionnalités supplémentaires

- 💬 **Chat interactif** - Continuez la conversation avec l'IA
- 📝 **Insertion directe** - Insérez les réponses dans votre email
- 🔄 **Régénérer** - Obtenez une nouvelle réponse en un clic
- ⚙️ **Actions personnalisées** - Ajoutez vos propres prompts

---

## 🤖 Providers supportés

Quill supporte **3 providers IA** - choisissez selon vos besoins :

| Provider | Coût | Confidentialité | Vitesse | Idéal pour |
|----------|------|-----------------|---------|------------|
| 🟠 **Anthropic (Claude)** | À l'usage | Cloud | Rapide | Meilleure qualité |
| 🟢 **OpenAI (GPT)** | À l'usage | Cloud | Rapide | Large écosystème |
| 🔷 **OVHcloud AI Endpoints** | À l'usage (accès anonyme gratuit limité) | Cloud (UE) | Rapide | Hébergement européen, modèles ouverts |
| 🔵 **Ollama (Local)** | **Gratuit** | **100% Local** | Variable | Confidentialité |

---

## 📦 Installation

### Méthode 1 : Fichier XPI (Recommandé)

1. Téléchargez `quill-1.4.0.xpi` depuis les [Releases](https://github.com/mikecastrodemaria/Quill/releases)
2. Dans Thunderbird : **Menu ☰ → Modules et thèmes** (ou `Ctrl+Maj+A`)
3. Cliquez sur **⚙️ → Installer un module depuis un fichier...**
4. Sélectionnez le fichier `.xpi` et cliquez sur **Ajouter**

### Méthode 2 : Depuis les sources (Développeurs)

```bash
git clone https://github.com/mikecastrodemaria/Quill.git
cd Quill/plugin
```

Puis dans Thunderbird : **Menu ☰ → Modules → ⚙️ → Déboguer des modules → Charger un module temporaire** → sélectionnez `manifest.json`

---

## ⚙️ Configuration

### 🟠 Option A : Anthropic (Claude)

**Idéal pour** : Réponses de haute qualité, tâches complexes

1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Allez dans **API Keys** → **Create Key**
3. Copiez votre clé (format : `sk-ant-api03-...`)
4. Dans les paramètres Quill :
   - Provider : **Anthropic (Claude)**
   - Collez votre clé API
   - Modèle recommandé : **Claude Sonnet 4.5**

**Tarifs** : ~3$/million de tokens en entrée, ~15$/million en sortie

---

### 🟢 Option B : OpenAI (GPT)

**Idéal pour** : Utilisateurs de l'écosystème GPT, réponses rapides

1. Créez un compte sur [platform.openai.com](https://platform.openai.com)
2. Allez dans **API Keys** → **Create new secret key**
3. Copiez votre clé (format : `sk-proj-...`)
4. Dans les paramètres Quill :
   - Provider : **OpenAI (GPT)**
   - Collez votre clé API
   - Modèle recommandé : **GPT-4o**

**Tarifs** : ~2,50$/million de tokens en entrée, ~10$/million en sortie

---

### 🔵 Option C : Ollama (Local - Gratuit)

**Idéal pour** : Confidentialité, usage hors ligne, pas de coûts API

#### Étape 1 : Installer Ollama

<details>
<summary><b>🍎 macOS</b></summary>

```bash
# Téléchargez depuis https://ollama.ai ou via Homebrew :
brew install ollama
```

</details>

<details>
<summary><b>🐧 Linux</b></summary>

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

</details>

<details>
<summary><b>🪟 Windows</b></summary>

Téléchargez l'installeur depuis [ollama.ai/download](https://ollama.ai/download)

</details>

#### Étape 2 : Télécharger un modèle

```bash
# Recommandé pour les emails :
ollama pull llama3

# Autres bonnes options :
ollama pull mistral      # Plus rapide, plus léger
ollama pull qwen2.5      # Bon multilingue
ollama pull mixtral      # Plus puissant (nécessite 32Go+ RAM)
```

#### Étape 3 : Configurer CORS (Requis pour Thunderbird)

Les extensions Thunderbird nécessitent les headers CORS. Configurez Ollama :

<details>
<summary><b>🍎 macOS - Méthode 1 : Lancement manuel</b></summary>

```bash
# Quittez d'abord l'app Ollama (Barre de menu → Quit)
OLLAMA_ORIGINS="*" ollama serve
```

Gardez le terminal ouvert pendant l'utilisation de Quill.

</details>

<details>
<summary><b>🍎 macOS - Méthode 2 : Permanent (Recommandé)</b></summary>

```bash
# Définir la variable d'environnement
launchctl setenv OLLAMA_ORIGINS "*"
```

Puis **redémarrez votre Mac**. Après le redémarrage, l'app Ollama fonctionnera normalement avec CORS activé.

**Alternative** - Créer un agent de lancement :
```bash
cat > ~/Library/LaunchAgents/com.ollama.env.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ollama.env</string>
    <key>ProgramArguments</key>
    <array>
        <string>sh</string>
        <string>-c</string>
        <string>launchctl setenv OLLAMA_ORIGINS "*"</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.ollama.env.plist
```

</details>

<details>
<summary><b>🐧 Linux - Service Systemd</b></summary>

```bash
# Éditez le fichier service
sudo systemctl edit ollama

# Ajoutez ces lignes :
[Service]
Environment="OLLAMA_ORIGINS=*"

# Redémarrez le service
sudo systemctl restart ollama
```

**Ou lancement manuel :**
```bash
OLLAMA_ORIGINS="*" ollama serve
```

</details>

<details>
<summary><b>🪟 Windows - Variable d'environnement</b></summary>

**Option 1 : PowerShell (Admin)**
```powershell
[Environment]::SetEnvironmentVariable("OLLAMA_ORIGINS", "*", "User")
```
Puis redémarrez Ollama.

**Option 2 : Interface graphique**
1. Recherchez "Variables d'environnement" dans le menu Démarrer
2. Cliquez sur "Variables d'environnement..."
3. Sous "Variables utilisateur", cliquez sur **Nouveau**
4. Nom : `OLLAMA_ORIGINS`
5. Valeur : `*`
6. OK → Redémarrez Ollama

</details>

#### Étape 4 : Vérifier qu'Ollama fonctionne

```bash
# Devrait retourner la liste de vos modèles :
curl http://localhost:11434/api/tags

# Test avec header CORS :
curl -H "Origin: moz-extension://test" http://localhost:11434/api/tags
```

#### Étape 5 : Configurer Quill

1. Dans les paramètres Quill :
   - Provider : **Ollama (Local)**
   - URL : `http://localhost:11434` (par défaut)
   - Sélectionnez votre modèle téléchargé

---

## 🚀 Utilisation

### Traiter un email

1. **Ouvrez** une fenêtre de composition (Nouveau, Répondre ou Transférer)
2. **Sélectionnez** le texte à traiter (ou laissez vide pour tout l'email)
3. **Cliquez** sur l'icône Quill (barre d'outils, en haut à droite)
4. **Choisissez** une action dans le menu déroulant
5. **Attendez** que l'IA traite
6. **Insérez** le résultat ou **Régénérez** pour une nouvelle réponse

### Chat interactif

1. Après avoir obtenu une réponse, cliquez sur **"Convertir en chat"**
2. Continuez la conversation avec des questions de suivi
3. L'IA conserve le contexte de votre email

### Actions personnalisées

1. Allez dans les **Paramètres** de Quill
2. Descendez jusqu'à la section **Actions**
3. Cliquez sur **Ajouter une action**
4. Entrez le nom et le prompt
5. **Sauvegarder**

**Exemples de prompts personnalisés :**
```
Nom : Simplifier
Prompt : Réécrivez ce texte avec des mots plus simples et des phrases plus courtes.

Nom : Extraire les tâches
Prompt : Extrayez tous les points d'action et tâches de cet email sous forme de liste numérotée.

Nom : Ton professionnel
Prompt : Réécrivez ce texte en conservant le message mais avec un ton plus professionnel.
```

---

## 📊 Recommandations de modèles

| Cas d'usage | Anthropic | OpenAI | Ollama |
|-------------|-----------|--------|--------|
| **Email quotidien** | Claude 3.5 Haiku | GPT-4o-mini | llama3 / mistral |
| **Tâches complexes** | Claude Sonnet 4.5 | GPT-4o | mixtral / qwen2.5 |
| **Budget limité** | Claude 3.5 Haiku | GPT-3.5-turbo | Tout modèle local |
| **Qualité maximale** | Claude 3 Opus | GPT-4 | llama3:70b |

---

## ❓ FAQ

<details>
<summary><b>L'extension ne répond pas</b></summary>

1. Vérifiez que votre clé API est correcte
2. Vérifiez que vous avez des crédits (Anthropic/OpenAI)
3. Pour Ollama : assurez-vous que le service tourne avec CORS
4. Vérifiez la console Thunderbird : **Menu → Outils → Outils de développement → Console d'erreurs**

</details>

<details>
<summary><b>Les modèles Ollama n'apparaissent pas dans la liste</b></summary>

CORS n'est pas configuré. Voir [Configuration CORS Ollama](#étape-3--configurer-cors-requis-pour-thunderbird).

</details>

<details>
<summary><b>Puis-je utiliser Quill hors ligne ?</b></summary>

**Oui, avec Ollama !** Les modèles locaux fonctionnent sans internet.
Anthropic et OpenAI nécessitent une connexion internet.

</details>

<details>
<summary><b>Mes données sont-elles sécurisées ?</b></summary>

- **Ollama** : 100% local, rien ne quitte votre ordinateur
- **Anthropic/OpenAI** : Données envoyées à leurs serveurs pour traitement. Consultez leurs politiques de confidentialité.
- **Quill lui-même** : Ne collecte aucune donnée. Clés API stockées localement dans Thunderbird.

</details>

<details>
<summary><b>Combien ça coûte ?</b></summary>

- **Ollama** : Gratuit (s'exécute sur votre matériel)
- **Anthropic** : [Tarifs](https://www.anthropic.com/pricing) - typiquement 0,01€-0,10€ par email
- **OpenAI** : [Tarifs](https://openai.com/pricing) - typiquement 0,01€-0,10€ par email

</details>

---

## 🔧 Dépannage

### Erreurs API

| Erreur | Solution |
|--------|----------|
| `401 Unauthorized` | Vérifiez que la clé API est correcte |
| `429 Rate Limited` | Attendez et réessayez, ou upgradez votre plan |
| `500 Server Error` | Problème du provider, réessayez plus tard |
| `NetworkError` | Vérifiez internet / CORS Ollama |

### Spécifique à Ollama

```bash
# Vérifier si Ollama tourne :
curl http://localhost:11434/api/tags

# Vérifier les headers CORS :
curl -v http://localhost:11434/api/tags 2>&1 | grep -i "access-control"

# Redémarrer Ollama avec CORS :
pkill ollama
OLLAMA_ORIGINS="*" ollama serve
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Forkez le repository
2. Créez une branche : `git checkout -b feature/amelioration`
3. Commitez : `git commit -m 'Ajout fonctionnalité'`
4. Pushez : `git push origin feature/amelioration`
5. Ouvrez une Pull Request

---

## 📜 Licence

**GPL-3.0** - Voir [LICENSE](LICENSE)

Fork de [Aify](https://github.com/ali-raheem/Aify) par Ali Raheem.

---

## 👏 Crédits

- **Développement** : [Supersonique Studio SARL](https://supersoniquestudio.com)
- **Projet original** : [Aify](https://github.com/ali-raheem/Aify) par Ali Raheem
- **Providers IA** : [Anthropic](https://anthropic.com), [OpenAI](https://openai.com), [Ollama](https://ollama.ai)

---

<p align="center">
  <strong>Fait avec ❤️ par <a href="https://supersoniquestudio.com">Supersonique Studio SARL</a></strong>
</p>

<p align="center">
  <a href="README.md">🇬🇧 English Version</a> •
  <a href="https://github.com/mikecastrodemaria/Quill/wiki">📚 Wiki</a> •
  <a href="https://github.com/mikecastrodemaria/Quill/issues">🐛 Signaler un bug</a>
</p>
