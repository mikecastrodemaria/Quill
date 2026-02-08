# 🔧 Ollama CORS Configuration

> **⚠️ Page importante** - Si Quill affiche "❌ Non connecté" pour Ollama, suivez ce guide.

## Le Problème

Quand vous activez Ollama dans Quill et cliquez sur "Tester la connexion", vous obtenez :

```
❌ Non connecté
```

ou l'erreur :

```
NetworkError when attempting to fetch resource
```

**Pourquoi ?** Par défaut, Ollama bloque les requêtes provenant des extensions de navigateur (politique CORS). Il faut configurer Ollama pour accepter les requêtes de Thunderbird.

---

## ✅ Solution Rapide (Toutes plateformes)

La solution consiste à définir la variable d'environnement `OLLAMA_ORIGINS="*"` avant de lancer Ollama.

---

## 🍎 macOS

### Option 1 : Temporaire (session unique)

1. **Quittez Ollama** complètement (clic droit sur l'icône dans la barre de menu → Quit)

2. **Ouvrez Terminal** et lancez :
   ```bash
   OLLAMA_ORIGINS="*" ollama serve
   ```

3. **Gardez le terminal ouvert** - Ollama tourne dedans

4. **Testez dans Quill** - Cliquez sur "🔄 Tester la connexion"

### Option 2 : Permanent (recommandé)

1. **Ouvrez Terminal** et exécutez :
   ```bash
   launchctl setenv OLLAMA_ORIGINS "*"
   ```

2. **Redémarrez votre Mac** (ou déconnectez/reconnectez votre session)

3. **Lancez Ollama** normalement depuis Applications

4. **Testez dans Quill**

### Option 3 : Via fichier plist (avancé)

1. Créez le fichier `~/Library/LaunchAgents/environment.plist` :
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
   <plist version="1.0">
   <dict>
     <key>Label</key>
     <string>my.startup</string>
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
   ```

2. Chargez-le :
   ```bash
   launchctl load ~/Library/LaunchAgents/environment.plist
   ```

---

## 🐧 Linux

### Avec systemd (la plupart des distributions)

1. **Éditez le service Ollama** :
   ```bash
   sudo systemctl edit ollama
   ```

2. **Ajoutez ces lignes** :
   ```ini
   [Service]
   Environment="OLLAMA_ORIGINS=*"
   ```

3. **Sauvegardez et quittez** (Ctrl+X, Y, Enter si nano)

4. **Rechargez et redémarrez** :
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart ollama
   ```

5. **Vérifiez** :
   ```bash
   sudo systemctl status ollama
   ```

### Alternative : fichier .env

1. Créez `/etc/ollama.d/env` :
   ```bash
   sudo mkdir -p /etc/ollama.d
   echo 'OLLAMA_ORIGINS="*"' | sudo tee /etc/ollama.d/env
   ```

2. Modifiez le service pour sourcer ce fichier

### Temporaire (test rapide)

```bash
# Arrêtez Ollama
sudo systemctl stop ollama

# Lancez manuellement
OLLAMA_ORIGINS="*" ollama serve
```

---

## 🪟 Windows

### Option 1 : Variable d'environnement système (recommandé)

1. **Ouvrez les Paramètres Système** :
   - Clic droit sur "Ce PC" → Propriétés
   - Ou : `Win + R` → `sysdm.cpl` → Enter

2. **Variables d'environnement** :
   - Cliquez sur "Variables d'environnement..."
   - Dans "Variables système", cliquez "Nouvelle..."

3. **Ajoutez la variable** :
   - Nom : `OLLAMA_ORIGINS`
   - Valeur : `*`

4. **OK** partout pour fermer

5. **Redémarrez Ollama** (fermez et rouvrez l'application)

### Option 2 : PowerShell (temporaire)

```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```

### Option 3 : CMD (temporaire)

```cmd
set OLLAMA_ORIGINS=*
ollama serve
```

---

## 🔍 Vérifier la Configuration

### Test avec curl (macOS/Linux)

```bash
curl -I http://localhost:11434/api/tags
```

**Résultat attendu** - Vous devez voir :
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
```

### Test avec PowerShell (Windows)

```powershell
Invoke-WebRequest -Uri "http://localhost:11434/api/tags" -Method Head
```

### Test dans Quill

1. Ouvrez les paramètres de Quill
2. Cochez "🔵 Ollama (Local)"
3. Cliquez sur "🔄 Tester la connexion"
4. Vous devez voir "✅ Connecté"

---

## ❌ Toujours pas de connexion ?

### Checklist de dépannage

| Vérification | Comment |
|--------------|---------|
| Ollama est lancé ? | Vérifiez l'icône dans la barre système |
| Port correct ? | Par défaut : `http://localhost:11434` |
| Modèle installé ? | `ollama list` doit afficher au moins un modèle |
| Firewall ? | Vérifiez que le port 11434 n'est pas bloqué |
| URL correcte dans Quill ? | Vérifiez qu'il n'y a pas d'espace ou de typo |

### Installer un modèle

Si vous n'avez pas de modèle :
```bash
ollama pull llama3.2
```

### Vérifier les logs Ollama

**macOS/Linux** :
```bash
ollama serve 2>&1 | head -50
```

**Windows** : Vérifiez les logs dans `%USERPROFILE%\.ollama\logs`

### Redémarrer complètement

1. Quittez Ollama complètement
2. Quittez Thunderbird
3. Relancez Ollama
4. Relancez Thunderbird
5. Testez à nouveau

---

## 🔒 Sécurité

> **Note** : `OLLAMA_ORIGINS="*"` autorise toutes les origines. C'est sûr pour un usage local car Ollama n'écoute que sur `localhost` par défaut.

Si vous exposez Ollama sur le réseau, utilisez plutôt :
```bash
OLLAMA_ORIGINS="moz-extension://*"
```

---

## 📚 Voir aussi

- [[Ollama-Setup]] - Guide complet d'installation Ollama
- [[Common-Issues]] - Autres problèmes fréquents
- [[Configuration]] - Configuration générale de Quill
- [Documentation officielle Ollama](https://ollama.com/docs)
