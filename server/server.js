const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Chemin absolu vers le fichier .env
const envPath = path.join(__dirname, '.env');

// Charger les variables d'environnement depuis le bon fichier .env
require('dotenv').config({ path: envPath });
// Charger manuellement les variables si elles ne sont pas définies
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envLines = envContent.split('\n');
    
    envLines.forEach(line => {
      const parts = line.split('=');
      if (parts.length === 2) {
        const key = parts[0].trim();
        const value = parts[1].trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  } catch (err) {
    console.error(`Erreur lors du chargement manuel du fichier .env: ${err.message}`);
  }
}

// Vérifier que les variables d'environnement sont bien chargées
['EMAIL_USER','EMAIL_PASS','EMAIL_SERVICE','PORT'].forEach(k => {
  if (!process.env[k] && k !== 'EMAIL_SERVICE') {
    console.error(`[ERREUR] Variable d'environnement manquante: ${k}`);
  }
});
const { contactFormSchema, sanitizeFields, sendConfirmationToUser, sendInternalEmail } = require('./emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ajouter des en-têtes CORS manuellement pour plus de contrôle
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route pour tester le serveur
app.get('/', (req, res) => {
  res.send('Le serveur d\'emails du portfolio fonctionne correctement');
});

// Route pour envoyer un message et un email de confirmation
app.post('/api/send-email', async (req, res) => {
  try {
    // Validation et nettoyage des données avec Zod et sanitize-html
    const parsed = contactFormSchema.parse(req.body);
    const sanitized = sanitizeFields(parsed);
    
    // La vérification du captcha a été désactivée

    // Envoyer les emails
    await Promise.all([
      sendInternalEmail(sanitized),
      sendConfirmationToUser(sanitized.email, sanitized.name)
    ]);

    res.status(200).json({ success: true, message: 'Votre message a été envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    res.status(500).json({ success: false, message: 'Une erreur est survenue lors de l\'envoi du message' });
  }
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Variables d'environnement chargées: PORT=${PORT}, EMAIL_SERVICE=${process.env.EMAIL_SERVICE || 'non défini'}`);
  console.log(`EMAIL_USER est ${process.env.EMAIL_USER ? 'défini' : 'non défini'}`);
  console.log(`EMAIL_PASS est ${process.env.EMAIL_PASS ? 'défini' : 'non défini'}`);
});
