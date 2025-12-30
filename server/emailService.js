const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

// Charger .env
dotenv.config({ path: path.join(__dirname, '.env') });

// Vérification des variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("Variables d'environnement email manquantes dans .env");
}

// Configurer Nodemailer pour Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Accepter les certificats auto-signés
  }
});

// Schéma du formulaire
const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  recaptchaToken: z.string().optional(),
});

// Fonction pour nettoyer les champs
const sanitizeFields = (data) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(data)) {
    sanitized[key] = typeof value === "string"
      ? sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
      : value;
  }
  return sanitized;
};

// Fonction pour envoyer le mail de confirmation à l'utilisateur
const sendConfirmationToUser = async (to, name) => {
  const content = `
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
  `;

  await transporter.sendMail({
    from: `"Portfolio - Moustapha Sambe" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Confirmation de votre message - Portfolio",
    html: content,
  });
};

// Fonction pour traduire le sujet
const translateSubject = (subject) => {
  const subjects = {
    project: "Proposition de projet",
    job: "Opportunité d'emploi",
    collaboration: "Proposition de collaboration",
    question: "Question technique",
    feedback: "Retour sur le portfolio",
    other: "Autre sujet"
  };
  return subjects[subject] || "Contact depuis le portfolio";
};

// Fonction pour envoyer le mail interne
const sendInternalEmail = async (data) => {
  const translatedSubject = translateSubject(data.subject);
  
  const content = `
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
    <hr>
    <p>Ce message a été envoyé depuis le formulaire de contact du portfolio.</p>
  `;

  await transporter.sendMail({
    from: `"${data.name || 'Formulaire site'}" <${process.env.EMAIL_USER}>`,
    replyTo: data.email,                 // pour répondre au client
    to: process.env.EMAIL_USER, // Utilise la même adresse que l'expéditeur
    subject: `Nouveau message à partir du portfolio: ${translatedSubject}`,
    html: content,
  });
};

module.exports = { contactFormSchema, sanitizeFields, sendConfirmationToUser, sendInternalEmail };
