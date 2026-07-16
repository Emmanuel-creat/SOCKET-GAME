/**
 * ============================================================================
 *  BANQUE DE QUESTIONS DU QUIZ
 * ============================================================================
 *
 *  Ce fichier contient TOUTES les questions du jeu Quiz. Il ne contient que
 *  des données (aucune logique de jeu) : vous pouvez le modifier librement,
 *  ajouter, retirer ou corriger des questions sans toucher au reste du code.
 *
 *  FORMAT D'UNE QUESTION
 *  ----------------------------------------------------------------------
 *  {
 *    id: "q0001",              // identifiant informatif (peut rester vide "" ou être dupliqué : le moteur ne s'en sert pas pour fonctionner)
 *    categorie: "Histoire",    // catégorie affichée dans le filtre du salon
 *    difficulte: 1,            // 1 = facile, 2 = moyen, 3 = difficile
 *    question: "En quelle année a eu lieu la prise de la Bastille ?",
 *    options: ["1789", "1769", "1799", "1804"],  // exactement 4 propositions, toutes différentes
 *    reponse: 0,                // index (0 à 3) de la bonne réponse dans "options"
 *  },
 *
 *  AJOUTER UNE QUESTION
 *  ----------------------------------------------------------------------
 *  1. Copiez le bloc ci-dessus (ou n'importe quelle ligne existante).
 *  2. Collez-le n'importe où dans le tableau QUESTIONS ci-dessous.
 *  3. Changez le texte, les 4 options et l'index de la bonne réponse.
 *  4. Sauvegardez : c'est tout, la question apparaîtra automatiquement
 *     (aucun redémarrage de code nécessaire, juste recharger la page).
 *
 *  MODIFIER OU SUPPRIMER UNE QUESTION
 *  ----------------------------------------------------------------------
 *  Cherchez le texte de la question (Ctrl+F) et modifiez ou supprimez le
 *  bloc { ... } correspondant. Pensez à garder la virgule après chaque
 *  bloc sauf le tout dernier de la liste.
 *
 *  CRÉER UNE NOUVELLE CATÉGORIE
 *  ----------------------------------------------------------------------
 *  Donnez simplement une nouvelle valeur à "categorie" : elle apparaîtra
 *  automatiquement dans les filtres de sélection du salon, sans aucune
 *  autre modification nécessaire.
 *
 *  RÈGLES À RESPECTER (sinon la question sera ignorée au chargement)
 *  ----------------------------------------------------------------------
 *  - Exactement 4 options, toutes différentes les unes des autres.
 *  - "reponse" doit être 0, 1, 2 ou 3.
 *  - "difficulte" doit être 1, 2 ou 3.
 *  - "question" et "categorie" ne doivent pas être vides.
 *
 *  CATÉGORIES ACTUELLEMENT UTILISÉES (15 au total)
 *  ----------------------------------------------------------------------
 *  Capitales, Cinéma, Culture générale, Drapeaux, Géographie, Histoire, Informatique, Jeux vidéo & Séries, Littérature, Mathématiques, Musique, Mythologie, Nature & Animaux, Sciences, Sport
 *
 *  Total actuel : 2394 questions.
 * ============================================================================
 */

export const QUESTIONS = [
  {
    "id": "q0001",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Combien de cœurs possède une pieuvre ?",
    "options": [
      "4",
      "1",
      "3",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q0002",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ca » ?",
    "options": [
      "Cérium",
      "Calcium",
      "Lanthane",
      "Manganèse"
    ],
    "reponse": 1
  },
  {
    "id": "q0003",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Paraguay ?",
    "options": [
      "Niamey",
      "Jakarta",
      "Asuncion",
      "Guatemala"
    ],
    "reponse": 2
  },
  {
    "id": "q0004",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 784 ?",
    "options": [
      "29",
      "26",
      "24",
      "28"
    ],
    "reponse": 3
  },
  {
    "id": "q0005",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Soudan ?",
    "options": [
      "Livre soudanaise",
      "Baht",
      "Peso mexicain",
      "Leu moldave"
    ],
    "reponse": 0
  },
  {
    "id": "q0006",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Singapour est la capitale de quel pays ?",
    "options": [
      "Tanzanie",
      "Costa Rica",
      "Singapour",
      "Portugal"
    ],
    "reponse": 2
  },
  {
    "id": "q0007",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style architectural du XVIIe siècle, riche en ornements, caractérise le château de Versailles ?",
    "options": [
      "Le baroque",
      "Le gothique",
      "Le rococo",
      "Le roman"
    ],
    "reponse": 0
  },
  {
    "id": "q0008",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Qui était le roi de France exécuté en 1793 ?",
    "options": [
      "Louis XV",
      "Napoléon III",
      "Louis XVI",
      "Louis XIV"
    ],
    "reponse": 2
  },
  {
    "id": "q0009",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 402 en chiffres romains ?",
    "options": [
      "CDXII",
      "CCCXCVII",
      "CDI",
      "CDII"
    ],
    "reponse": 3
  },
  {
    "id": "q0010",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel DJ et producteur français est connu pour « One More Time » au sein de Daft Punk ?",
    "options": [
      "Thomas Bangalter",
      "David Guetta",
      "Bob Sinclar",
      "Martin Solveig"
    ],
    "reponse": 0
  },
  {
    "id": "q0011",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur français est connu pour « Formidable » et « Papaoutai » ?",
    "options": [
      "Grand Corps Malade",
      "Stromae",
      "Orelsan",
      "Maître Gims"
    ],
    "reponse": 1
  },
  {
    "id": "q0012",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCXLV en chiffres romains ?",
    "options": [
      "3640",
      "3635",
      "3643",
      "3645"
    ],
    "reponse": 3
  },
  {
    "id": "q0013",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel géant grec a été condamné à porter le monde sur ses épaules ?",
    "options": [
      "Prométhée",
      "Ouranos",
      "Cronos",
      "Atlas"
    ],
    "reponse": 3
  },
  {
    "id": "q0014",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Maroc ?",
    "options": [
      "Pékin",
      "Belgrade",
      "Pyongyang",
      "Rabat"
    ],
    "reponse": 3
  },
  {
    "id": "q0015",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat marocain est un ragoût mijoté lentement dans un plat conique en terre cuite ?",
    "options": [
      "Le tajine",
      "Le méchoui",
      "Le couscous",
      "La pastilla"
    ],
    "reponse": 0
  },
  {
    "id": "q0016",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mozambique ?",
    "options": [
      "🇲🇿",
      "🇯🇲",
      "🇶🇦",
      "🇨🇭"
    ],
    "reponse": 0
  },
  {
    "id": "q0017",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 10 ?",
    "options": [
      "7",
      "9",
      "6",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q0018",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur incarne le personnage principal dans « Gladiator » ?",
    "options": [
      "Ralph Fiennes",
      "Colin Firth",
      "Russell Brand",
      "Russell Crowe"
    ],
    "reponse": 3
  },
  {
    "id": "q0019",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le gaz le plus abondant dans l'atmosphère terrestre ?",
    "options": [
      "L'oxygène",
      "Le dioxyde de carbone",
      "L'azote",
      "L'argon"
    ],
    "reponse": 2
  },
  {
    "id": "q0020",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Vietnam ?",
    "options": [
      "🇻🇳",
      "🇮🇶",
      "🇿🇼",
      "🇰🇼"
    ],
    "reponse": 0
  },
  {
    "id": "q0021",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de temps dure une mi-temps au football ?",
    "options": [
      "30 minutes",
      "50 minutes",
      "40 minutes",
      "45 minutes"
    ],
    "reponse": 3
  },
  {
    "id": "q0022",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1994 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "21e siècle",
      "20e siècle",
      "19e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0023",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le plus grand organe du corps humain ?",
    "options": [
      "La peau",
      "Le cerveau",
      "L'intestin",
      "Le foie"
    ],
    "reponse": 0
  },
  {
    "id": "q0024",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Oxygène ?",
    "options": [
      "O",
      "K",
      "F",
      "Cl"
    ],
    "reponse": 0
  },
  {
    "id": "q0025",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Quito est la capitale de quel pays ?",
    "options": [
      "Équateur",
      "Paraguay",
      "Espagne",
      "Portugal"
    ],
    "reponse": 0
  },
  {
    "id": "q0026",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Niamey est la capitale de quel pays ?",
    "options": [
      "Brésil",
      "Serbie",
      "Niger",
      "Botswana"
    ],
    "reponse": 2
  },
  {
    "id": "q0027",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 28 min ?",
    "options": [
      "1878",
      "1819",
      "1418",
      "1680"
    ],
    "reponse": 3
  },
  {
    "id": "q0028",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 48 ÷ 8 ?",
    "options": [
      "3",
      "6",
      "4",
      "9"
    ],
    "reponse": 1
  },
  {
    "id": "q0029",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel courant artistique italien du début du XXe siècle célèbre la vitesse, la machine et la modernité ?",
    "options": [
      "Le dadaïsme",
      "Le futurisme",
      "Le fauvisme",
      "Le constructivisme"
    ],
    "reponse": 1
  },
  {
    "id": "q0030",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Malte ?",
    "options": [
      "Dinar koweïtien",
      "Euro",
      "Lempira",
      "Mark convertible"
    ],
    "reponse": 1
  },
  {
    "id": "q0031",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel dessert britannique consiste en des couches de fruits, de crème anglaise et de génoise imbibée ?",
    "options": [
      "Le crumble",
      "Le Eton mess",
      "Le trifle",
      "Le sticky toffee pudding"
    ],
    "reponse": 2
  },
  {
    "id": "q0032",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Cuba ?",
    "options": [
      "🇩🇪",
      "🇨🇮",
      "🇨🇺",
      "🇳🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q0033",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Wellington est la capitale de quel pays ?",
    "options": [
      "Lettonie",
      "Nouvelle-Zélande",
      "Yémen",
      "Cameroun"
    ],
    "reponse": 1
  },
  {
    "id": "q0034",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Phosphore ?",
    "options": [
      "Tc",
      "P",
      "Ni",
      "Ag"
    ],
    "reponse": 1
  },
  {
    "id": "q0035",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Uruguay ?",
    "options": [
      "Peso uruguayen",
      "Guarani",
      "Livre libanaise",
      "Shilling ougandais"
    ],
    "reponse": 0
  },
  {
    "id": "q0036",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Colombie ?",
    "options": [
      "Forint",
      "Peso colombien",
      "Dinar irakien",
      "Dollar canadien"
    ],
    "reponse": 1
  },
  {
    "id": "q0037",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Zambie ?",
    "options": [
      "🇸🇻",
      "🇿🇲",
      "🇷🇸",
      "🇼🇸"
    ],
    "reponse": 1
  },
  {
    "id": "q0038",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Hongrie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q0039",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Carbone ?",
    "options": [
      "Ar",
      "Se",
      "Rb",
      "C"
    ],
    "reponse": 3
  },
  {
    "id": "q0040",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Australie ?",
    "options": [
      "Varsovie",
      "Canberra",
      "Vientiane",
      "Ottawa"
    ],
    "reponse": 1
  },
  {
    "id": "q0041",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 106 - 10 ?",
    "options": [
      "96",
      "98",
      "94",
      "93"
    ],
    "reponse": 0
  },
  {
    "id": "q0042",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ni » ?",
    "options": [
      "Uranium",
      "Nickel",
      "Argent",
      "Phosphore"
    ],
    "reponse": 1
  },
  {
    "id": "q0043",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle chaîne de montagnes traverse l'Amérique du Sud d'un bout à l'autre ?",
    "options": [
      "Les Rocheuses",
      "La cordillère Centrale",
      "La cordillère des Andes",
      "La Sierra Madre"
    ],
    "reponse": 2
  },
  {
    "id": "q0044",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle ville turque s'étend à la fois sur l'Europe et sur l'Asie, de part et d'autre du Bosphore ?",
    "options": [
      "Ankara",
      "Antalya",
      "Izmir",
      "Istanbul"
    ],
    "reponse": 3
  },
  {
    "id": "q0045",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est connu pour dormir debout et peut dormir seulement quelques heures par jour ?",
    "options": [
      "Le cheval",
      "La vache",
      "La chèvre",
      "Le mouton"
    ],
    "reponse": 0
  },
  {
    "id": "q0046",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Géorgie ?",
    "options": [
      "Tachkent",
      "Tbilissi",
      "Rabat",
      "Stockholm"
    ],
    "reponse": 1
  },
  {
    "id": "q0047",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 28 h ?",
    "options": [
      "100800",
      "93583",
      "115325",
      "114143"
    ],
    "reponse": 0
  },
  {
    "id": "q0048",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Luxembourg ?",
    "options": [
      "Europe",
      "Océanie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0049",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de France ?",
    "options": [
      "Kaboul",
      "Amsterdam",
      "Paris",
      "Manille"
    ],
    "reponse": 2
  },
  {
    "id": "q0050",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 32 ÷ 8 ?",
    "options": [
      "6",
      "7",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q0051",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Australie",
      "Moldavie",
      "Nigeria",
      "Rwanda"
    ],
    "reponse": 3
  },
  {
    "id": "q0052",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 275 + 975 ?",
    "options": [
      "1253",
      "1248",
      "1251",
      "1250"
    ],
    "reponse": 3
  },
  {
    "id": "q0053",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 171 ÷ 9 ?",
    "options": [
      "19",
      "16",
      "17",
      "15"
    ],
    "reponse": 0
  },
  {
    "id": "q0054",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle région polaire est un continent, contrairement à l'Arctique qui est un océan gelé ?",
    "options": [
      "L'Alaska",
      "Le Groenland",
      "L'Antarctique",
      "La Sibérie"
    ],
    "reponse": 2
  },
  {
    "id": "q0055",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 5000 mg ?",
    "options": [
      "2",
      "6",
      "5",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q0056",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Népal ?",
    "options": [
      "Peso uruguayen",
      "Roupie népalaise",
      "Euro",
      "Riyal qatari"
    ],
    "reponse": 1
  },
  {
    "id": "q0057",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Costa Rica ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q0058",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Japon ?",
    "options": [
      "Tokyo",
      "Buenos Aires",
      "Kampala",
      "Naypyidaw"
    ],
    "reponse": 0
  },
  {
    "id": "q0059",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Égypte",
      "Luxembourg",
      "Slovaquie",
      "Congo"
    ],
    "reponse": 1
  },
  {
    "id": "q0060",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Philippines ?",
    "options": [
      "Manille",
      "Athènes",
      "Oslo",
      "Podgorica"
    ],
    "reponse": 0
  },
  {
    "id": "q0061",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom de l'étude scientifique des tremblements de terre ?",
    "options": [
      "La géologie",
      "La météorologie",
      "La volcanologie",
      "La sismologie"
    ],
    "reponse": 3
  },
  {
    "id": "q0062",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « C » ?",
    "options": [
      "Uranium",
      "Thorium",
      "Cadmium",
      "Carbone"
    ],
    "reponse": 3
  },
  {
    "id": "q0063",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Chili ?",
    "options": [
      "Couronne danoise",
      "Peso chilien",
      "Mark convertible",
      "Quetzal"
    ],
    "reponse": 1
  },
  {
    "id": "q0064",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Radon ?",
    "options": [
      "Rn",
      "Ra",
      "Y",
      "Sb"
    ],
    "reponse": 0
  },
  {
    "id": "q0065",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné le Joker dans « The Dark Knight » (2008) ?",
    "options": [
      "Jack Nicholson",
      "Heath Ledger",
      "Jared Leto",
      "Joaquin Phoenix"
    ],
    "reponse": 1
  },
  {
    "id": "q0066",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre norvégien est l'auteur du tableau « Le Cri » ?",
    "options": [
      "Edvard Munch",
      "Gustav Klimt",
      "Egon Schiele",
      "Vassily Kandinsky"
    ],
    "reponse": 0
  },
  {
    "id": "q0067",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Quel nombre représente LIV en chiffres romains ?",
    "options": [
      "54",
      "44",
      "53",
      "56"
    ],
    "reponse": 0
  },
  {
    "id": "q0068",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel oiseau est incapable de voler mais excellent nageur, vivant en Antarctique ?",
    "options": [
      "L'autruche",
      "Le manchot",
      "Le kiwi",
      "L'émeu"
    ],
    "reponse": 1
  },
  {
    "id": "q0069",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Arabie saoudite ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0070",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel biologiste autrichien est le père de la génétique moderne grâce à ses travaux sur les petits pois ?",
    "options": [
      "James Watson",
      "Charles Darwin",
      "Gregor Mendel",
      "Francis Crick"
    ],
    "reponse": 2
  },
  {
    "id": "q0071",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Namibie ?",
    "options": [
      "Asie",
      "Afrique",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0072",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 465 + 496 ?",
    "options": [
      "959",
      "961",
      "960",
      "964"
    ],
    "reponse": 1
  },
  {
    "id": "q0073",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Mali",
      "Portugal",
      "Syrie",
      "Belgique"
    ],
    "reponse": 0
  },
  {
    "id": "q0074",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Vietnam ?",
    "options": [
      "Océanie",
      "Afrique",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0075",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Honduras ?",
    "options": [
      "Tegucigalpa",
      "Maputo",
      "Koweït City",
      "Bamako"
    ],
    "reponse": 0
  },
  {
    "id": "q0076",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Sénégal ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q0077",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 au carré ?",
    "options": [
      "56",
      "44",
      "46",
      "49"
    ],
    "reponse": 3
  },
  {
    "id": "q0078",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle échelle sert à mesurer la magnitude des séismes ?",
    "options": [
      "L'échelle de Mercalli",
      "L'échelle de Beaufort",
      "L'échelle de Kelvin",
      "L'échelle de Richter"
    ],
    "reponse": 3
  },
  {
    "id": "q0079",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Zn » ?",
    "options": [
      "Zinc",
      "Krypton",
      "Brome",
      "Fluor"
    ],
    "reponse": 0
  },
  {
    "id": "q0080",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 959 en chiffres romains ?",
    "options": [
      "CMLIX",
      "CMLVIII",
      "CMXLIX",
      "CMLIV"
    ],
    "reponse": 0
  },
  {
    "id": "q0081",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ouganda ?",
    "options": [
      "Hryvnia",
      "Ariary",
      "Shilling ougandais",
      "Bolivar"
    ],
    "reponse": 2
  },
  {
    "id": "q0082",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel empereur français est né en Corse en 1769 ?",
    "options": [
      "Louis-Napoléon Bonaparte",
      "Charlemagne",
      "Louis XVI",
      "Napoléon Bonaparte"
    ],
    "reponse": 3
  },
  {
    "id": "q0083",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de trous compte un parcours de golf standard ?",
    "options": [
      "16",
      "18",
      "20",
      "9"
    ],
    "reponse": 1
  },
  {
    "id": "q0084",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Zr » ?",
    "options": [
      "Thorium",
      "Plomb",
      "Zirconium",
      "Palladium"
    ],
    "reponse": 2
  },
  {
    "id": "q0085",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 180 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "2e siècle",
      "4e siècle",
      "3e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0086",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom de l'organe qui permet aux poissons de respirer sous l'eau ?",
    "options": [
      "Les branchies",
      "Les poumons",
      "La vessie natatoire",
      "La peau"
    ],
    "reponse": 0
  },
  {
    "id": "q0087",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 110 ÷ 11 ?",
    "options": [
      "7",
      "8",
      "11",
      "10"
    ],
    "reponse": 3
  },
  {
    "id": "q0088",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Irak",
      "Chypre",
      "Soudan",
      "Mauritanie"
    ],
    "reponse": 3
  },
  {
    "id": "q0089",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Zambie ?",
    "options": [
      "Lusaka",
      "Abou Dabi",
      "La Valette",
      "Islamabad"
    ],
    "reponse": 0
  },
  {
    "id": "q0090",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 38 t ?",
    "options": [
      "38000",
      "43368",
      "37347",
      "38803"
    ],
    "reponse": 0
  },
  {
    "id": "q0091",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Autriche ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q0092",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année la Bastille a-t-elle été prise, marquant le début de la Révolution française ?",
    "options": [
      "1793",
      "1789",
      "1804",
      "1815"
    ],
    "reponse": 1
  },
  {
    "id": "q0093",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film de Disney met en scène une princesse aux pouvoirs de glace nommée Elsa ?",
    "options": [
      "Vaiana",
      "Raiponce",
      "Blanche-Neige",
      "La Reine des neiges"
    ],
    "reponse": 3
  },
  {
    "id": "q0094",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 556 - 298 ?",
    "options": [
      "261",
      "258",
      "260",
      "257"
    ],
    "reponse": 1
  },
  {
    "id": "q0095",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Émirats arabes unis ?",
    "options": [
      "🇲🇩",
      "🇭🇳",
      "🇧🇩",
      "🇦🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q0096",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle autrice britannique a créé la détective Miss Marple et Hercule Poirot ?",
    "options": [
      "Ruth Rendell",
      "P.D. James",
      "Agatha Christie",
      "Dorothy L. Sayers"
    ],
    "reponse": 2
  },
  {
    "id": "q0097",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur joue le rôle principal dans « Le Loup de Wall Street » ?",
    "options": [
      "Leonardo DiCaprio",
      "Matt Damon",
      "Brad Pitt",
      "Tom Hanks"
    ],
    "reponse": 0
  },
  {
    "id": "q0098",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur est le créateur de la saga « Star Wars » ?",
    "options": [
      "George Lucas",
      "James Cameron",
      "Ridley Scott",
      "Steven Spielberg"
    ],
    "reponse": 0
  },
  {
    "id": "q0099",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 187 + 245 ?",
    "options": [
      "431",
      "435",
      "430",
      "432"
    ],
    "reponse": 3
  },
  {
    "id": "q0100",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation met en scène un adolescent qui hérite d'un pouvoir extraterrestre appelé l'Omnitrix ?",
    "options": [
      "Miraculous",
      "Max Steel",
      "Generator Rex",
      "Ben 10"
    ],
    "reponse": 3
  },
  {
    "id": "q0101",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel organe produit l'insuline dans le corps humain ?",
    "options": [
      "Le foie",
      "Le pancréas",
      "La thyroïde",
      "La rate"
    ],
    "reponse": 1
  },
  {
    "id": "q0102",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République tchèque ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q0103",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 120 ?",
    "options": [
      "60",
      "63",
      "62",
      "55"
    ],
    "reponse": 0
  },
  {
    "id": "q0104",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1540 et 1566 ?",
    "options": [
      "28",
      "24",
      "22",
      "26"
    ],
    "reponse": 3
  },
  {
    "id": "q0105",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 28 ÷ 7 ?",
    "options": [
      "7",
      "3",
      "2",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q0106",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Pays-Bas",
      "Arménie",
      "Jamaïque",
      "Népal"
    ],
    "reponse": 0
  },
  {
    "id": "q0107",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Niger ?",
    "options": [
      "Dacca",
      "Paris",
      "Nairobi",
      "Niamey"
    ],
    "reponse": 3
  },
  {
    "id": "q0108",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Turquie",
      "Ouzbékistan",
      "Koweït",
      "Qatar"
    ],
    "reponse": 0
  },
  {
    "id": "q0109",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Islande",
      "Grèce",
      "Algérie",
      "Cameroun"
    ],
    "reponse": 2
  },
  {
    "id": "q0110",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 62 + 456 ?",
    "options": [
      "515",
      "516",
      "517",
      "518"
    ],
    "reponse": 3
  },
  {
    "id": "q0111",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 183 - 89 ?",
    "options": [
      "95",
      "94",
      "97",
      "92"
    ],
    "reponse": 1
  },
  {
    "id": "q0112",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse grecque de la chasse et de la lune ?",
    "options": [
      "Athéna",
      "Artémis",
      "Déméter",
      "Héra"
    ],
    "reponse": 1
  },
  {
    "id": "q0113",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCLII en chiffres romains ?",
    "options": [
      "3852",
      "3847",
      "3842",
      "3857"
    ],
    "reponse": 0
  },
  {
    "id": "q0114",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Cambodge ?",
    "options": [
      "Phnom Penh",
      "Nouakchott",
      "Suva",
      "Antananarivo"
    ],
    "reponse": 0
  },
  {
    "id": "q0115",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Guatemala est la capitale de quel pays ?",
    "options": [
      "Lettonie",
      "Émirats arabes unis",
      "Guatemala",
      "France"
    ],
    "reponse": 2
  },
  {
    "id": "q0116",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Burkina Faso ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0117",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Suriname ?",
    "options": [
      "🇻🇳",
      "🇷🇼",
      "🇷🇴",
      "🇸🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q0118",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Afghanistan ?",
    "options": [
      "Peso dominicain",
      "Lek",
      "Peso cubain",
      "Afghani"
    ],
    "reponse": 3
  },
  {
    "id": "q0119",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Panama ?",
    "options": [
      "🇸🇩",
      "🇵🇪",
      "🇵🇦",
      "🇹🇭"
    ],
    "reponse": 2
  },
  {
    "id": "q0120",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 65 + 447 ?",
    "options": [
      "514",
      "515",
      "512",
      "513"
    ],
    "reponse": 2
  },
  {
    "id": "q0121",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un homme qui revit la même journée en boucle ?",
    "options": [
      "La Vie est belle",
      "About Time",
      "Un jour sans fin",
      "Click"
    ],
    "reponse": 2
  },
  {
    "id": "q0122",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle épidémie a décimé environ un tiers de la population européenne au XIVe siècle ?",
    "options": [
      "Le choléra",
      "La peste noire",
      "La grippe espagnole",
      "La variole"
    ],
    "reponse": 1
  },
  {
    "id": "q0123",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Monténégro",
      "Costa Rica",
      "Kazakhstan",
      "République tchèque"
    ],
    "reponse": 0
  },
  {
    "id": "q0124",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 328 - 20 ?",
    "options": [
      "306",
      "308",
      "305",
      "307"
    ],
    "reponse": 1
  },
  {
    "id": "q0125",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 3300 année(s) ?",
    "options": [
      "31",
      "33",
      "27",
      "26"
    ],
    "reponse": 1
  },
  {
    "id": "q0126",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCMXLV en chiffres romains ?",
    "options": [
      "3947",
      "3946",
      "3945",
      "3943"
    ],
    "reponse": 2
  },
  {
    "id": "q0127",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Tunisie ?",
    "options": [
      "Manat azerbaïdjanais",
      "Peso chilien",
      "Dinar tunisien",
      "Dinar jordanien"
    ],
    "reponse": 2
  },
  {
    "id": "q0128",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de temps dure un match de football hors prolongations ?",
    "options": [
      "100 minutes",
      "90 minutes",
      "120 minutes",
      "80 minutes"
    ],
    "reponse": 1
  },
  {
    "id": "q0129",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 410 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "6e siècle",
      "3e siècle",
      "5e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0130",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Venezuela",
      "Japon",
      "Zambie",
      "Autriche"
    ],
    "reponse": 1
  },
  {
    "id": "q0131",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Mercure ?",
    "options": [
      "Fe",
      "Tc",
      "Hg",
      "O"
    ],
    "reponse": 2
  },
  {
    "id": "q0132",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 4 ?",
    "options": [
      "32",
      "37",
      "31",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q0133",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 20 ?",
    "options": [
      "15",
      "13",
      "12",
      "11"
    ],
    "reponse": 2
  },
  {
    "id": "q0134",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Cuba",
      "Nigeria",
      "Malaisie",
      "Congo"
    ],
    "reponse": 3
  },
  {
    "id": "q0135",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sc » ?",
    "options": [
      "Scandium",
      "Calcium",
      "Hélium",
      "Phosphore"
    ],
    "reponse": 0
  },
  {
    "id": "q0136",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 197 - 100 ?",
    "options": [
      "97",
      "100",
      "98",
      "96"
    ],
    "reponse": 0
  },
  {
    "id": "q0137",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1750 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "17e siècle",
      "19e siècle",
      "18e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0138",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quelle est la durée de vie moyenne d'un papillon monarque adulte ?",
    "options": [
      "Quelques semaines (sauf la génération migratrice)",
      "Une journée",
      "Un mois exactement",
      "Plusieurs années"
    ],
    "reponse": 0
  },
  {
    "id": "q0139",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Nigeria ?",
    "options": [
      "Luanda",
      "Abuja",
      "Singapour",
      "Port Moresby"
    ],
    "reponse": 1
  },
  {
    "id": "q0140",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Trois Mousquetaires » ?",
    "options": [
      "Victor Hugo",
      "Prosper Mérimée",
      "Alexandre Dumas",
      "Théophile Gautier"
    ],
    "reponse": 2
  },
  {
    "id": "q0141",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Émirats arabes unis ?",
    "options": [
      "Nairobi",
      "Chisinau",
      "Abou Dabi",
      "Zagreb"
    ],
    "reponse": 2
  },
  {
    "id": "q0142",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock britannique a sorti l'album « The Dark Side of the Moon » ?",
    "options": [
      "Pink Floyd",
      "King Crimson",
      "Genesis",
      "Yes"
    ],
    "reponse": 0
  },
  {
    "id": "q0143",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "En quelle année Adolf Hitler est-il devenu chancelier d'Allemagne ?",
    "options": [
      "1929",
      "1933",
      "1936",
      "1939"
    ],
    "reponse": 1
  },
  {
    "id": "q0144",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Bosnie-Herzégovine ?",
    "options": [
      "Nouakchott",
      "Damas",
      "Sarajevo",
      "Lomé"
    ],
    "reponse": 2
  },
  {
    "id": "q0145",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 81 ?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "reponse": 2
  },
  {
    "id": "q0146",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le nom du plus grand récif corallien du monde, situé en Australie ?",
    "options": [
      "La Grande Barrière de corail",
      "Le récif de Belize",
      "Le récif de la mer Rouge",
      "L'atoll de Bikini"
    ],
    "reponse": 0
  },
  {
    "id": "q0147",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-au-Prince est la capitale de quel pays ?",
    "options": [
      "Grèce",
      "Mexique",
      "Haïti",
      "Turquie"
    ],
    "reponse": 2
  },
  {
    "id": "q0148",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style musical et culturel est né à La Nouvelle-Orléans au début du XXe siècle ?",
    "options": [
      "Le blues",
      "Le jazz",
      "Le gospel",
      "Le ragtime"
    ],
    "reponse": 1
  },
  {
    "id": "q0149",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel détroit sépare l'Asie de l'Amérique du Nord ?",
    "options": [
      "Le détroit de Gibraltar",
      "Le détroit de Cook",
      "Le détroit de Béring",
      "Le détroit de Malacca"
    ],
    "reponse": 2
  },
  {
    "id": "q0150",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Corée du Sud ?",
    "options": [
      "🇰🇷",
      "🇧🇪",
      "🇷🇼",
      "🇬🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q0151",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle entreprise a créé la licence de jeux vidéo « Mario » ?",
    "options": [
      "Nintendo",
      "Capcom",
      "Sony",
      "Sega"
    ],
    "reponse": 0
  },
  {
    "id": "q0152",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2358 en chiffres romains ?",
    "options": [
      "MMCCCLXVIII",
      "MMCCCLVIII",
      "MMCCCLXIII",
      "MMCCCLVII"
    ],
    "reponse": 1
  },
  {
    "id": "q0153",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel musée parisien, ancienne gare, expose des œuvres impressionnistes comme celles de Monet et Van Gogh ?",
    "options": [
      "Le musée d'Orsay",
      "Le musée du Louvre",
      "Le Centre Pompidou",
      "Le musée Rodin"
    ],
    "reponse": 0
  },
  {
    "id": "q0154",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Corée du Sud ?",
    "options": [
      "Ariary",
      "Leu moldave",
      "Riyal saoudien",
      "Won sud-coréen"
    ],
    "reponse": 3
  },
  {
    "id": "q0155",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Macédoine du Nord ?",
    "options": [
      "Colon costaricain",
      "Denar macédonien",
      "Dollar jamaïcain",
      "Bolivar"
    ],
    "reponse": 1
  },
  {
    "id": "q0156",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du plus grand oiseau terrestre, incapable de voler ?",
    "options": [
      "L'autruche",
      "Le kiwi",
      "L'émeu",
      "Le casoar"
    ],
    "reponse": 0
  },
  {
    "id": "q0157",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 781 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "8e siècle",
      "7e siècle",
      "9e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0158",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Suède",
      "Zimbabwe",
      "Hongrie",
      "Mali"
    ],
    "reponse": 0
  },
  {
    "id": "q0159",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bangladesh ?",
    "options": [
      "Dacca",
      "Bucarest",
      "Tirana",
      "Suva"
    ],
    "reponse": 0
  },
  {
    "id": "q0160",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Béryllium ?",
    "options": [
      "Ru",
      "Be",
      "Ga",
      "Sc"
    ],
    "reponse": 1
  },
  {
    "id": "q0161",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 347 - 236 ?",
    "options": [
      "111",
      "109",
      "113",
      "114"
    ],
    "reponse": 0
  },
  {
    "id": "q0162",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quelle plante carnivore referme ses feuilles pour piéger les insectes ?",
    "options": [
      "La sarracénie uniquement",
      "L'orchidée",
      "Le nénuphar",
      "La dionée attrape-mouche"
    ],
    "reponse": 3
  },
  {
    "id": "q0163",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Islande ?",
    "options": [
      "Couronne islandaise",
      "Peso mexicain",
      "Couronne norvégienne",
      "Rial iranien"
    ],
    "reponse": 0
  },
  {
    "id": "q0164",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1619 appartient à quel siècle ?",
    "options": [
      "17e siècle",
      "15e siècle",
      "16e siècle",
      "18e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0165",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Nouvelle-Zélande",
      "Espagne",
      "Estonie",
      "Mozambique"
    ],
    "reponse": 3
  },
  {
    "id": "q0166",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 400 ?",
    "options": [
      "17",
      "16",
      "20",
      "22"
    ],
    "reponse": 2
  },
  {
    "id": "q0167",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Lituanie ?",
    "options": [
      "Océanie",
      "Europe",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0168",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Berlin est la capitale de quel pays ?",
    "options": [
      "Émirats arabes unis",
      "Malaisie",
      "Belize",
      "Allemagne"
    ],
    "reponse": 3
  },
  {
    "id": "q0169",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Indonésie ?",
    "options": [
      "Océanie",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0170",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DLXXXIX en chiffres romains ?",
    "options": [
      "594",
      "589",
      "579",
      "584"
    ],
    "reponse": 1
  },
  {
    "id": "q0171",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du système d'exploitation mobile développé par Google ?",
    "options": [
      "iOS",
      "Android",
      "Symbian",
      "BlackBerry OS"
    ],
    "reponse": 1
  },
  {
    "id": "q0172",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Belgrade est la capitale de quel pays ?",
    "options": [
      "Norvège",
      "Guatemala",
      "Liban",
      "Serbie"
    ],
    "reponse": 3
  },
  {
    "id": "q0173",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 20 ÷ 5 ?",
    "options": [
      "3",
      "4",
      "5",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q0174",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Inde ?",
    "options": [
      "Brazzaville",
      "Budapest",
      "San José",
      "New Delhi"
    ],
    "reponse": 3
  },
  {
    "id": "q0175",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Qatar ?",
    "options": [
      "Rouble biélorusse",
      "Riyal qatari",
      "Shilling tanzanien",
      "Leu roumain"
    ],
    "reponse": 1
  },
  {
    "id": "q0176",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 166 - 165 ?",
    "options": [
      "2",
      "-2",
      "1",
      "4"
    ],
    "reponse": 2
  },
  {
    "id": "q0177",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Islande ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q0178",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel chercheur a découvert la pénicilline en 1928 ?",
    "options": [
      "Louis Pasteur",
      "Alexander Fleming",
      "Robert Koch",
      "Jonas Salk"
    ],
    "reponse": 1
  },
  {
    "id": "q0179",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de points vaut un but au football ?",
    "options": [
      "2",
      "1",
      "0",
      "3"
    ],
    "reponse": 1
  },
  {
    "id": "q0180",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur a signé « Inception » et « Interstellar » ?",
    "options": [
      "David Fincher",
      "Ridley Scott",
      "Christopher Nolan",
      "Denis Villeneuve"
    ],
    "reponse": 2
  },
  {
    "id": "q0181",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Corée du Sud ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0182",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Plomb ?",
    "options": [
      "I",
      "Pb",
      "Ar",
      "N"
    ],
    "reponse": 1
  },
  {
    "id": "q0183",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1351 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "13e siècle",
      "14e siècle",
      "12e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0184",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Al » ?",
    "options": [
      "Oxygène",
      "Iode",
      "Aluminium",
      "Palladium"
    ],
    "reponse": 2
  },
  {
    "id": "q0185",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Kenya",
      "Iran",
      "Slovaquie",
      "Émirats arabes unis"
    ],
    "reponse": 3
  },
  {
    "id": "q0186",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "En quelle année la Déclaration des droits de l'homme et du citoyen a-t-elle été adoptée en France ?",
    "options": [
      "1791",
      "1799",
      "1804",
      "1789"
    ],
    "reponse": 3
  },
  {
    "id": "q0187",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel courant artistique du début du XXe siècle, associé à Matisse, utilise des couleurs vives et non naturalistes ?",
    "options": [
      "Le fauvisme",
      "Le cubisme",
      "Le dadaïsme",
      "Le pointillisme"
    ],
    "reponse": 0
  },
  {
    "id": "q0188",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Chisinau est la capitale de quel pays ?",
    "options": [
      "Royaume-Uni",
      "Cuba",
      "Sénégal",
      "Moldavie"
    ],
    "reponse": 3
  },
  {
    "id": "q0189",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Kazakhstan",
      "Syrie",
      "Islande",
      "Azerbaïdjan"
    ],
    "reponse": 1
  },
  {
    "id": "q0190",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Luxembourg ?",
    "options": [
      "🇻🇪",
      "🇹🇬",
      "🇪🇹",
      "🇱🇺"
    ],
    "reponse": 3
  },
  {
    "id": "q0191",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cérium ?",
    "options": [
      "Ce",
      "La",
      "Sb",
      "Bi"
    ],
    "reponse": 0
  },
  {
    "id": "q0192",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Monténégro",
      "Burkina Faso",
      "Algérie",
      "Colombie"
    ],
    "reponse": 3
  },
  {
    "id": "q0193",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Géorgie",
      "Libye",
      "Malaisie",
      "Vietnam"
    ],
    "reponse": 0
  },
  {
    "id": "q0194",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 au carré ?",
    "options": [
      "42",
      "34",
      "41",
      "36"
    ],
    "reponse": 3
  },
  {
    "id": "q0195",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1357 et 1422 ?",
    "options": [
      "65",
      "70",
      "69",
      "57"
    ],
    "reponse": 0
  },
  {
    "id": "q0196",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1529 et 1734 ?",
    "options": [
      "205",
      "224",
      "202",
      "187"
    ],
    "reponse": 0
  },
  {
    "id": "q0197",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Iode ?",
    "options": [
      "Xe",
      "Sr",
      "C",
      "I"
    ],
    "reponse": 3
  },
  {
    "id": "q0198",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le point culminant d'Afrique ?",
    "options": [
      "Le Kilimandjaro",
      "Le mont Kenya",
      "Le mont Cameroun",
      "Les Drakensberg"
    ],
    "reponse": 0
  },
  {
    "id": "q0199",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Khartoum est la capitale de quel pays ?",
    "options": [
      "Soudan",
      "Angola",
      "Guatemala",
      "Rwanda"
    ],
    "reponse": 0
  },
  {
    "id": "q0200",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 519 - 105 ?",
    "options": [
      "412",
      "414",
      "413",
      "415"
    ],
    "reponse": 1
  },
  {
    "id": "q0201",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 638 - 296 ?",
    "options": [
      "343",
      "345",
      "342",
      "340"
    ],
    "reponse": 2
  },
  {
    "id": "q0202",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel courant artistique du début du XXe siècle, mené par Picasso et Braque, décompose les formes en volumes géométriques ?",
    "options": [
      "L'expressionnisme",
      "Le fauvisme",
      "Le cubisme",
      "Le futurisme"
    ],
    "reponse": 2
  },
  {
    "id": "q0203",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCDXV en chiffres romains ?",
    "options": [
      "3413",
      "3417",
      "3405",
      "3415"
    ],
    "reponse": 3
  },
  {
    "id": "q0204",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Nickel ?",
    "options": [
      "Pd",
      "Ni",
      "Po",
      "Ne"
    ],
    "reponse": 1
  },
  {
    "id": "q0205",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCMXXXVIII en chiffres romains ?",
    "options": [
      "3933",
      "3948",
      "3939",
      "3938"
    ],
    "reponse": 3
  },
  {
    "id": "q0206",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Zimbabwe ?",
    "options": [
      "Won nord-coréen",
      "Dollar zimbabwéen",
      "Sol péruvien",
      "Franc suisse"
    ],
    "reponse": 1
  },
  {
    "id": "q0207",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui est l'auteur de la saga « Harry Potter » ?",
    "options": [
      "Rick Riordan",
      "Roald Dahl",
      "C.S. Lewis",
      "J.K. Rowling"
    ],
    "reponse": 3
  },
  {
    "id": "q0208",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1013 et 1280 ?",
    "options": [
      "267",
      "248",
      "255",
      "238"
    ],
    "reponse": 0
  },
  {
    "id": "q0209",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCXXIV en chiffres romains ?",
    "options": [
      "3723",
      "3729",
      "3719",
      "3724"
    ],
    "reponse": 3
  },
  {
    "id": "q0210",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 213 + 427 ?",
    "options": [
      "642",
      "640",
      "637",
      "643"
    ],
    "reponse": 1
  },
  {
    "id": "q0211",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 900 année(s) ?",
    "options": [
      "8",
      "12",
      "9",
      "7"
    ],
    "reponse": 2
  },
  {
    "id": "q0212",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est l'animal terrestre le plus rapide sur de courtes distances ?",
    "options": [
      "Le guépard",
      "Le lévrier",
      "Le lion",
      "L'antilope"
    ],
    "reponse": 0
  },
  {
    "id": "q0213",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument à cordes se joue avec un archet et se tient sous le menton ?",
    "options": [
      "Le violoncelle",
      "L'alto",
      "Le violon",
      "La contrebasse"
    ],
    "reponse": 2
  },
  {
    "id": "q0214",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal africain vit en troupeaux et est connu pour sa grande migration annuelle au Serengeti ?",
    "options": [
      "Le gnou",
      "Le zèbre",
      "La gazelle",
      "L'antilope"
    ],
    "reponse": 0
  },
  {
    "id": "q0215",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Tungstène ?",
    "options": [
      "Te",
      "Zn",
      "Fe",
      "W"
    ],
    "reponse": 3
  },
  {
    "id": "q0216",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cd » ?",
    "options": [
      "Gallium",
      "Indium",
      "Cadmium",
      "Thorium"
    ],
    "reponse": 2
  },
  {
    "id": "q0217",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1890 et 2003 ?",
    "options": [
      "106",
      "112",
      "113",
      "120"
    ],
    "reponse": 2
  },
  {
    "id": "q0218",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kenya ?",
    "options": [
      "Dinar jordanien",
      "Shilling kényan",
      "Couronne norvégienne",
      "Hryvnia"
    ],
    "reponse": 1
  },
  {
    "id": "q0219",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « RAM » ?",
    "options": [
      "Rapid Access Module",
      "Run Access Memory",
      "Read Access Memory",
      "Random Access Memory"
    ],
    "reponse": 3
  },
  {
    "id": "q0220",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné Jack Sparrow dans « Pirates des Caraïbes » ?",
    "options": [
      "Geoffrey Rush",
      "Johnny Depp",
      "Javier Bardem",
      "Orlando Bloom"
    ],
    "reponse": 1
  },
  {
    "id": "q0221",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Albanie",
      "Bosnie-Herzégovine",
      "Italie",
      "Lettonie"
    ],
    "reponse": 1
  },
  {
    "id": "q0222",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel compositeur a écrit la célèbre « Cinquième Symphonie » qui commence par « ta-ta-ta-taaa » ?",
    "options": [
      "Franz Joseph Haydn",
      "Wolfgang Amadeus Mozart",
      "Johann Sebastian Bach",
      "Ludwig van Beethoven"
    ],
    "reponse": 3
  },
  {
    "id": "q0223",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1337 et 1410 ?",
    "options": [
      "66",
      "73",
      "79",
      "67"
    ],
    "reponse": 1
  },
  {
    "id": "q0224",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Sénégal ?",
    "options": [
      "Rial iranien",
      "Franc CFA",
      "Shilling kényan",
      "Denar macédonien"
    ],
    "reponse": 1
  },
  {
    "id": "q0225",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Jordanie ?",
    "options": [
      "Brasilia",
      "Tallinn",
      "Amman",
      "Maputo"
    ],
    "reponse": 2
  },
  {
    "id": "q0226",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle plaine fertile, souvent appelée « grenier à blé », s'étend entre le Tigre et l'Euphrate ?",
    "options": [
      "Le Levant",
      "La Mésopotamie",
      "L'Anatolie",
      "Le Sinaï"
    ],
    "reponse": 1
  },
  {
    "id": "q0227",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Vingt mille lieues sous les mers » ?",
    "options": [
      "Victor Hugo",
      "Jules Verne",
      "H.G. Wells",
      "Alexandre Dumas"
    ],
    "reponse": 1
  },
  {
    "id": "q0228",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DXXXVIII en chiffres romains ?",
    "options": [
      "533",
      "538",
      "539",
      "537"
    ],
    "reponse": 1
  },
  {
    "id": "q0229",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est capable de régénérer un membre perdu, comme sa queue ?",
    "options": [
      "La tortue",
      "Le serpent",
      "Le crocodile",
      "Le lézard"
    ],
    "reponse": 3
  },
  {
    "id": "q0230",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Yémen ?",
    "options": [
      "🇾🇪",
      "🇧🇾",
      "🇮🇳",
      "🇸🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q0231",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel arbre gigantesque relie les neuf mondes dans la mythologie nordique ?",
    "options": [
      "Yggdrasil",
      "Le Frêne d'Odin",
      "L'Arbre de vie",
      "Le Chêne sacré"
    ],
    "reponse": 0
  },
  {
    "id": "q0232",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 184 ÷ 8 ?",
    "options": [
      "23",
      "19",
      "21",
      "24"
    ],
    "reponse": 0
  },
  {
    "id": "q0233",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1449 et 1583 ?",
    "options": [
      "127",
      "134",
      "137",
      "111"
    ],
    "reponse": 1
  },
  {
    "id": "q0234",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale asiatique est construite sur plusieurs deltas et canaux, surnommée la « Venise de l'Orient » ?",
    "options": [
      "Hanoï",
      "Manille",
      "Jakarta",
      "Bangkok"
    ],
    "reponse": 3
  },
  {
    "id": "q0235",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « 1984 » et « La Ferme des animaux » ?",
    "options": [
      "George Orwell",
      "H.G. Wells",
      "Ray Bradbury",
      "Aldous Huxley"
    ],
    "reponse": 0
  },
  {
    "id": "q0236",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle déesse grecque est associée à la sagesse et est née de la tête de Zeus ?",
    "options": [
      "Aphrodite",
      "Artémis",
      "Athéna",
      "Héra"
    ],
    "reponse": 2
  },
  {
    "id": "q0237",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Singapour ?",
    "options": [
      "🇭🇹",
      "🇵🇭",
      "🇩🇿",
      "🇸🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q0238",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie « Wi-Fi » désigne quel type de connexion ?",
    "options": [
      "Une connexion réseau sans fil",
      "Un langage de programmation",
      "Une connexion filaire",
      "Un protocole de messagerie"
    ],
    "reponse": 0
  },
  {
    "id": "q0239",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 9 h ?",
    "options": [
      "32400",
      "31042",
      "27861",
      "34432"
    ],
    "reponse": 0
  },
  {
    "id": "q0240",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Dans quel film culte Leonardo DiCaprio joue-t-il un personnage nommé Jack Dawson ?",
    "options": [
      "Gatsby le Magnifique",
      "Inception",
      "Le Loup de Wall Street",
      "Titanic"
    ],
    "reponse": 3
  },
  {
    "id": "q0241",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vientiane est la capitale de quel pays ?",
    "options": [
      "Indonésie",
      "Fidji",
      "El Salvador",
      "Laos"
    ],
    "reponse": 3
  },
  {
    "id": "q0242",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle déesse égyptienne, souvent représentée avec une tête de chat, protège le foyer ?",
    "options": [
      "Sekhmet",
      "Isis",
      "Hathor",
      "Bastet"
    ],
    "reponse": 3
  },
  {
    "id": "q0243",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom de code de la société mère de Google depuis 2015 ?",
    "options": [
      "ByteDance",
      "Meta",
      "Berkshire",
      "Alphabet"
    ],
    "reponse": 3
  },
  {
    "id": "q0244",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Turquie ?",
    "options": [
      "🇲🇰",
      "🇹🇷",
      "🇳🇪",
      "🇪🇬"
    ],
    "reponse": 1
  },
  {
    "id": "q0245",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Pyongyang est la capitale de quel pays ?",
    "options": [
      "Russie",
      "Suisse",
      "Bénin",
      "Corée du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0246",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 21 au carré ?",
    "options": [
      "422",
      "441",
      "388",
      "469"
    ],
    "reponse": 1
  },
  {
    "id": "q0247",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock irlandais a pour chanteur Bono ?",
    "options": [
      "U2",
      "The Cranberries",
      "Thin Lizzy",
      "Boyzone"
    ],
    "reponse": 0
  },
  {
    "id": "q0248",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel groupe a sorti l'album culte « Rumours » en 1977 ?",
    "options": [
      "Eagles",
      "Fleetwood Mac",
      "Toto",
      "Chicago"
    ],
    "reponse": 1
  },
  {
    "id": "q0249",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Laos",
      "Paraguay",
      "Suisse",
      "Uruguay"
    ],
    "reponse": 2
  },
  {
    "id": "q0250",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète est surnommée la « planète rouge » ?",
    "options": [
      "Mars",
      "Mercure",
      "Vénus",
      "Jupiter"
    ],
    "reponse": 0
  },
  {
    "id": "q0251",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Malte",
      "Canada",
      "Burkina Faso"
    ],
    "reponse": 2
  },
  {
    "id": "q0252",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse grecque du foyer est la sœur de Zeus, discrète mais très respectée ?",
    "options": [
      "Déméter",
      "Thémis",
      "Hestia",
      "Héra"
    ],
    "reponse": 2
  },
  {
    "id": "q0253",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des États-Unis ?",
    "options": [
      "Baht",
      "Dollar américain",
      "Vatu",
      "Denar macédonien"
    ],
    "reponse": 1
  },
  {
    "id": "q0254",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Fahrenheit 451 » ?",
    "options": [
      "Philip K. Dick",
      "Isaac Asimov",
      "Ray Bradbury",
      "Arthur C. Clarke"
    ],
    "reponse": 2
  },
  {
    "id": "q0255",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 940 - 482 ?",
    "options": [
      "457",
      "458",
      "459",
      "460"
    ],
    "reponse": 1
  },
  {
    "id": "q0256",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur français est connu pour la chanson « Ne me quitte pas » ?",
    "options": [
      "Charles Aznavour",
      "Léo Ferré",
      "Jacques Brel",
      "Georges Brassens"
    ],
    "reponse": 2
  },
  {
    "id": "q0257",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Indium ?",
    "options": [
      "O",
      "In",
      "Se",
      "H"
    ],
    "reponse": 1
  },
  {
    "id": "q0258",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Botswana",
      "République dominicaine",
      "Équateur",
      "Jamaïque"
    ],
    "reponse": 3
  },
  {
    "id": "q0259",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 6 t ?",
    "options": [
      "7001",
      "5451",
      "6303",
      "6000"
    ],
    "reponse": 3
  },
  {
    "id": "q0260",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 154 jour(s) ?",
    "options": [
      "22",
      "23",
      "21",
      "27"
    ],
    "reponse": 0
  },
  {
    "id": "q0261",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Guatemala ?",
    "options": [
      "🇲🇦",
      "🇹🇷",
      "🇬🇹",
      "🇪🇨"
    ],
    "reponse": 2
  },
  {
    "id": "q0262",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 100 ?",
    "options": [
      "15",
      "13",
      "18",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q0263",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain irlandais a écrit « Ulysse », roman majeur du XXe siècle ?",
    "options": [
      "Samuel Beckett",
      "Oscar Wilde",
      "James Joyce",
      "George Bernard Shaw"
    ],
    "reponse": 2
  },
  {
    "id": "q0264",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDXCIX en chiffres romains ?",
    "options": [
      "1599",
      "1601",
      "1589",
      "1598"
    ],
    "reponse": 0
  },
  {
    "id": "q0265",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Canberra est la capitale de quel pays ?",
    "options": [
      "Australie",
      "République tchèque",
      "Danemark",
      "Yémen"
    ],
    "reponse": 0
  },
  {
    "id": "q0266",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 609 + 849 ?",
    "options": [
      "1459",
      "1457",
      "1460",
      "1458"
    ],
    "reponse": 3
  },
  {
    "id": "q0267",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel savant a énoncé les trois lois du mouvement en physique classique ?",
    "options": [
      "Galilée",
      "Albert Einstein",
      "Blaise Pascal",
      "Isaac Newton"
    ],
    "reponse": 3
  },
  {
    "id": "q0268",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel peuple a envahi Rome et provoqué la chute de l'Empire romain d'Occident ?",
    "options": [
      "Les Ottomans",
      "Les Perses",
      "Les Mongols",
      "Les peuples germaniques"
    ],
    "reponse": 3
  },
  {
    "id": "q0269",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1358 et 1618 ?",
    "options": [
      "260",
      "301",
      "222",
      "263"
    ],
    "reponse": 0
  },
  {
    "id": "q0270",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCLXXXII en chiffres romains ?",
    "options": [
      "3377",
      "3382",
      "3384",
      "3387"
    ],
    "reponse": 1
  },
  {
    "id": "q0271",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1337 appartient à quel siècle ?",
    "options": [
      "12e siècle",
      "13e siècle",
      "15e siècle",
      "14e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0272",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 214 + 735 ?",
    "options": [
      "949",
      "951",
      "950",
      "947"
    ],
    "reponse": 0
  },
  {
    "id": "q0273",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est composé de plus de 17 000 îles en Asie du Sud-Est ?",
    "options": [
      "Les Philippines",
      "La Thaïlande",
      "La Malaisie",
      "L'Indonésie"
    ],
    "reponse": 3
  },
  {
    "id": "q0274",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la triade principale des dieux dans l'hindouisme, création, préservation et destruction ?",
    "options": [
      "Indra, Agni et Varuna",
      "Ganesh, Durga et Kali",
      "Brahma, Vishnou et Shiva",
      "Rama, Krishna et Hanuman"
    ],
    "reponse": 2
  },
  {
    "id": "q0275",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel port américain a été attaqué par le Japon en 1941 ?",
    "options": [
      "San Francisco",
      "Honolulu",
      "Pearl Harbor",
      "San Diego"
    ],
    "reponse": 2
  },
  {
    "id": "q0276",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 9 ?",
    "options": [
      "39",
      "46",
      "47",
      "45"
    ],
    "reponse": 3
  },
  {
    "id": "q0277",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 500 ?",
    "options": [
      "22",
      "21",
      "25",
      "27"
    ],
    "reponse": 2
  },
  {
    "id": "q0278",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1432 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "13e siècle",
      "16e siècle",
      "14e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0279",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de Liverpool est composé de John Lennon, Paul McCartney, George Harrison et Ringo Starr ?",
    "options": [
      "The Hollies",
      "Herman's Hermits",
      "The Beatles",
      "The Kinks"
    ],
    "reponse": 2
  },
  {
    "id": "q0280",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu grec des songes est le fils d'Hypnos, dieu du sommeil ?",
    "options": [
      "Zéphyr",
      "Éros",
      "Morphée",
      "Thanatos"
    ],
    "reponse": 2
  },
  {
    "id": "q0281",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3185 en chiffres romains ?",
    "options": [
      "MMMCLXXXIV",
      "MMMCLXXV",
      "MMMCLXXXVI",
      "MMMCLXXXV"
    ],
    "reponse": 3
  },
  {
    "id": "q0282",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 au carré ?",
    "options": [
      "303",
      "289",
      "266",
      "262"
    ],
    "reponse": 1
  },
  {
    "id": "q0283",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ukraine ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q0284",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tegucigalpa est la capitale de quel pays ?",
    "options": [
      "Royaume-Uni",
      "Malaisie",
      "Kazakhstan",
      "Honduras"
    ],
    "reponse": 3
  },
  {
    "id": "q0285",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 234 - 90 ?",
    "options": [
      "145",
      "143",
      "144",
      "141"
    ],
    "reponse": 2
  },
  {
    "id": "q0286",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a créé l'iPhone ?",
    "options": [
      "Microsoft",
      "Google",
      "Samsung",
      "Apple"
    ],
    "reponse": 3
  },
  {
    "id": "q0287",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète et romancier français a écrit « Le Grand Meaulnes » ?",
    "options": [
      "François Mauriac",
      "Marcel Proust",
      "Alain-Fournier",
      "André Gide"
    ],
    "reponse": 2
  },
  {
    "id": "q0288",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 × 12 ?",
    "options": [
      "51",
      "54",
      "48",
      "42"
    ],
    "reponse": 2
  },
  {
    "id": "q0289",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal produit de la soie pour tisser sa toile ?",
    "options": [
      "Le scarabée",
      "Les deux (araignée et ver à soie)",
      "Le ver à soie",
      "L'araignée"
    ],
    "reponse": 3
  },
  {
    "id": "q0290",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 1140 min ?",
    "options": [
      "19",
      "22",
      "17",
      "18"
    ],
    "reponse": 0
  },
  {
    "id": "q0291",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 468 - 225 ?",
    "options": [
      "240",
      "243",
      "245",
      "241"
    ],
    "reponse": 1
  },
  {
    "id": "q0292",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo d'aventure met en scène un archéologue nommé Lara Croft ?",
    "options": [
      "Prince of Persia",
      "Uncharted",
      "Indiana Jones",
      "Tomb Raider"
    ],
    "reponse": 3
  },
  {
    "id": "q0293",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXLIII en chiffres romains ?",
    "options": [
      "3243",
      "3245",
      "3253",
      "3233"
    ],
    "reponse": 0
  },
  {
    "id": "q0294",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz rend les bulles du soda pétillantes ?",
    "options": [
      "L'hydrogène",
      "L'azote",
      "L'oxygène",
      "Le dioxyde de carbone"
    ],
    "reponse": 3
  },
  {
    "id": "q0295",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Italie ?",
    "options": [
      "Europe",
      "Océanie",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0296",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Madame Bovary » ?",
    "options": [
      "Guy de Maupassant",
      "Honoré de Balzac",
      "Gustave Flaubert",
      "Émile Zola"
    ],
    "reponse": 2
  },
  {
    "id": "q0297",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 80 ?",
    "options": [
      "2",
      "6",
      "1",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q0298",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 27 au carré ?",
    "options": [
      "729",
      "642",
      "801",
      "768"
    ],
    "reponse": 0
  },
  {
    "id": "q0299",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 au carré ?",
    "options": [
      "830",
      "828",
      "832",
      "900"
    ],
    "reponse": 3
  },
  {
    "id": "q0300",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cu » ?",
    "options": [
      "Nickel",
      "Cuivre",
      "Néon",
      "Zinc"
    ],
    "reponse": 1
  },
  {
    "id": "q0301",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 395 appartient à quel siècle ?",
    "options": [
      "5e siècle",
      "4e siècle",
      "3e siècle",
      "2e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0302",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 250 ?",
    "options": [
      "150",
      "169",
      "163",
      "135"
    ],
    "reponse": 0
  },
  {
    "id": "q0303",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur français a signé « Amélie Poulain » ?",
    "options": [
      "Luc Besson",
      "François Ozon",
      "Jean-Pierre Jeunet",
      "Michel Gondry"
    ],
    "reponse": 2
  },
  {
    "id": "q0304",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne le Dr Indiana Jones ?",
    "options": [
      "Harrison Ford",
      "Michael Douglas",
      "Tom Selleck",
      "Kurt Russell"
    ],
    "reponse": 0
  },
  {
    "id": "q0305",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 20 ?",
    "options": [
      "2",
      "1",
      "-1",
      "0"
    ],
    "reponse": 0
  },
  {
    "id": "q0306",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Irlande ?",
    "options": [
      "🇱🇹",
      "🇮🇪",
      "🇸🇩",
      "🇦🇫"
    ],
    "reponse": 1
  },
  {
    "id": "q0307",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Qatar",
      "Nigeria",
      "Argentine",
      "Arabie saoudite"
    ],
    "reponse": 3
  },
  {
    "id": "q0308",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien suprême est associé au soleil et considéré comme le créateur du monde ?",
    "options": [
      "Amon",
      "Ptah",
      "Osiris",
      "Rê"
    ],
    "reponse": 3
  },
  {
    "id": "q0309",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien à tête d'ibis est associé à l'écriture et à la sagesse ?",
    "options": [
      "Horus",
      "Anubis",
      "Khnoum",
      "Thot"
    ],
    "reponse": 3
  },
  {
    "id": "q0310",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bulgarie ?",
    "options": [
      "Asie",
      "Océanie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0311",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est l'organe qui pompe le sang dans le corps humain ?",
    "options": [
      "Le cœur",
      "Le poumon",
      "Le foie",
      "Le rein"
    ],
    "reponse": 0
  },
  {
    "id": "q0312",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport utilise-t-on le terme « smash » pour un coup offensif puissant ?",
    "options": [
      "Le tennis et le badminton",
      "Le tennis uniquement",
      "Le volley-ball uniquement",
      "Le squash uniquement"
    ],
    "reponse": 0
  },
  {
    "id": "q0313",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays a la plus grande superficie du monde ?",
    "options": [
      "Les États-Unis",
      "La Chine",
      "Le Canada",
      "La Russie"
    ],
    "reponse": 3
  },
  {
    "id": "q0314",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel chef gaulois s'est rendu à Jules César après le siège d'Alésia ?",
    "options": [
      "Brennus",
      "Vercingétorix",
      "Ambiorix",
      "Astérix"
    ],
    "reponse": 1
  },
  {
    "id": "q0315",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur est connu pour « Amadeus » et « Vol au-dessus d'un nid de coucou » ?",
    "options": [
      "Stanley Kubrick",
      "Roman Polanski",
      "Sidney Pollack",
      "Milos Forman"
    ],
    "reponse": 3
  },
  {
    "id": "q0316",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 180 mois ?",
    "options": [
      "12",
      "16",
      "15",
      "17"
    ],
    "reponse": 2
  },
  {
    "id": "q0317",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pu » ?",
    "options": [
      "Plutonium",
      "Ruthénium",
      "Fer",
      "Argent"
    ],
    "reponse": 0
  },
  {
    "id": "q0318",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel roi de France est surnommé le « Roi Soleil » ?",
    "options": [
      "Louis XV",
      "Louis XIV",
      "Henri IV",
      "Louis XIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0319",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Roumanie",
      "États-Unis",
      "Espagne",
      "Danemark"
    ],
    "reponse": 0
  },
  {
    "id": "q0320",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Portugal ?",
    "options": [
      "Phnom Penh",
      "Lisbonne",
      "Paris",
      "Guatemala"
    ],
    "reponse": 1
  },
  {
    "id": "q0321",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Brésil ?",
    "options": [
      "🇸🇩",
      "🇬🇾",
      "🇹🇿",
      "🇧🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q0322",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 228 ÷ 12 ?",
    "options": [
      "22",
      "20",
      "19",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q0323",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Conakry est la capitale de quel pays ?",
    "options": [
      "Guinée",
      "République tchèque",
      "Moldavie",
      "Niger"
    ],
    "reponse": 0
  },
  {
    "id": "q0324",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Éthiopie ?",
    "options": [
      "Tenge",
      "Cordoba",
      "Birr",
      "Real brésilien"
    ],
    "reponse": 2
  },
  {
    "id": "q0325",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Jordanie ?",
    "options": [
      "Riyal saoudien",
      "Kina",
      "Peso mexicain",
      "Dinar jordanien"
    ],
    "reponse": 3
  },
  {
    "id": "q0326",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 84 ÷ 4 ?",
    "options": [
      "24",
      "22",
      "21",
      "20"
    ],
    "reponse": 2
  },
  {
    "id": "q0327",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Qui a cofondé Instagram avec Mike Krieger en 2010 ?",
    "options": [
      "Jack Dorsey",
      "Kevin Systrom",
      "Tom Anderson",
      "Evan Spiegel"
    ],
    "reponse": 1
  },
  {
    "id": "q0328",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mozambique ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0329",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de m dans 13 km ?",
    "options": [
      "10883",
      "13342",
      "13341",
      "13000"
    ],
    "reponse": 3
  },
  {
    "id": "q0330",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Guinée ?",
    "options": [
      "🇨🇩",
      "🇳🇿",
      "🇸🇪",
      "🇬🇳"
    ],
    "reponse": 3
  },
  {
    "id": "q0331",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Gabon ?",
    "options": [
      "Paramaribo",
      "Addis-Abeba",
      "Lomé",
      "Libreville"
    ],
    "reponse": 3
  },
  {
    "id": "q0332",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1032 en chiffres romains ?",
    "options": [
      "MXXXII",
      "MXXXI",
      "MXXXVII",
      "MXXXIII"
    ],
    "reponse": 0
  },
  {
    "id": "q0333",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 12 année(s) ?",
    "options": [
      "159",
      "144",
      "151",
      "134"
    ],
    "reponse": 1
  },
  {
    "id": "q0334",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Angola",
      "Myanmar",
      "Cambodge",
      "Pays-Bas"
    ],
    "reponse": 0
  },
  {
    "id": "q0335",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 36 mois ?",
    "options": [
      "6",
      "3",
      "1",
      "4"
    ],
    "reponse": 1
  },
  {
    "id": "q0336",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a mis en scène « Le Fabuleux Destin d'Amélie Poulain » et « Alien, la résurrection » ?",
    "options": [
      "Léos Carax",
      "Marc Caro",
      "Jean-Pierre Jeunet",
      "Luc Besson"
    ],
    "reponse": 2
  },
  {
    "id": "q0337",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Bi » ?",
    "options": [
      "Molybdène",
      "Bismuth",
      "Potassium",
      "Technétium"
    ],
    "reponse": 1
  },
  {
    "id": "q0338",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3856 en chiffres romains ?",
    "options": [
      "MMMDCCCLXI",
      "MMMDCCCLVI",
      "MMMDCCCXLVI",
      "MMMDCCCLVII"
    ],
    "reponse": 1
  },
  {
    "id": "q0339",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2388 en chiffres romains ?",
    "options": [
      "MMCCCLXXXVI",
      "MMCCCLXXXIX",
      "MMCCCLXXXVIII",
      "MMCCCXCVIII"
    ],
    "reponse": 2
  },
  {
    "id": "q0340",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Bore ?",
    "options": [
      "Pt",
      "Nb",
      "B",
      "Rb"
    ],
    "reponse": 2
  },
  {
    "id": "q0341",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Afghanistan",
      "Serbie",
      "Belize",
      "Chypre"
    ],
    "reponse": 1
  },
  {
    "id": "q0342",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 131 + 344 ?",
    "options": [
      "473",
      "475",
      "472",
      "474"
    ],
    "reponse": 1
  },
  {
    "id": "q0343",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 19 ?",
    "options": [
      "107",
      "101",
      "98",
      "95"
    ],
    "reponse": 3
  },
  {
    "id": "q0344",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 15 au carré ?",
    "options": [
      "241",
      "218",
      "225",
      "245"
    ],
    "reponse": 2
  },
  {
    "id": "q0345",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs y a-t-il dans une équipe de cricket ?",
    "options": [
      "10",
      "11",
      "12",
      "9"
    ],
    "reponse": 1
  },
  {
    "id": "q0346",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Pérou",
      "Guinée",
      "Suisse",
      "Italie"
    ],
    "reponse": 0
  },
  {
    "id": "q0347",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 649 + 781 ?",
    "options": [
      "1431",
      "1433",
      "1429",
      "1430"
    ],
    "reponse": 3
  },
  {
    "id": "q0348",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Varsovie est la capitale de quel pays ?",
    "options": [
      "Pologne",
      "Ghana",
      "Chili",
      "Pays-Bas"
    ],
    "reponse": 0
  },
  {
    "id": "q0349",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Venezuela ?",
    "options": [
      "Peso philippin",
      "Bolivar",
      "Real brésilien",
      "Cedi"
    ],
    "reponse": 1
  },
  {
    "id": "q0350",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Équateur ?",
    "options": [
      "Luxembourg",
      "Lisbonne",
      "Damas",
      "Quito"
    ],
    "reponse": 3
  },
  {
    "id": "q0351",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Japon ?",
    "options": [
      "🇿🇲",
      "🇵🇦",
      "🇸🇪",
      "🇯🇵"
    ],
    "reponse": 3
  },
  {
    "id": "q0352",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien de chromosomes possède une cellule humaine normale ?",
    "options": [
      "44",
      "46",
      "48",
      "23"
    ],
    "reponse": 1
  },
  {
    "id": "q0353",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse québécoise interprète « My Heart Will Go On », thème du film Titanic ?",
    "options": [
      "Céline Dion",
      "Shania Twain",
      "Avril Lavigne",
      "Alanis Morissette"
    ],
    "reponse": 0
  },
  {
    "id": "q0354",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se joue avec un palet sur une patinoire ?",
    "options": [
      "Le patinage artistique",
      "Le curling",
      "Le bobsleigh",
      "Le hockey sur glace"
    ],
    "reponse": 3
  },
  {
    "id": "q0355",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1541 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "15e siècle",
      "17e siècle",
      "16e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0356",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain sud-africain a reçu le prix Nobel pour « Disgrâce » ?",
    "options": [
      "Nadine Gordimer",
      "Doris Lessing",
      "Wole Soyinka",
      "J.M. Coetzee"
    ],
    "reponse": 3
  },
  {
    "id": "q0357",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Australie ?",
    "options": [
      "🇮🇷",
      "🇨🇿",
      "🇦🇺",
      "🇧🇫"
    ],
    "reponse": 2
  },
  {
    "id": "q0358",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Pérou",
      "Irlande",
      "Luxembourg",
      "Moldavie"
    ],
    "reponse": 1
  },
  {
    "id": "q0359",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays est le berceau historique du tennis moderne, avec le tournoi de Wimbledon ?",
    "options": [
      "Le Royaume-Uni",
      "La France",
      "Les États-Unis",
      "L'Australie"
    ],
    "reponse": 0
  },
  {
    "id": "q0360",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Neo dans la trilogie « Matrix » ?",
    "options": [
      "Brad Pitt",
      "Keanu Reeves",
      "Tom Cruise",
      "Will Smith"
    ],
    "reponse": 1
  },
  {
    "id": "q0361",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Monténégro ?",
    "options": [
      "🇲🇪",
      "🇳🇱",
      "🇭🇺",
      "🇮🇹"
    ],
    "reponse": 0
  },
  {
    "id": "q0362",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Japon",
      "Suisse",
      "Lituanie",
      "Azerbaïdjan"
    ],
    "reponse": 2
  },
  {
    "id": "q0363",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène une équipe qui doit faire exploser une météorite pour sauver la Terre, avec Bruce Willis ?",
    "options": [
      "Deep Impact",
      "Armageddon",
      "Le Jour d'après",
      "2012"
    ],
    "reponse": 1
  },
  {
    "id": "q0364",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel studio a produit « Toy Story », premier long-métrage entièrement en images de synthèse ?",
    "options": [
      "DreamWorks",
      "Disney",
      "Pixar",
      "Illumination"
    ],
    "reponse": 2
  },
  {
    "id": "q0365",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 800 ?",
    "options": [
      "77",
      "80",
      "71",
      "81"
    ],
    "reponse": 1
  },
  {
    "id": "q0366",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la plus petite unité de vie capable de se reproduire ?",
    "options": [
      "L'atome",
      "La cellule",
      "Le tissu",
      "La molécule"
    ],
    "reponse": 1
  },
  {
    "id": "q0367",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de rôle et d'action se déroule dans un monde médiéval sombre très difficile, créé par From Software ?",
    "options": [
      "Dark Souls",
      "The Witcher",
      "Elden Ring",
      "Bloodborne"
    ],
    "reponse": 0
  },
  {
    "id": "q0368",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Botswana ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Asie",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0369",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Radium ?",
    "options": [
      "In",
      "Y",
      "Ge",
      "Ra"
    ],
    "reponse": 3
  },
  {
    "id": "q0370",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie le sigle « HTML » ?",
    "options": [
      "High Tech Modern Language",
      "Hyperlink Text Machine Language",
      "Home Tool Markup Language",
      "HyperText Markup Language"
    ],
    "reponse": 3
  },
  {
    "id": "q0371",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXCVI en chiffres romains ?",
    "options": [
      "3294",
      "3298",
      "3296",
      "3291"
    ],
    "reponse": 2
  },
  {
    "id": "q0372",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Brésil ?",
    "options": [
      "Livre soudanaise",
      "Roupie indienne",
      "Dinar serbe",
      "Real brésilien"
    ],
    "reponse": 3
  },
  {
    "id": "q0373",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Le Rouge et le Noir » ?",
    "options": [
      "Prosper Mérimée",
      "Gustave Flaubert",
      "Honoré de Balzac",
      "Stendhal"
    ],
    "reponse": 3
  },
  {
    "id": "q0374",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 307 - 185 ?",
    "options": [
      "125",
      "122",
      "123",
      "119"
    ],
    "reponse": 1
  },
  {
    "id": "q0375",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Congo ?",
    "options": [
      "🇬🇧",
      "🇨🇬",
      "🇮🇶",
      "🇵🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q0376",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Irlande ?",
    "options": [
      "Leu moldave",
      "Euro",
      "Dollar américain",
      "Livre turque"
    ],
    "reponse": 1
  },
  {
    "id": "q0377",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 57 + 777 ?",
    "options": [
      "832",
      "834",
      "837",
      "833"
    ],
    "reponse": 1
  },
  {
    "id": "q0378",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 298 en chiffres romains ?",
    "options": [
      "CCXCVI",
      "CCXCVIII",
      "CCXCIX",
      "CCLXXXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0379",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Panama est la capitale de quel pays ?",
    "options": [
      "Panama",
      "Guinée",
      "Belgique",
      "Tunisie"
    ],
    "reponse": 0
  },
  {
    "id": "q0380",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Paris est la capitale de quel pays ?",
    "options": [
      "France",
      "Afghanistan",
      "Turquie",
      "Égypte"
    ],
    "reponse": 0
  },
  {
    "id": "q0381",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 6 ?",
    "options": [
      "108",
      "104",
      "121",
      "106"
    ],
    "reponse": 0
  },
  {
    "id": "q0382",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "San Salvador est la capitale de quel pays ?",
    "options": [
      "El Salvador",
      "Costa Rica",
      "Arménie",
      "Australie"
    ],
    "reponse": 0
  },
  {
    "id": "q0383",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMXXXIII en chiffres romains ?",
    "options": [
      "2033",
      "2043",
      "2035",
      "2028"
    ],
    "reponse": 0
  },
  {
    "id": "q0384",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 841 ?",
    "options": [
      "25",
      "29",
      "26",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q0385",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1801 et 1996 ?",
    "options": [
      "190",
      "200",
      "195",
      "225"
    ],
    "reponse": 2
  },
  {
    "id": "q0386",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série d'animation met en scène un garçon capable de se transformer en de nombreuses créatures, appelé Ben ?",
    "options": [
      "Randy Cunningham",
      "Generator Rex",
      "Ben 10",
      "Danny Phantom"
    ],
    "reponse": 2
  },
  {
    "id": "q0387",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Mauritanie ?",
    "options": [
      "Bratislava",
      "Santiago",
      "Stockholm",
      "Nouakchott"
    ],
    "reponse": 3
  },
  {
    "id": "q0388",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Brazzaville est la capitale de quel pays ?",
    "options": [
      "Philippines",
      "Autriche",
      "Arménie",
      "Congo"
    ],
    "reponse": 3
  },
  {
    "id": "q0389",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de volley-ball sur le terrain ?",
    "options": [
      "4",
      "7",
      "6",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q0390",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCXLIII en chiffres romains ?",
    "options": [
      "1138",
      "1143",
      "1144",
      "1148"
    ],
    "reponse": 1
  },
  {
    "id": "q0391",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Syrie",
      "Italie",
      "Colombie"
    ],
    "reponse": 2
  },
  {
    "id": "q0392",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « S » ?",
    "options": [
      "Zirconium",
      "Baryum",
      "Rubidium",
      "Soufre"
    ],
    "reponse": 3
  },
  {
    "id": "q0393",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lisbonne est la capitale de quel pays ?",
    "options": [
      "Kenya",
      "Myanmar",
      "Mozambique",
      "Portugal"
    ],
    "reponse": 3
  },
  {
    "id": "q0394",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur américain est surnommé « le King » du rock 'n' roll ?",
    "options": [
      "Chuck Berry",
      "Little Richard",
      "Jerry Lee Lewis",
      "Elvis Presley"
    ],
    "reponse": 3
  },
  {
    "id": "q0395",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 780 min ?",
    "options": [
      "13",
      "15",
      "14",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q0396",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 236 + 606 ?",
    "options": [
      "840",
      "841",
      "845",
      "842"
    ],
    "reponse": 3
  },
  {
    "id": "q0397",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 2000 cm ?",
    "options": [
      "20",
      "24",
      "18",
      "25"
    ],
    "reponse": 0
  },
  {
    "id": "q0398",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Madagascar ?",
    "options": [
      "🇨🇷",
      "🇲🇬",
      "🇦🇴",
      "🇲🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q0399",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 119 jour(s) ?",
    "options": [
      "21",
      "17",
      "18",
      "20"
    ],
    "reponse": 1
  },
  {
    "id": "q0400",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2042 appartient à quel siècle ?",
    "options": [
      "22e siècle",
      "19e siècle",
      "21e siècle",
      "20e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0401",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel oiseau est associé au facteur en dessin animé et vit en réalité en Antarctique ?",
    "options": [
      "La cigogne",
      "Le manchot",
      "Le pingouin arctique",
      "Le pélican"
    ],
    "reponse": 1
  },
  {
    "id": "q0402",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Arménie ?",
    "options": [
      "Asie",
      "Océanie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0403",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCXLII en chiffres romains ?",
    "options": [
      "1247",
      "1252",
      "1242",
      "1240"
    ],
    "reponse": 2
  },
  {
    "id": "q0404",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2336 en chiffres romains ?",
    "options": [
      "MMCCCXLVI",
      "MMCCCXLI",
      "MMCCCXXXIV",
      "MMCCCXXXVI"
    ],
    "reponse": 3
  },
  {
    "id": "q0405",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type d'onde est utilisé par les fours à micro-ondes ?",
    "options": [
      "Les ultraviolets",
      "Les rayons X",
      "Les micro-ondes",
      "Les infrarouges"
    ],
    "reponse": 2
  },
  {
    "id": "q0406",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de baseball sur le terrain ?",
    "options": [
      "8",
      "10",
      "9",
      "11"
    ],
    "reponse": 2
  },
  {
    "id": "q0407",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle boîte, ouverte par curiosité, a libéré tous les maux de l'humanité selon le mythe grec ?",
    "options": [
      "L'urne d'Hestia",
      "La boîte de Pandore",
      "Le coffre de Prométhée",
      "Le vase d'Héra"
    ],
    "reponse": 1
  },
  {
    "id": "q0408",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 14 ÷ 7 ?",
    "options": [
      "0",
      "1",
      "-1",
      "2"
    ],
    "reponse": 3
  },
  {
    "id": "q0409",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1370 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "13e siècle",
      "15e siècle",
      "12e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0410",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Australie",
      "Namibie",
      "Guatemala",
      "Royaume-Uni"
    ],
    "reponse": 0
  },
  {
    "id": "q0411",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Bosnie-Herzégovine ?",
    "options": [
      "Peso chilien",
      "Dinar jordanien",
      "Hryvnia",
      "Mark convertible"
    ],
    "reponse": 3
  },
  {
    "id": "q0412",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 29 min ?",
    "options": [
      "1744",
      "2020",
      "1740",
      "1627"
    ],
    "reponse": 2
  },
  {
    "id": "q0413",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport le terrain s'appelle-t-il un « ring » ?",
    "options": [
      "L'escrime",
      "Le catch",
      "La boxe",
      "Le judo"
    ],
    "reponse": 2
  },
  {
    "id": "q0414",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 851 + 10 ?",
    "options": [
      "859",
      "860",
      "863",
      "861"
    ],
    "reponse": 3
  },
  {
    "id": "q0415",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « I » ?",
    "options": [
      "Iode",
      "Cérium",
      "Indium",
      "Argent"
    ],
    "reponse": 0
  },
  {
    "id": "q0416",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Tanzanie ?",
    "options": [
      "Koweït City",
      "Lomé",
      "Alger",
      "Dodoma"
    ],
    "reponse": 3
  },
  {
    "id": "q0417",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 2 ?",
    "options": [
      "19",
      "16",
      "18",
      "22"
    ],
    "reponse": 2
  },
  {
    "id": "q0418",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur est connu pour « Jurassic Park » et « E.T. » ?",
    "options": [
      "James Cameron",
      "George Lucas",
      "Martin Scorsese",
      "Steven Spielberg"
    ],
    "reponse": 3
  },
  {
    "id": "q0419",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 80 ?",
    "options": [
      "26",
      "24",
      "23",
      "22"
    ],
    "reponse": 1
  },
  {
    "id": "q0420",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Suède ?",
    "options": [
      "Stockholm",
      "Porto-Novo",
      "Budapest",
      "Santiago"
    ],
    "reponse": 0
  },
  {
    "id": "q0421",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Uruguay ?",
    "options": [
      "Rabat",
      "Vientiane",
      "Bamako",
      "Montevideo"
    ],
    "reponse": 3
  },
  {
    "id": "q0422",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 256 ?",
    "options": [
      "15",
      "16",
      "17",
      "18"
    ],
    "reponse": 1
  },
  {
    "id": "q0423",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Brome ?",
    "options": [
      "Mg",
      "P",
      "Br",
      "Fe"
    ],
    "reponse": 2
  },
  {
    "id": "q0424",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2597 en chiffres romains ?",
    "options": [
      "MMDXCII",
      "MMDXCVI",
      "MMDXCVII",
      "MMDLXXXVII"
    ],
    "reponse": 2
  },
  {
    "id": "q0425",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel pharaon est associé à la découverte de sa tombe presque intacte en 1922 ?",
    "options": [
      "Akhenaton",
      "Ramsès II",
      "Toutânkhamon",
      "Khéops"
    ],
    "reponse": 2
  },
  {
    "id": "q0426",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Tunisie ?",
    "options": [
      "🇸🇷",
      "🇹🇳",
      "🇬🇹",
      "🇻🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q0427",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suède ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q0428",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel explorateur est crédité de la découverte de l'Amérique en 1492 ?",
    "options": [
      "Christophe Colomb",
      "Vasco de Gama",
      "Fernand de Magellan",
      "Jacques Cartier"
    ],
    "reponse": 0
  },
  {
    "id": "q0429",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 893 en chiffres romains ?",
    "options": [
      "DCCCXCII",
      "DCCCLXXXIII",
      "DCCCXCIV",
      "DCCCXCIII"
    ],
    "reponse": 3
  },
  {
    "id": "q0430",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 130 + 545 ?",
    "options": [
      "675",
      "672",
      "674",
      "676"
    ],
    "reponse": 0
  },
  {
    "id": "q0431",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel est le nom de la compétition annuelle de rugby entre six nations européennes ?",
    "options": [
      "Le Rugby Championship",
      "Le Tournoi des Six Nations",
      "La Coupe du monde",
      "La Coupe d'Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0432",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Arménie ?",
    "options": [
      "Dollar de Singapour",
      "Peso dominicain",
      "Peso argentin",
      "Dram"
    ],
    "reponse": 3
  },
  {
    "id": "q0433",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Tunisie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0434",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 130 ml ?",
    "options": [
      "13",
      "15",
      "16",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q0435",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle reine de France est surnommée « l'Autrichienne » et fut guillotinée en 1793 ?",
    "options": [
      "Marie-Antoinette",
      "Catherine de Médicis",
      "Marie de Médicis",
      "Anne d'Autriche"
    ],
    "reponse": 0
  },
  {
    "id": "q0436",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Botswana",
      "Syrie",
      "Niger",
      "Estonie"
    ],
    "reponse": 3
  },
  {
    "id": "q0437",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République tchèque ?",
    "options": [
      "🇧🇷",
      "🇻🇳",
      "🇨🇿",
      "🇦🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q0438",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Thaïlande ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0439",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de km dans 30000 m ?",
    "options": [
      "30",
      "33",
      "28",
      "27"
    ],
    "reponse": 0
  },
  {
    "id": "q0440",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Nigeria",
      "Pakistan",
      "Macédoine du Nord",
      "République démocratique du Congo"
    ],
    "reponse": 0
  },
  {
    "id": "q0441",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse égyptienne du ciel est représentée avalant le soleil chaque soir ?",
    "options": [
      "Isis",
      "Bastet",
      "Hathor",
      "Nout"
    ],
    "reponse": 3
  },
  {
    "id": "q0442",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film raconte l'histoire d'un poisson-clown nommé Marin partant à la recherche de son fils ?",
    "options": [
      "Le Monde de Nemo",
      "Le Monde de Dory",
      "Là-haut",
      "Vice-versa"
    ],
    "reponse": 0
  },
  {
    "id": "q0443",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 945 appartient à quel siècle ?",
    "options": [
      "9e siècle",
      "11e siècle",
      "10e siècle",
      "8e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0444",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Suède ?",
    "options": [
      "🇰🇵",
      "🇧🇿",
      "🇭🇹",
      "🇸🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q0445",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 882 + 778 ?",
    "options": [
      "1659",
      "1661",
      "1660",
      "1663"
    ],
    "reponse": 2
  },
  {
    "id": "q0446",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain a créé le personnage de Dracula ?",
    "options": [
      "Bram Stoker",
      "Edgar Allan Poe",
      "Mary Shelley",
      "H.P. Lovecraft"
    ],
    "reponse": 0
  },
  {
    "id": "q0447",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 49 ?",
    "options": [
      "7",
      "10",
      "4",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q0448",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Samoa ?",
    "options": [
      "Tegucigalpa",
      "Paris",
      "Apia",
      "Tachkent"
    ],
    "reponse": 2
  },
  {
    "id": "q0449",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ce » ?",
    "options": [
      "Fluor",
      "Cérium",
      "Vanadium",
      "Mercure"
    ],
    "reponse": 1
  },
  {
    "id": "q0450",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CLVI en chiffres romains ?",
    "options": [
      "161",
      "156",
      "155",
      "146"
    ],
    "reponse": 1
  },
  {
    "id": "q0451",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Nouvelle-Zélande ?",
    "options": [
      "Dollar jamaïcain",
      "Livre libanaise",
      "Baht",
      "Dollar néo-zélandais"
    ],
    "reponse": 3
  },
  {
    "id": "q0452",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Guinée ?",
    "options": [
      "Dollar namibien",
      "Dollar jamaïcain",
      "Guarani",
      "Franc guinéen"
    ],
    "reponse": 3
  },
  {
    "id": "q0453",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 27 jour(s) ?",
    "options": [
      "756",
      "597",
      "648",
      "573"
    ],
    "reponse": 2
  },
  {
    "id": "q0454",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument est joué en le pinçant, avec généralement six cordes ?",
    "options": [
      "Le banjo",
      "Le ukulélé",
      "La guitare",
      "La mandoline"
    ],
    "reponse": 2
  },
  {
    "id": "q0455",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Iran",
      "Irak",
      "Croatie",
      "Chine"
    ],
    "reponse": 0
  },
  {
    "id": "q0456",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 441 - 89 ?",
    "options": [
      "351",
      "352",
      "350",
      "354"
    ],
    "reponse": 1
  },
  {
    "id": "q0457",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock a été formé par Mick Jagger et Keith Richards ?",
    "options": [
      "The Kinks",
      "The Rolling Stones",
      "The Beatles",
      "The Who"
    ],
    "reponse": 1
  },
  {
    "id": "q0458",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Thaïlande ?",
    "options": [
      "🇧🇫",
      "🇹🇭",
      "🇧🇦",
      "🇵🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q0459",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 361 ?",
    "options": [
      "23",
      "17",
      "19",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q0460",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 2600 cl ?",
    "options": [
      "23",
      "22",
      "26",
      "21"
    ],
    "reponse": 2
  },
  {
    "id": "q0461",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1105 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "10e siècle",
      "11e siècle",
      "12e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0462",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Autriche ?",
    "options": [
      "🇦🇹",
      "🇱🇹",
      "🇨🇮",
      "🇩🇿"
    ],
    "reponse": 0
  },
  {
    "id": "q0463",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 au carré ?",
    "options": [
      "20",
      "12",
      "15",
      "16"
    ],
    "reponse": 3
  },
  {
    "id": "q0464",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel dramaturge anglais a écrit « Hamlet » et « Macbeth » ?",
    "options": [
      "Christopher Marlowe",
      "George Bernard Shaw",
      "William Shakespeare",
      "Oscar Wilde"
    ],
    "reponse": 2
  },
  {
    "id": "q0465",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « La » ?",
    "options": [
      "Silicium",
      "Béryllium",
      "Polonium",
      "Lanthane"
    ],
    "reponse": 3
  },
  {
    "id": "q0466",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Don Quichotte » ?",
    "options": [
      "Federico García Lorca",
      "Lope de Vega",
      "Miguel de Cervantès",
      "Pedro Calderón de la Barca"
    ],
    "reponse": 2
  },
  {
    "id": "q0467",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République dominicaine ?",
    "options": [
      "🇳🇬",
      "🇸🇬",
      "🇩🇴",
      "🇨🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q0468",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Guinée ?",
    "options": [
      "Bratislava",
      "Conakry",
      "Khartoum",
      "Lima"
    ],
    "reponse": 1
  },
  {
    "id": "q0469",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel roi d'Angleterre a rompu avec l'Église catholique au XVIe siècle ?",
    "options": [
      "Henri VIII",
      "Henri VII",
      "Jacques Ier",
      "Édouard VI"
    ],
    "reponse": 0
  },
  {
    "id": "q0470",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Liban ?",
    "options": [
      "🇸🇰",
      "🇦🇷",
      "🇳🇵",
      "🇱🇧"
    ],
    "reponse": 3
  },
  {
    "id": "q0471",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 639 + 79 ?",
    "options": [
      "721",
      "719",
      "718",
      "715"
    ],
    "reponse": 2
  },
  {
    "id": "q0472",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz les plantes absorbent-elles principalement lors de la photosynthèse ?",
    "options": [
      "L'oxygène",
      "L'hydrogène",
      "Le dioxyde de carbone",
      "L'azote"
    ],
    "reponse": 2
  },
  {
    "id": "q0473",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 262 - 3 ?",
    "options": [
      "259",
      "257",
      "258",
      "256"
    ],
    "reponse": 0
  },
  {
    "id": "q0474",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Équateur ?",
    "options": [
      "Dollar de Singapour",
      "Dinar tunisien",
      "Dollar américain",
      "Yen"
    ],
    "reponse": 2
  },
  {
    "id": "q0475",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 104 ÷ 13 ?",
    "options": [
      "9",
      "8",
      "5",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q0476",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 × 11 ?",
    "options": [
      "31",
      "33",
      "36",
      "39"
    ],
    "reponse": 1
  },
  {
    "id": "q0477",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Panama",
      "Chypre",
      "Gabon",
      "Uruguay"
    ],
    "reponse": 0
  },
  {
    "id": "q0478",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Sodium ?",
    "options": [
      "Sb",
      "Pd",
      "Pt",
      "Na"
    ],
    "reponse": 3
  },
  {
    "id": "q0479",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Belgique ?",
    "options": [
      "Tugrik",
      "Peso argentin",
      "Franc guinéen",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q0480",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 90 ÷ 15 ?",
    "options": [
      "6",
      "7",
      "5",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q0481",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2005 appartient à quel siècle ?",
    "options": [
      "21e siècle",
      "20e siècle",
      "19e siècle",
      "22e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0482",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Samoa ?",
    "options": [
      "🇼🇸",
      "🇨🇱",
      "🇬🇦",
      "🇱🇾"
    ],
    "reponse": 0
  },
  {
    "id": "q0483",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Danemark ?",
    "options": [
      "Niamey",
      "Katmandou",
      "Copenhague",
      "Phnom Penh"
    ],
    "reponse": 2
  },
  {
    "id": "q0484",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCLXXX en chiffres romains ?",
    "options": [
      "3681",
      "3685",
      "3680",
      "3670"
    ],
    "reponse": 2
  },
  {
    "id": "q0485",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?",
    "options": [
      "1965",
      "1969",
      "1975",
      "1971"
    ],
    "reponse": 1
  },
  {
    "id": "q0486",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 au carré ?",
    "options": [
      "136",
      "144",
      "128",
      "162"
    ],
    "reponse": 1
  },
  {
    "id": "q0487",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « HTTP » ?",
    "options": [
      "Hyperlink Transport Protocol",
      "High Transfer Text Protocol",
      "HyperText Transfer Protocol",
      "Home Text Transport Protocol"
    ],
    "reponse": 2
  },
  {
    "id": "q0488",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 38 décennie(s) ?",
    "options": [
      "433",
      "445",
      "346",
      "380"
    ],
    "reponse": 3
  },
  {
    "id": "q0489",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 11 ?",
    "options": [
      "55",
      "54",
      "59",
      "53"
    ],
    "reponse": 0
  },
  {
    "id": "q0490",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Portugal ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0491",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1261 et 1272 ?",
    "options": [
      "9",
      "12",
      "10",
      "11"
    ],
    "reponse": 3
  },
  {
    "id": "q0492",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel pays est né le rugby ?",
    "options": [
      "L'Angleterre",
      "La France",
      "Le Pays de Galles",
      "L'Écosse"
    ],
    "reponse": 0
  },
  {
    "id": "q0493",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Paraguay ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0494",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 709 appartient à quel siècle ?",
    "options": [
      "7e siècle",
      "6e siècle",
      "9e siècle",
      "8e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0495",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1181 et 1226 ?",
    "options": [
      "45",
      "42",
      "48",
      "50"
    ],
    "reponse": 0
  },
  {
    "id": "q0496",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 50 ?",
    "options": [
      "4",
      "5",
      "8",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q0497",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Potassium ?",
    "options": [
      "Ni",
      "C",
      "Cd",
      "K"
    ],
    "reponse": 3
  },
  {
    "id": "q0498",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 132 ÷ 6 ?",
    "options": [
      "23",
      "26",
      "24",
      "22"
    ],
    "reponse": 3
  },
  {
    "id": "q0499",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nairobi est la capitale de quel pays ?",
    "options": [
      "Portugal",
      "Serbie",
      "Arabie saoudite",
      "Kenya"
    ],
    "reponse": 3
  },
  {
    "id": "q0500",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Suriname ?",
    "options": [
      "Bruxelles",
      "Kiev",
      "Paramaribo",
      "Berne"
    ],
    "reponse": 2
  },
  {
    "id": "q0501",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Côte d'Ivoire ?",
    "options": [
      "Océanie",
      "Afrique",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0502",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel est le plus grand lac d'eau douce du monde en superficie ?",
    "options": [
      "Le lac Baïkal",
      "Le lac Victoria",
      "La mer Caspienne",
      "Le lac Supérieur"
    ],
    "reponse": 3
  },
  {
    "id": "q0503",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays est traversé par l'équateur et le méridien de Greenwich à la fois ?",
    "options": [
      "Le Kenya",
      "Le Brésil",
      "Le Ghana",
      "L'Indonésie"
    ],
    "reponse": 2
  },
  {
    "id": "q0504",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1408 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "15e siècle",
      "14e siècle",
      "13e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0505",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCXXXVII en chiffres romains ?",
    "options": [
      "1738",
      "1732",
      "1736",
      "1737"
    ],
    "reponse": 3
  },
  {
    "id": "q0506",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Slovénie ?",
    "options": [
      "Ottawa",
      "Lomé",
      "Ljubljana",
      "Tachkent"
    ],
    "reponse": 2
  },
  {
    "id": "q0507",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 20 ?",
    "options": [
      "10",
      "11",
      "12",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q0508",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Fluor ?",
    "options": [
      "F",
      "Sc",
      "Br",
      "Cd"
    ],
    "reponse": 0
  },
  {
    "id": "q0509",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Séoul est la capitale de quel pays ?",
    "options": [
      "Cambodge",
      "Autriche",
      "Lituanie",
      "Corée du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q0510",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le plus grand animal terrestre actuel ?",
    "options": [
      "La girafe",
      "Le rhinocéros",
      "L'hippopotame",
      "L'éléphant d'Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0511",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 620 + 860 ?",
    "options": [
      "1480",
      "1481",
      "1477",
      "1483"
    ],
    "reponse": 0
  },
  {
    "id": "q0512",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1534 en chiffres romains ?",
    "options": [
      "MDXXXIX",
      "MDXXXV",
      "MDXXIX",
      "MDXXXIV"
    ],
    "reponse": 3
  },
  {
    "id": "q0513",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1283 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "11e siècle",
      "12e siècle",
      "13e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0514",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Allemagne ?",
    "options": [
      "Stockholm",
      "Bagdad",
      "Belgrade",
      "Berlin"
    ],
    "reponse": 3
  },
  {
    "id": "q0515",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo « Battle Royale » très populaire est édité par Epic Games ?",
    "options": [
      "Fortnite",
      "Apex Legends",
      "PUBG",
      "Warzone"
    ],
    "reponse": 0
  },
  {
    "id": "q0516",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Co » ?",
    "options": [
      "Baryum",
      "Hydrogène",
      "Vanadium",
      "Cobalt"
    ],
    "reponse": 3
  },
  {
    "id": "q0517",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument romain, amphithéâtre, pouvait accueillir des dizaines de milliers de spectateurs pour des combats de gladiateurs ?",
    "options": [
      "Le Colisée",
      "Le Panthéon",
      "Les thermes de Caracalla",
      "Le Forum romain"
    ],
    "reponse": 0
  },
  {
    "id": "q0518",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 600 heure(s) ?",
    "options": [
      "23",
      "20",
      "22",
      "25"
    ],
    "reponse": 3
  },
  {
    "id": "q0519",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Malte ?",
    "options": [
      "🇸🇬",
      "🇦🇷",
      "🇵🇾",
      "🇲🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q0520",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République démocratique du Congo ?",
    "options": [
      "Kingston",
      "Sarajevo",
      "Kinshasa",
      "Nairobi"
    ],
    "reponse": 2
  },
  {
    "id": "q0521",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel accord de 1494 a partagé les nouvelles terres découvertes entre l'Espagne et le Portugal ?",
    "options": [
      "Le traité de Verdun",
      "Le traité d'Utrecht",
      "Le traité de Tordesillas",
      "Le traité de Westphalie"
    ],
    "reponse": 2
  },
  {
    "id": "q0522",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Buenos Aires est la capitale de quel pays ?",
    "options": [
      "Mauritanie",
      "Biélorussie",
      "Argentine",
      "République dominicaine"
    ],
    "reponse": 2
  },
  {
    "id": "q0523",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année Christophe Colomb a-t-il atteint les Amériques ?",
    "options": [
      "1502",
      "1492",
      "1498",
      "1488"
    ],
    "reponse": 1
  },
  {
    "id": "q0524",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel courant artistique du début du XXe siècle rejette la logique et célèbre l'absurde, incarné par Marcel Duchamp ?",
    "options": [
      "Le surréalisme",
      "Le futurisme",
      "L'expressionnisme",
      "Le dadaïsme"
    ],
    "reponse": 3
  },
  {
    "id": "q0525",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène deux frères vampires amoureux de la même jeune femme dans la ville de Mystic Falls ?",
    "options": [
      "True Blood",
      "Teen Wolf",
      "Vampire Academy",
      "The Vampire Diaries"
    ],
    "reponse": 3
  },
  {
    "id": "q0526",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quelle actrice a incarné la reine dans « La Reine des neiges » (voix originale) ?",
    "options": [
      "Demi Lovato",
      "Idina Menzel",
      "Kristen Bell",
      "Ariana Grande"
    ],
    "reponse": 1
  },
  {
    "id": "q0527",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 28 au carré ?",
    "options": [
      "867",
      "784",
      "777",
      "789"
    ],
    "reponse": 1
  },
  {
    "id": "q0528",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Indonésie ?",
    "options": [
      "Ouagadougou",
      "Jakarta",
      "Lusaka",
      "Bucarest"
    ],
    "reponse": 1
  },
  {
    "id": "q0529",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel phénomène explique pourquoi le ciel est bleu ?",
    "options": [
      "La réfraction",
      "La diffusion de la lumière",
      "La polarisation",
      "L'absorption"
    ],
    "reponse": 1
  },
  {
    "id": "q0530",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ouganda ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Europe",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0531",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Astana est la capitale de quel pays ?",
    "options": [
      "Cameroun",
      "Kazakhstan",
      "Afghanistan",
      "Sénégal"
    ],
    "reponse": 1
  },
  {
    "id": "q0532",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Burkina Faso ?",
    "options": [
      "Ouagadougou",
      "Copenhague",
      "Tokyo",
      "Mexico"
    ],
    "reponse": 0
  },
  {
    "id": "q0533",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 3 ?",
    "options": [
      "57",
      "50",
      "65",
      "55"
    ],
    "reponse": 0
  },
  {
    "id": "q0534",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle montagne russe est le point culminant d'Europe ?",
    "options": [
      "L'Elbrouz",
      "Le mont Olympe",
      "Le Mont Blanc",
      "Le Ben Nevis"
    ],
    "reponse": 0
  },
  {
    "id": "q0535",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien du chaos et de la tempête a tué son frère Osiris ?",
    "options": [
      "Seth",
      "Thot",
      "Anubis",
      "Horus"
    ],
    "reponse": 0
  },
  {
    "id": "q0536",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3587 en chiffres romains ?",
    "options": [
      "MMMDXCII",
      "MMMDLXXXVII",
      "MMMDLXXXII",
      "MMMDLXXXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0537",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal marin possède une corne unique, lui valant le surnom de « licorne des mers » ?",
    "options": [
      "Le dauphin",
      "L'espadon",
      "Le narval",
      "Le requin-scie"
    ],
    "reponse": 2
  },
  {
    "id": "q0538",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo d'horreur met en scène un habitant d'une ville brumeuse nommée Silent Hill ?",
    "options": [
      "Resident Evil",
      "Silent Hill",
      "Dead Space",
      "Outlast"
    ],
    "reponse": 1
  },
  {
    "id": "q0539",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle discipline olympique combine tir et ski de fond ?",
    "options": [
      "Le ski alpin",
      "Le pentathlon moderne",
      "Le combiné nordique",
      "Le biathlon"
    ],
    "reponse": 3
  },
  {
    "id": "q0540",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Fidji ?",
    "options": [
      "Bolivar",
      "Dollar fidjien",
      "Rial iranien",
      "Pula"
    ],
    "reponse": 1
  },
  {
    "id": "q0541",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo met en scène un chasseur de trésors nommé Nathan Drake ?",
    "options": [
      "Assassin's Creed",
      "Tomb Raider",
      "Indiana Jones",
      "Uncharted"
    ],
    "reponse": 3
  },
  {
    "id": "q0542",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle chanteuse britannique a connu un immense succès avec l'album « 21 » ?",
    "options": [
      "Amy Winehouse",
      "Adele",
      "Duffy",
      "Florence Welch"
    ],
    "reponse": 1
  },
  {
    "id": "q0543",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pb » ?",
    "options": [
      "Xénon",
      "Plomb",
      "Mercure",
      "Oxygène"
    ],
    "reponse": 1
  },
  {
    "id": "q0544",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Costa Rica",
      "Fidji",
      "Arabie saoudite",
      "Bulgarie"
    ],
    "reponse": 0
  },
  {
    "id": "q0545",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3188 en chiffres romains ?",
    "options": [
      "MMMCXCIII",
      "MMMCLXXVIII",
      "MMMCLXXXIX",
      "MMMCLXXXVIII"
    ],
    "reponse": 3
  },
  {
    "id": "q0546",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle unité mesure la vitesse d'un processeur ?",
    "options": [
      "L'octet",
      "Le watt",
      "Le hertz (GHz)",
      "Le bit"
    ],
    "reponse": 2
  },
  {
    "id": "q0547",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle créature de la mythologie grecque a une tête de lion, un corps de chèvre et une queue de serpent ?",
    "options": [
      "La Chimère",
      "Cerbère",
      "L'Hydre de Lerne",
      "Le Minotaure"
    ],
    "reponse": 0
  },
  {
    "id": "q0548",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la République démocratique du Congo ?",
    "options": [
      "Franc congolais",
      "Euro",
      "Livre libanaise",
      "Dinar algérien"
    ],
    "reponse": 0
  },
  {
    "id": "q0549",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Fe » ?",
    "options": [
      "Phosphore",
      "Soufre",
      "Fluor",
      "Fer"
    ],
    "reponse": 3
  },
  {
    "id": "q0550",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "République démocratique du Congo",
      "Niger",
      "Fidji",
      "Cuba"
    ],
    "reponse": 3
  },
  {
    "id": "q0551",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle boisson chaude est préparée à partir de grains torréfiés et moulus ?",
    "options": [
      "Le café",
      "La chicorée",
      "Le chocolat chaud",
      "Le thé"
    ],
    "reponse": 0
  },
  {
    "id": "q0552",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 195 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "4e siècle",
      "1e siècle",
      "3e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0553",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1396 et 1460 ?",
    "options": [
      "57",
      "59",
      "64",
      "63"
    ],
    "reponse": 2
  },
  {
    "id": "q0554",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kinshasa est la capitale de quel pays ?",
    "options": [
      "Gabon",
      "Bénin",
      "République démocratique du Congo",
      "Panama"
    ],
    "reponse": 2
  },
  {
    "id": "q0555",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 200 ?",
    "options": [
      "30",
      "35",
      "32",
      "33"
    ],
    "reponse": 0
  },
  {
    "id": "q0556",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Mongolie ?",
    "options": [
      "Sarajevo",
      "Oulan-Bator",
      "La Havane",
      "Varsovie"
    ],
    "reponse": 1
  },
  {
    "id": "q0557",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Syrie ?",
    "options": [
      "Guarani",
      "Livre syrienne",
      "Dollar guyanien",
      "Naira"
    ],
    "reponse": 1
  },
  {
    "id": "q0558",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 19 h ?",
    "options": [
      "76769",
      "77598",
      "68400",
      "77201"
    ],
    "reponse": 2
  },
  {
    "id": "q0559",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 307 - 139 ?",
    "options": [
      "168",
      "166",
      "171",
      "170"
    ],
    "reponse": 0
  },
  {
    "id": "q0560",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre hollandais du XVIIe siècle a peint « La Jeune Fille à la perle » ?",
    "options": [
      "Johannes Vermeer",
      "Pieter de Hooch",
      "Rembrandt",
      "Frans Hals"
    ],
    "reponse": 0
  },
  {
    "id": "q0561",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Géorgie ?",
    "options": [
      "🇷🇴",
      "🇳🇿",
      "🇬🇪",
      "🇮🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q0562",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Maputo est la capitale de quel pays ?",
    "options": [
      "Belgique",
      "Yémen",
      "Belize",
      "Mozambique"
    ],
    "reponse": 3
  },
  {
    "id": "q0563",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock britannique a pour chanteur emblématique Freddie Mercury ?",
    "options": [
      "Led Zeppelin",
      "The Rolling Stones",
      "Deep Purple",
      "Queen"
    ],
    "reponse": 3
  },
  {
    "id": "q0564",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel événement cycliste est surnommé la « Grande Boucle » ?",
    "options": [
      "Paris-Roubaix",
      "Le Tour de France",
      "La Vuelta",
      "Le Giro d'Italia"
    ],
    "reponse": 1
  },
  {
    "id": "q0565",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Algérie",
      "République tchèque",
      "Norvège",
      "Allemagne"
    ],
    "reponse": 1
  },
  {
    "id": "q0566",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Brésil ?",
    "options": [
      "Océanie",
      "Afrique",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q0567",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 684 + 81 ?",
    "options": [
      "767",
      "762",
      "766",
      "765"
    ],
    "reponse": 3
  },
  {
    "id": "q0568",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la température d'ébullition de l'eau au niveau de la mer ?",
    "options": [
      "100 °C",
      "120 °C",
      "80 °C",
      "90 °C"
    ],
    "reponse": 0
  },
  {
    "id": "q0569",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 au carré ?",
    "options": [
      "256",
      "249",
      "277",
      "257"
    ],
    "reponse": 0
  },
  {
    "id": "q0570",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 447 + 444 ?",
    "options": [
      "890",
      "889",
      "891",
      "893"
    ],
    "reponse": 2
  },
  {
    "id": "q0571",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel scientifique a inventé le paratonnerre ?",
    "options": [
      "Nikola Tesla",
      "Thomas Edison",
      "Benjamin Franklin",
      "Alessandro Volta"
    ],
    "reponse": 2
  },
  {
    "id": "q0572",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 984 en chiffres romains ?",
    "options": [
      "CMLXXXIII",
      "CMXCIV",
      "CMLXXIV",
      "CMLXXXIV"
    ],
    "reponse": 3
  },
  {
    "id": "q0573",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle chercheuse a reçu deux prix Nobel, en physique et en chimie ?",
    "options": [
      "Ada Lovelace",
      "Dorothy Hodgkin",
      "Rosalind Franklin",
      "Marie Curie"
    ],
    "reponse": 3
  },
  {
    "id": "q0574",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain britannique a écrit « Le Meilleur des mondes » ?",
    "options": [
      "George Orwell",
      "Aldous Huxley",
      "H.G. Wells",
      "Ray Bradbury"
    ],
    "reponse": 1
  },
  {
    "id": "q0575",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 8 h ?",
    "options": [
      "33285",
      "28800",
      "31366",
      "25024"
    ],
    "reponse": 1
  },
  {
    "id": "q0576",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Myanmar",
      "Indonésie",
      "Égypte",
      "Liban"
    ],
    "reponse": 2
  },
  {
    "id": "q0577",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien du soleil est souvent représenté avec une tête de faucon ?",
    "options": [
      "Rê (Rê-Horakhty)",
      "Anubis",
      "Horus",
      "Seth"
    ],
    "reponse": 0
  },
  {
    "id": "q0578",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de survie et de crafting se déroule sur une île après un crash d'avion, développé par Endnight Games ?",
    "options": [
      "Subnautica",
      "Raft",
      "The Forest",
      "Green Hell"
    ],
    "reponse": 2
  },
  {
    "id": "q0579",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Fidji ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Europe",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0580",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 9 ?",
    "options": [
      "171",
      "160",
      "162",
      "169"
    ],
    "reponse": 2
  },
  {
    "id": "q0581",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Luxembourg ?",
    "options": [
      "Sofia",
      "Bucarest",
      "Panama",
      "Luxembourg"
    ],
    "reponse": 3
  },
  {
    "id": "q0582",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇾🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Laos",
      "Yémen",
      "Bosnie-Herzégovine",
      "Venezuela"
    ],
    "reponse": 1
  },
  {
    "id": "q0583",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Hongrie ?",
    "options": [
      "Singapour",
      "Manille",
      "Budapest",
      "Dakar"
    ],
    "reponse": 2
  },
  {
    "id": "q0584",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Estonie ?",
    "options": [
      "🇧🇼",
      "🇶🇦",
      "🇭🇳",
      "🇪🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q0585",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un requin terrorisant une station balnéaire, réalisé par Spielberg en 1975 ?",
    "options": [
      "Le Grand Bleu",
      "Open Water",
      "Les Dents de la mer",
      "Piranha"
    ],
    "reponse": 2
  },
  {
    "id": "q0586",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kiev est la capitale de quel pays ?",
    "options": [
      "Australie",
      "Singapour",
      "Émirats arabes unis",
      "Ukraine"
    ],
    "reponse": 3
  },
  {
    "id": "q0587",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Serbie ?",
    "options": [
      "Brasilia",
      "Paramaribo",
      "Hanoï",
      "Belgrade"
    ],
    "reponse": 3
  },
  {
    "id": "q0588",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné le personnage principal de « Rocky » ?",
    "options": [
      "Arnold Schwarzenegger",
      "Bruce Willis",
      "Sylvester Stallone",
      "Jean-Claude Van Damme"
    ],
    "reponse": 2
  },
  {
    "id": "q0589",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tirana est la capitale de quel pays ?",
    "options": [
      "Kazakhstan",
      "Albanie",
      "Algérie",
      "Ouzbékistan"
    ],
    "reponse": 1
  },
  {
    "id": "q0590",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Reykjavik est la capitale de quel pays ?",
    "options": [
      "Slovénie",
      "Géorgie",
      "République démocratique du Congo",
      "Islande"
    ],
    "reponse": 3
  },
  {
    "id": "q0591",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Syrie ?",
    "options": [
      "🇸🇾",
      "🇨🇺",
      "🇲🇿",
      "🇲🇾"
    ],
    "reponse": 0
  },
  {
    "id": "q0592",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "En quelle année le mur de Berlin a-t-il été construit ?",
    "options": [
      "1955",
      "1971",
      "1965",
      "1961"
    ],
    "reponse": 3
  },
  {
    "id": "q0593",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Myanmar ?",
    "options": [
      "San Salvador",
      "Kuala Lumpur",
      "Reykjavik",
      "Naypyidaw"
    ],
    "reponse": 3
  },
  {
    "id": "q0594",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Éthiopie",
      "Islande",
      "Hongrie",
      "Espagne"
    ],
    "reponse": 1
  },
  {
    "id": "q0595",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1346 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "12e siècle",
      "14e siècle",
      "15e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0596",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Monténégro ?",
    "options": [
      "Peso cubain",
      "Euro",
      "Won nord-coréen",
      "Couronne tchèque"
    ],
    "reponse": 1
  },
  {
    "id": "q0597",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Amman est la capitale de quel pays ?",
    "options": [
      "El Salvador",
      "Jordanie",
      "Finlande",
      "Pérou"
    ],
    "reponse": 1
  },
  {
    "id": "q0598",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 211 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "3e siècle",
      "2e siècle",
      "1e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0599",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kazakhstan ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0600",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Moldavie ?",
    "options": [
      "Guatemala",
      "Antananarivo",
      "Porto-Novo",
      "Chisinau"
    ],
    "reponse": 3
  },
  {
    "id": "q0601",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Ruthénium ?",
    "options": [
      "Si",
      "Ag",
      "Cd",
      "Ru"
    ],
    "reponse": 3
  },
  {
    "id": "q0602",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Botswana ?",
    "options": [
      "Dakar",
      "Bangkok",
      "Harare",
      "Gaborone"
    ],
    "reponse": 3
  },
  {
    "id": "q0603",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ne » ?",
    "options": [
      "Uranium",
      "Titane",
      "Néon",
      "Chrome"
    ],
    "reponse": 2
  },
  {
    "id": "q0604",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Albanie ?",
    "options": [
      "Erevan",
      "Kampala",
      "Tirana",
      "Khartoum"
    ],
    "reponse": 2
  },
  {
    "id": "q0605",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 63 ÷ 3 ?",
    "options": [
      "22",
      "24",
      "25",
      "21"
    ],
    "reponse": 3
  },
  {
    "id": "q0606",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 174 - 45 ?",
    "options": [
      "129",
      "130",
      "127",
      "132"
    ],
    "reponse": 0
  },
  {
    "id": "q0607",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Dinar koweïtien",
      "Shilling ougandais",
      "Kina",
      "Riyal yéménite"
    ],
    "reponse": 2
  },
  {
    "id": "q0608",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom du processus de division cellulaire produisant des cellules identiques ?",
    "options": [
      "La mitose",
      "La méiose",
      "La mutation",
      "La transcription"
    ],
    "reponse": 0
  },
  {
    "id": "q0609",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 6 ?",
    "options": [
      "31",
      "35",
      "25",
      "30"
    ],
    "reponse": 3
  },
  {
    "id": "q0610",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Chili ?",
    "options": [
      "Porto-Novo",
      "Santiago",
      "Alger",
      "Moscou"
    ],
    "reponse": 1
  },
  {
    "id": "q0611",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1370 et 1415 ?",
    "options": [
      "50",
      "39",
      "54",
      "45"
    ],
    "reponse": 3
  },
  {
    "id": "q0612",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Niger ?",
    "options": [
      "🇧🇪",
      "🇳🇪",
      "🇯🇴",
      "🇱🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q0613",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Paraguay ?",
    "options": [
      "🇲🇽",
      "🇪🇸",
      "🇭🇺",
      "🇵🇾"
    ],
    "reponse": 3
  },
  {
    "id": "q0614",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Brasilia est la capitale de quel pays ?",
    "options": [
      "Lituanie",
      "Brésil",
      "Soudan",
      "Kazakhstan"
    ],
    "reponse": 1
  },
  {
    "id": "q0615",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 30 ÷ 6 ?",
    "options": [
      "3",
      "5",
      "8",
      "2"
    ],
    "reponse": 1
  },
  {
    "id": "q0616",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Gallium ?",
    "options": [
      "Kr",
      "He",
      "Tc",
      "Ga"
    ],
    "reponse": 3
  },
  {
    "id": "q0617",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel archipel appartient à l'Équateur et abrite une faune unique étudiée par Darwin ?",
    "options": [
      "Les Seychelles",
      "Les îles Canaries",
      "Les îles Galápagos",
      "Les Maldives"
    ],
    "reponse": 2
  },
  {
    "id": "q0618",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 503 + 298 ?",
    "options": [
      "801",
      "799",
      "803",
      "802"
    ],
    "reponse": 0
  },
  {
    "id": "q0619",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2671 en chiffres romains ?",
    "options": [
      "MMDCLXVI",
      "MMDCLXXXI",
      "MMDCLXIX",
      "MMDCLXXI"
    ],
    "reponse": 3
  },
  {
    "id": "q0620",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète français est l'auteur d'« Illuminations » et « Une saison en enfer » ?",
    "options": [
      "Arthur Rimbaud",
      "Paul Verlaine",
      "Charles Baudelaire",
      "Stéphane Mallarmé"
    ],
    "reponse": 0
  },
  {
    "id": "q0621",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1820 et 1930 ?",
    "options": [
      "122",
      "125",
      "110",
      "108"
    ],
    "reponse": 2
  },
  {
    "id": "q0622",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Équateur ?",
    "options": [
      "🇪🇨",
      "🇦🇺",
      "🇨🇳",
      "🇲🇩"
    ],
    "reponse": 0
  },
  {
    "id": "q0623",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français a reçu le prix Nobel de littérature pour « La Peste » et « L'Étranger » ?",
    "options": [
      "Albert Camus",
      "André Gide",
      "Jean-Paul Sartre",
      "François Mauriac"
    ],
    "reponse": 0
  },
  {
    "id": "q0624",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 68 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "4e siècle",
      "1e siècle",
      "3e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0625",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1284 et 1425 ?",
    "options": [
      "121",
      "123",
      "131",
      "141"
    ],
    "reponse": 3
  },
  {
    "id": "q0626",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe pop américain était composé des frères Jonas ?",
    "options": [
      "Jonas Brothers",
      "Hanson",
      "NSYNC",
      "Backstreet Boys"
    ],
    "reponse": 0
  },
  {
    "id": "q0627",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vienne est la capitale de quel pays ?",
    "options": [
      "République dominicaine",
      "Kenya",
      "Zambie",
      "Autriche"
    ],
    "reponse": 3
  },
  {
    "id": "q0628",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Soufre ?",
    "options": [
      "Cu",
      "Ti",
      "S",
      "Po"
    ],
    "reponse": 2
  },
  {
    "id": "q0629",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 175 + 688 ?",
    "options": [
      "866",
      "865",
      "863",
      "861"
    ],
    "reponse": 2
  },
  {
    "id": "q0630",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de plateforme met en scène un chasseur de trésors australien nommé Crash ?",
    "options": [
      "Sonic",
      "Spyro",
      "Crash Bandicoot",
      "Rayman"
    ],
    "reponse": 2
  },
  {
    "id": "q0631",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 28 ÷ 14 ?",
    "options": [
      "5",
      "2",
      "-1",
      "1"
    ],
    "reponse": 1
  },
  {
    "id": "q0632",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Le Caire est la capitale de quel pays ?",
    "options": [
      "Égypte",
      "Danemark",
      "Russie",
      "Serbie"
    ],
    "reponse": 0
  },
  {
    "id": "q0633",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1957 appartient à quel siècle ?",
    "options": [
      "19e siècle",
      "20e siècle",
      "21e siècle",
      "18e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0634",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Togo",
      "Croatie",
      "États-Unis",
      "Estonie"
    ],
    "reponse": 1
  },
  {
    "id": "q0635",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 723 + 279 ?",
    "options": [
      "1005",
      "1000",
      "1002",
      "1001"
    ],
    "reponse": 2
  },
  {
    "id": "q0636",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 722 - 159 ?",
    "options": [
      "561",
      "563",
      "562",
      "564"
    ],
    "reponse": 1
  },
  {
    "id": "q0637",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel muscle du corps humain est le plus grand ?",
    "options": [
      "Le grand fessier",
      "Le quadriceps",
      "Le deltoïde",
      "Le biceps"
    ],
    "reponse": 0
  },
  {
    "id": "q0638",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Argent ?",
    "options": [
      "Cd",
      "Cl",
      "Bi",
      "Ag"
    ],
    "reponse": 3
  },
  {
    "id": "q0639",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Angola ?",
    "options": [
      "Caracas",
      "La Havane",
      "Luanda",
      "Vilnius"
    ],
    "reponse": 2
  },
  {
    "id": "q0640",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit les aventures du commissaire Maigret ?",
    "options": [
      "Boileau-Narcejac",
      "Georges Simenon",
      "Agatha Christie",
      "Arthur Conan Doyle"
    ],
    "reponse": 1
  },
  {
    "id": "q0641",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCXX en chiffres romains ?",
    "options": [
      "1825",
      "1820",
      "1821",
      "1822"
    ],
    "reponse": 1
  },
  {
    "id": "q0642",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel inventeur est souvent cité comme le père de l'informatique moderne pour ses travaux sur le calcul et la machine de Turing ?",
    "options": [
      "John von Neumann",
      "Alan Turing",
      "Claude Shannon",
      "Charles Babbage"
    ],
    "reponse": 1
  },
  {
    "id": "q0643",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Hg » ?",
    "options": [
      "Magnésium",
      "Nickel",
      "Mercure",
      "Tungstène"
    ],
    "reponse": 2
  },
  {
    "id": "q0644",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Georgetown est la capitale de quel pays ?",
    "options": [
      "Cuba",
      "Fidji",
      "Biélorussie",
      "Guyana"
    ],
    "reponse": 3
  },
  {
    "id": "q0645",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMLXXXIX en chiffres romains ?",
    "options": [
      "2079",
      "2090",
      "2084",
      "2089"
    ],
    "reponse": 3
  },
  {
    "id": "q0646",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nicaragua ?",
    "options": [
      "Afrique",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0647",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1663 et 1934 ?",
    "options": [
      "271",
      "291",
      "299",
      "296"
    ],
    "reponse": 0
  },
  {
    "id": "q0648",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Pays-Bas ?",
    "options": [
      "Euro",
      "Couronne norvégienne",
      "Ariary",
      "Guarani"
    ],
    "reponse": 0
  },
  {
    "id": "q0649",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 10 min ?",
    "options": [
      "581",
      "666",
      "600",
      "640"
    ],
    "reponse": 2
  },
  {
    "id": "q0650",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1158 en chiffres romains ?",
    "options": [
      "MCLIII",
      "MCLVIII",
      "MCXLVIII",
      "MCLXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0651",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 110 ÷ 5 ?",
    "options": [
      "24",
      "21",
      "25",
      "22"
    ],
    "reponse": 3
  },
  {
    "id": "q0652",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 300 ?",
    "options": [
      "164",
      "149",
      "150",
      "134"
    ],
    "reponse": 2
  },
  {
    "id": "q0653",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Baryum ?",
    "options": [
      "Sb",
      "Xe",
      "U",
      "Ba"
    ],
    "reponse": 3
  },
  {
    "id": "q0654",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel monstre à sept têtes repousse dès qu'on les coupe, tué par Héraclès ?",
    "options": [
      "Cerbère",
      "Le Sphinx",
      "La Chimère",
      "L'Hydre de Lerne"
    ],
    "reponse": 3
  },
  {
    "id": "q0655",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1826 en chiffres romains ?",
    "options": [
      "MDCCCXXXVI",
      "MDCCCXXVI",
      "MDCCCXVI",
      "MDCCCXXI"
    ],
    "reponse": 1
  },
  {
    "id": "q0656",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a dominé historiquement le rugby avec les « All Blacks » ?",
    "options": [
      "L'Afrique du Sud",
      "Les Fidji",
      "La Nouvelle-Zélande",
      "L'Australie"
    ],
    "reponse": 2
  },
  {
    "id": "q0657",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Azerbaïdjan ?",
    "options": [
      "Afrique",
      "Océanie",
      "Europe",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0658",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la République dominicaine ?",
    "options": [
      "Naira",
      "Roupie indienne",
      "Taka",
      "Peso dominicain"
    ],
    "reponse": 3
  },
  {
    "id": "q0659",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Portugal ?",
    "options": [
      "Shilling tanzanien",
      "Euro",
      "Franc rwandais",
      "Peso cubain"
    ],
    "reponse": 1
  },
  {
    "id": "q0660",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 2 h ?",
    "options": [
      "126",
      "104",
      "101",
      "120"
    ],
    "reponse": 3
  },
  {
    "id": "q0661",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rh » ?",
    "options": [
      "Tungstène",
      "Yttrium",
      "Rhodium",
      "Thorium"
    ],
    "reponse": 2
  },
  {
    "id": "q0662",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cobalt ?",
    "options": [
      "K",
      "Rn",
      "Zn",
      "Co"
    ],
    "reponse": 3
  },
  {
    "id": "q0663",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Gabon",
      "Biélorussie",
      "Cameroun",
      "États-Unis"
    ],
    "reponse": 2
  },
  {
    "id": "q0664",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCLXXIII en chiffres romains ?",
    "options": [
      "1871",
      "1872",
      "1873",
      "1863"
    ],
    "reponse": 2
  },
  {
    "id": "q0665",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « B » ?",
    "options": [
      "Plomb",
      "Carbone",
      "Brome",
      "Bore"
    ],
    "reponse": 3
  },
  {
    "id": "q0666",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 27 ÷ 3 ?",
    "options": [
      "8",
      "9",
      "7",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q0667",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Arabie saoudite ?",
    "options": [
      "🇫🇮",
      "🇲🇿",
      "🇷🇺",
      "🇸🇦"
    ],
    "reponse": 3
  },
  {
    "id": "q0668",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 25 h ?",
    "options": [
      "1381",
      "1500",
      "1457",
      "1570"
    ],
    "reponse": 1
  },
  {
    "id": "q0669",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 867 - 417 ?",
    "options": [
      "448",
      "453",
      "451",
      "450"
    ],
    "reponse": 3
  },
  {
    "id": "q0670",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2063 appartient à quel siècle ?",
    "options": [
      "20e siècle",
      "19e siècle",
      "21e siècle",
      "22e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0671",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3282 en chiffres romains ?",
    "options": [
      "MMMCCLXXXII",
      "MMMCCLXXX",
      "MMMCCXCII",
      "MMMCCLXXXIII"
    ],
    "reponse": 0
  },
  {
    "id": "q0672",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 80 ?",
    "options": [
      "13",
      "15",
      "16",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q0673",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel jeune résistant français est devenu le symbole de la Résistance après sa mort sous la torture en 1943 ?",
    "options": [
      "Jean Moulin",
      "Guy Môquet",
      "Charles de Gaulle",
      "Pierre Brossolette"
    ],
    "reponse": 0
  },
  {
    "id": "q0674",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 12000 ml ?",
    "options": [
      "12",
      "16",
      "10",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q0675",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sarajevo est la capitale de quel pays ?",
    "options": [
      "Botswana",
      "Bosnie-Herzégovine",
      "Pays-Bas",
      "Suisse"
    ],
    "reponse": 1
  },
  {
    "id": "q0676",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Paraguay ?",
    "options": [
      "Livre soudanaise",
      "Peso dominicain",
      "Franc guinéen",
      "Guarani"
    ],
    "reponse": 3
  },
  {
    "id": "q0677",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Koweït ?",
    "options": [
      "Roupie indienne",
      "Dinar libyen",
      "Dinar koweïtien",
      "Couronne islandaise"
    ],
    "reponse": 2
  },
  {
    "id": "q0678",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Philippines ?",
    "options": [
      "🇨🇬",
      "🇭🇺",
      "🇵🇭",
      "🇧🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q0679",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Serbie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0680",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays possède le plus grand nombre de fuseaux horaires ?",
    "options": [
      "Le Royaume-Uni",
      "La France",
      "La Russie",
      "Les États-Unis"
    ],
    "reponse": 1
  },
  {
    "id": "q0681",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel format de fichier compressé porte l'extension « .zip » ?",
    "options": [
      "Un fichier audio",
      "Une image",
      "Une archive compressée",
      "Une vidéo"
    ],
    "reponse": 2
  },
  {
    "id": "q0682",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Albanie ?",
    "options": [
      "Afrique",
      "Océanie",
      "Europe",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q0683",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Koweït",
      "Chypre",
      "Laos",
      "Irlande"
    ],
    "reponse": 0
  },
  {
    "id": "q0684",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 65 ÷ 13 ?",
    "options": [
      "5",
      "2",
      "8",
      "4"
    ],
    "reponse": 0
  },
  {
    "id": "q0685",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français des Lumières a écrit « Candide » ?",
    "options": [
      "Montesquieu",
      "Voltaire",
      "Denis Diderot",
      "Jean-Jacques Rousseau"
    ],
    "reponse": 1
  },
  {
    "id": "q0686",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Corée du Nord ?",
    "options": [
      "Dirham",
      "Won nord-coréen",
      "Roupie pakistanaise",
      "Yuan"
    ],
    "reponse": 1
  },
  {
    "id": "q0687",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de tir coopératif met en scène quatre survivants face à des hordes de zombies ?",
    "options": [
      "Killing Floor",
      "Back 4 Blood",
      "State of Decay",
      "Left 4 Dead"
    ],
    "reponse": 3
  },
  {
    "id": "q0688",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 13 au carré ?",
    "options": [
      "152",
      "148",
      "178",
      "169"
    ],
    "reponse": 3
  },
  {
    "id": "q0689",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel roi de Sparte est l'époux d'Hélène, dont l'enlèvement déclenche la guerre de Troie ?",
    "options": [
      "Agamemnon",
      "Ménélas",
      "Priam",
      "Pâris"
    ],
    "reponse": 1
  },
  {
    "id": "q0690",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Titane ?",
    "options": [
      "V",
      "Te",
      "Ti",
      "Au"
    ],
    "reponse": 2
  },
  {
    "id": "q0691",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros grec tue le lion de Némée lors de son premier travail ?",
    "options": [
      "Thésée",
      "Jason",
      "Héraclès (Hercule)",
      "Persée"
    ],
    "reponse": 2
  },
  {
    "id": "q0692",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu grec du soleil conduit un char à travers le ciel chaque jour ?",
    "options": [
      "Hypérion",
      "Hermès",
      "Hélios",
      "Apollon"
    ],
    "reponse": 2
  },
  {
    "id": "q0693",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1257 et 1525 ?",
    "options": [
      "268",
      "256",
      "275",
      "305"
    ],
    "reponse": 0
  },
  {
    "id": "q0694",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel est le plus long serpent du monde ?",
    "options": [
      "Le cobra royal",
      "L'anaconda",
      "Le boa constrictor",
      "Le python réticulé"
    ],
    "reponse": 3
  },
  {
    "id": "q0695",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène des policiers et des trafiquants de drogue à Baltimore ?",
    "options": [
      "The Shield",
      "True Detective",
      "Homicide",
      "The Wire"
    ],
    "reponse": 3
  },
  {
    "id": "q0696",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation met en scène un lion nommé Simba ?",
    "options": [
      "Madagascar",
      "Le Roi Lion",
      "Kung Fu Panda",
      "Zootopie"
    ],
    "reponse": 1
  },
  {
    "id": "q0697",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel canal relie l'océan Atlantique à l'océan Pacifique ?",
    "options": [
      "Le détroit de Béring",
      "Le canal de Suez",
      "Le canal de Panama",
      "Le détroit de Gibraltar"
    ],
    "reponse": 2
  },
  {
    "id": "q0698",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 au carré ?",
    "options": [
      "360",
      "361",
      "328",
      "387"
    ],
    "reponse": 1
  },
  {
    "id": "q0699",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Stockholm est la capitale de quel pays ?",
    "options": [
      "Népal",
      "Vietnam",
      "Bulgarie",
      "Suède"
    ],
    "reponse": 3
  },
  {
    "id": "q0700",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 221 ÷ 13 ?",
    "options": [
      "18",
      "13",
      "19",
      "17"
    ],
    "reponse": 3
  },
  {
    "id": "q0701",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sb » ?",
    "options": [
      "Sélénium",
      "Cérium",
      "Magnésium",
      "Antimoine"
    ],
    "reponse": 3
  },
  {
    "id": "q0702",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mexique ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q0703",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 8 min ?",
    "options": [
      "550",
      "403",
      "480",
      "559"
    ],
    "reponse": 2
  },
  {
    "id": "q0704",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1020 et 1276 ?",
    "options": [
      "237",
      "282",
      "256",
      "275"
    ],
    "reponse": 2
  },
  {
    "id": "q0705",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Finlande ?",
    "options": [
      "🇫🇮",
      "🇬🇪",
      "🇪🇹",
      "🇪🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q0706",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 31 siècle(s) ?",
    "options": [
      "2898",
      "3100",
      "2791",
      "3272"
    ],
    "reponse": 1
  },
  {
    "id": "q0707",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 42 ÷ 6 ?",
    "options": [
      "7",
      "4",
      "10",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q0708",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 441 ?",
    "options": [
      "20",
      "19",
      "21",
      "23"
    ],
    "reponse": 2
  },
  {
    "id": "q0709",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Yamoussoukro est la capitale de quel pays ?",
    "options": [
      "Costa Rica",
      "Vanuatu",
      "Qatar",
      "Côte d'Ivoire"
    ],
    "reponse": 3
  },
  {
    "id": "q0710",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Libye ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0711",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1171 et 1197 ?",
    "options": [
      "29",
      "25",
      "23",
      "26"
    ],
    "reponse": 3
  },
  {
    "id": "q0712",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre est le principal représentant du mouvement pop art américain avec ses boîtes de soupe Campbell ?",
    "options": [
      "Robert Rauschenberg",
      "Jasper Johns",
      "Roy Lichtenstein",
      "Andy Warhol"
    ],
    "reponse": 3
  },
  {
    "id": "q0713",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kuala Lumpur est la capitale de quel pays ?",
    "options": [
      "Lituanie",
      "Malaisie",
      "Chypre",
      "République démocratique du Congo"
    ],
    "reponse": 1
  },
  {
    "id": "q0714",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ukraine ?",
    "options": [
      "🇵🇪",
      "🇺🇦",
      "🇳🇦",
      "🇷🇸"
    ],
    "reponse": 1
  },
  {
    "id": "q0715",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nigeria ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0716",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Haïti ?",
    "options": [
      "Dollar namibien",
      "Gourde",
      "Dinar koweïtien",
      "Peso philippin"
    ],
    "reponse": 1
  },
  {
    "id": "q0717",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 545 - 480 ?",
    "options": [
      "68",
      "64",
      "62",
      "65"
    ],
    "reponse": 3
  },
  {
    "id": "q0718",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom du satellite naturel de la Terre ?",
    "options": [
      "Phobos",
      "Titan",
      "La Lune",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0719",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Qui a écrit « Le Nom de la rose » ?",
    "options": [
      "Italo Calvino",
      "Alberto Moravia",
      "Dario Fo",
      "Umberto Eco"
    ],
    "reponse": 3
  },
  {
    "id": "q0720",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cambodge ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Afrique",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0721",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Uruguay",
      "Belgique",
      "Guyana",
      "Suède"
    ],
    "reponse": 0
  },
  {
    "id": "q0722",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Germinal » et fait partie du mouvement naturaliste ?",
    "options": [
      "Alphonse Daudet",
      "Gustave Flaubert",
      "Guy de Maupassant",
      "Émile Zola"
    ],
    "reponse": 3
  },
  {
    "id": "q0723",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Roumanie ?",
    "options": [
      "🇷🇺",
      "🇸🇳",
      "🇿🇼",
      "🇷🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q0724",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Nb » ?",
    "options": [
      "Uranium",
      "Cadmium",
      "Niobium",
      "Cobalt"
    ],
    "reponse": 2
  },
  {
    "id": "q0725",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nouvelle-Zélande ?",
    "options": [
      "Europe",
      "Asie",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 3
  },
  {
    "id": "q0726",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 741 - 524 ?",
    "options": [
      "216",
      "217",
      "219",
      "218"
    ],
    "reponse": 1
  },
  {
    "id": "q0727",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de construction et de survie en blocs est développé par Mojang ?",
    "options": [
      "Terraria",
      "Minecraft",
      "Fortnite",
      "Roblox"
    ],
    "reponse": 1
  },
  {
    "id": "q0728",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Zimbabwe ?",
    "options": [
      "Harare",
      "Niamey",
      "Nicosie",
      "Port Moresby"
    ],
    "reponse": 0
  },
  {
    "id": "q0729",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 60 ?",
    "options": [
      "28",
      "27",
      "24",
      "26"
    ],
    "reponse": 2
  },
  {
    "id": "q0730",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1643 et 1863 ?",
    "options": [
      "220",
      "190",
      "212",
      "238"
    ],
    "reponse": 0
  },
  {
    "id": "q0731",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 70 ÷ 5 ?",
    "options": [
      "14",
      "13",
      "15",
      "12"
    ],
    "reponse": 0
  },
  {
    "id": "q0732",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 900 - 474 ?",
    "options": [
      "426",
      "427",
      "425",
      "429"
    ],
    "reponse": 0
  },
  {
    "id": "q0733",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1591 appartient à quel siècle ?",
    "options": [
      "17e siècle",
      "16e siècle",
      "14e siècle",
      "15e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0734",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Libye ?",
    "options": [
      "🇬🇧",
      "🇱🇾",
      "🇯🇴",
      "🇺🇦"
    ],
    "reponse": 1
  },
  {
    "id": "q0735",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Allemagne",
      "Côte d'Ivoire",
      "Moldavie",
      "Singapour"
    ],
    "reponse": 3
  },
  {
    "id": "q0736",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCXXXIX en chiffres romains ?",
    "options": [
      "1649",
      "1639",
      "1641",
      "1637"
    ],
    "reponse": 1
  },
  {
    "id": "q0737",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 206 en chiffres romains ?",
    "options": [
      "CCV",
      "CCVIII",
      "CCXVI",
      "CCVI"
    ],
    "reponse": 3
  },
  {
    "id": "q0738",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Madagascar ?",
    "options": [
      "Bagdad",
      "Brazzaville",
      "Apia",
      "Antananarivo"
    ],
    "reponse": 3
  },
  {
    "id": "q0739",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel empire romain a pris fin en 476 après J.-C. ?",
    "options": [
      "L'Empire carolingien",
      "L'Empire romain d'Orient",
      "L'Empire byzantin",
      "L'Empire romain d'Occident"
    ],
    "reponse": 3
  },
  {
    "id": "q0740",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 786 - 199 ?",
    "options": [
      "589",
      "584",
      "587",
      "588"
    ],
    "reponse": 2
  },
  {
    "id": "q0741",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ankara est la capitale de quel pays ?",
    "options": [
      "Libye",
      "Singapour",
      "Turquie",
      "Papouasie-Nouvelle-Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q0742",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1977 en chiffres romains ?",
    "options": [
      "MCMLXXVII",
      "MCMLXVII",
      "MCMLXXVIII",
      "MCMLXXV"
    ],
    "reponse": 0
  },
  {
    "id": "q0743",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du navigateur web développé par Google ?",
    "options": [
      "Edge",
      "Firefox",
      "Chrome",
      "Safari"
    ],
    "reponse": 2
  },
  {
    "id": "q0744",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 350 ml ?",
    "options": [
      "34",
      "37",
      "29",
      "35"
    ],
    "reponse": 3
  },
  {
    "id": "q0745",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Xe » ?",
    "options": [
      "Lanthane",
      "Palladium",
      "Arsenic",
      "Xénon"
    ],
    "reponse": 3
  },
  {
    "id": "q0746",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se pratique avec des quilles et une boule lourde percée de trois trous ?",
    "options": [
      "La pétanque",
      "Le bocce",
      "Le curling",
      "Le bowling"
    ],
    "reponse": 3
  },
  {
    "id": "q0747",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 8 m ?",
    "options": [
      "8000",
      "7187",
      "7681",
      "7523"
    ],
    "reponse": 0
  },
  {
    "id": "q0748",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 196 ?",
    "options": [
      "15",
      "14",
      "16",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q0749",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Suisse",
      "Panama",
      "Congo",
      "Nicaragua"
    ],
    "reponse": 3
  },
  {
    "id": "q0750",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Amsterdam est la capitale de quel pays ?",
    "options": [
      "Cameroun",
      "Sénégal",
      "Pays-Bas",
      "Namibie"
    ],
    "reponse": 2
  },
  {
    "id": "q0751",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 20 ?",
    "options": [
      "138",
      "140",
      "153",
      "156"
    ],
    "reponse": 1
  },
  {
    "id": "q0752",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Dans quel pays a été fondé le service de streaming musical Spotify ?",
    "options": [
      "L'Allemagne",
      "Les États-Unis",
      "La Suède",
      "Le Royaume-Uni"
    ],
    "reponse": 2
  },
  {
    "id": "q0753",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Portugal ?",
    "options": [
      "🇵🇹",
      "🇦🇴",
      "🇮🇩",
      "🇳🇱"
    ],
    "reponse": 0
  },
  {
    "id": "q0754",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Y » ?",
    "options": [
      "Brome",
      "Technétium",
      "Yttrium",
      "Néon"
    ],
    "reponse": 2
  },
  {
    "id": "q0755",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cuba ?",
    "options": [
      "Océanie",
      "Europe",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0756",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Comment écrit-on 2 en chiffres romains ?",
    "options": [
      "I",
      "III",
      "XII",
      "II"
    ],
    "reponse": 3
  },
  {
    "id": "q0757",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Lanthane ?",
    "options": [
      "Xe",
      "Au",
      "Ba",
      "La"
    ],
    "reponse": 3
  },
  {
    "id": "q0758",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 195 + 212 ?",
    "options": [
      "410",
      "407",
      "409",
      "406"
    ],
    "reponse": 1
  },
  {
    "id": "q0759",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat traditionnel suisse consiste à faire fondre du fromage pour y tremper du pain ?",
    "options": [
      "La raclette",
      "La croûte au fromage",
      "Le rösti",
      "La fondue"
    ],
    "reponse": 3
  },
  {
    "id": "q0760",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Rubidium ?",
    "options": [
      "Rb",
      "Rh",
      "Hg",
      "Ra"
    ],
    "reponse": 0
  },
  {
    "id": "q0761",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Samoa ?",
    "options": [
      "Kip",
      "Dinar koweïtien",
      "Tala",
      "Dollar surinamais"
    ],
    "reponse": 2
  },
  {
    "id": "q0762",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Rwanda ?",
    "options": [
      "🇷🇼",
      "🇨🇦",
      "🇱🇧",
      "🇨🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q0763",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Laos ?",
    "options": [
      "Naira",
      "Riyal yéménite",
      "Kip",
      "Dollar américain"
    ],
    "reponse": 2
  },
  {
    "id": "q0764",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu nordique est associé au tonnerre et manie un marteau nommé Mjöllnir ?",
    "options": [
      "Baldr",
      "Odin",
      "Thor",
      "Loki"
    ],
    "reponse": 2
  },
  {
    "id": "q0765",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Azerbaïdjan ?",
    "options": [
      "Denar macédonien",
      "Manat azerbaïdjanais",
      "Shilling tanzanien",
      "Roupie indonésienne"
    ],
    "reponse": 1
  },
  {
    "id": "q0766",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle particule subatomique porte une charge négative ?",
    "options": [
      "Le photon",
      "Le proton",
      "Le neutron",
      "L'électron"
    ],
    "reponse": 3
  },
  {
    "id": "q0767",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Qui a réalisé la trilogie « Le Seigneur des anneaux » ?",
    "options": [
      "Peter Jackson",
      "Steven Spielberg",
      "Ridley Scott",
      "James Cameron"
    ],
    "reponse": 0
  },
  {
    "id": "q0768",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Argentine ?",
    "options": [
      "Astana",
      "Wellington",
      "Kuala Lumpur",
      "Buenos Aires"
    ],
    "reponse": 3
  },
  {
    "id": "q0769",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Chrome ?",
    "options": [
      "Rn",
      "B",
      "Ar",
      "Cr"
    ],
    "reponse": 3
  },
  {
    "id": "q0770",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du processus par lequel les oiseaux migrateurs changent de région selon les saisons ?",
    "options": [
      "L'hibernation",
      "L'estivation",
      "La migration",
      "La mue"
    ],
    "reponse": 2
  },
  {
    "id": "q0771",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3703 en chiffres romains ?",
    "options": [
      "MMMDCCV",
      "MMMDCCIV",
      "MMMDCXCVIII",
      "MMMDCCIII"
    ],
    "reponse": 3
  },
  {
    "id": "q0772",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 27000 g ?",
    "options": [
      "23",
      "30",
      "25",
      "27"
    ],
    "reponse": 3
  },
  {
    "id": "q0773",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 6 ?",
    "options": [
      "48",
      "55",
      "49",
      "53"
    ],
    "reponse": 0
  },
  {
    "id": "q0774",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Espagne ?",
    "options": [
      "Afrique",
      "Europe",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0775",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Caracas est la capitale de quel pays ?",
    "options": [
      "Danemark",
      "Serbie",
      "Venezuela",
      "Arabie saoudite"
    ],
    "reponse": 2
  },
  {
    "id": "q0776",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 278 - 52 ?",
    "options": [
      "224",
      "228",
      "223",
      "226"
    ],
    "reponse": 3
  },
  {
    "id": "q0777",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 400 ?",
    "options": [
      "231",
      "229",
      "240",
      "210"
    ],
    "reponse": 2
  },
  {
    "id": "q0778",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 401 + 462 ?",
    "options": [
      "865",
      "862",
      "866",
      "863"
    ],
    "reponse": 3
  },
  {
    "id": "q0779",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation met en scène des jouets qui prennent vie, dont un cow-boy nommé Woody ?",
    "options": [
      "Cars",
      "Coco",
      "Toy Story",
      "Rebelle"
    ],
    "reponse": 2
  },
  {
    "id": "q0780",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quelle civilisation a construit les pyramides de Gizeh ?",
    "options": [
      "Les Mayas",
      "Les Égyptiens",
      "Les Babyloniens",
      "Les Romains"
    ],
    "reponse": 1
  },
  {
    "id": "q0781",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 11 × 7 ?",
    "options": [
      "72",
      "87",
      "77",
      "81"
    ],
    "reponse": 2
  },
  {
    "id": "q0782",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Luxembourg",
      "Philippines",
      "Kazakhstan",
      "Inde"
    ],
    "reponse": 1
  },
  {
    "id": "q0783",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport les athlètes utilisent-ils une perche pour franchir une barre en hauteur ?",
    "options": [
      "Le saut en longueur",
      "Le triple saut",
      "Le saut en hauteur",
      "Le saut à la perche"
    ],
    "reponse": 3
  },
  {
    "id": "q0784",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Congo ?",
    "options": [
      "Europe",
      "Afrique",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0785",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel empire a dominé le Moyen-Orient et l'Afrique du Nord jusqu'au début du XXe siècle ?",
    "options": [
      "L'Empire arabe",
      "L'Empire perse",
      "L'Empire byzantin",
      "L'Empire ottoman"
    ],
    "reponse": 3
  },
  {
    "id": "q0786",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Guyana ?",
    "options": [
      "🇨🇩",
      "🇬🇾",
      "🇱🇦",
      "🇰🇵"
    ],
    "reponse": 1
  },
  {
    "id": "q0787",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 237 + 822 ?",
    "options": [
      "1059",
      "1062",
      "1061",
      "1056"
    ],
    "reponse": 0
  },
  {
    "id": "q0788",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu grec règne sur les océans et les mers ?",
    "options": [
      "Poséidon",
      "Hadès",
      "Hermès",
      "Zeus"
    ],
    "reponse": 0
  },
  {
    "id": "q0789",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 126 ÷ 7 ?",
    "options": [
      "19",
      "14",
      "15",
      "18"
    ],
    "reponse": 3
  },
  {
    "id": "q0790",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République dominicaine ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0791",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Porto-Novo est la capitale de quel pays ?",
    "options": [
      "Koweït",
      "Bénin",
      "Sénégal",
      "Grèce"
    ],
    "reponse": 1
  },
  {
    "id": "q0792",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français est un assemblage de pâte feuilletée et de crème pâtissière en plusieurs couches ?",
    "options": [
      "Le paris-brest",
      "Le mille-feuille",
      "L'éclair",
      "Le saint-honoré"
    ],
    "reponse": 1
  },
  {
    "id": "q0793",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1586 et 1773 ?",
    "options": [
      "203",
      "155",
      "187",
      "164"
    ],
    "reponse": 2
  },
  {
    "id": "q0794",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle est la capitale la plus élevée en altitude de l'Union européenne ?",
    "options": [
      "Sofia",
      "Vienne",
      "Berne",
      "Madrid"
    ],
    "reponse": 3
  },
  {
    "id": "q0795",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 14 au carré ?",
    "options": [
      "203",
      "173",
      "179",
      "196"
    ],
    "reponse": 3
  },
  {
    "id": "q0796",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « À la recherche du temps perdu » ?",
    "options": [
      "Louis-Ferdinand Céline",
      "Colette",
      "Marcel Proust",
      "André Gide"
    ],
    "reponse": 2
  },
  {
    "id": "q0797",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Russie ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0798",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Hydrogène ?",
    "options": [
      "Mo",
      "H",
      "F",
      "B"
    ],
    "reponse": 1
  },
  {
    "id": "q0799",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Vietnam ?",
    "options": [
      "Hanoï",
      "Tegucigalpa",
      "Apia",
      "Georgetown"
    ],
    "reponse": 0
  },
  {
    "id": "q0800",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Prague est la capitale de quel pays ?",
    "options": [
      "République tchèque",
      "Belize",
      "Inde",
      "Lituanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0801",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Monténégro ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0802",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1407 et 1587 ?",
    "options": [
      "180",
      "160",
      "186",
      "150"
    ],
    "reponse": 0
  },
  {
    "id": "q0803",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur de Facebook, actuel dirigeant de Meta ?",
    "options": [
      "Sundar Pichai",
      "Jack Dorsey",
      "Evan Spiegel",
      "Mark Zuckerberg"
    ],
    "reponse": 3
  },
  {
    "id": "q0804",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène un vaisseau spatial explorant la galaxie, créée par Gene Roddenberry ?",
    "options": [
      "Battlestar Galactica",
      "Star Trek",
      "Stargate",
      "Star Wars"
    ],
    "reponse": 1
  },
  {
    "id": "q0805",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cl » ?",
    "options": [
      "Potassium",
      "Plomb",
      "Krypton",
      "Chlore"
    ],
    "reponse": 3
  },
  {
    "id": "q0806",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bosnie-Herzégovine ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0807",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Inde ?",
    "options": [
      "Roupie indienne",
      "Dinar tunisien",
      "Kina",
      "Dram"
    ],
    "reponse": 0
  },
  {
    "id": "q0808",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Nigeria",
      "France",
      "Arménie",
      "Lettonie"
    ],
    "reponse": 3
  },
  {
    "id": "q0809",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 19 ?",
    "options": [
      "376",
      "406",
      "361",
      "331"
    ],
    "reponse": 2
  },
  {
    "id": "q0810",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le nom du détroit séparant l'Europe de l'Afrique ?",
    "options": [
      "Le détroit de Bosphore",
      "Le détroit de Gibraltar",
      "Le détroit de Malacca",
      "Le détroit de Béring"
    ],
    "reponse": 1
  },
  {
    "id": "q0811",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle boisson alcoolisée est obtenue par la fermentation du raisin ?",
    "options": [
      "L'hydromel",
      "Le cidre",
      "Le vin",
      "La bière"
    ],
    "reponse": 2
  },
  {
    "id": "q0812",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 289 ?",
    "options": [
      "20",
      "19",
      "15",
      "17"
    ],
    "reponse": 3
  },
  {
    "id": "q0813",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ouzbékistan ?",
    "options": [
      "Peso argentin",
      "Dirham marocain",
      "Sum ouzbek",
      "Dollar australien"
    ],
    "reponse": 2
  },
  {
    "id": "q0814",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 453 en chiffres romains ?",
    "options": [
      "CDLIII",
      "CDXLVIII",
      "CDLII",
      "CDLV"
    ],
    "reponse": 0
  },
  {
    "id": "q0815",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tunis est la capitale de quel pays ?",
    "options": [
      "Cambodge",
      "Pakistan",
      "Tunisie",
      "Rwanda"
    ],
    "reponse": 2
  },
  {
    "id": "q0816",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien de dents possède un adulte humain en moyenne (dents de sagesse incluses) ?",
    "options": [
      "30",
      "32",
      "28",
      "34"
    ],
    "reponse": 1
  },
  {
    "id": "q0817",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Inde ?",
    "options": [
      "Afrique",
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q0818",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 27000 mm ?",
    "options": [
      "30",
      "31",
      "32",
      "27"
    ],
    "reponse": 3
  },
  {
    "id": "q0819",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 3 ?",
    "options": [
      "51",
      "44",
      "50",
      "58"
    ],
    "reponse": 0
  },
  {
    "id": "q0820",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 60 ?",
    "options": [
      "27",
      "30",
      "32",
      "25"
    ],
    "reponse": 1
  },
  {
    "id": "q0821",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Royaume-Uni ?",
    "options": [
      "🇬🇧",
      "🇨🇱",
      "🇬🇾",
      "🇲🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q0822",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sanaa est la capitale de quel pays ?",
    "options": [
      "Yémen",
      "El Salvador",
      "Liban",
      "Guatemala"
    ],
    "reponse": 0
  },
  {
    "id": "q0823",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 1000 ?",
    "options": [
      "100",
      "96",
      "95",
      "110"
    ],
    "reponse": 0
  },
  {
    "id": "q0824",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bamako est la capitale de quel pays ?",
    "options": [
      "Myanmar",
      "Mali",
      "Guyana",
      "Jamaïque"
    ],
    "reponse": 1
  },
  {
    "id": "q0825",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 14 ?",
    "options": [
      "70",
      "68",
      "77",
      "76"
    ],
    "reponse": 0
  },
  {
    "id": "q0826",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Belgique ?",
    "options": [
      "🇺🇬",
      "🇫🇯",
      "🇧🇷",
      "🇧🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q0827",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Qui a écrit « Le Journal d'un fou » et « Les Âmes mortes » ?",
    "options": [
      "Fiodor Dostoïevski",
      "Ivan Tourgueniev",
      "Léon Tolstoï",
      "Nicolas Gogol"
    ],
    "reponse": 3
  },
  {
    "id": "q0828",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Zimbabwe ?",
    "options": [
      "🇰🇷",
      "🇮🇸",
      "🇺🇬",
      "🇿🇼"
    ],
    "reponse": 3
  },
  {
    "id": "q0829",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel format d'image est souvent utilisé pour les photos avec compression, portant l'extension .jpg ?",
    "options": [
      "GIF",
      "BMP",
      "JPEG",
      "PNG"
    ],
    "reponse": 2
  },
  {
    "id": "q0830",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport porte-t-on un « judogi » ?",
    "options": [
      "L'aïkido",
      "Le karaté",
      "Le judo",
      "Le taekwondo"
    ],
    "reponse": 2
  },
  {
    "id": "q0831",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Rabat est la capitale de quel pays ?",
    "options": [
      "Lettonie",
      "Malte",
      "Maroc",
      "Belgique"
    ],
    "reponse": 2
  },
  {
    "id": "q0832",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Lituanie ?",
    "options": [
      "🇾🇪",
      "🇲🇩",
      "🇲🇹",
      "🇱🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q0833",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nouakchott est la capitale de quel pays ?",
    "options": [
      "Laos",
      "Mauritanie",
      "Liban",
      "Thaïlande"
    ],
    "reponse": 1
  },
  {
    "id": "q0834",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 105 + 936 ?",
    "options": [
      "1039",
      "1038",
      "1040",
      "1041"
    ],
    "reponse": 3
  },
  {
    "id": "q0835",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 306 en chiffres romains ?",
    "options": [
      "CCCXVI",
      "CCCI",
      "CCCVI",
      "CCCVII"
    ],
    "reponse": 2
  },
  {
    "id": "q0836",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Tc » ?",
    "options": [
      "Molybdène",
      "Cadmium",
      "Étain",
      "Technétium"
    ],
    "reponse": 3
  },
  {
    "id": "q0837",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Algérie ?",
    "options": [
      "Asie",
      "Amérique du Sud",
      "Océanie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0838",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇫 De quel pays est-ce le drapeau ?",
    "options": [
      "Thaïlande",
      "Kenya",
      "Iran",
      "Burkina Faso"
    ],
    "reponse": 3
  },
  {
    "id": "q0839",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle chaîne de montagnes sépare l'Europe et l'Asie ?",
    "options": [
      "L'Oural",
      "Les Carpates",
      "Le Caucase",
      "Les Alpes"
    ],
    "reponse": 0
  },
  {
    "id": "q0840",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport les concurrents s'affrontent-ils en effectuant des figures sur une planche à roulettes ?",
    "options": [
      "La trottinette freestyle",
      "Le roller",
      "Le BMX",
      "Le skateboard"
    ],
    "reponse": 3
  },
  {
    "id": "q0841",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sofia est la capitale de quel pays ?",
    "options": [
      "Brésil",
      "Bulgarie",
      "Colombie",
      "France"
    ],
    "reponse": 1
  },
  {
    "id": "q0842",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Paraguay",
      "Pérou",
      "Panama",
      "Nouvelle-Zélande"
    ],
    "reponse": 0
  },
  {
    "id": "q0843",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Kenya",
      "Koweït",
      "Ouganda",
      "Jamaïque"
    ],
    "reponse": 2
  },
  {
    "id": "q0844",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la République tchèque ?",
    "options": [
      "Couronne tchèque",
      "Sol péruvien",
      "Balboa",
      "Tenge"
    ],
    "reponse": 0
  },
  {
    "id": "q0845",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel navire britannique a coulé en 1912 après avoir heurté un iceberg ?",
    "options": [
      "Le Titanic",
      "Le Britannic",
      "Le Lusitania",
      "Le Queen Mary"
    ],
    "reponse": 0
  },
  {
    "id": "q0846",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Panama ?",
    "options": [
      "Balboa",
      "Dollar américain",
      "Couronne islandaise",
      "Bolivar"
    ],
    "reponse": 0
  },
  {
    "id": "q0847",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mg dans 11 g ?",
    "options": [
      "11000",
      "12820",
      "9527",
      "9802"
    ],
    "reponse": 0
  },
  {
    "id": "q0848",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kenya ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q0849",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Yttrium ?",
    "options": [
      "Cu",
      "Hg",
      "Y",
      "Se"
    ],
    "reponse": 2
  },
  {
    "id": "q0850",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 587 - 5 ?",
    "options": [
      "582",
      "580",
      "585",
      "581"
    ],
    "reponse": 0
  },
  {
    "id": "q0851",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République démocratique du Congo ?",
    "options": [
      "🇨🇩",
      "🇧🇬",
      "🇵🇬",
      "🇮🇩"
    ],
    "reponse": 0
  },
  {
    "id": "q0852",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mg » ?",
    "options": [
      "Magnésium",
      "Cuivre",
      "Technétium",
      "Béryllium"
    ],
    "reponse": 0
  },
  {
    "id": "q0853",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 140 mm ?",
    "options": [
      "14",
      "17",
      "10",
      "13"
    ],
    "reponse": 0
  },
  {
    "id": "q0854",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCLXVIII en chiffres romains ?",
    "options": [
      "670",
      "669",
      "667",
      "668"
    ],
    "reponse": 3
  },
  {
    "id": "q0855",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat portugais est une pâtisserie à base de crème et de pâte feuilletée, très populaire à Lisbonne ?",
    "options": [
      "Le queijadas",
      "Le pão de ló",
      "Le pastel de nata",
      "Le bolo de arroz"
    ],
    "reponse": 2
  },
  {
    "id": "q0856",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 3 ?",
    "options": [
      "57",
      "54",
      "47",
      "49"
    ],
    "reponse": 1
  },
  {
    "id": "q0857",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel sculpteur français est l'auteur du « Penseur » et des « Bourgeois de Calais » ?",
    "options": [
      "Antoine Bourdelle",
      "Aristide Maillol",
      "Camille Claudel",
      "Auguste Rodin"
    ],
    "reponse": 3
  },
  {
    "id": "q0858",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 au carré ?",
    "options": [
      "324",
      "347",
      "298",
      "284"
    ],
    "reponse": 0
  },
  {
    "id": "q0859",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1900 appartient à quel siècle ?",
    "options": [
      "17e siècle",
      "19e siècle",
      "18e siècle",
      "20e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0860",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 2 ?",
    "options": [
      "38",
      "36",
      "37",
      "40"
    ],
    "reponse": 0
  },
  {
    "id": "q0861",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Belgique",
      "Serbie",
      "Botswana",
      "Bangladesh"
    ],
    "reponse": 3
  },
  {
    "id": "q0862",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCL en chiffres romains ?",
    "options": [
      "1351",
      "1345",
      "1350",
      "1348"
    ],
    "reponse": 2
  },
  {
    "id": "q0863",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de combat met en scène des personnages comme Ryu et Ken ?",
    "options": [
      "King of Fighters",
      "Street Fighter",
      "Tekken",
      "Mortal Kombat"
    ],
    "reponse": 1
  },
  {
    "id": "q0864",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ge » ?",
    "options": [
      "Carbone",
      "Strontium",
      "Germanium",
      "Platine"
    ],
    "reponse": 2
  },
  {
    "id": "q0865",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Canada ?",
    "options": [
      "Singapour",
      "Ottawa",
      "Ljubljana",
      "Varsovie"
    ],
    "reponse": 1
  },
  {
    "id": "q0866",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Moldavie",
      "Congo",
      "Roumanie",
      "Vanuatu"
    ],
    "reponse": 0
  },
  {
    "id": "q0867",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 120 ?",
    "options": [
      "36",
      "32",
      "31",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q0868",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1796 et 1801 ?",
    "options": [
      "5",
      "8",
      "3",
      "4"
    ],
    "reponse": 0
  },
  {
    "id": "q0869",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a créé le moteur de recherche Bing ?",
    "options": [
      "Amazon",
      "Google",
      "Microsoft",
      "Yahoo"
    ],
    "reponse": 2
  },
  {
    "id": "q0870",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Algérie ?",
    "options": [
      "Alger",
      "Tachkent",
      "Berne",
      "Phnom Penh"
    ],
    "reponse": 0
  },
  {
    "id": "q0871",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation Pixar raconte l'histoire d'un vieil homme qui fait voler sa maison avec des ballons ?",
    "options": [
      "Coco",
      "Vice-versa",
      "Le Voyage d'Arlo",
      "Là-haut"
    ],
    "reponse": 3
  },
  {
    "id": "q0872",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 75 % de 800 ?",
    "options": [
      "534",
      "600",
      "526",
      "573"
    ],
    "reponse": 1
  },
  {
    "id": "q0873",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est le leader du groupe The Rolling Stones ?",
    "options": [
      "Mick Jagger",
      "Charlie Watts",
      "Keith Richards",
      "Ronnie Wood"
    ],
    "reponse": 0
  },
  {
    "id": "q0874",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chili ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q0875",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouganda",
      "Paraguay",
      "Ouzbékistan",
      "République dominicaine"
    ],
    "reponse": 2
  },
  {
    "id": "q0876",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se pratique avec des fleurets, des épées ou des sabres ?",
    "options": [
      "Le pentathlon",
      "Le tir à l'arc",
      "La lutte",
      "L'escrime"
    ],
    "reponse": 3
  },
  {
    "id": "q0877",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Espagne ?",
    "options": [
      "Asuncion",
      "Saint-Domingue",
      "Accra",
      "Madrid"
    ],
    "reponse": 3
  },
  {
    "id": "q0878",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Naypyidaw est la capitale de quel pays ?",
    "options": [
      "Serbie",
      "Sénégal",
      "Myanmar",
      "Brésil"
    ],
    "reponse": 2
  },
  {
    "id": "q0879",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MXVIII en chiffres romains ?",
    "options": [
      "1019",
      "1008",
      "1018",
      "1013"
    ],
    "reponse": 2
  },
  {
    "id": "q0880",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Finlande ?",
    "options": [
      "Skopje",
      "Libreville",
      "Lima",
      "Helsinki"
    ],
    "reponse": 3
  },
  {
    "id": "q0881",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 16 kg ?",
    "options": [
      "16492",
      "17560",
      "16000",
      "16932"
    ],
    "reponse": 2
  },
  {
    "id": "q0882",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1119 et 1312 ?",
    "options": [
      "174",
      "225",
      "193",
      "203"
    ],
    "reponse": 2
  },
  {
    "id": "q0883",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Albanie ?",
    "options": [
      "🇱🇧",
      "🇹🇭",
      "🇦🇱",
      "🇭🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q0884",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Belize ?",
    "options": [
      "🇸🇷",
      "🇧🇿",
      "🇱🇾",
      "🇭🇷"
    ],
    "reponse": 1
  },
  {
    "id": "q0885",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3769 en chiffres romains ?",
    "options": [
      "MMMDCCLXVIII",
      "MMMDCCLXXI",
      "MMMDCCLXIX",
      "MMMDCCLXIV"
    ],
    "reponse": 2
  },
  {
    "id": "q0886",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle actrice a incarné Katniss Everdeen dans « Hunger Games » ?",
    "options": [
      "Kristen Stewart",
      "Shailene Woodley",
      "Emma Stone",
      "Jennifer Lawrence"
    ],
    "reponse": 3
  },
  {
    "id": "q0887",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est capable de porter jusqu'à plusieurs fois son propre poids, symbole de force chez les insectes ?",
    "options": [
      "La fourmi",
      "La sauterelle",
      "Le scarabée",
      "L'abeille"
    ],
    "reponse": 0
  },
  {
    "id": "q0888",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "El Salvador",
      "Espagne",
      "Nigeria"
    ],
    "reponse": 2
  },
  {
    "id": "q0889",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 10 ?",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q0890",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Te » ?",
    "options": [
      "Baryum",
      "Tellure",
      "Chlore",
      "Fer"
    ],
    "reponse": 1
  },
  {
    "id": "q0891",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui est l'auteur du « Journal d'Anne Frank » ?",
    "options": [
      "Viktor Frankl",
      "Primo Levi",
      "Anne Frank",
      "Elie Wiesel"
    ],
    "reponse": 2
  },
  {
    "id": "q0892",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle et d'action met en scène un sorcier nommé Geralt de Riv ?",
    "options": [
      "Dragon Age",
      "The Witcher",
      "Dark Souls",
      "Skyrim"
    ],
    "reponse": 1
  },
  {
    "id": "q0893",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel violoniste et compositeur italien du XVIIIe siècle est réputé pour sa virtuosité légendaire ?",
    "options": [
      "Giuseppe Tartini",
      "Arcangelo Corelli",
      "Niccolò Paganini",
      "Antonio Vivaldi"
    ],
    "reponse": 2
  },
  {
    "id": "q0894",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Géorgie ?",
    "options": [
      "Afrique",
      "Asie",
      "Europe",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0895",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Tanzanie",
      "Gabon",
      "El Salvador",
      "Jamaïque"
    ],
    "reponse": 2
  },
  {
    "id": "q0896",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Tunisie",
      "Hongrie",
      "Suède",
      "Azerbaïdjan"
    ],
    "reponse": 0
  },
  {
    "id": "q0897",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1692 en chiffres romains ?",
    "options": [
      "MDCXCIV",
      "MDCLXXXVII",
      "MDCXCVII",
      "MDCXCII"
    ],
    "reponse": 3
  },
  {
    "id": "q0898",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCXXIX en chiffres romains ?",
    "options": [
      "1324",
      "1327",
      "1339",
      "1329"
    ],
    "reponse": 3
  },
  {
    "id": "q0899",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Biélorussie ?",
    "options": [
      "Ottawa",
      "Athènes",
      "Phnom Penh",
      "Minsk"
    ],
    "reponse": 3
  },
  {
    "id": "q0900",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kenya ?",
    "options": [
      "Asuncion",
      "Nairobi",
      "Suva",
      "Minsk"
    ],
    "reponse": 1
  },
  {
    "id": "q0901",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 × 12 ?",
    "options": [
      "84",
      "83",
      "85",
      "75"
    ],
    "reponse": 0
  },
  {
    "id": "q0902",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Estonie ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q0903",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la formule chimique de l'eau ?",
    "options": [
      "CO2",
      "H2O2",
      "H2O",
      "O2"
    ],
    "reponse": 2
  },
  {
    "id": "q0904",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 426 + 191 ?",
    "options": [
      "617",
      "616",
      "618",
      "620"
    ],
    "reponse": 0
  },
  {
    "id": "q0905",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit les aventures de Tintin ?",
    "options": [
      "Hergé",
      "Franquin",
      "Peyo",
      "Morris"
    ],
    "reponse": 0
  },
  {
    "id": "q0906",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Singapour ?",
    "options": [
      "Dollar de Singapour",
      "Won sud-coréen",
      "Couronne islandaise",
      "Colon costaricain"
    ],
    "reponse": 0
  },
  {
    "id": "q0907",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel Titan a offert le feu aux hommes, défiant les dieux, et fut puni éternellement ?",
    "options": [
      "Atlas",
      "Prométhée",
      "Épiméthée",
      "Cronos"
    ],
    "reponse": 1
  },
  {
    "id": "q0908",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1094 en chiffres romains ?",
    "options": [
      "MXCIII",
      "MXCIX",
      "MCIV",
      "MXCIV"
    ],
    "reponse": 3
  },
  {
    "id": "q0909",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle est la plus haute montagne du monde ?",
    "options": [
      "Le Kilimandjaro",
      "Le Mont Blanc",
      "L'Everest",
      "Le K2"
    ],
    "reponse": 2
  },
  {
    "id": "q0910",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇨 De quel pays est-ce le drapeau ?",
    "options": [
      "Estonie",
      "Philippines",
      "Équateur",
      "Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q0911",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Yémen ?",
    "options": [
      "Livre syrienne",
      "Roupie népalaise",
      "Riyal yéménite",
      "Dollar namibien"
    ],
    "reponse": 2
  },
  {
    "id": "q0912",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 4 × 18 ?",
    "options": [
      "71",
      "70",
      "72",
      "73"
    ],
    "reponse": 2
  },
  {
    "id": "q0913",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de mètres mesure une piscine olympique ?",
    "options": [
      "50 mètres",
      "33 mètres",
      "25 mètres",
      "100 mètres"
    ],
    "reponse": 0
  },
  {
    "id": "q0914",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Pologne ?",
    "options": [
      "Sofia",
      "Conakry",
      "Varsovie",
      "Damas"
    ],
    "reponse": 2
  },
  {
    "id": "q0915",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Chypre ?",
    "options": [
      "Tegucigalpa",
      "Addis-Abeba",
      "Bagdad",
      "Nicosie"
    ],
    "reponse": 3
  },
  {
    "id": "q0916",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel grand lac africain borde le Kenya, l'Ouganda et la Tanzanie ?",
    "options": [
      "Le lac Victoria",
      "Le lac Tanganyika",
      "Le lac Tchad",
      "Le lac Malawi"
    ],
    "reponse": 0
  },
  {
    "id": "q0917",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chine ?",
    "options": [
      "Asie",
      "Afrique",
      "Europe",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0918",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays est célèbre pour ses geysers et ses volcans, surnommé « terre de glace et de feu » ?",
    "options": [
      "La Finlande",
      "L'Islande",
      "Le Groenland",
      "La Norvège"
    ],
    "reponse": 1
  },
  {
    "id": "q0919",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle région désertique s'étend sur le sud-ouest des États-Unis et le nord du Mexique ?",
    "options": [
      "Le désert de Sonora",
      "Le désert de Mojave",
      "Le désert de Chihuahua",
      "Le désert d'Atacama"
    ],
    "reponse": 0
  },
  {
    "id": "q0920",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 175 - 39 ?",
    "options": [
      "138",
      "133",
      "136",
      "134"
    ],
    "reponse": 2
  },
  {
    "id": "q0921",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Togo ?",
    "options": [
      "Denar macédonien",
      "Rouble biélorusse",
      "Birr",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q0922",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 7 ?",
    "options": [
      "35",
      "43",
      "42",
      "38"
    ],
    "reponse": 2
  },
  {
    "id": "q0923",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Mali",
      "Chypre",
      "Corée du Sud",
      "Slovénie"
    ],
    "reponse": 2
  },
  {
    "id": "q0924",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre autrichien est célèbre pour son tableau doré « Le Baiser » ?",
    "options": [
      "Oskar Kokoschka",
      "Edvard Munch",
      "Egon Schiele",
      "Gustav Klimt"
    ],
    "reponse": 3
  },
  {
    "id": "q0925",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel organe humain est responsable de la filtration du sang et de la production d'urine ?",
    "options": [
      "Le rein",
      "Le pancréas",
      "La vessie",
      "Le foie"
    ],
    "reponse": 0
  },
  {
    "id": "q0926",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1459 et 1553 ?",
    "options": [
      "94",
      "101",
      "79",
      "84"
    ],
    "reponse": 0
  },
  {
    "id": "q0927",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 25 ?",
    "options": [
      "3",
      "5",
      "4",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q0928",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 276 - 1 ?",
    "options": [
      "275",
      "276",
      "273",
      "274"
    ],
    "reponse": 0
  },
  {
    "id": "q0929",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rn » ?",
    "options": [
      "Étain",
      "Arsenic",
      "Radon",
      "Niobium"
    ],
    "reponse": 2
  },
  {
    "id": "q0930",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 1000 ?",
    "options": [
      "217",
      "193",
      "200",
      "225"
    ],
    "reponse": 2
  },
  {
    "id": "q0931",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Slovaquie ?",
    "options": [
      "Euro",
      "Dram",
      "Kwanza",
      "Dinar koweïtien"
    ],
    "reponse": 0
  },
  {
    "id": "q0932",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays a pour capitale Berne, bien que ce ne soit pas sa plus grande ville ?",
    "options": [
      "L'Autriche",
      "La Suisse",
      "Les Pays-Bas",
      "La Belgique"
    ],
    "reponse": 1
  },
  {
    "id": "q0933",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Afghanistan ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0934",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Suède ?",
    "options": [
      "Kyat",
      "Couronne suédoise",
      "Dollar de Singapour",
      "Cedi"
    ],
    "reponse": 1
  },
  {
    "id": "q0935",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 10 ?",
    "options": [
      "1",
      "6",
      "3",
      "4"
    ],
    "reponse": 2
  },
  {
    "id": "q0936",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Tanzanie ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Océanie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0937",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Laos ?",
    "options": [
      "Séoul",
      "Nairobi",
      "Bangkok",
      "Vientiane"
    ],
    "reponse": 3
  },
  {
    "id": "q0938",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 36 ?",
    "options": [
      "9",
      "5",
      "7",
      "6"
    ],
    "reponse": 3
  },
  {
    "id": "q0939",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 12 × 19 ?",
    "options": [
      "238",
      "250",
      "228",
      "214"
    ],
    "reponse": 2
  },
  {
    "id": "q0940",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Thaïlande ?",
    "options": [
      "Franc guinéen",
      "Peso argentin",
      "Couronne norvégienne",
      "Baht"
    ],
    "reponse": 3
  },
  {
    "id": "q0941",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Helsinki est la capitale de quel pays ?",
    "options": [
      "Cuba",
      "Finlande",
      "Corée du Sud",
      "Arabie saoudite"
    ],
    "reponse": 1
  },
  {
    "id": "q0942",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Niger ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0943",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "San José est la capitale de quel pays ?",
    "options": [
      "Costa Rica",
      "Chypre",
      "Estonie",
      "Algérie"
    ],
    "reponse": 0
  },
  {
    "id": "q0944",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation met en scène un ogre nommé Shrek ?",
    "options": [
      "Shrek",
      "Hotel Transylvania",
      "Trolls",
      "Les Croods"
    ],
    "reponse": 0
  },
  {
    "id": "q0945",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bratislava est la capitale de quel pays ?",
    "options": [
      "El Salvador",
      "Madagascar",
      "Slovaquie",
      "Turquie"
    ],
    "reponse": 2
  },
  {
    "id": "q0946",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dakar est la capitale de quel pays ?",
    "options": [
      "Angola",
      "Sénégal",
      "Philippines",
      "Gabon"
    ],
    "reponse": 1
  },
  {
    "id": "q0947",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle déesse grecque personnifie la Terre nourricière, mère des Titans ?",
    "options": [
      "Gaïa",
      "Héra",
      "Rhéa",
      "Déméter"
    ],
    "reponse": 0
  },
  {
    "id": "q0948",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Myanmar ?",
    "options": [
      "🇯🇲",
      "🇦🇴",
      "🇮🇩",
      "🇲🇲"
    ],
    "reponse": 3
  },
  {
    "id": "q0949",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1688 et 1833 ?",
    "options": [
      "145",
      "160",
      "134",
      "154"
    ],
    "reponse": 0
  },
  {
    "id": "q0950",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1243 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "11e siècle",
      "13e siècle",
      "12e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0951",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1535 en chiffres romains ?",
    "options": [
      "MDXXXVII",
      "MDXXXV",
      "MDXXXIII",
      "MDXXX"
    ],
    "reponse": 1
  },
  {
    "id": "q0952",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3111 en chiffres romains ?",
    "options": [
      "MMMCIX",
      "MMMCXIII",
      "MMMCXI",
      "MMMCVI"
    ],
    "reponse": 2
  },
  {
    "id": "q0953",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle ville portuaire du Maroc fait face à Gibraltar ?",
    "options": [
      "Tanger",
      "Rabat",
      "Agadir",
      "Casablanca"
    ],
    "reponse": 0
  },
  {
    "id": "q0954",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français flambé est traditionnellement préparé avec des crêpes, du beurre, du sucre et une liqueur d'orange ?",
    "options": [
      "Le vacherin",
      "Les bananes flambées",
      "La crêpe Suzette",
      "Le baba au rhum"
    ],
    "reponse": 2
  },
  {
    "id": "q0955",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Zinc ?",
    "options": [
      "Zn",
      "Fe",
      "Ra",
      "C"
    ],
    "reponse": 0
  },
  {
    "id": "q0956",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle ville est la capitale économique du Nigeria, bien que ce ne soit pas la capitale politique ?",
    "options": [
      "Kano",
      "Ibadan",
      "Lagos",
      "Abuja"
    ],
    "reponse": 2
  },
  {
    "id": "q0957",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « Wi-Fi » à l'origine, ou du moins la technologie qu'il désigne ?",
    "options": [
      "Wide Field",
      "Wired Fidelity",
      "Wireless Fiber",
      "Une norme de réseau sans fil (Wireless Fidelity)"
    ],
    "reponse": 3
  },
  {
    "id": "q0958",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Argentine ?",
    "options": [
      "Leu roumain",
      "Kwacha zambien",
      "Dollar fidjien",
      "Peso argentin"
    ],
    "reponse": 3
  },
  {
    "id": "q0959",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ru » ?",
    "options": [
      "Calcium",
      "Étain",
      "Ruthénium",
      "Arsenic"
    ],
    "reponse": 2
  },
  {
    "id": "q0960",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du service de messagerie électronique gratuit lancé par Google en 2004 ?",
    "options": [
      "Gmail",
      "Outlook",
      "Yahoo Mail",
      "Hotmail"
    ],
    "reponse": 0
  },
  {
    "id": "q0961",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 900 ?",
    "options": [
      "31",
      "25",
      "27",
      "30"
    ],
    "reponse": 3
  },
  {
    "id": "q0962",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 786 - 243 ?",
    "options": [
      "543",
      "541",
      "545",
      "542"
    ],
    "reponse": 0
  },
  {
    "id": "q0963",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Russie ?",
    "options": [
      "Hryvnia",
      "Rouble russe",
      "Birr",
      "Afghani"
    ],
    "reponse": 1
  },
  {
    "id": "q0964",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Slovaquie ?",
    "options": [
      "🇲🇹",
      "🇧🇦",
      "🇦🇫",
      "🇸🇰"
    ],
    "reponse": 3
  },
  {
    "id": "q0965",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 639 - 195 ?",
    "options": [
      "442",
      "444",
      "447",
      "443"
    ],
    "reponse": 1
  },
  {
    "id": "q0966",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Qatar ?",
    "options": [
      "Téhéran",
      "Belgrade",
      "Sofia",
      "Doha"
    ],
    "reponse": 3
  },
  {
    "id": "q0967",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mexique ?",
    "options": [
      "Dollar néo-zélandais",
      "Dirham marocain",
      "Won nord-coréen",
      "Peso mexicain"
    ],
    "reponse": 3
  },
  {
    "id": "q0968",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien de la mort et de la renaissance est aussi le juge des âmes ?",
    "options": [
      "Osiris",
      "Seth",
      "Anubis",
      "Rê"
    ],
    "reponse": 0
  },
  {
    "id": "q0969",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 232 + 460 ?",
    "options": [
      "693",
      "692",
      "694",
      "691"
    ],
    "reponse": 1
  },
  {
    "id": "q0970",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation met en scène une équipe de jeunes super-héros menée par Robin ?",
    "options": [
      "Teen Titans",
      "Justice League",
      "Umbrella Academy",
      "Young Justice"
    ],
    "reponse": 0
  },
  {
    "id": "q0971",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 × 3 ?",
    "options": [
      "30",
      "28",
      "31",
      "25"
    ],
    "reponse": 0
  },
  {
    "id": "q0972",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 456 en chiffres romains ?",
    "options": [
      "CDLI",
      "CDLVI",
      "CDXLVI",
      "CDLXI"
    ],
    "reponse": 1
  },
  {
    "id": "q0973",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCLVI en chiffres romains ?",
    "options": [
      "3256",
      "3251",
      "3254",
      "3266"
    ],
    "reponse": 0
  },
  {
    "id": "q0974",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Tanzanie",
      "Luxembourg",
      "République tchèque",
      "Gabon"
    ],
    "reponse": 0
  },
  {
    "id": "q0975",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 29 cm ?",
    "options": [
      "276",
      "290",
      "267",
      "247"
    ],
    "reponse": 1
  },
  {
    "id": "q0976",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 800 ?",
    "options": [
      "221",
      "240",
      "214",
      "267"
    ],
    "reponse": 1
  },
  {
    "id": "q0977",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Malaisie ?",
    "options": [
      "🇲🇪",
      "🇨🇱",
      "🇲🇾",
      "🇸🇰"
    ],
    "reponse": 2
  },
  {
    "id": "q0978",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 26 année(s) ?",
    "options": [
      "312",
      "318",
      "277",
      "328"
    ],
    "reponse": 0
  },
  {
    "id": "q0979",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Azerbaïdjan ?",
    "options": [
      "🇦🇿",
      "🇬🇳",
      "🇺🇦",
      "🇦🇷"
    ],
    "reponse": 0
  },
  {
    "id": "q0980",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel est le nom du premier ordinateur personnel grand public d'Apple, sorti en 1984 ?",
    "options": [
      "Le Lisa",
      "L'Apple II",
      "L'iMac",
      "Le Macintosh"
    ],
    "reponse": 3
  },
  {
    "id": "q0981",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Iran ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0982",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Luxembourg est la capitale de quel pays ?",
    "options": [
      "Philippines",
      "Kazakhstan",
      "Luxembourg",
      "Bulgarie"
    ],
    "reponse": 2
  },
  {
    "id": "q0983",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Arsenic ?",
    "options": [
      "Sb",
      "Cs",
      "As",
      "Ca"
    ],
    "reponse": 2
  },
  {
    "id": "q0984",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel fleuve américain est le plus long d'Amérique du Nord ?",
    "options": [
      "Le Colorado",
      "Le Rio Grande",
      "Le Mississippi",
      "Le Missouri"
    ],
    "reponse": 2
  },
  {
    "id": "q0985",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel gâteau traditionnel allemand en forme de bûche est fait de fines couches successives cuites au four ?",
    "options": [
      "Le baumkuchen",
      "Le stollen",
      "Le strudel",
      "La forêt-noire"
    ],
    "reponse": 0
  },
  {
    "id": "q0986",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « GPU » ?",
    "options": [
      "Gaming Processing Unit",
      "General Processing Unit",
      "Global Processor Utility",
      "Graphics Processing Unit"
    ],
    "reponse": 3
  },
  {
    "id": "q0987",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mali ?",
    "options": [
      "Franc CFA",
      "Livre libanaise",
      "Mark convertible",
      "Couronne tchèque"
    ],
    "reponse": 0
  },
  {
    "id": "q0988",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 1600 cm ?",
    "options": [
      "20",
      "18",
      "16",
      "17"
    ],
    "reponse": 2
  },
  {
    "id": "q0989",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Syrie",
      "Soudan",
      "Algérie",
      "Papouasie-Nouvelle-Guinée"
    ],
    "reponse": 3
  },
  {
    "id": "q0990",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le plus grand désert chaud du monde ?",
    "options": [
      "Le Sahara",
      "Le désert de Gobi",
      "Le désert du Kalahari",
      "Le désert d'Atacama"
    ],
    "reponse": 0
  },
  {
    "id": "q0991",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 336 ÷ 14 ?",
    "options": [
      "27",
      "24",
      "26",
      "19"
    ],
    "reponse": 1
  },
  {
    "id": "q0992",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Irak ?",
    "options": [
      "Tbilissi",
      "Kuala Lumpur",
      "Montevideo",
      "Bagdad"
    ],
    "reponse": 3
  },
  {
    "id": "q0993",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de course automobile met en scène des personnages Nintendo sur des karts ?",
    "options": [
      "Mario Kart",
      "Sonic & All-Stars Racing",
      "Crash Team Racing",
      "Diddy Kong Racing"
    ],
    "reponse": 0
  },
  {
    "id": "q0994",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de km dans 2000 m ?",
    "options": [
      "2",
      "1",
      "4",
      "3"
    ],
    "reponse": 0
  },
  {
    "id": "q0995",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1982 en chiffres romains ?",
    "options": [
      "MCMLXXXII",
      "MCMLXXXIV",
      "MCMLXXXIII",
      "MCMLXXXI"
    ],
    "reponse": 0
  },
  {
    "id": "q0996",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel rongeur bâtit des barrages sur les rivières avec du bois ?",
    "options": [
      "Le ragondin",
      "La loutre",
      "Le castor",
      "Le rat musqué"
    ],
    "reponse": 2
  },
  {
    "id": "q0997",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 197 + 749 ?",
    "options": [
      "944",
      "947",
      "948",
      "946"
    ],
    "reponse": 3
  },
  {
    "id": "q0998",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 17 ?",
    "options": [
      "119",
      "113",
      "129",
      "104"
    ],
    "reponse": 0
  },
  {
    "id": "q0999",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Alger est la capitale de quel pays ?",
    "options": [
      "Cambodge",
      "Algérie",
      "Lituanie",
      "Bangladesh"
    ],
    "reponse": 1
  },
  {
    "id": "q1000",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Russie ?",
    "options": [
      "Moscou",
      "Accra",
      "Caracas",
      "Sarajevo"
    ],
    "reponse": 0
  },
  {
    "id": "q1001",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Malaisie ?",
    "options": [
      "Brasilia",
      "Kuala Lumpur",
      "Chisinau",
      "San Salvador"
    ],
    "reponse": 1
  },
  {
    "id": "q1002",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Pologne ?",
    "options": [
      "Dinar jordanien",
      "Couronne islandaise",
      "Dollar jamaïcain",
      "Zloty"
    ],
    "reponse": 3
  },
  {
    "id": "q1003",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 4 ?",
    "options": [
      "50",
      "56",
      "59",
      "60"
    ],
    "reponse": 1
  },
  {
    "id": "q1004",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Xénon ?",
    "options": [
      "Cl",
      "Sn",
      "Ga",
      "Xe"
    ],
    "reponse": 3
  },
  {
    "id": "q1005",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un homme d'affaires qui construit un parc d'attractions avec de vrais dinosaures ?",
    "options": [
      "Le Monde perdu",
      "Jurassic Park",
      "Godzilla",
      "King Kong"
    ],
    "reponse": 1
  },
  {
    "id": "q1006",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 28000 mm ?",
    "options": [
      "28",
      "22",
      "32",
      "31"
    ],
    "reponse": 0
  },
  {
    "id": "q1007",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Madagascar",
      "Iran",
      "Nicaragua",
      "Namibie"
    ],
    "reponse": 0
  },
  {
    "id": "q1008",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Grèce ?",
    "options": [
      "🇬🇷",
      "🇨🇭",
      "🇳🇿",
      "🇪🇨"
    ],
    "reponse": 0
  },
  {
    "id": "q1009",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de tir en équipe, très populaire en e-sport, oppose Terroristes et Anti-Terroristes ?",
    "options": [
      "Counter-Strike",
      "Rainbow Six Siege",
      "Valorant",
      "Call of Duty"
    ],
    "reponse": 0
  },
  {
    "id": "q1010",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 350 mm ?",
    "options": [
      "34",
      "35",
      "37",
      "29"
    ],
    "reponse": 1
  },
  {
    "id": "q1011",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport utilise les termes « strike » et « spare » ?",
    "options": [
      "Le baseball",
      "Le billard",
      "Le bowling",
      "Le cricket"
    ],
    "reponse": 2
  },
  {
    "id": "q1012",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCXV en chiffres romains ?",
    "options": [
      "1716",
      "1725",
      "1715",
      "1713"
    ],
    "reponse": 2
  },
  {
    "id": "q1013",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « W » ?",
    "options": [
      "Hélium",
      "Tungstène",
      "Argon",
      "Radium"
    ],
    "reponse": 1
  },
  {
    "id": "q1014",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Irlande ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1015",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle est la capitale de l'Australie ?",
    "options": [
      "Sydney",
      "Melbourne",
      "Perth",
      "Canberra"
    ],
    "reponse": 3
  },
  {
    "id": "q1016",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Libye ?",
    "options": [
      "Moscou",
      "Suva",
      "Tripoli",
      "Tachkent"
    ],
    "reponse": 2
  },
  {
    "id": "q1017",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays insulaire d'Océanie est aussi un continent ?",
    "options": [
      "L'Australie",
      "Les Fidji",
      "La Nouvelle-Zélande",
      "La Papouasie-Nouvelle-Guinée"
    ],
    "reponse": 0
  },
  {
    "id": "q1018",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est célèbre pour ses douze travaux ?",
    "options": [
      "Achille",
      "Thésée",
      "Héraclès (Hercule)",
      "Persée"
    ],
    "reponse": 2
  },
  {
    "id": "q1019",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Que signifie « USB » ?",
    "options": [
      "Unified System Board",
      "Universal Serial Bus",
      "United Serial Board",
      "Universal System Bus"
    ],
    "reponse": 1
  },
  {
    "id": "q1020",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Qatar ?",
    "options": [
      "Océanie",
      "Afrique",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q1021",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 838 - 108 ?",
    "options": [
      "733",
      "731",
      "729",
      "730"
    ],
    "reponse": 3
  },
  {
    "id": "q1022",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "En quelle année la Chine impériale a-t-elle pris fin avec l'abdication du dernier empereur ?",
    "options": [
      "1949",
      "1912",
      "1921",
      "1900"
    ],
    "reponse": 1
  },
  {
    "id": "q1023",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1749 et 1900 ?",
    "options": [
      "151",
      "131",
      "147",
      "173"
    ],
    "reponse": 0
  },
  {
    "id": "q1024",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 17 ?",
    "options": [
      "284",
      "344",
      "290",
      "306"
    ],
    "reponse": 3
  },
  {
    "id": "q1025",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 3 ?",
    "options": [
      "43",
      "39",
      "42",
      "49"
    ],
    "reponse": 2
  },
  {
    "id": "q1026",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel artiste espagnol est le fondateur du cubisme avec Georges Braque ?",
    "options": [
      "Antoni Gaudí",
      "Joan Miró",
      "Salvador Dalí",
      "Pablo Picasso"
    ],
    "reponse": 3
  },
  {
    "id": "q1027",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Combien de pattes possède une araignée ?",
    "options": [
      "6",
      "4",
      "10",
      "8"
    ],
    "reponse": 3
  },
  {
    "id": "q1028",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Berne est la capitale de quel pays ?",
    "options": [
      "Paraguay",
      "Suriname",
      "Mexique",
      "Suisse"
    ],
    "reponse": 3
  },
  {
    "id": "q1029",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel roi franc a été sacré empereur d'Occident en l'an 800 ?",
    "options": [
      "Charles Martel",
      "Clovis",
      "Charlemagne",
      "Pépin le Bref"
    ],
    "reponse": 2
  },
  {
    "id": "q1030",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Australie ?",
    "options": [
      "Dollar guyanien",
      "Livre syrienne",
      "Dollar australien",
      "Franc rwandais"
    ],
    "reponse": 2
  },
  {
    "id": "q1031",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Burkina Faso ?",
    "options": [
      "🇳🇦",
      "🇧🇫",
      "🇬🇦",
      "🇸🇷"
    ],
    "reponse": 1
  },
  {
    "id": "q1032",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel acteur a incarné le professeur Dumbledore dans les deux premiers films « Harry Potter » ?",
    "options": [
      "Richard Harris",
      "Anthony Hopkins",
      "Ian McKellen",
      "Michael Gambon"
    ],
    "reponse": 0
  },
  {
    "id": "q1033",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de football sur le terrain ?",
    "options": [
      "10",
      "9",
      "11",
      "12"
    ],
    "reponse": 2
  },
  {
    "id": "q1034",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2201 en chiffres romains ?",
    "options": [
      "MMCCXI",
      "MMCCI",
      "MMCXCIX",
      "MMCC"
    ],
    "reponse": 1
  },
  {
    "id": "q1035",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur russe a écrit le ballet « Le Lac des cygnes » ?",
    "options": [
      "Igor Stravinsky",
      "Sergueï Rachmaninov",
      "Piotr Ilitch Tchaïkovski",
      "Modeste Moussorgski"
    ],
    "reponse": 2
  },
  {
    "id": "q1036",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ouganda ?",
    "options": [
      "🇧🇯",
      "🇨🇿",
      "🇨🇮",
      "🇺🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q1037",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCLXXIII en chiffres romains ?",
    "options": [
      "3163",
      "3171",
      "3173",
      "3178"
    ],
    "reponse": 2
  },
  {
    "id": "q1038",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 2 au carré ?",
    "options": [
      "6",
      "3",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q1039",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 7 ?",
    "options": [
      "131",
      "139",
      "133",
      "123"
    ],
    "reponse": 2
  },
  {
    "id": "q1040",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCVI en chiffres romains ?",
    "options": [
      "1601",
      "1608",
      "1606",
      "1611"
    ],
    "reponse": 2
  },
  {
    "id": "q1041",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le plus grand animal du monde, vivant dans les océans ?",
    "options": [
      "Le requin baleine",
      "L'orque",
      "Le cachalot",
      "La baleine bleue"
    ],
    "reponse": 3
  },
  {
    "id": "q1042",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de logiciel malveillant se déguise en programme légitime pour tromper l'utilisateur ?",
    "options": [
      "Un cheval de Troie",
      "Un spyware uniquement",
      "Un ver informatique",
      "Un rançongiciel"
    ],
    "reponse": 0
  },
  {
    "id": "q1043",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 16 ?",
    "options": [
      "84",
      "79",
      "85",
      "80"
    ],
    "reponse": 3
  },
  {
    "id": "q1044",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Slovaquie",
      "Australie",
      "Arménie",
      "Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q1045",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « CPU » ?",
    "options": [
      "Central Processing Unit",
      "Central Program Unit",
      "Core Processing Unit",
      "Computer Processing Utility"
    ],
    "reponse": 0
  },
  {
    "id": "q1046",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe américain a interprété « Hotel California » ?",
    "options": [
      "Eagles",
      "Creedence Clearwater Revival",
      "The Doors",
      "Fleetwood Mac"
    ],
    "reponse": 0
  },
  {
    "id": "q1047",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 120 ?",
    "options": [
      "49",
      "41",
      "50",
      "48"
    ],
    "reponse": 3
  },
  {
    "id": "q1048",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre est célèbre pour ses tournesols et ses champs de blé peints en Provence ?",
    "options": [
      "Paul Cézanne",
      "Henri Matisse",
      "Vincent van Gogh",
      "Paul Gauguin"
    ],
    "reponse": 2
  },
  {
    "id": "q1049",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel désert côtier d'Amérique du Sud est considéré comme le plus aride du monde ?",
    "options": [
      "Le désert de Sonora",
      "Le désert d'Atacama",
      "Le désert du Kalahari",
      "Le désert de Patagonie"
    ],
    "reponse": 1
  },
  {
    "id": "q1050",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle bataille de 1066 a marqué la conquête normande de l'Angleterre ?",
    "options": [
      "La bataille de Hastings",
      "La bataille de Crécy",
      "La bataille d'Azincourt",
      "La bataille de Bouvines"
    ],
    "reponse": 0
  },
  {
    "id": "q1051",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ag » ?",
    "options": [
      "Argent",
      "Calcium",
      "Thorium",
      "Hydrogène"
    ],
    "reponse": 0
  },
  {
    "id": "q1052",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CMXXXVI en chiffres romains ?",
    "options": [
      "941",
      "936",
      "926",
      "937"
    ],
    "reponse": 1
  },
  {
    "id": "q1053",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Molybdène ?",
    "options": [
      "Pt",
      "V",
      "Mo",
      "C"
    ],
    "reponse": 2
  },
  {
    "id": "q1054",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel est le nom de l'instrument à vent utilisé dans le jazz, souvent associé à Louis Armstrong ?",
    "options": [
      "La trompette",
      "Le trombone",
      "La clarinette",
      "Le saxophone"
    ],
    "reponse": 0
  },
  {
    "id": "q1055",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport olympique se pratique sur un praticable et inclut le saut de cheval ?",
    "options": [
      "Le patinage",
      "La gymnastique",
      "Le trampoline",
      "L'acrosport"
    ],
    "reponse": 1
  },
  {
    "id": "q1056",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Vanuatu ?",
    "options": [
      "🇨🇬",
      "🇰🇵",
      "🇻🇺",
      "🇮🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q1057",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Riyad est la capitale de quel pays ?",
    "options": [
      "Costa Rica",
      "Qatar",
      "Venezuela",
      "Arabie saoudite"
    ],
    "reponse": 3
  },
  {
    "id": "q1058",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel scientifique a formulé la théorie de la relativité ?",
    "options": [
      "Albert Einstein",
      "Max Planck",
      "Isaac Newton",
      "Niels Bohr"
    ],
    "reponse": 0
  },
  {
    "id": "q1059",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Honduras ?",
    "options": [
      "🇭🇳",
      "🇦🇺",
      "🇲🇬",
      "🇲🇽"
    ],
    "reponse": 0
  },
  {
    "id": "q1060",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-Vila est la capitale de quel pays ?",
    "options": [
      "Chine",
      "Nicaragua",
      "Indonésie",
      "Vanuatu"
    ],
    "reponse": 3
  },
  {
    "id": "q1061",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Zambie ?",
    "options": [
      "Taka",
      "Shilling tanzanien",
      "Rouble russe",
      "Kwacha zambien"
    ],
    "reponse": 3
  },
  {
    "id": "q1062",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Paramaribo est la capitale de quel pays ?",
    "options": [
      "Zambie",
      "Danemark",
      "Suriname",
      "Cameroun"
    ],
    "reponse": 2
  },
  {
    "id": "q1063",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quelle partie du corps utilise principalement un serpent pour détecter les odeurs ?",
    "options": [
      "La langue",
      "Les yeux",
      "Le nez",
      "Les écailles"
    ],
    "reponse": 0
  },
  {
    "id": "q1064",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Norvège ?",
    "options": [
      "Le Caire",
      "Asuncion",
      "Berlin",
      "Oslo"
    ],
    "reponse": 3
  },
  {
    "id": "q1065",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Hongrie",
      "Suisse",
      "Pakistan",
      "Costa Rica"
    ],
    "reponse": 0
  },
  {
    "id": "q1066",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « PDF » ?",
    "options": [
      "Public Data Format",
      "Printable Data File",
      "Personal Document Format",
      "Portable Document Format"
    ],
    "reponse": 3
  },
  {
    "id": "q1067",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Scandium ?",
    "options": [
      "Sc",
      "Zr",
      "Ar",
      "Ca"
    ],
    "reponse": 0
  },
  {
    "id": "q1068",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se situe l'Égypte ?",
    "options": [
      "Asie",
      "Océanie",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q1069",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Zirconium ?",
    "options": [
      "Zr",
      "F",
      "K",
      "Cu"
    ],
    "reponse": 0
  },
  {
    "id": "q1070",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Italie",
      "Mongolie",
      "Kazakhstan",
      "Russie"
    ],
    "reponse": 3
  },
  {
    "id": "q1071",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Bosnie-Herzégovine",
      "Sénégal",
      "Bangladesh",
      "Irak"
    ],
    "reponse": 1
  },
  {
    "id": "q1072",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur français a joué dans « Intouchables » aux côtés d'Omar Sy ?",
    "options": [
      "François Cluzet",
      "Jean Dujardin",
      "Gérard Depardieu",
      "Vincent Cassel"
    ],
    "reponse": 0
  },
  {
    "id": "q1073",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Césium ?",
    "options": [
      "Cs",
      "Co",
      "Tc",
      "Ne"
    ],
    "reponse": 0
  },
  {
    "id": "q1074",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Roumanie",
      "Slovaquie",
      "Botswana",
      "Uruguay"
    ],
    "reponse": 1
  },
  {
    "id": "q1075",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 836 + 473 ?",
    "options": [
      "1309",
      "1308",
      "1306",
      "1312"
    ],
    "reponse": 0
  },
  {
    "id": "q1076",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mozambique ?",
    "options": [
      "Brazzaville",
      "Caracas",
      "Maputo",
      "Bruxelles"
    ],
    "reponse": 2
  },
  {
    "id": "q1077",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Finlande ?",
    "options": [
      "Euro",
      "Dinar serbe",
      "Pula",
      "Forint"
    ],
    "reponse": 0
  },
  {
    "id": "q1078",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Syrie ?",
    "options": [
      "Damas",
      "Port-au-Prince",
      "Berlin",
      "Dacca"
    ],
    "reponse": 0
  },
  {
    "id": "q1079",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MLXIV en chiffres romains ?",
    "options": [
      "1065",
      "1064",
      "1054",
      "1066"
    ],
    "reponse": 1
  },
  {
    "id": "q1080",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Nigeria ?",
    "options": [
      "🇰🇭",
      "🇪🇪",
      "🇦🇹",
      "🇳🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q1081",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur est célèbre pour ses films d'horreur comme « Psychose » et « Les Oiseaux » ?",
    "options": [
      "Wes Craven",
      "Alfred Hitchcock",
      "John Carpenter",
      "Stanley Kubrick"
    ],
    "reponse": 1
  },
  {
    "id": "q1082",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Cameroun",
      "Angola",
      "Belize",
      "Mali"
    ],
    "reponse": 2
  },
  {
    "id": "q1083",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 98 ÷ 7 ?",
    "options": [
      "14",
      "17",
      "13",
      "12"
    ],
    "reponse": 0
  },
  {
    "id": "q1084",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène des personnages coincés sur une île mystérieuse après un crash d'avion ?",
    "options": [
      "Yellowjackets",
      "The Wilds",
      "Lost, les disparus",
      "Manifest"
    ],
    "reponse": 2
  },
  {
    "id": "q1085",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel canal relie la mer Méditerranée à la mer Rouge ?",
    "options": [
      "Le canal de Panama",
      "Le canal du Midi",
      "Le canal de Suez",
      "Le canal de Corinthe"
    ],
    "reponse": 2
  },
  {
    "id": "q1086",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays possède le plus grand nombre de volcans actifs ?",
    "options": [
      "L'Indonésie",
      "Les Philippines",
      "Le Japon",
      "Le Chili"
    ],
    "reponse": 0
  },
  {
    "id": "q1087",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle famille d'instruments regroupe le violon, l'alto, le violoncelle et la contrebasse ?",
    "options": [
      "Les bois",
      "Les cordes",
      "Les percussions",
      "Les cuivres"
    ],
    "reponse": 1
  },
  {
    "id": "q1088",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel acteur incarne le rôle-titre dans « Le Grand Bleu » de Luc Besson ?",
    "options": [
      "Jean Reno",
      "Christophe Lambert",
      "Gérard Depardieu",
      "Jean-Marc Barr"
    ],
    "reponse": 3
  },
  {
    "id": "q1089",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Allemagne",
      "Cameroun",
      "Maroc",
      "Zambie"
    ],
    "reponse": 2
  },
  {
    "id": "q1090",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Colombie ?",
    "options": [
      "🇧🇪",
      "🇵🇭",
      "🇪🇸",
      "🇨🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q1091",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Londres est la capitale de quel pays ?",
    "options": [
      "Royaume-Uni",
      "Norvège",
      "Chypre",
      "Nouvelle-Zélande"
    ],
    "reponse": 0
  },
  {
    "id": "q1092",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est l'unité de mesure de la force dans le Système international ?",
    "options": [
      "Le newton",
      "Le pascal",
      "Le watt",
      "Le joule"
    ],
    "reponse": 0
  },
  {
    "id": "q1093",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Cuba ?",
    "options": [
      "Dram",
      "Peso argentin",
      "Dinar libyen",
      "Peso cubain"
    ],
    "reponse": 3
  },
  {
    "id": "q1094",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel pays est réputé pour l'invention du chocolat suisse moderne au XIXe siècle ?",
    "options": [
      "L'Autriche",
      "La Suisse",
      "La Belgique",
      "La France"
    ],
    "reponse": 1
  },
  {
    "id": "q1095",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle expédition militaire française a été menée en Égypte par Napoléon en 1798 ?",
    "options": [
      "La campagne d'Italie",
      "La campagne de Russie",
      "La campagne d'Espagne",
      "La campagne d'Égypte"
    ],
    "reponse": 3
  },
  {
    "id": "q1096",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République dominicaine ?",
    "options": [
      "Ankara",
      "Riyad",
      "Saint-Domingue",
      "Washington"
    ],
    "reponse": 2
  },
  {
    "id": "q1097",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Belize",
      "Nigeria",
      "Mongolie",
      "Danemark"
    ],
    "reponse": 2
  },
  {
    "id": "q1098",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Silicium ?",
    "options": [
      "Se",
      "Li",
      "Si",
      "Br"
    ],
    "reponse": 2
  },
  {
    "id": "q1099",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Népal ?",
    "options": [
      "Luanda",
      "Dodoma",
      "Vientiane",
      "Katmandou"
    ],
    "reponse": 3
  },
  {
    "id": "q1100",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 490 + 606 ?",
    "options": [
      "1097",
      "1095",
      "1096",
      "1098"
    ],
    "reponse": 2
  },
  {
    "id": "q1101",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 105 ÷ 5 ?",
    "options": [
      "19",
      "24",
      "25",
      "21"
    ],
    "reponse": 3
  },
  {
    "id": "q1102",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Turquie ?",
    "options": [
      "Kuala Lumpur",
      "Ankara",
      "Dakar",
      "Dacca"
    ],
    "reponse": 1
  },
  {
    "id": "q1103",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Hongrie ?",
    "options": [
      "🇱🇺",
      "🇭🇺",
      "🇮🇩",
      "🇩🇰"
    ],
    "reponse": 1
  },
  {
    "id": "q1104",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur italien est célèbre pour ses opéras « La Traviata » et « Aïda » ?",
    "options": [
      "Giacomo Puccini",
      "Vincenzo Bellini",
      "Gioachino Rossini",
      "Giuseppe Verdi"
    ],
    "reponse": 3
  },
  {
    "id": "q1105",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 ÷ 9 ?",
    "options": [
      "12",
      "11",
      "8",
      "10"
    ],
    "reponse": 3
  },
  {
    "id": "q1106",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Cameroun ?",
    "options": [
      "🇦🇹",
      "🇳🇮",
      "🇨🇲",
      "🇨🇭"
    ],
    "reponse": 2
  },
  {
    "id": "q1107",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Argentine",
      "Niger",
      "Belize",
      "Algérie"
    ],
    "reponse": 1
  },
  {
    "id": "q1108",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Thaïlande ?",
    "options": [
      "Caracas",
      "Bangkok",
      "La Havane",
      "Ouagadougou"
    ],
    "reponse": 1
  },
  {
    "id": "q1109",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Malaisie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q1110",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Ghana ?",
    "options": [
      "🇬🇭",
      "🇾🇪",
      "🇪🇪",
      "🇳🇴"
    ],
    "reponse": 0
  },
  {
    "id": "q1111",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bagdad est la capitale de quel pays ?",
    "options": [
      "Paraguay",
      "Syrie",
      "Irak",
      "Allemagne"
    ],
    "reponse": 2
  },
  {
    "id": "q1112",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pd » ?",
    "options": [
      "Palladium",
      "Tungstène",
      "Phosphore",
      "Strontium"
    ],
    "reponse": 0
  },
  {
    "id": "q1113",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel musicien allemand est resté célèbre pour ses œuvres pour clavecin comme les « Variations Goldberg » ?",
    "options": [
      "Georg Friedrich Haendel",
      "Jean-Philippe Rameau",
      "Domenico Scarlatti",
      "Johann Sebastian Bach"
    ],
    "reponse": 3
  },
  {
    "id": "q1114",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est l'état de la matière dans lequel les molécules sont les plus proches les unes des autres ?",
    "options": [
      "Gazeux",
      "Solide",
      "Liquide",
      "Plasma"
    ],
    "reponse": 1
  },
  {
    "id": "q1115",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Croatie ?",
    "options": [
      "🇧🇬",
      "🇭🇷",
      "🇪🇸",
      "🇬🇹"
    ],
    "reponse": 1
  },
  {
    "id": "q1116",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 389 - 62 ?",
    "options": [
      "325",
      "326",
      "328",
      "327"
    ],
    "reponse": 3
  },
  {
    "id": "q1117",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 167 - 40 ?",
    "options": [
      "128",
      "130",
      "124",
      "127"
    ],
    "reponse": 3
  },
  {
    "id": "q1118",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Suriname",
      "Malaisie",
      "Ouzbékistan",
      "Pologne"
    ],
    "reponse": 1
  },
  {
    "id": "q1119",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 19 cl ?",
    "options": [
      "190",
      "175",
      "199",
      "158"
    ],
    "reponse": 0
  },
  {
    "id": "q1120",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal a inspiré le personnage du Roi Lion, vivant en Afrique de l'Est ?",
    "options": [
      "Le léopard",
      "Le lion",
      "Le guépard",
      "L'hyène"
    ],
    "reponse": 1
  },
  {
    "id": "q1121",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel romancier américain a écrit « Gatsby le Magnifique » ?",
    "options": [
      "William Faulkner",
      "F. Scott Fitzgerald",
      "John Steinbeck",
      "Ernest Hemingway"
    ],
    "reponse": 1
  },
  {
    "id": "q1122",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2708 en chiffres romains ?",
    "options": [
      "MMDCCVIII",
      "MMDCXCVIII",
      "MMDCCIII",
      "MMDCCVII"
    ],
    "reponse": 0
  },
  {
    "id": "q1123",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Océanie",
      "Asie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q1124",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Moldavie ?",
    "options": [
      "🇶🇦",
      "🇲🇩",
      "🇬🇦",
      "🇳🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q1125",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Mexico est la capitale de quel pays ?",
    "options": [
      "Tanzanie",
      "Inde",
      "Albanie",
      "Mexique"
    ],
    "reponse": 3
  },
  {
    "id": "q1126",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sr » ?",
    "options": [
      "Argent",
      "Étain",
      "Gallium",
      "Strontium"
    ],
    "reponse": 3
  },
  {
    "id": "q1127",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est le leader du groupe Queen, décédé en 1991 ?",
    "options": [
      "Brian May",
      "Roger Taylor",
      "Freddie Mercury",
      "John Deacon"
    ],
    "reponse": 2
  },
  {
    "id": "q1128",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel type de course cycliste se déroule sur une piste ovale couverte ?",
    "options": [
      "Le BMX",
      "Le cyclo-cross",
      "Le VTT",
      "Le cyclisme sur piste"
    ],
    "reponse": 3
  },
  {
    "id": "q1129",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Tous les combien d'années ont lieu les Jeux olympiques d'été ?",
    "options": [
      "2 ans",
      "5 ans",
      "3 ans",
      "4 ans"
    ],
    "reponse": 3
  },
  {
    "id": "q1130",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 452 + 430 ?",
    "options": [
      "881",
      "883",
      "882",
      "884"
    ],
    "reponse": 2
  },
  {
    "id": "q1131",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3314 en chiffres romains ?",
    "options": [
      "MMMCCCXIV",
      "MMMCCCXII",
      "MMMCCCXXIV",
      "MMMCCCIX"
    ],
    "reponse": 0
  },
  {
    "id": "q1132",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de France ?",
    "options": [
      "🇶🇦",
      "🇷🇺",
      "🇺🇸",
      "🇫🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q1133",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle saga de science-fiction met en scène les Jedi et les Sith ?",
    "options": [
      "Dune",
      "Interstellar",
      "Star Trek",
      "Star Wars"
    ],
    "reponse": 3
  },
  {
    "id": "q1134",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel instrument à vent utilise une anche double et est souvent associé à l'orchestre symphonique ?",
    "options": [
      "Le cor anglais",
      "Le basson",
      "Le hautbois",
      "La clarinette"
    ],
    "reponse": 2
  },
  {
    "id": "q1135",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Budapest est la capitale de quel pays ?",
    "options": [
      "Qatar",
      "Irak",
      "Hongrie",
      "El Salvador"
    ],
    "reponse": 2
  },
  {
    "id": "q1136",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle mer borde la Côte d'Azur française ?",
    "options": [
      "La mer Rouge",
      "La mer Méditerranée",
      "La mer Noire",
      "La mer Adriatique"
    ],
    "reponse": 1
  },
  {
    "id": "q1137",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Autriche ?",
    "options": [
      "Riyal qatari",
      "Dollar namibien",
      "Euro",
      "Roupie indonésienne"
    ],
    "reponse": 2
  },
  {
    "id": "q1138",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quel jeu vidéo de gestion de parc, sorti en 1999, permet de construire des attractions et montagnes russes ?",
    "options": [
      "Zoo Tycoon",
      "RollerCoaster Tycoon",
      "Theme Park",
      "Planet Coaster"
    ],
    "reponse": 1
  },
  {
    "id": "q1139",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle est la plus grande île du monde ?",
    "options": [
      "Le Groenland",
      "La Nouvelle-Guinée",
      "Bornéo",
      "Madagascar"
    ],
    "reponse": 0
  },
  {
    "id": "q1140",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film d'animation japonais du studio Ghibli met en scène une jeune fille nommée Chihiro ?",
    "options": [
      "Le Château ambulant",
      "Mon voisin Totoro",
      "Le Voyage de Chihiro",
      "Princesse Mononoké"
    ],
    "reponse": 2
  },
  {
    "id": "q1141",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 147 + 290 ?",
    "options": [
      "435",
      "437",
      "436",
      "440"
    ],
    "reponse": 1
  },
  {
    "id": "q1142",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est l'animal terrestre ayant la plus longue espérance de vie ?",
    "options": [
      "La baleine",
      "L'éléphant",
      "Le perroquet",
      "La tortue géante"
    ],
    "reponse": 3
  },
  {
    "id": "q1143",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 29 au carré ?",
    "options": [
      "881",
      "841",
      "761",
      "824"
    ],
    "reponse": 1
  },
  {
    "id": "q1144",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2449 en chiffres romains ?",
    "options": [
      "MMCDXLIX",
      "MMCDXLIV",
      "MMCDLIV",
      "MMCDL"
    ],
    "reponse": 0
  },
  {
    "id": "q1145",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Iran ?",
    "options": [
      "Port-Vila",
      "Paris",
      "La Valette",
      "Téhéran"
    ],
    "reponse": 3
  },
  {
    "id": "q1146",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie l'acronyme « IoT », concept désignant les objets connectés ?",
    "options": [
      "Input Output Technology",
      "Integrated Online Tool",
      "Internet of Things (Internet des objets)",
      "Internet Operating Terminal"
    ],
    "reponse": 2
  },
  {
    "id": "q1147",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu grec est associé à la musique, la poésie et la lumière, souvent représenté avec une lyre ?",
    "options": [
      "Hermès",
      "Pan",
      "Dionysos",
      "Apollon"
    ],
    "reponse": 3
  },
  {
    "id": "q1148",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pérou ?",
    "options": [
      "Asie",
      "Océanie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1149",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est bordé par la mer Rouge et abrite le mont Sinaï ?",
    "options": [
      "L'Égypte",
      "Le Soudan",
      "L'Arabie saoudite",
      "La Jordanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1150",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle bataille de 1815 a marqué la défaite finale de Napoléon ?",
    "options": [
      "La bataille de Iéna",
      "La bataille d'Austerlitz",
      "La bataille de Waterloo",
      "La bataille de Trafalgar"
    ],
    "reponse": 2
  },
  {
    "id": "q1151",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCCXVI en chiffres romains ?",
    "options": [
      "2311",
      "2316",
      "2317",
      "2318"
    ],
    "reponse": 1
  },
  {
    "id": "q1152",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Arménie ?",
    "options": [
      "San José",
      "Tunis",
      "Erevan",
      "Sanaa"
    ],
    "reponse": 2
  },
  {
    "id": "q1153",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel homme d'État a dirigé la France libre pendant la Seconde Guerre mondiale ?",
    "options": [
      "Philippe Pétain",
      "Jean Moulin",
      "Georges Clemenceau",
      "Charles de Gaulle"
    ],
    "reponse": 3
  },
  {
    "id": "q1154",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle console a été lancée par Sony en 1994, marquant son entrée dans les jeux vidéo ?",
    "options": [
      "La Saturn",
      "La Nintendo 64",
      "La Dreamcast",
      "La PlayStation"
    ],
    "reponse": 3
  },
  {
    "id": "q1155",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 144 ?",
    "options": [
      "13",
      "12",
      "11",
      "15"
    ],
    "reponse": 1
  },
  {
    "id": "q1156",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tbilissi est la capitale de quel pays ?",
    "options": [
      "Géorgie",
      "Irak",
      "Venezuela",
      "Indonésie"
    ],
    "reponse": 0
  },
  {
    "id": "q1157",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Monténégro ?",
    "options": [
      "Khartoum",
      "Podgorica",
      "Windhoek",
      "Yaoundé"
    ],
    "reponse": 1
  },
  {
    "id": "q1158",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le nom du plus grand poisson du monde ?",
    "options": [
      "Le grand requin blanc",
      "Le requin baleine",
      "L'espadon",
      "La raie manta"
    ],
    "reponse": 1
  },
  {
    "id": "q1159",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCLXXII en chiffres romains ?",
    "options": [
      "3770",
      "3772",
      "3773",
      "3767"
    ],
    "reponse": 1
  },
  {
    "id": "q1160",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Rome est la capitale de quel pays ?",
    "options": [
      "Myanmar",
      "République tchèque",
      "Corée du Sud",
      "Italie"
    ],
    "reponse": 3
  },
  {
    "id": "q1161",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 65 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "1e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1162",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 au carré ?",
    "options": [
      "69",
      "89",
      "84",
      "81"
    ],
    "reponse": 3
  },
  {
    "id": "q1163",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de simulation de vie permet de construire des maisons et de contrôler des « Sims » ?",
    "options": [
      "SimCity",
      "Animal Crossing",
      "Les Sims",
      "Second Life"
    ],
    "reponse": 2
  },
  {
    "id": "q1164",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Lithium ?",
    "options": [
      "Al",
      "Cd",
      "Ag",
      "Li"
    ],
    "reponse": 3
  },
  {
    "id": "q1165",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ba » ?",
    "options": [
      "Baryum",
      "Tungstène",
      "Indium",
      "Sodium"
    ],
    "reponse": 0
  },
  {
    "id": "q1166",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Antananarivo est la capitale de quel pays ?",
    "options": [
      "Irak",
      "Uruguay",
      "Madagascar",
      "Ghana"
    ],
    "reponse": 2
  },
  {
    "id": "q1167",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel studio japonais a créé la saga « Final Fantasy » ?",
    "options": [
      "Bandai Namco",
      "Konami",
      "Capcom",
      "Square Enix"
    ],
    "reponse": 3
  },
  {
    "id": "q1168",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 956 + 66 ?",
    "options": [
      "1022",
      "1024",
      "1020",
      "1019"
    ],
    "reponse": 0
  },
  {
    "id": "q1169",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 800 ?",
    "options": [
      "160",
      "169",
      "165",
      "144"
    ],
    "reponse": 0
  },
  {
    "id": "q1170",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 250 ?",
    "options": [
      "109",
      "98",
      "100",
      "86"
    ],
    "reponse": 2
  },
  {
    "id": "q1171",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Notre-Dame de Paris » ?",
    "options": [
      "Alexandre Dumas",
      "Stendhal",
      "Honoré de Balzac",
      "Victor Hugo"
    ],
    "reponse": 3
  },
  {
    "id": "q1172",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Corée du Nord ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1173",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Pays-Bas ?",
    "options": [
      "🇹🇷",
      "🇳🇱",
      "🇺🇬",
      "🇨🇦"
    ],
    "reponse": 1
  },
  {
    "id": "q1174",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Tellure ?",
    "options": [
      "Sr",
      "Cd",
      "Te",
      "C"
    ],
    "reponse": 2
  },
  {
    "id": "q1175",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel document fondamental a été signé en 1215 en Angleterre pour limiter le pouvoir royal ?",
    "options": [
      "La Magna Carta",
      "La Déclaration des droits",
      "La Pétition des droits",
      "L'Acte d'Union"
    ],
    "reponse": 0
  },
  {
    "id": "q1176",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 120 ?",
    "options": [
      "20",
      "14",
      "17",
      "18"
    ],
    "reponse": 3
  },
  {
    "id": "q1177",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « As » ?",
    "options": [
      "Iode",
      "Baryum",
      "Molybdène",
      "Arsenic"
    ],
    "reponse": 3
  },
  {
    "id": "q1178",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel arbre à feuilles persistantes est traditionnellement décoré à Noël ?",
    "options": [
      "Le pin",
      "Le if",
      "Le cyprès",
      "Le sapin"
    ],
    "reponse": 3
  },
  {
    "id": "q1179",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Erevan est la capitale de quel pays ?",
    "options": [
      "Arménie",
      "Mali",
      "Jordanie",
      "Brésil"
    ],
    "reponse": 0
  },
  {
    "id": "q1180",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel format audio compressé, très répandu, porte l'extension « .mp3 » ?",
    "options": [
      "Advanced Audio Coding",
      "MPEG-1 Audio Layer III",
      "MPEG-4 Audio",
      "Windows Media Audio"
    ],
    "reponse": 1
  },
  {
    "id": "q1181",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quelle chanteuse islandaise est connue pour son univers musical singulier et l'album « Homogenic » ?",
    "options": [
      "Tori Amos",
      "Enya",
      "Björk",
      "Kate Bush"
    ],
    "reponse": 2
  },
  {
    "id": "q1182",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cameroun ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1183",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel insecte produit le miel ?",
    "options": [
      "La fourmi",
      "Le bourdon",
      "L'abeille",
      "La guêpe"
    ],
    "reponse": 2
  },
  {
    "id": "q1184",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 56 ÷ 14 ?",
    "options": [
      "4",
      "3",
      "6",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q1185",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom du processus par lequel l'eau passe de l'état liquide à l'état gazeux ?",
    "options": [
      "La sublimation",
      "La fusion",
      "L'évaporation",
      "La condensation"
    ],
    "reponse": 2
  },
  {
    "id": "q1186",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 130 - 118 ?",
    "options": [
      "10",
      "11",
      "12",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q1187",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel auteur français a écrit « Les Liaisons dangereuses » ?",
    "options": [
      "Choderlos de Laclos",
      "Denis Diderot",
      "Pierre de Marivaux",
      "l'abbé Prévost"
    ],
    "reponse": 0
  },
  {
    "id": "q1188",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport peut-on réaliser un « ippon » ?",
    "options": [
      "L'escrime",
      "Le judo",
      "Le karaté",
      "La lutte"
    ],
    "reponse": 1
  },
  {
    "id": "q1189",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 616 + 929 ?",
    "options": [
      "1547",
      "1546",
      "1544",
      "1545"
    ],
    "reponse": 3
  },
  {
    "id": "q1190",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Jamaïque ?",
    "options": [
      "🇯🇲",
      "🇮🇩",
      "🇻🇺",
      "🇲🇦"
    ],
    "reponse": 0
  },
  {
    "id": "q1191",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 928 - 329 ?",
    "options": [
      "602",
      "600",
      "596",
      "599"
    ],
    "reponse": 3
  },
  {
    "id": "q1192",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel insecte est connu pour sa métamorphose spectaculaire, de chenille à adulte ailé ?",
    "options": [
      "La libellule",
      "La coccinelle",
      "Le papillon",
      "La sauterelle"
    ],
    "reponse": 2
  },
  {
    "id": "q1193",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Misérables » ?",
    "options": [
      "Gustave Flaubert",
      "Émile Zola",
      "Honoré de Balzac",
      "Victor Hugo"
    ],
    "reponse": 3
  },
  {
    "id": "q1194",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dacca est la capitale de quel pays ?",
    "options": [
      "Turquie",
      "Croatie",
      "Bangladesh",
      "Brésil"
    ],
    "reponse": 2
  },
  {
    "id": "q1195",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tachkent est la capitale de quel pays ?",
    "options": [
      "Ouzbékistan",
      "Rwanda",
      "Togo",
      "Biélorussie"
    ],
    "reponse": 0
  },
  {
    "id": "q1196",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Belgique ?",
    "options": [
      "Chisinau",
      "Kaboul",
      "Bruxelles",
      "Dublin"
    ],
    "reponse": 2
  },
  {
    "id": "q1197",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel oracle grec, situé à Delphes, était consulté pour connaître l'avenir ?",
    "options": [
      "L'oracle d'Éphèse",
      "L'oracle de Delphes",
      "L'oracle de Dodone",
      "L'oracle de Delos"
    ],
    "reponse": 1
  },
  {
    "id": "q1198",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays possède le plus de lacs au monde ?",
    "options": [
      "Le Canada",
      "La Finlande",
      "Les États-Unis",
      "La Russie"
    ],
    "reponse": 0
  },
  {
    "id": "q1199",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat français est composé d'escargots cuits dans du beurre à l'ail et au persil ?",
    "options": [
      "Le foie gras",
      "Les escargots de Bourgogne",
      "Les cuisses de grenouilles",
      "Le tartare"
    ],
    "reponse": 1
  },
  {
    "id": "q1200",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 2 ?",
    "options": [
      "34",
      "27",
      "30",
      "29"
    ],
    "reponse": 2
  },
  {
    "id": "q1201",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de France ?",
    "options": [
      "Dinar tunisien",
      "Peso colombien",
      "Euro",
      "Dram"
    ],
    "reponse": 2
  },
  {
    "id": "q1202",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène un professeur de chimie devenu fabricant de drogue, surnommé Heisenberg ?",
    "options": [
      "Better Call Saul",
      "Narcos",
      "Ozark",
      "Breaking Bad"
    ],
    "reponse": 3
  },
  {
    "id": "q1203",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel dramaturge norvégien est considéré comme le père du théâtre moderne, auteur de « Maison de poupée » ?",
    "options": [
      "Henrik Ibsen",
      "August Strindberg",
      "Anton Tchekhov",
      "Bertolt Brecht"
    ],
    "reponse": 0
  },
  {
    "id": "q1204",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Saint-Domingue est la capitale de quel pays ?",
    "options": [
      "Arabie saoudite",
      "Venezuela",
      "République dominicaine",
      "Mozambique"
    ],
    "reponse": 2
  },
  {
    "id": "q1205",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Italie",
      "Irlande",
      "Pologne",
      "Guatemala"
    ],
    "reponse": 3
  },
  {
    "id": "q1206",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film met en scène un vaisseau spatial où un ordinateur nommé HAL 9000 se rebelle ?",
    "options": [
      "Alien",
      "Gravity",
      "2001, l'Odyssée de l'espace",
      "Interstellar"
    ],
    "reponse": 2
  },
  {
    "id": "q1207",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Guatemala ?",
    "options": [
      "Berne",
      "Guatemala",
      "San José",
      "Belgrade"
    ],
    "reponse": 1
  },
  {
    "id": "q1208",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Qui a réalisé « Pulp Fiction » et « Kill Bill » ?",
    "options": [
      "David Fincher",
      "Quentin Tarantino",
      "Martin Scorsese",
      "Christopher Nolan"
    ],
    "reponse": 1
  },
  {
    "id": "q1209",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Serbie ?",
    "options": [
      "Dollar guyanien",
      "Guarani",
      "Dinar serbe",
      "Franc congolais"
    ],
    "reponse": 2
  },
  {
    "id": "q1210",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien du vent et de l'air soutient le ciel ?",
    "options": [
      "Thot",
      "Geb",
      "Nout",
      "Shou"
    ],
    "reponse": 3
  },
  {
    "id": "q1211",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 33 m ?",
    "options": [
      "30062",
      "38001",
      "33000",
      "35873"
    ],
    "reponse": 2
  },
  {
    "id": "q1212",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Platine ?",
    "options": [
      "Sn",
      "S",
      "W",
      "Pt"
    ],
    "reponse": 3
  },
  {
    "id": "q1213",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel désert se trouve principalement en Mongolie et en Chine ?",
    "options": [
      "Le désert du Néguev",
      "Le Sahara",
      "Le désert de Gobi",
      "Le Kalahari"
    ],
    "reponse": 2
  },
  {
    "id": "q1214",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Angola ?",
    "options": [
      "Asie",
      "Europe",
      "Océanie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1215",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 × 5 ?",
    "options": [
      "94",
      "100",
      "107",
      "97"
    ],
    "reponse": 1
  },
  {
    "id": "q1216",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de simulation agricole permet de gérer une ferme héritée d'un grand-père ?",
    "options": [
      "Harvest Moon",
      "Farming Simulator",
      "Stardew Valley",
      "Animal Crossing"
    ],
    "reponse": 2
  },
  {
    "id": "q1217",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Congo ?",
    "options": [
      "Brazzaville",
      "Windhoek",
      "Buenos Aires",
      "Zagreb"
    ],
    "reponse": 0
  },
  {
    "id": "q1218",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 1800 min ?",
    "options": [
      "37",
      "30",
      "36",
      "27"
    ],
    "reponse": 1
  },
  {
    "id": "q1219",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 981 - 707 ?",
    "options": [
      "272",
      "275",
      "274",
      "271"
    ],
    "reponse": 2
  },
  {
    "id": "q1220",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 46 ÷ 2 ?",
    "options": [
      "21",
      "19",
      "25",
      "23"
    ],
    "reponse": 3
  },
  {
    "id": "q1221",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 19 h ?",
    "options": [
      "1140",
      "1296",
      "1225",
      "1187"
    ],
    "reponse": 0
  },
  {
    "id": "q1222",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument mégalithique préhistorique se trouve dans la plaine de Salisbury en Angleterre ?",
    "options": [
      "Stonehenge",
      "Newgrange",
      "Avebury",
      "Les alignements de Carnac"
    ],
    "reponse": 0
  },
  {
    "id": "q1223",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 24 jour(s) ?",
    "options": [
      "622",
      "576",
      "657",
      "649"
    ],
    "reponse": 1
  },
  {
    "id": "q1224",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Japon ?",
    "options": [
      "Cordoba",
      "Yen",
      "Franc rwandais",
      "Lari"
    ],
    "reponse": 1
  },
  {
    "id": "q1225",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCDLXXXII en chiffres romains ?",
    "options": [
      "1487",
      "1484",
      "1492",
      "1482"
    ],
    "reponse": 3
  },
  {
    "id": "q1226",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain colombien a reçu le prix Nobel de littérature pour « Cent ans de solitude » ?",
    "options": [
      "Mario Vargas Llosa",
      "Pablo Neruda",
      "Gabriel García Márquez",
      "Jorge Luis Borges"
    ],
    "reponse": 2
  },
  {
    "id": "q1227",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Namibie ?",
    "options": [
      "Santiago",
      "Windhoek",
      "Addis-Abeba",
      "Singapour"
    ],
    "reponse": 1
  },
  {
    "id": "q1228",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe britannique des années 60 rivalisait avec les Beatles, mené par Mick Jagger ?",
    "options": [
      "The Who",
      "The Animals",
      "The Rolling Stones",
      "The Kinks"
    ],
    "reponse": 2
  },
  {
    "id": "q1229",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle expédition a permis de faire le premier tour du monde entre 1519 et 1522 ?",
    "options": [
      "L'expédition de Colomb",
      "L'expédition de Cook",
      "L'expédition de Vasco de Gama",
      "L'expédition de Magellan"
    ],
    "reponse": 3
  },
  {
    "id": "q1230",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Jordanie",
      "Ghana",
      "République dominicaine",
      "Côte d'Ivoire"
    ],
    "reponse": 2
  },
  {
    "id": "q1231",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pays-Bas ?",
    "options": [
      "Asie",
      "Amérique du Sud",
      "Océanie",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1232",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un groupe de super-héros appelés les Avengers pour la première fois réunis ?",
    "options": [
      "Avengers",
      "Les Indestructibles",
      "X-Men",
      "Justice League"
    ],
    "reponse": 0
  },
  {
    "id": "q1233",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mexique ?",
    "options": [
      "Tirana",
      "Amman",
      "Hanoï",
      "Mexico"
    ],
    "reponse": 3
  },
  {
    "id": "q1234",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Philippines ?",
    "options": [
      "Dinar libyen",
      "Peso philippin",
      "Rial iranien",
      "Naira"
    ],
    "reponse": 1
  },
  {
    "id": "q1235",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel courant artistique du XIXe siècle, dont Monet est une figure majeure, cherche à capter la lumière et l'instant ?",
    "options": [
      "Le fauvisme",
      "L'impressionnisme",
      "Le surréalisme",
      "Le cubisme"
    ],
    "reponse": 1
  },
  {
    "id": "q1236",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Pologne",
      "Albanie",
      "Bénin",
      "Suisse"
    ],
    "reponse": 0
  },
  {
    "id": "q1237",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 636 + 649 ?",
    "options": [
      "1288",
      "1285",
      "1287",
      "1282"
    ],
    "reponse": 1
  },
  {
    "id": "q1238",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Libye ?",
    "options": [
      "Sum ouzbek",
      "Dinar libyen",
      "Roupie pakistanaise",
      "Manat azerbaïdjanais"
    ],
    "reponse": 1
  },
  {
    "id": "q1239",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇿🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Myanmar",
      "Zambie",
      "Suriname",
      "Hongrie"
    ],
    "reponse": 1
  },
  {
    "id": "q1240",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 532 + 149 ?",
    "options": [
      "683",
      "681",
      "682",
      "684"
    ],
    "reponse": 1
  },
  {
    "id": "q1241",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit la pièce de théâtre « Cyrano de Bergerac » ?",
    "options": [
      "Molière",
      "Edmond Rostand",
      "Jean Racine",
      "Pierre Corneille"
    ],
    "reponse": 1
  },
  {
    "id": "q1242",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Koweït ?",
    "options": [
      "Koweït City",
      "Port-au-Prince",
      "Lisbonne",
      "Antananarivo"
    ],
    "reponse": 0
  },
  {
    "id": "q1243",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Islande ?",
    "options": [
      "Stockholm",
      "New Delhi",
      "Reykjavik",
      "Paris"
    ],
    "reponse": 2
  },
  {
    "id": "q1244",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 9 × 15 ?",
    "options": [
      "135",
      "131",
      "124",
      "117"
    ],
    "reponse": 0
  },
  {
    "id": "q1245",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel manga et anime met en scène des pirates à la recherche d'un trésor légendaire ?",
    "options": [
      "One Piece",
      "Naruto",
      "Bleach",
      "Fairy Tail"
    ],
    "reponse": 0
  },
  {
    "id": "q1246",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle est la plus grande forêt tropicale du monde ?",
    "options": [
      "La forêt du bassin du Congo",
      "La forêt de Bornéo",
      "La forêt de Sibérie",
      "La forêt amazonienne"
    ],
    "reponse": 3
  },
  {
    "id": "q1247",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ottawa est la capitale de quel pays ?",
    "options": [
      "Biélorussie",
      "Canada",
      "Honduras",
      "Guinée"
    ],
    "reponse": 1
  },
  {
    "id": "q1248",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 300 ?",
    "options": [
      "25",
      "30",
      "33",
      "35"
    ],
    "reponse": 1
  },
  {
    "id": "q1249",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2578 en chiffres romains ?",
    "options": [
      "MMDLXXIX",
      "MMDLXVIII",
      "MMDLXXVIII",
      "MMDLXXXVIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1250",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Suisse ?",
    "options": [
      "🇨🇭",
      "🇷🇼",
      "🇲🇳",
      "🇻🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q1251",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 16 ?",
    "options": [
      "5",
      "1",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q1252",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 200 année(s) ?",
    "options": [
      "25",
      "16",
      "15",
      "20"
    ],
    "reponse": 3
  },
  {
    "id": "q1253",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 364 - 191 ?",
    "options": [
      "170",
      "176",
      "173",
      "175"
    ],
    "reponse": 2
  },
  {
    "id": "q1254",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 976 + 452 ?",
    "options": [
      "1428",
      "1425",
      "1430",
      "1426"
    ],
    "reponse": 0
  },
  {
    "id": "q1255",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Nouvelle-Zélande ?",
    "options": [
      "Wellington",
      "Budapest",
      "Addis-Abeba",
      "Caracas"
    ],
    "reponse": 0
  },
  {
    "id": "q1256",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Philippines ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Asie",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1257",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDII en chiffres romains ?",
    "options": [
      "2503",
      "2507",
      "2500",
      "2502"
    ],
    "reponse": 3
  },
  {
    "id": "q1258",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 × 9 ?",
    "options": [
      "24",
      "27",
      "26",
      "32"
    ],
    "reponse": 1
  },
  {
    "id": "q1259",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel type de pain plat, souvent utilisé pour les kebabs, est originaire du Moyen-Orient ?",
    "options": [
      "La naan",
      "La tortilla",
      "La focaccia",
      "Le pain pita"
    ],
    "reponse": 3
  },
  {
    "id": "q1260",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 au carré ?",
    "options": [
      "10",
      "7",
      "12",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q1261",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Lettonie ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1262",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 281 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "4e siècle",
      "3e siècle",
      "1e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1263",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain russe est l'auteur de « Guerre et Paix » ?",
    "options": [
      "Léon Tolstoï",
      "Nicolas Gogol",
      "Anton Tchekhov",
      "Fiodor Dostoïevski"
    ],
    "reponse": 0
  },
  {
    "id": "q1264",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 808 appartient à quel siècle ?",
    "options": [
      "9e siècle",
      "7e siècle",
      "8e siècle",
      "10e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1265",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 300 ?",
    "options": [
      "100",
      "102",
      "90",
      "91"
    ],
    "reponse": 2
  },
  {
    "id": "q1266",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 × 4 ?",
    "options": [
      "64",
      "54",
      "69",
      "61"
    ],
    "reponse": 0
  },
  {
    "id": "q1267",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2570 en chiffres romains ?",
    "options": [
      "MMDLXX",
      "MMDLXXI",
      "MMDLX",
      "MMDLXXV"
    ],
    "reponse": 0
  },
  {
    "id": "q1268",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Allemagne ?",
    "options": [
      "🇨🇱",
      "🇲🇩",
      "🇩🇪",
      "🇸🇻"
    ],
    "reponse": 2
  },
  {
    "id": "q1269",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Namibie ?",
    "options": [
      "Dollar namibien",
      "Kina",
      "Dollar guyanien",
      "Dinar algérien"
    ],
    "reponse": 0
  },
  {
    "id": "q1270",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse égyptienne de la magie et de la maternité, épouse d'Osiris ?",
    "options": [
      "Nephtys",
      "Isis",
      "Hathor",
      "Bastet"
    ],
    "reponse": 1
  },
  {
    "id": "q1271",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guatemala ?",
    "options": [
      "Océanie",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q1272",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat indien est un curry crémeux à base de poulet mariné dans du yaourt et des épices ?",
    "options": [
      "Le poulet tikka masala",
      "Le korma",
      "Le biryani",
      "Le tandoori"
    ],
    "reponse": 0
  },
  {
    "id": "q1273",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 316 - 214 ?",
    "options": [
      "102",
      "104",
      "103",
      "101"
    ],
    "reponse": 0
  },
  {
    "id": "q1274",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 16 jour(s) ?",
    "options": [
      "403",
      "448",
      "384",
      "428"
    ],
    "reponse": 2
  },
  {
    "id": "q1275",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 2 ?",
    "options": [
      "36",
      "41",
      "35",
      "39"
    ],
    "reponse": 0
  },
  {
    "id": "q1276",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel instrument est le plus grand de la famille des cordes frottées, joué debout ou assis avec un pied ?",
    "options": [
      "L'alto",
      "Le violoncelle",
      "Le violon",
      "La contrebasse"
    ],
    "reponse": 3
  },
  {
    "id": "q1277",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Royaume-Uni ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1278",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kazakhstan ?",
    "options": [
      "🇷🇺",
      "🇵🇹",
      "🇰🇿",
      "🇲🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q1279",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle ville a accueilli les premiers Jeux olympiques modernes en 1896 ?",
    "options": [
      "Rome",
      "Paris",
      "Athènes",
      "Londres"
    ],
    "reponse": 2
  },
  {
    "id": "q1280",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Croatie ?",
    "options": [
      "Asuncion",
      "Copenhague",
      "Berne",
      "Zagreb"
    ],
    "reponse": 3
  },
  {
    "id": "q1281",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur hongrois a écrit les « Rhapsodies hongroises » pour piano ?",
    "options": [
      "Johannes Brahms",
      "Franz Liszt",
      "Béla Bartók",
      "Zoltán Kodály"
    ],
    "reponse": 1
  },
  {
    "id": "q1282",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Moldavie ?",
    "options": [
      "Zloty",
      "Quetzal",
      "Leu moldave",
      "Tugrik"
    ],
    "reponse": 2
  },
  {
    "id": "q1283",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Islamabad est la capitale de quel pays ?",
    "options": [
      "Mozambique",
      "Pakistan",
      "Corée du Sud",
      "Australie"
    ],
    "reponse": 1
  },
  {
    "id": "q1284",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 503 - 497 ?",
    "options": [
      "9",
      "6",
      "8",
      "4"
    ],
    "reponse": 1
  },
  {
    "id": "q1285",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Podgorica est la capitale de quel pays ?",
    "options": [
      "Serbie",
      "Chypre",
      "Qatar",
      "Monténégro"
    ],
    "reponse": 3
  },
  {
    "id": "q1286",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Azerbaïdjan ?",
    "options": [
      "Londres",
      "Hanoï",
      "Bakou",
      "Bratislava"
    ],
    "reponse": 2
  },
  {
    "id": "q1287",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Malte ?",
    "options": [
      "Washington",
      "Skopje",
      "Katmandou",
      "La Valette"
    ],
    "reponse": 3
  },
  {
    "id": "q1288",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse grecque des moissons et de l'agriculture ?",
    "options": [
      "Déméter",
      "Héra",
      "Perséphone",
      "Hestia"
    ],
    "reponse": 0
  },
  {
    "id": "q1289",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chypre ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Afrique",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1290",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse nordique de l'amour, de la beauté et de la fertilité ?",
    "options": [
      "Frigg",
      "Idunn",
      "Sif",
      "Freyja"
    ],
    "reponse": 3
  },
  {
    "id": "q1291",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Estonie",
      "Autriche",
      "Kenya",
      "Philippines"
    ],
    "reponse": 1
  },
  {
    "id": "q1292",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Frankenstein ou le Prométhée moderne » ?",
    "options": [
      "Mary Shelley",
      "Jane Austen",
      "Emily Brontë",
      "Bram Stoker"
    ],
    "reponse": 0
  },
  {
    "id": "q1293",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 100 ?",
    "options": [
      "42",
      "58",
      "50",
      "45"
    ],
    "reponse": 2
  },
  {
    "id": "q1294",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3889 en chiffres romains ?",
    "options": [
      "MMMDCCCXCIV",
      "MMMDCCCXC",
      "MMMDCCCLXXXVIII",
      "MMMDCCCLXXXIX"
    ],
    "reponse": 3
  },
  {
    "id": "q1295",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 60 ?",
    "options": [
      "17",
      "12",
      "13",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q1296",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Jordanie ?",
    "options": [
      "🇯🇴",
      "🇨🇮",
      "🇨🇱",
      "🇳🇮"
    ],
    "reponse": 0
  },
  {
    "id": "q1297",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 769 en chiffres romains ?",
    "options": [
      "DCCLXXIV",
      "DCCLXVII",
      "DCCLXX",
      "DCCLXIX"
    ],
    "reponse": 3
  },
  {
    "id": "q1298",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port Moresby est la capitale de quel pays ?",
    "options": [
      "Fidji",
      "Nigeria",
      "Suriname",
      "Papouasie-Nouvelle-Guinée"
    ],
    "reponse": 3
  },
  {
    "id": "q1299",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suriname ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q1300",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1080 et 1330 ?",
    "options": [
      "258",
      "250",
      "251",
      "233"
    ],
    "reponse": 1
  },
  {
    "id": "q1301",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Honduras ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q1302",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 20 ?",
    "options": [
      "380",
      "404",
      "414",
      "388"
    ],
    "reponse": 0
  },
  {
    "id": "q1303",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain britannique a écrit « Sa Majesté des mouches » ?",
    "options": [
      "William Golding",
      "William Faulkner",
      "J.D. Salinger",
      "John Steinbeck"
    ],
    "reponse": 0
  },
  {
    "id": "q1304",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le plus grand félin sauvage du monde ?",
    "options": [
      "Le léopard",
      "Le jaguar",
      "Le tigre de Sibérie",
      "Le lion"
    ],
    "reponse": 2
  },
  {
    "id": "q1305",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "🇨🇴",
      "🇧🇬",
      "🇯🇴",
      "🇵🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q1306",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇿🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Tunisie",
      "Zimbabwe",
      "Arménie",
      "Norvège"
    ],
    "reponse": 1
  },
  {
    "id": "q1307",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 198 ÷ 11 ?",
    "options": [
      "18",
      "16",
      "15",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q1308",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCXXIX en chiffres romains ?",
    "options": [
      "2228",
      "2229",
      "2231",
      "2219"
    ],
    "reponse": 1
  },
  {
    "id": "q1309",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCDXCI en chiffres romains ?",
    "options": [
      "1491",
      "1486",
      "1501",
      "1493"
    ],
    "reponse": 0
  },
  {
    "id": "q1310",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République tchèque ?",
    "options": [
      "Varsovie",
      "Bakou",
      "Prague",
      "Lima"
    ],
    "reponse": 2
  },
  {
    "id": "q1311",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle est la déesse grecque de la justice et de l'ordre divin ?",
    "options": [
      "Tyché",
      "Diké",
      "Thémis",
      "Némésis"
    ],
    "reponse": 2
  },
  {
    "id": "q1312",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel rappeur français a fondé le groupe NTM avec Kool Shen ?",
    "options": [
      "Rohff",
      "MC Solaar",
      "Booba",
      "JoeyStarr"
    ],
    "reponse": 3
  },
  {
    "id": "q1313",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mali ?",
    "options": [
      "Asie",
      "Europe",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1314",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 962 - 521 ?",
    "options": [
      "442",
      "444",
      "441",
      "443"
    ],
    "reponse": 2
  },
  {
    "id": "q1315",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays organise traditionnellement le Super Bowl, finale du football américain ?",
    "options": [
      "Le Mexique",
      "Le Canada",
      "Le Royaume-Uni",
      "Les États-Unis"
    ],
    "reponse": 3
  },
  {
    "id": "q1316",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Roumanie ?",
    "options": [
      "Naira",
      "Leu roumain",
      "Dinar tunisien",
      "Rouble russe"
    ],
    "reponse": 1
  },
  {
    "id": "q1317",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLV en chiffres romains ?",
    "options": [
      "2455",
      "2445",
      "2450",
      "2454"
    ],
    "reponse": 0
  },
  {
    "id": "q1318",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 941 + 702 ?",
    "options": [
      "1646",
      "1643",
      "1644",
      "1645"
    ],
    "reponse": 1
  },
  {
    "id": "q1319",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Laos ?",
    "options": [
      "Afrique",
      "Océanie",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1320",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇧 De quel pays est-ce le drapeau ?",
    "options": [
      "Kenya",
      "Irlande",
      "Royaume-Uni",
      "Pologne"
    ],
    "reponse": 2
  },
  {
    "id": "q1321",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tallinn est la capitale de quel pays ?",
    "options": [
      "Estonie",
      "Colombie",
      "Samoa",
      "Liban"
    ],
    "reponse": 0
  },
  {
    "id": "q1322",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guinée ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1323",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de temps dure un quart-temps au basket-ball (règles FIBA) ?",
    "options": [
      "15 minutes",
      "12 minutes",
      "8 minutes",
      "10 minutes"
    ],
    "reponse": 3
  },
  {
    "id": "q1324",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Belize ?",
    "options": [
      "Dollar bélizien",
      "Rouble biélorusse",
      "Peso uruguayen",
      "Kwanza"
    ],
    "reponse": 0
  },
  {
    "id": "q1325",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Sénégal ?",
    "options": [
      "Dakar",
      "Dodoma",
      "Amsterdam",
      "Washington"
    ],
    "reponse": 0
  },
  {
    "id": "q1326",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bruxelles est la capitale de quel pays ?",
    "options": [
      "Belgique",
      "Soudan",
      "Slovaquie",
      "Roumanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1327",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CXXVI en chiffres romains ?",
    "options": [
      "128",
      "121",
      "125",
      "126"
    ],
    "reponse": 3
  },
  {
    "id": "q1328",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 8000 g ?",
    "options": [
      "6",
      "5",
      "7",
      "8"
    ],
    "reponse": 3
  },
  {
    "id": "q1329",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bangladesh ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q1330",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Jakarta est la capitale de quel pays ?",
    "options": [
      "Croatie",
      "Indonésie",
      "Niger",
      "Angola"
    ],
    "reponse": 1
  },
  {
    "id": "q1331",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 2 m ?",
    "options": [
      "195",
      "198",
      "186",
      "200"
    ],
    "reponse": 3
  },
  {
    "id": "q1332",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre néerlandais est célèbre pour « La Nuit étoilée » et s'est coupé une partie de l'oreille ?",
    "options": [
      "Rembrandt",
      "Vincent van Gogh",
      "Claude Monet",
      "Johannes Vermeer"
    ],
    "reponse": 1
  },
  {
    "id": "q1333",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mo » ?",
    "options": [
      "Gallium",
      "Calcium",
      "Molybdène",
      "Vanadium"
    ],
    "reponse": 2
  },
  {
    "id": "q1334",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 26 + 643 ?",
    "options": [
      "670",
      "667",
      "666",
      "669"
    ],
    "reponse": 3
  },
  {
    "id": "q1335",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 12 ?",
    "options": [
      "156",
      "152",
      "150",
      "157"
    ],
    "reponse": 0
  },
  {
    "id": "q1336",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDXL en chiffres romains ?",
    "options": [
      "2435",
      "2430",
      "2440",
      "2450"
    ],
    "reponse": 2
  },
  {
    "id": "q1337",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle ville est surnommée la « Ville lumière » ?",
    "options": [
      "Rome",
      "Paris",
      "Londres",
      "New York"
    ],
    "reponse": 1
  },
  {
    "id": "q1338",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1725 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "16e siècle",
      "17e siècle",
      "19e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1339",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Chine ?",
    "options": [
      "Colon costaricain",
      "Manat azerbaïdjanais",
      "Roupie indonésienne",
      "Yuan"
    ],
    "reponse": 3
  },
  {
    "id": "q1340",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 128 ÷ 8 ?",
    "options": [
      "16",
      "15",
      "12",
      "19"
    ],
    "reponse": 0
  },
  {
    "id": "q1341",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Maroc ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q1342",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 999 - 140 ?",
    "options": [
      "862",
      "859",
      "856",
      "857"
    ],
    "reponse": 1
  },
  {
    "id": "q1343",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel monument parisien abrite le tombeau de Napoléon Ier ?",
    "options": [
      "Notre-Dame de Paris",
      "Les Invalides",
      "Le Panthéon",
      "La Sainte-Chapelle"
    ],
    "reponse": 1
  },
  {
    "id": "q1344",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a créé le personnage d'Alice au pays des merveilles ?",
    "options": [
      "J.M. Barrie",
      "A.A. Milne",
      "Lewis Carroll",
      "Kenneth Grahame"
    ],
    "reponse": 2
  },
  {
    "id": "q1345",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a créé l'univers de « Twin Peaks » et « Mulholland Drive » ?",
    "options": [
      "Tim Burton",
      "David Fincher",
      "David Cronenberg",
      "David Lynch"
    ],
    "reponse": 3
  },
  {
    "id": "q1346",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation américaine met en scène une famille dysfonctionnelle à Quahog ?",
    "options": [
      "Family Guy",
      "Les Simpson",
      "American Dad",
      "Bob's Burgers"
    ],
    "reponse": 0
  },
  {
    "id": "q1347",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument new-yorkais offert par la France en 1886 symbolise la liberté ?",
    "options": [
      "L'Empire State Building",
      "Le Rockefeller Center",
      "Le pont de Brooklyn",
      "La statue de la Liberté"
    ],
    "reponse": 3
  },
  {
    "id": "q1348",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 36 ÷ 3 ?",
    "options": [
      "13",
      "12",
      "14",
      "11"
    ],
    "reponse": 1
  },
  {
    "id": "q1349",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat vietnamien est une soupe de nouilles de riz au bouillon parfumé, souvent au bœuf ?",
    "options": [
      "Les nems",
      "Le pho",
      "Le banh mi",
      "Le bun cha"
    ],
    "reponse": 1
  },
  {
    "id": "q1350",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Guatemala ?",
    "options": [
      "Leu moldave",
      "Quetzal",
      "Won sud-coréen",
      "Dollar surinamais"
    ],
    "reponse": 1
  },
  {
    "id": "q1351",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné James Bond dans « Skyfall » et « Spectre » ?",
    "options": [
      "Pierce Brosnan",
      "Daniel Craig",
      "Sean Connery",
      "Roger Moore"
    ],
    "reponse": 1
  },
  {
    "id": "q1352",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Vanuatu ?",
    "options": [
      "Dollar surinamais",
      "Vatu",
      "Livre égyptienne",
      "Cordoba"
    ],
    "reponse": 1
  },
  {
    "id": "q1353",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Russie ?",
    "options": [
      "🇲🇬",
      "🇨🇷",
      "🇷🇺",
      "🇧🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q1354",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sn » ?",
    "options": [
      "Vanadium",
      "Zirconium",
      "Krypton",
      "Étain"
    ],
    "reponse": 3
  },
  {
    "id": "q1355",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Rwanda",
      "Samoa",
      "Ukraine"
    ],
    "reponse": 3
  },
  {
    "id": "q1356",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de rugby à XV sur le terrain ?",
    "options": [
      "15",
      "11",
      "13",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q1357",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « U » ?",
    "options": [
      "Uranium",
      "Plutonium",
      "Cadmium",
      "Cobalt"
    ],
    "reponse": 0
  },
  {
    "id": "q1358",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 189 ÷ 7 ?",
    "options": [
      "23",
      "27",
      "25",
      "29"
    ],
    "reponse": 1
  },
  {
    "id": "q1359",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ra » ?",
    "options": [
      "Radium",
      "Xénon",
      "Azote",
      "Zirconium"
    ],
    "reponse": 0
  },
  {
    "id": "q1360",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bénin ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Océanie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1361",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Kr » ?",
    "options": [
      "Krypton",
      "Azote",
      "Iode",
      "Bore"
    ],
    "reponse": 0
  },
  {
    "id": "q1362",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport utilise-t-on un filet, une raquette et un volant ?",
    "options": [
      "Le squash",
      "Le tennis",
      "Le tennis de table",
      "Le badminton"
    ],
    "reponse": 3
  },
  {
    "id": "q1363",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 217 - 214 ?",
    "options": [
      "4",
      "2",
      "1",
      "3"
    ],
    "reponse": 3
  },
  {
    "id": "q1364",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 16 ÷ 8 ?",
    "options": [
      "2",
      "0",
      "5",
      "1"
    ],
    "reponse": 0
  },
  {
    "id": "q1365",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle créature grecque changeait quiconque la regardait en pierre ?",
    "options": [
      "Les Sirènes",
      "Le Sphinx",
      "La Chimère",
      "La Méduse"
    ],
    "reponse": 3
  },
  {
    "id": "q1366",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel explorateur portugais a le premier atteint l'Inde par la mer en contournant l'Afrique ?",
    "options": [
      "Henri le Navigateur",
      "Christophe Colomb",
      "Vasco de Gama",
      "Fernand de Magellan"
    ],
    "reponse": 2
  },
  {
    "id": "q1367",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 1 jour(s) ?",
    "options": [
      "26",
      "23",
      "24",
      "25"
    ],
    "reponse": 2
  },
  {
    "id": "q1368",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 63 ÷ 9 ?",
    "options": [
      "5",
      "4",
      "8",
      "7"
    ],
    "reponse": 3
  },
  {
    "id": "q1369",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a créé le jeu vidéo « Pong » en 1972 ?",
    "options": [
      "Namco",
      "Nintendo",
      "Atari",
      "Sega"
    ],
    "reponse": 2
  },
  {
    "id": "q1370",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 261 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "2e siècle",
      "3e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1371",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Na » ?",
    "options": [
      "Cérium",
      "Cuivre",
      "Sodium",
      "Polonium"
    ],
    "reponse": 2
  },
  {
    "id": "q1372",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel animal marin change de sexe au cours de sa vie, popularisé par un film d'animation ?",
    "options": [
      "L'hippocampe",
      "Le poisson-clown",
      "Le poisson-lune",
      "Le poisson-globe"
    ],
    "reponse": 1
  },
  {
    "id": "q1373",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Soudan ?",
    "options": [
      "🇧🇷",
      "🇲🇲",
      "🇲🇰",
      "🇸🇩"
    ],
    "reponse": 3
  },
  {
    "id": "q1374",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Azote ?",
    "options": [
      "N",
      "Cd",
      "Ga",
      "Sc"
    ],
    "reponse": 0
  },
  {
    "id": "q1375",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Yaoundé est la capitale de quel pays ?",
    "options": [
      "Danemark",
      "Tanzanie",
      "Cameroun",
      "République tchèque"
    ],
    "reponse": 2
  },
  {
    "id": "q1376",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays compte le plus d'habitants au monde en 2024 ?",
    "options": [
      "L'Indonésie",
      "L'Inde",
      "Les États-Unis",
      "La Chine"
    ],
    "reponse": 1
  },
  {
    "id": "q1377",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Bulgarie ?",
    "options": [
      "🇺🇸",
      "🇧🇬",
      "🇳🇱",
      "🇨🇮"
    ],
    "reponse": 1
  },
  {
    "id": "q1378",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel scientifique a développé le premier vaccin contre la variole ?",
    "options": [
      "Robert Koch",
      "Alexander Fleming",
      "Edward Jenner",
      "Louis Pasteur"
    ],
    "reponse": 2
  },
  {
    "id": "q1379",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Windhoek est la capitale de quel pays ?",
    "options": [
      "Argentine",
      "France",
      "Namibie",
      "Ouganda"
    ],
    "reponse": 2
  },
  {
    "id": "q1380",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Égypte ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q1381",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1948 appartient à quel siècle ?",
    "options": [
      "20e siècle",
      "19e siècle",
      "18e siècle",
      "21e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1382",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Togo ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1383",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quels sont les deux frères jumeaux fondateurs légendaires de Rome ?",
    "options": [
      "Romulus et Remus",
      "Cronos et Zeus",
      "Énée et Ascagne",
      "Castor et Pollux"
    ],
    "reponse": 0
  },
  {
    "id": "q1384",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 155 + 207 ?",
    "options": [
      "362",
      "359",
      "361",
      "364"
    ],
    "reponse": 0
  },
  {
    "id": "q1385",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Malaisie ?",
    "options": [
      "Peso uruguayen",
      "Quetzal",
      "Ringgit",
      "Kwanza"
    ],
    "reponse": 2
  },
  {
    "id": "q1386",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Macédoine du Nord ?",
    "options": [
      "Koweït City",
      "Nicosie",
      "Skopje",
      "Tunis"
    ],
    "reponse": 2
  },
  {
    "id": "q1387",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel rappeur américain est surnommé « Slim Shady » ?",
    "options": [
      "Jay-Z",
      "Eminem",
      "50 Cent",
      "Snoop Dogg"
    ],
    "reponse": 1
  },
  {
    "id": "q1388",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1088 et 1321 ?",
    "options": [
      "240",
      "233",
      "257",
      "232"
    ],
    "reponse": 1
  },
  {
    "id": "q1389",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel personnage mythologique grec est condamné à pousser éternellement un rocher en haut d'une colline ?",
    "options": [
      "Sisyphe",
      "Ixion",
      "Prométhée",
      "Tantale"
    ],
    "reponse": 0
  },
  {
    "id": "q1390",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 280 + 176 ?",
    "options": [
      "453",
      "458",
      "456",
      "455"
    ],
    "reponse": 2
  },
  {
    "id": "q1391",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Serbie ?",
    "options": [
      "🇲🇽",
      "🇷🇸",
      "🇪🇸",
      "🇩🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q1392",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène un cartel de la drogue mexicain et l'agence antidrogue américaine (DEA) ?",
    "options": [
      "Ozark",
      "Breaking Bad",
      "Narcos",
      "Queen of the South"
    ],
    "reponse": 2
  },
  {
    "id": "q1393",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Le Petit Chaperon rouge » et « Cendrillon » sous forme de contes ?",
    "options": [
      "Jean de La Fontaine",
      "Andersen",
      "Charles Perrault",
      "Les frères Grimm"
    ],
    "reponse": 2
  },
  {
    "id": "q1394",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 63 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "1e siècle",
      "2e siècle",
      "3e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1395",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le principal composant du noyau d'un atome, avec les neutrons ?",
    "options": [
      "Les quarks",
      "Les protons",
      "Les photons",
      "Les électrons"
    ],
    "reponse": 1
  },
  {
    "id": "q1396",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est connu pour le tube « Billie Jean » et l'album « Thriller » ?",
    "options": [
      "Michael Jackson",
      "Lionel Richie",
      "Stevie Wonder",
      "Prince"
    ],
    "reponse": 0
  },
  {
    "id": "q1397",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel monstre mi-homme mi-taureau vivait dans le labyrinthe de Crète ?",
    "options": [
      "Cerbère",
      "Le Cyclope",
      "Le Minotaure",
      "Le Sphinx"
    ],
    "reponse": 2
  },
  {
    "id": "q1398",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Norvège ?",
    "options": [
      "Livre égyptienne",
      "Shilling ougandais",
      "Lempira",
      "Couronne norvégienne"
    ],
    "reponse": 3
  },
  {
    "id": "q1399",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ga » ?",
    "options": [
      "Cadmium",
      "Gallium",
      "Xénon",
      "Azote"
    ],
    "reponse": 1
  },
  {
    "id": "q1400",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 × 6 ?",
    "options": [
      "88",
      "91",
      "109",
      "96"
    ],
    "reponse": 3
  },
  {
    "id": "q1401",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 23 - 5 ?",
    "options": [
      "20",
      "18",
      "15",
      "17"
    ],
    "reponse": 1
  },
  {
    "id": "q1402",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Maximus dans « Gladiator », rôle qui lui a valu l'Oscar ?",
    "options": [
      "Eric Bana",
      "Hugh Jackman",
      "Russell Brand",
      "Russell Crowe"
    ],
    "reponse": 3
  },
  {
    "id": "q1403",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 262 en chiffres romains ?",
    "options": [
      "CCLXIV",
      "CCLII",
      "CCLVII",
      "CCLXII"
    ],
    "reponse": 3
  },
  {
    "id": "q1404",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quel sport se joue traditionnellement sur gazon avec un maillet et une balle en bois, ancêtre du golf ou du hockey selon les versions ?",
    "options": [
      "Le bowls",
      "Le polo",
      "Le cricket",
      "Le croquet"
    ],
    "reponse": 3
  },
  {
    "id": "q1405",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Chlore ?",
    "options": [
      "Zr",
      "Mg",
      "Cl",
      "Sr"
    ],
    "reponse": 2
  },
  {
    "id": "q1406",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 626 + 895 ?",
    "options": [
      "1523",
      "1519",
      "1524",
      "1521"
    ],
    "reponse": 3
  },
  {
    "id": "q1407",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Belize",
      "Yémen",
      "Albanie",
      "Portugal"
    ],
    "reponse": 2
  },
  {
    "id": "q1408",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Côte d'Ivoire ?",
    "options": [
      "Zloty",
      "Rouble russe",
      "Kwanza",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q1409",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est surnommé le « roi de la jungle » ?",
    "options": [
      "Le léopard",
      "Le lion",
      "Le tigre",
      "Le jaguar"
    ],
    "reponse": 1
  },
  {
    "id": "q1410",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kenya ?",
    "options": [
      "🇵🇦",
      "🇸🇦",
      "🇲🇩",
      "🇰🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q1411",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle vitamine est principalement produite par la peau grâce au soleil ?",
    "options": [
      "La vitamine B12",
      "La vitamine A",
      "La vitamine D",
      "La vitamine C"
    ],
    "reponse": 2
  },
  {
    "id": "q1412",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3277 en chiffres romains ?",
    "options": [
      "MMMCCLXXVI",
      "MMMCCLXXVII",
      "MMMCCLXVII",
      "MMMCCLXXXII"
    ],
    "reponse": 1
  },
  {
    "id": "q1413",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « V » ?",
    "options": [
      "Magnésium",
      "Rhodium",
      "Vanadium",
      "Césium"
    ],
    "reponse": 2
  },
  {
    "id": "q1414",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel roi mythique a reçu le don de transformer en or tout ce qu'il touchait ?",
    "options": [
      "Tantale",
      "Sisyphe",
      "Midas",
      "Crésus"
    ],
    "reponse": 2
  },
  {
    "id": "q1415",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom du logiciel libre de retouche d'image souvent cité comme alternative gratuite à Photoshop ?",
    "options": [
      "Inkscape",
      "GIMP",
      "Blender",
      "Krita"
    ],
    "reponse": 1
  },
  {
    "id": "q1416",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le plus petit pays du monde ?",
    "options": [
      "Le Liechtenstein",
      "Le Vatican",
      "Saint-Marin",
      "Monaco"
    ],
    "reponse": 1
  },
  {
    "id": "q1417",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec est le père de tous les dieux olympiens selon la généalogie classique ?",
    "options": [
      "Ouranos",
      "Cronos",
      "Zeus",
      "Poséidon"
    ],
    "reponse": 1
  },
  {
    "id": "q1418",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dublin est la capitale de quel pays ?",
    "options": [
      "Irlande",
      "Jamaïque",
      "Papouasie-Nouvelle-Guinée",
      "Turquie"
    ],
    "reponse": 0
  },
  {
    "id": "q1419",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Nouvelle-Zélande",
      "Portugal",
      "Côte d'Ivoire",
      "Panama"
    ],
    "reponse": 2
  },
  {
    "id": "q1420",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Venezuela",
      "Espagne",
      "Azerbaïdjan",
      "Albanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1421",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Albanie ?",
    "options": [
      "Hryvnia",
      "Dollar namibien",
      "Zloty",
      "Lek"
    ],
    "reponse": 3
  },
  {
    "id": "q1422",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 984 + 344 ?",
    "options": [
      "1327",
      "1330",
      "1326",
      "1328"
    ],
    "reponse": 3
  },
  {
    "id": "q1423",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année a débuté la Première Guerre mondiale ?",
    "options": [
      "1912",
      "1914",
      "1918",
      "1916"
    ],
    "reponse": 1
  },
  {
    "id": "q1424",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français a écrit « L'Étranger » et « La Peste » ?",
    "options": [
      "Albert Camus",
      "Jean-Paul Sartre",
      "André Gide",
      "André Malraux"
    ],
    "reponse": 0
  },
  {
    "id": "q1425",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel duo de chercheurs a découvert la structure en double hélice de l'ADN en 1953 ?",
    "options": [
      "Bohr et Rutherford",
      "Pasteur et Koch",
      "Watson et Crick",
      "Curie et Becquerel"
    ],
    "reponse": 2
  },
  {
    "id": "q1426",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Rwanda ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q1427",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit la série de romans « Le Trône de fer » ?",
    "options": [
      "Robert Jordan",
      "Brandon Sanderson",
      "J.R.R. Tolkien",
      "George R.R. Martin"
    ],
    "reponse": 3
  },
  {
    "id": "q1428",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 112 ÷ 4 ?",
    "options": [
      "28",
      "29",
      "23",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q1429",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit la saga « Le Seigneur des anneaux » ?",
    "options": [
      "George R.R. Martin",
      "Terry Pratchett",
      "J.R.R. Tolkien",
      "C.S. Lewis"
    ],
    "reponse": 2
  },
  {
    "id": "q1430",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom de la force qui attire les objets vers le centre de la Terre ?",
    "options": [
      "La gravité",
      "L'inertie",
      "Le magnétisme",
      "La friction"
    ],
    "reponse": 0
  },
  {
    "id": "q1431",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Irak ?",
    "options": [
      "🇭🇷",
      "🇹🇿",
      "🇮🇶",
      "🇭🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q1432",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 160 ml ?",
    "options": [
      "16",
      "15",
      "17",
      "19"
    ],
    "reponse": 0
  },
  {
    "id": "q1433",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel réseau social a été fondé par Mark Zuckerberg en 2004 ?",
    "options": [
      "Instagram",
      "LinkedIn",
      "Facebook",
      "Twitter"
    ],
    "reponse": 2
  },
  {
    "id": "q1434",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Pologne ?",
    "options": [
      "🇨🇿",
      "🇵🇱",
      "🇹🇬",
      "🇧🇯"
    ],
    "reponse": 1
  },
  {
    "id": "q1435",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel duo a fondé Google ?",
    "options": [
      "Bill Gates et Paul Allen",
      "Larry Page et Sergey Brin",
      "Jeff Bezos et Elon Musk",
      "Steve Jobs et Steve Wozniak"
    ],
    "reponse": 1
  },
  {
    "id": "q1436",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur a mis en scène « Titanic » et « Avatar » ?",
    "options": [
      "Steven Spielberg",
      "James Cameron",
      "Ridley Scott",
      "Peter Jackson"
    ],
    "reponse": 1
  },
  {
    "id": "q1437",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Belgique",
      "Mozambique",
      "Monténégro",
      "Tanzanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1438",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est la vitesse de la lumière dans le vide (arrondie) ?",
    "options": [
      "1 000 000 km/s",
      "150 000 km/s",
      "500 000 km/s",
      "300 000 km/s"
    ],
    "reponse": 3
  },
  {
    "id": "q1439",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇫 De quel pays est-ce le drapeau ?",
    "options": [
      "Espagne",
      "Afghanistan",
      "Russie",
      "Jordanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1440",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Laos",
      "Arménie",
      "Namibie",
      "Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q1441",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 832 - 360 ?",
    "options": [
      "472",
      "473",
      "475",
      "469"
    ],
    "reponse": 0
  },
  {
    "id": "q1442",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ouganda ?",
    "options": [
      "Kampala",
      "Tbilissi",
      "Tachkent",
      "Dacca"
    ],
    "reponse": 0
  },
  {
    "id": "q1443",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Côte d'Ivoire ?",
    "options": [
      "🇨🇮",
      "🇩🇴",
      "🇰🇼",
      "🇩🇰"
    ],
    "reponse": 0
  },
  {
    "id": "q1444",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série animée met en scène la famille jaune Simpson à Springfield ?",
    "options": [
      "South Park",
      "Bob's Burgers",
      "Family Guy",
      "Les Simpson"
    ],
    "reponse": 3
  },
  {
    "id": "q1445",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3481 en chiffres romains ?",
    "options": [
      "MMMCDLXXVI",
      "MMMCDLXXXI",
      "MMMCDLXXXII",
      "MMMCDLXXXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1446",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Zagreb est la capitale de quel pays ?",
    "options": [
      "Croatie",
      "Roumanie",
      "Belgique",
      "Honduras"
    ],
    "reponse": 0
  },
  {
    "id": "q1447",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 823 en chiffres romains ?",
    "options": [
      "DCCCXXIV",
      "DCCCXIII",
      "DCCCXXIII",
      "DCCCXXI"
    ],
    "reponse": 2
  },
  {
    "id": "q1448",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve El Salvador ?",
    "options": [
      "Europe",
      "Asie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q1449",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a développé le langage de programmation C# ?",
    "options": [
      "Google",
      "Apple",
      "Microsoft",
      "Oracle"
    ],
    "reponse": 2
  },
  {
    "id": "q1450",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Cuba",
      "Vanuatu",
      "Libye",
      "Honduras"
    ],
    "reponse": 3
  },
  {
    "id": "q1451",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Hélium ?",
    "options": [
      "Al",
      "Be",
      "He",
      "Sc"
    ],
    "reponse": 2
  },
  {
    "id": "q1452",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 395 - 378 ?",
    "options": [
      "20",
      "15",
      "17",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q1453",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Royaume-Uni ?",
    "options": [
      "Pékin",
      "Oslo",
      "Londres",
      "Riyad"
    ],
    "reponse": 2
  },
  {
    "id": "q1454",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Brésil",
      "Venezuela",
      "Allemagne",
      "Hongrie"
    ],
    "reponse": 2
  },
  {
    "id": "q1455",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse française est connue pour « La Vie en rose » ?",
    "options": [
      "Mireille Mathieu",
      "Dalida",
      "Édith Piaf",
      "Barbara"
    ],
    "reponse": 2
  },
  {
    "id": "q1456",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 348 ÷ 12 ?",
    "options": [
      "29",
      "31",
      "32",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q1457",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel chimiste a établi le tableau périodique des éléments ?",
    "options": [
      "Marie Curie",
      "Dmitri Mendeleïev",
      "John Dalton",
      "Antoine Lavoisier"
    ],
    "reponse": 1
  },
  {
    "id": "q1458",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 500 ?",
    "options": [
      "295",
      "269",
      "300",
      "264"
    ],
    "reponse": 2
  },
  {
    "id": "q1459",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇶 De quel pays est-ce le drapeau ?",
    "options": [
      "Madagascar",
      "Royaume-Uni",
      "Irak",
      "Macédoine du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1460",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Le Comte de Monte-Cristo » ?",
    "options": [
      "Gustave Flaubert",
      "Alexandre Dumas",
      "Victor Hugo",
      "Stendhal"
    ],
    "reponse": 1
  },
  {
    "id": "q1461",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain américain a écrit « Le Vieil Homme et la Mer » ?",
    "options": [
      "John Steinbeck",
      "Ernest Hemingway",
      "William Faulkner",
      "F. Scott Fitzgerald"
    ],
    "reponse": 1
  },
  {
    "id": "q1462",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale sud-américaine se trouve à plus de 3500 mètres d'altitude ?",
    "options": [
      "Quito",
      "Bogota",
      "La Paz",
      "Lima"
    ],
    "reponse": 2
  },
  {
    "id": "q1463",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Autriche",
      "Inde",
      "Fidji",
      "Chine"
    ],
    "reponse": 2
  },
  {
    "id": "q1464",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 205 + 79 ?",
    "options": [
      "282",
      "285",
      "284",
      "283"
    ],
    "reponse": 2
  },
  {
    "id": "q1465",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Togo ?",
    "options": [
      "🇷🇼",
      "🇹🇬",
      "🇭🇹",
      "🇭🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q1466",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom scientifique de l'étoile autour de laquelle la Terre tourne ?",
    "options": [
      "Le Soleil",
      "Alpha du Centaure",
      "Sirius",
      "Proxima du Centaure"
    ],
    "reponse": 0
  },
  {
    "id": "q1467",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guyana ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1468",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Slovaquie ?",
    "options": [
      "Bratislava",
      "Doha",
      "Brasilia",
      "Oslo"
    ],
    "reponse": 0
  },
  {
    "id": "q1469",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom de la galaxie qui contient notre système solaire ?",
    "options": [
      "La Voie lactée",
      "Andromède",
      "Le Grand Nuage de Magellan",
      "La galaxie du Tourbillon"
    ],
    "reponse": 0
  },
  {
    "id": "q1470",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne le personnage principal du film « Joker » (2019) ?",
    "options": [
      "Heath Ledger",
      "Jared Leto",
      "Jack Nicholson",
      "Joaquin Phoenix"
    ],
    "reponse": 3
  },
  {
    "id": "q1471",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Pérou ?",
    "options": [
      "Port Moresby",
      "Kaboul",
      "Lima",
      "Montevideo"
    ],
    "reponse": 2
  },
  {
    "id": "q1472",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel mammifère marin utilise l'écholocation pour se repérer et chasser ?",
    "options": [
      "Le dauphin",
      "Le lamantin",
      "L'otarie",
      "Le phoque"
    ],
    "reponse": 0
  },
  {
    "id": "q1473",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays possède la plus longue frontière terrestre avec les États-Unis ?",
    "options": [
      "Le Groenland",
      "Cuba",
      "Le Mexique",
      "Le Canada"
    ],
    "reponse": 3
  },
  {
    "id": "q1474",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de handball sur le terrain ?",
    "options": [
      "7",
      "6",
      "5",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q1475",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCXVI en chiffres romains ?",
    "options": [
      "1126",
      "1115",
      "1116",
      "1118"
    ],
    "reponse": 2
  },
  {
    "id": "q1476",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 3600 s ?",
    "options": [
      "2",
      "-2",
      "4",
      "1"
    ],
    "reponse": 3
  },
  {
    "id": "q1477",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 34 h ?",
    "options": [
      "142273",
      "122400",
      "123330",
      "141688"
    ],
    "reponse": 1
  },
  {
    "id": "q1478",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Haïti ?",
    "options": [
      "Port-au-Prince",
      "Madrid",
      "Vilnius",
      "Prague"
    ],
    "reponse": 0
  },
  {
    "id": "q1479",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu hindou est représenté avec une tête d'éléphant ?",
    "options": [
      "Shiva",
      "Brahma",
      "Vishnou",
      "Ganesh"
    ],
    "reponse": 3
  },
  {
    "id": "q1480",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ouzbékistan ?",
    "options": [
      "🇧🇾",
      "🇩🇴",
      "🇺🇿",
      "🇬🇾"
    ],
    "reponse": 2
  },
  {
    "id": "q1481",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ti » ?",
    "options": [
      "Aluminium",
      "Argent",
      "Radon",
      "Titane"
    ],
    "reponse": 3
  },
  {
    "id": "q1482",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur italien est célèbre pour les westerns spaghetti comme « Le Bon, la Brute et le Truand » ?",
    "options": [
      "Sergio Leone",
      "Bernardo Bertolucci",
      "Dario Argento",
      "Federico Fellini"
    ],
    "reponse": 0
  },
  {
    "id": "q1483",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCXL en chiffres romains ?",
    "options": [
      "1238",
      "1241",
      "1240",
      "1250"
    ],
    "reponse": 2
  },
  {
    "id": "q1484",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇽 De quel pays est-ce le drapeau ?",
    "options": [
      "Mexique",
      "Costa Rica",
      "Honduras",
      "Botswana"
    ],
    "reponse": 0
  },
  {
    "id": "q1485",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 1900 cl ?",
    "options": [
      "21",
      "16",
      "24",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q1486",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Maroc ?",
    "options": [
      "Couronne islandaise",
      "Dirham marocain",
      "Lari",
      "Rouble biélorusse"
    ],
    "reponse": 1
  },
  {
    "id": "q1487",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel géant nordique surveille le pont arc-en-ciel Bifrost ?",
    "options": [
      "Baldr",
      "Vidar",
      "Heimdall",
      "Tyr"
    ],
    "reponse": 2
  },
  {
    "id": "q1488",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 338 - 37 ?",
    "options": [
      "303",
      "298",
      "301",
      "302"
    ],
    "reponse": 2
  },
  {
    "id": "q1489",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est traversé par le cercle polaire arctique et possède le Père Noël comme attraction touristique en Laponie ?",
    "options": [
      "La Finlande",
      "La Suède",
      "La Norvège",
      "La Russie"
    ],
    "reponse": 0
  },
  {
    "id": "q1490",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le nom de la fosse océanique la plus profonde du monde ?",
    "options": [
      "La fosse de Porto Rico",
      "La fosse du Japon",
      "La fosse de Java",
      "La fosse des Mariannes"
    ],
    "reponse": 3
  },
  {
    "id": "q1491",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel roi mythique grec a dû résoudre l'énigme du Sphinx pour sauver Thèbes ?",
    "options": [
      "Jason",
      "Persée",
      "Thésée",
      "Œdipe"
    ],
    "reponse": 3
  },
  {
    "id": "q1492",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur belge a écrit « Quand on n'a que l'amour » ?",
    "options": [
      "Arno",
      "Stromae",
      "Salvatore Adamo",
      "Jacques Brel"
    ],
    "reponse": 3
  },
  {
    "id": "q1493",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 812 en chiffres romains ?",
    "options": [
      "DCCCXIV",
      "DCCCXII",
      "DCCCII",
      "DCCCVII"
    ],
    "reponse": 1
  },
  {
    "id": "q1494",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Madagascar ?",
    "options": [
      "Mark convertible",
      "Ariary",
      "Naira",
      "Shilling tanzanien"
    ],
    "reponse": 1
  },
  {
    "id": "q1495",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel empereur a fait construire le Colisée de Rome ?",
    "options": [
      "Trajan",
      "Néron",
      "Vespasien",
      "Auguste"
    ],
    "reponse": 2
  },
  {
    "id": "q1496",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation japonaise met en scène un jeune ninja nommé Naruto Uzumaki ?",
    "options": [
      "One Piece",
      "Naruto",
      "Dragon Ball",
      "Bleach"
    ],
    "reponse": 1
  },
  {
    "id": "q1497",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 270 ÷ 15 ?",
    "options": [
      "19",
      "17",
      "18",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q1498",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Madrid est la capitale de quel pays ?",
    "options": [
      "Yémen",
      "Espagne",
      "Singapour",
      "Suriname"
    ],
    "reponse": 1
  },
  {
    "id": "q1499",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Qui est considérée comme la première programmeuse de l'histoire, pour ses travaux sur la machine analytique de Babbage ?",
    "options": [
      "Margaret Hamilton",
      "Grace Hopper",
      "Ada Lovelace",
      "Hedy Lamarr"
    ],
    "reponse": 2
  },
  {
    "id": "q1500",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 20 ?",
    "options": [
      "325",
      "385",
      "360",
      "387"
    ],
    "reponse": 2
  },
  {
    "id": "q1501",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 4000 ml ?",
    "options": [
      "1",
      "6",
      "4",
      "7"
    ],
    "reponse": 2
  },
  {
    "id": "q1502",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 61 + 173 ?",
    "options": [
      "231",
      "234",
      "237",
      "233"
    ],
    "reponse": 1
  },
  {
    "id": "q1503",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel prince troyen enlève Hélène et déclenche la guerre de Troie ?",
    "options": [
      "Priam",
      "Énée",
      "Pâris",
      "Hector"
    ],
    "reponse": 2
  },
  {
    "id": "q1504",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 860 appartient à quel siècle ?",
    "options": [
      "8e siècle",
      "7e siècle",
      "9e siècle",
      "10e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1505",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Yémen ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1506",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Togo",
      "Chine",
      "Bulgarie",
      "Royaume-Uni"
    ],
    "reponse": 0
  },
  {
    "id": "q1507",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 au carré ?",
    "options": [
      "639",
      "610",
      "625",
      "549"
    ],
    "reponse": 2
  },
  {
    "id": "q1508",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 36000 g ?",
    "options": [
      "30",
      "36",
      "38",
      "34"
    ],
    "reponse": 1
  },
  {
    "id": "q1509",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Rwanda ?",
    "options": [
      "Kigali",
      "Londres",
      "Ouagadougou",
      "Rabat"
    ],
    "reponse": 0
  },
  {
    "id": "q1510",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom de l'assistant vocal d'Apple ?",
    "options": [
      "Google Assistant",
      "Siri",
      "Alexa",
      "Cortana"
    ],
    "reponse": 1
  },
  {
    "id": "q1511",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 545 - 298 ?",
    "options": [
      "250",
      "245",
      "247",
      "248"
    ],
    "reponse": 2
  },
  {
    "id": "q1512",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 882 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "9e siècle",
      "8e siècle",
      "7e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1513",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Indonésie ?",
    "options": [
      "🇮🇩",
      "🇬🇦",
      "🇦🇱",
      "🇮🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q1514",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Vanuatu ?",
    "options": [
      "Europe",
      "Afrique",
      "Océanie",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q1515",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur allemand est l'auteur de la « 9e Symphonie » alors qu'il était devenu sourd ?",
    "options": [
      "Johannes Brahms",
      "Johann Sebastian Bach",
      "Ludwig van Beethoven",
      "Wolfgang Amadeus Mozart"
    ],
    "reponse": 2
  },
  {
    "id": "q1516",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 15 ?",
    "options": [
      "195",
      "208",
      "197",
      "171"
    ],
    "reponse": 0
  },
  {
    "id": "q1517",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de water-polo dans l'eau ?",
    "options": [
      "7",
      "8",
      "9",
      "6"
    ],
    "reponse": 0
  },
  {
    "id": "q1518",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Slovénie ?",
    "options": [
      "Yuan",
      "Euro",
      "Ringgit",
      "Dirham marocain"
    ],
    "reponse": 1
  },
  {
    "id": "q1519",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Palladium ?",
    "options": [
      "V",
      "W",
      "Pd",
      "Pb"
    ],
    "reponse": 2
  },
  {
    "id": "q1520",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 402 - 182 ?",
    "options": [
      "222",
      "219",
      "218",
      "220"
    ],
    "reponse": 3
  },
  {
    "id": "q1521",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel oiseau de proie est réputé pour sa vue exceptionnelle et chasse en plein jour ?",
    "options": [
      "La chouette",
      "Le vautour",
      "Le hibou",
      "L'aigle"
    ],
    "reponse": 3
  },
  {
    "id": "q1522",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1806 appartient à quel siècle ?",
    "options": [
      "17e siècle",
      "20e siècle",
      "18e siècle",
      "19e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1523",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel chien à plusieurs têtes garde l'entrée des Enfers dans la mythologie grecque ?",
    "options": [
      "Cerbère",
      "Le Sphinx",
      "La Chimère",
      "L'Hydre de Lerne"
    ],
    "reponse": 0
  },
  {
    "id": "q1524",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "New Delhi est la capitale de quel pays ?",
    "options": [
      "Inde",
      "Australie",
      "États-Unis",
      "Uruguay"
    ],
    "reponse": 0
  },
  {
    "id": "q1525",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Liban ?",
    "options": [
      "Lari",
      "Peso colombien",
      "Peso mexicain",
      "Livre libanaise"
    ],
    "reponse": 3
  },
  {
    "id": "q1526",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCXLVI en chiffres romains ?",
    "options": [
      "2256",
      "2241",
      "2251",
      "2246"
    ],
    "reponse": 3
  },
  {
    "id": "q1527",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCCLXXIII en chiffres romains ?",
    "options": [
      "868",
      "878",
      "863",
      "873"
    ],
    "reponse": 3
  },
  {
    "id": "q1528",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Singapour ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Océanie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1529",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Estonie ?",
    "options": [
      "Dinar koweïtien",
      "Euro",
      "Roupie indienne",
      "Dollar fidjien"
    ],
    "reponse": 1
  },
  {
    "id": "q1530",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bangkok est la capitale de quel pays ?",
    "options": [
      "Iran",
      "Libye",
      "Paraguay",
      "Thaïlande"
    ],
    "reponse": 3
  },
  {
    "id": "q1531",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat coréen consiste en du chou fermenté et épicé, servi en accompagnement ?",
    "options": [
      "Le tteokbokki",
      "Le bibimbap",
      "Le kimchi",
      "Le bulgogi"
    ],
    "reponse": 2
  },
  {
    "id": "q1532",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3430 en chiffres romains ?",
    "options": [
      "MMMCDXXX",
      "MMMCDXXXV",
      "MMMCDXX",
      "MMMCDXXVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q1533",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 58 - 26 ?",
    "options": [
      "29",
      "35",
      "32",
      "33"
    ],
    "reponse": 2
  },
  {
    "id": "q1534",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Uranium ?",
    "options": [
      "U",
      "Pb",
      "Pt",
      "K"
    ],
    "reponse": 0
  },
  {
    "id": "q1535",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Krypton ?",
    "options": [
      "Mo",
      "Ce",
      "Kr",
      "Tc"
    ],
    "reponse": 2
  },
  {
    "id": "q1536",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Myanmar",
      "Inde",
      "Venezuela"
    ],
    "reponse": 3
  },
  {
    "id": "q1537",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 100 ?",
    "options": [
      "10",
      "12",
      "13",
      "11"
    ],
    "reponse": 0
  },
  {
    "id": "q1538",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène une bande de braqueurs surnommés par des villes espagnoles comme Tokyo et Berlin ?",
    "options": [
      "Vis a vis",
      "La Casa de Papel",
      "Élite",
      "Narcos"
    ],
    "reponse": 1
  },
  {
    "id": "q1539",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du plus petit oiseau du monde ?",
    "options": [
      "Le moineau",
      "La mésange",
      "Le roitelet",
      "Le colibri"
    ],
    "reponse": 3
  },
  {
    "id": "q1540",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Iran ?",
    "options": [
      "Riyal saoudien",
      "Livre sterling",
      "Hryvnia",
      "Rial iranien"
    ],
    "reponse": 3
  },
  {
    "id": "q1541",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCLXXXIV en chiffres romains ?",
    "options": [
      "1784",
      "1785",
      "1783",
      "1779"
    ],
    "reponse": 0
  },
  {
    "id": "q1542",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Que signifie « GIF », format d'image animée populaire ?",
    "options": [
      "Graphic Image File",
      "Graphics Interchange Format",
      "Global Image Format",
      "General Interchange File"
    ],
    "reponse": 1
  },
  {
    "id": "q1543",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel plombier moustachu est le héros de nombreux jeux Nintendo ?",
    "options": [
      "Luigi",
      "Mario",
      "Yoshi",
      "Wario"
    ],
    "reponse": 1
  },
  {
    "id": "q1544",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film de 1994 raconte la vie d'un homme simple d'esprit qui traverse les grands événements du XXe siècle ?",
    "options": [
      "The Truman Show",
      "Forrest Gump",
      "Big",
      "Rain Man"
    ],
    "reponse": 1
  },
  {
    "id": "q1545",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel mouvement artistique et intellectuel a marqué le XVIIIe siècle en Europe, prônant la raison ?",
    "options": [
      "Le Baroque",
      "Les Lumières",
      "Le Romantisme",
      "L'Humanisme"
    ],
    "reponse": 1
  },
  {
    "id": "q1546",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lima est la capitale de quel pays ?",
    "options": [
      "Albanie",
      "Pérou",
      "Liban",
      "Cambodge"
    ],
    "reponse": 1
  },
  {
    "id": "q1547",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Népal ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q1548",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Cambodge ?",
    "options": [
      "Dollar namibien",
      "Couronne suédoise",
      "Riyal qatari",
      "Riel"
    ],
    "reponse": 3
  },
  {
    "id": "q1549",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Chypre ?",
    "options": [
      "🇨🇾",
      "🇦🇱",
      "🇮🇩",
      "🇪🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q1550",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Vanuatu ?",
    "options": [
      "Amman",
      "Le Caire",
      "Port-Vila",
      "Vienne"
    ],
    "reponse": 2
  },
  {
    "id": "q1551",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1236 et 1404 ?",
    "options": [
      "183",
      "168",
      "166",
      "138"
    ],
    "reponse": 1
  },
  {
    "id": "q1552",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal hiberne pendant l'hiver en Europe, notamment l'ours ou le hérisson ?",
    "options": [
      "Le renard",
      "Le loup",
      "Le hérisson",
      "Le sanglier"
    ],
    "reponse": 2
  },
  {
    "id": "q1553",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 679 - 445 ?",
    "options": [
      "233",
      "234",
      "235",
      "232"
    ],
    "reponse": 1
  },
  {
    "id": "q1554",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Macédoine du Nord",
      "Australie",
      "Corée du Nord",
      "Royaume-Uni"
    ],
    "reponse": 2
  },
  {
    "id": "q1555",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 739 + 144 ?",
    "options": [
      "884",
      "882",
      "883",
      "881"
    ],
    "reponse": 2
  },
  {
    "id": "q1556",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bogota est la capitale de quel pays ?",
    "options": [
      "Iran",
      "Biélorussie",
      "Colombie",
      "Panama"
    ],
    "reponse": 2
  },
  {
    "id": "q1557",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 662 + 954 ?",
    "options": [
      "1616",
      "1615",
      "1613",
      "1614"
    ],
    "reponse": 0
  },
  {
    "id": "q1558",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le plus grand reptile vivant actuellement ?",
    "options": [
      "Le crocodile marin",
      "L'anaconda",
      "Le varan de Komodo",
      "L'alligator"
    ],
    "reponse": 0
  },
  {
    "id": "q1559",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom de la molécule qui porte l'information génétique dans les cellules ?",
    "options": [
      "La protéine",
      "L'ADN",
      "L'ARN",
      "Le glucose"
    ],
    "reponse": 1
  },
  {
    "id": "q1560",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Combien de rounds compte généralement un championnat du monde de boxe poids lourds ?",
    "options": [
      "12",
      "15",
      "10",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q1561",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Équateur ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q1562",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle dynastie chinoise a fait construire la Grande Muraille dans sa forme actuelle ?",
    "options": [
      "La dynastie Tang",
      "La dynastie Qing",
      "La dynastie Ming",
      "La dynastie Han"
    ],
    "reponse": 2
  },
  {
    "id": "q1563",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1886 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "19e siècle",
      "17e siècle",
      "20e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1564",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros grec participe à la quête de la Toison d'or avec les Argonautes ?",
    "options": [
      "Thésée",
      "Achille",
      "Jason",
      "Persée"
    ],
    "reponse": 2
  },
  {
    "id": "q1565",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 26 h ?",
    "options": [
      "1679",
      "1755",
      "1584",
      "1560"
    ],
    "reponse": 3
  },
  {
    "id": "q1566",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Uruguay ?",
    "options": [
      "🇰🇵",
      "🇲🇪",
      "🇺🇾",
      "🇭🇷"
    ],
    "reponse": 2
  },
  {
    "id": "q1567",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec du vin et des festivités est aussi associé au théâtre ?",
    "options": [
      "Apollon",
      "Dionysos",
      "Pan",
      "Hermès"
    ],
    "reponse": 1
  },
  {
    "id": "q1568",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel sculpteur italien de la Renaissance a réalisé le « David » exposé à Florence ?",
    "options": [
      "Michel-Ange",
      "Donatello",
      "Bernini",
      "Léonard de Vinci"
    ],
    "reponse": 0
  },
  {
    "id": "q1569",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel mammifère aquatique d'Amérique du Sud est proche du dauphin et vit dans les fleuves ?",
    "options": [
      "Le capybara",
      "Le dauphin rose de l'Amazone",
      "Le lamantin",
      "La loutre géante"
    ],
    "reponse": 1
  },
  {
    "id": "q1570",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bucarest est la capitale de quel pays ?",
    "options": [
      "Roumanie",
      "Lituanie",
      "République tchèque",
      "Suriname"
    ],
    "reponse": 0
  },
  {
    "id": "q1571",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Combien de bits composent un octet ?",
    "options": [
      "8",
      "16",
      "4",
      "10"
    ],
    "reponse": 0
  },
  {
    "id": "q1572",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Argentine ?",
    "options": [
      "Océanie",
      "Afrique",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q1573",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1008 en chiffres romains ?",
    "options": [
      "MIX",
      "CMXCVIII",
      "MVIII",
      "MX"
    ],
    "reponse": 2
  },
  {
    "id": "q1574",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat italien est une fine pâte garnie de tomate, mozzarella et basilic ?",
    "options": [
      "La bruschetta",
      "La calzone",
      "La pizza margherita",
      "La focaccia"
    ],
    "reponse": 2
  },
  {
    "id": "q1575",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 4 ?",
    "options": [
      "3",
      "5",
      "2",
      "0"
    ],
    "reponse": 2
  },
  {
    "id": "q1576",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle ville allemande a été le théâtre du procès des criminels nazis après la guerre ?",
    "options": [
      "Munich",
      "Nuremberg",
      "Hambourg",
      "Berlin"
    ],
    "reponse": 1
  },
  {
    "id": "q1577",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCXXXI en chiffres romains ?",
    "options": [
      "1231",
      "1226",
      "1241",
      "1221"
    ],
    "reponse": 0
  },
  {
    "id": "q1578",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « He » ?",
    "options": [
      "Ruthénium",
      "Hélium",
      "Césium",
      "Titane"
    ],
    "reponse": 1
  },
  {
    "id": "q1579",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Argentine ?",
    "options": [
      "🇲🇳",
      "🇵🇾",
      "🇬🇾",
      "🇦🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q1580",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Estonie",
      "Islande",
      "France",
      "Myanmar"
    ],
    "reponse": 2
  },
  {
    "id": "q1581",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 200 ?",
    "options": [
      "41",
      "38",
      "34",
      "40"
    ],
    "reponse": 3
  },
  {
    "id": "q1582",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1047 en chiffres romains ?",
    "options": [
      "MXXXVII",
      "MXLVII",
      "MXLIX",
      "MXLVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1583",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Luxembourg ?",
    "options": [
      "Euro",
      "Dong",
      "Ringgit",
      "Rial iranien"
    ],
    "reponse": 0
  },
  {
    "id": "q1584",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 85 ÷ 5 ?",
    "options": [
      "19",
      "20",
      "16",
      "17"
    ],
    "reponse": 3
  },
  {
    "id": "q1585",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Brésil ?",
    "options": [
      "Montevideo",
      "Abuja",
      "Koweït City",
      "Brasilia"
    ],
    "reponse": 3
  },
  {
    "id": "q1586",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 168 ÷ 14 ?",
    "options": [
      "10",
      "15",
      "12",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q1587",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1660 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "15e siècle",
      "17e siècle",
      "18e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1588",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel arbre produit les glands ?",
    "options": [
      "Le hêtre",
      "Le chêne",
      "Le châtaignier",
      "Le noisetier"
    ],
    "reponse": 1
  },
  {
    "id": "q1589",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre a réalisé « La Joconde » ?",
    "options": [
      "Raphaël",
      "Léonard de Vinci",
      "Botticelli",
      "Michel-Ange"
    ],
    "reponse": 1
  },
  {
    "id": "q1590",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec du feu et de la forge est boiteux et forgeron des autres dieux ?",
    "options": [
      "Arès",
      "Héphaïstos",
      "Hermès",
      "Dionysos"
    ],
    "reponse": 1
  },
  {
    "id": "q1591",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Royaume-Uni",
      "Vanuatu",
      "Jordanie",
      "Bosnie-Herzégovine"
    ],
    "reponse": 1
  },
  {
    "id": "q1592",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Égypte ?",
    "options": [
      "Mark convertible",
      "Livre égyptienne",
      "Peso cubain",
      "Peso philippin"
    ],
    "reponse": 1
  },
  {
    "id": "q1593",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 14 cl ?",
    "options": [
      "140",
      "130",
      "165",
      "147"
    ],
    "reponse": 0
  },
  {
    "id": "q1594",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Germanium ?",
    "options": [
      "Xe",
      "Ru",
      "Kr",
      "Ge"
    ],
    "reponse": 3
  },
  {
    "id": "q1595",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Harare est la capitale de quel pays ?",
    "options": [
      "Nigeria",
      "Zimbabwe",
      "Malte",
      "Venezuela"
    ],
    "reponse": 1
  },
  {
    "id": "q1596",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Li » ?",
    "options": [
      "Uranium",
      "Calcium",
      "Lithium",
      "Nickel"
    ],
    "reponse": 2
  },
  {
    "id": "q1597",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3842 en chiffres romains ?",
    "options": [
      "MMMDCCCLII",
      "MMMDCCCXXXII",
      "MMMDCCCXLIV",
      "MMMDCCCXLII"
    ],
    "reponse": 3
  },
  {
    "id": "q1598",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Laos ?",
    "options": [
      "🇱🇦",
      "🇸🇮",
      "🇵🇭",
      "🇮🇳"
    ],
    "reponse": 0
  },
  {
    "id": "q1599",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu grec des enfers règne sur le royaume des morts ?",
    "options": [
      "Poséidon",
      "Zeus",
      "Hadès",
      "Arès"
    ],
    "reponse": 2
  },
  {
    "id": "q1600",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Inde",
      "Norvège",
      "Brésil",
      "Égypte"
    ],
    "reponse": 2
  },
  {
    "id": "q1601",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 390 + 307 ?",
    "options": [
      "698",
      "695",
      "699",
      "697"
    ],
    "reponse": 3
  },
  {
    "id": "q1602",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Irak ?",
    "options": [
      "Dinar koweïtien",
      "Forint",
      "Dinar irakien",
      "Ringgit"
    ],
    "reponse": 2
  },
  {
    "id": "q1603",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2831 en chiffres romains ?",
    "options": [
      "MMDCCCXXXI",
      "MMDCCCXXVI",
      "MMDCCCXXXII",
      "MMDCCCXXIX"
    ],
    "reponse": 0
  },
  {
    "id": "q1604",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 731 - 313 ?",
    "options": [
      "419",
      "418",
      "415",
      "416"
    ],
    "reponse": 1
  },
  {
    "id": "q1605",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Fables », dont « Le Corbeau et le Renard » ?",
    "options": [
      "Jean de La Fontaine",
      "Molière",
      "Charles Perrault",
      "Voltaire"
    ],
    "reponse": 0
  },
  {
    "id": "q1606",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 63 jour(s) ?",
    "options": [
      "6",
      "8",
      "10",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q1607",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'El Salvador ?",
    "options": [
      "San Salvador",
      "Bogota",
      "Bakou",
      "Kaboul"
    ],
    "reponse": 0
  },
  {
    "id": "q1608",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Norvège ?",
    "options": [
      "🇦🇷",
      "🇰🇷",
      "🇸🇩",
      "🇳🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q1609",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Koweït City est la capitale de quel pays ?",
    "options": [
      "Kenya",
      "Koweït",
      "Australie",
      "Maroc"
    ],
    "reponse": 1
  },
  {
    "id": "q1610",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bénin ?",
    "options": [
      "Saint-Domingue",
      "Niamey",
      "Tallinn",
      "Porto-Novo"
    ],
    "reponse": 3
  },
  {
    "id": "q1611",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un extraterrestre resté sur Terre et aidé par des enfants ?",
    "options": [
      "E.T. l'extra-terrestre",
      "Rencontres du troisième type",
      "District 9",
      "Arrival"
    ],
    "reponse": 0
  },
  {
    "id": "q1612",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1681 et 1928 ?",
    "options": [
      "283",
      "216",
      "220",
      "247"
    ],
    "reponse": 3
  },
  {
    "id": "q1613",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCV en chiffres romains ?",
    "options": [
      "1606",
      "1610",
      "1605",
      "1600"
    ],
    "reponse": 2
  },
  {
    "id": "q1614",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quelle guerre a opposé le Nord et le Sud des États-Unis entre 1861 et 1865 ?",
    "options": [
      "La guerre hispano-américaine",
      "La guerre de 1812",
      "La guerre d'indépendance",
      "La guerre de Sécession"
    ],
    "reponse": 3
  },
  {
    "id": "q1615",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel dessert typiquement français est une crème caramel renversée ?",
    "options": [
      "La crème brûlée",
      "Les œufs au lait",
      "La crème caramel",
      "Le flan pâtissier"
    ],
    "reponse": 2
  },
  {
    "id": "q1616",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Uruguay",
      "El Salvador",
      "Ghana",
      "Venezuela"
    ],
    "reponse": 2
  },
  {
    "id": "q1617",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Canada ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q1618",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel métal liquide à température ambiante est utilisé dans les anciens thermomètres ?",
    "options": [
      "Le zinc",
      "L'étain",
      "Le mercure",
      "Le plomb"
    ],
    "reponse": 2
  },
  {
    "id": "q1619",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mali ?",
    "options": [
      "Erevan",
      "Bamako",
      "La Valette",
      "Beyrouth"
    ],
    "reponse": 1
  },
  {
    "id": "q1620",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Danemark",
      "Slovénie",
      "Niger",
      "Espagne"
    ],
    "reponse": 0
  },
  {
    "id": "q1621",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 434 en chiffres romains ?",
    "options": [
      "CDXXXIV",
      "CDXLIV",
      "CDXXXIII",
      "CDXXIX"
    ],
    "reponse": 0
  },
  {
    "id": "q1622",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve États-Unis ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q1623",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel peintre flamand du XVIIe siècle est célèbre pour ses scènes religieuses et portraits, comme « La Descente de croix » ?",
    "options": [
      "Pierre Paul Rubens",
      "Jacob Jordaens",
      "Antoine van Dyck",
      "Frans Hals"
    ],
    "reponse": 0
  },
  {
    "id": "q1624",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays possède le plus de fjords célèbres ?",
    "options": [
      "L'Islande",
      "Le Danemark",
      "La Suède",
      "La Norvège"
    ],
    "reponse": 3
  },
  {
    "id": "q1625",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 948 - 229 ?",
    "options": [
      "717",
      "720",
      "719",
      "718"
    ],
    "reponse": 2
  },
  {
    "id": "q1626",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Haïti",
      "Cuba",
      "Moldavie",
      "Algérie"
    ],
    "reponse": 0
  },
  {
    "id": "q1627",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe suédois a sorti le tube « Dancing Queen » ?",
    "options": [
      "Ace of Base",
      "Roxette",
      "ABBA",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q1628",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mexique ?",
    "options": [
      "🇨🇩",
      "🇦🇿",
      "🇲🇽",
      "🇦🇲"
    ],
    "reponse": 2
  },
  {
    "id": "q1629",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Lettonie",
      "Guinée",
      "Danemark",
      "États-Unis"
    ],
    "reponse": 3
  },
  {
    "id": "q1630",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène des super-héros regroupés dans un multivers de bandes dessinées, adaptée par Marvel Studios sous forme de films liés entre eux ?",
    "options": [
      "Le DC Extended Universe",
      "L'Univers cinématographique Marvel (MCU)",
      "L'univers Star Wars",
      "L'univers X-Men classique"
    ],
    "reponse": 1
  },
  {
    "id": "q1631",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « H » ?",
    "options": [
      "Hydrogène",
      "Sélénium",
      "Or",
      "Lithium"
    ],
    "reponse": 0
  },
  {
    "id": "q1632",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 11 ?",
    "options": [
      "222",
      "175",
      "198",
      "211"
    ],
    "reponse": 2
  },
  {
    "id": "q1633",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 7000 mg ?",
    "options": [
      "4",
      "6",
      "7",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q1634",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel mammifère marin est le plus intelligent après l'humain selon de nombreuses études ?",
    "options": [
      "Le phoque",
      "Le dauphin",
      "La baleine",
      "L'otarie"
    ],
    "reponse": 1
  },
  {
    "id": "q1635",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 335 - 47 ?",
    "options": [
      "288",
      "289",
      "291",
      "290"
    ],
    "reponse": 0
  },
  {
    "id": "q1636",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Haïti",
      "Estonie",
      "Botswana",
      "Moldavie"
    ],
    "reponse": 2
  },
  {
    "id": "q1637",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCXXI en chiffres romains ?",
    "options": [
      "3319",
      "3311",
      "3321",
      "3323"
    ],
    "reponse": 2
  },
  {
    "id": "q1638",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète est la plus proche du Soleil ?",
    "options": [
      "Mars",
      "la Terre",
      "Mercure",
      "Vénus"
    ],
    "reponse": 2
  },
  {
    "id": "q1639",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien d'anneaux compte le symbole olympique ?",
    "options": [
      "4",
      "5",
      "7",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q1640",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kazakhstan ?",
    "options": [
      "Dollar fidjien",
      "Dollar néo-zélandais",
      "Tenge",
      "Denar macédonien"
    ],
    "reponse": 2
  },
  {
    "id": "q1641",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Lettonie ?",
    "options": [
      "Bratislava",
      "Séoul",
      "Belgrade",
      "Riga"
    ],
    "reponse": 3
  },
  {
    "id": "q1642",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Doha est la capitale de quel pays ?",
    "options": [
      "Estonie",
      "Qatar",
      "Nicaragua",
      "Myanmar"
    ],
    "reponse": 1
  },
  {
    "id": "q1643",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 215 - 204 ?",
    "options": [
      "12",
      "14",
      "11",
      "9"
    ],
    "reponse": 2
  },
  {
    "id": "q1644",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDVI en chiffres romains ?",
    "options": [
      "2404",
      "2411",
      "2406",
      "2408"
    ],
    "reponse": 2
  },
  {
    "id": "q1645",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo met en scène un plombier qui doit sauver la princesse Peach du royaume Champignon ?",
    "options": [
      "Luigi's Mansion",
      "Super Mario Bros.",
      "Donkey Kong",
      "Yoshi's Island"
    ],
    "reponse": 1
  },
  {
    "id": "q1646",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel physicien italien a été jugé par l'Inquisition pour avoir défendu l'héliocentrisme ?",
    "options": [
      "Copernic",
      "Newton",
      "Galilée",
      "Kepler"
    ],
    "reponse": 2
  },
  {
    "id": "q1647",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1276 et 1456 ?",
    "options": [
      "180",
      "151",
      "187",
      "172"
    ],
    "reponse": 0
  },
  {
    "id": "q1648",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 613 + 805 ?",
    "options": [
      "1415",
      "1418",
      "1416",
      "1419"
    ],
    "reponse": 1
  },
  {
    "id": "q1649",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène un agent du MI6 nommé James Bond, adaptée en films depuis les années 1960 ?",
    "options": [
      "James Bond (007)",
      "Kingsman",
      "Mission Impossible",
      "Jason Bourne"
    ],
    "reponse": 0
  },
  {
    "id": "q1650",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 989 + 929 ?",
    "options": [
      "1919",
      "1917",
      "1918",
      "1916"
    ],
    "reponse": 2
  },
  {
    "id": "q1651",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCLXIV en chiffres romains ?",
    "options": [
      "2163",
      "2169",
      "2164",
      "2166"
    ],
    "reponse": 2
  },
  {
    "id": "q1652",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 11 au carré ?",
    "options": [
      "121",
      "104",
      "110",
      "116"
    ],
    "reponse": 0
  },
  {
    "id": "q1653",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 308 - 16 ?",
    "options": [
      "292",
      "293",
      "294",
      "289"
    ],
    "reponse": 0
  },
  {
    "id": "q1654",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 9 décennie(s) ?",
    "options": [
      "88",
      "90",
      "82",
      "97"
    ],
    "reponse": 1
  },
  {
    "id": "q1655",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Royaume-Uni",
      "Cuba",
      "République tchèque",
      "Grèce"
    ],
    "reponse": 3
  },
  {
    "id": "q1656",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Japon",
      "Kazakhstan",
      "Soudan",
      "Slovaquie"
    ],
    "reponse": 1
  },
  {
    "id": "q1657",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit la trilogie « Millénium » avec Lisbeth Salander ?",
    "options": [
      "Jo Nesbø",
      "Camilla Läckberg",
      "Stieg Larsson",
      "Henning Mankell"
    ],
    "reponse": 2
  },
  {
    "id": "q1658",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kaboul est la capitale de quel pays ?",
    "options": [
      "Brésil",
      "Mozambique",
      "Afghanistan",
      "Belgique"
    ],
    "reponse": 2
  },
  {
    "id": "q1659",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Manganèse ?",
    "options": [
      "N",
      "Mn",
      "Mo",
      "Li"
    ],
    "reponse": 1
  },
  {
    "id": "q1660",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel est le nom du bébé du kangourou ?",
    "options": [
      "Le joey",
      "Le petit",
      "Le kangourou nain",
      "Le kanga"
    ],
    "reponse": 0
  },
  {
    "id": "q1661",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Gabon ?",
    "options": [
      "Guarani",
      "Franc CFA",
      "Couronne suédoise",
      "Peso chilien"
    ],
    "reponse": 1
  },
  {
    "id": "q1662",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 23 + 275 ?",
    "options": [
      "296",
      "301",
      "299",
      "298"
    ],
    "reponse": 3
  },
  {
    "id": "q1663",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom du langage de requête utilisé pour interroger les bases de données ?",
    "options": [
      "JSON",
      "HTML",
      "SQL",
      "XML"
    ],
    "reponse": 2
  },
  {
    "id": "q1664",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3077 en chiffres romains ?",
    "options": [
      "MMMLXXXVII",
      "MMMLXXVII",
      "MMMLXXIX",
      "MMMLXVII"
    ],
    "reponse": 1
  },
  {
    "id": "q1665",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 64 ?",
    "options": [
      "9",
      "8",
      "7",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q1666",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 18 ÷ 9 ?",
    "options": [
      "-1",
      "2",
      "0",
      "3"
    ],
    "reponse": 1
  },
  {
    "id": "q1667",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 900 - 709 ?",
    "options": [
      "194",
      "191",
      "189",
      "190"
    ],
    "reponse": 1
  },
  {
    "id": "q1668",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel musicien est considéré comme le père du jazz moderne avec sa trompette, surnommé « Satchmo » ?",
    "options": [
      "Dizzy Gillespie",
      "Louis Armstrong",
      "Duke Ellington",
      "Miles Davis"
    ],
    "reponse": 1
  },
  {
    "id": "q1669",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est l'animal symbole de l'Australie, marsupial sauteur ?",
    "options": [
      "Le wombat",
      "Le koala",
      "Le wallaby",
      "Le kangourou"
    ],
    "reponse": 3
  },
  {
    "id": "q1670",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 9 ?",
    "options": [
      "126",
      "125",
      "142",
      "111"
    ],
    "reponse": 0
  },
  {
    "id": "q1671",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Slovénie ?",
    "options": [
      "🇧🇦",
      "🇲🇷",
      "🇸🇪",
      "🇸🇮"
    ],
    "reponse": 3
  },
  {
    "id": "q1672",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel événement du 11 novembre 1918 a mis fin aux combats de la Première Guerre mondiale ?",
    "options": [
      "La capitulation",
      "Le traité de paix",
      "L'armistice",
      "La révolution"
    ],
    "reponse": 2
  },
  {
    "id": "q1673",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 400 ?",
    "options": [
      "159",
      "176",
      "169",
      "160"
    ],
    "reponse": 3
  },
  {
    "id": "q1674",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCLXXXVII en chiffres romains ?",
    "options": [
      "1386",
      "1397",
      "1387",
      "1377"
    ],
    "reponse": 2
  },
  {
    "id": "q1675",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel océan est le plus vaste ?",
    "options": [
      "L'océan Pacifique",
      "L'océan Indien",
      "L'océan Atlantique",
      "L'océan Arctique"
    ],
    "reponse": 0
  },
  {
    "id": "q1676",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Cameroun ?",
    "options": [
      "Franc CFA",
      "Couronne norvégienne",
      "Real brésilien",
      "Dollar australien"
    ],
    "reponse": 0
  },
  {
    "id": "q1677",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale européenne est construite sur plusieurs îles reliées par des ponts ?",
    "options": [
      "Amsterdam",
      "Stockholm",
      "Venise",
      "Copenhague"
    ],
    "reponse": 1
  },
  {
    "id": "q1678",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Éthiopie ?",
    "options": [
      "🇳🇪",
      "🇺🇸",
      "🇫🇯",
      "🇪🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q1679",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 240 ÷ 15 ?",
    "options": [
      "13",
      "19",
      "16",
      "15"
    ],
    "reponse": 2
  },
  {
    "id": "q1680",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel physicien a découvert la loi de la gravitation universelle ?",
    "options": [
      "Albert Einstein",
      "Johannes Kepler",
      "Galilée",
      "Isaac Newton"
    ],
    "reponse": 3
  },
  {
    "id": "q1681",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Suisse",
      "Guinée",
      "Afghanistan",
      "Cambodge"
    ],
    "reponse": 3
  },
  {
    "id": "q1682",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du réseau social basé sur des messages courts, longtemps limités à 140 puis 280 caractères ?",
    "options": [
      "Twitter",
      "Tumblr",
      "Facebook",
      "Reddit"
    ],
    "reponse": 0
  },
  {
    "id": "q1683",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 10 ?",
    "options": [
      "6",
      "5",
      "7",
      "2"
    ],
    "reponse": 1
  },
  {
    "id": "q1684",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel océan borde à la fois l'Afrique, l'Asie et l'Australie ?",
    "options": [
      "L'océan Atlantique",
      "L'océan Pacifique",
      "L'océan Austral",
      "L'océan Indien"
    ],
    "reponse": 3
  },
  {
    "id": "q1685",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Belgique ?",
    "options": [
      "Océanie",
      "Europe",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q1686",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Botswana ?",
    "options": [
      "Pula",
      "Dollar namibien",
      "Ariary",
      "Yuan"
    ],
    "reponse": 0
  },
  {
    "id": "q1687",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 121 ?",
    "options": [
      "8",
      "12",
      "13",
      "11"
    ],
    "reponse": 3
  },
  {
    "id": "q1688",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 831 - 681 ?",
    "options": [
      "152",
      "153",
      "150",
      "147"
    ],
    "reponse": 2
  },
  {
    "id": "q1689",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel élément est essentiel à la respiration humaine, absorbé par les poumons ?",
    "options": [
      "L'oxygène",
      "L'hydrogène",
      "L'azote",
      "Le dioxyde de carbone"
    ],
    "reponse": 0
  },
  {
    "id": "q1690",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du phénomène par lequel un serpent change de peau ?",
    "options": [
      "L'hibernation",
      "La métamorphose",
      "La mue",
      "La régénération"
    ],
    "reponse": 2
  },
  {
    "id": "q1691",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Belmopan est la capitale de quel pays ?",
    "options": [
      "Belize",
      "Nigeria",
      "Éthiopie",
      "France"
    ],
    "reponse": 0
  },
  {
    "id": "q1692",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Burkina Faso ?",
    "options": [
      "Yen",
      "Pula",
      "Bolivar",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q1693",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel roi des dieux nordiques a sacrifié un œil pour obtenir la sagesse ?",
    "options": [
      "Odin",
      "Freyr",
      "Thor",
      "Tyr"
    ],
    "reponse": 0
  },
  {
    "id": "q1694",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1359 en chiffres romains ?",
    "options": [
      "MCCCLVII",
      "MCCCLXIX",
      "MCCCLX",
      "MCCCLIX"
    ],
    "reponse": 3
  },
  {
    "id": "q1695",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mn » ?",
    "options": [
      "Manganèse",
      "Lanthane",
      "Silicium",
      "Gallium"
    ],
    "reponse": 0
  },
  {
    "id": "q1696",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat libanais est une salade à base de persil, boulgour, tomate et menthe ?",
    "options": [
      "Le fattouche",
      "Le taboulé",
      "Le falafel",
      "Le houmous"
    ],
    "reponse": 1
  },
  {
    "id": "q1697",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1012 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "12e siècle",
      "10e siècle",
      "9e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1698",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Liban ?",
    "options": [
      "San José",
      "Beyrouth",
      "Lisbonne",
      "Le Caire"
    ],
    "reponse": 1
  },
  {
    "id": "q1699",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel langage de programmation a été créé pour rendre les pages web interactives, malgré son nom proche de Java ?",
    "options": [
      "Java",
      "PHP",
      "JavaScript",
      "TypeScript"
    ],
    "reponse": 2
  },
  {
    "id": "q1700",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français est composé de pâte à choux garnie de crème et glacée au chocolat, en forme allongée ?",
    "options": [
      "Le paris-brest",
      "L'éclair",
      "Le religieuse",
      "Le mille-feuille"
    ],
    "reponse": 1
  },
  {
    "id": "q1701",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 500 ?",
    "options": [
      "70",
      "64",
      "83",
      "75"
    ],
    "reponse": 3
  },
  {
    "id": "q1702",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel animal possède la morsure la plus puissante jamais mesurée chez un animal vivant ?",
    "options": [
      "Le grand requin blanc",
      "L'hippopotame",
      "Le crocodile marin",
      "L'ours polaire"
    ],
    "reponse": 2
  },
  {
    "id": "q1703",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2175 en chiffres romains ?",
    "options": [
      "MMCLXXV",
      "MMCLXX",
      "MMCLXXX",
      "MMCLXXIV"
    ],
    "reponse": 0
  },
  {
    "id": "q1704",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 8 jour(s) ?",
    "options": [
      "163",
      "192",
      "221",
      "168"
    ],
    "reponse": 1
  },
  {
    "id": "q1705",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kigali est la capitale de quel pays ?",
    "options": [
      "Rwanda",
      "Serbie",
      "Émirats arabes unis",
      "Algérie"
    ],
    "reponse": 0
  },
  {
    "id": "q1706",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe américain a interprété « Smells Like Teen Spirit » ?",
    "options": [
      "Soundgarden",
      "Nirvana",
      "Alice in Chains",
      "Pearl Jam"
    ],
    "reponse": 1
  },
  {
    "id": "q1707",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 408 heure(s) ?",
    "options": [
      "13",
      "17",
      "15",
      "16"
    ],
    "reponse": 1
  },
  {
    "id": "q1708",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Bosnie-Herzégovine ?",
    "options": [
      "🇺🇦",
      "🇮🇷",
      "🇱🇻",
      "🇧🇦"
    ],
    "reponse": 3
  },
  {
    "id": "q1709",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 400 - 372 ?",
    "options": [
      "26",
      "28",
      "27",
      "30"
    ],
    "reponse": 1
  },
  {
    "id": "q1710",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3231 en chiffres romains ?",
    "options": [
      "MMMCCXXXI",
      "MMMCCXXIX",
      "MMMCCXXXIII",
      "MMMCCXXX"
    ],
    "reponse": 0
  },
  {
    "id": "q1711",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouzbékistan",
      "Nouvelle-Zélande",
      "Malte",
      "Nigeria"
    ],
    "reponse": 2
  },
  {
    "id": "q1712",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Chili",
      "Zambie",
      "Estonie",
      "Népal"
    ],
    "reponse": 3
  },
  {
    "id": "q1713",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Russie",
      "Qatar",
      "Guyana",
      "Côte d'Ivoire"
    ],
    "reponse": 2
  },
  {
    "id": "q1714",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Téhéran est la capitale de quel pays ?",
    "options": [
      "Irlande",
      "Mozambique",
      "Monténégro",
      "Iran"
    ],
    "reponse": 3
  },
  {
    "id": "q1715",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quelle célèbre reine d'Angleterre a régné pendant plus de 60 ans au XIXe siècle ?",
    "options": [
      "Anne",
      "Mary Tudor",
      "Victoria",
      "Élisabeth Ire"
    ],
    "reponse": 2
  },
  {
    "id": "q1716",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1530 et 1778 ?",
    "options": [
      "249",
      "248",
      "229",
      "210"
    ],
    "reponse": 1
  },
  {
    "id": "q1717",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Papouasie-Nouvelle-Guinée",
      "Vanuatu",
      "Irlande",
      "Libye"
    ],
    "reponse": 3
  },
  {
    "id": "q1718",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock américain a pour chanteur Anthony Kiedis, connu pour « Californication » ?",
    "options": [
      "Red Hot Chili Peppers",
      "Foo Fighters",
      "Pearl Jam",
      "Nirvana"
    ],
    "reponse": 0
  },
  {
    "id": "q1719",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Grèce ?",
    "options": [
      "Luanda",
      "Athènes",
      "Belgrade",
      "Paramaribo"
    ],
    "reponse": 1
  },
  {
    "id": "q1720",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur français a écrit « Bel-Ami » et « Boule de suif » ?",
    "options": [
      "Alphonse Daudet",
      "Guy de Maupassant",
      "Gustave Flaubert",
      "Émile Zola"
    ],
    "reponse": 1
  },
  {
    "id": "q1721",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Pakistan ?",
    "options": [
      "Afghani",
      "Won nord-coréen",
      "Leu moldave",
      "Roupie pakistanaise"
    ],
    "reponse": 3
  },
  {
    "id": "q1722",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Copenhague est la capitale de quel pays ?",
    "options": [
      "Albanie",
      "Danemark",
      "Népal",
      "Croatie"
    ],
    "reponse": 1
  },
  {
    "id": "q1723",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 32 kg ?",
    "options": [
      "29746",
      "32126",
      "32000",
      "32143"
    ],
    "reponse": 2
  },
  {
    "id": "q1724",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Biélorussie ?",
    "options": [
      "🇸🇻",
      "🇬🇦",
      "🇧🇾",
      "🇸🇰"
    ],
    "reponse": 2
  },
  {
    "id": "q1725",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Chili ?",
    "options": [
      "🇸🇪",
      "🇨🇱",
      "🇨🇩",
      "🇭🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q1726",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel type de pâtisserie viennoise en forme de croissant est emblématique du petit-déjeuner français ?",
    "options": [
      "Le chausson aux pommes",
      "Le pain au chocolat",
      "Le croissant",
      "La brioche"
    ],
    "reponse": 2
  },
  {
    "id": "q1727",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Colombie ?",
    "options": [
      "Bogota",
      "Moscou",
      "Damas",
      "Luanda"
    ],
    "reponse": 0
  },
  {
    "id": "q1728",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel roi de France a promulgué l'édit de Nantes en 1598 pour mettre fin aux guerres de religion ?",
    "options": [
      "François Ier",
      "Henri IV",
      "Louis XIII",
      "Charles IX"
    ],
    "reponse": 1
  },
  {
    "id": "q1729",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Apia est la capitale de quel pays ?",
    "options": [
      "Équateur",
      "Vanuatu",
      "Samoa",
      "Bulgarie"
    ],
    "reponse": 2
  },
  {
    "id": "q1730",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Oulan-Bator est la capitale de quel pays ?",
    "options": [
      "Philippines",
      "Brésil",
      "Mongolie",
      "Zambie"
    ],
    "reponse": 2
  },
  {
    "id": "q1731",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec des voyageurs et des voleurs est aussi le messager des dieux ?",
    "options": [
      "Hermès",
      "Apollon",
      "Dionysos",
      "Arès"
    ],
    "reponse": 0
  },
  {
    "id": "q1732",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 100 mm ?",
    "options": [
      "13",
      "12",
      "9",
      "10"
    ],
    "reponse": 3
  },
  {
    "id": "q1733",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ghana ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1734",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a créé la console de jeux PlayStation ?",
    "options": [
      "Sega",
      "Microsoft",
      "Sony",
      "Nintendo"
    ],
    "reponse": 2
  },
  {
    "id": "q1735",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Afghanistan ?",
    "options": [
      "🇱🇺",
      "🇸🇻",
      "🇻🇳",
      "🇦🇫"
    ],
    "reponse": 3
  },
  {
    "id": "q1736",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 8 × 16 ?",
    "options": [
      "140",
      "128",
      "117",
      "129"
    ],
    "reponse": 1
  },
  {
    "id": "q1737",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Uruguay ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Océanie",
      "Afrique"
    ],
    "reponse": 0
  },
  {
    "id": "q1738",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Arabie saoudite ?",
    "options": [
      "Franc rwandais",
      "Riyal saoudien",
      "Rial iranien",
      "Metical"
    ],
    "reponse": 1
  },
  {
    "id": "q1739",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Turquie ?",
    "options": [
      "Leu moldave",
      "Peso cubain",
      "Livre turque",
      "Kwacha zambien"
    ],
    "reponse": 2
  },
  {
    "id": "q1740",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 484 ?",
    "options": [
      "22",
      "23",
      "18",
      "20"
    ],
    "reponse": 0
  },
  {
    "id": "q1741",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 351 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "5e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1742",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2533 en chiffres romains ?",
    "options": [
      "MMDXXVIII",
      "MMDXXXIII",
      "MMDXXXIV",
      "MMDXXXV"
    ],
    "reponse": 1
  },
  {
    "id": "q1743",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Venezuela ?",
    "options": [
      "Paramaribo",
      "Oslo",
      "Bucarest",
      "Caracas"
    ],
    "reponse": 3
  },
  {
    "id": "q1744",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Géorgie ?",
    "options": [
      "Lari",
      "Peso chilien",
      "Livre libanaise",
      "Dollar fidjien"
    ],
    "reponse": 0
  },
  {
    "id": "q1745",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel est le nom du héros habillé de vert dans la saga « The Legend of Zelda » ?",
    "options": [
      "Link",
      "Ganon",
      "Zelda",
      "Impa"
    ],
    "reponse": 0
  },
  {
    "id": "q1746",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Panama ?",
    "options": [
      "Suva",
      "Panama",
      "Beyrouth",
      "Doha"
    ],
    "reponse": 1
  },
  {
    "id": "q1747",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel traité a mis fin à la Première Guerre mondiale ?",
    "options": [
      "Le traité de Rome",
      "Le traité de Vienne",
      "Le traité de Paris",
      "Le traité de Versailles"
    ],
    "reponse": 3
  },
  {
    "id": "q1748",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Luanda est la capitale de quel pays ?",
    "options": [
      "Italie",
      "Équateur",
      "Angola",
      "Bangladesh"
    ],
    "reponse": 2
  },
  {
    "id": "q1749",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 103 + 758 ?",
    "options": [
      "858",
      "864",
      "861",
      "860"
    ],
    "reponse": 2
  },
  {
    "id": "q1750",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Canada ?",
    "options": [
      "🇳🇴",
      "🇲🇷",
      "🇨🇦",
      "🇾🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q1751",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Argon ?",
    "options": [
      "Ti",
      "As",
      "Mo",
      "Ar"
    ],
    "reponse": 3
  },
  {
    "id": "q1752",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle famille a régné sur la Russie jusqu'à la révolution de 1917 ?",
    "options": [
      "Les Bourbon",
      "Les Windsor",
      "Les Romanov",
      "Les Habsbourg"
    ],
    "reponse": 2
  },
  {
    "id": "q1753",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Rwanda ?",
    "options": [
      "Roupie indonésienne",
      "Franc rwandais",
      "Peso uruguayen",
      "Dollar canadien"
    ],
    "reponse": 1
  },
  {
    "id": "q1754",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Tanzanie ?",
    "options": [
      "🇧🇯",
      "🇦🇴",
      "🇹🇿",
      "🇪🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q1755",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 2100 cl ?",
    "options": [
      "24",
      "26",
      "21",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q1756",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Beyrouth est la capitale de quel pays ?",
    "options": [
      "Liban",
      "Honduras",
      "Paraguay",
      "Croatie"
    ],
    "reponse": 0
  },
  {
    "id": "q1757",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 974 - 125 ?",
    "options": [
      "852",
      "851",
      "848",
      "849"
    ],
    "reponse": 3
  },
  {
    "id": "q1758",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 521 en chiffres romains ?",
    "options": [
      "DXI",
      "DXX",
      "DXVI",
      "DXXI"
    ],
    "reponse": 3
  },
  {
    "id": "q1759",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « URL » ?",
    "options": [
      "Uniform Resource Locator",
      "Unique Record Locator",
      "Universal Reference Link",
      "United Resource Location"
    ],
    "reponse": 0
  },
  {
    "id": "q1760",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Combien de planètes compte le système solaire depuis 2006 ?",
    "options": [
      "8",
      "10",
      "9",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q1761",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Fidji ?",
    "options": [
      "Suva",
      "Manille",
      "Ouagadougou",
      "Reykjavik"
    ],
    "reponse": 0
  },
  {
    "id": "q1762",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ukraine ?",
    "options": [
      "Kiev",
      "Manille",
      "Porto-Novo",
      "Amman"
    ],
    "reponse": 0
  },
  {
    "id": "q1763",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Turquie ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1764",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat espagnol à base de riz safrané est souvent garni de fruits de mer ou de poulet ?",
    "options": [
      "La tortilla",
      "Le jambon serrano",
      "La paella",
      "Le gazpacho"
    ],
    "reponse": 2
  },
  {
    "id": "q1765",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "La Valette est la capitale de quel pays ?",
    "options": [
      "Équateur",
      "Malte",
      "Pakistan",
      "Guatemala"
    ],
    "reponse": 1
  },
  {
    "id": "q1766",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Suisse ?",
    "options": [
      "Berne",
      "Erevan",
      "Varsovie",
      "La Valette"
    ],
    "reponse": 0
  },
  {
    "id": "q1767",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1266 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "13e siècle",
      "11e siècle",
      "12e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1768",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 100 ?",
    "options": [
      "29",
      "23",
      "28",
      "25"
    ],
    "reponse": 3
  },
  {
    "id": "q1769",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Nigeria ?",
    "options": [
      "Dinar tunisien",
      "Peso argentin",
      "Naira",
      "Dollar américain"
    ],
    "reponse": 2
  },
  {
    "id": "q1770",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel auteur français du XVIIe siècle a écrit « Le Malade imaginaire » et « Le Bourgeois gentilhomme » ?",
    "options": [
      "Pierre Corneille",
      "Molière",
      "Jean de La Fontaine",
      "Jean Racine"
    ],
    "reponse": 1
  },
  {
    "id": "q1771",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Mauritanie ?",
    "options": [
      "Leu roumain",
      "Roupie indienne",
      "Ouguiya",
      "Dollar américain"
    ],
    "reponse": 2
  },
  {
    "id": "q1772",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 20000 mm ?",
    "options": [
      "22",
      "20",
      "15",
      "25"
    ],
    "reponse": 1
  },
  {
    "id": "q1773",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de mémoire conserve les données même lorsque l'ordinateur est éteint ?",
    "options": [
      "La mémoire de stockage (disque dur, SSD)",
      "Le cache processeur",
      "Les registres",
      "La mémoire vive (RAM)"
    ],
    "reponse": 0
  },
  {
    "id": "q1774",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 120 ?",
    "options": [
      "4",
      "3",
      "6",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q1775",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cl dans 31 l ?",
    "options": [
      "3302",
      "3542",
      "3088",
      "3100"
    ],
    "reponse": 3
  },
  {
    "id": "q1776",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel astronome a proposé le modèle héliocentrique du système solaire ?",
    "options": [
      "Galilée",
      "Ptolémée",
      "Tycho Brahe",
      "Nicolas Copernic"
    ],
    "reponse": 3
  },
  {
    "id": "q1777",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pakistan ?",
    "options": [
      "Asie",
      "Océanie",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 0
  },
  {
    "id": "q1778",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle licence de jeux vidéo de gestion de ville et de commerce porte un nom composé d'une année (1404, 1800...) ?",
    "options": [
      "Banished",
      "Anno",
      "Foundation",
      "Tropico"
    ],
    "reponse": 1
  },
  {
    "id": "q1779",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat français est une soupe à base d'oignons caramélisés, gratinée au fromage ?",
    "options": [
      "La bouillabaisse",
      "La soupe à l'oignon",
      "Le velouté de légumes",
      "Le pot-au-feu"
    ],
    "reponse": 1
  },
  {
    "id": "q1780",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel héros troyen fonde Rome selon la légende, dans l'Énéide de Virgile ?",
    "options": [
      "Hector",
      "Romulus",
      "Énée",
      "Ulysse"
    ],
    "reponse": 2
  },
  {
    "id": "q1781",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le seul mammifère capable de voler activement ?",
    "options": [
      "Le colibri",
      "L'écureuil volant",
      "La chauve-souris",
      "Le phalanger"
    ],
    "reponse": 2
  },
  {
    "id": "q1782",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1924 appartient à quel siècle ?",
    "options": [
      "21e siècle",
      "19e siècle",
      "20e siècle",
      "18e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1783",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Espagne ?",
    "options": [
      "Roupie pakistanaise",
      "Sol péruvien",
      "Euro",
      "Couronne islandaise"
    ],
    "reponse": 2
  },
  {
    "id": "q1784",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle est l'unité de mesure de la pression atmosphérique ?",
    "options": [
      "Le kelvin",
      "Le pascal",
      "Le joule",
      "Le newton"
    ],
    "reponse": 1
  },
  {
    "id": "q1785",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Afghanistan ?",
    "options": [
      "Kaboul",
      "Guatemala",
      "Hanoï",
      "Abuja"
    ],
    "reponse": 0
  },
  {
    "id": "q1786",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu nordique rusé est connu pour ses tours et sa capacité à changer de forme ?",
    "options": [
      "Loki",
      "Heimdall",
      "Odin",
      "Thor"
    ],
    "reponse": 0
  },
  {
    "id": "q1787",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin est capable de projeter de l'encre pour échapper à ses prédateurs ?",
    "options": [
      "La pieuvre",
      "La méduse",
      "Le dauphin",
      "L'anguille"
    ],
    "reponse": 0
  },
  {
    "id": "q1788",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Venezuela ?",
    "options": [
      "🇻🇪",
      "🇼🇸",
      "🇷🇺",
      "🇸🇷"
    ],
    "reponse": 0
  },
  {
    "id": "q1789",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Togo ?",
    "options": [
      "Séoul",
      "Tokyo",
      "Lomé",
      "Zagreb"
    ],
    "reponse": 2
  },
  {
    "id": "q1790",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Zambie ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1791",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Strontium ?",
    "options": [
      "Te",
      "F",
      "U",
      "Sr"
    ],
    "reponse": 3
  },
  {
    "id": "q1792",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « F » ?",
    "options": [
      "Fluor",
      "Nickel",
      "Radon",
      "Manganèse"
    ],
    "reponse": 0
  },
  {
    "id": "q1793",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle nymphe a retenu Ulysse prisonnier pendant sept ans sur son île ?",
    "options": [
      "Calypso",
      "Nausicaa",
      "Pénélope",
      "Circé"
    ],
    "reponse": 0
  },
  {
    "id": "q1794",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Macédoine du Nord ?",
    "options": [
      "🇲🇦",
      "🇷🇸",
      "🇲🇰",
      "🇪🇨"
    ],
    "reponse": 2
  },
  {
    "id": "q1795",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCXCIV en chiffres romains ?",
    "options": [
      "3394",
      "3384",
      "3392",
      "3404"
    ],
    "reponse": 0
  },
  {
    "id": "q1796",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin possède un exosquelette et marche de côté ?",
    "options": [
      "L'écrevisse",
      "Le crabe",
      "La crevette",
      "Le homard"
    ],
    "reponse": 1
  },
  {
    "id": "q1797",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'El Salvador ?",
    "options": [
      "Ringgit",
      "Real brésilien",
      "Dollar américain",
      "Yen"
    ],
    "reponse": 2
  },
  {
    "id": "q1798",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est réputé pour ne jamais oublier, selon une expression populaire ?",
    "options": [
      "Le chien",
      "Le dauphin",
      "L'éléphant",
      "Le corbeau"
    ],
    "reponse": 2
  },
  {
    "id": "q1799",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Yémen ?",
    "options": [
      "Sanaa",
      "Ouagadougou",
      "Port Moresby",
      "Athènes"
    ],
    "reponse": 0
  },
  {
    "id": "q1800",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Abuja est la capitale de quel pays ?",
    "options": [
      "Papouasie-Nouvelle-Guinée",
      "Moldavie",
      "Irlande",
      "Nigeria"
    ],
    "reponse": 3
  },
  {
    "id": "q1801",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3490 en chiffres romains ?",
    "options": [
      "MMMCDLXXXIX",
      "MMMCDXCI",
      "MMMCDXCV",
      "MMMCDXC"
    ],
    "reponse": 3
  },
  {
    "id": "q1802",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Suriname ?",
    "options": [
      "Afghani",
      "Peso mexicain",
      "Dollar surinamais",
      "Franc rwandais"
    ],
    "reponse": 2
  },
  {
    "id": "q1803",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Crime et Châtiment » ?",
    "options": [
      "Nicolas Gogol",
      "Fiodor Dostoïevski",
      "Léon Tolstoï",
      "Ivan Tourgueniev"
    ],
    "reponse": 1
  },
  {
    "id": "q1804",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Suva est la capitale de quel pays ?",
    "options": [
      "Syrie",
      "Fidji",
      "Espagne",
      "Azerbaïdjan"
    ],
    "reponse": 1
  },
  {
    "id": "q1805",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 324 ?",
    "options": [
      "16",
      "20",
      "18",
      "19"
    ],
    "reponse": 2
  },
  {
    "id": "q1806",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1071 en chiffres romains ?",
    "options": [
      "MLXVI",
      "MLXX",
      "MLXXI",
      "MLXIX"
    ],
    "reponse": 2
  },
  {
    "id": "q1807",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 3 ?",
    "options": [
      "17",
      "14",
      "18",
      "19"
    ],
    "reponse": 2
  },
  {
    "id": "q1808",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Samoa ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q1809",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 14 ?",
    "options": [
      "184",
      "188",
      "177",
      "196"
    ],
    "reponse": 3
  },
  {
    "id": "q1810",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Niobium ?",
    "options": [
      "Cd",
      "U",
      "Ti",
      "Nb"
    ],
    "reponse": 3
  },
  {
    "id": "q1811",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Haïti ?",
    "options": [
      "🇧🇦",
      "🇦🇪",
      "🇭🇹",
      "🇿🇲"
    ],
    "reponse": 2
  },
  {
    "id": "q1812",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Ghana ?",
    "options": [
      "Managua",
      "Accra",
      "Libreville",
      "Ouagadougou"
    ],
    "reponse": 1
  },
  {
    "id": "q1813",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Canada ?",
    "options": [
      "Denar macédonien",
      "Dollar canadien",
      "Livre turque",
      "Couronne danoise"
    ],
    "reponse": 1
  },
  {
    "id": "q1814",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène un parrain de la mafia du New Jersey qui consulte une psychiatre ?",
    "options": [
      "Better Call Saul",
      "The Good Wife",
      "Les Soprano",
      "Suits"
    ],
    "reponse": 2
  },
  {
    "id": "q1815",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'El Salvador ?",
    "options": [
      "🇵🇬",
      "🇰🇵",
      "🇦🇱",
      "🇸🇻"
    ],
    "reponse": 3
  },
  {
    "id": "q1816",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Angola ?",
    "options": [
      "🇱🇺",
      "🇸🇾",
      "🇲🇪",
      "🇦🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q1817",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 1800 cl ?",
    "options": [
      "20",
      "21",
      "18",
      "22"
    ],
    "reponse": 2
  },
  {
    "id": "q1818",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Chine",
      "Brésil",
      "Slovénie",
      "Niger"
    ],
    "reponse": 2
  },
  {
    "id": "q1819",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2654 en chiffres romains ?",
    "options": [
      "MMDCXLIV",
      "MMDCLIV",
      "MMDCLIII",
      "MMDCLV"
    ],
    "reponse": 1
  },
  {
    "id": "q1820",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « N » ?",
    "options": [
      "Mercure",
      "Silicium",
      "Azote",
      "Hélium"
    ],
    "reponse": 2
  },
  {
    "id": "q1821",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse américaine est surnommée « Queen of Pop » ?",
    "options": [
      "Madonna",
      "Lady Gaga",
      "Cher",
      "Britney Spears"
    ],
    "reponse": 0
  },
  {
    "id": "q1822",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tripoli est la capitale de quel pays ?",
    "options": [
      "Guyana",
      "Lituanie",
      "Angola",
      "Libye"
    ],
    "reponse": 3
  },
  {
    "id": "q1823",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 6 × 18 ?",
    "options": [
      "98",
      "106",
      "97",
      "108"
    ],
    "reponse": 3
  },
  {
    "id": "q1824",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCIV en chiffres romains ?",
    "options": [
      "3804",
      "3809",
      "3799",
      "3806"
    ],
    "reponse": 0
  },
  {
    "id": "q1825",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est le symbole du panda, menacé et vivant en Chine ?",
    "options": [
      "Le koala",
      "L'ours noir",
      "Le panda roux",
      "Le panda géant"
    ],
    "reponse": 3
  },
  {
    "id": "q1826",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des États-Unis ?",
    "options": [
      "🇺🇸",
      "🇬🇳",
      "🇮🇸",
      "🇩🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q1827",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1255 et 1517 ?",
    "options": [
      "246",
      "293",
      "262",
      "232"
    ],
    "reponse": 2
  },
  {
    "id": "q1828",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Pékin est la capitale de quel pays ?",
    "options": [
      "Pérou",
      "Monténégro",
      "Chine",
      "Cambodge"
    ],
    "reponse": 2
  },
  {
    "id": "q1829",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Jordanie ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1830",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Italie ?",
    "options": [
      "Sum ouzbek",
      "Euro",
      "Livre soudanaise",
      "Livre turque"
    ],
    "reponse": 1
  },
  {
    "id": "q1831",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Br » ?",
    "options": [
      "Brome",
      "Étain",
      "Gallium",
      "Arsenic"
    ],
    "reponse": 0
  },
  {
    "id": "q1832",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de basket-ball sur le terrain ?",
    "options": [
      "6",
      "7",
      "4",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q1833",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du service de stockage en ligne développé par Google ?",
    "options": [
      "iCloud",
      "OneDrive",
      "Google Drive",
      "Dropbox"
    ],
    "reponse": 2
  },
  {
    "id": "q1834",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 810 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "7e siècle",
      "8e siècle",
      "9e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1835",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Antimoine ?",
    "options": [
      "U",
      "Po",
      "Sb",
      "Mg"
    ],
    "reponse": 2
  },
  {
    "id": "q1836",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a signé « Parasite », Palme d'or à Cannes en 2019 ?",
    "options": [
      "Bong Joon-ho",
      "Lee Chang-dong",
      "Kim Ki-duk",
      "Park Chan-wook"
    ],
    "reponse": 0
  },
  {
    "id": "q1837",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLXXXIV en chiffres romains ?",
    "options": [
      "2484",
      "2479",
      "2474",
      "2483"
    ],
    "reponse": 0
  },
  {
    "id": "q1838",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Thorium ?",
    "options": [
      "N",
      "Fe",
      "Cl",
      "Th"
    ],
    "reponse": 3
  },
  {
    "id": "q1839",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2918 en chiffres romains ?",
    "options": [
      "MMCMXVI",
      "MMCMXIX",
      "MMCMXVIII",
      "MMCMXXIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1840",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Tanzanie ?",
    "options": [
      "Cedi",
      "Shilling tanzanien",
      "Dollar guyanien",
      "Kwanza"
    ],
    "reponse": 1
  },
  {
    "id": "q1841",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCMXXVI en chiffres romains ?",
    "options": [
      "2921",
      "2924",
      "2931",
      "2926"
    ],
    "reponse": 3
  },
  {
    "id": "q1842",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle reine d'Égypte est célèbre pour sa liaison avec Jules César et Marc Antoine ?",
    "options": [
      "Isis",
      "Hatchepsout",
      "Cléopâtre",
      "Néfertiti"
    ],
    "reponse": 2
  },
  {
    "id": "q1843",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1179 et 1258 ?",
    "options": [
      "81",
      "79",
      "89",
      "76"
    ],
    "reponse": 1
  },
  {
    "id": "q1844",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "France",
      "Azerbaïdjan",
      "Fidji",
      "Myanmar"
    ],
    "reponse": 3
  },
  {
    "id": "q1845",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel auteur français a écrit « Le Petit Prince » ?",
    "options": [
      "Marcel Pagnol",
      "Antoine de Saint-Exupéry",
      "Jules Verne",
      "Albert Camus"
    ],
    "reponse": 1
  },
  {
    "id": "q1846",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal possède la peau la plus épaisse parmi les mammifères terrestres ?",
    "options": [
      "L'hippopotame",
      "Le rhinocéros",
      "Le buffle",
      "L'éléphant"
    ],
    "reponse": 3
  },
  {
    "id": "q1847",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 120 mm ?",
    "options": [
      "13",
      "11",
      "12",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q1848",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Liban ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Afrique",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1849",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Addis-Abeba est la capitale de quel pays ?",
    "options": [
      "Portugal",
      "Guyana",
      "Fidji",
      "Éthiopie"
    ],
    "reponse": 3
  },
  {
    "id": "q1850",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Lituanie ?",
    "options": [
      "Kyat",
      "Euro",
      "Couronne norvégienne",
      "Riel"
    ],
    "reponse": 1
  },
  {
    "id": "q1851",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ukraine ?",
    "options": [
      "Leu roumain",
      "Bolivar",
      "Hryvnia",
      "Livre syrienne"
    ],
    "reponse": 2
  },
  {
    "id": "q1852",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport un joueur peut-il marquer un « home run » ?",
    "options": [
      "Le cricket",
      "Le hockey",
      "Le softball uniquement",
      "Le baseball"
    ],
    "reponse": 3
  },
  {
    "id": "q1853",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "République tchèque",
      "Jamaïque",
      "Autriche",
      "Nouvelle-Zélande"
    ],
    "reponse": 3
  },
  {
    "id": "q1854",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bangladesh ?",
    "options": [
      "🇧🇩",
      "🇨🇿",
      "🇳🇱",
      "🇿🇼"
    ],
    "reponse": 0
  },
  {
    "id": "q1855",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 308 en chiffres romains ?",
    "options": [
      "CCCVIII",
      "CCCVII",
      "CCCXIII",
      "CCCIII"
    ],
    "reponse": 0
  },
  {
    "id": "q1856",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Washington est la capitale de quel pays ?",
    "options": [
      "Syrie",
      "Malte",
      "États-Unis",
      "Ouganda"
    ],
    "reponse": 2
  },
  {
    "id": "q1857",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Gaborone est la capitale de quel pays ?",
    "options": [
      "Belgique",
      "Mexique",
      "Bénin",
      "Botswana"
    ],
    "reponse": 3
  },
  {
    "id": "q1858",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est l'unité de mesure de l'intensité du courant électrique ?",
    "options": [
      "L'ohm",
      "Le volt",
      "L'ampère",
      "Le watt"
    ],
    "reponse": 2
  },
  {
    "id": "q1859",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Sélénium ?",
    "options": [
      "Se",
      "Ga",
      "H",
      "Rn"
    ],
    "reponse": 0
  },
  {
    "id": "q1860",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 234 en chiffres romains ?",
    "options": [
      "CCXXXIV",
      "CCXXXIX",
      "CCXLIV",
      "CCXXXV"
    ],
    "reponse": 0
  },
  {
    "id": "q1861",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mali ?",
    "options": [
      "🇲🇱",
      "🇻🇳",
      "🇰🇿",
      "🇲🇰"
    ],
    "reponse": 0
  },
  {
    "id": "q1862",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Bulgarie ?",
    "options": [
      "Ottawa",
      "Sofia",
      "Vilnius",
      "Amsterdam"
    ],
    "reponse": 1
  },
  {
    "id": "q1863",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est le plus grand prédateur terrestre carnivore actuel ?",
    "options": [
      "L'ours polaire",
      "Le lion",
      "L'ours brun",
      "Le tigre"
    ],
    "reponse": 0
  },
  {
    "id": "q1864",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle mer est en réalité un lac salé sans exutoire ?",
    "options": [
      "La mer Caspienne",
      "La mer Morte",
      "La mer Noire",
      "La mer d'Aral"
    ],
    "reponse": 1
  },
  {
    "id": "q1865",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 50 ?",
    "options": [
      "31",
      "30",
      "27",
      "32"
    ],
    "reponse": 1
  },
  {
    "id": "q1866",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Roméo et Juliette » ?",
    "options": [
      "William Shakespeare",
      "Christopher Marlowe",
      "Ben Jonson",
      "Oscar Wilde"
    ],
    "reponse": 0
  },
  {
    "id": "q1867",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Dans quel sport utilise-t-on le terme « grand chelem » pour désigner les quatre tournois majeurs ?",
    "options": [
      "Le golf",
      "Les deux (tennis et golf)",
      "Le baseball",
      "Le tennis"
    ],
    "reponse": 3
  },
  {
    "id": "q1868",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 12 ?",
    "options": [
      "214",
      "211",
      "216",
      "241"
    ],
    "reponse": 2
  },
  {
    "id": "q1869",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « API » en programmation ?",
    "options": [
      "Advanced Programming Interface",
      "Application Process Integration",
      "Automated Program Instruction",
      "Application Programming Interface"
    ],
    "reponse": 3
  },
  {
    "id": "q1870",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation française met en scène un village gaulois résistant à l'envahisseur romain ?",
    "options": [
      "Les Triplettes de Belleville",
      "Wakfu",
      "Astérix",
      "Kirikou"
    ],
    "reponse": 2
  },
  {
    "id": "q1871",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Mauritanie ?",
    "options": [
      "🇧🇾",
      "🇪🇹",
      "🇨🇩",
      "🇲🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q1872",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal change de couleur pour se fondre dans son environnement ?",
    "options": [
      "Le gecko",
      "Le caméléon",
      "Le lézard",
      "La grenouille"
    ],
    "reponse": 1
  },
  {
    "id": "q1873",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Grèce ?",
    "options": [
      "Franc CFA",
      "Zloty",
      "Sol péruvien",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q1874",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Si » ?",
    "options": [
      "Zinc",
      "Étain",
      "Silicium",
      "Béryllium"
    ],
    "reponse": 2
  },
  {
    "id": "q1875",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a créé la trilogie « The Dark Knight » avec Batman ?",
    "options": [
      "Sam Raimi",
      "Christopher Nolan",
      "Zack Snyder",
      "Tim Burton"
    ],
    "reponse": 1
  },
  {
    "id": "q1876",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel écrivain et architecte catalan est l'auteur de la Sagrada Familia à Barcelone ?",
    "options": [
      "Rafael Moneo",
      "Ricardo Bofill",
      "Santiago Calatrava",
      "Antoni Gaudí"
    ],
    "reponse": 3
  },
  {
    "id": "q1877",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Thaïlande",
      "Chili",
      "Guinée",
      "Bangladesh"
    ],
    "reponse": 1
  },
  {
    "id": "q1878",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Pakistan ?",
    "options": [
      "🇵🇰",
      "🇹🇿",
      "🇮🇩",
      "🇸🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q1879",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇼🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Madagascar",
      "Guinée",
      "Iran",
      "Samoa"
    ],
    "reponse": 3
  },
  {
    "id": "q1880",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve France ?",
    "options": [
      "Océanie",
      "Asie",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q1881",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel monstre grec avait une seule œil au milieu du front ?",
    "options": [
      "Le Minotaure",
      "Le Sphinx",
      "Le Cyclope",
      "La Gorgone"
    ],
    "reponse": 2
  },
  {
    "id": "q1882",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle planète possède le plus grand volcan du système solaire, Olympus Mons ?",
    "options": [
      "Mercure",
      "Jupiter",
      "Mars",
      "Vénus"
    ],
    "reponse": 2
  },
  {
    "id": "q1883",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Azerbaïdjan",
      "Argentine",
      "Fidji",
      "Chine"
    ],
    "reponse": 1
  },
  {
    "id": "q1884",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Autant en emporte le vent » ?",
    "options": [
      "Pearl Buck",
      "Margaret Mitchell",
      "Toni Morrison",
      "Harper Lee"
    ],
    "reponse": 1
  },
  {
    "id": "q1885",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Danemark ?",
    "options": [
      "Couronne danoise",
      "Roupie népalaise",
      "Yen",
      "Rial iranien"
    ],
    "reponse": 0
  },
  {
    "id": "q1886",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Néon ?",
    "options": [
      "Pd",
      "Ne",
      "As",
      "Be"
    ],
    "reponse": 1
  },
  {
    "id": "q1887",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 7 ?",
    "options": [
      "91",
      "95",
      "81",
      "100"
    ],
    "reponse": 0
  },
  {
    "id": "q1888",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cuivre ?",
    "options": [
      "He",
      "Cu",
      "V",
      "Kr"
    ],
    "reponse": 1
  },
  {
    "id": "q1889",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 586 - 73 ?",
    "options": [
      "515",
      "516",
      "511",
      "513"
    ],
    "reponse": 3
  },
  {
    "id": "q1890",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Slovénie ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Asie",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1891",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel est le premier langage de programmation considéré comme « orienté objet » très largement utilisé, créé par Sun Microsystems ?",
    "options": [
      "C++",
      "Python",
      "Java",
      "JavaScript"
    ],
    "reponse": 2
  },
  {
    "id": "q1892",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "République démocratique du Congo",
      "Mozambique",
      "Italie",
      "Suède"
    ],
    "reponse": 0
  },
  {
    "id": "q1893",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Skopje est la capitale de quel pays ?",
    "options": [
      "Côte d'Ivoire",
      "Macédoine du Nord",
      "Ghana",
      "Costa Rica"
    ],
    "reponse": 1
  },
  {
    "id": "q1894",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Estonie ?",
    "options": [
      "Tallinn",
      "Lisbonne",
      "Varsovie",
      "Tegucigalpa"
    ],
    "reponse": 0
  },
  {
    "id": "q1895",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1304 et 1355 ?",
    "options": [
      "56",
      "51",
      "52",
      "41"
    ],
    "reponse": 1
  },
  {
    "id": "q1896",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des braqueurs de haute technologie en France, adaptée en plusieurs saisons Netflix, centrée sur le Louvre ?",
    "options": [
      "Le Bureau des Légendes",
      "La Casa de Papel",
      "Vernon Subutex",
      "Lupin"
    ],
    "reponse": 3
  },
  {
    "id": "q1897",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Algérie ?",
    "options": [
      "🇯🇴",
      "🇳🇦",
      "🇳🇬",
      "🇩🇿"
    ],
    "reponse": 3
  },
  {
    "id": "q1898",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Italie ?",
    "options": [
      "🇰🇷",
      "🇮🇹",
      "🇰🇵",
      "🇩🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q1899",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Togo",
      "Cameroun",
      "Chine",
      "Angola"
    ],
    "reponse": 2
  },
  {
    "id": "q1900",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rb » ?",
    "options": [
      "Platine",
      "Hydrogène",
      "Rubidium",
      "Mercure"
    ],
    "reponse": 2
  },
  {
    "id": "q1901",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "La Havane est la capitale de quel pays ?",
    "options": [
      "Émirats arabes unis",
      "Pérou",
      "Équateur",
      "Cuba"
    ],
    "reponse": 3
  },
  {
    "id": "q1902",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du système d'exploitation open source dont le logo est un pingouin ?",
    "options": [
      "Linux",
      "Android",
      "Unix",
      "BSD"
    ],
    "reponse": 0
  },
  {
    "id": "q1903",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel serpent ou dragon gardait la Toison d'or dans le mythe de Jason ?",
    "options": [
      "Ladon",
      "Le dragon de Colchide",
      "L'Hydre de Lerne",
      "Python"
    ],
    "reponse": 1
  },
  {
    "id": "q1904",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de construction et de gestion permet de bâtir des villes ?",
    "options": [
      "Cities: Skylines",
      "Tropico",
      "Les Sims",
      "SimCity"
    ],
    "reponse": 3
  },
  {
    "id": "q1905",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année a eu lieu la prise de la Bastille ?",
    "options": [
      "1789",
      "1799",
      "1769",
      "1804"
    ],
    "reponse": 0
  },
  {
    "id": "q1906",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3073 en chiffres romains ?",
    "options": [
      "MMMLXXIII",
      "MMMLXIII",
      "MMMLXXIV",
      "MMMLXXI"
    ],
    "reponse": 0
  },
  {
    "id": "q1907",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mauritanie ?",
    "options": [
      "Europe",
      "Afrique",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q1908",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Libreville est la capitale de quel pays ?",
    "options": [
      "États-Unis",
      "Congo",
      "Gabon",
      "Philippines"
    ],
    "reponse": 2
  },
  {
    "id": "q1909",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu de cartes à collectionner met en scène des créatures comme Pikachu ?",
    "options": [
      "Digimon",
      "Pokémon",
      "Magic: The Gathering",
      "Yu-Gi-Oh!"
    ],
    "reponse": 1
  },
  {
    "id": "q1910",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Népal ?",
    "options": [
      "🇭🇹",
      "🇳🇵",
      "🇳🇦",
      "🇰🇵"
    ],
    "reponse": 1
  },
  {
    "id": "q1911",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇧 De quel pays est-ce le drapeau ?",
    "options": [
      "Suriname",
      "Liban",
      "Finlande",
      "Chypre"
    ],
    "reponse": 1
  },
  {
    "id": "q1912",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1837 appartient à quel siècle ?",
    "options": [
      "19e siècle",
      "18e siècle",
      "17e siècle",
      "20e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1913",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 169 ?",
    "options": [
      "16",
      "11",
      "14",
      "13"
    ],
    "reponse": 3
  },
  {
    "id": "q1914",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mozambique ?",
    "options": [
      "Gourde",
      "Metical",
      "Dinar tunisien",
      "Guarani"
    ],
    "reponse": 1
  },
  {
    "id": "q1915",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Corée du Nord ?",
    "options": [
      "🇲🇳",
      "🇳🇱",
      "🇰🇵",
      "🇵🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q1916",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kazakhstan ?",
    "options": [
      "Amman",
      "Abuja",
      "Astana",
      "Amsterdam"
    ],
    "reponse": 2
  },
  {
    "id": "q1917",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Thaïlande",
      "Côte d'Ivoire",
      "Kazakhstan",
      "Qatar"
    ],
    "reponse": 0
  },
  {
    "id": "q1918",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lusaka est la capitale de quel pays ?",
    "options": [
      "Zambie",
      "Espagne",
      "Pérou",
      "Émirats arabes unis"
    ],
    "reponse": 0
  },
  {
    "id": "q1919",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport dit-on qu'un joueur « sert » et que l'adversaire « retourne » ?",
    "options": [
      "Le tennis de table",
      "Le tennis",
      "Le volley-ball",
      "Le badminton"
    ],
    "reponse": 1
  },
  {
    "id": "q1920",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 4 siècle(s) ?",
    "options": [
      "372",
      "400",
      "346",
      "421"
    ],
    "reponse": 1
  },
  {
    "id": "q1921",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Syrie ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1922",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel hérisson bleu très rapide est la mascotte de Sega ?",
    "options": [
      "Mario",
      "Sonic",
      "Crash Bandicoot",
      "Rayman"
    ],
    "reponse": 1
  },
  {
    "id": "q1923",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Vietnam ?",
    "options": [
      "Metical",
      "Livre libanaise",
      "Lempira",
      "Dong"
    ],
    "reponse": 3
  },
  {
    "id": "q1924",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Égypte ?",
    "options": [
      "Le Caire",
      "Santiago",
      "Buenos Aires",
      "Dakar"
    ],
    "reponse": 0
  },
  {
    "id": "q1925",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat japonais consiste en du riz vinaigré accompagné de poisson cru ?",
    "options": [
      "Les tempuras",
      "Les sushis",
      "Les yakitoris",
      "Les ramens"
    ],
    "reponse": 1
  },
  {
    "id": "q1926",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 300 ?",
    "options": [
      "39",
      "46",
      "47",
      "45"
    ],
    "reponse": 3
  },
  {
    "id": "q1927",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Lituanie",
      "Pakistan",
      "Luxembourg",
      "Kazakhstan"
    ],
    "reponse": 1
  },
  {
    "id": "q1928",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 781 + 866 ?",
    "options": [
      "1644",
      "1647",
      "1650",
      "1645"
    ],
    "reponse": 1
  },
  {
    "id": "q1929",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Madagascar ?",
    "options": [
      "Afrique",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q1930",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série britannique met en scène un détective consultant vivant au 221B Baker Street ?",
    "options": [
      "Sherlock",
      "Peaky Blinders",
      "Luther",
      "Broadchurch"
    ],
    "reponse": 0
  },
  {
    "id": "q1931",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1212 en chiffres romains ?",
    "options": [
      "MCCXIV",
      "MCCX",
      "MCCXII",
      "MCCXIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1932",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Angola ?",
    "options": [
      "Denar macédonien",
      "Kwanza",
      "Peso cubain",
      "Shilling ougandais"
    ],
    "reponse": 1
  },
  {
    "id": "q1933",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument à percussion est composé de plusieurs tambours et cymbales, utilisé dans les groupes de rock ?",
    "options": [
      "Le tambourin",
      "La batterie",
      "Le xylophone",
      "Les congas"
    ],
    "reponse": 1
  },
  {
    "id": "q1934",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMXVIII en chiffres romains ?",
    "options": [
      "3016",
      "3013",
      "3018",
      "3023"
    ],
    "reponse": 2
  },
  {
    "id": "q1935",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Danemark ?",
    "options": [
      "🇰🇵",
      "🇩🇰",
      "🇵🇪",
      "🇸🇳"
    ],
    "reponse": 1
  },
  {
    "id": "q1936",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 523 - 513 ?",
    "options": [
      "7",
      "13",
      "10",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q1937",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 21 jour(s) ?",
    "options": [
      "6",
      "3",
      "1",
      "0"
    ],
    "reponse": 1
  },
  {
    "id": "q1938",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 288 mois ?",
    "options": [
      "28",
      "25",
      "24",
      "19"
    ],
    "reponse": 2
  },
  {
    "id": "q1939",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 54 ÷ 3 ?",
    "options": [
      "19",
      "18",
      "21",
      "15"
    ],
    "reponse": 1
  },
  {
    "id": "q1940",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Sénégal ?",
    "options": [
      "🇰🇷",
      "🇸🇳",
      "🇩🇰",
      "🇱🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q1941",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète du système solaire possède les anneaux les plus visibles ?",
    "options": [
      "Uranus",
      "Jupiter",
      "Saturne",
      "Neptune"
    ],
    "reponse": 2
  },
  {
    "id": "q1942",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dodoma est la capitale de quel pays ?",
    "options": [
      "Islande",
      "Burkina Faso",
      "Tanzanie",
      "Chili"
    ],
    "reponse": 2
  },
  {
    "id": "q1943",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Autriche ?",
    "options": [
      "Dakar",
      "Amsterdam",
      "Gaborone",
      "Vienne"
    ],
    "reponse": 3
  },
  {
    "id": "q1944",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 536 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "7e siècle",
      "4e siècle",
      "5e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1945",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Iran ?",
    "options": [
      "🇿🇲",
      "🇬🇹",
      "🇮🇷",
      "🇧🇾"
    ],
    "reponse": 2
  },
  {
    "id": "q1946",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Croatie ?",
    "options": [
      "Kip",
      "Franc guinéen",
      "Quetzal",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q1947",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Costa Rica ?",
    "options": [
      "Colon costaricain",
      "Livre syrienne",
      "Birr",
      "Won nord-coréen"
    ],
    "reponse": 0
  },
  {
    "id": "q1948",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 212 + 338 ?",
    "options": [
      "550",
      "552",
      "553",
      "547"
    ],
    "reponse": 0
  },
  {
    "id": "q1949",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Pérou ?",
    "options": [
      "Sol péruvien",
      "Metical",
      "Guarani",
      "Franc guinéen"
    ],
    "reponse": 0
  },
  {
    "id": "q1950",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Namibie ?",
    "options": [
      "🇳🇦",
      "🇦🇲",
      "🇧🇦",
      "🇯🇴"
    ],
    "reponse": 0
  },
  {
    "id": "q1951",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Biélorussie ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q1952",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Bismuth ?",
    "options": [
      "Mn",
      "Th",
      "Bi",
      "H"
    ],
    "reponse": 2
  },
  {
    "id": "q1953",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 247 - 164 ?",
    "options": [
      "83",
      "81",
      "82",
      "80"
    ],
    "reponse": 0
  },
  {
    "id": "q1954",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Finlande ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1955",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel mur est tombé en 1989, symbolisant la fin de la guerre froide ?",
    "options": [
      "Le mur de Berlin",
      "Le mur de Varsovie",
      "La muraille de Chine",
      "Le mur d'Hadrien"
    ],
    "reponse": 0
  },
  {
    "id": "q1956",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 60 ÷ 5 ?",
    "options": [
      "12",
      "14",
      "11",
      "15"
    ],
    "reponse": 0
  },
  {
    "id": "q1957",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 844 + 102 ?",
    "options": [
      "944",
      "946",
      "943",
      "948"
    ],
    "reponse": 1
  },
  {
    "id": "q1958",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est traversé par le tropique du Cancer et possède les pyramides de Gizeh ?",
    "options": [
      "La Libye",
      "L'Égypte",
      "Le Maroc",
      "L'Algérie"
    ],
    "reponse": 1
  },
  {
    "id": "q1959",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin possède huit bras et est considéré comme très intelligent ?",
    "options": [
      "Le calmar",
      "La seiche",
      "L'étoile de mer",
      "La pieuvre"
    ],
    "reponse": 3
  },
  {
    "id": "q1960",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport le terrain est-il appelé un « green » pour la zone autour du trou ?",
    "options": [
      "Le curling",
      "Le golf",
      "Le croquet",
      "Le bowling"
    ],
    "reponse": 1
  },
  {
    "id": "q1961",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Nicaragua ?",
    "options": [
      "🇷🇼",
      "🇳🇮",
      "🇮🇹",
      "🇬🇹"
    ],
    "reponse": 1
  },
  {
    "id": "q1962",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1041 en chiffres romains ?",
    "options": [
      "MXL",
      "MXLI",
      "MXXXVI",
      "MXXXI"
    ],
    "reponse": 1
  },
  {
    "id": "q1963",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ouzbékistan ?",
    "options": [
      "Kampala",
      "Riyad",
      "Manille",
      "Tachkent"
    ],
    "reponse": 3
  },
  {
    "id": "q1964",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 225 ?",
    "options": [
      "14",
      "17",
      "15",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q1965",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Croatie ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1966",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Costa Rica ?",
    "options": [
      "🇿🇼",
      "🇹🇬",
      "🇲🇪",
      "🇨🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q1967",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tokyo est la capitale de quel pays ?",
    "options": [
      "Australie",
      "Corée du Sud",
      "Royaume-Uni",
      "Japon"
    ],
    "reponse": 3
  },
  {
    "id": "q1968",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle japonais met en scène des invocations de créatures géantes appelées Eidolons ou Espers ?",
    "options": [
      "Dragon Quest",
      "Persona",
      "Final Fantasy",
      "Tales of"
    ],
    "reponse": 2
  },
  {
    "id": "q1969",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Plutonium ?",
    "options": [
      "Pu",
      "W",
      "N",
      "Nb"
    ],
    "reponse": 0
  },
  {
    "id": "q1970",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Lettonie ?",
    "options": [
      "Leu roumain",
      "Euro",
      "Dinar jordanien",
      "Dinar serbe"
    ],
    "reponse": 1
  },
  {
    "id": "q1971",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel peintre français est associé au pointillisme avec son tableau « Un dimanche après-midi à l'Île de la Grande Jatte » ?",
    "options": [
      "Henri de Toulouse-Lautrec",
      "Paul Signac",
      "Camille Pissarro",
      "Georges Seurat"
    ],
    "reponse": 3
  },
  {
    "id": "q1972",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Hanoï est la capitale de quel pays ?",
    "options": [
      "Argentine",
      "Syrie",
      "Vietnam",
      "Paraguay"
    ],
    "reponse": 2
  },
  {
    "id": "q1973",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bénin ?",
    "options": [
      "🇸🇰",
      "🇪🇬",
      "🇦🇫",
      "🇧🇯"
    ],
    "reponse": 3
  },
  {
    "id": "q1974",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Wolverine dans la saga « X-Men » ?",
    "options": [
      "Chris Hemsworth",
      "Hugh Jackman",
      "Liev Schreiber",
      "Ryan Reynolds"
    ],
    "reponse": 1
  },
  {
    "id": "q1975",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays d'Amérique du Sud ne possède pas de côte maritime ?",
    "options": [
      "La Bolivie",
      "Le Chili",
      "L'Uruguay",
      "L'Équateur"
    ],
    "reponse": 0
  },
  {
    "id": "q1976",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est le protagoniste de « l'Odyssée » d'Homère ?",
    "options": [
      "Agamemnon",
      "Achille",
      "Ajax",
      "Ulysse"
    ],
    "reponse": 3
  },
  {
    "id": "q1977",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 17 ?",
    "options": [
      "75",
      "94",
      "85",
      "78"
    ],
    "reponse": 2
  },
  {
    "id": "q1978",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Chine ?",
    "options": [
      "🇸🇾",
      "🇨🇳",
      "🇦🇺",
      "🇲🇹"
    ],
    "reponse": 1
  },
  {
    "id": "q1979",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a inventé le judo ?",
    "options": [
      "La Chine",
      "La Corée",
      "Le Japon",
      "La Thaïlande"
    ],
    "reponse": 2
  },
  {
    "id": "q1980",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est le plus grand des primates ?",
    "options": [
      "Le babouin",
      "Le gorille",
      "Le chimpanzé",
      "L'orang-outan"
    ],
    "reponse": 1
  },
  {
    "id": "q1981",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 998 en chiffres romains ?",
    "options": [
      "M",
      "MIII",
      "CMXCVIII",
      "CMXCIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1982",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur mexicain a remporté l'Oscar pour « La Forme de l'eau » ?",
    "options": [
      "Alejandro González Iñárritu",
      "Robert Rodriguez",
      "Guillermo del Toro",
      "Alfonso Cuarón"
    ],
    "reponse": 2
  },
  {
    "id": "q1983",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel événement a déclenché la guerre du Golfe en 1990 ?",
    "options": [
      "L'embargo pétrolier",
      "La révolution iranienne",
      "L'attaque de l'Iran",
      "L'invasion du Koweït par l'Irak"
    ],
    "reponse": 3
  },
  {
    "id": "q1984",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 × 11 ?",
    "options": [
      "42",
      "44",
      "37",
      "46"
    ],
    "reponse": 1
  },
  {
    "id": "q1985",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel artiste surréaliste espagnol est connu pour ses montres molles dans « La Persistance de la mémoire » ?",
    "options": [
      "Pablo Picasso",
      "Salvador Dalí",
      "Joan Miró",
      "René Magritte"
    ],
    "reponse": 1
  },
  {
    "id": "q1986",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Allemagne ?",
    "options": [
      "Europe",
      "Asie",
      "Amérique du Sud",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1987",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1374 en chiffres romains ?",
    "options": [
      "MCCCLXXIV",
      "MCCCLXXIX",
      "MCCCLXIX",
      "MCCCLXXVI"
    ],
    "reponse": 0
  },
  {
    "id": "q1988",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "États-Unis",
      "Portugal",
      "Slovénie",
      "Mexique"
    ],
    "reponse": 1
  },
  {
    "id": "q1989",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kingston est la capitale de quel pays ?",
    "options": [
      "Italie",
      "France",
      "Vanuatu",
      "Jamaïque"
    ],
    "reponse": 3
  },
  {
    "id": "q1990",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Koweït ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1991",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Malte",
      "Mozambique",
      "Pologne",
      "Macédoine du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q1992",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel style de danse et de musique est né dans les quartiers populaires de New York dans les années 1970, mêlant rap et rythmes ?",
    "options": [
      "Le hip-hop",
      "Le funk",
      "Le RnB",
      "Le disco"
    ],
    "reponse": 0
  },
  {
    "id": "q1993",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1509 et 1620 ?",
    "options": [
      "111",
      "130",
      "119",
      "127"
    ],
    "reponse": 0
  },
  {
    "id": "q1994",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « In » ?",
    "options": [
      "Indium",
      "Arsenic",
      "Fer",
      "Lithium"
    ],
    "reponse": 0
  },
  {
    "id": "q1995",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 9 ?",
    "options": [
      "131",
      "135",
      "127",
      "129"
    ],
    "reponse": 1
  },
  {
    "id": "q1996",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type de jumeaux partage exactement le même patrimoine génétique ?",
    "options": [
      "Les jumeaux dizygotes",
      "Les faux jumeaux",
      "Les vrais jumeaux (monozygotes)",
      "Aucun"
    ],
    "reponse": 2
  },
  {
    "id": "q1997",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 au carré ?",
    "options": [
      "400",
      "349",
      "356",
      "402"
    ],
    "reponse": 0
  },
  {
    "id": "q1998",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle créature grecque, mi-femme mi-oiseau, attirait les marins par son chant ?",
    "options": [
      "Les Harpies",
      "Les Gorgones",
      "Les Sirènes",
      "Les Nymphes"
    ],
    "reponse": 2
  },
  {
    "id": "q1999",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style architectural médiéval est caractérisé par des arcs en ogive et de grandes rosaces, comme à Notre-Dame de Paris ?",
    "options": [
      "Le roman",
      "Le gothique",
      "Le baroque",
      "Le renaissance"
    ],
    "reponse": 1
  },
  {
    "id": "q2000",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Reykjavik",
      "Port Moresby",
      "Belmopan",
      "Budapest"
    ],
    "reponse": 1
  },
  {
    "id": "q2001",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport utilise-t-on les termes « pat » et « eagle » liés au score d'un trou ?",
    "options": [
      "Le tir à l'arc",
      "Le curling",
      "Le bowling",
      "Le golf"
    ],
    "reponse": 3
  },
  {
    "id": "q2002",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Portugal",
      "Corée du Sud",
      "Éthiopie",
      "Gabon"
    ],
    "reponse": 2
  },
  {
    "id": "q2003",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel monument parisien a été construit pour l'Exposition universelle de 1889 ?",
    "options": [
      "La tour Eiffel",
      "Le Sacré-Cœur",
      "Le Grand Palais",
      "L'Arc de Triomphe"
    ],
    "reponse": 0
  },
  {
    "id": "q2004",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 36 h ?",
    "options": [
      "133714",
      "113521",
      "129600",
      "149716"
    ],
    "reponse": 2
  },
  {
    "id": "q2005",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur d'Amazon ?",
    "options": [
      "Larry Ellison",
      "Tim Cook",
      "Elon Musk",
      "Jeff Bezos"
    ],
    "reponse": 3
  },
  {
    "id": "q2006",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1712 en chiffres romains ?",
    "options": [
      "MDCCXII",
      "MDCCX",
      "MDCCXIV",
      "MDCCXIII"
    ],
    "reponse": 0
  },
  {
    "id": "q2007",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Or ?",
    "options": [
      "He",
      "Po",
      "Au",
      "Si"
    ],
    "reponse": 2
  },
  {
    "id": "q2008",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Polonium ?",
    "options": [
      "Mg",
      "Se",
      "Po",
      "Th"
    ],
    "reponse": 2
  },
  {
    "id": "q2009",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation met en scène quatre enfants dans la ville fictive de South Park ?",
    "options": [
      "South Park",
      "Family Guy",
      "Les Simpson",
      "Bob's Burgers"
    ],
    "reponse": 0
  },
  {
    "id": "q2010",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat chinois consiste en de fines lamelles de canard laqué servies avec des crêpes fines ?",
    "options": [
      "Le riz cantonais",
      "Le canard laqué de Pékin",
      "Le porc aigre-doux",
      "Les raviolis vapeur"
    ],
    "reponse": 1
  },
  {
    "id": "q2011",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 26 m ?",
    "options": [
      "25809",
      "22062",
      "26000",
      "25605"
    ],
    "reponse": 2
  },
  {
    "id": "q2012",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 6 ?",
    "options": [
      "81",
      "96",
      "90",
      "94"
    ],
    "reponse": 2
  },
  {
    "id": "q2013",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Magnésium ?",
    "options": [
      "F",
      "Mg",
      "P",
      "He"
    ],
    "reponse": 1
  },
  {
    "id": "q2014",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a inventé le sport du sumo ?",
    "options": [
      "Le Japon",
      "La Corée",
      "La Mongolie",
      "La Chine"
    ],
    "reponse": 0
  },
  {
    "id": "q2015",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de programmation est très utilisé pour l'analyse de données et l'intelligence artificielle ?",
    "options": [
      "COBOL",
      "Python",
      "Fortran",
      "Assembleur"
    ],
    "reponse": 1
  },
  {
    "id": "q2016",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 170 ÷ 10 ?",
    "options": [
      "17",
      "16",
      "15",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q2017",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLXVII en chiffres romains ?",
    "options": [
      "2466",
      "2467",
      "2468",
      "2462"
    ],
    "reponse": 1
  },
  {
    "id": "q2018",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 1 m ?",
    "options": [
      "1036",
      "1113",
      "864",
      "1000"
    ],
    "reponse": 3
  },
  {
    "id": "q2019",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 182 en chiffres romains ?",
    "options": [
      "CLXXXIV",
      "CLXXII",
      "CLXXXII",
      "CLXXXVII"
    ],
    "reponse": 2
  },
  {
    "id": "q2020",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ouagadougou est la capitale de quel pays ?",
    "options": [
      "Grèce",
      "Serbie",
      "Ouzbékistan",
      "Burkina Faso"
    ],
    "reponse": 3
  },
  {
    "id": "q2021",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 44 + 638 ?",
    "options": [
      "682",
      "681",
      "683",
      "685"
    ],
    "reponse": 0
  },
  {
    "id": "q2022",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Mongolie ?",
    "options": [
      "Franc guinéen",
      "Roupie pakistanaise",
      "Riyal yéménite",
      "Tugrik"
    ],
    "reponse": 3
  },
  {
    "id": "q2023",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « O » ?",
    "options": [
      "Iode",
      "Aluminium",
      "Oxygène",
      "Béryllium"
    ],
    "reponse": 2
  },
  {
    "id": "q2024",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1217 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "11e siècle",
      "12e siècle",
      "13e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2025",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel est le roi des dieux dans la mythologie nordique ?",
    "options": [
      "Thor",
      "Odin",
      "Loki",
      "Freyr"
    ],
    "reponse": 1
  },
  {
    "id": "q2026",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Combien de temps un chameau peut-il rester sans boire d'eau, grâce à ses bosses de graisse ?",
    "options": [
      "Il boit tous les jours",
      "Quelques heures",
      "Une journée",
      "Plusieurs jours voire semaines"
    ],
    "reponse": 3
  },
  {
    "id": "q2027",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 153 + 520 ?",
    "options": [
      "672",
      "675",
      "674",
      "673"
    ],
    "reponse": 3
  },
  {
    "id": "q2028",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bénin ?",
    "options": [
      "Pula",
      "Won nord-coréen",
      "Franc CFA",
      "Franc guinéen"
    ],
    "reponse": 2
  },
  {
    "id": "q2029",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2769 en chiffres romains ?",
    "options": [
      "MMDCCLXXI",
      "MMDCCLIX",
      "MMDCCLXIX",
      "MMDCCLXIV"
    ],
    "reponse": 2
  },
  {
    "id": "q2030",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Laos",
      "Malaisie",
      "Soudan",
      "Australie"
    ],
    "reponse": 2
  },
  {
    "id": "q2031",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 60 ÷ 2 ?",
    "options": [
      "34",
      "35",
      "30",
      "26"
    ],
    "reponse": 2
  },
  {
    "id": "q2032",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Arabie saoudite ?",
    "options": [
      "Koweït City",
      "Singapour",
      "Naypyidaw",
      "Riyad"
    ],
    "reponse": 3
  },
  {
    "id": "q2033",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 34 + 126 ?",
    "options": [
      "157",
      "158",
      "160",
      "161"
    ],
    "reponse": 2
  },
  {
    "id": "q2034",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ar » ?",
    "options": [
      "Bismuth",
      "Argon",
      "Hydrogène",
      "Ruthénium"
    ],
    "reponse": 1
  },
  {
    "id": "q2035",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat mexicain consiste en une tortilla de maïs garnie de viande, légumes et épices, pliée ou roulée ?",
    "options": [
      "L'enchilada",
      "Le nacho",
      "Le taco",
      "Le burrito"
    ],
    "reponse": 2
  },
  {
    "id": "q2036",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 965 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "10e siècle",
      "8e siècle",
      "9e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q2037",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Bulgarie ?",
    "options": [
      "Couronne tchèque",
      "Lev bulgare",
      "Tugrik",
      "Shilling kényan"
    ],
    "reponse": 1
  },
  {
    "id": "q2038",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle nage est considérée comme la plus rapide en natation ?",
    "options": [
      "La brasse",
      "Le papillon",
      "Le crawl (nage libre)",
      "Le dos crawlé"
    ],
    "reponse": 2
  },
  {
    "id": "q2039",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel roi d'Angleterre a dû signer la Magna Carta en 1215 ?",
    "options": [
      "Richard Cœur de Lion",
      "Jean sans Terre",
      "Guillaume le Conquérant",
      "Henri II"
    ],
    "reponse": 1
  },
  {
    "id": "q2040",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Montevideo est la capitale de quel pays ?",
    "options": [
      "Roumanie",
      "Uruguay",
      "Irlande",
      "France"
    ],
    "reponse": 1
  },
  {
    "id": "q2041",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 170 en chiffres romains ?",
    "options": [
      "CLXV",
      "CLXXX",
      "CLXX",
      "CLX"
    ],
    "reponse": 2
  },
  {
    "id": "q2042",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de sets faut-il gagner pour remporter un match de tennis en 5 sets (Grand Chelem messieurs) ?",
    "options": [
      "5",
      "2",
      "4",
      "3"
    ],
    "reponse": 3
  },
  {
    "id": "q2043",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pt » ?",
    "options": [
      "Carbone",
      "Platine",
      "Strontium",
      "Technétium"
    ],
    "reponse": 1
  },
  {
    "id": "q2044",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Aluminium ?",
    "options": [
      "Ga",
      "Xe",
      "Sn",
      "Al"
    ],
    "reponse": 3
  },
  {
    "id": "q2045",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 80 - 18 ?",
    "options": [
      "60",
      "62",
      "59",
      "61"
    ],
    "reponse": 1
  },
  {
    "id": "q2046",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur britannique a écrit la saga « Le Monde de Narnia » ?",
    "options": [
      "Philip Pullman",
      "J.R.R. Tolkien",
      "C.S. Lewis",
      "Roald Dahl"
    ],
    "reponse": 2
  },
  {
    "id": "q2047",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente D en chiffres romains ?",
    "options": [
      "500",
      "490",
      "499",
      "510"
    ],
    "reponse": 0
  },
  {
    "id": "q2048",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Accra est la capitale de quel pays ?",
    "options": [
      "Ghana",
      "Burkina Faso",
      "Danemark",
      "Bénin"
    ],
    "reponse": 0
  },
  {
    "id": "q2049",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des dragons et des maisons rivales, adaptée des romans de George R.R. Martin ?",
    "options": [
      "His Dark Materials",
      "Game of Thrones",
      "The Wheel of Time",
      "The Witcher"
    ],
    "reponse": 1
  },
  {
    "id": "q2050",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 230 - 22 ?",
    "options": [
      "208",
      "209",
      "207",
      "205"
    ],
    "reponse": 0
  },
  {
    "id": "q2051",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Royaume-Uni ?",
    "options": [
      "Dollar néo-zélandais",
      "Couronne tchèque",
      "Livre sterling",
      "Ringgit"
    ],
    "reponse": 2
  },
  {
    "id": "q2052",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur de Microsoft ?",
    "options": [
      "Larry Page",
      "Mark Zuckerberg",
      "Bill Gates",
      "Steve Jobs"
    ],
    "reponse": 2
  },
  {
    "id": "q2053",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Haïti ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q2054",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Cuba ?",
    "options": [
      "La Havane",
      "Sanaa",
      "Luanda",
      "Oslo"
    ],
    "reponse": 0
  },
  {
    "id": "q2055",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Hongrie ?",
    "options": [
      "Kina",
      "Forint",
      "Riel",
      "Dirham marocain"
    ],
    "reponse": 1
  },
  {
    "id": "q2056",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle partie du cerveau est responsable de l'équilibre et de la coordination des mouvements ?",
    "options": [
      "Le cortex",
      "Le cervelet",
      "Le thalamus",
      "L'hippocampe"
    ],
    "reponse": 1
  },
  {
    "id": "q2057",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Chypre ?",
    "options": [
      "Couronne danoise",
      "Euro",
      "Dong",
      "Riyal saoudien"
    ],
    "reponse": 1
  },
  {
    "id": "q2058",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Mongolie ?",
    "options": [
      "🇲🇳",
      "🇿🇲",
      "🇳🇪",
      "🇰🇿"
    ],
    "reponse": 0
  },
  {
    "id": "q2059",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel scientifique a formulé les lois de l'hérédité en étudiant les pois ?",
    "options": [
      "Louis Pasteur",
      "Antoine Lavoisier",
      "Charles Darwin",
      "Gregor Mendel"
    ],
    "reponse": 3
  },
  {
    "id": "q2060",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel félin est le seul à ne pas pouvoir rentrer complètement ses griffes ?",
    "options": [
      "Le guépard",
      "Le lynx",
      "Le lion",
      "Le tigre"
    ],
    "reponse": 0
  },
  {
    "id": "q2061",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 680 en chiffres romains ?",
    "options": [
      "DCLXXXV",
      "DCLXXXII",
      "DCLXXV",
      "DCLXXX"
    ],
    "reponse": 3
  },
  {
    "id": "q2062",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série télévisée met en scène des familles nobles s'affrontant dans un monde nommé Westeros ?",
    "options": [
      "The Last Kingdom",
      "Game of Thrones",
      "The Witcher",
      "Vikings"
    ],
    "reponse": 1
  },
  {
    "id": "q2063",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Jamaïque ?",
    "options": [
      "Rouble russe",
      "Kip",
      "Riyal yéménite",
      "Dollar jamaïcain"
    ],
    "reponse": 3
  },
  {
    "id": "q2064",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle invention de Guglielmo Marconi a révolutionné les communications au XXe siècle ?",
    "options": [
      "Le télégraphe",
      "La télévision",
      "La radio",
      "Le téléphone"
    ],
    "reponse": 2
  },
  {
    "id": "q2065",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des adolescents affrontant des phénomènes surnaturels dans la ville de Hawkins ?",
    "options": [
      "Stranger Things",
      "The OA",
      "Locke & Key",
      "Dark"
    ],
    "reponse": 0
  },
  {
    "id": "q2066",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 700 cm ?",
    "options": [
      "7",
      "5",
      "10",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q2067",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 34 min ?",
    "options": [
      "1975",
      "2203",
      "1751",
      "2040"
    ],
    "reponse": 3
  },
  {
    "id": "q2068",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel roi de Macédoine a créé un immense empire allant jusqu'en Inde ?",
    "options": [
      "Alexandre le Grand",
      "Philippe II",
      "Darius III",
      "Xerxès"
    ],
    "reponse": 0
  },
  {
    "id": "q2069",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCII en chiffres romains ?",
    "options": [
      "3803",
      "3807",
      "3802",
      "3797"
    ],
    "reponse": 2
  },
  {
    "id": "q2070",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCXCIX en chiffres romains ?",
    "options": [
      "3399",
      "3398",
      "3394",
      "3404"
    ],
    "reponse": 0
  },
  {
    "id": "q2071",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 37 h ?",
    "options": [
      "133200",
      "129062",
      "127489",
      "140359"
    ],
    "reponse": 0
  },
  {
    "id": "q2072",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Grèce ?",
    "options": [
      "Afrique",
      "Asie",
      "Océanie",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q2073",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel est le roi des dieux dans la mythologie grecque ?",
    "options": [
      "Poséidon",
      "Zeus",
      "Hadès",
      "Apollon"
    ],
    "reponse": 1
  },
  {
    "id": "q2074",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Roumanie",
      "Pérou",
      "Costa Rica",
      "Indonésie"
    ],
    "reponse": 3
  },
  {
    "id": "q2075",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "En quelle année a eu lieu la révolution russe qui a renversé le tsar ?",
    "options": [
      "1929",
      "1905",
      "1917",
      "1921"
    ],
    "reponse": 2
  },
  {
    "id": "q2076",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Iron Man dans l'univers cinématographique Marvel ?",
    "options": [
      "Robert Downey Jr.",
      "Chris Hemsworth",
      "Chris Evans",
      "Mark Ruffalo"
    ],
    "reponse": 0
  },
  {
    "id": "q2077",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Japon ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2078",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 26 + 37 ?",
    "options": [
      "61",
      "63",
      "65",
      "66"
    ],
    "reponse": 1
  },
  {
    "id": "q2079",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quel pays a remporté la toute première Coupe du monde de football en 1930 ?",
    "options": [
      "L'Uruguay",
      "L'Italie",
      "L'Argentine",
      "Le Brésil"
    ],
    "reponse": 0
  },
  {
    "id": "q2080",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Tony Montana dans « Scarface » ?",
    "options": [
      "Al Pacino",
      "Joe Pesci",
      "Robert De Niro",
      "Sylvester Stallone"
    ],
    "reponse": 0
  },
  {
    "id": "q2081",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Soudan ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q2082",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 300 min ?",
    "options": [
      "6",
      "4",
      "3",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q2083",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 519 + 135 ?",
    "options": [
      "651",
      "652",
      "657",
      "654"
    ],
    "reponse": 3
  },
  {
    "id": "q2084",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Émirats arabes unis ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q2085",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Roumanie ?",
    "options": [
      "Yamoussoukro",
      "Bucarest",
      "Apia",
      "Harare"
    ],
    "reponse": 1
  },
  {
    "id": "q2086",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Géorgie",
      "Colombie",
      "Bénin",
      "Cambodge"
    ],
    "reponse": 2
  },
  {
    "id": "q2087",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Katmandou est la capitale de quel pays ?",
    "options": [
      "Népal",
      "Autriche",
      "Myanmar",
      "Éthiopie"
    ],
    "reponse": 0
  },
  {
    "id": "q2088",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Botswana ?",
    "options": [
      "🇱🇹",
      "🇧🇼",
      "🇪🇬",
      "🇬🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q2089",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Danemark ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q2090",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 508 appartient à quel siècle ?",
    "options": [
      "7e siècle",
      "5e siècle",
      "6e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2091",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel protocole permet d'afficher les pages web, dont l'abréviation précède les adresses (http) ?",
    "options": [
      "HyperText Transfer Protocol",
      "Internet Message Protocol",
      "Simple Mail Transfer Protocol",
      "File Transfer Protocol"
    ],
    "reponse": 0
  },
  {
    "id": "q2092",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur de Tesla et SpaceX, aussi lié à Twitter/X ?",
    "options": [
      "Bill Gates",
      "Jeff Bezos",
      "Elon Musk",
      "Larry Page"
    ],
    "reponse": 2
  },
  {
    "id": "q2093",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2020 appartient à quel siècle ?",
    "options": [
      "22e siècle",
      "20e siècle",
      "19e siècle",
      "21e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2094",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros a tué la Méduse dans la mythologie grecque ?",
    "options": [
      "Persée",
      "Thésée",
      "Héraclès",
      "Jason"
    ],
    "reponse": 0
  },
  {
    "id": "q2095",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage est principalement utilisé pour mettre en forme les pages web (couleurs, mise en page) ?",
    "options": [
      "JavaScript",
      "HTML",
      "CSS",
      "SQL"
    ],
    "reponse": 2
  },
  {
    "id": "q2096",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Philippines",
      "Chypre",
      "Vietnam",
      "Afghanistan"
    ],
    "reponse": 1
  },
  {
    "id": "q2097",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année a été signé l'armistice mettant fin à la Première Guerre mondiale ?",
    "options": [
      "1919",
      "1920",
      "1918",
      "1917"
    ],
    "reponse": 2
  },
  {
    "id": "q2098",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Égypte ?",
    "options": [
      "🇪🇬",
      "🇲🇿",
      "🇯🇵",
      "🇱🇺"
    ],
    "reponse": 0
  },
  {
    "id": "q2099",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 210 jour(s) ?",
    "options": [
      "33",
      "30",
      "36",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q2100",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de plateforme met en scène un hérisson qui collecte des anneaux dorés ?",
    "options": [
      "Sonic the Hedgehog",
      "Mega Man",
      "Kirby",
      "Mario"
    ],
    "reponse": 0
  },
  {
    "id": "q2101",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouzbékistan",
      "Bulgarie",
      "Tunisie",
      "Thaïlande"
    ],
    "reponse": 1
  },
  {
    "id": "q2102",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Indonésie ?",
    "options": [
      "Dollar australien",
      "Livre soudanaise",
      "Peso colombien",
      "Roupie indonésienne"
    ],
    "reponse": 3
  },
  {
    "id": "q2103",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suisse ?",
    "options": [
      "Europe",
      "Asie",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q2104",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle chanteuse française d'origine égyptienne est connue pour « Bambino » et « Il venait d'avoir 18 ans » ?",
    "options": [
      "Édith Piaf",
      "Juliette Gréco",
      "Barbara",
      "Dalida"
    ],
    "reponse": 3
  },
  {
    "id": "q2105",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Nicaragua ?",
    "options": [
      "Dinar serbe",
      "Manat azerbaïdjanais",
      "Cordoba",
      "Livre turque"
    ],
    "reponse": 2
  },
  {
    "id": "q2106",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle est la déesse de l'amour et de la beauté dans la mythologie grecque ?",
    "options": [
      "Héra",
      "Athéna",
      "Aphrodite",
      "Artémis"
    ],
    "reponse": 2
  },
  {
    "id": "q2107",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 60 ?",
    "options": [
      "8",
      "12",
      "9",
      "6"
    ],
    "reponse": 2
  },
  {
    "id": "q2108",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 36 ÷ 4 ?",
    "options": [
      "9",
      "7",
      "10",
      "12"
    ],
    "reponse": 0
  },
  {
    "id": "q2109",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Jamaïque ?",
    "options": [
      "Astana",
      "Kingston",
      "Antananarivo",
      "Bagdad"
    ],
    "reponse": 1
  },
  {
    "id": "q2110",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel écrivain britannique a créé le détective Sherlock Holmes ?",
    "options": [
      "Charles Dickens",
      "Agatha Christie",
      "Arthur Conan Doyle",
      "Oscar Wilde"
    ],
    "reponse": 2
  },
  {
    "id": "q2111",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs sur le terrain compose une équipe de football américain (en attaque ou défense) ?",
    "options": [
      "12",
      "9",
      "10",
      "11"
    ],
    "reponse": 3
  },
  {
    "id": "q2112",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 867 - 858 ?",
    "options": [
      "6",
      "11",
      "9",
      "7"
    ],
    "reponse": 2
  },
  {
    "id": "q2113",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle civilisation précolombienne a bâti le Machu Picchu ?",
    "options": [
      "Les Aztèques",
      "Les Incas",
      "Les Mayas",
      "Les Olmèques"
    ],
    "reponse": 1
  },
  {
    "id": "q2114",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel chanteur français est connu pour « Aline » et « Toute la musique que j'aime » ?",
    "options": [
      "Michel Sardou",
      "Christophe",
      "Julien Clerc",
      "Michel Polnareff"
    ],
    "reponse": 1
  },
  {
    "id": "q2115",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 12 ?",
    "options": [
      "242",
      "219",
      "206",
      "228"
    ],
    "reponse": 3
  },
  {
    "id": "q2116",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 625 ?",
    "options": [
      "28",
      "25",
      "23",
      "30"
    ],
    "reponse": 1
  },
  {
    "id": "q2117",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouzbékistan",
      "Géorgie",
      "Inde",
      "Afghanistan"
    ],
    "reponse": 2
  },
  {
    "id": "q2118",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu romain équivaut à Zeus dans la mythologie grecque ?",
    "options": [
      "Mars",
      "Jupiter",
      "Neptune",
      "Mercure"
    ],
    "reponse": 1
  },
  {
    "id": "q2119",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cs » ?",
    "options": [
      "Fluor",
      "Cadmium",
      "Césium",
      "Manganèse"
    ],
    "reponse": 2
  },
  {
    "id": "q2120",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Norvège ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q2121",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Corée du Nord ?",
    "options": [
      "Naypyidaw",
      "Sarajevo",
      "Pyongyang",
      "Tirana"
    ],
    "reponse": 2
  },
  {
    "id": "q2122",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Pérou ?",
    "options": [
      "🇫🇷",
      "🇩🇪",
      "🇵🇪",
      "🇹🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q2123",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kampala est la capitale de quel pays ?",
    "options": [
      "Ouganda",
      "Moldavie",
      "États-Unis",
      "Allemagne"
    ],
    "reponse": 0
  },
  {
    "id": "q2124",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Moldavie ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q2125",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Japon",
      "Gabon",
      "Espagne",
      "République démocratique du Congo"
    ],
    "reponse": 1
  },
  {
    "id": "q2126",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3720 en chiffres romains ?",
    "options": [
      "MMMDCCXIX",
      "MMMDCCXV",
      "MMMDCCX",
      "MMMDCCXX"
    ],
    "reponse": 3
  },
  {
    "id": "q2127",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « La Métamorphose », où un homme se réveille transformé en insecte ?",
    "options": [
      "Hermann Hesse",
      "Thomas Mann",
      "Franz Kafka",
      "Stefan Zweig"
    ],
    "reponse": 2
  },
  {
    "id": "q2128",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le plus grand mammifère terrestre actuel ?",
    "options": [
      "L'hippopotame",
      "Le rhinocéros",
      "La girafe",
      "L'éléphant d'Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q2129",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Panama ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q2130",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel oiseau tropical très coloré est réputé pour imiter la voix humaine ?",
    "options": [
      "Le flamant rose",
      "Le colibri",
      "Le toucan",
      "Le perroquet"
    ],
    "reponse": 3
  },
  {
    "id": "q2131",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « P » ?",
    "options": [
      "Lanthane",
      "Gallium",
      "Germanium",
      "Phosphore"
    ],
    "reponse": 3
  },
  {
    "id": "q2132",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Damas est la capitale de quel pays ?",
    "options": [
      "Syrie",
      "Inde",
      "Malte",
      "Russie"
    ],
    "reponse": 0
  },
  {
    "id": "q2133",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel pianiste et compositeur américain est célèbre pour ses comédies musicales comme « Rhapsody in Blue » ?",
    "options": [
      "Irving Berlin",
      "Leonard Bernstein",
      "George Gershwin",
      "Cole Porter"
    ],
    "reponse": 2
  },
  {
    "id": "q2134",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de heavy metal britannique a pour chanteur Bruce Dickinson ?",
    "options": [
      "Iron Maiden",
      "Black Sabbath",
      "Deep Purple",
      "Judas Priest"
    ],
    "reponse": 0
  },
  {
    "id": "q2135",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Singapour ?",
    "options": [
      "Singapour",
      "Tirana",
      "Maputo",
      "Yamoussoukro"
    ],
    "reponse": 0
  },
  {
    "id": "q2136",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel dramaturge français a écrit « Phèdre » et « Andromaque » ?",
    "options": [
      "Molière",
      "Pierre Corneille",
      "Jean Racine",
      "Voltaire"
    ],
    "reponse": 2
  },
  {
    "id": "q2137",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 966 + 613 ?",
    "options": [
      "1576",
      "1580",
      "1577",
      "1579"
    ],
    "reponse": 3
  },
  {
    "id": "q2138",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a signé « Le Silence des agneaux » ?",
    "options": [
      "Jonathan Demme",
      "Ridley Scott",
      "Michael Mann",
      "David Fincher"
    ],
    "reponse": 0
  },
  {
    "id": "q2139",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rythme fait jouer les joueurs avec une fausse guitare en plastique ?",
    "options": [
      "Just Dance",
      "SingStar",
      "Rock Band",
      "Guitar Hero"
    ],
    "reponse": 3
  },
  {
    "id": "q2140",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 10 ?",
    "options": [
      "122",
      "121",
      "147",
      "130"
    ],
    "reponse": 3
  },
  {
    "id": "q2141",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 9 ?",
    "options": [
      "57",
      "54",
      "58",
      "47"
    ],
    "reponse": 1
  },
  {
    "id": "q2142",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Forrest Gump ?",
    "options": [
      "Robin Williams",
      "Bill Murray",
      "Kevin Costner",
      "Tom Hanks"
    ],
    "reponse": 3
  },
  {
    "id": "q2143",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film met en scène un cow-boy du Far West confronté à une invasion extraterrestre ?",
    "options": [
      "Jonah Hex",
      "Rango",
      "Cowboys et Envahisseurs",
      "Wild Wild West"
    ],
    "reponse": 2
  },
  {
    "id": "q2144",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Gabon ?",
    "options": [
      "🇨🇮",
      "🇳🇬",
      "🇬🇦",
      "🇰🇼"
    ],
    "reponse": 2
  },
  {
    "id": "q2145",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse est connue pour ses tubes « Halo » et « Single Ladies » ?",
    "options": [
      "Whitney Houston",
      "Beyoncé",
      "Alicia Keys",
      "Rihanna"
    ],
    "reponse": 1
  },
  {
    "id": "q2146",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe britannique a sorti l'album « Abbey Road » ?",
    "options": [
      "The Who",
      "The Rolling Stones",
      "The Beatles",
      "Pink Floyd"
    ],
    "reponse": 2
  },
  {
    "id": "q2147",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vilnius est la capitale de quel pays ?",
    "options": [
      "Argentine",
      "Bangladesh",
      "Lituanie",
      "Singapour"
    ],
    "reponse": 2
  },
  {
    "id": "q2148",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Lettonie ?",
    "options": [
      "🇰🇭",
      "🇱🇻",
      "🇨🇦",
      "🇲🇲"
    ],
    "reponse": 1
  },
  {
    "id": "q2149",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Corée du Sud ?",
    "options": [
      "Rome",
      "Dodoma",
      "Khartoum",
      "Séoul"
    ],
    "reponse": 3
  },
  {
    "id": "q2150",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de rôle en monde ouvert se déroule dans la province fictive de Bordeciel (Skyrim) ?",
    "options": [
      "Dragon Age: Inquisition",
      "The Witcher 3",
      "The Elder Scrolls V: Skyrim",
      "Fallout 4"
    ],
    "reponse": 2
  },
  {
    "id": "q2151",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 19 ?",
    "options": [
      "151",
      "141",
      "126",
      "133"
    ],
    "reponse": 3
  },
  {
    "id": "q2152",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3923 en chiffres romains ?",
    "options": [
      "MMMCMXXII",
      "MMMCMXXV",
      "MMMCMXXIII",
      "MMMCMXXI"
    ],
    "reponse": 2
  },
  {
    "id": "q2153",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Koweït ?",
    "options": [
      "🇪🇹",
      "🇲🇦",
      "🇰🇼",
      "🇰🇷"
    ],
    "reponse": 2
  },
  {
    "id": "q2154",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 300 ÷ 12 ?",
    "options": [
      "20",
      "29",
      "23",
      "25"
    ],
    "reponse": 3
  },
  {
    "id": "q2155",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Malte ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Europe",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q2156",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Technétium ?",
    "options": [
      "Xe",
      "Ba",
      "Tc",
      "S"
    ],
    "reponse": 2
  },
  {
    "id": "q2157",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Qui a été le premier président des États-Unis ?",
    "options": [
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
      "Abraham Lincoln"
    ],
    "reponse": 0
  },
  {
    "id": "q2158",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Congo ?",
    "options": [
      "Roupie népalaise",
      "Franc CFA",
      "Dinar jordanien",
      "Lempira"
    ],
    "reponse": 1
  },
  {
    "id": "q2159",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre italien de la Renaissance a peint le plafond de la chapelle Sixtine ?",
    "options": [
      "Léonard de Vinci",
      "Michel-Ange",
      "Raphaël",
      "Le Titien"
    ],
    "reponse": 1
  },
  {
    "id": "q2160",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est surnommé le « Roi de la pop » ?",
    "options": [
      "Prince",
      "James Brown",
      "Elvis Presley",
      "Michael Jackson"
    ],
    "reponse": 3
  },
  {
    "id": "q2161",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Se » ?",
    "options": [
      "Potassium",
      "Antimoine",
      "Sélénium",
      "Xénon"
    ],
    "reponse": 2
  },
  {
    "id": "q2162",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Italie ?",
    "options": [
      "Helsinki",
      "Suva",
      "Rome",
      "Amman"
    ],
    "reponse": 2
  },
  {
    "id": "q2163",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 100 ?",
    "options": [
      "69",
      "55",
      "60",
      "66"
    ],
    "reponse": 2
  },
  {
    "id": "q2164",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 729 ?",
    "options": [
      "27",
      "31",
      "30",
      "28"
    ],
    "reponse": 0
  },
  {
    "id": "q2165",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Th » ?",
    "options": [
      "Zirconium",
      "Arsenic",
      "Baryum",
      "Thorium"
    ],
    "reponse": 3
  },
  {
    "id": "q2166",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel dessert autrichien est un gâteau au chocolat nappé de confiture d'abricot, originaire de Vienne ?",
    "options": [
      "Le kaiserschmarrn",
      "Le sachertorte",
      "Le linzertorte",
      "Le strudel"
    ],
    "reponse": 1
  },
  {
    "id": "q2167",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Pakistan ?",
    "options": [
      "Islamabad",
      "Alger",
      "Tirana",
      "Tachkent"
    ],
    "reponse": 0
  },
  {
    "id": "q2168",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport les joueurs utilisent-ils un « maillet » ?",
    "options": [
      "Le polo",
      "Le hockey sur gazon",
      "Le croquet",
      "Le golf"
    ],
    "reponse": 0
  },
  {
    "id": "q2169",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le plus long fleuve du monde ?",
    "options": [
      "Le Nil",
      "L'Amazone",
      "Le Yangtsé",
      "Le Mississippi"
    ],
    "reponse": 0
  },
  {
    "id": "q2170",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un jeune sorcier orphelin qui découvre qu'il est célèbre dans le monde de la magie ?",
    "options": [
      "Percy Jackson",
      "Eragon",
      "Harry Potter à l'école des sorciers",
      "Le Monde de Narnia"
    ],
    "reponse": 2
  },
  {
    "id": "q2171",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport de combat porte-t-on un kimono appelé « keikogi » et peut-on frapper avec les pieds et les poings ?",
    "options": [
      "Le judo",
      "Le sumo",
      "L'aïkido",
      "Le karaté"
    ],
    "reponse": 3
  },
  {
    "id": "q2172",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCLXVII en chiffres romains ?",
    "options": [
      "1866",
      "1857",
      "1867",
      "1862"
    ],
    "reponse": 2
  },
  {
    "id": "q2173",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel poète français est l'auteur des « Fleurs du mal » ?",
    "options": [
      "Stéphane Mallarmé",
      "Charles Baudelaire",
      "Paul Verlaine",
      "Arthur Rimbaud"
    ],
    "reponse": 1
  },
  {
    "id": "q2174",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Myanmar ?",
    "options": [
      "Asie",
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q2175",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 399 - 377 ?",
    "options": [
      "23",
      "25",
      "22",
      "21"
    ],
    "reponse": 2
  },
  {
    "id": "q2176",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 43200 s ?",
    "options": [
      "9",
      "10",
      "13",
      "12"
    ],
    "reponse": 3
  },
  {
    "id": "q2177",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Soudan ?",
    "options": [
      "Kampala",
      "Hanoï",
      "Khartoum",
      "Astana"
    ],
    "reponse": 2
  },
  {
    "id": "q2178",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1931 et 1965 ?",
    "options": [
      "38",
      "41",
      "30",
      "34"
    ],
    "reponse": 3
  },
  {
    "id": "q2179",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel géant aux cent bras a aidé Zeus dans sa guerre contre les Titans ?",
    "options": [
      "Briarée",
      "Atlas",
      "Un Cyclope",
      "Prométhée"
    ],
    "reponse": 0
  },
  {
    "id": "q2180",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2984 en chiffres romains ?",
    "options": [
      "MMCMLXXXIV",
      "MMCMLXXXVI",
      "MMCMLXXXIII",
      "MMCMXCIV"
    ],
    "reponse": 0
  },
  {
    "id": "q2181",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1370 et 1376 ?",
    "options": [
      "6",
      "9",
      "3",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q2182",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Éthiopie ?",
    "options": [
      "La Valette",
      "Vilnius",
      "Addis-Abeba",
      "Apia"
    ],
    "reponse": 2
  },
  {
    "id": "q2183",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Venezuela ?",
    "options": [
      "Océanie",
      "Europe",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q2184",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel inventeur est crédité de la création du World Wide Web en 1989 ?",
    "options": [
      "Tim Berners-Lee",
      "Al Gore",
      "Vint Cerf",
      "Marc Andreessen"
    ],
    "reponse": 0
  },
  {
    "id": "q2185",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Biélorussie",
      "Estonie",
      "Kenya",
      "Togo"
    ],
    "reponse": 2
  },
  {
    "id": "q2186",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cadmium ?",
    "options": [
      "Sn",
      "Cd",
      "Th",
      "Ru"
    ],
    "reponse": 1
  },
  {
    "id": "q2187",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur autrichien a écrit « La Flûte enchantée » ?",
    "options": [
      "Wolfgang Amadeus Mozart",
      "Franz Schubert",
      "Joseph Haydn",
      "Ludwig van Beethoven"
    ],
    "reponse": 0
  },
  {
    "id": "q2188",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Dans quel sport d'hiver descend-on une piste glacée sur un traîneau, à plat ventre et tête la première ?",
    "options": [
      "La luge",
      "Le skeleton",
      "Le bobsleigh",
      "Le ski de vitesse"
    ],
    "reponse": 1
  },
  {
    "id": "q2189",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a mis en scène « Le Parrain » ?",
    "options": [
      "Francis Ford Coppola",
      "Brian De Palma",
      "Sidney Lumet",
      "Martin Scorsese"
    ],
    "reponse": 0
  },
  {
    "id": "q2190",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 20 ?",
    "options": [
      "4",
      "6",
      "3",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q2191",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Fer ?",
    "options": [
      "U",
      "Bi",
      "Fe",
      "Ar"
    ],
    "reponse": 2
  },
  {
    "id": "q2192",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3915 en chiffres romains ?",
    "options": [
      "MMMCMXX",
      "MMMCMXV",
      "MMMCMXIII",
      "MMMCMV"
    ],
    "reponse": 1
  },
  {
    "id": "q2193",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Honduras ?",
    "options": [
      "Ariary",
      "Franc rwandais",
      "Lempira",
      "Balboa"
    ],
    "reponse": 2
  },
  {
    "id": "q2194",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3217 en chiffres romains ?",
    "options": [
      "MMMCCXVI",
      "MMMCCXII",
      "MMMCCXV",
      "MMMCCXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q2195",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de mètres fait la distance d'un marathon ?",
    "options": [
      "42,195 km",
      "50 km",
      "40 km",
      "45 km"
    ],
    "reponse": 0
  },
  {
    "id": "q2196",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel est le nom du maillot porté par le leader du classement général du Tour de France ?",
    "options": [
      "Le maillot à pois",
      "Le maillot jaune",
      "Le maillot blanc",
      "Le maillot vert"
    ],
    "reponse": 1
  },
  {
    "id": "q2197",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Costa Rica ?",
    "options": [
      "San José",
      "Athènes",
      "Katmandou",
      "Ottawa"
    ],
    "reponse": 0
  },
  {
    "id": "q2198",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Be » ?",
    "options": [
      "Palladium",
      "Baryum",
      "Plutonium",
      "Béryllium"
    ],
    "reponse": 3
  },
  {
    "id": "q2199",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 858 - 545 ?",
    "options": [
      "313",
      "314",
      "315",
      "311"
    ],
    "reponse": 0
  },
  {
    "id": "q2200",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Côte d'Ivoire ?",
    "options": [
      "Khartoum",
      "Abou Dabi",
      "Yamoussoukro",
      "Kiev"
    ],
    "reponse": 2
  },
  {
    "id": "q2201",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 529 ?",
    "options": [
      "23",
      "20",
      "21",
      "25"
    ],
    "reponse": 0
  },
  {
    "id": "q2202",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien a une tête de chacal et est associé à l'embaumement ?",
    "options": [
      "Anubis",
      "Horus",
      "Osiris",
      "Rê"
    ],
    "reponse": 0
  },
  {
    "id": "q2203",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Moscou est la capitale de quel pays ?",
    "options": [
      "Indonésie",
      "Géorgie",
      "Slovaquie",
      "Russie"
    ],
    "reponse": 3
  },
  {
    "id": "q2204",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 14 ?",
    "options": [
      "167",
      "188",
      "200",
      "182"
    ],
    "reponse": 3
  },
  {
    "id": "q2205",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Suède",
      "Ouzbékistan",
      "Jordanie",
      "Colombie"
    ],
    "reponse": 2
  },
  {
    "id": "q2206",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Nicaragua ?",
    "options": [
      "Pékin",
      "Niamey",
      "Managua",
      "Dublin"
    ],
    "reponse": 2
  },
  {
    "id": "q2207",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 124 + 934 ?",
    "options": [
      "1057",
      "1058",
      "1060",
      "1059"
    ],
    "reponse": 1
  },
  {
    "id": "q2208",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 22 kg ?",
    "options": [
      "20696",
      "20811",
      "22000",
      "25286"
    ],
    "reponse": 2
  },
  {
    "id": "q2209",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Fidji ?",
    "options": [
      "🇫🇯",
      "🇩🇪",
      "🇭🇳",
      "🇸🇳"
    ],
    "reponse": 0
  },
  {
    "id": "q2210",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel naturaliste britannique a développé la théorie de l'évolution par sélection naturelle ?",
    "options": [
      "Alfred Russel Wallace",
      "Charles Darwin",
      "Louis Pasteur",
      "Gregor Mendel"
    ],
    "reponse": 1
  },
  {
    "id": "q2211",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel type de voix masculine est le plus aigu ?",
    "options": [
      "Le ténor",
      "Le baryton",
      "La basse",
      "Le contre-ténor"
    ],
    "reponse": 0
  },
  {
    "id": "q2212",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Belize ?",
    "options": [
      "Dakar",
      "Accra",
      "Belmopan",
      "Reykjavik"
    ],
    "reponse": 2
  },
  {
    "id": "q2213",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument compte généralement 88 touches ?",
    "options": [
      "L'orgue",
      "Le piano",
      "Le clavecin",
      "L'accordéon"
    ],
    "reponse": 1
  },
  {
    "id": "q2214",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel style de musique électronique est né à Chicago dans les années 1980 ?",
    "options": [
      "La techno",
      "La trance",
      "Le dubstep",
      "La house"
    ],
    "reponse": 3
  },
  {
    "id": "q2215",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel événement de 1789 est considéré comme le déclencheur de la Révolution française ?",
    "options": [
      "Le sacre de Napoléon",
      "La fuite à Varennes",
      "La prise de la Bastille",
      "La convocation des États généraux"
    ],
    "reponse": 2
  },
  {
    "id": "q2216",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 481 appartient à quel siècle ?",
    "options": [
      "5e siècle",
      "3e siècle",
      "6e siècle",
      "4e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2217",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Asuncion est la capitale de quel pays ?",
    "options": [
      "Paraguay",
      "Slovénie",
      "Sénégal",
      "Norvège"
    ],
    "reponse": 0
  },
  {
    "id": "q2218",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Sur quel fleuve africain se trouvent les chutes Victoria ?",
    "options": [
      "Le Niger",
      "Le Nil",
      "Le Zambèze",
      "Le Congo"
    ],
    "reponse": 2
  },
  {
    "id": "q2219",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Islande ?",
    "options": [
      "🇸🇳",
      "🇮🇸",
      "🇨🇾",
      "🇲🇽"
    ],
    "reponse": 1
  },
  {
    "id": "q2220",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle diva américaine a interprété la chanson « I Will Always Love You » ?",
    "options": [
      "Celine Dion",
      "Mariah Carey",
      "Whitney Houston",
      "Barbra Streisand"
    ],
    "reponse": 2
  },
  {
    "id": "q2221",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Oslo est la capitale de quel pays ?",
    "options": [
      "Mongolie",
      "Bulgarie",
      "Norvège",
      "Venezuela"
    ],
    "reponse": 2
  },
  {
    "id": "q2222",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Slovaquie ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q2223",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Combien de temps dure en moyenne la gestation d'un éléphant ?",
    "options": [
      "9 mois",
      "12 mois",
      "Environ 22 mois",
      "18 mois"
    ],
    "reponse": 2
  },
  {
    "id": "q2224",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 2 × 3 ?",
    "options": [
      "9",
      "6",
      "7",
      "3"
    ],
    "reponse": 1
  },
  {
    "id": "q2225",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 328 + 482 ?",
    "options": [
      "808",
      "813",
      "807",
      "810"
    ],
    "reponse": 3
  },
  {
    "id": "q2226",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1900 en chiffres romains ?",
    "options": [
      "MDCCCXCV",
      "MCMII",
      "MDCCCXCIX",
      "MCM"
    ],
    "reponse": 3
  },
  {
    "id": "q2227",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Guyana ?",
    "options": [
      "Guarani",
      "Franc congolais",
      "Kwacha zambien",
      "Dollar guyanien"
    ],
    "reponse": 3
  },
  {
    "id": "q2228",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Étain ?",
    "options": [
      "Sn",
      "Ga",
      "Mo",
      "As"
    ],
    "reponse": 0
  },
  {
    "id": "q2229",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Angola",
      "Malte",
      "Islande",
      "Norvège"
    ],
    "reponse": 3
  },
  {
    "id": "q2230",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Abou Dabi est la capitale de quel pays ?",
    "options": [
      "Ukraine",
      "Tunisie",
      "Émirats arabes unis",
      "Kazakhstan"
    ],
    "reponse": 2
  },
  {
    "id": "q2231",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 3600 année(s) ?",
    "options": [
      "30",
      "36",
      "29",
      "43"
    ],
    "reponse": 1
  },
  {
    "id": "q2232",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nicosie est la capitale de quel pays ?",
    "options": [
      "Biélorussie",
      "Honduras",
      "Mexique",
      "Chypre"
    ],
    "reponse": 3
  },
  {
    "id": "q2233",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCDXL en chiffres romains ?",
    "options": [
      "1441",
      "1442",
      "1450",
      "1440"
    ],
    "reponse": 3
  },
  {
    "id": "q2234",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 145 ÷ 5 ?",
    "options": [
      "29",
      "34",
      "27",
      "28"
    ],
    "reponse": 0
  },
  {
    "id": "q2235",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Gabon ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q2236",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel gâteau traditionnel français est dégusté le jour de l'Épiphanie, contenant une fève ?",
    "options": [
      "La galette des rois",
      "Le gâteau des rois provençal",
      "La bûche de Noël",
      "Le kouglof"
    ],
    "reponse": 0
  },
  {
    "id": "q2237",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 816 + 791 ?",
    "options": [
      "1606",
      "1609",
      "1607",
      "1604"
    ],
    "reponse": 2
  },
  {
    "id": "q2238",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel poisson est capable de générer une décharge électrique pour se défendre ou chasser ?",
    "options": [
      "L'anguille électrique",
      "Le barracuda",
      "Le thon",
      "Le poisson-chat"
    ],
    "reponse": 0
  },
  {
    "id": "q2239",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal africain possède le cou le plus long du règne animal ?",
    "options": [
      "L'autruche",
      "La girafe",
      "Le chameau",
      "L'éléphant"
    ],
    "reponse": 1
  },
  {
    "id": "q2240",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 807 + 751 ?",
    "options": [
      "1558",
      "1557",
      "1556",
      "1561"
    ],
    "reponse": 0
  },
  {
    "id": "q2241",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur a écrit les quatre concertos des « Quatre Saisons » ?",
    "options": [
      "Johann Sebastian Bach",
      "Arcangelo Corelli",
      "Antonio Vivaldi",
      "Georg Friedrich Haendel"
    ],
    "reponse": 2
  },
  {
    "id": "q2242",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 24 au carré ?",
    "options": [
      "579",
      "613",
      "605",
      "576"
    ],
    "reponse": 3
  },
  {
    "id": "q2243",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur a créé le personnage du détective Hercule Poirot ?",
    "options": [
      "Georges Simenon",
      "Raymond Chandler",
      "Arthur Conan Doyle",
      "Agatha Christie"
    ],
    "reponse": 3
  },
  {
    "id": "q2244",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 601 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "7e siècle",
      "8e siècle",
      "5e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q2245",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Minsk est la capitale de quel pays ?",
    "options": [
      "Portugal",
      "Bosnie-Herzégovine",
      "Biélorussie",
      "Ouzbékistan"
    ],
    "reponse": 2
  },
  {
    "id": "q2246",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un jeune garçon qui se lie d'amitié avec un dragon nommé Krokmou ?",
    "options": [
      "Le Dragon des mers",
      "Le Roi et l'Oiseau",
      "Dragons",
      "Spirit"
    ],
    "reponse": 2
  },
  {
    "id": "q2247",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Managua est la capitale de quel pays ?",
    "options": [
      "Colombie",
      "Nicaragua",
      "Guatemala",
      "France"
    ],
    "reponse": 1
  },
  {
    "id": "q2248",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Arménie ?",
    "options": [
      "🇦🇲",
      "🇷🇼",
      "🇬🇪",
      "🇪🇹"
    ],
    "reponse": 0
  },
  {
    "id": "q2249",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Suisse ?",
    "options": [
      "Quetzal",
      "Riyal qatari",
      "Shilling ougandais",
      "Franc suisse"
    ],
    "reponse": 3
  },
  {
    "id": "q2250",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel type d'attaque informatique consiste à rendre un service indisponible en le submergeant de requêtes ?",
    "options": [
      "Un rançongiciel",
      "Un hameçonnage",
      "Une attaque par déni de service (DDoS)",
      "Un virus"
    ],
    "reponse": 2
  },
  {
    "id": "q2251",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel fleuve traverse la ville du Caire ?",
    "options": [
      "Le Niger",
      "Le Zambèze",
      "Le Nil",
      "Le Congo"
    ],
    "reponse": 2
  },
  {
    "id": "q2252",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 120 ÷ 15 ?",
    "options": [
      "5",
      "8",
      "9",
      "11"
    ],
    "reponse": 1
  },
  {
    "id": "q2253",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Espagne ?",
    "options": [
      "🇿🇲",
      "🇲🇦",
      "🇪🇸",
      "🇸🇻"
    ],
    "reponse": 2
  },
  {
    "id": "q2254",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année s'est terminée la Seconde Guerre mondiale ?",
    "options": [
      "1943",
      "1944",
      "1946",
      "1945"
    ],
    "reponse": 3
  },
  {
    "id": "q2255",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 583 + 230 ?",
    "options": [
      "815",
      "814",
      "811",
      "813"
    ],
    "reponse": 3
  },
  {
    "id": "q2256",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 36 l ?",
    "options": [
      "34383",
      "32823",
      "35886",
      "36000"
    ],
    "reponse": 3
  },
  {
    "id": "q2257",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Dans quel musée parisien est exposée « La Joconde » ?",
    "options": [
      "Le musée du Louvre",
      "Le musée de l'Orangerie",
      "Le musée d'Orsay",
      "Le Centre Pompidou"
    ],
    "reponse": 0
  },
  {
    "id": "q2258",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bangladesh ?",
    "options": [
      "Taka",
      "Franc suisse",
      "Riyal yéménite",
      "Peso colombien"
    ],
    "reponse": 0
  },
  {
    "id": "q2259",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 12 m ?",
    "options": [
      "1104",
      "1200",
      "1351",
      "1340"
    ],
    "reponse": 1
  },
  {
    "id": "q2260",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1602 et 1610 ?",
    "options": [
      "8",
      "5",
      "10",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q2261",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 192 heure(s) ?",
    "options": [
      "8",
      "7",
      "9",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q2262",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Australie",
      "Madagascar",
      "Guinée",
      "Haïti"
    ],
    "reponse": 2
  },
  {
    "id": "q2263",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du magasin d'applications d'Apple ?",
    "options": [
      "Windows Store",
      "Galaxy Store",
      "App Store",
      "Play Store"
    ],
    "reponse": 2
  },
  {
    "id": "q2264",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 121 - 86 ?",
    "options": [
      "36",
      "34",
      "35",
      "37"
    ],
    "reponse": 2
  },
  {
    "id": "q2265",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Pays-Bas ?",
    "options": [
      "Amsterdam",
      "Katmandou",
      "Riga",
      "Washington"
    ],
    "reponse": 0
  },
  {
    "id": "q2266",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 3 × 15 ?",
    "options": [
      "39",
      "45",
      "42",
      "43"
    ],
    "reponse": 1
  },
  {
    "id": "q2267",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Roumanie ?",
    "options": [
      "Océanie",
      "Europe",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q2268",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel général carthaginois a traversé les Alpes avec des éléphants pour attaquer Rome ?",
    "options": [
      "Jules César",
      "Spartacus",
      "Hannibal",
      "Vercingétorix"
    ],
    "reponse": 2
  },
  {
    "id": "q2269",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 498 + 281 ?",
    "options": [
      "779",
      "782",
      "777",
      "780"
    ],
    "reponse": 0
  },
  {
    "id": "q2270",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des zombies envahissant les États-Unis, suivant un groupe de survivants menés par Rick ?",
    "options": [
      "The Last of Us",
      "Z Nation",
      "The Walking Dead",
      "Fear the Walking Dead"
    ],
    "reponse": 2
  },
  {
    "id": "q2271",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1400 en chiffres romains ?",
    "options": [
      "MCD",
      "MCDV",
      "MCCCXCV",
      "MCCCXCVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q2272",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Laos",
      "Bangladesh",
      "Arabie saoudite",
      "Nouvelle-Zélande"
    ],
    "reponse": 0
  },
  {
    "id": "q2273",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1350 et 1466 ?",
    "options": [
      "115",
      "116",
      "132",
      "100"
    ],
    "reponse": 1
  },
  {
    "id": "q2274",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 142 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "3e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2275",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Éthiopie ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q2276",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 330 année(s) ?",
    "options": [
      "39",
      "33",
      "35",
      "27"
    ],
    "reponse": 1
  },
  {
    "id": "q2277",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de balisage sert de base à la structure des pages web ?",
    "options": [
      "XML",
      "HTML",
      "CSS",
      "JSON"
    ],
    "reponse": 1
  },
  {
    "id": "q2278",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel traité de 1648 a mis fin à la guerre de Trente Ans ?",
    "options": [
      "Le traité de Westphalie",
      "Le traité de Vienne",
      "Le traité d'Utrecht",
      "Le traité de Tordesillas"
    ],
    "reponse": 0
  },
  {
    "id": "q2279",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 456 heure(s) ?",
    "options": [
      "21",
      "15",
      "17",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q2280",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Irak ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q2281",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 347 + 777 ?",
    "options": [
      "1124",
      "1127",
      "1125",
      "1121"
    ],
    "reponse": 0
  },
  {
    "id": "q2282",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 190 ÷ 10 ?",
    "options": [
      "18",
      "21",
      "15",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q2283",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Vanadium ?",
    "options": [
      "Te",
      "V",
      "B",
      "Ru"
    ],
    "reponse": 1
  },
  {
    "id": "q2284",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Rhodium ?",
    "options": [
      "Mg",
      "Rh",
      "Te",
      "Kr"
    ],
    "reponse": 1
  },
  {
    "id": "q2285",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur allemand a écrit la « Marche nuptiale » très jouée lors des mariages ?",
    "options": [
      "Felix Mendelssohn",
      "Johannes Brahms",
      "Richard Wagner",
      "Franz Liszt"
    ],
    "reponse": 0
  },
  {
    "id": "q2286",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCCLXI en chiffres romains ?",
    "options": [
      "361",
      "359",
      "366",
      "371"
    ],
    "reponse": 0
  },
  {
    "id": "q2287",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série britannique met en scène une jeune sorcière maladroite dans une école de magie nommée Cackle's Academy ?",
    "options": [
      "Charmed",
      "A Discovery of Witches",
      "The Worst Witch",
      "Merlin"
    ],
    "reponse": 2
  },
  {
    "id": "q2288",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle et de survie post-apocalyptique met en scène Joel et Ellie ?",
    "options": [
      "State of Decay",
      "Days Gone",
      "The Last of Us",
      "Fallout"
    ],
    "reponse": 2
  },
  {
    "id": "q2289",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie l'acronyme « IA » couramment utilisé en informatique ?",
    "options": [
      "Interaction avancée",
      "Interface automatisée",
      "Information analytique",
      "Intelligence artificielle"
    ],
    "reponse": 3
  },
  {
    "id": "q2290",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle actrice incarne Hermione Granger dans la saga « Harry Potter » ?",
    "options": [
      "Emilia Clarke",
      "Emma Stone",
      "Emma Watson",
      "Emma Roberts"
    ],
    "reponse": 2
  },
  {
    "id": "q2291",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport peut-on gagner par « K.O. » ?",
    "options": [
      "La boxe",
      "Le judo",
      "La lutte",
      "Le karaté"
    ],
    "reponse": 0
  },
  {
    "id": "q2292",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 15 ?",
    "options": [
      "79",
      "72",
      "66",
      "75"
    ],
    "reponse": 3
  },
  {
    "id": "q2293",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 127 + 837 ?",
    "options": [
      "965",
      "967",
      "964",
      "961"
    ],
    "reponse": 2
  },
  {
    "id": "q2294",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec de la guerre est réputé violent et impulsif, contrairement à Athéna plus stratège ?",
    "options": [
      "Arès",
      "Hermès",
      "Apollon",
      "Héphaïstos"
    ],
    "reponse": 0
  },
  {
    "id": "q2295",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Santiago est la capitale de quel pays ?",
    "options": [
      "Zambie",
      "Mauritanie",
      "Ouganda",
      "Chili"
    ],
    "reponse": 3
  },
  {
    "id": "q2296",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Émirats arabes unis ?",
    "options": [
      "Dollar australien",
      "Balboa",
      "Dollar fidjien",
      "Dirham"
    ],
    "reponse": 3
  },
  {
    "id": "q2297",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Po » ?",
    "options": [
      "Plutonium",
      "Chrome",
      "Krypton",
      "Polonium"
    ],
    "reponse": 3
  },
  {
    "id": "q2298",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2610 en chiffres romains ?",
    "options": [
      "MMDCX",
      "MMDCXII",
      "MMDC",
      "MMDCVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q2299",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Macédoine du Nord ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q2300",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 370 ml ?",
    "options": [
      "42",
      "37",
      "35",
      "33"
    ],
    "reponse": 1
  },
  {
    "id": "q2301",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1434 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "15e siècle",
      "14e siècle",
      "13e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q2302",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pologne ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q2303",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1936 et 2015 ?",
    "options": [
      "65",
      "79",
      "88",
      "77"
    ],
    "reponse": 1
  },
  {
    "id": "q2304",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ouzbékistan ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Europe",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2305",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle est la reine des dieux dans la mythologie grecque, épouse et sœur de Zeus ?",
    "options": [
      "Athéna",
      "Héra",
      "Aphrodite",
      "Déméter"
    ],
    "reponse": 1
  },
  {
    "id": "q2306",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 40 ÷ 4 ?",
    "options": [
      "7",
      "12",
      "8",
      "10"
    ],
    "reponse": 3
  },
  {
    "id": "q2307",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Calcium ?",
    "options": [
      "Ar",
      "Ca",
      "Be",
      "Zr"
    ],
    "reponse": 1
  },
  {
    "id": "q2308",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 au carré ?",
    "options": [
      "66",
      "64",
      "72",
      "59"
    ],
    "reponse": 1
  },
  {
    "id": "q2309",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Lituanie ?",
    "options": [
      "Niamey",
      "Reykjavik",
      "Vilnius",
      "Belgrade"
    ],
    "reponse": 2
  },
  {
    "id": "q2310",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Inde ?",
    "options": [
      "🇲🇰",
      "🇲🇽",
      "🇬🇹",
      "🇮🇳"
    ],
    "reponse": 3
  },
  {
    "id": "q2311",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Riga est la capitale de quel pays ?",
    "options": [
      "Lettonie",
      "Paraguay",
      "Arménie",
      "Namibie"
    ],
    "reponse": 0
  },
  {
    "id": "q2312",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel style musical est né à la Jamaïque dans les années 1960, popularisé par Bob Marley ?",
    "options": [
      "Le calypso",
      "Le ska",
      "Le reggae",
      "Le blues"
    ],
    "reponse": 2
  },
  {
    "id": "q2313",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mongolie ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2314",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Au » ?",
    "options": [
      "Néon",
      "Or",
      "Cuivre",
      "Magnésium"
    ],
    "reponse": 1
  },
  {
    "id": "q2315",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Biélorussie",
      "Qatar",
      "Sénégal",
      "Singapour"
    ],
    "reponse": 0
  },
  {
    "id": "q2316",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel scientifique français a mis au point la pasteurisation et le vaccin contre la rage ?",
    "options": [
      "Louis Pasteur",
      "Antoine Lavoisier",
      "Marie Curie",
      "Claude Bernard"
    ],
    "reponse": 0
  },
  {
    "id": "q2317",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Phnom Penh est la capitale de quel pays ?",
    "options": [
      "Mongolie",
      "Botswana",
      "Cambodge",
      "Laos"
    ],
    "reponse": 2
  },
  {
    "id": "q2318",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un boxeur qui affronte Apollo Creed pour devenir champion ?",
    "options": [
      "Rocky",
      "Million Dollar Baby",
      "Creed",
      "Raging Bull"
    ],
    "reponse": 0
  },
  {
    "id": "q2319",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Guatemala",
      "Chine",
      "Bangladesh",
      "Vietnam"
    ],
    "reponse": 3
  },
  {
    "id": "q2320",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Athènes est la capitale de quel pays ?",
    "options": [
      "Grèce",
      "Burkina Faso",
      "Japon",
      "Malaisie"
    ],
    "reponse": 0
  },
  {
    "id": "q2321",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 38 siècle(s) ?",
    "options": [
      "4013",
      "3884",
      "3800",
      "4081"
    ],
    "reponse": 2
  },
  {
    "id": "q2322",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Colombie ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q2323",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « K » ?",
    "options": [
      "Potassium",
      "Cuivre",
      "Tungstène",
      "Azote"
    ],
    "reponse": 0
  },
  {
    "id": "q2324",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 575 - 419 ?",
    "options": [
      "157",
      "156",
      "159",
      "154"
    ],
    "reponse": 1
  },
  {
    "id": "q2325",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle sauce française à base de jaune d'œuf et de beurre accompagne souvent les asperges ou le poisson ?",
    "options": [
      "La sauce béchamel",
      "La sauce mornay",
      "La sauce béarnaise",
      "La sauce hollandaise"
    ],
    "reponse": 3
  },
  {
    "id": "q2326",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République démocratique du Congo ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q2327",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 5 ?",
    "options": [
      "44",
      "45",
      "47",
      "38"
    ],
    "reponse": 1
  },
  {
    "id": "q2328",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat grec est composé de couches d'aubergines, de viande hachée et de béchamel gratinées ?",
    "options": [
      "La feta grillée",
      "La moussaka",
      "Les souvlakis",
      "Le tzatziki"
    ],
    "reponse": 1
  },
  {
    "id": "q2329",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock progressif britannique est connu pour l'album « The Wall » ?",
    "options": [
      "Rush",
      "Yes",
      "Genesis",
      "Pink Floyd"
    ],
    "reponse": 3
  },
  {
    "id": "q2330",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Australie ?",
    "options": [
      "Asie",
      "Océanie",
      "Europe",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q2331",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Manille est la capitale de quel pays ?",
    "options": [
      "Vietnam",
      "Fidji",
      "Philippines",
      "Algérie"
    ],
    "reponse": 2
  },
  {
    "id": "q2332",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Algérie ?",
    "options": [
      "Couronne danoise",
      "Leu roumain",
      "Dinar algérien",
      "Won nord-coréen"
    ],
    "reponse": 2
  },
  {
    "id": "q2333",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Niger ?",
    "options": [
      "Franc CFA",
      "Guarani",
      "Shilling kényan",
      "Livre turque"
    ],
    "reponse": 0
  },
  {
    "id": "q2334",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel fromage français est traditionnellement moulé en forme de cœur ou de losange, originaire de Normandie ?",
    "options": [
      "Le Neufchâtel",
      "Le Camembert",
      "Le Livarot",
      "Le Pont-l'Évêque"
    ],
    "reponse": 0
  },
  {
    "id": "q2335",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Ghana ?",
    "options": [
      "Cedi",
      "Peso cubain",
      "Tenge",
      "Livre sterling"
    ],
    "reponse": 0
  },
  {
    "id": "q2336",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 80 ?",
    "options": [
      "51",
      "46",
      "48",
      "43"
    ],
    "reponse": 2
  },
  {
    "id": "q2337",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1713 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "18e siècle",
      "19e siècle",
      "17e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q2338",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2095 appartient à quel siècle ?",
    "options": [
      "19e siècle",
      "22e siècle",
      "20e siècle",
      "21e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2339",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport dit-on qu'un joueur a réalisé un « triple double » ?",
    "options": [
      "Le football américain",
      "Le basket-ball",
      "Le volley-ball",
      "Le baseball"
    ],
    "reponse": 1
  },
  {
    "id": "q2340",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Cameroun ?",
    "options": [
      "Oslo",
      "Yaoundé",
      "Tokyo",
      "Port-au-Prince"
    ],
    "reponse": 1
  },
  {
    "id": "q2341",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète et écrivain français du Moyen Âge a écrit « La Ballade des pendus » ?",
    "options": [
      "Charles d'Orléans",
      "Christine de Pizan",
      "Rutebeuf",
      "François Villon"
    ],
    "reponse": 3
  },
  {
    "id": "q2342",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇶🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Cambodge",
      "Malte",
      "Qatar",
      "Haïti"
    ],
    "reponse": 2
  },
  {
    "id": "q2343",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Chine ?",
    "options": [
      "Madrid",
      "Budapest",
      "Santiago",
      "Pékin"
    ],
    "reponse": 3
  },
  {
    "id": "q2344",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un naufragé nommé Chuck Noland livré à lui-même sur une île ?",
    "options": [
      "Cast Away",
      "Seul au monde",
      "Robinson Crusoé",
      "The Beach"
    ],
    "reponse": 1
  },
  {
    "id": "q2345",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel groupe britannique des années 90 est connu pour la rivalité avec Oasis, avec les tubes « Common People » ?",
    "options": [
      "Blur",
      "Pulp",
      "The Verve",
      "Suede"
    ],
    "reponse": 1
  },
  {
    "id": "q2346",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lomé est la capitale de quel pays ?",
    "options": [
      "Togo",
      "Mongolie",
      "Équateur",
      "Uruguay"
    ],
    "reponse": 0
  },
  {
    "id": "q2347",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Myanmar ?",
    "options": [
      "Sol péruvien",
      "Dollar de Singapour",
      "Denar macédonien",
      "Kyat"
    ],
    "reponse": 3
  },
  {
    "id": "q2348",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Maroc ?",
    "options": [
      "🇦🇺",
      "🇲🇦",
      "🇳🇿",
      "🇬🇹"
    ],
    "reponse": 1
  },
  {
    "id": "q2349",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mg dans 14 g ?",
    "options": [
      "11719",
      "12413",
      "14000",
      "12266"
    ],
    "reponse": 2
  },
  {
    "id": "q2350",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle romancière britannique du XIXe siècle a écrit « Orgueil et Préjugés » ?",
    "options": [
      "Charlotte Brontë",
      "George Eliot",
      "Jane Austen",
      "Emily Brontë"
    ],
    "reponse": 2
  },
  {
    "id": "q2351",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Biélorussie ?",
    "options": [
      "Shilling kényan",
      "Dollar canadien",
      "Dollar américain",
      "Rouble biélorusse"
    ],
    "reponse": 3
  },
  {
    "id": "q2352",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quelle est la principale nourriture du panda géant ?",
    "options": [
      "Le poisson",
      "Les feuilles d'eucalyptus",
      "Les fruits",
      "Le bambou"
    ],
    "reponse": 3
  },
  {
    "id": "q2353",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 5000 mm ?",
    "options": [
      "5",
      "7",
      "8",
      "3"
    ],
    "reponse": 0
  },
  {
    "id": "q2354",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 × 7 ?",
    "options": [
      "19",
      "20",
      "21",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q2355",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel physicien danois a proposé un modèle de l'atome avec des électrons en orbites ?",
    "options": [
      "Werner Heisenberg",
      "Erwin Schrödinger",
      "Niels Bohr",
      "Max Planck"
    ],
    "reponse": 2
  },
  {
    "id": "q2356",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Zimbabwe ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q2357",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Finlande",
      "Honduras",
      "Laos",
      "Madagascar"
    ],
    "reponse": 0
  },
  {
    "id": "q2358",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Allemagne ?",
    "options": [
      "Couronne danoise",
      "Ariary",
      "Euro",
      "Bolivar"
    ],
    "reponse": 2
  },
  {
    "id": "q2359",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport hivernal se pratique en glissant sur une piste avec des pierres et des balais ?",
    "options": [
      "Le patinage de vitesse",
      "Le skeleton",
      "Le bobsleigh",
      "Le curling"
    ],
    "reponse": 3
  },
  {
    "id": "q2360",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cr » ?",
    "options": [
      "Germanium",
      "Chrome",
      "Hélium",
      "Cobalt"
    ],
    "reponse": 1
  },
  {
    "id": "q2361",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport utilise-t-on le terme « ace » pour un service gagnant direct ?",
    "options": [
      "Le badminton",
      "Le squash",
      "Le tennis",
      "Le volley-ball"
    ],
    "reponse": 2
  },
  {
    "id": "q2362",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a créé le système d'exploitation Windows ?",
    "options": [
      "Google",
      "Apple",
      "Microsoft",
      "IBM"
    ],
    "reponse": 2
  },
  {
    "id": "q2363",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Cambodge ?",
    "options": [
      "🇧🇾",
      "🇧🇩",
      "🇰🇭",
      "🇾🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q2364",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ljubljana est la capitale de quel pays ?",
    "options": [
      "Chypre",
      "Suriname",
      "Slovénie",
      "Vanuatu"
    ],
    "reponse": 2
  },
  {
    "id": "q2365",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de stratégie en temps réel oppose Zergs, Protoss et Terrans ?",
    "options": [
      "Warcraft",
      "Age of Empires",
      "StarCraft",
      "Command & Conquer"
    ],
    "reponse": 2
  },
  {
    "id": "q2366",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Nouvelle-Zélande ?",
    "options": [
      "🇰🇼",
      "🇮🇶",
      "🇳🇿",
      "🇱🇧"
    ],
    "reponse": 2
  },
  {
    "id": "q2367",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Qatar ?",
    "options": [
      "🇶🇦",
      "🇲🇷",
      "🇸🇾",
      "🇺🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q2368",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1539 en chiffres romains ?",
    "options": [
      "MDXL",
      "MDXXXIX",
      "MDXLIV",
      "MDXLI"
    ],
    "reponse": 1
  },
  {
    "id": "q2369",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène une famille royale britannique à travers les décennies ?",
    "options": [
      "Bridgerton",
      "Downton Abbey",
      "Victoria",
      "The Crown"
    ],
    "reponse": 3
  },
  {
    "id": "q2370",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel philosophe grec a été le précepteur d'Alexandre le Grand ?",
    "options": [
      "Platon",
      "Pythagore",
      "Socrate",
      "Aristote"
    ],
    "reponse": 3
  },
  {
    "id": "q2371",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Pays-Bas",
      "Myanmar",
      "Suriname",
      "Monténégro"
    ],
    "reponse": 2
  },
  {
    "id": "q2372",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCXLVIII en chiffres romains ?",
    "options": [
      "2738",
      "2747",
      "2749",
      "2748"
    ],
    "reponse": 3
  },
  {
    "id": "q2373",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des États-Unis ?",
    "options": [
      "Washington",
      "Athènes",
      "Oulan-Bator",
      "Lusaka"
    ],
    "reponse": 0
  },
  {
    "id": "q2374",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCDLXV en chiffres romains ?",
    "options": [
      "3460",
      "3467",
      "3470",
      "3465"
    ],
    "reponse": 3
  },
  {
    "id": "q2375",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 96 heure(s) ?",
    "options": [
      "1",
      "6",
      "4",
      "7"
    ],
    "reponse": 2
  },
  {
    "id": "q2376",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bakou est la capitale de quel pays ?",
    "options": [
      "Équateur",
      "Azerbaïdjan",
      "États-Unis",
      "Slovénie"
    ],
    "reponse": 1
  },
  {
    "id": "q2377",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1224 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "12e siècle",
      "13e siècle",
      "11e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2378",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays abrite la ville sainte de La Mecque ?",
    "options": [
      "La Jordanie",
      "Les Émirats arabes unis",
      "L'Arabie saoudite",
      "L'Irak"
    ],
    "reponse": 2
  },
  {
    "id": "q2379",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 18 ?",
    "options": [
      "82",
      "96",
      "91",
      "90"
    ],
    "reponse": 3
  },
  {
    "id": "q2380",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Guyana ?",
    "options": [
      "Londres",
      "Madrid",
      "Georgetown",
      "Copenhague"
    ],
    "reponse": 2
  },
  {
    "id": "q2381",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Irlande ?",
    "options": [
      "Vilnius",
      "Berne",
      "Dublin",
      "Tunis"
    ],
    "reponse": 2
  },
  {
    "id": "q2382",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays organise traditionnellement le tournoi de tennis de Roland-Garros ?",
    "options": [
      "La France",
      "Les États-Unis",
      "Le Royaume-Uni",
      "L'Australie"
    ],
    "reponse": 0
  },
  {
    "id": "q2383",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien y a-t-il d'os dans le corps humain adulte ?",
    "options": [
      "186",
      "206",
      "216",
      "196"
    ],
    "reponse": 1
  },
  {
    "id": "q2384",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel processus permet aux plantes de produire leur propre énergie à partir de la lumière ?",
    "options": [
      "La fermentation",
      "La photosynthèse",
      "La transpiration",
      "La respiration"
    ],
    "reponse": 1
  },
  {
    "id": "q2385",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCDLX en chiffres romains ?",
    "options": [
      "3461",
      "3460",
      "3450",
      "3462"
    ],
    "reponse": 1
  },
  {
    "id": "q2386",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur britannique a écrit « Le Portrait de Dorian Gray » ?",
    "options": [
      "George Bernard Shaw",
      "Thomas Hardy",
      "Oscar Wilde",
      "Robert Louis Stevenson"
    ],
    "reponse": 2
  },
  {
    "id": "q2387",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 39 h ?",
    "options": [
      "2155",
      "2340",
      "2390",
      "2174"
    ],
    "reponse": 1
  },
  {
    "id": "q2388",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de programmation est symbolisé par un logo représentant un serpent ?",
    "options": [
      "Perl",
      "PHP",
      "Ruby",
      "Python"
    ],
    "reponse": 3
  },
  {
    "id": "q2389",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est réputé invulnérable sauf au talon ?",
    "options": [
      "Hector",
      "Ajax",
      "Ulysse",
      "Achille"
    ],
    "reponse": 3
  },
  {
    "id": "q2390",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Tunisie ?",
    "options": [
      "Montevideo",
      "Bakou",
      "Guatemala",
      "Tunis"
    ],
    "reponse": 3
  },
  {
    "id": "q2391",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Jamaïque ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q2392",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Belize ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q2393",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays européen est constitué de plus de 1400 îles et est traversé par de nombreux fjords ?",
    "options": [
      "La Norvège",
      "La Grèce",
      "La Croatie",
      "Le Danemark"
    ],
    "reponse": 0
  },
  {
    "id": "q2394",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « VPN » ?",
    "options": [
      "Virtual Public Node",
      "Verified Public Network",
      "Virtual Private Network",
      "Visual Private Node"
    ],
    "reponse": 2
  }
];
