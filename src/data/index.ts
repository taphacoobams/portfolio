// Centralized data for the portfolio

// About me data
export const aboutMe = {
  name: "Moustapha Sambe",
  title: "Développeur Full Stack & Intégrateur API",
  location: "Villejuif, 94800",
  phone: "+33 7 53 84 81 57",
  email: "moustaphasambe719@gmail.com",
  languages: ["Français (Courant)", "Anglais (Professionnel)"],
  bio: [
    "Étudiant en Master 2 en développement web, passionné par l'informatique. Curieux et autonome, j'aime relever des challenges et apprendre de nouvelles choses.",
    "J'ai acquis des compétences solides en technologies web et en développement d'API, que je souhaite mettre à profit dans des projets ambitieux.",
    "En dehors du code, je m'intéresse à la musique, au football, au cinéma et à la lecture."
  ],
  social: {
    github: "https://github.com/taphacoobams",
    linkedin: "https://www.linkedin.com/in/mmsambe/",
  }
};

// Skills data
export const skills = {
  programmingLanguages: [
    { name: "PHP", percentage: 85 },
    { name: "JavaScript/TypeScript", percentage: 85 },
    { name: "Java", percentage: 80 },
    { name: "Python", percentage: 75 },
    { name: "Rust", percentage: 70 },
    { name: "C++", percentage: 65 }
  ],
  webTechnologies: [
    "HTML5", "CSS3", "React", "Angular", "Vue.js", 
    "Node.js", "Symfony", "WordPress", "jQuery",
    "REST API", "DataWeave"
  ],
  devOps: [
    "Git", "GitHub", "Docker", "Maven", "Mule",
    "VS Code", "Eclipse", "Android Studio", "XAMPP"
  ],
  databases: ["MySQL", "MongoDB", "Firebase", "SQL"],
  softSkills: [
    "Communication",
    "Esprit d'équipe",
    "Autonomie",
    "Curiosité",
    "Adaptabilité",
    "Sens de l'organisation",
    "Créativité"
  ]
};

// Experience data
export const experiences = [
  {
    id: 1,
    period: "2023 - 2025",
    title: "Intégrateur Intégration Junior",
    company: "CAP4LAB, Paris",
    description: "Développement et intégration d'API avec focus sur Mule 4",
    skills: [
      "Développement de spécifications API",
      "Tests unitaires avec MUnit",
      "Documentation des API",
      "Développement de politiques personnalisées Mule 4",
      "Design RAML",
      "Git"
    ],
    isList: true
  },
  {
    id: 2,
    period: "2023",
    title: "Développeur Web",
    company: "EPSI, Paris",
    description: "Développement d'une application FAQ pour les apprenants et intervenants",
    skills: [
      "Construction de l'architecture et des interfaces",
      "Création de la base de données",
      "Développement full-stack"
    ],
    isList: true
  }
];

// Education data
export const education = [
  {
    id: 1,
    period: "2023 - 2025",
    degree: "Master, Full Lifecycle API",
    institution: "ESTIAM, Paris",
    description: "Formation approfondie en développement et gestion d'API"
  },
  {
    id: 2,
    period: "2020 - 2023",
    degree: "Bachelor, DevOps",
    institution: "EPSI, Paris",
    description: "Formation en développement et opérations"
  },
  {
    id: 3,
    period: "2018 - 2020",
    degree: "DUT, Génie Civil",
    institution: "École Supérieure Polytechnique, Dakar",
    description: "Formation en génie civil"
  },
  {
    id: 4,
    period: "2017 - 2018",
    degree: "Baccalauréat S2",
    institution: "Lycée Saldia, Dakar",
    description: "Mention Assez-bien"
  }
];

// Projects data
export const projects = [
  {
    id: 1,
    title: "Application FAQ EPSI",
    description: "Application web permettant aux apprenants et intervenants de poser et répondre à des questions fréquentes",
    image: "FAQ-App",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "#",
    codeLink: "#"
  },
  {
    id: 2,
    title: "Khalil Collection",
    description: "Site e-commerce pour la marque de mode africaine Khalil Collection, présentant des créations sur mesure et des pièces uniques. Le projet combine un frontend React avec un backend Node.js pour offrir une expérience utilisateur complète.",
    image: "Khalil-Collection",
    skills: ["React", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
    demoLink: "#",
    codeLink: "#"
  }
  // Vous pouvez ajouter d'autres projets ici
];

// Blog posts data (vous pouvez personnaliser ou supprimer si non utilisé)
export const blogPosts = [
  {
    id: 1,
    title: "L'intégration API avec Mule 4",
    summary: "Un guide complet sur l'utilisation de Mule 4 pour l'intégration d'API",
    category: "API Development",
    imageGradient: "from-primary-500/70 to-secondary-500/70",
    link: "#"
  }
];
