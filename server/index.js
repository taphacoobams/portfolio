const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

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

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuration du transporteur Nodemailer avec les paramètres optimaux pour Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,            // 465 = SSL
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS  // Mot de passe d'application
  },
});

// Vérifier la connexion au serveur SMTP
transporter.verify(function(error, success) {
  if (error) {
    console.error('Erreur de connexion au serveur SMTP:', error);
  }
});

// Route pour tester le serveur
app.get('/', (req, res) => {
  res.send('Le serveur d\'emails fonctionne correctement');
});

// Route pour envoyer un email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation des données
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Veuillez remplir tous les champs obligatoires' });
    }

    const toAddress = process.env.EMAIL_USER;
    console.log('Tentative d\'envoi d\'email à:', toAddress);
    
    // Fonction pour capitaliser la première lettre
    const capitalize = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    // Obtenir le label correspondant à la valeur du sujet
    let subjectLabel = 'Contact depuis le site';
    
    // Liste des thèmes pour le sujet (doit correspondre à celle dans ContactSection.tsx)
    const subjectThemes = [
      { value: '', label: 'Sélectionnez un sujet' },
      { value: 'project', label: 'Proposition de projet' },
      { value: 'job', label: 'Opportunité d\'emploi' },
      { value: 'collaboration', label: 'Proposition de collaboration' },
      { value: 'question', label: 'Question technique' },
      { value: 'feedback', label: 'Retour sur le portfolio' },
      { value: 'autre', label: 'Autre sujet' }
    ];
    
    // Trouver le label correspondant à la valeur du sujet
    if (subject) {
      const themeFound = subjectThemes.find(theme => theme.value === subject);
      if (themeFound) {
        subjectLabel = themeFound.label;
      }
    }
    
    // Options de l'email
    const mailOptions = {
      from: `"${name || 'Formulaire site'}" <${process.env.EMAIL_USER}>`,
      replyTo: email,                 // pour répondre au client
      to: toAddress,
      subject: `Nouveau message à partir du portfolio: ${subjectLabel}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Ce message a été envoyé depuis le formulaire de contact du portfolio.</p>
      `
    };

    // Envoi de l'email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', info.response);

    // Email de confirmation à l'expéditeur
    const confirmationMailOptions = {
      from: `"Portfolio - Moustapha Sambe" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER, // Pour que le client puisse répondre à l'adresse professionnelle
      subject: 'Confirmation de votre message - Portfolio',
      html: `
        <h2>Merci pour votre message</h2>
        <p>Cher(e) ${name},</p>
        <p>Nous avons bien reçu votre message et nous vous remercions de nous avoir contactés.</p>
        <p>Notre équipe vous répondra dans les plus brefs délais.</p>
        <p>Cordialement,</p>
        <p>Moustapha Sambe</p>
        <div style="text-align: center; margin-top: 15px;">
          <p style="margin-bottom: 5px;">moustaphasambe719@gmail.com</p>
          <p style="margin-bottom: 5px;">+33 7 53 84 81 57</p>
        </div>
      `
    };

    // Envoi de l'email de confirmation
    console.log('Envoi de l\'email de confirmation...');
    const confirmInfo = await transporter.sendMail(confirmationMailOptions);
    console.log('Email de confirmation envoyé avec succès:', confirmInfo.response);

    res.status(200).json({ success: true, message: 'Votre message a été envoyé avec succès' });
  } catch (error) {
    console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
    
    // Informations de débogage supplémentaires
    console.error('Informations d\'authentification utilisées:');
    console.error('- EMAIL_USER:', process.env.EMAIL_USER);
    console.error('- EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'Non défini');
    
    res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue lors de l\'envoi de votre message',
      error: error.message
    });
  }
});


// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Variables d'environnement chargées: PORT=${PORT}, EMAIL_SERVICE=${process.env.EMAIL_SERVICE || 'non défini'}`);
  console.log(`EMAIL_USER est ${process.env.EMAIL_USER ? 'défini' : 'non défini'}`);
  console.log(`EMAIL_PASS est ${process.env.EMAIL_PASS ? 'défini' : 'non défini'}`);
});
