export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'batiment' | 'genie-civil' | 'travaux-publics' | 'etudes';
  categoryLabel: string;
  location: string;
  year: string;
  status: 'Livré avec succès' | 'En cours de réalisation' | 'Étude & Conception validée';
  surface?: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  sections?: {
    heading: string;
    text: string;
    bullets?: string[];
  }[];
  takeaways?: string[];
}

export const siteConfig = {
  name: "GLOBAL SERVICE – GÉNIE CIVIL",
  shortName: "Global Service",
  tagline: "CONSTRUIRE AUJOURD'HUI, BÂTIR LE FUTUR",
  description: "Entreprise de référence en Bâtiment, Travaux Publics et Génie Civil au Bénin. Nous transformons vos visions architecturales et structurelles en réalisations durables avec une exigence technique sans compromis.",
  phone: "+229 97 00 00 00", // Standard Benin telephone format
  phoneDisplay: "+229 97 00 00 00",
  whatsappNumber: "22997000000",
  email: "contact@globalservice-geniecivil.bj",
  address: "Rue des Missions, Gbégamè, Cotonou, République du Bénin",
  coordinates: {
    lat: 6.3561359,
    lng: 2.4275849,
    display: "6.3561359, 2.4275849 (Gbégamè, Cotonou)",
  },
  googleMapsPlaceId: "0x102355bc82777863:0x6205e8910aba809e",
  googleMapsUrl: "https://www.google.com/maps/place/Global+Service+%E2%80%93+G%C3%A9nie+civil/@6.3561359,2.4275849,17z/data=!3m1!4b1!4m6!3m5!1s0x102355bc82777863:0x6205e8910aba809e!8m2!3d6.3561359!4d2.4275849!16s%2Fg%2F11y09b_7_1?entry=ttu",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=6.3561359,2.4275849+(Global+Service+-+G%C3%A9nie+civil)&hl=fr&z=17&output=embed",
  workingHours: "Lundi - Vendredi: 07h30 - 18h30 | Samedi: 08h30 - 13h00",
  stats: [
    { value: "100%", label: "Conformité CCTP & Sécurité", suffix: "" },
    { value: "+150k", label: "m² de structures étudiées & bâties", suffix: "" },
    { value: "98.5%", label: "Satisfaction de nos maîtres d'ouvrage", suffix: "" },
    { value: "0", label: "Accident majeur – Politique Zéro Risque", suffix: "" },
  ]
};

