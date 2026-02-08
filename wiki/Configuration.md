# ⚙️ Configuration

Guide complet pour configurer Quill v1.3.1.

## Accéder aux paramètres

**Menu Thunderbird** → **Modules complémentaires** → **Quill** → **Options**

Ou clic droit sur l'icône Quill → **Gérer l'extension** → **Options**

---

## 🎯 Provider Actif

En haut des paramètres, vous pouvez choisir le **provider actif** - celui qui sera utilisé par défaut pour traiter vos emails.

> **Note** : Seuls les providers activés (checkbox cochée) apparaissent dans cette liste.

---

## 🔧 Configuration des Providers

### Nouveau dans v1.3.1

Chaque provider a maintenant :
- ✅ **Checkbox d'activation** - Activez/désactivez le provider
- 🔑 **Sa propre clé API** - Indépendante des autres providers
- 🧪 **Bouton de test** - Vérifiez la validité de votre configuration

### 🟠 Anthropic (Claude)

| Paramètre | Description |
|-----------|-------------|
| **Activer** | Cochez pour utiliser Claude |
| **Clé API** | Commencez par `sk-ant-api03-...` |
| **Modèle** | Claude Sonnet 4.5 recommandé |
| **Tester** | Vérifie que la clé est valide |

**Obtenir une clé API :**
1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Allez dans API Keys
3. Créez une nouvelle clé
4. Copiez-la dans Quill

### 🟢 OpenAI (GPT)

| Paramètre | Description |
|-----------|-------------|
| **Activer** | Cochez pour utiliser GPT |
| **Clé API** | Commencez par `sk-proj-...` |
| **Modèle** | GPT-4o recommandé |
| **Tester** | Vérifie que la clé est valide |

**Obtenir une clé API :**
1. Créez un compte sur [platform.openai.com](https://platform.openai.com)
2. Allez dans API Keys
3. Créez une nouvelle clé
4. Copiez-la dans Quill

### 🔵 Ollama (Local)

| Paramètre | Description |
|-----------|-------------|
| **Activer** | Cochez pour utiliser Ollama |
| **URL** | Par défaut : `http://localhost:11434` |
| **Modèle** | Llama 3.2 recommandé |
| **Tester** | Vérifie la connexion à Ollama |

**Installation :**
1. Téléchargez [Ollama](https://ollama.com)
2. Installez un modèle : `ollama pull llama3.2`
3. Configurez CORS → voir [[Ollama-CORS]]

> ⚠️ **Important** : Si le test affiche "❌ Non connecté", consultez la page [[Ollama-CORS]].

---

## 📊 Comparaison des Providers

| Provider | Avantages | Inconvénients |
|----------|-----------|---------------|
| **Anthropic** | Meilleure qualité, bon contexte | Payant |
| **OpenAI** | Rapide, écosystème riche | Payant |
| **Ollama** | Gratuit, privé, hors-ligne | Nécessite un bon PC |

---

## 🎚️ Paramètres Généraux

### Longueur max (tokens)

Contrôle la longueur maximale des réponses :

| Valeur | Usage |
|--------|-------|
| **512** | Réponses très courtes |
| **1024** | Réponses courtes |
| **2048** | Réponses moyennes |
| **4096** | Réponses longues (défaut) |
| **8192** | Réponses très longues |

### Entrée max (caractères)

Limite la taille du texte envoyé à l'IA :
- `0` = Pas de limite (défaut)
- Utile pour éviter les coûts excessifs sur de longs emails

---

## 📝 Actions Personnalisées

Créez vos propres actions avec des prompts personnalisés.

**Exemple :**
- **Nom** : Traduire en espagnol
- **Prompt** : `Traduis ce texte en espagnol, garde le même ton et style :`

Voir [[Custom-Actions]] pour plus de détails.

---

## 💾 Sauvegarde

> **⚠️ N'oubliez pas de cliquer sur "Sauvegarder" !**

Les paramètres ne sont pas sauvegardés automatiquement.

---

## 🔄 Réinitialiser

Le bouton "Réinitialiser" :
- Efface toutes les clés API
- Restaure les actions par défaut
- Remet les paramètres par défaut

---

## 📚 Voir aussi

- [[Anthropic-Setup]] - Guide détaillé Anthropic
- [[OpenAI-Setup]] - Guide détaillé OpenAI
- [[Ollama-Setup]] - Guide détaillé Ollama
- [[Ollama-CORS]] - Résoudre les problèmes de connexion Ollama
- [[Custom-Actions]] - Créer des actions personnalisées