export const servicesData: ServiceItem[] = [
  {
    id: "batiment",
    slug: "construction-batiment",
    title: "Construction de Bâtiments",
    category: "Gros Œuvre & Second Œuvre",
    shortDesc: "Édification de complexes résidentiels de haut standing, d'immeubles tertiaires et d'infrastructures commerciales durables.",
    fullDesc: "De la pose de la première pierre aux finitions d'excellence, Global Service assure l'exécution complète de vos ouvrages avec des bétons haute performance, une isolation thermique adaptée au climat tropical ouest-africain et une conformité rigoureuse aux Eurocodes et normes BAEL.",
    iconName: "Building2",
    image: "/images/btp-asset-02.jpg",
    features: [
      "Résidences privées de prestige et villas modernes",
      "Immeubles de bureaux R+4 à R+12",
      "Centres commerciaux et complexes hôteliers",
      "Bâtiments éco-responsables à faible empreinte carbone"
    ],
    specs: [
      { label: "Normes appliquées", value: "BAEL 91 mod 99, Eurocodes 2" },
      { label: "Béton utilisé", value: "B25 à B40 dosé & éprouvé" },
      { label: "Contrôle qualité", value: "Essais laboratoires à 7j et 28j" }
    ]
  },
  {
    id: "genie-civil",
    slug: "genie-civil-ouvrages",
    title: "Génie Civil & Ouvrages d'Art",
    category: "Infrastructures Lourdes",
    shortDesc: "Conception et réalisation d'ouvrages hydrauliques, dalots, ponts, châteaux d'eau et fondations spéciales.",
    fullDesc: "Spécialiste des sols complexes du littoral béninois et des milieux lagunaires, Global Service déploie des méthodologies avancées de fondations profondes (pieux forés, radiers nervurés) et de soutènement pour garantir une stabilité séculaire à vos ouvrages.",
    iconName: "ShieldCheck",
    image: "/images/btp-asset-03.jpg",
    features: [
      "Ponts mixtes acier-béton et dalots cadres armés",
      "Châteaux d'eau et réservoirs de grande capacité",
      "Murs de soutènement et stabilisation de berges",
      "Pieux forés et fondations profondes en milieu meuble"
    ],
    specs: [
      { label: "Étude géotechnique", value: "Sondages carottés & pressiométriques" },
      { label: "Durabilité", value: "Classe d'exposition XS1 à XC4" },
      { label: "Garantie", value: "Décennale avec suivi instrumenté" }
    ]
  },
  {
    id: "travaux-publics",
    slug: "travaux-publics-voiries",
    title: "Travaux Publics & Voiries (VRD)",
    category: "Aménagement Urbain",
    shortDesc: "Aménagement de voiries urbaines, assainissement pluvial de grande section, pavage lourd et terrassements.",
    fullDesc: "Acteur clé du développement urbain au Bénin, nous intervenons dans le traçage, le nivellement laser, le bitumage et la pose de pavés autobloquants haute résistance, avec des réseaux d'évacuation gravitaire calibrés pour résister aux crues des saisons pluvieuses tropicales.",
    iconName: "Truck",
    image: "/images/btp-asset-04.jpg",
    features: [
      "Terrassement général et décapage motorisé",
      "Pavage lourd en béton vibré pour voies de grand trafic",
      "Réseaux d'assainissement pluvial et caniveaux préfabriqués",
      "Revêtements bitumineux et enrobés à chaud"
    ],
    specs: [
      { label: "Compacité", value: "95% à 98% OPM (Optimum Proctor)" },
      { label: "Pavés", value: "Résistance à l'écrasement > 50 MPa" },
      { label: "Pentes hydrauliques", value: "Nivellement optique assisté GNSS" }
    ]
  },
  {
    id: "etudes-techniques",
    slug: "etudes-techniques-conception",
    title: "Études Techniques & Calculs de Structure",
    category: "Ingénierie & BIM",
    shortDesc: "Modélisation 3D BIM, dimensionnement aux éléments finis, métrés détaillés et plans d'exécution certifiés.",
    fullDesc: "Notre bureau d'études intégré effectue les calculs de descente de charges, les analyses dynamiques et la modélisation numérique des structures les plus audacieuses pour optimiser le ratio acier/béton tout en assurant une sécurité absolue.",
    iconName: "Compass",
    image: "/images/btp-asset-05.jpg",
    features: [
      "Calculs de structures béton armé et charpentes métalliques",
      "Plans d'exécution de coffrage et de ferraillage au millimètre",
      "Bordereaux des prix unitaires et devis quantitatifs estimatifs (DQE)",
      "Modélisation BIM 3D & détection d'interférences"
    ],
    specs: [
      { label: "Logiciels maîtres", value: "Robot Structural, AutoCAD, Revit" },
      { label: "Validation", value: "Approbation par bureau de contrôle agréé" },
      { label: "Livrables", value: "Notes de calcul complètes & plans DAO" }
    ]
  },
  {
    id: "suivi-controle",
    slug: "suivi-controle-audit",
    title: "Suivi, Contrôle & Audit de Chantiers",
    category: "Maîtrise d'Œuvre & HSE",
    shortDesc: "Pilotage rigoureux de l'avancement, conformité technique au CCTP, contrôle laboratoire et politique HSE.",
    fullDesc: "Garantir que ce qui est bâti correspond scrupuleusement aux plans approuvés. Nos ingénieurs résidents assurent le contrôle quotidien des dosages de ciment, la résistance des granulats et le respect strict du calendrier d'exécution.",
    iconName: "HardHat",
    image: "/images/btp-asset-06.jpg",
    features: [
      "Contrôle in-situ du slump test et carottages de vérification",
      "Rapports hebdomadaires et mensuels d'avancement avec imagerie drone",
      "Audit technique de conformité et levée des réserves",
      "Gestion stricte de l'hygiène, sécurité et environnement (HSE)"
    ],
    specs: [
      { label: "Fréquence de visite", value: "Présence continue d'ingénieur résident" },
      { label: "Traçabilité", value: "Journal de chantier numérisé et horodaté" },
      { label: "Rapports", value: "Validés contradictoirement avec le client" }
    ]
  },
  {
    id: "renovation",
    slug: "renovation-rehabilitation",
    title: "Rénovation & Réhabilitation d'Ouvrages",
    category: "Pathologie & Rénovation",
    shortDesc: "Diagnostic des pathologies du béton, renforcement de structures affaiblies, surélévation et modernisation.",
    fullDesc: "Redonner vie et sécurité aux structures existantes. Nous intervenons avec des techniques de chemisage en béton armé, d'injection de résines époxydiques et de reprise en sous-œuvre pour prolonger la durée de vie de vos investissements immobiliers.",
    iconName: "Wrench",
    image: "/images/btp-asset-07.jpg",
    features: [
      "Traitement des fissures et carbonatation du béton",
      "Renforcement de poteaux et poutres par chemisage ou plats carbone",
      "Surélévation sécurisée d'immeubles après recalcul des fondations",
      "Rénovation thermique, acoustique et étanchéité de toitures-terrasses"
    ],
    specs: [
      { label: "Diagnostic", value: "Auscultation au scléromètre & radar" },
      { label: "Matériaux spéciaux", value: "Mortiers fibrés & résines structurelles" },
      { label: "Bilan carbone", value: "Réduction de 45% par rapport au neuf" }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Complexe Résidentiel Le Belvédère",
    category: "batiment",
    categoryLabel: "Bâtiment R+5",
    location: "Cotonou (Haie Vive), Bénin",
    year: "2024",
    status: "Livré avec succès",
    surface: "3 800 m²",
    image: "/images/btp-asset-08.jpg",
    gallery: [
      "/images/btp-asset-08.jpg",
      "/images/btp-asset-09.jpg",
      "/images/btp-asset-10.jpg"
    ],
    description: "Construction clé en main d'un ensemble résidentiel contemporain comprenant 14 appartements de grand standing, sous-sol technique étanchéifié et toiture végétalisée.",
    highlights: [
      "Fondations spéciales sur radier nervuré en zone côtière",
      "Façade ventilée réduisant l'échauffement solaire de 35%",
      "Livraison avec 3 semaines d'avance sur le calendrier"
    ]
  },
  {
    id: "proj-2",
    title: "Siège Administratif & Logistique Moderne",
    category: "batiment",
    categoryLabel: "Bâtiment Tertiaire",
    location: "Zone Industrielle de Glo-Djigbé (GDIZ), Bénin",
    year: "2024",
    status: "Livré avec succès",
    surface: "5 200 m²",
    image: "/images/btp-asset-11.jpg",
    gallery: [
      "/images/btp-asset-11.jpg",
      "/images/btp-asset-12.jpg",
      "/images/btp-asset-13.jpg"
    ],
    description: "Bâtiment administratif à haute efficacité énergétique, intégrant des portées libres de 16 mètres en béton précontraint et un hall verrier avec brise-soleil.",
    highlights: [
      "Structure mixte béton armé et charpente métallique apparente",
      "Certification d'isolation thermique adaptée à la zone tropicale",
      "Contrôle technique zéro réserve lors de la réception provisoire"
    ]
  },
  {
    id: "proj-3",
    title: "Aménagement d'Axe de Desserte Urbaine & Dalots",
    category: "travaux-publics",
    categoryLabel: "Voiries & Réseaux Divers",
    location: "Abomey-Calavi, Bénin",
    year: "2023 - 2024",
    status: "Livré avec succès",
    surface: "4.2 km de voie",
    image: "/images/btp-asset-14.jpg",
    gallery: [
      "/images/btp-asset-14.jpg",
      "/images/btp-asset-15.jpg",
      "/images/btp-asset-16.jpg"
    ],
    description: "Travaux de terrassement, nivellement au guidage laser, assainissement pluvial lourd avec caniveaux préfabriqués et pose de pavés autobloquants 10 cm pour trafic lourd.",
    highlights: [
      "Élimination totale des zones inondables sur le tracé de 4,2 km",
      "Plus de 6 800 m³ de béton coulé pour les ouvrages hydrauliques",
      "Emploi direct de plus de 80 jeunes techniciens locaux"
    ]
  },
  {
    id: "proj-4",
    title: "Ouvrage d'Art de Franchissement & Dalot Multiple",
    category: "genie-civil",
    categoryLabel: "Génie Civil & Ouvrage d'Art",
    location: "Département de l'Ouémé, Bénin",
    year: "2024",
    status: "En cours de réalisation",
    surface: "Dalot quadruple 4x (3.50m x 2.50m)",
    image: "/images/btp-asset-17.jpg",
    gallery: [
      "/images/btp-asset-17.jpg",
      "/images/btp-asset-18.jpg",
      "/images/btp-asset-19.jpg"
    ],
    description: "Réalisation d'un dalot quadruple en béton armé hydrofuge destiné à désenclaver les zones maraîchères et assurer la continuité du trafic même pendant les crues fluviales.",
    highlights: [
      "Béton hydrofuge avec adjuvant anti-affouillement",
      "Enrochement de talus amont et aval sur 250 mètres",
      "Calendrier d'exécution accéléré avant le pic des crues"
    ]
  },
  {
    id: "proj-5",
    title: "Étude Structurelle & BIM pour Tour R+8",
    category: "etudes",
    categoryLabel: "Bureau d'Études BIM",
    location: "Cotonou (Cadjehoun), Bénin",
    year: "2024",
    status: "Étude & Conception validée",
    surface: "6 400 m² modélisés",
    image: "/images/btp-asset-20.jpg",
    gallery: [
      "/images/btp-asset-20.jpg",
      "/images/btp-asset-21.jpg",
      "/images/btp-asset-22.jpg"
    ],
    description: "Modélisation numérique intégrale BIM Niveau 2, descente de charges aux éléments finis, plans de ferraillage optimisés et bordereau prévisionnel des quantités.",
    highlights: [
      "Économie de 14% sur le tonnage d'acier grâce au recalcul dynamique",
      "Détection et résolution de 42 conflits réseaux en phase amont",
      "Dossier technique approuvé à l'unanimité par le bureau de contrôle"
    ]
  },
  {
    id: "proj-6",
    title: "Rénovation & Confortement d'Immeuble Commercial",
    category: "batiment",
    categoryLabel: "Réhabilitation Technique",
    location: "Porto-Novo, Bénin",
    year: "2023",
    status: "Livré avec succès",
    surface: "1 950 m²",
    image: "/images/btp-asset-23.jpg",
    gallery: [
      "/images/btp-asset-23.jpg",
      "/images/btp-asset-24.jpg",
      "/images/btp-asset-25.jpg"
    ],
    description: "Reprise en sous-œuvre de fondations affaissées, chemisage de 28 poteaux dégradés par l'air marin, et réhabilitation complète des façades avec parements modernes.",
    highlights: [
      "Diagnostic structurel préalable non destructif par scléromètre",
      "Injection de résines structurelles et renforts composites",
      "Poursuite de l'activité commerciale au RDC durant les travaux"
    ]
  }
];

export const engagements = [
  {
    title: "Rigueur Technique & Ingénierie Certifiée",
    desc: "Calculs dimensionnels validés selon les standards internationaux et conformité absolue aux spécifications des CCTP.",
    icon: "BadgeCheck"
  },
  {
    title: "Sécurité & Politique Zéro Accident (HSE)",
    desc: "Équipements de protection individuelle (EPI) obligatoires, balisage strict et formation continue de nos équipes sur chaque chantier.",
    icon: "ShieldAlert"
  },
  {
    title: "Matériaux Éprouvés en Laboratoire",
    desc: "Contrôle strict des ciments, granulats et aciers par des essais d'écrasement à 7 et 28 jours pour un béton garanti sans compromis.",
    icon: "Microscope"
  },
  {
    title: "Respect Absolu des Délais et Budgets",
    desc: "Méthodologie de planification avancée et suivi hebdomadaire rigoureux partagé en toute transparence avec le maître d'ouvrage.",
    icon: "ClockCheck"
  }
];

export const teamData: TeamMember[] = [
  {
    id: "tm-1",
    name: "Ing. Koffi M. Dossou",
    role: "Directeur Technique & Ingénieur des Travaux",
    specialty: "Structures Béton Armé & Fondations Spéciales",
    experience: "16 ans d'expérience dans les grands chantiers en Afrique de l'Ouest",
    image: "/images/btp-asset-26.jpg",
    bio: "Diplômé en génie civil, il supervise les chantiers stratégiques et veille au respect strict des normes de sécurité et de résistance mécanique des ouvrages."
  },
  {
    id: "tm-2",
    name: "Amina Bio-Guerra",
    role: "Responsable Bureau d'Études & Modélisation BIM",
    specialty: "Calculs aux éléments finis & Modélisation 3D",
    experience: "11 ans d'expérience en ingénierie structurelle",
    image: "/images/btp-asset-27.jpg",
    bio: "Spécialiste de la conception structurelle assistée par ordinateur, elle optimise les ratios techniques et garantit la faisabilité architecturale des projets."
  },
  {
    id: "tm-3",
    name: "Ing. Cyrille Agbodjan",
    role: "Chef de Projets Travaux Publics & Voiries",
    specialty: "Infrastructures routières, assainissement & nivellement",
    experience: "13 ans d'encadrement de projets VRD urbains",
    image: "/images/btp-asset-28.jpg",
    bio: "Expert des sols sablo-argileux du Bénin et des systèmes d'évacuation gravitaire d'eaux pluviales pour prévenir durablement les inondations."
  },
  {
    id: "tm-4",
    name: "Gaston T. Houndété",
    role: "Coordinateur Qualité, Hygiène & Sécurité (HSE)",
    specialty: "Prévention des risques de chantier & audits matériaux",
    experience: "9 ans dans l'assurance qualité BTP",
    image: "/images/btp-asset-29.jpg",
    bio: "Veille quotidienne au respect des équipements de protection, vérification des éprouvettes en laboratoire agréé et sécurisation des zones de travail."
  }
];

export const newsData: NewsArticle[] = [
  {
    id: "news-1",
    slug: "fondations-milieu-cotier-benin",
    title: "Construire sur le littoral béninois : Les clés d'une fondation pérenne",
    date: "15 Octobre 2024",
    category: "Ingénierie & Sols",
    readTime: "4 min de lecture",
    excerpt: "Comment contrer les défis de la salinité, du niveau de nappe phréatique élevé et des sols meubles à Cotonou et ses environs.",
    content: "La bande côtière béninoise présente des particularités géotechniques exigeantes : sables fins marins saturés, nappe phréatique affleurant souvent à moins de 1,50 m sous le terrain naturel, et présence d'embruns marins chargés en chlorures. Dans ces conditions, les fondations superficielles non étudiées conduisent inévitablement à des tassements différentiels et à la fissuration prématurée des superstructures.",
    image: "/images/btp-asset-30.jpg",
    sections: [
      {
        heading: "1. Reconnaissance géotechnique obligatoire (G2 AVP / G2 PRO)",
        text: "Tout projet durable sur la côte cotonnoise débute par une campagne de sondages carottés et au pénétromètre dynamique ou statique (CPT). Ces essais déterminent avec précision la contrainte admissible du sol et l'épaisseur des couches de vase ou de matière organique à purger impérativement.",
        bullets: [
          "Mesure continue de la résistance de pointe (qc) jusqu'au substratum résistant",
          "Analyse chimique de l'eau interstitielle pour déceler la concentration en ions chlorures et sulfates",
          "Calcul prévisionnel des tassements sous charges maximales d'exploitation"
        ]
      },
      {
        heading: "2. Choix de la typologie : Radier nervuré ou pieux forés ?",
        text: "Pour les structures de type R+1 à R+3 avec nappe haute, le radier général nervuré offre une rigidité monolithique remarquable, répartissant uniformément les charges. Pour les immeubles de grande hauteur (au-delà de R+4), les pieux forés tubés ancrés dans les sables denses profonds constituent la seule solution garantissant le zéro tassement différentiel.",
        bullets: [
          "Radier hydrofuge coulé en continu avec adjuvants réducteurs d'eau",
          "Enrobage strict des aciers porté à 50 mm minimum contre la corrosion saline",
          "Mise en place d'un système de drainage périphérique et géotextile anti-colmatage"
        ]
      },
      {
        heading: "3. Formulation des bétons en ambiance marine agressive",
        text: "Global Service préconise l'emploi exclusif de ciments résistants aux sulfates et aux eaux de mer (type CEM III ou CEM I avec additions pouzzolaniques contrôlées), avec un rapport Eau/Ciment strictement inférieur à 0,45 pour minimiser la porosité capillaire.",
        bullets: [
          "Béton B30 à B40 contrôlé par éprouvettes cylindriques à 7, 14 et 28 jours",
          "Utilisation d'inhibiteurs de corrosion pour armatures passives",
          "Vibration au vibreur pendulaire haute fréquence pour supprimer tout risque de nids de gravier"
        ]
      }
    ],
    takeaways: [
      "Étude de sol G2 préalable non négociable",
      "Enrobage des armatures de 50 mm en zone côtière",
      "Formulation de béton à faible rapport E/C avec ciment CRS",
      "Éprouvettes écrasées systématiquement en laboratoire certifié"
    ]
  },
  {
    id: "news-2",
    slug: "optimisation-bim-gestion-chantier",
    title: "Le BIM dans le BTP au Bénin : Pourquoi l'anticipation numérique change tout",
    date: "28 Septembre 2024",
    category: "Innovation Technologique",
    readTime: "5 min de lecture",
    excerpt: "L'intégration de maquettes 3D interconnectées permet de réduire jusqu'à 20% des aléas d'exécution et de maîtriser précisément les coûts.",
    content: "Sur les chantiers traditionnels en Afrique de l'Ouest, les conflits entre corps d'état — passage de gaines techniques traversant une poutre maîtresse, réservations oubliées dans les voiles en béton — sont découverts au moment du coulage. La maquette numérique BIM (Building Information Modeling) déployée par Global Service résout ces clashs en amont dans l'environnement virtuel.",
    image: "/images/btp-asset-31.jpg",
    sections: [
      {
        heading: "1. Détection automatique des clashs avant terrassement",
        text: "En superposant les modèles 3D structurels, électriques, plomberie et climatisation, nos ingénieurs identifient 100% des interférences géométriques. Chaque réservation est calée au millimètre près avant même la fabrication des coffrages sur site.",
        bullets: [
          "Modélisation paramétrique sous Revit et Robot Structural Analysis",
          "Zéro reprise en sous-œuvre ou carottage imprévu dans les éléments porteurs",
          "Gain de temps moyen de 18% sur le gros œuvre"
        ]
      },
      {
        heading: "2. Métrés et quantitatifs précis au sac de ciment près",
        text: "Le BIM 4D et 5D permet d'associer le planning prévisionnel (GANTT) et le coût des matériaux. Les approvisionnements sont lissés, éliminant les ruptures de stock de ferraillage ou les pertes de matériaux sur les plates-formes logistiques de Cotonou.",
        bullets: [
          "Extraction automatique des volumes de béton et tonnages d'acier",
          "Suivi des livraisons en flux tendu synchronisé avec les cadences de coulage",
          "Transparence budgétaire totale pour le maître d'ouvrage"
        ]
      },
      {
        heading: "3. Le jumeau numérique au service de la maintenance future",
        text: "À la livraison de l'ouvrage, le maître d'ouvrage reçoit le Dossier des Ouvrages Exécutés (DOE) numérique complet. Chaque canalisation, vanne, câble et équipement est géolocalisé avec ses fiches techniques fabricant pour faciliter l'exploitation pendant 50 ans.",
        bullets: [
          "Traçabilité complète des matériaux coulés",
          "Maintenance préventive facilitée pour les gestionnaires d'immeubles de bureaux",
          "Valorisation patrimoniale accrue de l'actif immobilier"
        ]
      }
    ],
    takeaways: [
      "Zéro carottage destructif grâce à la coordination spatiale 3D",
      "Économie mesurée jusqu'à 15% sur les chutes et pertes de matière première",
      "Planning GANTT 4D respecté sans surprise de calendrier",
      "DOE numérique exploitable par la maintenance sur le long terme"
    ]
  },
  {
    id: "news-3",
    slug: "gestion-assainissement-eaux-pluviales",
    title: "Infrastructures d'assainissement : Maîtriser les pluies torrentielles tropicales",
    date: "04 Septembre 2024",
    category: "Travaux Publics",
    readTime: "3 min de lecture",
    excerpt: "Les bonnes pratiques de dimensionnement hydraulique des dalots et caniveaux urbains pour assurer la durabilité des voies pavées.",
    content: "Le régime des précipitations tropicales au Bénin se caractérise par des averses d'intensité extrême concentrées sur de courtes périodes. Sans un réseau d'assainissement gravitaire rigoureusement dimensionné, l'eau pluviale sature la couche de forme des chaussées, provoquant affaissements, déchaussements de pavés et dégradations rapides des voies urbaines.",
    image: "/images/btp-asset-32.jpg",
    sections: [
      {
        heading: "1. Calcul des débits de pointe par la méthode rationnelle",
        text: "Le dimensionnement des caniveaux à ciel ouvert et des dalots sous voirie repose sur les coefficients de ruissellement locaux et les courbes intensité-durée-fréquence (IDF) pour des périodes de retour de 10 à 50 ans.",
        bullets: [
          "Prise en compte de l'imperméabilisation croissante des bassins versants urbains",
          "Vitesse d'écoulement calée entre 0,6 m/s (auto-curage) et 3,5 m/s (anti-abrasion)",
          "Pentes longitudinales régulières contrôlées au niveau laser rotatif"
        ]
      },
      {
        heading: "2. Préfabrication et qualité des dalots et caniveaux",
        text: "Pour garantir une résistance mécanique optimale sous trafic lourd (camions de fort tonnage, bennes), Global Service privilégie les éléments préfabriqués en atelier forain contrôlé ou le coulage sur place avec coffrages métalliques indéformables.",
        bullets: [
          "Dalots cadres en béton armé dosé à 350-400 kg/m³ de ciment",
          "Dalles de couverture alvéolées ou pleines calculées pour charges d'essieu 13 tonnes",
          "Jointoiement étanche pour éviter toute décompression du remblai contigu"
        ]
      },
      {
        heading: "3. Bassins de rétention et exutoires naturels",
        text: "L'évacuation vers les lagunes et cours d'eau exige des ouvrages de tête avec déversoirs et bassins de décantation des sables pour préserver l'environnement aquatique et prévenir les ensablements récurrents.",
        bullets: [
          "Pose de grilles amovibles pièges à flottants pour maintenance aisée",
          "Enrochements parafouilles en sortie de dalot pour stopper l'érosion régressive",
          "Pérennité garantie des dessertes résidentielles et commerciales"
        ]
      }
    ],
    takeaways: [
      "Vitesse d'écoulement auto-curante pour éviter l'envasement précoce",
      "Éléments dimensionnés pour charges d'essieux lourdes (13 tonnes)",
      "Ouvrages de décharge avec parafouilles enrochées",
      "Protection intégrale des voiries pavées contre le ravinement"
    ]
  }
];

