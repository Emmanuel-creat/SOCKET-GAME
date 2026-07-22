/**
 * ============================================================================
 *  BANQUE DE QUESTIONS DU QUIZ (mise à jour n°2 — davantage de questions)
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
 *  - Évitez qu'un mot de la bonne réponse apparaisse déjà dans l'énoncé de la
 *    question (ex. ne pas écrire « ... la machine de Turing ?» si la réponse
 *    est « Alan Turing ») : cela révèle la réponse au lieu de la faire deviner.
 *
 *  CATÉGORIES ACTUELLEMENT UTILISÉES (15 au total)
 *  ----------------------------------------------------------------------
 *  Capitales, Cinéma, Culture générale, Drapeaux, Géographie, Histoire, Informatique, Jeux vidéo & Séries, Littérature, Mathématiques, Musique, Mythologie, Nature & Animaux, Sciences, Sport
 *
 *  Total actuel : 3422 questions.
 * ============================================================================
 */

export const QUESTIONS = [
  {
    "id": "q0001",
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
    "id": "q0002",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Albanie ?",
    "options": [
      "🇲🇾",
      "🇩🇿",
      "🇰🇬",
      "🇦🇱"
    ],
    "reponse": 3
  },
  {
    "id": "q0003",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 6 ?",
    "options": [
      "91",
      "87",
      "89",
      "84"
    ],
    "reponse": 3
  },
  {
    "id": "q0004",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 4 ?",
    "options": [
      "32",
      "26",
      "35",
      "36"
    ],
    "reponse": 0
  },
  {
    "id": "q0005",
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
    "id": "q0006",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle fontaine baroque de Rome est réputée pour la tradition d'y jeter une pièce par-dessus l'épaule ?",
    "options": [
      "La fontaine des Quatre-Fleuves",
      "La fontaine de Trevi",
      "La fontaine de Neptune",
      "La Barcaccia"
    ],
    "reponse": 1
  },
  {
    "id": "q0007",
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
    "id": "q0008",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse grecque de la chasse et de la lune ?",
    "options": [
      "Déméter",
      "Athéna",
      "Héra",
      "Artémis"
    ],
    "reponse": 3
  },
  {
    "id": "q0009",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 5 m ?",
    "options": [
      "5333",
      "5000",
      "4737",
      "5766"
    ],
    "reponse": 1
  },
  {
    "id": "q0010",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Guatemala ?",
    "options": [
      "🇵🇭",
      "🇬🇳",
      "🇸🇱",
      "🇬🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q0011",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Italie",
      "Gabon",
      "Bulgarie",
      "Honduras"
    ],
    "reponse": 1
  },
  {
    "id": "q0012",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Zimbabwe ?",
    "options": [
      "Ariary",
      "Dollar zimbabwéen",
      "Dinar bahreïni",
      "Dollar guyanien"
    ],
    "reponse": 1
  },
  {
    "id": "q0013",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2336 en chiffres romains ?",
    "options": [
      "MMCCCXLVI",
      "MMCCCXLI",
      "MMCCCXXXVI",
      "MMCCCXXXIV"
    ],
    "reponse": 2
  },
  {
    "id": "q0014",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle tradition antique grecque est reproduite avant chaque édition des Jeux olympiques modernes, avec un départ à Olympie ?",
    "options": [
      "Le relais de la flamme olympique",
      "Le défilé des nations",
      "La cérémonie d'ouverture",
      "Le serment olympique"
    ],
    "reponse": 0
  },
  {
    "id": "q0015",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec du vin et des festivités est aussi associé au théâtre ?",
    "options": [
      "Hermès",
      "Dionysos",
      "Pan",
      "Apollon"
    ],
    "reponse": 1
  },
  {
    "id": "q0016",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3252 en chiffres romains ?",
    "options": [
      "MMMCCLI",
      "MMMCCLIV",
      "MMMCCLII",
      "MMMCCLVII"
    ],
    "reponse": 2
  },
  {
    "id": "q0017",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1490 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "16e siècle",
      "15e siècle",
      "13e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0018",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 - 34 ?",
    "options": [
      "54",
      "53",
      "55",
      "56"
    ],
    "reponse": 3
  },
  {
    "id": "q0019",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Combien de cœurs possède une pieuvre ?",
    "options": [
      "3",
      "2",
      "4",
      "1"
    ],
    "reponse": 0
  },
  {
    "id": "q0020",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Japon",
      "Fidji",
      "Thaïlande",
      "Azerbaïdjan"
    ],
    "reponse": 0
  },
  {
    "id": "q0021",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXCII en chiffres romains ?",
    "options": [
      "3282",
      "3292",
      "3294",
      "3290"
    ],
    "reponse": 1
  },
  {
    "id": "q0022",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel roman d'Ernest Hemingway se déroule pendant la guerre civile espagnole et suit un dynamiteur américain ?",
    "options": [
      "Le Soleil se lève aussi",
      "En avoir ou pas",
      "Pour qui sonne le glas",
      "L'Adieu aux armes"
    ],
    "reponse": 2
  },
  {
    "id": "q0023",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 19 kg ?",
    "options": [
      "16930",
      "16372",
      "19000",
      "21748"
    ],
    "reponse": 2
  },
  {
    "id": "q0024",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Indonésie ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0025",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de course automobile met en scène des personnages Nintendo sur des karts ?",
    "options": [
      "Mario Kart",
      "Crash Team Racing",
      "Sonic & All-Stars Racing",
      "Diddy Kong Racing"
    ],
    "reponse": 0
  },
  {
    "id": "q0026",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 89 + 189 ?",
    "options": [
      "278",
      "280",
      "276",
      "277"
    ],
    "reponse": 0
  },
  {
    "id": "q0027",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Ghana ?",
    "options": [
      "Accra",
      "Sofia",
      "Riga",
      "Bagdad"
    ],
    "reponse": 0
  },
  {
    "id": "q0028",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 120 ÷ 15 ?",
    "options": [
      "8",
      "7",
      "11",
      "6"
    ],
    "reponse": 0
  },
  {
    "id": "q0029",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 8 ?",
    "options": [
      "52",
      "43",
      "48",
      "51"
    ],
    "reponse": 2
  },
  {
    "id": "q0030",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a inventé le judo ?",
    "options": [
      "La Corée",
      "La Chine",
      "Le Japon",
      "La Thaïlande"
    ],
    "reponse": 2
  },
  {
    "id": "q0031",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Europium ?",
    "options": [
      "Ho",
      "Ge",
      "Eu",
      "Zn"
    ],
    "reponse": 2
  },
  {
    "id": "q0032",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1737 en chiffres romains ?",
    "options": [
      "MDCCXLII",
      "MDCCXXXVIII",
      "MDCCXXXVII",
      "MDCCXXXVI"
    ],
    "reponse": 2
  },
  {
    "id": "q0033",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays est célèbre pour ses geysers et ses volcans, surnommé « terre de glace et de feu » ?",
    "options": [
      "La Norvège",
      "La Finlande",
      "L'Islande",
      "Le Groenland"
    ],
    "reponse": 2
  },
  {
    "id": "q0034",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien à tête d'ibis est associé à l'écriture et à la sagesse ?",
    "options": [
      "Khnoum",
      "Anubis",
      "Horus",
      "Thot"
    ],
    "reponse": 3
  },
  {
    "id": "q0035",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCLXVI en chiffres romains ?",
    "options": [
      "3864",
      "3856",
      "3866",
      "3865"
    ],
    "reponse": 2
  },
  {
    "id": "q0036",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Argentine",
      "Jamaïque",
      "Lesotho",
      "République tchèque"
    ],
    "reponse": 0
  },
  {
    "id": "q0037",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Émirats arabes unis ?",
    "options": [
      "Freetown",
      "Tunis",
      "Abou Dabi",
      "Dacca"
    ],
    "reponse": 2
  },
  {
    "id": "q0038",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur français est l'auteur du « Boléro », pièce orchestrale répétitive très célèbre ?",
    "options": [
      "Erik Satie",
      "Camille Saint-Saëns",
      "Maurice Ravel",
      "Claude Debussy"
    ],
    "reponse": 2
  },
  {
    "id": "q0039",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a créé le jeu vidéo « Pong » en 1972 ?",
    "options": [
      "Nintendo",
      "Namco",
      "Sega",
      "Atari"
    ],
    "reponse": 3
  },
  {
    "id": "q0040",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 77 jour(s) ?",
    "options": [
      "11",
      "8",
      "13",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q0041",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tallinn est la capitale de quel pays ?",
    "options": [
      "Kazakhstan",
      "Estonie",
      "Mongolie",
      "Malaisie"
    ],
    "reponse": 1
  },
  {
    "id": "q0042",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « U » ?",
    "options": [
      "Uranium",
      "Gallium",
      "Chlore",
      "Cobalt"
    ],
    "reponse": 0
  },
  {
    "id": "q0043",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film d'Orson Welles, souvent cité parmi les plus grands de l'histoire du cinéma, retrace la vie d'un magnat de la presse ?",
    "options": [
      "Citizen Kane",
      "Vertigo",
      "Sunset Boulevard",
      "Rebecca"
    ],
    "reponse": 0
  },
  {
    "id": "q0044",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros a tué la Méduse dans la mythologie grecque ?",
    "options": [
      "Héraclès",
      "Jason",
      "Thésée",
      "Persée"
    ],
    "reponse": 3
  },
  {
    "id": "q0045",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCXIV en chiffres romains ?",
    "options": [
      "2713",
      "2712",
      "2714",
      "2704"
    ],
    "reponse": 2
  },
  {
    "id": "q0046",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1023 et 1083 ?",
    "options": [
      "57",
      "58",
      "72",
      "60"
    ],
    "reponse": 3
  },
  {
    "id": "q0047",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel événement de 1453 a marqué la chute de l'Empire byzantin face aux Ottomans ?",
    "options": [
      "La prise de Constantinople",
      "La prise de Jérusalem",
      "Le sac de Rome",
      "La chute de Grenade"
    ],
    "reponse": 0
  },
  {
    "id": "q0048",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 29000 mg ?",
    "options": [
      "30",
      "33",
      "31",
      "29"
    ],
    "reponse": 3
  },
  {
    "id": "q0049",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "San José est la capitale de quel pays ?",
    "options": [
      "Guinée équatoriale",
      "Arabie saoudite",
      "Côte d'Ivoire",
      "Costa Rica"
    ],
    "reponse": 3
  },
  {
    "id": "q0050",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Croatie",
      "Belgique",
      "Nicaragua",
      "Monténégro"
    ],
    "reponse": 2
  },
  {
    "id": "q0051",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain russe est l'auteur de « Guerre et Paix » ?",
    "options": [
      "Anton Tchekhov",
      "Nicolas Gogol",
      "Léon Tolstoï",
      "Fiodor Dostoïevski"
    ],
    "reponse": 2
  },
  {
    "id": "q0052",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Honduras ?",
    "options": [
      "🇸🇪",
      "🇭🇳",
      "🇬🇾",
      "🇦🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q0053",
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
    "id": "q0054",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat espagnol à base de riz safrané est souvent garni de fruits de mer ou de poulet ?",
    "options": [
      "La tortilla",
      "Le gazpacho",
      "Le jambon serrano",
      "La paella"
    ],
    "reponse": 3
  },
  {
    "id": "q0055",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 719 - 78 ?",
    "options": [
      "639",
      "644",
      "641",
      "643"
    ],
    "reponse": 2
  },
  {
    "id": "q0056",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3481 en chiffres romains ?",
    "options": [
      "MMMCDLXXXII",
      "MMMCDLXXVI",
      "MMMCDLXXXI",
      "MMMCDLXXXIII"
    ],
    "reponse": 2
  },
  {
    "id": "q0057",
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
    "id": "q0058",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCXXV en chiffres romains ?",
    "options": [
      "2225",
      "2224",
      "2223",
      "2230"
    ],
    "reponse": 0
  },
  {
    "id": "q0059",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « V » ?",
    "options": [
      "Azote",
      "Xénon",
      "Argon",
      "Vanadium"
    ],
    "reponse": 3
  },
  {
    "id": "q0060",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Wellington est la capitale de quel pays ?",
    "options": [
      "Jordanie",
      "Nouvelle-Zélande",
      "Comores",
      "Pakistan"
    ],
    "reponse": 1
  },
  {
    "id": "q0061",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 15 t ?",
    "options": [
      "15000",
      "15477",
      "12528",
      "16318"
    ],
    "reponse": 0
  },
  {
    "id": "q0062",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Islande ?",
    "options": [
      "🇲🇿",
      "🇩🇯",
      "🇲🇩",
      "🇮🇸"
    ],
    "reponse": 3
  },
  {
    "id": "q0063",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom du langage de requête utilisé pour interroger les bases de données ?",
    "options": [
      "XML",
      "SQL",
      "HTML",
      "JSON"
    ],
    "reponse": 1
  },
  {
    "id": "q0064",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Allemagne ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0065",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3587 en chiffres romains ?",
    "options": [
      "MMMDXCII",
      "MMMDLXXXII",
      "MMMDLXXXVIII",
      "MMMDLXXXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q0066",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Eswatini ?",
    "options": [
      "Harare",
      "Mbabane",
      "Abou Dabi",
      "Buenos Aires"
    ],
    "reponse": 1
  },
  {
    "id": "q0067",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bahreïn ?",
    "options": [
      "Londres",
      "Phnom Penh",
      "Manama",
      "Tallinn"
    ],
    "reponse": 2
  },
  {
    "id": "q0068",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type de jumeaux se développe à partir de deux ovules fécondés séparément ?",
    "options": [
      "Les jumeaux chimériques",
      "Les vrais jumeaux (monozygotes)",
      "Les jumeaux siamois",
      "Les faux jumeaux (dizygotes)"
    ],
    "reponse": 3
  },
  {
    "id": "q0069",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 20 ?",
    "options": [
      "-1",
      "3",
      "0",
      "1"
    ],
    "reponse": 3
  },
  {
    "id": "q0070",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cm » ?",
    "options": [
      "Holmium",
      "Lithium",
      "Curium",
      "Plomb"
    ],
    "reponse": 2
  },
  {
    "id": "q0071",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel mouvement sportif international permet aux athlètes en situation de handicap de concourir au plus haut niveau ?",
    "options": [
      "Les Jeux paralympiques",
      "Les Jeux mondiaux militaires",
      "Les Jeux du Commonwealth",
      "Les Special Olympics"
    ],
    "reponse": 0
  },
  {
    "id": "q0072",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Brunei ?",
    "options": [
      "🇧🇳",
      "🇱🇦",
      "🇱🇹",
      "🇩🇯"
    ],
    "reponse": 0
  },
  {
    "id": "q0073",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Italie ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q0074",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 964 + 500 ?",
    "options": [
      "1462",
      "1465",
      "1463",
      "1464"
    ],
    "reponse": 3
  },
  {
    "id": "q0075",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Curium ?",
    "options": [
      "Xe",
      "Au",
      "Cm",
      "P"
    ],
    "reponse": 2
  },
  {
    "id": "q0076",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kenya ?",
    "options": [
      "Nairobi",
      "Tbilissi",
      "Kuala Lumpur",
      "Belmopan"
    ],
    "reponse": 0
  },
  {
    "id": "q0077",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 4 ?",
    "options": [
      "24",
      "20",
      "18",
      "17"
    ],
    "reponse": 1
  },
  {
    "id": "q0078",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle danse et musique espagnole, originaire d'Andalousie, se caractérise par des claquements de mains et des talons frappés au sol ?",
    "options": [
      "La jota",
      "Le paso doble",
      "La sardane",
      "Le flamenco"
    ],
    "reponse": 3
  },
  {
    "id": "q0079",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Iridium ?",
    "options": [
      "Tb",
      "Y",
      "Ir",
      "U"
    ],
    "reponse": 2
  },
  {
    "id": "q0080",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bogota est la capitale de quel pays ?",
    "options": [
      "Mauritanie",
      "Kosovo",
      "Japon",
      "Colombie"
    ],
    "reponse": 3
  },
  {
    "id": "q0081",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel roi mythique a reçu le don de transformer en or tout ce qu'il touchait ?",
    "options": [
      "Midas",
      "Sisyphe",
      "Crésus",
      "Tantale"
    ],
    "reponse": 0
  },
  {
    "id": "q0082",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Namibie",
      "Samoa",
      "Kenya",
      "Paraguay"
    ],
    "reponse": 3
  },
  {
    "id": "q0083",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ca » ?",
    "options": [
      "Hélium",
      "Calcium",
      "Polonium",
      "Silicium"
    ],
    "reponse": 1
  },
  {
    "id": "q0084",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mg dans 22 g ?",
    "options": [
      "24717",
      "23410",
      "25591",
      "22000"
    ],
    "reponse": 3
  },
  {
    "id": "q0085",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cu » ?",
    "options": [
      "Azote",
      "Chlore",
      "Cobalt",
      "Cuivre"
    ],
    "reponse": 3
  },
  {
    "id": "q0086",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1352 et 1529 ?",
    "options": [
      "177",
      "171",
      "202",
      "173"
    ],
    "reponse": 0
  },
  {
    "id": "q0087",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Zr » ?",
    "options": [
      "Zirconium",
      "Thorium",
      "Cobalt",
      "Américium"
    ],
    "reponse": 0
  },
  {
    "id": "q0088",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Guyana",
      "Eswatini",
      "Lettonie",
      "Pérou"
    ],
    "reponse": 1
  },
  {
    "id": "q0089",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 313 appartient à quel siècle ?",
    "options": [
      "5e siècle",
      "4e siècle",
      "3e siècle",
      "2e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0090",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mongolie ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0091",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 892 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "8e siècle",
      "9e siècle",
      "7e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0092",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1625 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "18e siècle",
      "15e siècle",
      "17e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0093",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 808 - 698 ?",
    "options": [
      "113",
      "107",
      "110",
      "112"
    ],
    "reponse": 2
  },
  {
    "id": "q0094",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 260 en chiffres romains ?",
    "options": [
      "CCLXII",
      "CCLX",
      "CCLXI",
      "CCLVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0095",
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
    "id": "q0096",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ouagadougou est la capitale de quel pays ?",
    "options": [
      "Algérie",
      "Liechtenstein",
      "Burkina Faso",
      "Malte"
    ],
    "reponse": 2
  },
  {
    "id": "q0097",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Qatar ?",
    "options": [
      "Océanie",
      "Europe",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0098",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 7 ?",
    "options": [
      "66",
      "63",
      "59",
      "69"
    ],
    "reponse": 1
  },
  {
    "id": "q0099",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Po » ?",
    "options": [
      "Silicium",
      "Polonium",
      "Gallium",
      "Aluminium"
    ],
    "reponse": 1
  },
  {
    "id": "q0100",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 934 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "9e siècle",
      "8e siècle",
      "10e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0101",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Or ?",
    "options": [
      "Pa",
      "Ta",
      "Cl",
      "Au"
    ],
    "reponse": 3
  },
  {
    "id": "q0102",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 44 + 638 ?",
    "options": [
      "683",
      "685",
      "682",
      "681"
    ],
    "reponse": 2
  },
  {
    "id": "q0103",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Liban ?",
    "options": [
      "Sanaa",
      "Beyrouth",
      "Phnom Penh",
      "Riga"
    ],
    "reponse": 1
  },
  {
    "id": "q0104",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de France ?",
    "options": [
      "Dinar jordanien",
      "Rial omanais",
      "Euro",
      "Peso dominicain"
    ],
    "reponse": 2
  },
  {
    "id": "q0105",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle grande fête bavaroise de la bière, à Munich, attire chaque année des millions de visiteurs ?",
    "options": [
      "L'Oktoberfest",
      "Le Karneval de Cologne",
      "La Fête du houblon",
      "La Fête de la bière de Bruxelles"
    ],
    "reponse": 0
  },
  {
    "id": "q0106",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 166 + 53 ?",
    "options": [
      "221",
      "216",
      "218",
      "219"
    ],
    "reponse": 3
  },
  {
    "id": "q0107",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mozambique ?",
    "options": [
      "🇨🇮",
      "🇲🇿",
      "🇲🇺",
      "🇲🇬"
    ],
    "reponse": 1
  },
  {
    "id": "q0108",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Australie",
      "Macédoine du Nord",
      "Rwanda",
      "Brésil"
    ],
    "reponse": 2
  },
  {
    "id": "q0109",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Russie ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0110",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1616 et 1805 ?",
    "options": [
      "205",
      "180",
      "189",
      "181"
    ],
    "reponse": 2
  },
  {
    "id": "q0111",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 942 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "8e siècle",
      "10e siècle",
      "9e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0112",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 182 en chiffres romains ?",
    "options": [
      "CLXXXII",
      "CLXXXIV",
      "CLXXII",
      "CLXXXVII"
    ],
    "reponse": 0
  },
  {
    "id": "q0113",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel élément chimique est indispensable à toute combustion classique ?",
    "options": [
      "L'hydrogène",
      "Le dioxyde de carbone",
      "L'azote",
      "L'oxygène"
    ],
    "reponse": 3
  },
  {
    "id": "q0114",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des États-Unis ?",
    "options": [
      "Tala",
      "Dollar américain",
      "Dinar libyen",
      "Rouble biélorusse"
    ],
    "reponse": 1
  },
  {
    "id": "q0115",
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
    "id": "q0116",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel prince troyen enlève Hélène et déclenche la guerre de Troie ?",
    "options": [
      "Pâris",
      "Énée",
      "Hector",
      "Priam"
    ],
    "reponse": 0
  },
  {
    "id": "q0117",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bucarest est la capitale de quel pays ?",
    "options": [
      "Vietnam",
      "Bulgarie",
      "Roumanie",
      "Monténégro"
    ],
    "reponse": 2
  },
  {
    "id": "q0118",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Australie ?",
    "options": [
      "Europe",
      "Océanie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0119",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Brésil ?",
    "options": [
      "Wellington",
      "Asmara",
      "Bridgetown",
      "Brasilia"
    ],
    "reponse": 3
  },
  {
    "id": "q0120",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel peintre français est associé au pointillisme avec son tableau « Un dimanche après-midi à l'Île de la Grande Jatte » ?",
    "options": [
      "Paul Signac",
      "Henri de Toulouse-Lautrec",
      "Georges Seurat",
      "Camille Pissarro"
    ],
    "reponse": 2
  },
  {
    "id": "q0121",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien à tête de crocodile est associé au Nil et à la fertilité ?",
    "options": [
      "Seth",
      "Sobek",
      "Khnoum",
      "Anubis"
    ],
    "reponse": 1
  },
  {
    "id": "q0122",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 452 + 430 ?",
    "options": [
      "883",
      "884",
      "882",
      "881"
    ],
    "reponse": 2
  },
  {
    "id": "q0123",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 473 + 41 ?",
    "options": [
      "511",
      "515",
      "517",
      "514"
    ],
    "reponse": 3
  },
  {
    "id": "q0124",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle est l'unité de mesure de la pression atmosphérique ?",
    "options": [
      "Le pascal",
      "Le kelvin",
      "Le joule",
      "Le newton"
    ],
    "reponse": 0
  },
  {
    "id": "q0125",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Éthiopie ?",
    "options": [
      "Naira",
      "Forint",
      "Birr",
      "Manat azerbaïdjanais"
    ],
    "reponse": 2
  },
  {
    "id": "q0126",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bahamas ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q0127",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 290 + 367 ?",
    "options": [
      "654",
      "658",
      "655",
      "657"
    ],
    "reponse": 3
  },
  {
    "id": "q0128",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quelle chanteuse française a remporté l'Eurovision 1965 avec « Poupée de cire, poupée de son » ?",
    "options": [
      "Françoise Hardy",
      "France Gall",
      "Sylvie Vartan",
      "Sheila"
    ],
    "reponse": 1
  },
  {
    "id": "q0129",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel mouvement littéraire, porté par Émile Zola, décrit la société avec une approche presque scientifique ?",
    "options": [
      "Le romantisme",
      "Le symbolisme",
      "Le réalisme magique",
      "Le naturalisme"
    ],
    "reponse": 3
  },
  {
    "id": "q0130",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 524 - 335 ?",
    "options": [
      "187",
      "192",
      "189",
      "188"
    ],
    "reponse": 2
  },
  {
    "id": "q0131",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Eswatini",
      "Monténégro",
      "Géorgie",
      "Syrie"
    ],
    "reponse": 2
  },
  {
    "id": "q0132",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle plaine fertile, souvent appelée « grenier à blé », s'étend entre le Tigre et l'Euphrate ?",
    "options": [
      "Le Sinaï",
      "L'Anatolie",
      "La Mésopotamie",
      "Le Levant"
    ],
    "reponse": 2
  },
  {
    "id": "q0133",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1770 et 1921 ?",
    "options": [
      "149",
      "164",
      "166",
      "151"
    ],
    "reponse": 3
  },
  {
    "id": "q0134",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel groupe allemand, pionnier de la musique électronique, a créé le morceau « Autobahn » ?",
    "options": [
      "Can",
      "Kraftwerk",
      "Neu!",
      "Tangerine Dream"
    ],
    "reponse": 1
  },
  {
    "id": "q0135",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDXLIV en chiffres romains ?",
    "options": [
      "1554",
      "1539",
      "1544",
      "1543"
    ],
    "reponse": 2
  },
  {
    "id": "q0136",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock britannique a sorti l'album « The Dark Side of the Moon » ?",
    "options": [
      "Pink Floyd",
      "Yes",
      "King Crimson",
      "Genesis"
    ],
    "reponse": 0
  },
  {
    "id": "q0137",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Tanzanie ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0138",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 308 ÷ 14 ?",
    "options": [
      "26",
      "18",
      "21",
      "22"
    ],
    "reponse": 3
  },
  {
    "id": "q0139",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Fidji ?",
    "options": [
      "Suva",
      "Asuncion",
      "Ankara",
      "Nouakchott"
    ],
    "reponse": 0
  },
  {
    "id": "q0140",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Saint-Marin",
      "Namibie",
      "Belgique",
      "Cambodge"
    ],
    "reponse": 0
  },
  {
    "id": "q0141",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle ville a accueilli les premiers Jeux olympiques modernes en 1896 ?",
    "options": [
      "Paris",
      "Athènes",
      "Londres",
      "Rome"
    ],
    "reponse": 1
  },
  {
    "id": "q0142",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Douchanbé est la capitale de quel pays ?",
    "options": [
      "Côte d'Ivoire",
      "Tadjikistan",
      "Argentine",
      "Tunisie"
    ],
    "reponse": 1
  },
  {
    "id": "q0143",
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
    "id": "q0144",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Singapour",
      "Afghanistan",
      "Vietnam",
      "Belgique"
    ],
    "reponse": 3
  },
  {
    "id": "q0145",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quelle capacité permet à l'écureuil de retrouver de la nourriture après l'avoir enterrée à l'automne ?",
    "options": [
      "Il compte sur le hasard",
      "Il suit des repères de vol des oiseaux",
      "Il mémorise les emplacements de ses caches",
      "Il suit son odorat exclusivement"
    ],
    "reponse": 2
  },
  {
    "id": "q0146",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Suisse ?",
    "options": [
      "🇷🇸",
      "🇵🇦",
      "🇨🇳",
      "🇨🇭"
    ],
    "reponse": 3
  },
  {
    "id": "q0147",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1507 et 1640 ?",
    "options": [
      "148",
      "157",
      "127",
      "133"
    ],
    "reponse": 3
  },
  {
    "id": "q0148",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « La » ?",
    "options": [
      "Tungstène",
      "Plomb",
      "Rhodium",
      "Lanthane"
    ],
    "reponse": 3
  },
  {
    "id": "q0149",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Estonie ?",
    "options": [
      "🇮🇩",
      "🇲🇨",
      "🇪🇪",
      "🇭🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q0150",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Fahrenheit 451 » ?",
    "options": [
      "Ray Bradbury",
      "Philip K. Dick",
      "Isaac Asimov",
      "Arthur C. Clarke"
    ],
    "reponse": 0
  },
  {
    "id": "q0151",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 187 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "1e siècle",
      "3e siècle",
      "4e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0152",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Irak ?",
    "options": [
      "Couronne danoise",
      "Dinar irakien",
      "Couronne islandaise",
      "Cedi"
    ],
    "reponse": 1
  },
  {
    "id": "q0153",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 23 année(s) ?",
    "options": [
      "323",
      "242",
      "276",
      "285"
    ],
    "reponse": 2
  },
  {
    "id": "q0154",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Platine ?",
    "options": [
      "Pt",
      "B",
      "Ra",
      "C"
    ],
    "reponse": 0
  },
  {
    "id": "q0155",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'El Salvador ?",
    "options": [
      "🇸🇻",
      "🇩🇯",
      "🇹🇲",
      "🇲🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q0156",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle période culturelle et artistique européenne, entre le XIVe et le XVIIe siècle, marque un retour aux idéaux de l'Antiquité ?",
    "options": [
      "Le Moyen Âge",
      "La Renaissance",
      "Le Romantisme",
      "Les Lumières"
    ],
    "reponse": 1
  },
  {
    "id": "q0157",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCMXLVI en chiffres romains ?",
    "options": [
      "1946",
      "1944",
      "1945",
      "1947"
    ],
    "reponse": 0
  },
  {
    "id": "q0158",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3111 en chiffres romains ?",
    "options": [
      "MMMCVI",
      "MMMCXI",
      "MMMCIX",
      "MMMCXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0159",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Bangladesh",
      "Djibouti",
      "Monténégro",
      "Maldives"
    ],
    "reponse": 3
  },
  {
    "id": "q0160",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tokyo est la capitale de quel pays ?",
    "options": [
      "Japon",
      "Macédoine du Nord",
      "Guinée équatoriale",
      "Moldavie"
    ],
    "reponse": 0
  },
  {
    "id": "q0161",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCLXIII en chiffres romains ?",
    "options": [
      "1353",
      "1364",
      "1368",
      "1363"
    ],
    "reponse": 3
  },
  {
    "id": "q0162",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kazakhstan ?",
    "options": [
      "Lempira",
      "Gourde",
      "Naira",
      "Tenge"
    ],
    "reponse": 3
  },
  {
    "id": "q0163",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kazakhstan ?",
    "options": [
      "🇨🇦",
      "🇱🇧",
      "🇰🇿",
      "🇨🇬"
    ],
    "reponse": 2
  },
  {
    "id": "q0164",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle sitcom américaine met en scène six amis vivant à Manhattan, diffusée de 1994 à 2004 ?",
    "options": [
      "Seinfeld",
      "Friends",
      "The Big Bang Theory",
      "How I Met Your Mother"
    ],
    "reponse": 1
  },
  {
    "id": "q0165",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCXLVIII en chiffres romains ?",
    "options": [
      "2749",
      "2748",
      "2738",
      "2747"
    ],
    "reponse": 1
  },
  {
    "id": "q0166",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Holmium ?",
    "options": [
      "B",
      "Mg",
      "Ho",
      "I"
    ],
    "reponse": 2
  },
  {
    "id": "q0167",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle ère de modernisation, débutée en 1868, a transformé le Japon en puissance industrielle ?",
    "options": [
      "L'ère Taisho",
      "L'ère Meiji",
      "L'ère Showa",
      "L'ère Edo"
    ],
    "reponse": 1
  },
  {
    "id": "q0168",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Cambodge ?",
    "options": [
      "Riel",
      "Roupie indienne",
      "Hryvnia",
      "Bolivar"
    ],
    "reponse": 0
  },
  {
    "id": "q0169",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 144 ÷ 9 ?",
    "options": [
      "16",
      "20",
      "18",
      "13"
    ],
    "reponse": 0
  },
  {
    "id": "q0170",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 800 ?",
    "options": [
      "77",
      "71",
      "80",
      "81"
    ],
    "reponse": 2
  },
  {
    "id": "q0171",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Zambie",
      "Kazakhstan",
      "Niger",
      "Monténégro"
    ],
    "reponse": 3
  },
  {
    "id": "q0172",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de min dans 120 s ?",
    "options": [
      "2",
      "5",
      "-1",
      "0"
    ],
    "reponse": 0
  },
  {
    "id": "q0173",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 14 ?",
    "options": [
      "170",
      "182",
      "163",
      "168"
    ],
    "reponse": 1
  },
  {
    "id": "q0174",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 27 h ?",
    "options": [
      "97200",
      "84455",
      "113336",
      "85294"
    ],
    "reponse": 0
  },
  {
    "id": "q0175",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 10 ?",
    "options": [
      "159",
      "141",
      "150",
      "140"
    ],
    "reponse": 2
  },
  {
    "id": "q0176",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 838 - 108 ?",
    "options": [
      "730",
      "731",
      "733",
      "729"
    ],
    "reponse": 0
  },
  {
    "id": "q0177",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 50400 s ?",
    "options": [
      "14",
      "11",
      "12",
      "10"
    ],
    "reponse": 0
  },
  {
    "id": "q0178",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel mammifère australien pond des œufs tout en allaitant ses petits, fait rarissime chez les mammifères ?",
    "options": [
      "Le diable de Tasmanie",
      "L'échidné",
      "Le wombat",
      "L'ornithorynque"
    ],
    "reponse": 3
  },
  {
    "id": "q0179",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCLI en chiffres romains ?",
    "options": [
      "2249",
      "2252",
      "2246",
      "2251"
    ],
    "reponse": 3
  },
  {
    "id": "q0180",
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
    "id": "q0181",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 8 l ?",
    "options": [
      "8795",
      "8000",
      "6706",
      "9319"
    ],
    "reponse": 1
  },
  {
    "id": "q0182",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kampala est la capitale de quel pays ?",
    "options": [
      "Haïti",
      "Arménie",
      "Ouganda",
      "Suriname"
    ],
    "reponse": 2
  },
  {
    "id": "q0183",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3392 en chiffres romains ?",
    "options": [
      "MMMCCCXCII",
      "MMMCCCXCIII",
      "MMMCCCXC",
      "MMMCDII"
    ],
    "reponse": 0
  },
  {
    "id": "q0184",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pakistan ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0185",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1701 et 1986 ?",
    "options": [
      "323",
      "291",
      "237",
      "285"
    ],
    "reponse": 3
  },
  {
    "id": "q0186",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 9 min ?",
    "options": [
      "540",
      "499",
      "466",
      "456"
    ],
    "reponse": 0
  },
  {
    "id": "q0187",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle licence de jeux vidéo d'horreur et de survie, débutée en 1996, oppose ses personnages à des zombies dans des manoirs ou des villes infestées ?",
    "options": [
      "Dead Space",
      "Silent Hill",
      "Resident Evil",
      "The Evil Within"
    ],
    "reponse": 2
  },
  {
    "id": "q0188",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la triade principale des dieux dans l'hindouisme, création, préservation et destruction ?",
    "options": [
      "Brahma, Vishnou et Shiva",
      "Indra, Agni et Varuna",
      "Ganesh, Durga et Kali",
      "Rama, Krishna et Hanuman"
    ],
    "reponse": 0
  },
  {
    "id": "q0189",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse québécoise interprète « My Heart Will Go On », thème du film Titanic ?",
    "options": [
      "Alanis Morissette",
      "Shania Twain",
      "Avril Lavigne",
      "Céline Dion"
    ],
    "reponse": 3
  },
  {
    "id": "q0190",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "De quoi est principalement composé le squelette des requins, plus léger que celui des autres poissons ?",
    "options": [
      "Du collagène pur",
      "Du cartilage",
      "De l'os",
      "De la kératine"
    ],
    "reponse": 1
  },
  {
    "id": "q0191",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un naufragé sur un radeau en compagnie d'un tigre du Bengale nommé Richard Parker ?",
    "options": [
      "L'Odyssée de Pi",
      "En eaux troubles",
      "Kon-Tiki",
      "Open Water"
    ],
    "reponse": 0
  },
  {
    "id": "q0192",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Paramaribo est la capitale de quel pays ?",
    "options": [
      "Corée du Nord",
      "Macédoine du Nord",
      "Trinité-et-Tobago",
      "Suriname"
    ],
    "reponse": 3
  },
  {
    "id": "q0193",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Arsenic ?",
    "options": [
      "Rb",
      "Cu",
      "B",
      "As"
    ],
    "reponse": 3
  },
  {
    "id": "q0194",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1613 et 1717 ?",
    "options": [
      "123",
      "109",
      "117",
      "104"
    ],
    "reponse": 3
  },
  {
    "id": "q0195",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Indonésie",
      "Nouvelle-Zélande",
      "Émirats arabes unis",
      "Corée du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0196",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe suédois a sorti le tube « Dancing Queen » ?",
    "options": [
      "ABBA",
      "Roxette",
      "Europe",
      "Ace of Base"
    ],
    "reponse": 0
  },
  {
    "id": "q0197",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Inde ?",
    "options": [
      "Dram",
      "Lempira",
      "Roupie indienne",
      "Rufiyaa"
    ],
    "reponse": 2
  },
  {
    "id": "q0198",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 679 - 445 ?",
    "options": [
      "232",
      "235",
      "233",
      "234"
    ],
    "reponse": 3
  },
  {
    "id": "q0199",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « B » ?",
    "options": [
      "Bore",
      "Praséodyme",
      "Rubidium",
      "Américium"
    ],
    "reponse": 0
  },
  {
    "id": "q0200",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Varsovie est la capitale de quel pays ?",
    "options": [
      "Mexique",
      "Tanzanie",
      "Pologne",
      "Mauritanie"
    ],
    "reponse": 2
  },
  {
    "id": "q0201",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le nom du plus grand récif corallien du monde, situé en Australie ?",
    "options": [
      "Le récif de la mer Rouge",
      "Le récif de Belize",
      "L'atoll de Bikini",
      "La Grande Barrière de corail"
    ],
    "reponse": 3
  },
  {
    "id": "q0202",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de jour(s) dans 34 semaine(s) ?",
    "options": [
      "232",
      "277",
      "205",
      "238"
    ],
    "reponse": 3
  },
  {
    "id": "q0203",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Canada ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Asie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0204",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 727 appartient à quel siècle ?",
    "options": [
      "8e siècle",
      "9e siècle",
      "7e siècle",
      "6e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0205",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom de la plus petite unité qui compose une image numérique ?",
    "options": [
      "Le voxel",
      "Le bit",
      "Le pixel",
      "L'octet"
    ],
    "reponse": 2
  },
  {
    "id": "q0206",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Liechtenstein ?",
    "options": [
      "Brazzaville",
      "Mexico",
      "Vaduz",
      "Accra"
    ],
    "reponse": 2
  },
  {
    "id": "q0207",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 270 ÷ 15 ?",
    "options": [
      "18",
      "16",
      "19",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q0208",
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
    "id": "q0209",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport utilise-t-on le terme « ace » pour un service gagnant direct ?",
    "options": [
      "Le tennis",
      "Le volley-ball",
      "Le squash",
      "Le badminton"
    ],
    "reponse": 0
  },
  {
    "id": "q0210",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Myanmar",
      "Corée du Nord",
      "El Salvador",
      "Pays-Bas"
    ],
    "reponse": 2
  },
  {
    "id": "q0211",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 28 ÷ 14 ?",
    "options": [
      "2",
      "1",
      "0",
      "-1"
    ],
    "reponse": 0
  },
  {
    "id": "q0212",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 232 + 538 ?",
    "options": [
      "769",
      "770",
      "767",
      "773"
    ],
    "reponse": 1
  },
  {
    "id": "q0213",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1390 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "12e siècle",
      "13e siècle",
      "15e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0214",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel scientifique britannique a formulé la théorie de la sélection naturelle avec Charles Darwin de façon quasi simultanée ?",
    "options": [
      "Francis Galton",
      "Alfred Russel Wallace",
      "Herbert Spencer",
      "Thomas Huxley"
    ],
    "reponse": 1
  },
  {
    "id": "q0215",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCMXXXVIII en chiffres romains ?",
    "options": [
      "3948",
      "3938",
      "3933",
      "3939"
    ],
    "reponse": 1
  },
  {
    "id": "q0216",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Argentine ?",
    "options": [
      "Wellington",
      "Buenos Aires",
      "Lomé",
      "Pristina"
    ],
    "reponse": 1
  },
  {
    "id": "q0217",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCLVI en chiffres romains ?",
    "options": [
      "3256",
      "3266",
      "3254",
      "3251"
    ],
    "reponse": 0
  },
  {
    "id": "q0218",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se pratique avec des fleurets, des épées ou des sabres ?",
    "options": [
      "L'escrime",
      "Le pentathlon",
      "Le tir à l'arc",
      "La lutte"
    ],
    "reponse": 0
  },
  {
    "id": "q0219",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays possède le plus de lacs au monde ?",
    "options": [
      "Le Canada",
      "La Russie",
      "La Finlande",
      "Les États-Unis"
    ],
    "reponse": 0
  },
  {
    "id": "q0220",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3725 en chiffres romains ?",
    "options": [
      "MMMDCCXXV",
      "MMMDCCXV",
      "MMMDCCXXVI",
      "MMMDCCXXX"
    ],
    "reponse": 0
  },
  {
    "id": "q0221",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin est capable de projeter de l'encre pour échapper à ses prédateurs ?",
    "options": [
      "L'anguille",
      "Le dauphin",
      "La pieuvre",
      "La méduse"
    ],
    "reponse": 2
  },
  {
    "id": "q0222",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel temple, considéré comme le plus grand monument religieux du monde, se trouve au Cambodge ?",
    "options": [
      "Le temple de Louxor",
      "Le Borobudur",
      "Le Potala",
      "Angkor Vat"
    ],
    "reponse": 3
  },
  {
    "id": "q0223",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel jeu de stratégie à deux joueurs, opposant rois, tours et fous sur un damier, est considéré comme un sport de l'esprit ?",
    "options": [
      "Le go",
      "Les échecs",
      "Le backgammon",
      "Les dames"
    ],
    "reponse": 1
  },
  {
    "id": "q0224",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Francium ?",
    "options": [
      "Ga",
      "Nd",
      "W",
      "Fr"
    ],
    "reponse": 3
  },
  {
    "id": "q0225",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène un cartel de la drogue mexicain et l'agence antidrogue américaine (DEA) ?",
    "options": [
      "Queen of the South",
      "Breaking Bad",
      "Narcos",
      "Ozark"
    ],
    "reponse": 2
  },
  {
    "id": "q0226",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un homme dont la particularité est de vieillir à l'envers, de la vieillesse vers la naissance ?",
    "options": [
      "Click",
      "Peggy Sue s'est mariée",
      "Un jour sans fin",
      "L'Étrange Histoire de Benjamin Button"
    ],
    "reponse": 3
  },
  {
    "id": "q0227",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mexique ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q0228",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 × 3 ?",
    "options": [
      "28",
      "26",
      "35",
      "30"
    ],
    "reponse": 3
  },
  {
    "id": "q0229",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel instrument à vent utilise une anche double et est souvent associé à l'orchestre symphonique ?",
    "options": [
      "Le hautbois",
      "La clarinette",
      "Le basson",
      "Le cor anglais"
    ],
    "reponse": 0
  },
  {
    "id": "q0230",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Andorre ?",
    "options": [
      "Peso philippin",
      "Euro",
      "Metical",
      "Nakfa"
    ],
    "reponse": 1
  },
  {
    "id": "q0231",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Finlande ?",
    "options": [
      "🇫🇮",
      "🇳🇬",
      "🇭🇳",
      "🇹🇿"
    ],
    "reponse": 0
  },
  {
    "id": "q0232",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Couronne norvégienne",
      "Afghani",
      "Euro",
      "Kina"
    ],
    "reponse": 3
  },
  {
    "id": "q0233",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 311 - 274 ?",
    "options": [
      "35",
      "38",
      "39",
      "37"
    ],
    "reponse": 3
  },
  {
    "id": "q0234",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 18 ?",
    "options": [
      "95",
      "81",
      "90",
      "100"
    ],
    "reponse": 2
  },
  {
    "id": "q0235",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1317 et 1569 ?",
    "options": [
      "252",
      "226",
      "225",
      "264"
    ],
    "reponse": 0
  },
  {
    "id": "q0236",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3185 en chiffres romains ?",
    "options": [
      "MMMCLXXV",
      "MMMCLXXXIV",
      "MMMCLXXXVI",
      "MMMCLXXXV"
    ],
    "reponse": 3
  },
  {
    "id": "q0237",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 395 + 293 ?",
    "options": [
      "685",
      "689",
      "688",
      "690"
    ],
    "reponse": 2
  },
  {
    "id": "q0238",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1708 et 1822 ?",
    "options": [
      "134",
      "115",
      "114",
      "96"
    ],
    "reponse": 2
  },
  {
    "id": "q0239",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain français a reçu le prix Goncourt à deux reprises, une fois sous son nom et une fois sous un pseudonyme ?",
    "options": [
      "Marcel Aymé",
      "Romain Gary",
      "André Malraux",
      "Michel Tournier"
    ],
    "reponse": 1
  },
  {
    "id": "q0240",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 999 + 513 ?",
    "options": [
      "1512",
      "1510",
      "1514",
      "1513"
    ],
    "reponse": 0
  },
  {
    "id": "q0241",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 557 en chiffres romains ?",
    "options": [
      "DLVIII",
      "DLIX",
      "DLXVII",
      "DLVII"
    ],
    "reponse": 3
  },
  {
    "id": "q0242",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est le leader du groupe Queen, décédé en 1991 ?",
    "options": [
      "Brian May",
      "Freddie Mercury",
      "Roger Taylor",
      "John Deacon"
    ],
    "reponse": 1
  },
  {
    "id": "q0243",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 120 ?",
    "options": [
      "26",
      "30",
      "28",
      "33"
    ],
    "reponse": 1
  },
  {
    "id": "q0244",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est capable de régénérer un membre perdu, comme sa queue ?",
    "options": [
      "Le lézard",
      "La tortue",
      "Le crocodile",
      "Le serpent"
    ],
    "reponse": 0
  },
  {
    "id": "q0245",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nicaragua ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0246",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 330 - 112 ?",
    "options": [
      "219",
      "218",
      "220",
      "217"
    ],
    "reponse": 1
  },
  {
    "id": "q0247",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3430 en chiffres romains ?",
    "options": [
      "MMMCDXXXV",
      "MMMCDXXX",
      "MMMCDXX",
      "MMMCDXXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0248",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 18 décennie(s) ?",
    "options": [
      "201",
      "180",
      "191",
      "211"
    ],
    "reponse": 1
  },
  {
    "id": "q0249",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-Vila est la capitale de quel pays ?",
    "options": [
      "Namibie",
      "Vanuatu",
      "Liberia",
      "Libye"
    ],
    "reponse": 1
  },
  {
    "id": "q0250",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1056 et 1329 ?",
    "options": [
      "233",
      "308",
      "273",
      "254"
    ],
    "reponse": 2
  },
  {
    "id": "q0251",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un naufragé nommé Chuck Noland livré à lui-même sur une île ?",
    "options": [
      "Robinson Crusoé",
      "Seul au monde",
      "The Beach",
      "Cast Away"
    ],
    "reponse": 1
  },
  {
    "id": "q0252",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 985 + 535 ?",
    "options": [
      "1518",
      "1523",
      "1522",
      "1520"
    ],
    "reponse": 3
  },
  {
    "id": "q0253",
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
    "id": "q0254",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 100 ?",
    "options": [
      "18",
      "15",
      "13",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q0255",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle pâtisserie viennoise, feuilletée et en forme de quartier de lune, est emblématique du petit-déjeuner français ?",
    "options": [
      "Le chausson aux pommes",
      "Le pain au chocolat",
      "La brioche",
      "Le croissant"
    ],
    "reponse": 3
  },
  {
    "id": "q0256",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom de l'assistant vocal d'Apple ?",
    "options": [
      "Cortana",
      "Alexa",
      "Google Assistant",
      "Siri"
    ],
    "reponse": 3
  },
  {
    "id": "q0257",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Philippines ?",
    "options": [
      "🇵🇭",
      "🇬🇼",
      "🇩🇪",
      "🇨🇲"
    ],
    "reponse": 0
  },
  {
    "id": "q0258",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Émirats arabes unis ?",
    "options": [
      "Afrique",
      "Asie",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0259",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 10 ?",
    "options": [
      "80",
      "71",
      "87",
      "81"
    ],
    "reponse": 0
  },
  {
    "id": "q0260",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 6 ?",
    "options": [
      "108",
      "121",
      "104",
      "106"
    ],
    "reponse": 0
  },
  {
    "id": "q0261",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné le personnage principal de « Rocky » ?",
    "options": [
      "Jean-Claude Van Damme",
      "Arnold Schwarzenegger",
      "Sylvester Stallone",
      "Bruce Willis"
    ],
    "reponse": 2
  },
  {
    "id": "q0262",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dacca est la capitale de quel pays ?",
    "options": [
      "États-Unis",
      "Bangladesh",
      "Lituanie",
      "Érythrée"
    ],
    "reponse": 1
  },
  {
    "id": "q0263",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Burkina Faso ?",
    "options": [
      "Apia",
      "Malabo",
      "Helsinki",
      "Ouagadougou"
    ],
    "reponse": 3
  },
  {
    "id": "q0264",
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
    "id": "q0265",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse grecque personnifie la vengeance et la juste rétribution envers les mortels orgueilleux ?",
    "options": [
      "Tyché",
      "Diké",
      "Thémis",
      "Némésis"
    ],
    "reponse": 3
  },
  {
    "id": "q0266",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle déesse grecque est associée à la sagesse et est née de la tête de Zeus ?",
    "options": [
      "Athéna",
      "Héra",
      "Artémis",
      "Aphrodite"
    ],
    "reponse": 0
  },
  {
    "id": "q0267",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Liberia",
      "Inde",
      "Bosnie-Herzégovine",
      "Slovénie"
    ],
    "reponse": 1
  },
  {
    "id": "q0268",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle romancière américaine a reçu le prix Nobel de littérature en 1993 ?",
    "options": [
      "Harper Lee",
      "Toni Morrison",
      "Alice Walker",
      "Maya Angelou"
    ],
    "reponse": 1
  },
  {
    "id": "q0269",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 93600 s ?",
    "options": [
      "26",
      "20",
      "27",
      "32"
    ],
    "reponse": 0
  },
  {
    "id": "q0270",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des États-Unis ?",
    "options": [
      "🇫🇯",
      "🇺🇸",
      "🇨🇳",
      "🇦🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q0271",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Soudan ?",
    "options": [
      "Shilling ougandais",
      "Shilling tanzanien",
      "Riel",
      "Livre soudanaise"
    ],
    "reponse": 3
  },
  {
    "id": "q0272",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Pologne ?",
    "options": [
      "Stockholm",
      "Varsovie",
      "Gaborone",
      "Antananarivo"
    ],
    "reponse": 1
  },
  {
    "id": "q0273",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 19 siècle(s) ?",
    "options": [
      "2195",
      "1960",
      "1947",
      "1900"
    ],
    "reponse": 3
  },
  {
    "id": "q0274",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel métal liquide à température ambiante est utilisé dans les anciens thermomètres ?",
    "options": [
      "Le plomb",
      "Le zinc",
      "Le mercure",
      "L'étain"
    ],
    "reponse": 2
  },
  {
    "id": "q0275",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 170 - 8 ?",
    "options": [
      "165",
      "161",
      "164",
      "162"
    ],
    "reponse": 3
  },
  {
    "id": "q0276",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel est le nom de l'instrument à vent utilisé dans le jazz, souvent associé à Louis Armstrong ?",
    "options": [
      "Le trombone",
      "La clarinette",
      "Le saxophone",
      "La trompette"
    ],
    "reponse": 3
  },
  {
    "id": "q0277",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne le personnage principal du film « Joker » (2019) ?",
    "options": [
      "Jared Leto",
      "Jack Nicholson",
      "Joaquin Phoenix",
      "Heath Ledger"
    ],
    "reponse": 2
  },
  {
    "id": "q0278",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bangladesh ?",
    "options": [
      "🇬🇳",
      "🇳🇿",
      "🇷🇴",
      "🇧🇩"
    ],
    "reponse": 3
  },
  {
    "id": "q0279",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 8 ?",
    "options": [
      "40",
      "39",
      "47",
      "43"
    ],
    "reponse": 0
  },
  {
    "id": "q0280",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Somalie ?",
    "options": [
      "🇸🇴",
      "🇪🇷",
      "🇱🇾",
      "🇲🇾"
    ],
    "reponse": 0
  },
  {
    "id": "q0281",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 254 - 172 ?",
    "options": [
      "80",
      "81",
      "83",
      "82"
    ],
    "reponse": 3
  },
  {
    "id": "q0282",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 304 + 358 ?",
    "options": [
      "659",
      "662",
      "663",
      "661"
    ],
    "reponse": 1
  },
  {
    "id": "q0283",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 759 + 225 ?",
    "options": [
      "981",
      "984",
      "987",
      "985"
    ],
    "reponse": 1
  },
  {
    "id": "q0284",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle vaste fracture géologique traverse l'Afrique de l'Est du nord au sud, bordée de volcans et de lacs ?",
    "options": [
      "Le bassin du Congo",
      "La faille de San Andreas",
      "Le fossé rhénan",
      "Le grand rift africain"
    ],
    "reponse": 3
  },
  {
    "id": "q0285",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 6 × 14 ?",
    "options": [
      "78",
      "90",
      "84",
      "74"
    ],
    "reponse": 2
  },
  {
    "id": "q0286",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série médicale américaine, diffusée depuis 2005, suit le quotidien de chirurgiens dans un hôpital de Seattle ?",
    "options": [
      "Urgences",
      "Grey's Anatomy",
      "The Good Doctor",
      "Dr House"
    ],
    "reponse": 1
  },
  {
    "id": "q0287",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2777 en chiffres romains ?",
    "options": [
      "MMDCCLXXVI",
      "MMDCCLXXVII",
      "MMDCCLXXXVII",
      "MMDCCLXXIX"
    ],
    "reponse": 1
  },
  {
    "id": "q0288",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1740 et 1952 ?",
    "options": [
      "229",
      "233",
      "180",
      "212"
    ],
    "reponse": 3
  },
  {
    "id": "q0289",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 12 m ?",
    "options": [
      "11225",
      "12351",
      "10466",
      "12000"
    ],
    "reponse": 3
  },
  {
    "id": "q0290",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 500 ?",
    "options": [
      "150",
      "155",
      "146",
      "151"
    ],
    "reponse": 0
  },
  {
    "id": "q0291",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Géorgie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Océanie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0292",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Gd » ?",
    "options": [
      "Gadolinium",
      "Oxygène",
      "Neptunium",
      "Radon"
    ],
    "reponse": 0
  },
  {
    "id": "q0293",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 32 cm ?",
    "options": [
      "303",
      "298",
      "320",
      "281"
    ],
    "reponse": 2
  },
  {
    "id": "q0294",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a mis en scène « Le Parrain » ?",
    "options": [
      "Sidney Lumet",
      "Brian De Palma",
      "Francis Ford Coppola",
      "Martin Scorsese"
    ],
    "reponse": 2
  },
  {
    "id": "q0295",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel océan sépare l'Amérique du Sud du continent africain ?",
    "options": [
      "L'océan Austral",
      "L'océan Pacifique",
      "L'océan Atlantique",
      "L'océan Indien"
    ],
    "reponse": 2
  },
  {
    "id": "q0296",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ne » ?",
    "options": [
      "Néon",
      "Sélénium",
      "Erbium",
      "Argent"
    ],
    "reponse": 0
  },
  {
    "id": "q0297",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Égypte ?",
    "options": [
      "Yamoussoukro",
      "Le Caire",
      "Maseru",
      "Kinshasa"
    ],
    "reponse": 1
  },
  {
    "id": "q0298",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Dans quel pays himalayen se trouve le sommet de l'Everest, à la frontière du Tibet ?",
    "options": [
      "L'Inde",
      "Le Pakistan",
      "Le Népal",
      "Le Bhoutan"
    ],
    "reponse": 2
  },
  {
    "id": "q0299",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain français a reçu le prix Nobel de littérature en 2008 ?",
    "options": [
      "Patrick Modiano",
      "Annie Ernaux",
      "Jean-Marie Gustave Le Clézio",
      "Albert Camus"
    ],
    "reponse": 2
  },
  {
    "id": "q0300",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Liberia ?",
    "options": [
      "Océanie",
      "Afrique",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0301",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1474 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "15e siècle",
      "16e siècle",
      "14e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q0302",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle discipline olympique combine tir et ski de fond ?",
    "options": [
      "Le pentathlon moderne",
      "Le combiné nordique",
      "Le ski alpin",
      "Le biathlon"
    ],
    "reponse": 3
  },
  {
    "id": "q0303",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 50 ?",
    "options": [
      "22",
      "28",
      "29",
      "25"
    ],
    "reponse": 3
  },
  {
    "id": "q0304",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Liban ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0305",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Quel nombre représente XLIII en chiffres romains ?",
    "options": [
      "45",
      "33",
      "43",
      "42"
    ],
    "reponse": 2
  },
  {
    "id": "q0306",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat français traditionnel est composé de petits gastéropodes cuits dans du beurre à l'ail et au persil ?",
    "options": [
      "Les cuisses de grenouilles",
      "Le tartare",
      "Le foie gras",
      "Les escargots de Bourgogne"
    ],
    "reponse": 3
  },
  {
    "id": "q0307",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain américain est l'auteur de « De sang-froid » et de « Petit Déjeuner chez Tiffany » ?",
    "options": [
      "J.D. Salinger",
      "Truman Capote",
      "Norman Mailer",
      "Gore Vidal"
    ],
    "reponse": 1
  },
  {
    "id": "q0308",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle théorie décrit l'origine de l'univers à partir d'une expansion initiale il y a environ 13,8 milliards d'années ?",
    "options": [
      "La théorie des cordes",
      "La théorie de la relativité générale",
      "Le Big Bang",
      "La théorie de l'état stationnaire"
    ],
    "reponse": 2
  },
  {
    "id": "q0309",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 406 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "3e siècle",
      "5e siècle",
      "6e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0310",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète est la plus proche du Soleil ?",
    "options": [
      "la Terre",
      "Mars",
      "Vénus",
      "Mercure"
    ],
    "reponse": 3
  },
  {
    "id": "q0311",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est traversé par le cercle polaire arctique et possède le Père Noël comme attraction touristique en Laponie ?",
    "options": [
      "La Russie",
      "La Norvège",
      "La Finlande",
      "La Suède"
    ],
    "reponse": 2
  },
  {
    "id": "q0312",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Arménie ?",
    "options": [
      "Océanie",
      "Europe",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0313",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 29000 mm ?",
    "options": [
      "29",
      "33",
      "25",
      "35"
    ],
    "reponse": 0
  },
  {
    "id": "q0314",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel monstre grec avait une seule œil au milieu du front ?",
    "options": [
      "Le Cyclope",
      "La Gorgone",
      "Le Sphinx",
      "Le Minotaure"
    ],
    "reponse": 0
  },
  {
    "id": "q0315",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport les concurrents s'affrontent-ils en effectuant des figures sur une planche à roulettes ?",
    "options": [
      "Le BMX",
      "La trottinette freestyle",
      "Le skateboard",
      "Le roller"
    ],
    "reponse": 2
  },
  {
    "id": "q0316",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel type de cellule transmet l'influx nerveux dans le corps humain ?",
    "options": [
      "L'ostéoblaste",
      "L'adipocyte",
      "Le neurone",
      "Le globule blanc"
    ],
    "reponse": 2
  },
  {
    "id": "q0317",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Tadjikistan ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0318",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bangkok est la capitale de quel pays ?",
    "options": [
      "Trinité-et-Tobago",
      "Norvège",
      "Slovénie",
      "Thaïlande"
    ],
    "reponse": 3
  },
  {
    "id": "q0319",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur incarne le psychiatre cannibale Hannibal Lecter dans « Le Silence des agneaux » ?",
    "options": [
      "Vincent Price",
      "Christopher Lee",
      "Anthony Hopkins",
      "Anthony Perkins"
    ],
    "reponse": 2
  },
  {
    "id": "q0320",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Malaisie",
      "Cap-Vert",
      "Libye",
      "Madagascar"
    ],
    "reponse": 2
  },
  {
    "id": "q0321",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Timor oriental ?",
    "options": [
      "Lilongwe",
      "Conakry",
      "Nassau",
      "Dili"
    ],
    "reponse": 3
  },
  {
    "id": "q0322",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu grec des enfers règne sur le royaume des morts ?",
    "options": [
      "Arès",
      "Zeus",
      "Poséidon",
      "Hadès"
    ],
    "reponse": 3
  },
  {
    "id": "q0323",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "La Havane est la capitale de quel pays ?",
    "options": [
      "Papouasie-Nouvelle-Guinée",
      "Qatar",
      "Cuba",
      "Turkménistan"
    ],
    "reponse": 2
  },
  {
    "id": "q0324",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 145 + 103 ?",
    "options": [
      "250",
      "248",
      "251",
      "249"
    ],
    "reponse": 1
  },
  {
    "id": "q0325",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1093 et 1299 ?",
    "options": [
      "206",
      "238",
      "195",
      "209"
    ],
    "reponse": 0
  },
  {
    "id": "q0326",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Royaume-Uni ?",
    "options": [
      "🇬🇦",
      "🇳🇿",
      "🇲🇻",
      "🇬🇧"
    ],
    "reponse": 3
  },
  {
    "id": "q0327",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 782 - 474 ?",
    "options": [
      "305",
      "309",
      "308",
      "311"
    ],
    "reponse": 2
  },
  {
    "id": "q0328",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Qatar ?",
    "options": [
      "Riyal qatari",
      "Afghani",
      "Dinar irakien",
      "Dirham marocain"
    ],
    "reponse": 0
  },
  {
    "id": "q0329",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Budapest est la capitale de quel pays ?",
    "options": [
      "Mozambique",
      "Liban",
      "Samoa",
      "Hongrie"
    ],
    "reponse": 3
  },
  {
    "id": "q0330",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1457 et 1587 ?",
    "options": [
      "134",
      "130",
      "125",
      "131"
    ],
    "reponse": 1
  },
  {
    "id": "q0331",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 24 au carré ?",
    "options": [
      "606",
      "633",
      "576",
      "550"
    ],
    "reponse": 2
  },
  {
    "id": "q0332",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Togo ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0333",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu grec des songes est le fils d'Hypnos, dieu du sommeil ?",
    "options": [
      "Éros",
      "Zéphyr",
      "Morphée",
      "Thanatos"
    ],
    "reponse": 2
  },
  {
    "id": "q0334",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Timor oriental ?",
    "options": [
      "Balboa",
      "Peso philippin",
      "Dong",
      "Dollar américain"
    ],
    "reponse": 3
  },
  {
    "id": "q0335",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCXVII en chiffres romains ?",
    "options": [
      "719",
      "717",
      "715",
      "707"
    ],
    "reponse": 1
  },
  {
    "id": "q0336",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1029 et 1069 ?",
    "options": [
      "39",
      "43",
      "36",
      "40"
    ],
    "reponse": 3
  },
  {
    "id": "q0337",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 39 + 395 ?",
    "options": [
      "434",
      "433",
      "437",
      "432"
    ],
    "reponse": 0
  },
  {
    "id": "q0338",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 138 - 85 ?",
    "options": [
      "53",
      "54",
      "51",
      "56"
    ],
    "reponse": 0
  },
  {
    "id": "q0339",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2390 en chiffres romains ?",
    "options": [
      "MMCCCXC",
      "MMCCCLXXX",
      "MMCCCLXXXV",
      "MMCCCXCV"
    ],
    "reponse": 0
  },
  {
    "id": "q0340",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Oslo est la capitale de quel pays ?",
    "options": [
      "Érythrée",
      "Norvège",
      "Soudan",
      "Madagascar"
    ],
    "reponse": 1
  },
  {
    "id": "q0341",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 3000 kg ?",
    "options": [
      "2",
      "4",
      "3",
      "6"
    ],
    "reponse": 2
  },
  {
    "id": "q0342",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Cambodge",
      "Biélorussie",
      "Irak",
      "Royaume-Uni"
    ],
    "reponse": 0
  },
  {
    "id": "q0343",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Albanie ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Europe",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q0344",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation met en scène un personnage jaune et rectangulaire vivant dans un ananas au fond de l'océan, avec son ami étoile de mer ?",
    "options": [
      "Rocket Power",
      "Les Razmoket",
      "Bob l'éponge",
      "Doug"
    ],
    "reponse": 2
  },
  {
    "id": "q0345",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dodoma est la capitale de quel pays ?",
    "options": [
      "Myanmar",
      "Timor oriental",
      "Tanzanie",
      "Afghanistan"
    ],
    "reponse": 2
  },
  {
    "id": "q0346",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 247 ÷ 13 ?",
    "options": [
      "16",
      "19",
      "18",
      "23"
    ],
    "reponse": 1
  },
  {
    "id": "q0347",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Lanthane ?",
    "options": [
      "Ge",
      "La",
      "Ag",
      "Tc"
    ],
    "reponse": 1
  },
  {
    "id": "q0348",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Lithium ?",
    "options": [
      "Co",
      "Sm",
      "Li",
      "H"
    ],
    "reponse": 2
  },
  {
    "id": "q0349",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1047 en chiffres romains ?",
    "options": [
      "MXLVII",
      "MXLIX",
      "MXXXVII",
      "MXLVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q0350",
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
    "id": "q0351",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel explorateur nordique est crédité d'avoir atteint l'Amérique du Nord vers l'an 1000 ?",
    "options": [
      "Erik le Rouge",
      "Rollon",
      "Leif Erikson",
      "Harald à la Dent Bleue"
    ],
    "reponse": 2
  },
  {
    "id": "q0352",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se pratique avec des quilles et une boule lourde percée de trois trous ?",
    "options": [
      "La pétanque",
      "Le bowling",
      "Le bocce",
      "Le curling"
    ],
    "reponse": 1
  },
  {
    "id": "q0353",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCLXXIII en chiffres romains ?",
    "options": [
      "1863",
      "1872",
      "1871",
      "1873"
    ],
    "reponse": 3
  },
  {
    "id": "q0354",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 25 ?",
    "options": [
      "5",
      "3",
      "2",
      "4"
    ],
    "reponse": 0
  },
  {
    "id": "q0355",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Belgique ?",
    "options": [
      "Afrique",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q0356",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Madagascar ?",
    "options": [
      "Kigali",
      "Kuala Lumpur",
      "Stockholm",
      "Antananarivo"
    ],
    "reponse": 3
  },
  {
    "id": "q0357",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 30 t ?",
    "options": [
      "30000",
      "33532",
      "31411",
      "25078"
    ],
    "reponse": 0
  },
  {
    "id": "q0358",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel événement cycliste est surnommé la « Grande Boucle » ?",
    "options": [
      "Paris-Roubaix",
      "La Vuelta",
      "Le Giro d'Italia",
      "Le Tour de France"
    ],
    "reponse": 3
  },
  {
    "id": "q0359",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 86 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "2e siècle",
      "4e siècle",
      "3e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0360",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est l'animal terrestre le plus rapide sur de courtes distances ?",
    "options": [
      "Le lévrier",
      "Le guépard",
      "Le lion",
      "L'antilope"
    ],
    "reponse": 1
  },
  {
    "id": "q0361",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1481 et 1645 ?",
    "options": [
      "144",
      "187",
      "164",
      "182"
    ],
    "reponse": 2
  },
  {
    "id": "q0362",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel groupe britannique des années 90 est connu pour la rivalité avec Oasis, avec les tubes « Common People » ?",
    "options": [
      "Blur",
      "The Verve",
      "Suede",
      "Pulp"
    ],
    "reponse": 3
  },
  {
    "id": "q0363",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Zagreb est la capitale de quel pays ?",
    "options": [
      "Somalie",
      "Monténégro",
      "Croatie",
      "Brésil"
    ],
    "reponse": 2
  },
  {
    "id": "q0364",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe américain a interprété « Hotel California » ?",
    "options": [
      "Creedence Clearwater Revival",
      "Fleetwood Mac",
      "Eagles",
      "The Doors"
    ],
    "reponse": 2
  },
  {
    "id": "q0365",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCXXIV en chiffres romains ?",
    "options": [
      "3314",
      "3324",
      "3329",
      "3322"
    ],
    "reponse": 1
  },
  {
    "id": "q0366",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Sénégal ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Océanie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0367",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 580 + 661 ?",
    "options": [
      "1244",
      "1241",
      "1238",
      "1242"
    ],
    "reponse": 1
  },
  {
    "id": "q0368",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 790 + 287 ?",
    "options": [
      "1074",
      "1076",
      "1078",
      "1077"
    ],
    "reponse": 3
  },
  {
    "id": "q0369",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo « Battle Royale » très populaire est édité par Epic Games ?",
    "options": [
      "PUBG",
      "Apex Legends",
      "Fortnite",
      "Warzone"
    ],
    "reponse": 2
  },
  {
    "id": "q0370",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a mis en scène « Le Discours d'un roi », récompensé de l'Oscar du meilleur film en 2011 ?",
    "options": [
      "Danny Boyle",
      "Steven Spielberg",
      "Tom Hooper",
      "David Fincher"
    ],
    "reponse": 2
  },
  {
    "id": "q0371",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Andorre ?",
    "options": [
      "🇱🇷",
      "🇵🇾",
      "🇦🇩",
      "🇧🇯"
    ],
    "reponse": 2
  },
  {
    "id": "q0372",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Pristina est la capitale de quel pays ?",
    "options": [
      "Kosovo",
      "Ukraine",
      "Timor oriental",
      "Vanuatu"
    ],
    "reponse": 0
  },
  {
    "id": "q0373",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Libye ?",
    "options": [
      "Dinar koweïtien",
      "Baht",
      "Couronne norvégienne",
      "Dinar libyen"
    ],
    "reponse": 3
  },
  {
    "id": "q0374",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Indonésie ?",
    "options": [
      "Dinar serbe",
      "Riyal qatari",
      "Baht",
      "Roupie indonésienne"
    ],
    "reponse": 3
  },
  {
    "id": "q0375",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 au carré ?",
    "options": [
      "440",
      "400",
      "434",
      "348"
    ],
    "reponse": 1
  },
  {
    "id": "q0376",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Monténégro ?",
    "options": [
      "Franc comorien",
      "Euro",
      "Roupie mauricienne",
      "Dollar canadien"
    ],
    "reponse": 1
  },
  {
    "id": "q0377",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Fer ?",
    "options": [
      "Sm",
      "Fe",
      "Te",
      "Ra"
    ],
    "reponse": 1
  },
  {
    "id": "q0378",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 951 en chiffres romains ?",
    "options": [
      "CMXLVI",
      "CML",
      "CMLI",
      "CMLXI"
    ],
    "reponse": 2
  },
  {
    "id": "q0379",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle est la capitale de l'Australie ?",
    "options": [
      "Perth",
      "Canberra",
      "Melbourne",
      "Sydney"
    ],
    "reponse": 1
  },
  {
    "id": "q0380",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 41 + 416 ?",
    "options": [
      "459",
      "457",
      "455",
      "456"
    ],
    "reponse": 1
  },
  {
    "id": "q0381",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 297 - 190 ?",
    "options": [
      "104",
      "109",
      "107",
      "110"
    ],
    "reponse": 2
  },
  {
    "id": "q0382",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Biélorussie ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0383",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Moldavie ?",
    "options": [
      "Amman",
      "Beyrouth",
      "Chisinau",
      "Tunis"
    ],
    "reponse": 2
  },
  {
    "id": "q0384",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 12000 kg ?",
    "options": [
      "12",
      "8",
      "13",
      "11"
    ],
    "reponse": 0
  },
  {
    "id": "q0385",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel mammifère aquatique rosâtre vit exclusivement dans les fleuves d'Amazonie et de l'Orénoque, contrairement à ses cousins marins ?",
    "options": [
      "Le capybara",
      "Le dauphin rose de l'Amazone",
      "La loutre géante",
      "Le lamantin"
    ],
    "reponse": 1
  },
  {
    "id": "q0386",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 5 cl ?",
    "options": [
      "42",
      "45",
      "50",
      "44"
    ],
    "reponse": 2
  },
  {
    "id": "q0387",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 175 ÷ 7 ?",
    "options": [
      "26",
      "25",
      "23",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q0388",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Malé est la capitale de quel pays ?",
    "options": [
      "Australie",
      "Émirats arabes unis",
      "Maroc",
      "Maldives"
    ],
    "reponse": 3
  },
  {
    "id": "q0389",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kosovo ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0390",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Croatie ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q0391",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel personnage grec fait traverser le fleuve des Enfers aux âmes des défunts, moyennant une pièce de monnaie ?",
    "options": [
      "Hadès",
      "Hermès",
      "Thanatos",
      "Charon"
    ],
    "reponse": 3
  },
  {
    "id": "q0392",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Indonésie ?",
    "options": [
      "Abuja",
      "Nicosie",
      "Jakarta",
      "Moroni"
    ],
    "reponse": 2
  },
  {
    "id": "q0393",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Dans quel musée parisien est exposée « La Joconde » ?",
    "options": [
      "Le musée de l'Orangerie",
      "Le Centre Pompidou",
      "Le musée du Louvre",
      "Le musée d'Orsay"
    ],
    "reponse": 2
  },
  {
    "id": "q0394",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Gallium ?",
    "options": [
      "Ga",
      "Pt",
      "Np",
      "Sm"
    ],
    "reponse": 0
  },
  {
    "id": "q0395",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 3 jour(s) ?",
    "options": [
      "65",
      "73",
      "58",
      "72"
    ],
    "reponse": 3
  },
  {
    "id": "q0396",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 926 - 369 ?",
    "options": [
      "559",
      "557",
      "558",
      "560"
    ],
    "reponse": 1
  },
  {
    "id": "q0397",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mg » ?",
    "options": [
      "Iridium",
      "Nickel",
      "Magnésium",
      "Fluor"
    ],
    "reponse": 2
  },
  {
    "id": "q0398",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCXXXIX en chiffres romains ?",
    "options": [
      "3137",
      "3140",
      "3134",
      "3139"
    ],
    "reponse": 3
  },
  {
    "id": "q0399",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCXLVIII en chiffres romains ?",
    "options": [
      "3843",
      "3838",
      "3847",
      "3848"
    ],
    "reponse": 3
  },
  {
    "id": "q0400",
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
    "id": "q0401",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Serbie ?",
    "options": [
      "Colon costaricain",
      "Quetzal",
      "Dinar serbe",
      "Franc CFA"
    ],
    "reponse": 2
  },
  {
    "id": "q0402",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Helsinki est la capitale de quel pays ?",
    "options": [
      "Éthiopie",
      "Finlande",
      "Suède",
      "Danemark"
    ],
    "reponse": 1
  },
  {
    "id": "q0403",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bahreïn ?",
    "options": [
      "🇷🇴",
      "🇱🇾",
      "🇧🇭",
      "🇻🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q0404",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Grèce ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q0405",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Monténégro ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0406",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur de Microsoft ?",
    "options": [
      "Bill Gates",
      "Larry Page",
      "Mark Zuckerberg",
      "Steve Jobs"
    ],
    "reponse": 0
  },
  {
    "id": "q0407",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Arménie ?",
    "options": [
      "🇦🇿",
      "🇦🇲",
      "🇳🇴",
      "🇱🇾"
    ],
    "reponse": 1
  },
  {
    "id": "q0408",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Hongrie ?",
    "options": [
      "🇸🇬",
      "🇭🇺",
      "🇧🇼",
      "🇮🇩"
    ],
    "reponse": 1
  },
  {
    "id": "q0409",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 170 ÷ 10 ?",
    "options": [
      "16",
      "17",
      "19",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q0410",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 20 ÷ 4 ?",
    "options": [
      "5",
      "7",
      "2",
      "6"
    ],
    "reponse": 0
  },
  {
    "id": "q0411",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien de chromosomes possède une cellule humaine normale ?",
    "options": [
      "48",
      "23",
      "46",
      "44"
    ],
    "reponse": 2
  },
  {
    "id": "q0412",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 58 - 26 ?",
    "options": [
      "29",
      "33",
      "35",
      "32"
    ],
    "reponse": 3
  },
  {
    "id": "q0413",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Tunisie ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q0414",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un policier new-yorkais bloqué dans un gratte-ciel lors d'une prise d'otages, la veille de Noël ?",
    "options": [
      "Piège de cristal",
      "La Tour infernale",
      "L'Aventure du Poséidon",
      "Air Force One"
    ],
    "reponse": 0
  },
  {
    "id": "q0415",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la plus petite unité de vie capable de se reproduire ?",
    "options": [
      "L'atome",
      "La cellule",
      "La molécule",
      "Le tissu"
    ],
    "reponse": 1
  },
  {
    "id": "q0416",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Yémen ?",
    "options": [
      "Riyal yéménite",
      "Euro",
      "Rouble biélorusse",
      "Leu moldave"
    ],
    "reponse": 0
  },
  {
    "id": "q0417",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 30 m ?",
    "options": [
      "3000",
      "2901",
      "3466",
      "3422"
    ],
    "reponse": 0
  },
  {
    "id": "q0418",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Néodyme ?",
    "options": [
      "Sb",
      "Yb",
      "Cs",
      "Nd"
    ],
    "reponse": 3
  },
  {
    "id": "q0419",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nouakchott est la capitale de quel pays ?",
    "options": [
      "Grèce",
      "Costa Rica",
      "Mauritanie",
      "Azerbaïdjan"
    ],
    "reponse": 2
  },
  {
    "id": "q0420",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français a écrit « L'Étranger » et « La Peste » ?",
    "options": [
      "André Gide",
      "Albert Camus",
      "Jean-Paul Sartre",
      "André Malraux"
    ],
    "reponse": 1
  },
  {
    "id": "q0421",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 601 + 579 ?",
    "options": [
      "1182",
      "1181",
      "1183",
      "1180"
    ],
    "reponse": 3
  },
  {
    "id": "q0422",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Quito est la capitale de quel pays ?",
    "options": [
      "Équateur",
      "Kazakhstan",
      "Trinité-et-Tobago",
      "Qatar"
    ],
    "reponse": 0
  },
  {
    "id": "q0423",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel mouvement pictural du début du XXe siècle, mené par Kandinsky, a été parmi les premiers à rejeter toute représentation figurative ?",
    "options": [
      "Le surréalisme",
      "L'art abstrait",
      "L'expressionnisme",
      "Le cubisme"
    ],
    "reponse": 1
  },
  {
    "id": "q0424",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel super-vilain, principal antagoniste de plusieurs films Avengers, cherche à effacer la moitié des êtres vivants de l'univers ?",
    "options": [
      "Ultron",
      "Thanos",
      "Thanatos",
      "Loki"
    ],
    "reponse": 1
  },
  {
    "id": "q0425",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 859 en chiffres romains ?",
    "options": [
      "DCCCLX",
      "DCCCLIX",
      "DCCCLVII",
      "DCCCLVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q0426",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 50 ?",
    "options": [
      "12",
      "15",
      "17",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q0427",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quelle jeune paysanne a mené l'armée royale française contre les Anglais avant d'être brûlée vive à Rouen en 1431 ?",
    "options": [
      "Blanche de Castille",
      "Aliénor d'Aquitaine",
      "Jeanne d'Arc",
      "Catherine de Médicis"
    ],
    "reponse": 2
  },
  {
    "id": "q0428",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 279 - 196 ?",
    "options": [
      "80",
      "83",
      "85",
      "84"
    ],
    "reponse": 1
  },
  {
    "id": "q0429",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kazakhstan ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0430",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 110 ÷ 11 ?",
    "options": [
      "10",
      "9",
      "13",
      "11"
    ],
    "reponse": 0
  },
  {
    "id": "q0431",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation met en scène une équipe de jeunes super-héros menée par Robin ?",
    "options": [
      "Justice League",
      "Umbrella Academy",
      "Teen Titans",
      "Young Justice"
    ],
    "reponse": 2
  },
  {
    "id": "q0432",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Cap-Vert ?",
    "options": [
      "Dram",
      "Escudo cap-verdien",
      "Sol péruvien",
      "Cordoba"
    ],
    "reponse": 1
  },
  {
    "id": "q0433",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 156 ÷ 6 ?",
    "options": [
      "26",
      "25",
      "27",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q0434",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur mexicain a remporté l'Oscar pour « La Forme de l'eau » ?",
    "options": [
      "Robert Rodriguez",
      "Guillermo del Toro",
      "Alejandro González Iñárritu",
      "Alfonso Cuarón"
    ],
    "reponse": 1
  },
  {
    "id": "q0435",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Slovaquie ?",
    "options": [
      "Bratislava",
      "Chisinau",
      "Dacca",
      "Stockholm"
    ],
    "reponse": 0
  },
  {
    "id": "q0436",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Timor oriental ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Europe",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0437",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 276 - 1 ?",
    "options": [
      "276",
      "274",
      "275",
      "273"
    ],
    "reponse": 2
  },
  {
    "id": "q0438",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République dominicaine ?",
    "options": [
      "Katmandou",
      "Khartoum",
      "Skopje",
      "Saint-Domingue"
    ],
    "reponse": 3
  },
  {
    "id": "q0439",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Scandium ?",
    "options": [
      "Ru",
      "Co",
      "Am",
      "Sc"
    ],
    "reponse": 3
  },
  {
    "id": "q0440",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel gâteau traditionnel allemand en forme de bûche est fait de fines couches successives cuites au four ?",
    "options": [
      "Le stollen",
      "Le baumkuchen",
      "Le strudel",
      "La forêt-noire"
    ],
    "reponse": 1
  },
  {
    "id": "q0441",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style architectural du XVIIe siècle, riche en ornements, caractérise le château de Versailles ?",
    "options": [
      "Le rococo",
      "Le roman",
      "Le baroque",
      "Le gothique"
    ],
    "reponse": 2
  },
  {
    "id": "q0442",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 90 ÷ 15 ?",
    "options": [
      "6",
      "9",
      "5",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q0443",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2240 en chiffres romains ?",
    "options": [
      "MMCCXXX",
      "MMCCXXXVIII",
      "MMCCXL",
      "MMCCXLV"
    ],
    "reponse": 2
  },
  {
    "id": "q0444",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel monstre à sept têtes repousse dès qu'on les coupe, tué par Héraclès ?",
    "options": [
      "Cerbère",
      "Le Sphinx",
      "L'Hydre de Lerne",
      "La Chimère"
    ],
    "reponse": 2
  },
  {
    "id": "q0445",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1730 et 1763 ?",
    "options": [
      "33",
      "27",
      "31",
      "40"
    ],
    "reponse": 0
  },
  {
    "id": "q0446",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 108 ÷ 9 ?",
    "options": [
      "14",
      "12",
      "11",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q0447",
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
    "id": "q0448",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle vitamine prévient le scorbut et se trouve en grande quantité dans les agrumes ?",
    "options": [
      "La vitamine D",
      "La vitamine K",
      "La vitamine C",
      "La vitamine B9"
    ],
    "reponse": 2
  },
  {
    "id": "q0449",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 540 min ?",
    "options": [
      "9",
      "7",
      "10",
      "11"
    ],
    "reponse": 0
  },
  {
    "id": "q0450",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 × 16 ?",
    "options": [
      "285",
      "296",
      "320",
      "333"
    ],
    "reponse": 2
  },
  {
    "id": "q0451",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Que font les tortues marines femelles adultes en revenant précisément sur la plage de leur propre naissance ?",
    "options": [
      "Elles y trouvent un partenaire exclusivement",
      "Elles y hivernent",
      "Elles y pondent leurs œufs",
      "Elles y muent"
    ],
    "reponse": 2
  },
  {
    "id": "q0452",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-au-Prince est la capitale de quel pays ?",
    "options": [
      "Albanie",
      "Haïti",
      "Bulgarie",
      "Zimbabwe"
    ],
    "reponse": 1
  },
  {
    "id": "q0453",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 815 + 807 ?",
    "options": [
      "1619",
      "1624",
      "1622",
      "1625"
    ],
    "reponse": 2
  },
  {
    "id": "q0454",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Népal ?",
    "options": [
      "Roupie népalaise",
      "Peso argentin",
      "Dollar américain",
      "Couronne suédoise"
    ],
    "reponse": 0
  },
  {
    "id": "q0455",
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
    "id": "q0456",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1273 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "11e siècle",
      "12e siècle",
      "14e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0457",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 196 ?",
    "options": [
      "14",
      "16",
      "15",
      "12"
    ],
    "reponse": 0
  },
  {
    "id": "q0458",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DLXXXIX en chiffres romains ?",
    "options": [
      "594",
      "579",
      "584",
      "589"
    ],
    "reponse": 3
  },
  {
    "id": "q0459",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Lutécium ?",
    "options": [
      "F",
      "Lu",
      "Hf",
      "Ho"
    ],
    "reponse": 1
  },
  {
    "id": "q0460",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇿🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Zimbabwe",
      "Allemagne",
      "Namibie"
    ],
    "reponse": 1
  },
  {
    "id": "q0461",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1270 en chiffres romains ?",
    "options": [
      "MCCLXXX",
      "MCCLXX",
      "MCCLXIX",
      "MCCLXV"
    ],
    "reponse": 1
  },
  {
    "id": "q0462",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Indonésie",
      "Syrie",
      "Cambodge",
      "Vietnam"
    ],
    "reponse": 3
  },
  {
    "id": "q0463",
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
    "id": "q0464",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3687 en chiffres romains ?",
    "options": [
      "MMMDCLXXXIX",
      "MMMDCLXXXVII",
      "MMMDCXCVII",
      "MMMDCXCII"
    ],
    "reponse": 1
  },
  {
    "id": "q0465",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de km dans 40000 m ?",
    "options": [
      "45",
      "42",
      "40",
      "47"
    ],
    "reponse": 2
  },
  {
    "id": "q0466",
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
    "id": "q0467",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs y a-t-il dans une équipe de cricket ?",
    "options": [
      "9",
      "10",
      "12",
      "11"
    ],
    "reponse": 3
  },
  {
    "id": "q0468",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 91 ÷ 13 ?",
    "options": [
      "7",
      "6",
      "8",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q0469",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Brasilia est la capitale de quel pays ?",
    "options": [
      "Brésil",
      "Belgique",
      "Liberia",
      "Congo"
    ],
    "reponse": 0
  },
  {
    "id": "q0470",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1730 en chiffres romains ?",
    "options": [
      "MDCCXXVIII",
      "MDCCXX",
      "MDCCXXX",
      "MDCCXXXI"
    ],
    "reponse": 2
  },
  {
    "id": "q0471",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 164 + 904 ?",
    "options": [
      "1065",
      "1071",
      "1067",
      "1068"
    ],
    "reponse": 3
  },
  {
    "id": "q0472",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Syrie",
      "Chine",
      "Lituanie",
      "Irlande"
    ],
    "reponse": 2
  },
  {
    "id": "q0473",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Irlande ?",
    "options": [
      "Dublin",
      "Caracas",
      "Riga",
      "Douchanbé"
    ],
    "reponse": 0
  },
  {
    "id": "q0474",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film met en scène un cow-boy du Far West confronté à une invasion extraterrestre ?",
    "options": [
      "Wild Wild West",
      "Rango",
      "Cowboys et Envahisseurs",
      "Jonah Hex"
    ],
    "reponse": 2
  },
  {
    "id": "q0475",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Oman ?",
    "options": [
      "Europe",
      "Asie",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0476",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de construction et de survie en blocs est développé par Mojang ?",
    "options": [
      "Fortnite",
      "Terraria",
      "Minecraft",
      "Roblox"
    ],
    "reponse": 2
  },
  {
    "id": "q0477",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel grand singe africain est connu pour utiliser des outils, comme des bâtons pour attraper des termites ?",
    "options": [
      "Le gorille",
      "L'orang-outan",
      "Le babouin",
      "Le chimpanzé"
    ],
    "reponse": 3
  },
  {
    "id": "q0478",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Liban",
      "Singapour",
      "Nigeria",
      "Namibie"
    ],
    "reponse": 1
  },
  {
    "id": "q0479",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 9 ?",
    "options": [
      "111",
      "126",
      "125",
      "142"
    ],
    "reponse": 1
  },
  {
    "id": "q0480",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Brésil ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q0481",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de mémoire, très rapide mais de petite taille, stocke temporairement les données les plus utilisées par le processeur ?",
    "options": [
      "La mémoire morte",
      "Le disque dur",
      "La mémoire cache",
      "La mémoire vive"
    ],
    "reponse": 2
  },
  {
    "id": "q0482",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style architectural médiéval est caractérisé par des arcs en ogive et de grandes rosaces, comme à Notre-Dame de Paris ?",
    "options": [
      "Le baroque",
      "Le gothique",
      "Le roman",
      "Le renaissance"
    ],
    "reponse": 1
  },
  {
    "id": "q0483",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Jordanie",
      "Gabon",
      "Corée du Sud",
      "Panama"
    ],
    "reponse": 0
  },
  {
    "id": "q0484",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Ghana ?",
    "options": [
      "Mark convertible",
      "Peso philippin",
      "Shilling somalien",
      "Cedi"
    ],
    "reponse": 3
  },
  {
    "id": "q0485",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 72 ÷ 12 ?",
    "options": [
      "7",
      "9",
      "6",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q0486",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 500 ?",
    "options": [
      "188",
      "190",
      "195",
      "200"
    ],
    "reponse": 3
  },
  {
    "id": "q0487",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel type de course cycliste se déroule dans un vélodrome, sur un anneau incliné ?",
    "options": [
      "Le cyclisme sur piste",
      "Le VTT",
      "Le cyclo-cross",
      "Le BMX"
    ],
    "reponse": 0
  },
  {
    "id": "q0488",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Turkménistan ?",
    "options": [
      "Manat turkmène",
      "Zloty",
      "Ariary",
      "Taka"
    ],
    "reponse": 0
  },
  {
    "id": "q0489",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Libreville est la capitale de quel pays ?",
    "options": [
      "Égypte",
      "Nigeria",
      "Gabon",
      "Comores"
    ],
    "reponse": 2
  },
  {
    "id": "q0490",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 150 ?",
    "options": [
      "81",
      "82",
      "75",
      "78"
    ],
    "reponse": 2
  },
  {
    "id": "q0491",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 168 - 132 ?",
    "options": [
      "34",
      "37",
      "36",
      "38"
    ],
    "reponse": 2
  },
  {
    "id": "q0492",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Corée du Nord ?",
    "options": [
      "🇵🇰",
      "🇲🇾",
      "🇰🇵",
      "🇬🇶"
    ],
    "reponse": 2
  },
  {
    "id": "q0493",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Lituanie ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0494",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel chercheur britannique a partagé le prix Nobel avec Watson et Crick pour la découverte de la structure de l'ADN ?",
    "options": [
      "Erwin Chargaff",
      "Linus Pauling",
      "Maurice Wilkins",
      "Rosalind Franklin"
    ],
    "reponse": 2
  },
  {
    "id": "q0495",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Liban",
      "Mozambique",
      "Andorre",
      "Papouasie-Nouvelle-Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q0496",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle mer borde la Côte d'Azur française ?",
    "options": [
      "La mer Méditerranée",
      "La mer Adriatique",
      "La mer Rouge",
      "La mer Noire"
    ],
    "reponse": 0
  },
  {
    "id": "q0497",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le nom de la fosse océanique la plus profonde du monde ?",
    "options": [
      "La fosse de Java",
      "La fosse de Porto Rico",
      "La fosse du Japon",
      "La fosse des Mariannes"
    ],
    "reponse": 3
  },
  {
    "id": "q0498",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quelle écrivaine britannique, pionnière du courant de conscience, est l'autrice de « Mrs Dalloway » ?",
    "options": [
      "Doris Lessing",
      "Virginia Woolf",
      "Katherine Mansfield",
      "Iris Murdoch"
    ],
    "reponse": 1
  },
  {
    "id": "q0499",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 16 m ?",
    "options": [
      "1600",
      "1568",
      "1529",
      "1348"
    ],
    "reponse": 0
  },
  {
    "id": "q0500",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 780 - 701 ?",
    "options": [
      "79",
      "82",
      "80",
      "77"
    ],
    "reponse": 0
  },
  {
    "id": "q0501",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCLXXIV en chiffres romains ?",
    "options": [
      "276",
      "284",
      "273",
      "274"
    ],
    "reponse": 3
  },
  {
    "id": "q0502",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 940 - 482 ?",
    "options": [
      "458",
      "459",
      "457",
      "460"
    ],
    "reponse": 0
  },
  {
    "id": "q0503",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Myanmar ?",
    "options": [
      "Colon costaricain",
      "Dinar tunisien",
      "Shilling somalien",
      "Kyat"
    ],
    "reponse": 3
  },
  {
    "id": "q0504",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Costa Rica ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q0505",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2175 en chiffres romains ?",
    "options": [
      "MMCLXXX",
      "MMCLXX",
      "MMCLXXIV",
      "MMCLXXV"
    ],
    "reponse": 3
  },
  {
    "id": "q0506",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Géorgie ?",
    "options": [
      "Canberra",
      "Tbilissi",
      "Belmopan",
      "Port-d'Espagne"
    ],
    "reponse": 1
  },
  {
    "id": "q0507",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Norvège ?",
    "options": [
      "Lomé",
      "Bakou",
      "Sofia",
      "Oslo"
    ],
    "reponse": 3
  },
  {
    "id": "q0508",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-d'Espagne est la capitale de quel pays ?",
    "options": [
      "Serbie",
      "Samoa",
      "Équateur",
      "Trinité-et-Tobago"
    ],
    "reponse": 3
  },
  {
    "id": "q0509",
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
    "id": "q0510",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo met en scène un plombier qui doit sauver la princesse Peach du royaume Champignon ?",
    "options": [
      "Yoshi's Island",
      "Donkey Kong",
      "Luigi's Mansion",
      "Super Mario Bros."
    ],
    "reponse": 3
  },
  {
    "id": "q0511",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est l'os le plus long et le plus solide du corps humain ?",
    "options": [
      "Le fémur",
      "Le radius",
      "L'humérus",
      "Le tibia"
    ],
    "reponse": 0
  },
  {
    "id": "q0512",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Cuba ?",
    "options": [
      "🇨🇺",
      "🇨🇭",
      "🇮🇹",
      "🇬🇳"
    ],
    "reponse": 0
  },
  {
    "id": "q0513",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel oiseau est incapable de voler mais excellent nageur, vivant en Antarctique ?",
    "options": [
      "L'autruche",
      "Le manchot",
      "L'émeu",
      "Le kiwi"
    ],
    "reponse": 1
  },
  {
    "id": "q0514",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mexique ?",
    "options": [
      "🇲🇽",
      "🇸🇱",
      "🇨🇩",
      "🇸🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q0515",
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
    "id": "q0516",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République dominicaine ?",
    "options": [
      "🇲🇺",
      "🇼🇸",
      "🇲🇲",
      "🇩🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q0517",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 706 + 152 ?",
    "options": [
      "858",
      "861",
      "859",
      "860"
    ],
    "reponse": 0
  },
  {
    "id": "q0518",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel poisson d'Amérique du Sud peut produire une décharge assez puissante pour assommer un cheval ?",
    "options": [
      "Le thon",
      "Le poisson-chat",
      "Le barracuda",
      "L'anguille électrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0519",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Uruguay ?",
    "options": [
      "Afrique",
      "Europe",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q0520",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Qui a écrit « Le Nom de la rose » ?",
    "options": [
      "Dario Fo",
      "Italo Calvino",
      "Alberto Moravia",
      "Umberto Eco"
    ],
    "reponse": 3
  },
  {
    "id": "q0521",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 626 + 895 ?",
    "options": [
      "1521",
      "1523",
      "1519",
      "1524"
    ],
    "reponse": 0
  },
  {
    "id": "q0522",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est l'animal symbole de l'Australie, marsupial sauteur ?",
    "options": [
      "Le wallaby",
      "Le kangourou",
      "Le wombat",
      "Le koala"
    ],
    "reponse": 1
  },
  {
    "id": "q0523",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Comparé à celui de l'humain, l'odorat du chien est-il globalement plus développé ?",
    "options": [
      "Non, il est équivalent",
      "Cela dépend uniquement de la race",
      "Oui, nettement plus développé",
      "Non, il est moins développé"
    ],
    "reponse": 2
  },
  {
    "id": "q0524",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Djibouti",
      "Cap-Vert",
      "Islande",
      "Kenya"
    ],
    "reponse": 1
  },
  {
    "id": "q0525",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel animal possède la morsure la plus puissante jamais mesurée chez un animal vivant ?",
    "options": [
      "L'ours polaire",
      "Le grand requin blanc",
      "Le crocodile marin",
      "L'hippopotame"
    ],
    "reponse": 2
  },
  {
    "id": "q0526",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Nouvelle-Zélande ?",
    "options": [
      "Riyal qatari",
      "Dinar irakien",
      "Yen",
      "Dollar néo-zélandais"
    ],
    "reponse": 3
  },
  {
    "id": "q0527",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 248 - 26 ?",
    "options": [
      "223",
      "224",
      "222",
      "219"
    ],
    "reponse": 2
  },
  {
    "id": "q0528",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCDXCI en chiffres romains ?",
    "options": [
      "3493",
      "3496",
      "3501",
      "3491"
    ],
    "reponse": 3
  },
  {
    "id": "q0529",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel voyageur vénitien du XIIIe siècle a rapporté en Europe un célèbre récit de ses années passées en Chine ?",
    "options": [
      "Vasco de Gama",
      "Marco Polo",
      "Ibn Battuta",
      "Christophe Colomb"
    ],
    "reponse": 1
  },
  {
    "id": "q0530",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel muscle du corps humain est le plus grand ?",
    "options": [
      "Le quadriceps",
      "Le deltoïde",
      "Le grand fessier",
      "Le biceps"
    ],
    "reponse": 2
  },
  {
    "id": "q0531",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle japonais met en scène des invocations de créatures géantes appelées Eidolons ou Espers ?",
    "options": [
      "Final Fantasy",
      "Persona",
      "Dragon Quest",
      "Tales of"
    ],
    "reponse": 0
  },
  {
    "id": "q0532",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Irak ?",
    "options": [
      "Bakou",
      "Bagdad",
      "San José",
      "Tokyo"
    ],
    "reponse": 1
  },
  {
    "id": "q0533",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 219 + 889 ?",
    "options": [
      "1107",
      "1111",
      "1110",
      "1108"
    ],
    "reponse": 3
  },
  {
    "id": "q0534",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Chypre",
      "Maroc",
      "Slovaquie",
      "Russie"
    ],
    "reponse": 0
  },
  {
    "id": "q0535",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel terme imagé désigne la frontière idéologique qui séparait l'Europe pendant la guerre froide ?",
    "options": [
      "Le mur de la honte",
      "La ligne de démarcation",
      "Le rideau de fer",
      "La ligne Maginot"
    ],
    "reponse": 2
  },
  {
    "id": "q0536",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇿🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Moldavie",
      "Algérie",
      "Vanuatu",
      "Zambie"
    ],
    "reponse": 3
  },
  {
    "id": "q0537",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 1000 ?",
    "options": [
      "96",
      "100",
      "110",
      "95"
    ],
    "reponse": 1
  },
  {
    "id": "q0538",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel pays l'art martial aux techniques de pied spectaculaires appelé taekwondo est-il né ?",
    "options": [
      "Le Vietnam",
      "La Corée (du Sud)",
      "La Chine",
      "Le Japon"
    ],
    "reponse": 1
  },
  {
    "id": "q0539",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de football sur le terrain ?",
    "options": [
      "12",
      "10",
      "11",
      "9"
    ],
    "reponse": 2
  },
  {
    "id": "q0540",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 186 + 693 ?",
    "options": [
      "876",
      "879",
      "877",
      "882"
    ],
    "reponse": 1
  },
  {
    "id": "q0541",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Azerbaïdjan",
      "Moldavie",
      "France",
      "Bhoutan"
    ],
    "reponse": 2
  },
  {
    "id": "q0542",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 576 ?",
    "options": [
      "24",
      "26",
      "19",
      "27"
    ],
    "reponse": 0
  },
  {
    "id": "q0543",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Américium ?",
    "options": [
      "Am",
      "Zr",
      "H",
      "Y"
    ],
    "reponse": 0
  },
  {
    "id": "q0544",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 120 min ?",
    "options": [
      "2",
      "0",
      "1",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q0545",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain britannique a écrit « Le Meilleur des mondes » ?",
    "options": [
      "George Orwell",
      "Aldous Huxley",
      "Ray Bradbury",
      "H.G. Wells"
    ],
    "reponse": 1
  },
  {
    "id": "q0546",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom de l'organe qui permet aux poissons de respirer sous l'eau ?",
    "options": [
      "Les poumons",
      "La vessie natatoire",
      "Les branchies",
      "La peau"
    ],
    "reponse": 2
  },
  {
    "id": "q0547",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 250 ?",
    "options": [
      "86",
      "98",
      "109",
      "100"
    ],
    "reponse": 3
  },
  {
    "id": "q0548",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Australie ?",
    "options": [
      "Shilling tanzanien",
      "Dollar australien",
      "Riyal yéménite",
      "Dollar namibien"
    ],
    "reponse": 1
  },
  {
    "id": "q0549",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Haïti ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Europe",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q0550",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1523 et 1786 ?",
    "options": [
      "269",
      "302",
      "282",
      "263"
    ],
    "reponse": 3
  },
  {
    "id": "q0551",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Beyrouth est la capitale de quel pays ?",
    "options": [
      "Pologne",
      "Liban",
      "Suisse",
      "Estonie"
    ],
    "reponse": 1
  },
  {
    "id": "q0552",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Slovaquie ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q0553",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Nouvelle-Zélande ?",
    "options": [
      "🇳🇿",
      "🇱🇮",
      "🇱🇻",
      "🇰🇭"
    ],
    "reponse": 0
  },
  {
    "id": "q0554",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Neptunium ?",
    "options": [
      "Ta",
      "Np",
      "Ru",
      "Ir"
    ],
    "reponse": 1
  },
  {
    "id": "q0555",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Italie ?",
    "options": [
      "🇸🇳",
      "🇮🇹",
      "🇱🇷",
      "🇶🇦"
    ],
    "reponse": 1
  },
  {
    "id": "q0556",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 250 ?",
    "options": [
      "26",
      "25",
      "20",
      "30"
    ],
    "reponse": 1
  },
  {
    "id": "q0557",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1036 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "9e siècle",
      "11e siècle",
      "12e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0558",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 ÷ 2 ?",
    "options": [
      "9",
      "8",
      "6",
      "4"
    ],
    "reponse": 2
  },
  {
    "id": "q0559",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sr » ?",
    "options": [
      "Polonium",
      "Samarium",
      "Titane",
      "Strontium"
    ],
    "reponse": 3
  },
  {
    "id": "q0560",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 968 + 580 ?",
    "options": [
      "1545",
      "1550",
      "1548",
      "1549"
    ],
    "reponse": 2
  },
  {
    "id": "q0561",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Combien de bits composent un octet ?",
    "options": [
      "4",
      "16",
      "10",
      "8"
    ],
    "reponse": 3
  },
  {
    "id": "q0562",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel monument parisien abrite le tombeau de Napoléon Ier ?",
    "options": [
      "Le Panthéon",
      "La Sainte-Chapelle",
      "Notre-Dame de Paris",
      "Les Invalides"
    ],
    "reponse": 3
  },
  {
    "id": "q0563",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mozambique ?",
    "options": [
      "Phnom Penh",
      "Niamey",
      "Maputo",
      "Harare"
    ],
    "reponse": 2
  },
  {
    "id": "q0564",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation met en scène un ogre vert vivant seul dans son marécage, dérangé par des créatures de contes de fées ?",
    "options": [
      "Shrek",
      "Hotel Transylvania",
      "Trolls",
      "Les Croods"
    ],
    "reponse": 0
  },
  {
    "id": "q0565",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 575 - 433 ?",
    "options": [
      "140",
      "141",
      "142",
      "145"
    ],
    "reponse": 2
  },
  {
    "id": "q0566",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 851 + 654 ?",
    "options": [
      "1507",
      "1503",
      "1505",
      "1506"
    ],
    "reponse": 2
  },
  {
    "id": "q0567",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Guinée-Bissau ?",
    "options": [
      "Franc congolais",
      "Franc CFA",
      "Couronne suédoise",
      "Riyal qatari"
    ],
    "reponse": 1
  },
  {
    "id": "q0568",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle romancière britannique du XIXe siècle a écrit « Orgueil et Préjugés » ?",
    "options": [
      "Emily Brontë",
      "Charlotte Brontë",
      "Jane Austen",
      "George Eliot"
    ],
    "reponse": 2
  },
  {
    "id": "q0569",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 84 ÷ 6 ?",
    "options": [
      "15",
      "16",
      "14",
      "11"
    ],
    "reponse": 2
  },
  {
    "id": "q0570",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 11 siècle(s) ?",
    "options": [
      "978",
      "1026",
      "1100",
      "1079"
    ],
    "reponse": 2
  },
  {
    "id": "q0571",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCLXXXIV en chiffres romains ?",
    "options": [
      "784",
      "783",
      "794",
      "779"
    ],
    "reponse": 0
  },
  {
    "id": "q0572",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Niger ?",
    "options": [
      "Tugrik",
      "Balboa",
      "Couronne norvégienne",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q0573",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse grecque des moissons et de l'agriculture ?",
    "options": [
      "Héra",
      "Déméter",
      "Perséphone",
      "Hestia"
    ],
    "reponse": 1
  },
  {
    "id": "q0574",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel roi mythique grec a dû résoudre l'énigme du Sphinx pour sauver Thèbes ?",
    "options": [
      "Persée",
      "Thésée",
      "Jason",
      "Œdipe"
    ],
    "reponse": 3
  },
  {
    "id": "q0575",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal africain vit en troupeaux et est connu pour sa grande migration annuelle au Serengeti ?",
    "options": [
      "Le zèbre",
      "Le gnou",
      "L'antilope",
      "La gazelle"
    ],
    "reponse": 1
  },
  {
    "id": "q0576",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film retrace la vie d'un aviateur et cinéaste excentrique nommé Howard Hughes ?",
    "options": [
      "Le Loup de Wall Street",
      "J. Edgar",
      "Aviator",
      "Gatsby le Magnifique"
    ],
    "reponse": 2
  },
  {
    "id": "q0577",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Albanie ?",
    "options": [
      "Oslo",
      "Bruxelles",
      "Douchanbé",
      "Tirana"
    ],
    "reponse": 3
  },
  {
    "id": "q0578",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 20 ?",
    "options": [
      "404",
      "380",
      "414",
      "388"
    ],
    "reponse": 1
  },
  {
    "id": "q0579",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur belge a écrit « Quand on n'a que l'amour » ?",
    "options": [
      "Stromae",
      "Jacques Brel",
      "Salvatore Adamo",
      "Arno"
    ],
    "reponse": 1
  },
  {
    "id": "q0580",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Éthiopie",
      "Ouzbékistan",
      "Ukraine",
      "Corée du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q0581",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCXV en chiffres romains ?",
    "options": [
      "715",
      "710",
      "705",
      "714"
    ],
    "reponse": 0
  },
  {
    "id": "q0582",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de handball sur le terrain ?",
    "options": [
      "8",
      "5",
      "7",
      "6"
    ],
    "reponse": 2
  },
  {
    "id": "q0583",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 518 - 424 ?",
    "options": [
      "91",
      "95",
      "93",
      "94"
    ],
    "reponse": 3
  },
  {
    "id": "q0584",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de tir en équipe, très populaire en e-sport, oppose Terroristes et Anti-Terroristes ?",
    "options": [
      "Valorant",
      "Call of Duty",
      "Rainbow Six Siege",
      "Counter-Strike"
    ],
    "reponse": 3
  },
  {
    "id": "q0585",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est l'unité de mesure de l'intensité du courant électrique ?",
    "options": [
      "Le volt",
      "Le watt",
      "L'ampère",
      "L'ohm"
    ],
    "reponse": 2
  },
  {
    "id": "q0586",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Grèce ?",
    "options": [
      "Shilling ougandais",
      "Peso argentin",
      "Euro",
      "Dollar fidjien"
    ],
    "reponse": 2
  },
  {
    "id": "q0587",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ankara est la capitale de quel pays ?",
    "options": [
      "Turquie",
      "Nicaragua",
      "Lettonie",
      "Guinée équatoriale"
    ],
    "reponse": 0
  },
  {
    "id": "q0588",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 × 6 ?",
    "options": [
      "90",
      "105",
      "96",
      "91"
    ],
    "reponse": 2
  },
  {
    "id": "q0589",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Érythrée ?",
    "options": [
      "Ariary",
      "Birr",
      "Nakfa",
      "Peso uruguayen"
    ],
    "reponse": 2
  },
  {
    "id": "q0590",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Bahamas",
      "Irlande",
      "Costa Rica",
      "Timor oriental"
    ],
    "reponse": 3
  },
  {
    "id": "q0591",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Jamaïque ?",
    "options": [
      "🇧🇫",
      "🇯🇲",
      "🇩🇿",
      "🇩🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q0592",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel courant artistique italien du début du XXe siècle célèbre la vitesse, la machine et la modernité ?",
    "options": [
      "Le fauvisme",
      "Le futurisme",
      "Le constructivisme",
      "Le dadaïsme"
    ],
    "reponse": 1
  },
  {
    "id": "q0593",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film de Stanley Kubrick met en scène un écrivain sombrant dans la folie au sein d'un hôtel isolé et enneigé ?",
    "options": [
      "Shining",
      "Orange mécanique",
      "2001, l'Odyssée de l'espace",
      "Full Metal Jacket"
    ],
    "reponse": 0
  },
  {
    "id": "q0594",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 64 ?",
    "options": [
      "9",
      "8",
      "10",
      "7"
    ],
    "reponse": 1
  },
  {
    "id": "q0595",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série américaine, tournée façon faux documentaire, se déroule dans une entreprise de papier à Scranton ?",
    "options": [
      "Brooklyn Nine-Nine",
      "Community",
      "Parks and Recreation",
      "The Office"
    ],
    "reponse": 3
  },
  {
    "id": "q0596",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel dessert britannique consiste en des couches de fruits, de crème anglaise et de génoise imbibée ?",
    "options": [
      "Le crumble",
      "Le trifle",
      "Le Eton mess",
      "Le sticky toffee pudding"
    ],
    "reponse": 1
  },
  {
    "id": "q0597",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Comores ?",
    "options": [
      "🇦🇷",
      "🇰🇼",
      "🇰🇲",
      "🇶🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q0598",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 27000 g ?",
    "options": [
      "27",
      "31",
      "30",
      "23"
    ],
    "reponse": 0
  },
  {
    "id": "q0599",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 111600 s ?",
    "options": [
      "25",
      "33",
      "36",
      "31"
    ],
    "reponse": 3
  },
  {
    "id": "q0600",
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
    "id": "q0601",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Tanzanie",
      "Irak",
      "Suède",
      "Nouvelle-Zélande"
    ],
    "reponse": 0
  },
  {
    "id": "q0602",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Quel nombre représente LIV en chiffres romains ?",
    "options": [
      "54",
      "56",
      "53",
      "44"
    ],
    "reponse": 0
  },
  {
    "id": "q0603",
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
    "id": "q0604",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le gaz le plus abondant dans l'atmosphère terrestre ?",
    "options": [
      "L'azote",
      "Le dioxyde de carbone",
      "L'oxygène",
      "L'argon"
    ],
    "reponse": 0
  },
  {
    "id": "q0605",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de basket-ball sur le terrain ?",
    "options": [
      "7",
      "4",
      "6",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q0606",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays a la plus grande superficie du monde ?",
    "options": [
      "Le Canada",
      "La Russie",
      "Les États-Unis",
      "La Chine"
    ],
    "reponse": 1
  },
  {
    "id": "q0607",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 20 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "4e siècle",
      "2e siècle",
      "3e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0608",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Turquie ?",
    "options": [
      "Europe",
      "Afrique",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0609",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 ÷ 10 ?",
    "options": [
      "9",
      "11",
      "7",
      "6"
    ],
    "reponse": 0
  },
  {
    "id": "q0610",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve États-Unis ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q0611",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 636 + 702 ?",
    "options": [
      "1339",
      "1338",
      "1341",
      "1336"
    ],
    "reponse": 1
  },
  {
    "id": "q0612",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 347 + 777 ?",
    "options": [
      "1127",
      "1125",
      "1124",
      "1121"
    ],
    "reponse": 2
  },
  {
    "id": "q0613",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 26 cl ?",
    "options": [
      "220",
      "276",
      "260",
      "225"
    ],
    "reponse": 2
  },
  {
    "id": "q0614",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Zambie ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q0615",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse égyptienne de la vérité et de l'ordre cosmique pèse le cœur des défunts face à une plume ?",
    "options": [
      "Hathor",
      "Maât",
      "Sekhmet",
      "Isis"
    ],
    "reponse": 1
  },
  {
    "id": "q0616",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 × 7 ?",
    "options": [
      "20",
      "21",
      "17",
      "24"
    ],
    "reponse": 1
  },
  {
    "id": "q0617",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel format d'image est souvent utilisé pour les photos avec compression, portant l'extension .jpg ?",
    "options": [
      "BMP",
      "GIF",
      "PNG",
      "JPEG"
    ],
    "reponse": 3
  },
  {
    "id": "q0618",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCXLI en chiffres romains ?",
    "options": [
      "1341",
      "1351",
      "1343",
      "1339"
    ],
    "reponse": 0
  },
  {
    "id": "q0619",
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
    "id": "q0620",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Zn » ?",
    "options": [
      "Or",
      "Bismuth",
      "Zinc",
      "Osmium"
    ],
    "reponse": 2
  },
  {
    "id": "q0621",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Haïti",
      "Eswatini",
      "Kirghizstan",
      "Guinée"
    ],
    "reponse": 3
  },
  {
    "id": "q0622",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Rwanda ?",
    "options": [
      "🇪🇷",
      "🇱🇻",
      "🇲🇲",
      "🇷🇼"
    ],
    "reponse": 3
  },
  {
    "id": "q0623",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 80 ?",
    "options": [
      "10",
      "15",
      "11",
      "12"
    ],
    "reponse": 3
  },
  {
    "id": "q0624",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 4 t ?",
    "options": [
      "3778",
      "4195",
      "4322",
      "4000"
    ],
    "reponse": 3
  },
  {
    "id": "q0625",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type de rayonnement électromagnétique permet de chauffer les aliments dans un four domestique ?",
    "options": [
      "Les micro-ondes",
      "Les ultraviolets",
      "Les rayons X",
      "Les infrarouges"
    ],
    "reponse": 0
  },
  {
    "id": "q0626",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Les rayures de chaque zèbre sont-elles identiques à celles des autres zèbres ?",
    "options": [
      "Non, chaque motif est unique comme une empreinte",
      "Oui, mais seulement chez les mâles",
      "Non, elles changent chaque année",
      "Oui, elles sont identiques au sein de l'espèce"
    ],
    "reponse": 0
  },
  {
    "id": "q0627",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 100 + 593 ?",
    "options": [
      "691",
      "692",
      "694",
      "693"
    ],
    "reponse": 3
  },
  {
    "id": "q0628",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Abuja est la capitale de quel pays ?",
    "options": [
      "Nigeria",
      "Soudan",
      "Émirats arabes unis",
      "Biélorussie"
    ],
    "reponse": 0
  },
  {
    "id": "q0629",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 210 ÷ 14 ?",
    "options": [
      "14",
      "16",
      "15",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q0630",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Pakistan",
      "Mongolie",
      "Biélorussie",
      "Gambie"
    ],
    "reponse": 0
  },
  {
    "id": "q0631",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCXLII en chiffres romains ?",
    "options": [
      "1242",
      "1252",
      "1240",
      "1247"
    ],
    "reponse": 0
  },
  {
    "id": "q0632",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « K » ?",
    "options": [
      "Soufre",
      "Platine",
      "Potassium",
      "Magnésium"
    ],
    "reponse": 2
  },
  {
    "id": "q0633",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quelle partie du corps utilise principalement un serpent pour détecter les odeurs ?",
    "options": [
      "La langue",
      "Le nez",
      "Les écailles",
      "Les yeux"
    ],
    "reponse": 0
  },
  {
    "id": "q0634",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur hongrois a écrit les « Rhapsodies hongroises » pour piano ?",
    "options": [
      "Zoltán Kodály",
      "Johannes Brahms",
      "Béla Bartók",
      "Franz Liszt"
    ],
    "reponse": 3
  },
  {
    "id": "q0635",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 180 année(s) ?",
    "options": [
      "17",
      "18",
      "16",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q0636",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel auteur grec antique est considéré comme le père de la comédie, avec des pièces comme « Les Grenouilles » ?",
    "options": [
      "Sophocle",
      "Eschyle",
      "Aristophane",
      "Ménandre"
    ],
    "reponse": 2
  },
  {
    "id": "q0637",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guinée équatoriale ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q0638",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel petit mammifère européen aux piquants se met en boule face au danger et hiberne l'hiver ?",
    "options": [
      "Le hérisson",
      "Le renard",
      "Le loup",
      "Le sanglier"
    ],
    "reponse": 0
  },
  {
    "id": "q0639",
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
    "id": "q0640",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Ytterbium ?",
    "options": [
      "B",
      "H",
      "Yb",
      "Hg"
    ],
    "reponse": 2
  },
  {
    "id": "q0641",
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
    "id": "q0642",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel est le nom du héros habillé de vert dans la saga « The Legend of Zelda » ?",
    "options": [
      "Ganon",
      "Impa",
      "Zelda",
      "Link"
    ],
    "reponse": 3
  },
  {
    "id": "q0643",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Molybdène ?",
    "options": [
      "Ca",
      "Mo",
      "O",
      "Ba"
    ],
    "reponse": 1
  },
  {
    "id": "q0644",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 807 + 994 ?",
    "options": [
      "1804",
      "1803",
      "1802",
      "1801"
    ],
    "reponse": 3
  },
  {
    "id": "q0645",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Macédoine du Nord ?",
    "options": [
      "Port-Vila",
      "Le Caire",
      "Rabat",
      "Skopje"
    ],
    "reponse": 3
  },
  {
    "id": "q0646",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Amman est la capitale de quel pays ?",
    "options": [
      "Jordanie",
      "Honduras",
      "Italie",
      "Japon"
    ],
    "reponse": 0
  },
  {
    "id": "q0647",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 100 ?",
    "options": [
      "12",
      "10",
      "9",
      "7"
    ],
    "reponse": 1
  },
  {
    "id": "q0648",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Laos ?",
    "options": [
      "Kingston",
      "Bamako",
      "Sofia",
      "Vientiane"
    ],
    "reponse": 3
  },
  {
    "id": "q0649",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 33 année(s) ?",
    "options": [
      "396",
      "453",
      "367",
      "394"
    ],
    "reponse": 0
  },
  {
    "id": "q0650",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Luxembourg",
      "Norvège",
      "Liberia",
      "Mali"
    ],
    "reponse": 2
  },
  {
    "id": "q0651",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Indonésie ?",
    "options": [
      "🇮🇩",
      "🇪🇹",
      "🇦🇲",
      "🇰🇲"
    ],
    "reponse": 0
  },
  {
    "id": "q0652",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la Barbade ?",
    "options": [
      "Budapest",
      "Port-au-Prince",
      "Bridgetown",
      "Tirana"
    ],
    "reponse": 2
  },
  {
    "id": "q0653",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays insulaire d'Océanie est aussi un continent ?",
    "options": [
      "La Papouasie-Nouvelle-Guinée",
      "L'Australie",
      "Les Fidji",
      "La Nouvelle-Zélande"
    ],
    "reponse": 1
  },
  {
    "id": "q0654",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCV en chiffres romains ?",
    "options": [
      "3300",
      "3305",
      "3304",
      "3307"
    ],
    "reponse": 1
  },
  {
    "id": "q0655",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle particule, découverte en 2012 au CERN, est surnommée la « particule de Dieu » ?",
    "options": [
      "Le gluon",
      "Le quark top",
      "Le boson de Higgs",
      "Le neutrino"
    ],
    "reponse": 2
  },
  {
    "id": "q0656",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 100 ?",
    "options": [
      "58",
      "50",
      "42",
      "45"
    ],
    "reponse": 1
  },
  {
    "id": "q0657",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Bi » ?",
    "options": [
      "Mercure",
      "Hydrogène",
      "Bismuth",
      "Tantale"
    ],
    "reponse": 2
  },
  {
    "id": "q0658",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 441 ?",
    "options": [
      "22",
      "19",
      "21",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q0659",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Singapour ?",
    "options": [
      "🇹🇱",
      "🇪🇬",
      "🇭🇺",
      "🇸🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q0660",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCXXIX en chiffres romains ?",
    "options": [
      "1329",
      "1327",
      "1324",
      "1339"
    ],
    "reponse": 0
  },
  {
    "id": "q0661",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇼🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Maroc",
      "Samoa",
      "Belize",
      "Mongolie"
    ],
    "reponse": 1
  },
  {
    "id": "q0662",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Trinité-et-Tobago ?",
    "options": [
      "Afrique",
      "Amérique du Sud",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0663",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Silicium ?",
    "options": [
      "Dy",
      "Si",
      "Eu",
      "Au"
    ],
    "reponse": 1
  },
  {
    "id": "q0664",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 300 ?",
    "options": [
      "30",
      "34",
      "31",
      "27"
    ],
    "reponse": 0
  },
  {
    "id": "q0665",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Singapour ?",
    "options": [
      "Europe",
      "Afrique",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q0666",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCLXXIX en chiffres romains ?",
    "options": [
      "281",
      "278",
      "289",
      "279"
    ],
    "reponse": 3
  },
  {
    "id": "q0667",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Vanuatu ?",
    "options": [
      "Dinar libyen",
      "Vatu",
      "Dollar fidjien",
      "Dram"
    ],
    "reponse": 1
  },
  {
    "id": "q0668",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 886 + 914 ?",
    "options": [
      "1802",
      "1799",
      "1803",
      "1800"
    ],
    "reponse": 3
  },
  {
    "id": "q0669",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 2200 cm ?",
    "options": [
      "22",
      "24",
      "26",
      "21"
    ],
    "reponse": 0
  },
  {
    "id": "q0670",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Sénégal ?",
    "options": [
      "Kaboul",
      "Vilnius",
      "Dakar",
      "Helsinki"
    ],
    "reponse": 2
  },
  {
    "id": "q0671",
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
    "id": "q0672",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mn » ?",
    "options": [
      "Brome",
      "Thorium",
      "Rubidium",
      "Manganèse"
    ],
    "reponse": 3
  },
  {
    "id": "q0673",
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
    "id": "q0674",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 20 mm ?",
    "options": [
      "-1",
      "0",
      "5",
      "2"
    ],
    "reponse": 3
  },
  {
    "id": "q0675",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 × 2 ?",
    "options": [
      "19",
      "28",
      "24",
      "23"
    ],
    "reponse": 2
  },
  {
    "id": "q0676",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 27 ÷ 3 ?",
    "options": [
      "6",
      "7",
      "8",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q0677",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2001 en chiffres romains ?",
    "options": [
      "MMVI",
      "MMI",
      "MCMXCVI",
      "MMXI"
    ],
    "reponse": 1
  },
  {
    "id": "q0678",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 80 ?",
    "options": [
      "26",
      "23",
      "24",
      "22"
    ],
    "reponse": 2
  },
  {
    "id": "q0679",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel érudit français a déchiffré les hiéroglyphes égyptiens en 1822 grâce à une célèbre stèle trilingue ?",
    "options": [
      "Howard Carter",
      "Jean-François Champollion",
      "Auguste Mariette",
      "Gaston Maspero"
    ],
    "reponse": 1
  },
  {
    "id": "q0680",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Hélium ?",
    "options": [
      "He",
      "In",
      "Rh",
      "Th"
    ],
    "reponse": 0
  },
  {
    "id": "q0681",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCLXXXVI en chiffres romains ?",
    "options": [
      "3687",
      "3686",
      "3681",
      "3688"
    ],
    "reponse": 1
  },
  {
    "id": "q0682",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kiev est la capitale de quel pays ?",
    "options": [
      "Guinée",
      "Ukraine",
      "Bangladesh",
      "Paraguay"
    ],
    "reponse": 1
  },
  {
    "id": "q0683",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 169 ?",
    "options": [
      "15",
      "13",
      "14",
      "11"
    ],
    "reponse": 1
  },
  {
    "id": "q0684",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle était la demeure emblématique d'Elvis Presley à Memphis, aujourd'hui transformée en musée ?",
    "options": [
      "Xanadu",
      "Chatsworth House",
      "Graceland",
      "Neverland"
    ],
    "reponse": 2
  },
  {
    "id": "q0685",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 583 + 230 ?",
    "options": [
      "814",
      "811",
      "813",
      "815"
    ],
    "reponse": 2
  },
  {
    "id": "q0686",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le nom du plus grand poisson du monde ?",
    "options": [
      "Le requin baleine",
      "La raie manta",
      "L'espadon",
      "Le grand requin blanc"
    ],
    "reponse": 0
  },
  {
    "id": "q0687",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1860 et 2010 ?",
    "options": [
      "167",
      "161",
      "150",
      "157"
    ],
    "reponse": 2
  },
  {
    "id": "q0688",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1351 appartient à quel siècle ?",
    "options": [
      "14e siècle",
      "15e siècle",
      "13e siècle",
      "12e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q0689",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 173 + 728 ?",
    "options": [
      "900",
      "898",
      "901",
      "904"
    ],
    "reponse": 2
  },
  {
    "id": "q0690",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 9 ?",
    "options": [
      "151",
      "169",
      "146",
      "153"
    ],
    "reponse": 3
  },
  {
    "id": "q0691",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3362 en chiffres romains ?",
    "options": [
      "MMMCCCLX",
      "MMMCCCLXIV",
      "MMMCCCLII",
      "MMMCCCLXII"
    ],
    "reponse": 3
  },
  {
    "id": "q0692",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Fidji ?",
    "options": [
      "🇲🇿",
      "🇨🇳",
      "🇰🇼",
      "🇫🇯"
    ],
    "reponse": 3
  },
  {
    "id": "q0693",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Vietnam ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q0694",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Géorgie ?",
    "options": [
      "🇬🇪",
      "🇪🇪",
      "🇳🇿",
      "🇪🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q0695",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Antimoine ?",
    "options": [
      "Sb",
      "Li",
      "Rh",
      "Bi"
    ],
    "reponse": 0
  },
  {
    "id": "q0696",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel romancier russe est l'auteur d'« Anna Karénine » ?",
    "options": [
      "Anton Tchekhov",
      "Fiodor Dostoïevski",
      "Léon Tolstoï",
      "Ivan Tourgueniev"
    ],
    "reponse": 2
  },
  {
    "id": "q0697",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de hard rock australien est connu pour « Highway to Hell » et « Back in Black » ?",
    "options": [
      "AC/DC",
      "Metallica",
      "Guns N' Roses",
      "Def Leppard"
    ],
    "reponse": 0
  },
  {
    "id": "q0698",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « W » ?",
    "options": [
      "Aluminium",
      "Platine",
      "Tungstène",
      "Néodyme"
    ],
    "reponse": 2
  },
  {
    "id": "q0699",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Australie ?",
    "options": [
      "🇨🇾",
      "🇦🇺",
      "🇰🇼",
      "🇹🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q0700",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCL en chiffres romains ?",
    "options": [
      "1151",
      "1145",
      "1150",
      "1160"
    ],
    "reponse": 2
  },
  {
    "id": "q0701",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 103 + 758 ?",
    "options": [
      "861",
      "860",
      "858",
      "864"
    ],
    "reponse": 0
  },
  {
    "id": "q0702",
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
    "id": "q0703",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Liechtenstein ?",
    "options": [
      "Franc suisse",
      "Dollar bahaméen",
      "Kwanza",
      "Yen"
    ],
    "reponse": 0
  },
  {
    "id": "q0704",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel chercheur a découvert la pénicilline en 1928 ?",
    "options": [
      "Jonas Salk",
      "Robert Koch",
      "Alexander Fleming",
      "Louis Pasteur"
    ],
    "reponse": 2
  },
  {
    "id": "q0705",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1658 et 1759 ?",
    "options": [
      "114",
      "98",
      "101",
      "97"
    ],
    "reponse": 2
  },
  {
    "id": "q0706",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ukraine ?",
    "options": [
      "Port-Vila",
      "Brazzaville",
      "Kiev",
      "Mexico"
    ],
    "reponse": 2
  },
  {
    "id": "q0707",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Koweït",
      "Tadjikistan",
      "Arabie saoudite",
      "Andorre"
    ],
    "reponse": 0
  },
  {
    "id": "q0708",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 831 - 681 ?",
    "options": [
      "147",
      "153",
      "150",
      "152"
    ],
    "reponse": 2
  },
  {
    "id": "q0709",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien y a-t-il d'os dans le corps humain adulte ?",
    "options": [
      "196",
      "186",
      "216",
      "206"
    ],
    "reponse": 3
  },
  {
    "id": "q0710",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ra » ?",
    "options": [
      "Europium",
      "Radium",
      "Scandium",
      "Germanium"
    ],
    "reponse": 1
  },
  {
    "id": "q0711",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ljubljana est la capitale de quel pays ?",
    "options": [
      "Slovénie",
      "République démocratique du Congo",
      "Vanuatu",
      "Ouzbékistan"
    ],
    "reponse": 0
  },
  {
    "id": "q0712",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Zambie ?",
    "options": [
      "Dakar",
      "Hanoï",
      "Lusaka",
      "Tokyo"
    ],
    "reponse": 2
  },
  {
    "id": "q0713",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 60 ?",
    "options": [
      "5",
      "3",
      "4",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q0714",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de temps dure un match de football hors prolongations ?",
    "options": [
      "90 minutes",
      "100 minutes",
      "80 minutes",
      "120 minutes"
    ],
    "reponse": 0
  },
  {
    "id": "q0715",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel mathématicien britannique, précurseur de l'informatique moderne, a conçu une machine théorique de calcul et contribué au déchiffrement du code Enigma pendant la Seconde Guerre mondiale ?",
    "options": [
      "Charles Babbage",
      "Claude Shannon",
      "Alan Turing",
      "John von Neumann"
    ],
    "reponse": 2
  },
  {
    "id": "q0716",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇧 De quel pays est-ce le drapeau ?",
    "options": [
      "Sierra Leone",
      "Guinée-Bissau",
      "États-Unis",
      "Liban"
    ],
    "reponse": 3
  },
  {
    "id": "q0717",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Belgrade est la capitale de quel pays ?",
    "options": [
      "Ukraine",
      "Italie",
      "Chine",
      "Serbie"
    ],
    "reponse": 3
  },
  {
    "id": "q0718",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel rappeur américain est surnommé « Slim Shady » ?",
    "options": [
      "Snoop Dogg",
      "50 Cent",
      "Jay-Z",
      "Eminem"
    ],
    "reponse": 3
  },
  {
    "id": "q0719",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 230 année(s) ?",
    "options": [
      "23",
      "26",
      "27",
      "19"
    ],
    "reponse": 0
  },
  {
    "id": "q0720",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 701 - 642 ?",
    "options": [
      "59",
      "57",
      "60",
      "61"
    ],
    "reponse": 0
  },
  {
    "id": "q0721",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Vietnam ?",
    "options": [
      "Santiago",
      "Bangkok",
      "Antananarivo",
      "Hanoï"
    ],
    "reponse": 3
  },
  {
    "id": "q0722",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Nd » ?",
    "options": [
      "Calcium",
      "Béryllium",
      "Néodyme",
      "Sélénium"
    ],
    "reponse": 2
  },
  {
    "id": "q0723",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel auteur-compositeur américain a reçu le prix Nobel de littérature en 2016 ?",
    "options": [
      "Bob Dylan",
      "Neil Young",
      "Leonard Cohen",
      "Bruce Springsteen"
    ],
    "reponse": 0
  },
  {
    "id": "q0724",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle et de survie post-apocalyptique met en scène Joel et Ellie ?",
    "options": [
      "Fallout",
      "The Last of Us",
      "Days Gone",
      "State of Decay"
    ],
    "reponse": 1
  },
  {
    "id": "q0725",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 4 ?",
    "options": [
      "40",
      "36",
      "41",
      "38"
    ],
    "reponse": 1
  },
  {
    "id": "q0726",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ukraine ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Afrique",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q0727",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Buenos Aires est la capitale de quel pays ?",
    "options": [
      "Argentine",
      "République tchèque",
      "Algérie",
      "Pologne"
    ],
    "reponse": 0
  },
  {
    "id": "q0728",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Maroc ?",
    "options": [
      "🇲🇦",
      "🇱🇹",
      "🇪🇬",
      "🇬🇾"
    ],
    "reponse": 0
  },
  {
    "id": "q0729",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Côte d'Ivoire",
      "Nigeria",
      "Koweït",
      "Japon"
    ],
    "reponse": 1
  },
  {
    "id": "q0730",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 220 + 47 ?",
    "options": [
      "269",
      "267",
      "270",
      "265"
    ],
    "reponse": 1
  },
  {
    "id": "q0731",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Géorgie ?",
    "options": [
      "Lari",
      "Metical",
      "Gourde",
      "Dollar guyanien"
    ],
    "reponse": 0
  },
  {
    "id": "q0732",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 au carré ?",
    "options": [
      "21",
      "23",
      "25",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q0733",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "En quelle année les treize colonies américaines ont-elles proclamé leur indépendance vis-à-vis du Royaume-Uni ?",
    "options": [
      "1789",
      "1783",
      "1776",
      "1774"
    ],
    "reponse": 2
  },
  {
    "id": "q0734",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de joueurs compose une équipe de volley-ball sur le terrain ?",
    "options": [
      "6",
      "4",
      "5",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q0735",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle cité antique fut, selon la légende et l'archéologie, assiégée dix ans par les Grecs à cause d'Hélène ?",
    "options": [
      "Sparte",
      "Mycènes",
      "Thèbes",
      "Troie"
    ],
    "reponse": 3
  },
  {
    "id": "q0736",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Estonie ?",
    "options": [
      "Dinar serbe",
      "Mark convertible",
      "Cordoba",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q0737",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur américain a mis en scène « Les Affranchis » et « Taxi Driver » ?",
    "options": [
      "Michael Cimino",
      "Brian De Palma",
      "Martin Scorsese",
      "Francis Ford Coppola"
    ],
    "reponse": 2
  },
  {
    "id": "q0738",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle chanteuse britannique, disparue en 2011, est connue pour l'album « Back to Black » ?",
    "options": [
      "Adele",
      "Florence Welch",
      "Amy Winehouse",
      "Duffy"
    ],
    "reponse": 2
  },
  {
    "id": "q0739",
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
    "id": "q0740",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Thorium ?",
    "options": [
      "Rb",
      "Sm",
      "Te",
      "Th"
    ],
    "reponse": 3
  },
  {
    "id": "q0741",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Uruguay ?",
    "options": [
      "Peso uruguayen",
      "Dollar namibien",
      "Dollar zimbabwéen",
      "Peso argentin"
    ],
    "reponse": 0
  },
  {
    "id": "q0742",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 300 ?",
    "options": [
      "142",
      "141",
      "165",
      "150"
    ],
    "reponse": 3
  },
  {
    "id": "q0743",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Madagascar ?",
    "options": [
      "🇲🇦",
      "🇲🇬",
      "🇪🇨",
      "🇻🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q0744",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 40 ÷ 10 ?",
    "options": [
      "1",
      "5",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q0745",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 839 - 269 ?",
    "options": [
      "571",
      "573",
      "568",
      "570"
    ],
    "reponse": 3
  },
  {
    "id": "q0746",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 × 12 ?",
    "options": [
      "143",
      "135",
      "133",
      "144"
    ],
    "reponse": 3
  },
  {
    "id": "q0747",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle déesse grecque personnifie la Terre nourricière, mère des Titans ?",
    "options": [
      "Rhéa",
      "Déméter",
      "Gaïa",
      "Héra"
    ],
    "reponse": 2
  },
  {
    "id": "q0748",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Nigeria ?",
    "options": [
      "Moroni",
      "Tbilissi",
      "Abuja",
      "Asuncion"
    ],
    "reponse": 2
  },
  {
    "id": "q0749",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel courant architectural du XXe siècle, épuré et fonctionnel, est associé à des architectes comme Le Corbusier ?",
    "options": [
      "Le brutalisme",
      "Le postmodernisme",
      "L'Art déco",
      "Le mouvement moderne"
    ],
    "reponse": 3
  },
  {
    "id": "q0750",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 au carré ?",
    "options": [
      "973",
      "900",
      "981",
      "840"
    ],
    "reponse": 1
  },
  {
    "id": "q0751",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Séoul est la capitale de quel pays ?",
    "options": [
      "Allemagne",
      "Guinée équatoriale",
      "Corée du Sud",
      "Bahreïn"
    ],
    "reponse": 2
  },
  {
    "id": "q0752",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sm » ?",
    "options": [
      "Phosphore",
      "Samarium",
      "Radium",
      "Strontium"
    ],
    "reponse": 1
  },
  {
    "id": "q0753",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1769 et 2007 ?",
    "options": [
      "210",
      "276",
      "250",
      "238"
    ],
    "reponse": 3
  },
  {
    "id": "q0754",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Paraguay ?",
    "options": [
      "Sol péruvien",
      "Dollar bahaméen",
      "Leu roumain",
      "Guarani"
    ],
    "reponse": 3
  },
  {
    "id": "q0755",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel est approximativement le poids du cœur d'une baleine bleue, souvent comparé à celui d'une petite voiture ?",
    "options": [
      "Environ 20 kg",
      "Environ 1000 kg",
      "Environ 500 kg",
      "Environ 180 kg"
    ],
    "reponse": 3
  },
  {
    "id": "q0756",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 38 m ?",
    "options": [
      "3862",
      "3800",
      "3665",
      "3631"
    ],
    "reponse": 1
  },
  {
    "id": "q0757",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays possède la plus longue frontière terrestre avec les États-Unis ?",
    "options": [
      "Le Mexique",
      "Cuba",
      "Le Canada",
      "Le Groenland"
    ],
    "reponse": 2
  },
  {
    "id": "q0758",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 8 × 20 ?",
    "options": [
      "160",
      "167",
      "143",
      "158"
    ],
    "reponse": 0
  },
  {
    "id": "q0759",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 262 en chiffres romains ?",
    "options": [
      "CCLVII",
      "CCLXIV",
      "CCLII",
      "CCLXII"
    ],
    "reponse": 3
  },
  {
    "id": "q0760",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 15000 kg ?",
    "options": [
      "14",
      "15",
      "12",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q0761",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 6 jour(s) ?",
    "options": [
      "145",
      "144",
      "119",
      "121"
    ],
    "reponse": 1
  },
  {
    "id": "q0762",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Yaoundé est la capitale de quel pays ?",
    "options": [
      "Paraguay",
      "Mongolie",
      "Tadjikistan",
      "Cameroun"
    ],
    "reponse": 3
  },
  {
    "id": "q0763",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 60 ?",
    "options": [
      "15",
      "12",
      "13",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q0764",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs sur le terrain compose une équipe de football américain (en attaque ou défense) ?",
    "options": [
      "12",
      "10",
      "9",
      "11"
    ],
    "reponse": 3
  },
  {
    "id": "q0765",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1877 en chiffres romains ?",
    "options": [
      "MDCCCLXXVIII",
      "MDCCCLXXII",
      "MDCCCLXXXII",
      "MDCCCLXXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q0766",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 14 au carré ?",
    "options": [
      "199",
      "196",
      "210",
      "205"
    ],
    "reponse": 1
  },
  {
    "id": "q0767",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sc » ?",
    "options": [
      "Platine",
      "Francium",
      "Oxygène",
      "Scandium"
    ],
    "reponse": 3
  },
  {
    "id": "q0768",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle est la plus grande forêt tropicale du monde ?",
    "options": [
      "La forêt amazonienne",
      "La forêt de Sibérie",
      "La forêt du bassin du Congo",
      "La forêt de Bornéo"
    ],
    "reponse": 0
  },
  {
    "id": "q0769",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Lettonie ?",
    "options": [
      "🇱🇻",
      "🇲🇷",
      "🇺🇸",
      "🇰🇭"
    ],
    "reponse": 0
  },
  {
    "id": "q0770",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCXXIX en chiffres romains ?",
    "options": [
      "2228",
      "2219",
      "2229",
      "2231"
    ],
    "reponse": 2
  },
  {
    "id": "q0771",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCLXXIX en chiffres romains ?",
    "options": [
      "3377",
      "3379",
      "3369",
      "3384"
    ],
    "reponse": 1
  },
  {
    "id": "q0772",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 au carré ?",
    "options": [
      "35",
      "36",
      "38",
      "37"
    ],
    "reponse": 1
  },
  {
    "id": "q0773",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Guyana ?",
    "options": [
      "Tegucigalpa",
      "Georgetown",
      "Madrid",
      "Amsterdam"
    ],
    "reponse": 1
  },
  {
    "id": "q0774",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel pays est né le rugby ?",
    "options": [
      "La France",
      "L'Angleterre",
      "L'Écosse",
      "Le Pays de Galles"
    ],
    "reponse": 1
  },
  {
    "id": "q0775",
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
    "id": "q0776",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ouganda ?",
    "options": [
      "🇬🇲",
      "🇱🇦",
      "🇲🇼",
      "🇺🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q0777",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1119 et 1202 ?",
    "options": [
      "71",
      "78",
      "95",
      "83"
    ],
    "reponse": 3
  },
  {
    "id": "q0778",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCXXXIII en chiffres romains ?",
    "options": [
      "1343",
      "1338",
      "1334",
      "1333"
    ],
    "reponse": 3
  },
  {
    "id": "q0779",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel héros troyen fonde Rome selon la légende, dans l'Énéide de Virgile ?",
    "options": [
      "Énée",
      "Hector",
      "Romulus",
      "Ulysse"
    ],
    "reponse": 0
  },
  {
    "id": "q0780",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays possède le plus de fjords célèbres ?",
    "options": [
      "La Norvège",
      "L'Islande",
      "Le Danemark",
      "La Suède"
    ],
    "reponse": 0
  },
  {
    "id": "q0781",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Inde ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0782",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Équateur ?",
    "options": [
      "Tirana",
      "Dublin",
      "Quito",
      "Helsinki"
    ],
    "reponse": 2
  },
  {
    "id": "q0783",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "République dominicaine",
      "Danemark",
      "Arabie saoudite",
      "Jordanie"
    ],
    "reponse": 2
  },
  {
    "id": "q0784",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse égyptienne de la magie et de la maternité, épouse d'Osiris ?",
    "options": [
      "Hathor",
      "Bastet",
      "Nephtys",
      "Isis"
    ],
    "reponse": 3
  },
  {
    "id": "q0785",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel roman médiéval met en scène un chevalier de la Table ronde amoureux de la reine Guenièvre ?",
    "options": [
      "Lancelot ou le Chevalier de la charrette",
      "Yvain ou le Chevalier au lion",
      "Érec et Énide",
      "Perceval ou le Conte du Graal"
    ],
    "reponse": 0
  },
  {
    "id": "q0786",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Érythrée ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q0787",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Au » ?",
    "options": [
      "Terbium",
      "Aluminium",
      "Or",
      "Iode"
    ],
    "reponse": 2
  },
  {
    "id": "q0788",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 × 6 ?",
    "options": [
      "135",
      "120",
      "127",
      "132"
    ],
    "reponse": 1
  },
  {
    "id": "q0789",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 20 ?",
    "options": [
      "-1",
      "2",
      "1",
      "0"
    ],
    "reponse": 1
  },
  {
    "id": "q0790",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCDXCI en chiffres romains ?",
    "options": [
      "1491",
      "1493",
      "1486",
      "1501"
    ],
    "reponse": 0
  },
  {
    "id": "q0791",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Manama est la capitale de quel pays ?",
    "options": [
      "Belize",
      "Bahreïn",
      "Kenya",
      "Colombie"
    ],
    "reponse": 1
  },
  {
    "id": "q0792",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Dans quelle structure de la cellule végétale se déroule la photosynthèse ?",
    "options": [
      "Le noyau",
      "Le vacuole",
      "La mitochondrie",
      "Le chloroplaste"
    ],
    "reponse": 3
  },
  {
    "id": "q0793",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Iran ?",
    "options": [
      "Mark convertible",
      "Dinar bahreïni",
      "Rial iranien",
      "Yuan"
    ],
    "reponse": 2
  },
  {
    "id": "q0794",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 345 en chiffres romains ?",
    "options": [
      "CCCXLIII",
      "CCCXLV",
      "CCCXXXV",
      "CCCXL"
    ],
    "reponse": 1
  },
  {
    "id": "q0795",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Burkina Faso ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Afrique",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q0796",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 190 + 778 ?",
    "options": [
      "967",
      "966",
      "969",
      "968"
    ],
    "reponse": 3
  },
  {
    "id": "q0797",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1516 en chiffres romains ?",
    "options": [
      "MDXVI",
      "MDXI",
      "MDVI",
      "MDXXVI"
    ],
    "reponse": 0
  },
  {
    "id": "q0798",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Égypte ?",
    "options": [
      "Océanie",
      "Asie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q0799",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kuala Lumpur est la capitale de quel pays ?",
    "options": [
      "Géorgie",
      "Malaisie",
      "Mexique",
      "États-Unis"
    ],
    "reponse": 1
  },
  {
    "id": "q0800",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Chine ?",
    "options": [
      "Franc comorien",
      "Riyal yéménite",
      "Zloty",
      "Yuan"
    ],
    "reponse": 3
  },
  {
    "id": "q0801",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe britannique des années 60 rivalisait avec les Beatles, mené par Mick Jagger ?",
    "options": [
      "The Animals",
      "The Rolling Stones",
      "The Kinks",
      "The Who"
    ],
    "reponse": 1
  },
  {
    "id": "q0802",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Astana est la capitale de quel pays ?",
    "options": [
      "Moldavie",
      "Kazakhstan",
      "Inde",
      "Tunisie"
    ],
    "reponse": 1
  },
  {
    "id": "q0803",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Amsterdam est la capitale de quel pays ?",
    "options": [
      "Pays-Bas",
      "Samoa",
      "Costa Rica",
      "Thaïlande"
    ],
    "reponse": 0
  },
  {
    "id": "q0804",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel artiste espagnol est le fondateur du cubisme avec Georges Braque ?",
    "options": [
      "Pablo Picasso",
      "Antoni Gaudí",
      "Salvador Dalí",
      "Joan Miró"
    ],
    "reponse": 0
  },
  {
    "id": "q0805",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 36 m ?",
    "options": [
      "4015",
      "3600",
      "3846",
      "3423"
    ],
    "reponse": 1
  },
  {
    "id": "q0806",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Koweït ?",
    "options": [
      "🇰🇼",
      "🇲🇩",
      "🇸🇦",
      "🇧🇹"
    ],
    "reponse": 0
  },
  {
    "id": "q0807",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Hongrie ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q0808",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 851 - 297 ?",
    "options": [
      "553",
      "557",
      "556",
      "554"
    ],
    "reponse": 3
  },
  {
    "id": "q0809",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle spécialité japonaise consiste en de fines tranches de poisson cru servies sans riz, contrairement aux sushis ?",
    "options": [
      "Les sashimis",
      "Les temakis",
      "Les makis",
      "Les nigiris"
    ],
    "reponse": 0
  },
  {
    "id": "q0810",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom de la force qui attire les objets vers le centre de la Terre ?",
    "options": [
      "La friction",
      "La gravité",
      "L'inertie",
      "Le magnétisme"
    ],
    "reponse": 1
  },
  {
    "id": "q0811",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel joueur brésilien est souvent considéré comme le plus grand footballeur du XXe siècle, triple champion du monde ?",
    "options": [
      "Ronaldinho",
      "Zico",
      "Pelé",
      "Garrincha"
    ],
    "reponse": 2
  },
  {
    "id": "q0812",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument à cordes se joue avec un archet et se tient sous le menton ?",
    "options": [
      "Le violoncelle",
      "La contrebasse",
      "L'alto",
      "Le violon"
    ],
    "reponse": 3
  },
  {
    "id": "q0813",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇧 De quel pays est-ce le drapeau ?",
    "options": [
      "Qatar",
      "Congo",
      "Royaume-Uni",
      "Bulgarie"
    ],
    "reponse": 2
  },
  {
    "id": "q0814",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 760 - 649 ?",
    "options": [
      "112",
      "111",
      "113",
      "110"
    ],
    "reponse": 1
  },
  {
    "id": "q0815",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est traversé par le tropique du Cancer et possède les pyramides de Gizeh ?",
    "options": [
      "L'Égypte",
      "L'Algérie",
      "Le Maroc",
      "La Libye"
    ],
    "reponse": 0
  },
  {
    "id": "q0816",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel courant artistique du début du XXe siècle, associé à Matisse, utilise des couleurs vives et non naturalistes ?",
    "options": [
      "Le pointillisme",
      "Le fauvisme",
      "Le dadaïsme",
      "Le cubisme"
    ],
    "reponse": 1
  },
  {
    "id": "q0817",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Syrie",
      "République tchèque",
      "Angola",
      "Tanzanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0818",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 28 au carré ?",
    "options": [
      "784",
      "721",
      "759",
      "858"
    ],
    "reponse": 0
  },
  {
    "id": "q0819",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Sierra Leone",
      "Suisse",
      "Maldives",
      "Arménie"
    ],
    "reponse": 0
  },
  {
    "id": "q0820",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur britannique a écrit « Le Portrait de Dorian Gray » ?",
    "options": [
      "Thomas Hardy",
      "Robert Louis Stevenson",
      "George Bernard Shaw",
      "Oscar Wilde"
    ],
    "reponse": 3
  },
  {
    "id": "q0821",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Sous quel pseudonyme se cache le créateur anonyme du Bitcoin ?",
    "options": [
      "Satoshi Nakamoto",
      "Craig Wright",
      "Vitalik Buterin",
      "Hal Finney"
    ],
    "reponse": 0
  },
  {
    "id": "q0822",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Arabie saoudite ?",
    "options": [
      "Océanie",
      "Afrique",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q0823",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 30000 mg ?",
    "options": [
      "36",
      "26",
      "30",
      "31"
    ],
    "reponse": 2
  },
  {
    "id": "q0824",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kigali est la capitale de quel pays ?",
    "options": [
      "Rwanda",
      "Portugal",
      "Estonie",
      "Suriname"
    ],
    "reponse": 0
  },
  {
    "id": "q0825",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel dramaturge anglais a écrit « Hamlet » et « Macbeth » ?",
    "options": [
      "Christopher Marlowe",
      "Oscar Wilde",
      "George Bernard Shaw",
      "William Shakespeare"
    ],
    "reponse": 3
  },
  {
    "id": "q0826",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle ville turque s'étend à la fois sur l'Europe et sur l'Asie, de part et d'autre du Bosphore ?",
    "options": [
      "Ankara",
      "Antalya",
      "Istanbul",
      "Izmir"
    ],
    "reponse": 2
  },
  {
    "id": "q0827",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie « Wi-Fi » désigne quel type de connexion ?",
    "options": [
      "Une connexion filaire",
      "Un langage de programmation",
      "Une connexion réseau sans fil",
      "Un protocole de messagerie"
    ],
    "reponse": 2
  },
  {
    "id": "q0828",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Bahamas ?",
    "options": [
      "Skopje",
      "Nassau",
      "Damas",
      "Tbilissi"
    ],
    "reponse": 1
  },
  {
    "id": "q0829",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est réputé invulnérable sauf au talon ?",
    "options": [
      "Hector",
      "Ajax",
      "Achille",
      "Ulysse"
    ],
    "reponse": 2
  },
  {
    "id": "q0830",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel système traduit les noms de domaine lisibles d'un site web en adresses IP numériques ?",
    "options": [
      "Le FTP",
      "Le SMTP",
      "Le HTTP",
      "Le DNS"
    ],
    "reponse": 3
  },
  {
    "id": "q0831",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur espagnol est connu pour des films oniriques comme « Parle avec elle » et « Tout sur ma mère » ?",
    "options": [
      "Guillermo del Toro",
      "Pedro Almodóvar",
      "Alejandro Amenábar",
      "Luis Buñuel"
    ],
    "reponse": 1
  },
  {
    "id": "q0832",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1158 et 1338 ?",
    "options": [
      "177",
      "180",
      "167",
      "160"
    ],
    "reponse": 1
  },
  {
    "id": "q0833",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse grecque du foyer est la sœur de Zeus, discrète mais très respectée ?",
    "options": [
      "Héra",
      "Déméter",
      "Thémis",
      "Hestia"
    ],
    "reponse": 3
  },
  {
    "id": "q0834",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 96 heure(s) ?",
    "options": [
      "6",
      "2",
      "3",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q0835",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cuivre ?",
    "options": [
      "Cu",
      "Pu",
      "In",
      "Re"
    ],
    "reponse": 0
  },
  {
    "id": "q0836",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 5 ?",
    "options": [
      "67",
      "62",
      "70",
      "69"
    ],
    "reponse": 2
  },
  {
    "id": "q0837",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1065 et 1345 ?",
    "options": [
      "323",
      "317",
      "280",
      "239"
    ],
    "reponse": 2
  },
  {
    "id": "q0838",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 237 + 348 ?",
    "options": [
      "583",
      "584",
      "585",
      "586"
    ],
    "reponse": 2
  },
  {
    "id": "q0839",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 20 l ?",
    "options": [
      "19339",
      "22227",
      "17502",
      "20000"
    ],
    "reponse": 3
  },
  {
    "id": "q0840",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCCLXXXVII en chiffres romains ?",
    "options": [
      "1386",
      "1387",
      "1377",
      "1397"
    ],
    "reponse": 1
  },
  {
    "id": "q0841",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lima est la capitale de quel pays ?",
    "options": [
      "Uruguay",
      "Yémen",
      "Pérou",
      "Burkina Faso"
    ],
    "reponse": 2
  },
  {
    "id": "q0842",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui est l'auteur de la saga « Harry Potter » ?",
    "options": [
      "C.S. Lewis",
      "Roald Dahl",
      "Rick Riordan",
      "J.K. Rowling"
    ],
    "reponse": 3
  },
  {
    "id": "q0843",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Azerbaïdjan ?",
    "options": [
      "🇭🇺",
      "🇮🇸",
      "🇬🇼",
      "🇦🇿"
    ],
    "reponse": 3
  },
  {
    "id": "q0844",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle diva américaine a interprété la chanson « I Will Always Love You » ?",
    "options": [
      "Celine Dion",
      "Whitney Houston",
      "Barbra Streisand",
      "Mariah Carey"
    ],
    "reponse": 1
  },
  {
    "id": "q0845",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 au carré ?",
    "options": [
      "79",
      "73",
      "81",
      "83"
    ],
    "reponse": 2
  },
  {
    "id": "q0846",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 197 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "1e siècle",
      "4e siècle",
      "2e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0847",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "États-Unis",
      "Érythrée",
      "Guyana",
      "Soudan"
    ],
    "reponse": 0
  },
  {
    "id": "q0848",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Iran ?",
    "options": [
      "Afrique",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0849",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des dragons et des maisons rivales, adaptée des romans de George R.R. Martin ?",
    "options": [
      "The Wheel of Time",
      "The Witcher",
      "Game of Thrones",
      "His Dark Materials"
    ],
    "reponse": 2
  },
  {
    "id": "q0850",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle est la capitale la plus élevée en altitude de l'Union européenne ?",
    "options": [
      "Vienne",
      "Berne",
      "Madrid",
      "Sofia"
    ],
    "reponse": 2
  },
  {
    "id": "q0851",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 229 + 457 ?",
    "options": [
      "685",
      "684",
      "686",
      "687"
    ],
    "reponse": 2
  },
  {
    "id": "q0852",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Nouvelle-Zélande",
      "Ouzbékistan",
      "Irlande",
      "Nigeria"
    ],
    "reponse": 2
  },
  {
    "id": "q0853",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation américaine met en scène une famille dysfonctionnelle à Quahog ?",
    "options": [
      "Bob's Burgers",
      "Les Simpson",
      "Family Guy",
      "American Dad"
    ],
    "reponse": 2
  },
  {
    "id": "q0854",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de heavy metal britannique a pour chanteur Bruce Dickinson ?",
    "options": [
      "Deep Purple",
      "Black Sabbath",
      "Judas Priest",
      "Iron Maiden"
    ],
    "reponse": 3
  },
  {
    "id": "q0855",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel conflit a opposé la France et l'Angleterre de façon quasi continue de 1337 à 1453 ?",
    "options": [
      "La guerre de Sept Ans",
      "La Fronde",
      "Les guerres de religion",
      "La guerre de Cent Ans"
    ],
    "reponse": 3
  },
  {
    "id": "q0856",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 324 ?",
    "options": [
      "17",
      "18",
      "16",
      "19"
    ],
    "reponse": 1
  },
  {
    "id": "q0857",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain français a reçu le prix Nobel de littérature en 2014 ?",
    "options": [
      "Patrick Modiano",
      "Jean-Marie Gustave Le Clézio",
      "Annie Ernaux",
      "Michel Houellebecq"
    ],
    "reponse": 0
  },
  {
    "id": "q0858",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur britannique caméléon musical est connu pour son alter ego « Ziggy Stardust » ?",
    "options": [
      "Elton John",
      "Freddie Mercury",
      "David Bowie",
      "Marc Bolan"
    ],
    "reponse": 2
  },
  {
    "id": "q0859",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel Titan a offert le feu aux hommes, défiant les dieux, et fut puni éternellement ?",
    "options": [
      "Atlas",
      "Cronos",
      "Épiméthée",
      "Prométhée"
    ],
    "reponse": 3
  },
  {
    "id": "q0860",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est le leader du groupe The Rolling Stones ?",
    "options": [
      "Mick Jagger",
      "Keith Richards",
      "Ronnie Wood",
      "Charlie Watts"
    ],
    "reponse": 0
  },
  {
    "id": "q0861",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 36 ÷ 3 ?",
    "options": [
      "12",
      "10",
      "11",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q0862",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 421 - 201 ?",
    "options": [
      "218",
      "221",
      "223",
      "220"
    ],
    "reponse": 3
  },
  {
    "id": "q0863",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Estonie",
      "États-Unis",
      "Guyana",
      "Rwanda"
    ],
    "reponse": 2
  },
  {
    "id": "q0864",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Riyad est la capitale de quel pays ?",
    "options": [
      "Somalie",
      "Érythrée",
      "Égypte",
      "Arabie saoudite"
    ],
    "reponse": 3
  },
  {
    "id": "q0865",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel oiseau est associé au facteur en dessin animé et vit en réalité en Antarctique ?",
    "options": [
      "Le manchot",
      "Le pingouin arctique",
      "Le pélican",
      "La cigogne"
    ],
    "reponse": 0
  },
  {
    "id": "q0866",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom du logiciel libre de retouche d'image souvent cité comme alternative gratuite à Photoshop ?",
    "options": [
      "Krita",
      "Blender",
      "GIMP",
      "Inkscape"
    ],
    "reponse": 2
  },
  {
    "id": "q0867",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République démocratique du Congo ?",
    "options": [
      "Afrique",
      "Europe",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0868",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Iran ?",
    "options": [
      "Téhéran",
      "Astana",
      "Accra",
      "Buenos Aires"
    ],
    "reponse": 0
  },
  {
    "id": "q0869",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 16 ?",
    "options": [
      "1",
      "2",
      "4",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q0870",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 51 - 16 ?",
    "options": [
      "34",
      "37",
      "36",
      "35"
    ],
    "reponse": 3
  },
  {
    "id": "q0871",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 667 + 616 ?",
    "options": [
      "1283",
      "1281",
      "1282",
      "1285"
    ],
    "reponse": 0
  },
  {
    "id": "q0872",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 9 ?",
    "options": [
      "72",
      "81",
      "88",
      "84"
    ],
    "reponse": 1
  },
  {
    "id": "q0873",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 153 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "1e siècle",
      "4e siècle",
      "2e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0874",
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
    "id": "q0875",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Honduras ?",
    "options": [
      "Tegucigalpa",
      "Yamoussoukro",
      "Windhoek",
      "Helsinki"
    ],
    "reponse": 0
  },
  {
    "id": "q0876",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel inventeur est crédité de la création du World Wide Web en 1989 ?",
    "options": [
      "Marc Andreessen",
      "Al Gore",
      "Vint Cerf",
      "Tim Berners-Lee"
    ],
    "reponse": 3
  },
  {
    "id": "q0877",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 22000 kg ?",
    "options": [
      "23",
      "18",
      "21",
      "22"
    ],
    "reponse": 3
  },
  {
    "id": "q0878",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ouganda ?",
    "options": [
      "Quetzal",
      "Roupie mauricienne",
      "Dollar jamaïcain",
      "Shilling ougandais"
    ],
    "reponse": 3
  },
  {
    "id": "q0879",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'El Salvador ?",
    "options": [
      "Franc comorien",
      "Dollar américain",
      "Dollar canadien",
      "Colon costaricain"
    ],
    "reponse": 1
  },
  {
    "id": "q0880",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de simulation agricole permet de gérer une ferme héritée d'un grand-père ?",
    "options": [
      "Harvest Moon",
      "Stardew Valley",
      "Animal Crossing",
      "Farming Simulator"
    ],
    "reponse": 1
  },
  {
    "id": "q0881",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Bulgarie",
      "Pérou",
      "Roumanie",
      "Costa Rica"
    ],
    "reponse": 0
  },
  {
    "id": "q0882",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 483 + 736 ?",
    "options": [
      "1220",
      "1219",
      "1222",
      "1221"
    ],
    "reponse": 1
  },
  {
    "id": "q0883",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 298 en chiffres romains ?",
    "options": [
      "CCXCIX",
      "CCXCVIII",
      "CCLXXXVIII",
      "CCXCVI"
    ],
    "reponse": 1
  },
  {
    "id": "q0884",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Qui a réalisé la trilogie « Le Seigneur des anneaux » ?",
    "options": [
      "Steven Spielberg",
      "James Cameron",
      "Ridley Scott",
      "Peter Jackson"
    ],
    "reponse": 3
  },
  {
    "id": "q0885",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Thaïlande ?",
    "options": [
      "Asie",
      "Afrique",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q0886",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Panama",
      "Haïti",
      "Kosovo",
      "Fidji"
    ],
    "reponse": 3
  },
  {
    "id": "q0887",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel oracle grec, rendu par la Pythie au pied du mont Parnasse, était consulté pour connaître l'avenir ?",
    "options": [
      "L'oracle d'Éphèse",
      "L'oracle de Delos",
      "L'oracle de Delphes",
      "L'oracle de Dodone"
    ],
    "reponse": 2
  },
  {
    "id": "q0888",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Albanie",
      "Rwanda",
      "États-Unis",
      "Malawi"
    ],
    "reponse": 3
  },
  {
    "id": "q0889",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Autant en emporte le vent » ?",
    "options": [
      "Toni Morrison",
      "Harper Lee",
      "Pearl Buck",
      "Margaret Mitchell"
    ],
    "reponse": 3
  },
  {
    "id": "q0890",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1968 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "19e siècle",
      "21e siècle",
      "20e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q0891",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 16 décennie(s) ?",
    "options": [
      "178",
      "160",
      "155",
      "140"
    ],
    "reponse": 1
  },
  {
    "id": "q0892",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « Wi-Fi » à l'origine, ou du moins la technologie qu'il désigne ?",
    "options": [
      "Wireless Fiber",
      "Wired Fidelity",
      "Une norme de réseau sans fil (Wireless Fidelity)",
      "Wide Field"
    ],
    "reponse": 2
  },
  {
    "id": "q0893",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Monaco ?",
    "options": [
      "Dollar australien",
      "Euro",
      "Rouble russe",
      "Shilling kényan"
    ],
    "reponse": 1
  },
  {
    "id": "q0894",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 200 ?",
    "options": [
      "20",
      "16",
      "18",
      "21"
    ],
    "reponse": 0
  },
  {
    "id": "q0895",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 2000 cl ?",
    "options": [
      "22",
      "19",
      "20",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q0896",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Osmium ?",
    "options": [
      "Ti",
      "Ba",
      "Tb",
      "Os"
    ],
    "reponse": 3
  },
  {
    "id": "q0897",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Slovénie ?",
    "options": [
      "🇱🇺",
      "🇸🇮",
      "🇮🇶",
      "🇵🇰"
    ],
    "reponse": 1
  },
  {
    "id": "q0898",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCXLV en chiffres romains ?",
    "options": [
      "2147",
      "2140",
      "2145",
      "2144"
    ],
    "reponse": 2
  },
  {
    "id": "q0899",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2769 en chiffres romains ?",
    "options": [
      "MMDCCLIX",
      "MMDCCLXIX",
      "MMDCCLXXI",
      "MMDCCLXIV"
    ],
    "reponse": 1
  },
  {
    "id": "q0900",
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
    "id": "q0901",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série britannique met en scène un détective consultant vivant au 221B Baker Street ?",
    "options": [
      "Sherlock",
      "Peaky Blinders",
      "Broadchurch",
      "Luther"
    ],
    "reponse": 0
  },
  {
    "id": "q0902",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Indium ?",
    "options": [
      "Tl",
      "P",
      "I",
      "In"
    ],
    "reponse": 3
  },
  {
    "id": "q0903",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un requin terrorisant une station balnéaire, réalisé par Spielberg en 1975 ?",
    "options": [
      "Open Water",
      "Les Dents de la mer",
      "Piranha",
      "Le Grand Bleu"
    ],
    "reponse": 1
  },
  {
    "id": "q0904",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CMLXXXVII en chiffres romains ?",
    "options": [
      "982",
      "988",
      "987",
      "977"
    ],
    "reponse": 2
  },
  {
    "id": "q0905",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 256 ?",
    "options": [
      "16",
      "15",
      "17",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q0906",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Togo ?",
    "options": [
      "Dirham",
      "Vatu",
      "Dollar jamaïcain",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q0907",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 543 + 452 ?",
    "options": [
      "992",
      "995",
      "993",
      "997"
    ],
    "reponse": 1
  },
  {
    "id": "q0908",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Apia est la capitale de quel pays ?",
    "options": [
      "Sénégal",
      "Seychelles",
      "Macédoine du Nord",
      "Samoa"
    ],
    "reponse": 3
  },
  {
    "id": "q0909",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Te » ?",
    "options": [
      "Polonium",
      "Fer",
      "Tellure",
      "Magnésium"
    ],
    "reponse": 2
  },
  {
    "id": "q0910",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 21 m ?",
    "options": [
      "2430",
      "2096",
      "2100",
      "1929"
    ],
    "reponse": 2
  },
  {
    "id": "q0911",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Djibouti ?",
    "options": [
      "🇶🇦",
      "🇩🇯",
      "🇯🇵",
      "🇰🇲"
    ],
    "reponse": 1
  },
  {
    "id": "q0912",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCLXXXIX en chiffres romains ?",
    "options": [
      "287",
      "289",
      "284",
      "294"
    ],
    "reponse": 1
  },
  {
    "id": "q0913",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français flambé est traditionnellement préparé avec des crêpes, du beurre, du sucre et une liqueur d'orange ?",
    "options": [
      "Le vacherin",
      "Le baba au rhum",
      "Les bananes flambées",
      "La crêpe Suzette"
    ],
    "reponse": 3
  },
  {
    "id": "q0914",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Gabon",
      "Équateur",
      "Congo",
      "Islande"
    ],
    "reponse": 2
  },
  {
    "id": "q0915",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel chanteur français est connu pour « Aline » et « Toute la musique que j'aime » ?",
    "options": [
      "Michel Sardou",
      "Julien Clerc",
      "Christophe",
      "Michel Polnareff"
    ],
    "reponse": 2
  },
  {
    "id": "q0916",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCLXXXII en chiffres romains ?",
    "options": [
      "3377",
      "3384",
      "3387",
      "3382"
    ],
    "reponse": 3
  },
  {
    "id": "q0917",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Côte d'Ivoire ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q0918",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1462 et 1707 ?",
    "options": [
      "218",
      "245",
      "204",
      "275"
    ],
    "reponse": 1
  },
  {
    "id": "q0919",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Espagne ?",
    "options": [
      "Tripoli",
      "Alger",
      "Kaboul",
      "Madrid"
    ],
    "reponse": 3
  },
  {
    "id": "q0920",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel animal marin change de sexe au cours de sa vie, popularisé par un film d'animation ?",
    "options": [
      "Le poisson-lune",
      "L'hippocampe",
      "Le poisson-globe",
      "Le poisson-clown"
    ],
    "reponse": 3
  },
  {
    "id": "q0921",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2597 en chiffres romains ?",
    "options": [
      "MMDXCII",
      "MMDXCVI",
      "MMDLXXXVII",
      "MMDXCVII"
    ],
    "reponse": 3
  },
  {
    "id": "q0922",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 33 l ?",
    "options": [
      "27748",
      "33000",
      "31653",
      "37339"
    ],
    "reponse": 1
  },
  {
    "id": "q0923",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 409 - 103 ?",
    "options": [
      "305",
      "306",
      "307",
      "309"
    ],
    "reponse": 1
  },
  {
    "id": "q0924",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a créé la console de jeux PlayStation ?",
    "options": [
      "Sony",
      "Sega",
      "Nintendo",
      "Microsoft"
    ],
    "reponse": 0
  },
  {
    "id": "q0925",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle est la plus haute montagne du monde ?",
    "options": [
      "Le K2",
      "Le Kilimandjaro",
      "Le Mont Blanc",
      "L'Everest"
    ],
    "reponse": 3
  },
  {
    "id": "q0926",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Finlande",
      "Qatar",
      "Argentine",
      "Islande"
    ],
    "reponse": 3
  },
  {
    "id": "q0927",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pu » ?",
    "options": [
      "Hélium",
      "Plutonium",
      "Silicium",
      "Aluminium"
    ],
    "reponse": 1
  },
  {
    "id": "q0928",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Liberia ?",
    "options": [
      "🇺🇬",
      "🇧🇦",
      "🇱🇷",
      "🇲🇳"
    ],
    "reponse": 2
  },
  {
    "id": "q0929",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Chrome ?",
    "options": [
      "H",
      "Mn",
      "Cr",
      "Pu"
    ],
    "reponse": 2
  },
  {
    "id": "q0930",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 56 ÷ 14 ?",
    "options": [
      "3",
      "5",
      "6",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q0931",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ag » ?",
    "options": [
      "Argent",
      "Étain",
      "Calcium",
      "Tantale"
    ],
    "reponse": 0
  },
  {
    "id": "q0932",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est réputé pour ne jamais oublier, selon une expression populaire ?",
    "options": [
      "Le chien",
      "Le corbeau",
      "Le dauphin",
      "L'éléphant"
    ],
    "reponse": 3
  },
  {
    "id": "q0933",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom du processus de division cellulaire produisant des cellules identiques ?",
    "options": [
      "La mitose",
      "La transcription",
      "La mutation",
      "La méiose"
    ],
    "reponse": 0
  },
  {
    "id": "q0934",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1603 et 1688 ?",
    "options": [
      "95",
      "77",
      "93",
      "85"
    ],
    "reponse": 3
  },
  {
    "id": "q0935",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 15 ÷ 5 ?",
    "options": [
      "2",
      "3",
      "6",
      "0"
    ],
    "reponse": 1
  },
  {
    "id": "q0936",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a créé le personnage d'Alice au pays des merveilles ?",
    "options": [
      "J.M. Barrie",
      "Kenneth Grahame",
      "A.A. Milne",
      "Lewis Carroll"
    ],
    "reponse": 3
  },
  {
    "id": "q0937",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 620 + 860 ?",
    "options": [
      "1483",
      "1481",
      "1480",
      "1477"
    ],
    "reponse": 2
  },
  {
    "id": "q0938",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel oiseau mythique est réputé renaître de ses propres cendres après s'être consumé ?",
    "options": [
      "Le griffon",
      "L'aigle",
      "Le hibou",
      "Le phénix"
    ],
    "reponse": 3
  },
  {
    "id": "q0939",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur de Facebook, actuel dirigeant de Meta ?",
    "options": [
      "Evan Spiegel",
      "Mark Zuckerberg",
      "Sundar Pichai",
      "Jack Dorsey"
    ],
    "reponse": 1
  },
  {
    "id": "q0940",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle famille d'instruments regroupe le violon, l'alto, le violoncelle et la contrebasse ?",
    "options": [
      "Les percussions",
      "Les cuivres",
      "Les bois",
      "Les cordes"
    ],
    "reponse": 3
  },
  {
    "id": "q0941",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 × 5 ?",
    "options": [
      "66",
      "61",
      "60",
      "69"
    ],
    "reponse": 2
  },
  {
    "id": "q0942",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Italie ?",
    "options": [
      "Dollar jamaïcain",
      "Franc congolais",
      "Euro",
      "Lev bulgare"
    ],
    "reponse": 2
  },
  {
    "id": "q0943",
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
    "id": "q0944",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de type « MOBA », édité par Riot Games, oppose deux équipes de cinq champions ?",
    "options": [
      "Smite",
      "Dota 2",
      "League of Legends",
      "Heroes of the Storm"
    ],
    "reponse": 2
  },
  {
    "id": "q0945",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 108 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "1e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q0946",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise de streaming vidéo, fondée en 1997 comme service de location de DVD par correspondance, est devenue un géant du divertissement ?",
    "options": [
      "Netflix",
      "Hulu",
      "Disney+",
      "Amazon Prime Video"
    ],
    "reponse": 0
  },
  {
    "id": "q0947",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 80 ÷ 4 ?",
    "options": [
      "22",
      "20",
      "24",
      "16"
    ],
    "reponse": 1
  },
  {
    "id": "q0948",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Monténégro ?",
    "options": [
      "Moscou",
      "Podgorica",
      "Lisbonne",
      "Praia"
    ],
    "reponse": 1
  },
  {
    "id": "q0949",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 500 ?",
    "options": [
      "95",
      "100",
      "107",
      "96"
    ],
    "reponse": 1
  },
  {
    "id": "q0950",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel acteur incarne le rôle-titre dans « Le Grand Bleu » de Luc Besson ?",
    "options": [
      "Gérard Depardieu",
      "Jean-Marc Barr",
      "Christophe Lambert",
      "Jean Reno"
    ],
    "reponse": 1
  },
  {
    "id": "q0951",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quelle chanteuse islandaise est connue pour son univers musical singulier et l'album « Homogenic » ?",
    "options": [
      "Björk",
      "Tori Amos",
      "Kate Bush",
      "Enya"
    ],
    "reponse": 0
  },
  {
    "id": "q0952",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cobalt ?",
    "options": [
      "Zr",
      "Nb",
      "Co",
      "As"
    ],
    "reponse": 2
  },
  {
    "id": "q0953",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Gambie ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q0954",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom de l'étude scientifique des tremblements de terre ?",
    "options": [
      "La météorologie",
      "La volcanologie",
      "La géologie",
      "La sismologie"
    ],
    "reponse": 3
  },
  {
    "id": "q0955",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 535 - 23 ?",
    "options": [
      "514",
      "515",
      "513",
      "512"
    ],
    "reponse": 3
  },
  {
    "id": "q0956",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel scientifique a formulé les lois de l'hérédité en étudiant les pois ?",
    "options": [
      "Charles Darwin",
      "Louis Pasteur",
      "Antoine Lavoisier",
      "Gregor Mendel"
    ],
    "reponse": 3
  },
  {
    "id": "q0957",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Np » ?",
    "options": [
      "Neptunium",
      "Magnésium",
      "Tellure",
      "Zinc"
    ],
    "reponse": 0
  },
  {
    "id": "q0958",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation américaine, réputée pour son humour très noir, met en scène quatre enfants dans une petite ville du Colorado ?",
    "options": [
      "Bob's Burgers",
      "South Park",
      "Les Simpson",
      "Family Guy"
    ],
    "reponse": 1
  },
  {
    "id": "q0959",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Russie",
      "Timor oriental",
      "Suriname",
      "Guatemala"
    ],
    "reponse": 3
  },
  {
    "id": "q0960",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 11 au carré ?",
    "options": [
      "109",
      "134",
      "121",
      "128"
    ],
    "reponse": 2
  },
  {
    "id": "q0961",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 438 + 195 ?",
    "options": [
      "634",
      "636",
      "630",
      "633"
    ],
    "reponse": 3
  },
  {
    "id": "q0962",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Érythrée",
      "Suisse",
      "Zambie",
      "Norvège"
    ],
    "reponse": 1
  },
  {
    "id": "q0963",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 22 au carré ?",
    "options": [
      "448",
      "528",
      "451",
      "484"
    ],
    "reponse": 3
  },
  {
    "id": "q0964",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Islande ?",
    "options": [
      "Lima",
      "Reykjavik",
      "Riyad",
      "Victoria"
    ],
    "reponse": 1
  },
  {
    "id": "q0965",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle spécialité française, obtenue par le gavage d'un palmipède puis servie lors des repas de fête, est controversée pour des raisons de bien-être animal ?",
    "options": [
      "Le pâté en croûte",
      "Les rillettes",
      "Le foie gras",
      "La terrine de campagne"
    ],
    "reponse": 2
  },
  {
    "id": "q0966",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 230 - 22 ?",
    "options": [
      "209",
      "207",
      "208",
      "205"
    ],
    "reponse": 2
  },
  {
    "id": "q0967",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel fleuve américain est le plus long d'Amérique du Nord ?",
    "options": [
      "Le Missouri",
      "Le Rio Grande",
      "Le Colorado",
      "Le Mississippi"
    ],
    "reponse": 3
  },
  {
    "id": "q0968",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 778 - 108 ?",
    "options": [
      "667",
      "669",
      "668",
      "670"
    ],
    "reponse": 3
  },
  {
    "id": "q0969",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 60 ?",
    "options": [
      "12",
      "8",
      "10",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q0970",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de baseball sur le terrain ?",
    "options": [
      "10",
      "9",
      "11",
      "8"
    ],
    "reponse": 1
  },
  {
    "id": "q0971",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tripoli est la capitale de quel pays ?",
    "options": [
      "Libye",
      "France",
      "Haïti",
      "Philippines"
    ],
    "reponse": 0
  },
  {
    "id": "q0972",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tunis est la capitale de quel pays ?",
    "options": [
      "Tunisie",
      "États-Unis",
      "Croatie",
      "Maurice"
    ],
    "reponse": 0
  },
  {
    "id": "q0973",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport se joue avec un palet sur une patinoire ?",
    "options": [
      "Le bobsleigh",
      "Le patinage artistique",
      "Le curling",
      "Le hockey sur glace"
    ],
    "reponse": 3
  },
  {
    "id": "q0974",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 899 en chiffres romains ?",
    "options": [
      "CM",
      "DCCCXCIX",
      "CMIV",
      "DCCCXCIV"
    ],
    "reponse": 1
  },
  {
    "id": "q0975",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le principal composant du noyau d'un atome, avec les neutrons ?",
    "options": [
      "Les photons",
      "Les quarks",
      "Les protons",
      "Les électrons"
    ],
    "reponse": 2
  },
  {
    "id": "q0976",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDLXI en chiffres romains ?",
    "options": [
      "3563",
      "3566",
      "3561",
      "3562"
    ],
    "reponse": 2
  },
  {
    "id": "q0977",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur britannique a écrit la saga « Le Monde de Narnia » ?",
    "options": [
      "Roald Dahl",
      "Philip Pullman",
      "C.S. Lewis",
      "J.R.R. Tolkien"
    ],
    "reponse": 2
  },
  {
    "id": "q0978",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Eswatini ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q0979",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 641 - 201 ?",
    "options": [
      "440",
      "441",
      "437",
      "442"
    ],
    "reponse": 0
  },
  {
    "id": "q0980",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République dominicaine ?",
    "options": [
      "Asie",
      "Afrique",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q0981",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur jamaïcain a popularisé le reggae dans le monde entier avec l'album posthume « Legend » ?",
    "options": [
      "Toots Hibbert",
      "Peter Tosh",
      "Jimmy Cliff",
      "Bob Marley"
    ],
    "reponse": 3
  },
  {
    "id": "q0982",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série d'animation met en scène un adolescent qui hérite d'un pouvoir extraterrestre appelé l'Omnitrix ?",
    "options": [
      "Generator Rex",
      "Max Steel",
      "Ben 10",
      "Miraculous"
    ],
    "reponse": 2
  },
  {
    "id": "q0983",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 22 l ?",
    "options": [
      "18530",
      "23363",
      "22000",
      "20989"
    ],
    "reponse": 2
  },
  {
    "id": "q0984",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Vanuatu",
      "Libye",
      "Lesotho",
      "Niger"
    ],
    "reponse": 3
  },
  {
    "id": "q0985",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Moscou est la capitale de quel pays ?",
    "options": [
      "Russie",
      "Guinée équatoriale",
      "Lesotho",
      "Australie"
    ],
    "reponse": 0
  },
  {
    "id": "q0986",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 51 + 839 ?",
    "options": [
      "892",
      "888",
      "889",
      "890"
    ],
    "reponse": 3
  },
  {
    "id": "q0987",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 33 ÷ 3 ?",
    "options": [
      "10",
      "11",
      "12",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q0988",
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
    "id": "q0989",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 598 + 589 ?",
    "options": [
      "1189",
      "1184",
      "1187",
      "1186"
    ],
    "reponse": 2
  },
  {
    "id": "q0990",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3431 en chiffres romains ?",
    "options": [
      "MMMCDXXI",
      "MMMCDXXXVI",
      "MMMCDXLI",
      "MMMCDXXXI"
    ],
    "reponse": 3
  },
  {
    "id": "q0991",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 396 mois ?",
    "options": [
      "36",
      "34",
      "35",
      "33"
    ],
    "reponse": 3
  },
  {
    "id": "q0992",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Canada ?",
    "options": [
      "Caracas",
      "Lisbonne",
      "Ottawa",
      "Mbabane"
    ],
    "reponse": 2
  },
  {
    "id": "q0993",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 75 % de 60 ?",
    "options": [
      "49",
      "40",
      "45",
      "51"
    ],
    "reponse": 2
  },
  {
    "id": "q0994",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Windhoek est la capitale de quel pays ?",
    "options": [
      "Namibie",
      "Lesotho",
      "Cameroun",
      "Ouzbékistan"
    ],
    "reponse": 0
  },
  {
    "id": "q0995",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Slovaquie ?",
    "options": [
      "Vatu",
      "Dinar jordanien",
      "Euro",
      "Roupie indienne"
    ],
    "reponse": 2
  },
  {
    "id": "q0996",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇾🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Yémen",
      "Eswatini",
      "Myanmar",
      "Cambodge"
    ],
    "reponse": 0
  },
  {
    "id": "q0997",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu de cartes à collectionner met en scène des créatures comme Pikachu ?",
    "options": [
      "Digimon",
      "Magic: The Gathering",
      "Yu-Gi-Oh!",
      "Pokémon"
    ],
    "reponse": 3
  },
  {
    "id": "q0998",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Titane ?",
    "options": [
      "Tb",
      "Ac",
      "Cs",
      "Ti"
    ],
    "reponse": 3
  },
  {
    "id": "q0999",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport peut-on réaliser un « ippon » ?",
    "options": [
      "La lutte",
      "Le karaté",
      "Le judo",
      "L'escrime"
    ],
    "reponse": 2
  },
  {
    "id": "q1000",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 34000 mm ?",
    "options": [
      "33",
      "29",
      "27",
      "34"
    ],
    "reponse": 3
  },
  {
    "id": "q1001",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 400 ?",
    "options": [
      "20",
      "16",
      "22",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q1002",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle mer est en réalité un lac salé sans exutoire ?",
    "options": [
      "La mer Morte",
      "La mer Noire",
      "La mer Caspienne",
      "La mer d'Aral"
    ],
    "reponse": 0
  },
  {
    "id": "q1003",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Nouvelle-Zélande ?",
    "options": [
      "Alger",
      "Tachkent",
      "Paramaribo",
      "Wellington"
    ],
    "reponse": 3
  },
  {
    "id": "q1004",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1631 et 1929 ?",
    "options": [
      "300",
      "298",
      "292",
      "277"
    ],
    "reponse": 1
  },
  {
    "id": "q1005",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 60 ?",
    "options": [
      "40",
      "34",
      "41",
      "36"
    ],
    "reponse": 3
  },
  {
    "id": "q1006",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 43200 s ?",
    "options": [
      "10",
      "12",
      "14",
      "8"
    ],
    "reponse": 1
  },
  {
    "id": "q1007",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel artiste surréaliste espagnol est connu pour ses montres molles dans « La Persistance de la mémoire » ?",
    "options": [
      "Salvador Dalí",
      "Pablo Picasso",
      "Joan Miró",
      "René Magritte"
    ],
    "reponse": 0
  },
  {
    "id": "q1008",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 14 ?",
    "options": [
      "111",
      "98",
      "93",
      "109"
    ],
    "reponse": 1
  },
  {
    "id": "q1009",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport porte-t-on un « judogi » ?",
    "options": [
      "L'aïkido",
      "Le taekwondo",
      "Le judo",
      "Le karaté"
    ],
    "reponse": 2
  },
  {
    "id": "q1010",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Spider-Man au cinéma pour la toute première fois, en 2002 ?",
    "options": [
      "Andrew Garfield",
      "Tom Holland",
      "Tobey Maguire",
      "Jake Gyllenhaal"
    ],
    "reponse": 2
  },
  {
    "id": "q1011",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 151 + 262 ?",
    "options": [
      "413",
      "411",
      "414",
      "415"
    ],
    "reponse": 0
  },
  {
    "id": "q1012",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur est connu pour « Amadeus » et « Vol au-dessus d'un nid de coucou » ?",
    "options": [
      "Milos Forman",
      "Stanley Kubrick",
      "Sidney Pollack",
      "Roman Polanski"
    ],
    "reponse": 0
  },
  {
    "id": "q1013",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pb » ?",
    "options": [
      "Plomb",
      "Scandium",
      "Titane",
      "Argent"
    ],
    "reponse": 0
  },
  {
    "id": "q1014",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Russie ?",
    "options": [
      "🇦🇷",
      "🇮🇸",
      "🇦🇿",
      "🇷🇺"
    ],
    "reponse": 3
  },
  {
    "id": "q1015",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Malawi ?",
    "options": [
      "Kwacha malawite",
      "Franc suisse",
      "Real brésilien",
      "Peso dominicain"
    ],
    "reponse": 0
  },
  {
    "id": "q1016",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Zimbabwe ?",
    "options": [
      "Europe",
      "Océanie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1017",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ouzbékistan ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Europe",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1018",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1129 appartient à quel siècle ?",
    "options": [
      "12e siècle",
      "10e siècle",
      "13e siècle",
      "11e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1019",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Pourquoi les flamants ont-ils un plumage rose ou rougeâtre ?",
    "options": [
      "Une maladie de peau",
      "Une mutation propre à l'espèce",
      "À cause des pigments contenus dans leur alimentation",
      "La chaleur de leur habitat"
    ],
    "reponse": 2
  },
  {
    "id": "q1020",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film Marvel réunit pour la première fois Iron Man, Captain America, Thor et Hulk dans une seule équipe ?",
    "options": [
      "Avengers",
      "Les Indestructibles",
      "X-Men",
      "Justice League"
    ],
    "reponse": 0
  },
  {
    "id": "q1021",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chili ?",
    "options": [
      "Afrique",
      "Europe",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1022",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mozambique ?",
    "options": [
      "Dollar namibien",
      "Metical",
      "Livre libanaise",
      "Vatu"
    ],
    "reponse": 1
  },
  {
    "id": "q1023",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel MMORPG, sorti en 2004 et édité par Blizzard, plonge des millions de joueurs dans un univers de fantasy médiévale peuplé d'orcs et de mages ?",
    "options": [
      "Guild Wars 2",
      "Final Fantasy XIV",
      "EverQuest",
      "World of Warcraft"
    ],
    "reponse": 3
  },
  {
    "id": "q1024",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel auteur français a écrit « Le Petit Prince » ?",
    "options": [
      "Albert Camus",
      "Marcel Pagnol",
      "Jules Verne",
      "Antoine de Saint-Exupéry"
    ],
    "reponse": 3
  },
  {
    "id": "q1025",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 949 + 660 ?",
    "options": [
      "1612",
      "1610",
      "1609",
      "1611"
    ],
    "reponse": 2
  },
  {
    "id": "q1026",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 10 année(s) ?",
    "options": [
      "120",
      "111",
      "127",
      "114"
    ],
    "reponse": 0
  },
  {
    "id": "q1027",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français a reçu le prix Nobel de littérature pour « La Peste » et « L'Étranger » ?",
    "options": [
      "André Gide",
      "François Mauriac",
      "Jean-Paul Sartre",
      "Albert Camus"
    ],
    "reponse": 3
  },
  {
    "id": "q1028",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Maroc",
      "Haïti",
      "Estonie",
      "Moldavie"
    ],
    "reponse": 0
  },
  {
    "id": "q1029",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Thimphou est la capitale de quel pays ?",
    "options": [
      "Égypte",
      "Bhoutan",
      "Serbie",
      "Malawi"
    ],
    "reponse": 1
  },
  {
    "id": "q1030",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cambodge ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Asie",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1031",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 25200 s ?",
    "options": [
      "7",
      "6",
      "4",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q1032",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Dans quel pays les émojis ont-ils été créés à la fin des années 1990 ?",
    "options": [
      "Le Japon",
      "Les États-Unis",
      "La Chine",
      "La Corée du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q1033",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Suriname ?",
    "options": [
      "🇨🇺",
      "🇶🇦",
      "🇺🇬",
      "🇸🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q1034",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 14 cm ?",
    "options": [
      "124",
      "140",
      "137",
      "120"
    ],
    "reponse": 1
  },
  {
    "id": "q1035",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel style de danse et de musique est né dans les quartiers populaires de New York dans les années 1970, mêlant rap et rythmes ?",
    "options": [
      "Le RnB",
      "Le disco",
      "Le hip-hop",
      "Le funk"
    ],
    "reponse": 2
  },
  {
    "id": "q1036",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Mauritanie ?",
    "options": [
      "Dinar koweïtien",
      "Dinar tunisien",
      "Ouguiya",
      "Sum ouzbek"
    ],
    "reponse": 2
  },
  {
    "id": "q1037",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 391 + 597 ?",
    "options": [
      "985",
      "991",
      "990",
      "988"
    ],
    "reponse": 3
  },
  {
    "id": "q1038",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 338 en chiffres romains ?",
    "options": [
      "CCCXXXVI",
      "CCCXXXVIII",
      "CCCXLVIII",
      "CCCXXXVII"
    ],
    "reponse": 1
  },
  {
    "id": "q1039",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 1000 ?",
    "options": [
      "192",
      "207",
      "218",
      "200"
    ],
    "reponse": 3
  },
  {
    "id": "q1040",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 3 ?",
    "options": [
      "59",
      "62",
      "60",
      "57"
    ],
    "reponse": 3
  },
  {
    "id": "q1041",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 893 en chiffres romains ?",
    "options": [
      "DCCCXCII",
      "DCCCXCIV",
      "DCCCLXXXIII",
      "DCCCXCIII"
    ],
    "reponse": 3
  },
  {
    "id": "q1042",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu de tir en équipe par héros, développé par Blizzard, est sorti en 2016 ?",
    "options": [
      "Team Fortress 2",
      "Apex Legends",
      "Valorant",
      "Overwatch"
    ],
    "reponse": 3
  },
  {
    "id": "q1043",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel dessert typiquement français est un flan renversé, nappé d'un sirop ambré obtenu en faisant fondre du sucre ?",
    "options": [
      "Le flan pâtissier",
      "Les œufs au lait",
      "La crème brûlée",
      "La crème caramel"
    ],
    "reponse": 3
  },
  {
    "id": "q1044",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 166 - 143 ?",
    "options": [
      "26",
      "24",
      "25",
      "23"
    ],
    "reponse": 3
  },
  {
    "id": "q1045",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Uruguay",
      "Burkina Faso",
      "Bahreïn",
      "Azerbaïdjan"
    ],
    "reponse": 0
  },
  {
    "id": "q1046",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel géant aux cent bras a aidé Zeus dans sa guerre contre les Titans ?",
    "options": [
      "Prométhée",
      "Atlas",
      "Briarée",
      "Un Cyclope"
    ],
    "reponse": 2
  },
  {
    "id": "q1047",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur italien est célèbre pour les westerns spaghetti comme « Le Bon, la Brute et le Truand » ?",
    "options": [
      "Dario Argento",
      "Sergio Leone",
      "Bernardo Bertolucci",
      "Federico Fellini"
    ],
    "reponse": 1
  },
  {
    "id": "q1048",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Soudan ?",
    "options": [
      "Europe",
      "Afrique",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q1049",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « RAM » ?",
    "options": [
      "Read Access Memory",
      "Rapid Access Module",
      "Random Access Memory",
      "Run Access Memory"
    ],
    "reponse": 2
  },
  {
    "id": "q1050",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 208 ÷ 13 ?",
    "options": [
      "12",
      "20",
      "15",
      "16"
    ],
    "reponse": 3
  },
  {
    "id": "q1051",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 464 en chiffres romains ?",
    "options": [
      "CDLXIV",
      "CDLXII",
      "CDLXIX",
      "CDLIX"
    ],
    "reponse": 0
  },
  {
    "id": "q1052",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur allemand a écrit la « Marche nuptiale » très jouée lors des mariages ?",
    "options": [
      "Franz Liszt",
      "Richard Wagner",
      "Felix Mendelssohn",
      "Johannes Brahms"
    ],
    "reponse": 2
  },
  {
    "id": "q1053",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel astronome a proposé le modèle héliocentrique du système solaire ?",
    "options": [
      "Nicolas Copernic",
      "Tycho Brahe",
      "Galilée",
      "Ptolémée"
    ],
    "reponse": 0
  },
  {
    "id": "q1054",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ga » ?",
    "options": [
      "Gallium",
      "Cadmium",
      "Rhodium",
      "Fer"
    ],
    "reponse": 0
  },
  {
    "id": "q1055",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur français a écrit « Bel-Ami » et « Boule de suif » ?",
    "options": [
      "Guy de Maupassant",
      "Émile Zola",
      "Alphonse Daudet",
      "Gustave Flaubert"
    ],
    "reponse": 0
  },
  {
    "id": "q1056",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Guyana ?",
    "options": [
      "🇬🇾",
      "🇯🇴",
      "🇲🇨",
      "🇲🇬"
    ],
    "reponse": 0
  },
  {
    "id": "q1057",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Timor oriental",
      "Égypte",
      "Angola",
      "Pays-Bas"
    ],
    "reponse": 3
  },
  {
    "id": "q1058",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a mis en scène « Blade Runner » et le tout premier film « Alien » ?",
    "options": [
      "James Cameron",
      "Denis Villeneuve",
      "David Fincher",
      "Ridley Scott"
    ],
    "reponse": 3
  },
  {
    "id": "q1059",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation américaine met en scène un savant alcoolique et cynique voyageant à travers les dimensions avec son petit-fils ?",
    "options": [
      "Family Guy",
      "Futurama",
      "Rick et Morty",
      "South Park"
    ],
    "reponse": 2
  },
  {
    "id": "q1060",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1489 en chiffres romains ?",
    "options": [
      "MCDXCIX",
      "MCDLXXXIX",
      "MCDXCI",
      "MCDLXXXIV"
    ],
    "reponse": 1
  },
  {
    "id": "q1061",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel poète français est l'auteur des « Fleurs du mal » ?",
    "options": [
      "Paul Verlaine",
      "Stéphane Mallarmé",
      "Arthur Rimbaud",
      "Charles Baudelaire"
    ],
    "reponse": 3
  },
  {
    "id": "q1062",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel dramaturge français du XIXe siècle est l'auteur de « On ne badine pas avec l'amour » ?",
    "options": [
      "Alexandre Dumas fils",
      "Victor Hugo",
      "Eugène Scribe",
      "Alfred de Musset"
    ],
    "reponse": 3
  },
  {
    "id": "q1063",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Brésil ?",
    "options": [
      "Real brésilien",
      "Taka",
      "Tala",
      "Franc guinéen"
    ],
    "reponse": 0
  },
  {
    "id": "q1064",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 14 ?",
    "options": [
      "266",
      "265",
      "277",
      "252"
    ],
    "reponse": 3
  },
  {
    "id": "q1065",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMLXXVI en chiffres romains ?",
    "options": [
      "3066",
      "3078",
      "3076",
      "3081"
    ],
    "reponse": 2
  },
  {
    "id": "q1066",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2069 en chiffres romains ?",
    "options": [
      "MMLXVIII",
      "MMLXIX",
      "MMLXVII",
      "MMLXXIX"
    ],
    "reponse": 1
  },
  {
    "id": "q1067",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel scientifique a développé le premier vaccin contre la variole ?",
    "options": [
      "Robert Koch",
      "Louis Pasteur",
      "Alexander Fleming",
      "Edward Jenner"
    ],
    "reponse": 3
  },
  {
    "id": "q1068",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a développé le langage de programmation C# ?",
    "options": [
      "Oracle",
      "Microsoft",
      "Google",
      "Apple"
    ],
    "reponse": 1
  },
  {
    "id": "q1069",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est le symbole du panda, menacé et vivant en Chine ?",
    "options": [
      "Le koala",
      "L'ours noir",
      "Le panda géant",
      "Le panda roux"
    ],
    "reponse": 2
  },
  {
    "id": "q1070",
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
    "id": "q1071",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel espion mercenaire est le héros historique d'une célèbre saga de jeux vidéo d'infiltration créée par Hideo Kojima ?",
    "options": [
      "Solid Snake",
      "Sam Fisher",
      "Nathan Drake",
      "Agent 47"
    ],
    "reponse": 0
  },
  {
    "id": "q1072",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel trophée récompense le champion de la grande ligue nord-américaine de hockey sur glace, la NHL ?",
    "options": [
      "La Coupe Calder",
      "Le Trophée Vézina",
      "La Coupe Memorial",
      "La Coupe Stanley"
    ],
    "reponse": 3
  },
  {
    "id": "q1073",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1516 et 1547 ?",
    "options": [
      "31",
      "33",
      "34",
      "35"
    ],
    "reponse": 0
  },
  {
    "id": "q1074",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 60 ÷ 6 ?",
    "options": [
      "10",
      "11",
      "8",
      "7"
    ],
    "reponse": 0
  },
  {
    "id": "q1075",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Malaisie ?",
    "options": [
      "🇨🇲",
      "🇬🇷",
      "🇮🇸",
      "🇲🇾"
    ],
    "reponse": 3
  },
  {
    "id": "q1076",
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
    "id": "q1077",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle compétition de golf oppose une équipe européenne à une équipe américaine tous les deux ans ?",
    "options": [
      "La Solheim Cup",
      "La Presidents Cup",
      "La Coupe Davis",
      "La Ryder Cup"
    ],
    "reponse": 3
  },
  {
    "id": "q1078",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "À quelle famille d'animaux marins appartient réellement l'orque, malgré son surnom de « baleine tueuse » ?",
    "options": [
      "La famille des dauphins",
      "La famille des baleines à fanons",
      "La famille des cachalots",
      "La famille des marsouins"
    ],
    "reponse": 0
  },
  {
    "id": "q1079",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 7 ?",
    "options": [
      "46",
      "40",
      "47",
      "42"
    ],
    "reponse": 3
  },
  {
    "id": "q1080",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Laos ?",
    "options": [
      "Asie",
      "Océanie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q1081",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 822 - 573 ?",
    "options": [
      "248",
      "252",
      "246",
      "249"
    ],
    "reponse": 3
  },
  {
    "id": "q1082",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 2 ?",
    "options": [
      "35",
      "34",
      "38",
      "40"
    ],
    "reponse": 2
  },
  {
    "id": "q1083",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Lituanie",
      "Philippines",
      "Nouvelle-Zélande",
      "Albanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1084",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Forrest Gump ?",
    "options": [
      "Robin Williams",
      "Tom Hanks",
      "Kevin Costner",
      "Bill Murray"
    ],
    "reponse": 1
  },
  {
    "id": "q1085",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de rôle en monde ouvert se déroule dans une province nordique peuplée de dragons, où le héros porte le titre de « Dovahkiin » ?",
    "options": [
      "The Elder Scrolls V: Skyrim",
      "Dragon Age: Inquisition",
      "Fallout 4",
      "The Witcher 3"
    ],
    "reponse": 0
  },
  {
    "id": "q1086",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 153 + 520 ?",
    "options": [
      "675",
      "674",
      "673",
      "672"
    ],
    "reponse": 2
  },
  {
    "id": "q1087",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle entreprise a développé la console de jeux Xbox ?",
    "options": [
      "Nintendo",
      "Microsoft",
      "Sony",
      "Sega"
    ],
    "reponse": 1
  },
  {
    "id": "q1088",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Luxembourg ?",
    "options": [
      "🇵🇱",
      "🇿🇲",
      "🇱🇺",
      "🇻🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q1089",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 306 en chiffres romains ?",
    "options": [
      "CCCVII",
      "CCCXVI",
      "CCCI",
      "CCCVI"
    ],
    "reponse": 3
  },
  {
    "id": "q1090",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 60 ?",
    "options": [
      "24",
      "28",
      "27",
      "26"
    ],
    "reponse": 0
  },
  {
    "id": "q1091",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Corée du Sud ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1092",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quels conflits du XIXe siècle ont opposé la Chine aux puissances occidentales autour du commerce d'une drogue ?",
    "options": [
      "Les guerres sino-japonaises",
      "Les guerres de l'opium",
      "Les guerres anglo-birmanes",
      "Les guerres des Boxers"
    ],
    "reponse": 1
  },
  {
    "id": "q1093",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Césium ?",
    "options": [
      "Cs",
      "Rh",
      "Mn",
      "H"
    ],
    "reponse": 0
  },
  {
    "id": "q1094",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 50 ?",
    "options": [
      "27",
      "32",
      "30",
      "31"
    ],
    "reponse": 2
  },
  {
    "id": "q1095",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel musée parisien, ancienne gare, expose des œuvres impressionnistes comme celles de Monet et Van Gogh ?",
    "options": [
      "Le musée Rodin",
      "Le Centre Pompidou",
      "Le musée d'Orsay",
      "Le musée du Louvre"
    ],
    "reponse": 2
  },
  {
    "id": "q1096",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe américain a interprété « Smells Like Teen Spirit » ?",
    "options": [
      "Pearl Jam",
      "Alice in Chains",
      "Soundgarden",
      "Nirvana"
    ],
    "reponse": 3
  },
  {
    "id": "q1097",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur joue le rôle principal dans « Le Loup de Wall Street » ?",
    "options": [
      "Brad Pitt",
      "Matt Damon",
      "Leonardo DiCaprio",
      "Tom Hanks"
    ],
    "reponse": 2
  },
  {
    "id": "q1098",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quelle plante carnivore referme ses feuilles pour piéger les insectes ?",
    "options": [
      "La sarracénie uniquement",
      "Le nénuphar",
      "L'orchidée",
      "La dionée attrape-mouche"
    ],
    "reponse": 3
  },
  {
    "id": "q1099",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sarajevo est la capitale de quel pays ?",
    "options": [
      "Chypre",
      "Bosnie-Herzégovine",
      "Royaume-Uni",
      "Belize"
    ],
    "reponse": 1
  },
  {
    "id": "q1100",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Norvège",
      "Zambie",
      "Russie",
      "Lesotho"
    ],
    "reponse": 0
  },
  {
    "id": "q1101",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel est le roi des dieux dans la mythologie grecque ?",
    "options": [
      "Poséidon",
      "Apollon",
      "Hadès",
      "Zeus"
    ],
    "reponse": 3
  },
  {
    "id": "q1102",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bhoutan ?",
    "options": [
      "Dinar irakien",
      "Tugrik",
      "Shilling somalien",
      "Ngultrum"
    ],
    "reponse": 3
  },
  {
    "id": "q1103",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 63 ÷ 9 ?",
    "options": [
      "6",
      "4",
      "10",
      "7"
    ],
    "reponse": 3
  },
  {
    "id": "q1104",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz est rejeté par les plantes comme sous-produit de la photosynthèse ?",
    "options": [
      "Le dioxyde de carbone",
      "L'azote",
      "L'hydrogène",
      "L'oxygène"
    ],
    "reponse": 3
  },
  {
    "id": "q1105",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Br » ?",
    "options": [
      "Thulium",
      "Brome",
      "Iode",
      "Platine"
    ],
    "reponse": 1
  },
  {
    "id": "q1106",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2683 en chiffres romains ?",
    "options": [
      "MMDCLXXIII",
      "MMDCLXXXVIII",
      "MMDCLXXXIII",
      "MMDCXCIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1107",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre autrichien est célèbre pour son tableau doré « Le Baiser » ?",
    "options": [
      "Gustav Klimt",
      "Egon Schiele",
      "Oskar Kokoschka",
      "Edvard Munch"
    ],
    "reponse": 0
  },
  {
    "id": "q1108",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bridgetown est la capitale de quel pays ?",
    "options": [
      "Barbade",
      "Espagne",
      "Lituanie",
      "Serbie"
    ],
    "reponse": 0
  },
  {
    "id": "q1109",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 336 - 37 ?",
    "options": [
      "301",
      "296",
      "302",
      "299"
    ],
    "reponse": 3
  },
  {
    "id": "q1110",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Dans quel sport d'hiver descend-on une piste glacée sur un traîneau, à plat ventre et tête la première ?",
    "options": [
      "Le skeleton",
      "Le ski de vitesse",
      "La luge",
      "Le bobsleigh"
    ],
    "reponse": 0
  },
  {
    "id": "q1111",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Costa Rica ?",
    "options": [
      "🇪🇸",
      "🇨🇻",
      "🇨🇷",
      "🇭🇺"
    ],
    "reponse": 2
  },
  {
    "id": "q1112",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Gadolinium ?",
    "options": [
      "Ho",
      "Gd",
      "Ne",
      "Ge"
    ],
    "reponse": 1
  },
  {
    "id": "q1113",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays est traversé par l'équateur et le méridien de Greenwich à la fois ?",
    "options": [
      "Le Kenya",
      "L'Indonésie",
      "Le Brésil",
      "Le Ghana"
    ],
    "reponse": 3
  },
  {
    "id": "q1114",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Belgique ?",
    "options": [
      "🇮🇩",
      "🇧🇪",
      "🇲🇰",
      "🇵🇭"
    ],
    "reponse": 1
  },
  {
    "id": "q1115",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le plus grand désert chaud du monde ?",
    "options": [
      "Le Sahara",
      "Le désert du Kalahari",
      "Le désert de Gobi",
      "Le désert d'Atacama"
    ],
    "reponse": 0
  },
  {
    "id": "q1116",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 339 - 214 ?",
    "options": [
      "125",
      "127",
      "122",
      "128"
    ],
    "reponse": 0
  },
  {
    "id": "q1117",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel chien à plusieurs têtes garde l'entrée des Enfers dans la mythologie grecque ?",
    "options": [
      "L'Hydre de Lerne",
      "La Chimère",
      "Cerbère",
      "Le Sphinx"
    ],
    "reponse": 2
  },
  {
    "id": "q1118",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel est le plus long serpent du monde ?",
    "options": [
      "Le cobra royal",
      "L'anaconda",
      "Le python réticulé",
      "Le boa constrictor"
    ],
    "reponse": 2
  },
  {
    "id": "q1119",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ce » ?",
    "options": [
      "Cérium",
      "Vanadium",
      "Phosphore",
      "Yttrium"
    ],
    "reponse": 0
  },
  {
    "id": "q1120",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète du système solaire met le moins de temps à faire le tour du Soleil ?",
    "options": [
      "la Terre",
      "Mercure",
      "Vénus",
      "Mars"
    ],
    "reponse": 1
  },
  {
    "id": "q1121",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec des bergers et de la nature sauvage est représenté avec des cornes et des pattes de bouc ?",
    "options": [
      "Dionysos",
      "Silène",
      "Pan",
      "Priape"
    ],
    "reponse": 2
  },
  {
    "id": "q1122",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz rend les bulles du soda pétillantes ?",
    "options": [
      "Le dioxyde de carbone",
      "L'oxygène",
      "L'azote",
      "L'hydrogène"
    ],
    "reponse": 0
  },
  {
    "id": "q1123",
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
    "id": "q1124",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 48 ÷ 8 ?",
    "options": [
      "9",
      "6",
      "4",
      "3"
    ],
    "reponse": 1
  },
  {
    "id": "q1125",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Samoa ?",
    "options": [
      "Shilling somalien",
      "Tala",
      "Som kirghize",
      "Lempira"
    ],
    "reponse": 1
  },
  {
    "id": "q1126",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 98 ÷ 14 ?",
    "options": [
      "5",
      "7",
      "6",
      "8"
    ],
    "reponse": 1
  },
  {
    "id": "q1127",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat traditionnel suisse consiste à faire fondre du fromage pour y tremper du pain ?",
    "options": [
      "Le rösti",
      "La croûte au fromage",
      "La fondue",
      "La raclette"
    ],
    "reponse": 2
  },
  {
    "id": "q1128",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 19 m ?",
    "options": [
      "1900",
      "1735",
      "2048",
      "1843"
    ],
    "reponse": 0
  },
  {
    "id": "q1129",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des États-Unis ?",
    "options": [
      "Washington",
      "Asmara",
      "Kuala Lumpur",
      "Islamabad"
    ],
    "reponse": 0
  },
  {
    "id": "q1130",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays possède le plus grand nombre de fuseaux horaires ?",
    "options": [
      "Le Royaume-Uni",
      "La Russie",
      "La France",
      "Les États-Unis"
    ],
    "reponse": 2
  },
  {
    "id": "q1131",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Caracas est la capitale de quel pays ?",
    "options": [
      "Venezuela",
      "Biélorussie",
      "Mozambique",
      "Pakistan"
    ],
    "reponse": 0
  },
  {
    "id": "q1132",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 30 ÷ 10 ?",
    "options": [
      "4",
      "2",
      "3",
      "0"
    ],
    "reponse": 2
  },
  {
    "id": "q1133",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Paraguay ?",
    "options": [
      "Afrique",
      "Océanie",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q1134",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bhoutan ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q1135",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Afghanistan ?",
    "options": [
      "Dollar fidjien",
      "Afghani",
      "Cordoba",
      "Rial omanais"
    ],
    "reponse": 1
  },
  {
    "id": "q1136",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le principal moyen de défense du hérisson face à un prédateur ?",
    "options": [
      "Projeter des piquants à distance",
      "Se rouler en boule pour présenter ses piquants",
      "Sécréter un venin",
      "Prendre la fuite en courant très vite"
    ],
    "reponse": 1
  },
  {
    "id": "q1137",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cd » ?",
    "options": [
      "Praséodyme",
      "Magnésium",
      "Cadmium",
      "Actinium"
    ],
    "reponse": 2
  },
  {
    "id": "q1138",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 3400 année(s) ?",
    "options": [
      "34",
      "27",
      "30",
      "36"
    ],
    "reponse": 0
  },
  {
    "id": "q1139",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Prague est la capitale de quel pays ?",
    "options": [
      "Biélorussie",
      "Allemagne",
      "Bhoutan",
      "République tchèque"
    ],
    "reponse": 3
  },
  {
    "id": "q1140",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Zimbabwe",
      "Uruguay",
      "Guinée",
      "Bénin"
    ],
    "reponse": 3
  },
  {
    "id": "q1141",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel style musical et culturel est né à La Nouvelle-Orléans au début du XXe siècle ?",
    "options": [
      "Le blues",
      "Le gospel",
      "Le jazz",
      "Le ragtime"
    ],
    "reponse": 2
  },
  {
    "id": "q1142",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCCXVI en chiffres romains ?",
    "options": [
      "2317",
      "2318",
      "2311",
      "2316"
    ],
    "reponse": 3
  },
  {
    "id": "q1143",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Malabo est la capitale de quel pays ?",
    "options": [
      "Trinité-et-Tobago",
      "Guinée équatoriale",
      "Liban",
      "Brésil"
    ],
    "reponse": 1
  },
  {
    "id": "q1144",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 800 + 635 ?",
    "options": [
      "1435",
      "1433",
      "1432",
      "1436"
    ],
    "reponse": 0
  },
  {
    "id": "q1145",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1744 et 1785 ?",
    "options": [
      "37",
      "49",
      "41",
      "47"
    ],
    "reponse": 2
  },
  {
    "id": "q1146",
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
    "id": "q1147",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Sénégal ?",
    "options": [
      "🇸🇳",
      "🇧🇿",
      "🇦🇷",
      "🇱🇾"
    ],
    "reponse": 0
  },
  {
    "id": "q1148",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 17 ?",
    "options": [
      "75",
      "85",
      "94",
      "78"
    ],
    "reponse": 1
  },
  {
    "id": "q1149",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Canberra est la capitale de quel pays ?",
    "options": [
      "Éthiopie",
      "Australie",
      "Thaïlande",
      "Jamaïque"
    ],
    "reponse": 1
  },
  {
    "id": "q1150",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel auteur a créé le personnage du détective Hercule Poirot ?",
    "options": [
      "Raymond Chandler",
      "Arthur Conan Doyle",
      "Georges Simenon",
      "Agatha Christie"
    ],
    "reponse": 3
  },
  {
    "id": "q1151",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle est la reine des dieux dans la mythologie grecque, épouse et sœur de Zeus ?",
    "options": [
      "Déméter",
      "Héra",
      "Athéna",
      "Aphrodite"
    ],
    "reponse": 1
  },
  {
    "id": "q1152",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Chez le loup, quel terme désigne traditionnellement l'individu dominant qui dirige la meute ?",
    "options": [
      "Le loup chef",
      "Le loup bêta",
      "Le loup oméga",
      "Le loup alpha"
    ],
    "reponse": 3
  },
  {
    "id": "q1153",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCLXXII en chiffres romains ?",
    "options": [
      "3772",
      "3770",
      "3773",
      "3767"
    ],
    "reponse": 0
  },
  {
    "id": "q1154",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel désert se trouve principalement en Mongolie et en Chine ?",
    "options": [
      "Le Kalahari",
      "Le désert de Gobi",
      "Le désert du Néguev",
      "Le Sahara"
    ],
    "reponse": 1
  },
  {
    "id": "q1155",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel organe produit l'insuline dans le corps humain ?",
    "options": [
      "La thyroïde",
      "Le foie",
      "Le pancréas",
      "La rate"
    ],
    "reponse": 2
  },
  {
    "id": "q1156",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel studio a produit « Toy Story », premier long-métrage entièrement en images de synthèse ?",
    "options": [
      "DreamWorks",
      "Disney",
      "Illumination",
      "Pixar"
    ],
    "reponse": 3
  },
  {
    "id": "q1157",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 19 min ?",
    "options": [
      "1043",
      "1140",
      "1285",
      "1142"
    ],
    "reponse": 1
  },
  {
    "id": "q1158",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 18 ?",
    "options": [
      "277",
      "272",
      "251",
      "270"
    ],
    "reponse": 3
  },
  {
    "id": "q1159",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 452 + 255 ?",
    "options": [
      "709",
      "706",
      "707",
      "708"
    ],
    "reponse": 2
  },
  {
    "id": "q1160",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 54 ÷ 9 ?",
    "options": [
      "9",
      "8",
      "7",
      "6"
    ],
    "reponse": 3
  },
  {
    "id": "q1161",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle licence de jeux vidéo de gestion de ville et de commerce porte un nom composé d'une année (1404, 1800...) ?",
    "options": [
      "Anno",
      "Foundation",
      "Tropico",
      "Banished"
    ],
    "reponse": 0
  },
  {
    "id": "q1162",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Pays-Bas",
      "Irlande",
      "Australie",
      "Yémen"
    ],
    "reponse": 2
  },
  {
    "id": "q1163",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXIII en chiffres romains ?",
    "options": [
      "3213",
      "3212",
      "3215",
      "3214"
    ],
    "reponse": 0
  },
  {
    "id": "q1164",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel scientifique a inventé le paratonnerre ?",
    "options": [
      "Nikola Tesla",
      "Alessandro Volta",
      "Thomas Edison",
      "Benjamin Franklin"
    ],
    "reponse": 3
  },
  {
    "id": "q1165",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Royaume-Uni ?",
    "options": [
      "Afrique",
      "Amérique du Sud",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1166",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle ancienne cité inca, perchée dans les Andes péruviennes, a été redécouverte par l'Occident en 1911 ?",
    "options": [
      "Cusco",
      "Le Machu Picchu",
      "Chichén Itzá",
      "Ollantaytambo"
    ],
    "reponse": 1
  },
  {
    "id": "q1167",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 au carré ?",
    "options": [
      "97",
      "112",
      "100",
      "94"
    ],
    "reponse": 2
  },
  {
    "id": "q1168",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 120 ?",
    "options": [
      "11",
      "12",
      "14",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q1169",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Suède ?",
    "options": [
      "Couronne suédoise",
      "Som kirghize",
      "Afghani",
      "Shilling tanzanien"
    ],
    "reponse": 0
  },
  {
    "id": "q1170",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel est le nom du tout premier ordinateur électronique numérique généraliste, construit aux États-Unis en 1945 ?",
    "options": [
      "Le Colossus",
      "L'UNIVAC",
      "L'IBM 701",
      "L'ENIAC"
    ],
    "reponse": 3
  },
  {
    "id": "q1171",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1332 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "12e siècle",
      "14e siècle",
      "13e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1172",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Irlande ?",
    "options": [
      "Livre égyptienne",
      "Sum ouzbek",
      "Euro",
      "Riyal yéménite"
    ],
    "reponse": 2
  },
  {
    "id": "q1173",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kirghizstan ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q1174",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1242 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "14e siècle",
      "12e siècle",
      "11e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1175",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 934 + 288 ?",
    "options": [
      "1222",
      "1223",
      "1221",
      "1224"
    ],
    "reponse": 0
  },
  {
    "id": "q1176",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Éthiopie ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1177",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre néerlandais est célèbre pour « La Nuit étoilée » et s'est coupé une partie de l'oreille ?",
    "options": [
      "Vincent van Gogh",
      "Johannes Vermeer",
      "Rembrandt",
      "Claude Monet"
    ],
    "reponse": 0
  },
  {
    "id": "q1178",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 557 - 215 ?",
    "options": [
      "344",
      "343",
      "340",
      "342"
    ],
    "reponse": 3
  },
  {
    "id": "q1179",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Biélorussie ?",
    "options": [
      "🇸🇰",
      "🇨🇳",
      "🇧🇾",
      "🇸🇷"
    ],
    "reponse": 2
  },
  {
    "id": "q1180",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3177 en chiffres romains ?",
    "options": [
      "MMMCLXXII",
      "MMMCLXXXII",
      "MMMCLXXXVII",
      "MMMCLXXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q1181",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Comores ?",
    "options": [
      "Dollar bélizien",
      "Franc comorien",
      "Manat azerbaïdjanais",
      "Kwacha malawite"
    ],
    "reponse": 1
  },
  {
    "id": "q1182",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel fleuve transporte le plus grand débit d'eau de tous les fleuves du monde ?",
    "options": [
      "Le Mississippi",
      "Le Nil",
      "L'Amazone",
      "Le Yangtsé"
    ],
    "reponse": 2
  },
  {
    "id": "q1183",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2061 appartient à quel siècle ?",
    "options": [
      "20e siècle",
      "19e siècle",
      "22e siècle",
      "21e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1184",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle compétition de tennis oppose des équipes nationales masculines depuis 1900 ?",
    "options": [
      "La Coupe Davis",
      "La Laver Cup",
      "La Fed Cup",
      "La Ryder Cup"
    ],
    "reponse": 0
  },
  {
    "id": "q1185",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de jour(s) dans 6 semaine(s) ?",
    "options": [
      "38",
      "37",
      "46",
      "42"
    ],
    "reponse": 3
  },
  {
    "id": "q1186",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit la trilogie « Millénium » avec Lisbeth Salander ?",
    "options": [
      "Stieg Larsson",
      "Henning Mankell",
      "Camilla Läckberg",
      "Jo Nesbø"
    ],
    "reponse": 0
  },
  {
    "id": "q1187",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre a réalisé « La Joconde » ?",
    "options": [
      "Léonard de Vinci",
      "Raphaël",
      "Botticelli",
      "Michel-Ange"
    ],
    "reponse": 0
  },
  {
    "id": "q1188",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel sport de raquette se joue dans un court fermé sur quatre murs, avec une petite balle noire ?",
    "options": [
      "Le padel",
      "Le racquetball",
      "Le squash",
      "Le badminton"
    ],
    "reponse": 2
  },
  {
    "id": "q1189",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quel sport se joue traditionnellement sur gazon avec un maillet et une balle en bois, ancêtre du golf ou du hockey selon les versions ?",
    "options": [
      "Le polo",
      "Le bowls",
      "Le croquet",
      "Le cricket"
    ],
    "reponse": 2
  },
  {
    "id": "q1190",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vaduz est la capitale de quel pays ?",
    "options": [
      "Japon",
      "Liechtenstein",
      "Gabon",
      "Malawi"
    ],
    "reponse": 1
  },
  {
    "id": "q1191",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle boisson alcoolisée est obtenue par la fermentation du raisin ?",
    "options": [
      "La bière",
      "L'hydromel",
      "Le cidre",
      "Le vin"
    ],
    "reponse": 3
  },
  {
    "id": "q1192",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Macédoine du Nord",
      "Kazakhstan",
      "Estonie",
      "Grèce"
    ],
    "reponse": 3
  },
  {
    "id": "q1193",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cuba ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Europe",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q1194",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Stockholm est la capitale de quel pays ?",
    "options": [
      "Ukraine",
      "Timor oriental",
      "Guinée équatoriale",
      "Suède"
    ],
    "reponse": 3
  },
  {
    "id": "q1195",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel album des Beatles de 1967, à la pochette très colorée, est souvent cité comme un sommet de leur carrière ?",
    "options": [
      "Abbey Road",
      "Sgt. Pepper's Lonely Hearts Club Band",
      "The White Album",
      "Let It Be"
    ],
    "reponse": 1
  },
  {
    "id": "q1196",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 337 + 198 ?",
    "options": [
      "537",
      "538",
      "535",
      "533"
    ],
    "reponse": 2
  },
  {
    "id": "q1197",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Managua est la capitale de quel pays ?",
    "options": [
      "Finlande",
      "Nicaragua",
      "Canada",
      "Tanzanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1198",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Pologne ?",
    "options": [
      "🇳🇱",
      "🇵🇱",
      "🇴🇲",
      "🇲🇳"
    ],
    "reponse": 1
  },
  {
    "id": "q1199",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 445 + 856 ?",
    "options": [
      "1301",
      "1304",
      "1300",
      "1299"
    ],
    "reponse": 0
  },
  {
    "id": "q1200",
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
    "id": "q1201",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Botswana ?",
    "options": [
      "🇬🇭",
      "🇨🇮",
      "🇱🇷",
      "🇧🇼"
    ],
    "reponse": 3
  },
  {
    "id": "q1202",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 1200 cm ?",
    "options": [
      "12",
      "9",
      "16",
      "15"
    ],
    "reponse": 0
  },
  {
    "id": "q1203",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel format audio compressé, très répandu, porte l'extension « .mp3 » ?",
    "options": [
      "Advanced Audio Coding",
      "MPEG-1 Audio Layer III",
      "Windows Media Audio",
      "MPEG-4 Audio"
    ],
    "reponse": 1
  },
  {
    "id": "q1204",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 2 au carré ?",
    "options": [
      "4",
      "5",
      "6",
      "1"
    ],
    "reponse": 0
  },
  {
    "id": "q1205",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Portugal",
      "Italie",
      "Madagascar",
      "Costa Rica"
    ],
    "reponse": 0
  },
  {
    "id": "q1206",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République démocratique du Congo ?",
    "options": [
      "Tokyo",
      "Stockholm",
      "Kinshasa",
      "Windhoek"
    ],
    "reponse": 2
  },
  {
    "id": "q1207",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne un cyborg venu du futur dans « Terminator » ?",
    "options": [
      "Jean-Claude Van Damme",
      "Sylvester Stallone",
      "Arnold Schwarzenegger",
      "Dolph Lundgren"
    ],
    "reponse": 2
  },
  {
    "id": "q1208",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Namibie ?",
    "options": [
      "Franc djiboutien",
      "Dinar koweïtien",
      "Ouguiya",
      "Dollar namibien"
    ],
    "reponse": 3
  },
  {
    "id": "q1209",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Émirats arabes unis",
      "Autriche",
      "Laos",
      "Estonie"
    ],
    "reponse": 0
  },
  {
    "id": "q1210",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 391 + 860 ?",
    "options": [
      "1248",
      "1250",
      "1254",
      "1251"
    ],
    "reponse": 3
  },
  {
    "id": "q1211",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sn » ?",
    "options": [
      "Soufre",
      "Palladium",
      "Bore",
      "Étain"
    ],
    "reponse": 3
  },
  {
    "id": "q1212",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Ottawa est la capitale de quel pays ?",
    "options": [
      "Moldavie",
      "Japon",
      "Canada",
      "Chine"
    ],
    "reponse": 2
  },
  {
    "id": "q1213",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ba » ?",
    "options": [
      "Yttrium",
      "Baryum",
      "Calcium",
      "Osmium"
    ],
    "reponse": 1
  },
  {
    "id": "q1214",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lusaka est la capitale de quel pays ?",
    "options": [
      "Guinée équatoriale",
      "Australie",
      "Vanuatu",
      "Zambie"
    ],
    "reponse": 3
  },
  {
    "id": "q1215",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel compositeur a écrit la célèbre « Cinquième Symphonie » qui commence par « ta-ta-ta-taaa » ?",
    "options": [
      "Johann Sebastian Bach",
      "Ludwig van Beethoven",
      "Wolfgang Amadeus Mozart",
      "Franz Joseph Haydn"
    ],
    "reponse": 1
  },
  {
    "id": "q1216",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit la série de romans « Le Trône de fer » ?",
    "options": [
      "Brandon Sanderson",
      "J.R.R. Tolkien",
      "Robert Jordan",
      "George R.R. Martin"
    ],
    "reponse": 3
  },
  {
    "id": "q1217",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1900 en chiffres romains ?",
    "options": [
      "MDCCCXCIX",
      "MDCCCXCV",
      "MCM",
      "MCMII"
    ],
    "reponse": 2
  },
  {
    "id": "q1218",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kirghizstan ?",
    "options": [
      "🇩🇿",
      "🇰🇬",
      "🇨🇾",
      "🇧🇼"
    ],
    "reponse": 1
  },
  {
    "id": "q1219",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel spiritueux mexicain est distillé à partir du cœur cuit d'une variété d'agave bleu ?",
    "options": [
      "Le rhum",
      "Le mezcal",
      "Le pulque",
      "La tequila"
    ],
    "reponse": 3
  },
  {
    "id": "q1220",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel composant électronique central relie et permet la communication entre tous les éléments d'un ordinateur ?",
    "options": [
      "Le disque dur",
      "Le boîtier",
      "La carte mère",
      "L'alimentation"
    ],
    "reponse": 2
  },
  {
    "id": "q1221",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Vingt mille lieues sous les mers » ?",
    "options": [
      "H.G. Wells",
      "Jules Verne",
      "Victor Hugo",
      "Alexandre Dumas"
    ],
    "reponse": 1
  },
  {
    "id": "q1222",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « PDF » ?",
    "options": [
      "Personal Document Format",
      "Portable Document Format",
      "Public Data Format",
      "Printable Data File"
    ],
    "reponse": 1
  },
  {
    "id": "q1223",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 37 m ?",
    "options": [
      "37463",
      "33826",
      "37000",
      "35814"
    ],
    "reponse": 2
  },
  {
    "id": "q1224",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un jeune garçon qui se lie d'amitié avec un dragon nommé Krokmou ?",
    "options": [
      "Dragons",
      "Le Dragon des mers",
      "Le Roi et l'Oiseau",
      "Spirit"
    ],
    "reponse": 0
  },
  {
    "id": "q1225",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "À quelle distance se situe la cible en tir à l'arc lors des épreuves olympiques individuelles ?",
    "options": [
      "50 mètres",
      "30 mètres",
      "90 mètres",
      "70 mètres"
    ],
    "reponse": 3
  },
  {
    "id": "q1226",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Libye",
      "Italie",
      "Singapour",
      "Bangladesh"
    ],
    "reponse": 3
  },
  {
    "id": "q1227",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 2 × 15 ?",
    "options": [
      "34",
      "35",
      "29",
      "30"
    ],
    "reponse": 3
  },
  {
    "id": "q1228",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 23 + 275 ?",
    "options": [
      "301",
      "299",
      "298",
      "296"
    ],
    "reponse": 2
  },
  {
    "id": "q1229",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 300 ?",
    "options": [
      "18",
      "13",
      "17",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q1230",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cl dans 33 l ?",
    "options": [
      "3118",
      "2763",
      "3810",
      "3300"
    ],
    "reponse": 3
  },
  {
    "id": "q1231",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 108 + 313 ?",
    "options": [
      "419",
      "420",
      "424",
      "421"
    ],
    "reponse": 3
  },
  {
    "id": "q1232",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bhoutan ?",
    "options": [
      "🇧🇧",
      "🇷🇼",
      "🇬🇳",
      "🇧🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q1233",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 36 h ?",
    "options": [
      "2015",
      "2160",
      "1932",
      "2401"
    ],
    "reponse": 1
  },
  {
    "id": "q1234",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Niamey est la capitale de quel pays ?",
    "options": [
      "Japon",
      "Cuba",
      "Estonie",
      "Niger"
    ],
    "reponse": 3
  },
  {
    "id": "q1235",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 11 × 11 ?",
    "options": [
      "133",
      "121",
      "118",
      "116"
    ],
    "reponse": 1
  },
  {
    "id": "q1236",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1143 et 1233 ?",
    "options": [
      "75",
      "77",
      "90",
      "82"
    ],
    "reponse": 2
  },
  {
    "id": "q1237",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel dispositif de sécurité informatique filtre le trafic entrant et sortant d'un réseau selon des règles définies ?",
    "options": [
      "Un pare-feu",
      "Un antivirus",
      "Un proxy",
      "Un VPN"
    ],
    "reponse": 0
  },
  {
    "id": "q1238",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quelle école d'architecture et de design allemande, fondée en 1919, a durablement marqué le design moderne et fonctionnel ?",
    "options": [
      "L'École de Chicago",
      "L'Art nouveau",
      "Le Bauhaus",
      "Le constructivisme"
    ],
    "reponse": 2
  },
  {
    "id": "q1239",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Azote ?",
    "options": [
      "Y",
      "Yb",
      "N",
      "Ba"
    ],
    "reponse": 2
  },
  {
    "id": "q1240",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 21 siècle(s) ?",
    "options": [
      "2234",
      "1895",
      "2363",
      "2100"
    ],
    "reponse": 3
  },
  {
    "id": "q1241",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Maurice",
      "Russie",
      "Maroc",
      "Ukraine"
    ],
    "reponse": 0
  },
  {
    "id": "q1242",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel langage de programmation a été créé pour rendre les pages web interactives, malgré son nom proche de Java ?",
    "options": [
      "PHP",
      "TypeScript",
      "JavaScript",
      "Java"
    ],
    "reponse": 2
  },
  {
    "id": "q1243",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le quatrième état de la matière, au-delà du solide, du liquide et du gaz ?",
    "options": [
      "Le condensat",
      "Le plasma",
      "Le cristal",
      "Le colloïde"
    ],
    "reponse": 1
  },
  {
    "id": "q1244",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ouzbékistan ?",
    "options": [
      "Amman",
      "Nouakchott",
      "Tbilissi",
      "Tachkent"
    ],
    "reponse": 3
  },
  {
    "id": "q1245",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Argentine ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q1246",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle nymphe a retenu Ulysse prisonnier pendant sept ans sur son île ?",
    "options": [
      "Circé",
      "Nausicaa",
      "Calypso",
      "Pénélope"
    ],
    "reponse": 2
  },
  {
    "id": "q1247",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Gabon ?",
    "options": [
      "Afrique",
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q1248",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 2400 cl ?",
    "options": [
      "22",
      "20",
      "24",
      "23"
    ],
    "reponse": 2
  },
  {
    "id": "q1249",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 998 - 329 ?",
    "options": [
      "666",
      "669",
      "672",
      "671"
    ],
    "reponse": 1
  },
  {
    "id": "q1250",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Gaborone est la capitale de quel pays ?",
    "options": [
      "Malawi",
      "Papouasie-Nouvelle-Guinée",
      "Érythrée",
      "Botswana"
    ],
    "reponse": 3
  },
  {
    "id": "q1251",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1321 et 1569 ?",
    "options": [
      "268",
      "278",
      "248",
      "267"
    ],
    "reponse": 2
  },
  {
    "id": "q1252",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Maurice ?",
    "options": [
      "Cedi",
      "Somoni",
      "Baht",
      "Roupie mauricienne"
    ],
    "reponse": 3
  },
  {
    "id": "q1253",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle mer intérieure d'Asie centrale, autrefois la quatrième plus grande étendue d'eau douce du monde, a considérablement rétréci depuis les années 1960 ?",
    "options": [
      "La mer d'Aral",
      "Le lac Balkhach",
      "La mer Morte",
      "La mer Caspienne"
    ],
    "reponse": 0
  },
  {
    "id": "q1254",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle partie de l'œil humain est sensible à la lumière et transmet l'image au cerveau ?",
    "options": [
      "La rétine",
      "La cornée",
      "L'iris",
      "Le cristallin"
    ],
    "reponse": 0
  },
  {
    "id": "q1255",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kirghizstan ?",
    "options": [
      "Som kirghize",
      "Dinar irakien",
      "Taka",
      "Dollar zimbabwéen"
    ],
    "reponse": 0
  },
  {
    "id": "q1256",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Erbium ?",
    "options": [
      "Ca",
      "Ti",
      "Er",
      "Tl"
    ],
    "reponse": 2
  },
  {
    "id": "q1257",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Népal ?",
    "options": [
      "🇧🇦",
      "🇸🇦",
      "🇳🇵",
      "🇱🇧"
    ],
    "reponse": 2
  },
  {
    "id": "q1258",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Calcium ?",
    "options": [
      "Mg",
      "Cu",
      "Eu",
      "Ca"
    ],
    "reponse": 3
  },
  {
    "id": "q1259",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 724 + 772 ?",
    "options": [
      "1499",
      "1493",
      "1496",
      "1498"
    ],
    "reponse": 2
  },
  {
    "id": "q1260",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Combien de temps dure en moyenne la gestation d'un éléphant ?",
    "options": [
      "18 mois",
      "Environ 22 mois",
      "12 mois",
      "9 mois"
    ],
    "reponse": 1
  },
  {
    "id": "q1261",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 340 + 48 ?",
    "options": [
      "389",
      "388",
      "390",
      "386"
    ],
    "reponse": 1
  },
  {
    "id": "q1262",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 19 ?",
    "options": [
      "120",
      "125",
      "126",
      "133"
    ],
    "reponse": 3
  },
  {
    "id": "q1263",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète et écrivain français du Moyen Âge a écrit « La Ballade des pendus » ?",
    "options": [
      "Christine de Pizan",
      "François Villon",
      "Charles d'Orléans",
      "Rutebeuf"
    ],
    "reponse": 1
  },
  {
    "id": "q1264",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Vanuatu ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1265",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1490 en chiffres romains ?",
    "options": [
      "MCDXCI",
      "MCDXCII",
      "MCDLXXXVIII",
      "MCDXC"
    ],
    "reponse": 3
  },
  {
    "id": "q1266",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1773 et 1969 ?",
    "options": [
      "185",
      "212",
      "196",
      "180"
    ],
    "reponse": 2
  },
  {
    "id": "q1267",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Namibie ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q1268",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Timor oriental ?",
    "options": [
      "🇨🇩",
      "🇱🇧",
      "🇬🇦",
      "🇹🇱"
    ],
    "reponse": 3
  },
  {
    "id": "q1269",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est connu pour dormir debout et peut dormir seulement quelques heures par jour ?",
    "options": [
      "Le cheval",
      "Le mouton",
      "La vache",
      "La chèvre"
    ],
    "reponse": 0
  },
  {
    "id": "q1270",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1593 et 1624 ?",
    "options": [
      "35",
      "31",
      "36",
      "27"
    ],
    "reponse": 1
  },
  {
    "id": "q1271",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 555 + 897 ?",
    "options": [
      "1451",
      "1450",
      "1452",
      "1453"
    ],
    "reponse": 2
  },
  {
    "id": "q1272",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quel nom porte la rivalité sportive historique entre l'Angleterre et l'Australie au cricket ?",
    "options": [
      "La Coupe des nations",
      "Les Ashes (« les Cendres »)",
      "La Coupe du Commonwealth",
      "Le Trophée impérial"
    ],
    "reponse": 1
  },
  {
    "id": "q1273",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien d'anneaux compte le symbole olympique ?",
    "options": [
      "6",
      "7",
      "4",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q1274",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Freetown est la capitale de quel pays ?",
    "options": [
      "Barbade",
      "République démocratique du Congo",
      "Sierra Leone",
      "Lituanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1275",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 943 appartient à quel siècle ?",
    "options": [
      "8e siècle",
      "10e siècle",
      "11e siècle",
      "9e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1276",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays européen est constitué de plus de 1400 îles et est traversé par de nombreux fjords ?",
    "options": [
      "Le Danemark",
      "La Croatie",
      "La Grèce",
      "La Norvège"
    ],
    "reponse": 3
  },
  {
    "id": "q1277",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCXC en chiffres romains ?",
    "options": [
      "1789",
      "1790",
      "1792",
      "1788"
    ],
    "reponse": 1
  },
  {
    "id": "q1278",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel protocole permet d'afficher les pages web, dont l'abréviation précède les adresses (http) ?",
    "options": [
      "Simple Mail Transfer Protocol",
      "HyperText Transfer Protocol",
      "Internet Message Protocol",
      "File Transfer Protocol"
    ],
    "reponse": 1
  },
  {
    "id": "q1279",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète est surnommée la « planète rouge » ?",
    "options": [
      "Mars",
      "Jupiter",
      "Mercure",
      "Vénus"
    ],
    "reponse": 0
  },
  {
    "id": "q1280",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 520 - 350 ?",
    "options": [
      "167",
      "170",
      "171",
      "169"
    ],
    "reponse": 1
  },
  {
    "id": "q1281",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 729 ?",
    "options": [
      "27",
      "25",
      "28",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q1282",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Oman",
      "Guinée-Bissau",
      "Bahreïn",
      "Arabie saoudite"
    ],
    "reponse": 1
  },
  {
    "id": "q1283",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Seychelles ?",
    "options": [
      "🇸🇨",
      "🇰🇲",
      "🇷🇼",
      "🇺🇦"
    ],
    "reponse": 0
  },
  {
    "id": "q1284",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel phénomène atmosphérique coloré résulte de la réfraction et de la dispersion de la lumière dans des gouttes d'eau ?",
    "options": [
      "Le halo lunaire",
      "L'arc-en-ciel",
      "Le mirage",
      "Les aurores boréales"
    ],
    "reponse": 1
  },
  {
    "id": "q1285",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Combien de cavités compte le cœur humain ?",
    "options": [
      "3",
      "6",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q1286",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 186 - 35 ?",
    "options": [
      "150",
      "149",
      "151",
      "154"
    ],
    "reponse": 2
  },
  {
    "id": "q1287",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 121 - 86 ?",
    "options": [
      "36",
      "35",
      "37",
      "34"
    ],
    "reponse": 1
  },
  {
    "id": "q1288",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport hivernal se pratique en glissant sur une piste avec des pierres et des balais ?",
    "options": [
      "Le skeleton",
      "Le patinage de vitesse",
      "Le bobsleigh",
      "Le curling"
    ],
    "reponse": 3
  },
  {
    "id": "q1289",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kirghizstan ?",
    "options": [
      "Bichkek",
      "Damas",
      "Brasilia",
      "Alger"
    ],
    "reponse": 0
  },
  {
    "id": "q1290",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe américain de thrash metal est connu pour « Master of Puppets » et « Enter Sandman » ?",
    "options": [
      "Anthrax",
      "Megadeth",
      "Metallica",
      "Slayer"
    ],
    "reponse": 2
  },
  {
    "id": "q1291",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Accra est la capitale de quel pays ?",
    "options": [
      "Paraguay",
      "Rwanda",
      "Ghana",
      "Suriname"
    ],
    "reponse": 2
  },
  {
    "id": "q1292",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel roman de John Steinbeck suit une famille de fermiers ruinés migrant vers la Californie pendant la Grande Dépression ?",
    "options": [
      "Tortilla Flat",
      "À l'est d'Éden",
      "Les Raisins de la colère",
      "Des souris et des hommes"
    ],
    "reponse": 2
  },
  {
    "id": "q1293",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1212 en chiffres romains ?",
    "options": [
      "MCCXIV",
      "MCCXII",
      "MCCX",
      "MCCXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1294",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de min dans 2100 s ?",
    "options": [
      "32",
      "35",
      "31",
      "30"
    ],
    "reponse": 1
  },
  {
    "id": "q1295",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Luxembourg ?",
    "options": [
      "Euro",
      "Peso argentin",
      "Manat azerbaïdjanais",
      "Couronne suédoise"
    ],
    "reponse": 0
  },
  {
    "id": "q1296",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Djibouti ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1297",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle boisson alcoolisée écossaise est obtenue par distillation d'orge maltée puis vieillie en fût de chêne ?",
    "options": [
      "Le rhum",
      "Le gin",
      "Le whisky",
      "La vodka"
    ],
    "reponse": 2
  },
  {
    "id": "q1298",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 406 - 273 ?",
    "options": [
      "133",
      "131",
      "136",
      "135"
    ],
    "reponse": 0
  },
  {
    "id": "q1299",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MXVIII en chiffres romains ?",
    "options": [
      "1008",
      "1018",
      "1013",
      "1019"
    ],
    "reponse": 1
  },
  {
    "id": "q1300",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1666 et 1864 ?",
    "options": [
      "230",
      "231",
      "182",
      "198"
    ],
    "reponse": 3
  },
  {
    "id": "q1301",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 24 ÷ 3 ?",
    "options": [
      "6",
      "11",
      "8",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q1302",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1598 et 1710 ?",
    "options": [
      "117",
      "98",
      "92",
      "112"
    ],
    "reponse": 3
  },
  {
    "id": "q1303",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 602 - 408 ?",
    "options": [
      "197",
      "195",
      "192",
      "194"
    ],
    "reponse": 3
  },
  {
    "id": "q1304",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCLI en chiffres romains ?",
    "options": [
      "3253",
      "3261",
      "3250",
      "3251"
    ],
    "reponse": 3
  },
  {
    "id": "q1305",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Rwanda",
      "Australie",
      "Indonésie",
      "Slovaquie"
    ],
    "reponse": 2
  },
  {
    "id": "q1306",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 160 ÷ 10 ?",
    "options": [
      "16",
      "20",
      "17",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q1307",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 30000 kg ?",
    "options": [
      "37",
      "33",
      "30",
      "32"
    ],
    "reponse": 2
  },
  {
    "id": "q1308",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 651 + 582 ?",
    "options": [
      "1232",
      "1233",
      "1231",
      "1230"
    ],
    "reponse": 1
  },
  {
    "id": "q1309",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 19 ?",
    "options": [
      "98",
      "101",
      "95",
      "107"
    ],
    "reponse": 2
  },
  {
    "id": "q1310",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cérium ?",
    "options": [
      "Cm",
      "Ce",
      "Sm",
      "F"
    ],
    "reponse": 1
  },
  {
    "id": "q1311",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Kazakhstan",
      "Lituanie",
      "Vanuatu",
      "Guatemala"
    ],
    "reponse": 2
  },
  {
    "id": "q1312",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 800 ?",
    "options": [
      "219",
      "250",
      "223",
      "240"
    ],
    "reponse": 3
  },
  {
    "id": "q1313",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal africain possède le cou le plus long du règne animal ?",
    "options": [
      "Le chameau",
      "L'autruche",
      "La girafe",
      "L'éléphant"
    ],
    "reponse": 2
  },
  {
    "id": "q1314",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 6 ?",
    "options": [
      "30",
      "32",
      "31",
      "25"
    ],
    "reponse": 0
  },
  {
    "id": "q1315",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a créé l'univers de « Twin Peaks » et « Mulholland Drive » ?",
    "options": [
      "David Lynch",
      "David Cronenberg",
      "Tim Burton",
      "David Fincher"
    ],
    "reponse": 0
  },
  {
    "id": "q1316",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1712 en chiffres romains ?",
    "options": [
      "MDCCX",
      "MDCCXII",
      "MDCCXIV",
      "MDCCXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1317",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle flotte espagnole a été défaite par l'Angleterre en 1588 ?",
    "options": [
      "La flotte des Indes",
      "L'Invincible Armada",
      "La flotte de Lépante",
      "La flotte de Trafalgar"
    ],
    "reponse": 1
  },
  {
    "id": "q1318",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Belgique ?",
    "options": [
      "Amsterdam",
      "Kaboul",
      "Bangkok",
      "Bruxelles"
    ],
    "reponse": 3
  },
  {
    "id": "q1319",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 837 + 399 ?",
    "options": [
      "1239",
      "1236",
      "1233",
      "1234"
    ],
    "reponse": 1
  },
  {
    "id": "q1320",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇶 De quel pays est-ce le drapeau ?",
    "options": [
      "Rwanda",
      "Bhoutan",
      "Guinée équatoriale",
      "Cuba"
    ],
    "reponse": 2
  },
  {
    "id": "q1321",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin possède un exosquelette et marche de côté ?",
    "options": [
      "Le crabe",
      "La crevette",
      "L'écrevisse",
      "Le homard"
    ],
    "reponse": 0
  },
  {
    "id": "q1322",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 26 cm ?",
    "options": [
      "260",
      "223",
      "254",
      "263"
    ],
    "reponse": 0
  },
  {
    "id": "q1323",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Grèce ?",
    "options": [
      "🇶🇦",
      "🇨🇮",
      "🇬🇷",
      "🇴🇲"
    ],
    "reponse": 2
  },
  {
    "id": "q1324",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Jordanie ?",
    "options": [
      "Peso argentin",
      "Ariary",
      "Dinar jordanien",
      "Sol péruvien"
    ],
    "reponse": 2
  },
  {
    "id": "q1325",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Oman ?",
    "options": [
      "Kip",
      "Kwacha malawite",
      "Rial omanais",
      "Dirham"
    ],
    "reponse": 2
  },
  {
    "id": "q1326",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel événement du 6 juin 1944 a vu les forces alliées débarquer sur les plages françaises ?",
    "options": [
      "Le débarquement de Normandie",
      "La bataille d'Angleterre",
      "L'opération Market Garden",
      "Le débarquement de Provence"
    ],
    "reponse": 0
  },
  {
    "id": "q1327",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Nb » ?",
    "options": [
      "Magnésium",
      "Azote",
      "Niobium",
      "Césium"
    ],
    "reponse": 2
  },
  {
    "id": "q1328",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2917 en chiffres romains ?",
    "options": [
      "MMCMXVII",
      "MMCMXXII",
      "MMCMXVIII",
      "MMCMVII"
    ],
    "reponse": 0
  },
  {
    "id": "q1329",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCXCVII en chiffres romains ?",
    "options": [
      "1898",
      "1899",
      "1902",
      "1897"
    ],
    "reponse": 3
  },
  {
    "id": "q1330",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel était le navire amiral, plus grand que ses deux compagnons, lors de la traversée de l'Atlantique par Christophe Colomb en 1492 ?",
    "options": [
      "La Santa María",
      "La Niña",
      "La Pinta",
      "Le Mayflower"
    ],
    "reponse": 0
  },
  {
    "id": "q1331",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quelle actrice a incarné la reine dans « La Reine des neiges » (voix originale) ?",
    "options": [
      "Demi Lovato",
      "Kristen Bell",
      "Idina Menzel",
      "Ariana Grande"
    ],
    "reponse": 2
  },
  {
    "id": "q1332",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel fromage français à pâte persillée, affiné dans des caves naturelles, bénéficie d'une AOP depuis 1925 ?",
    "options": [
      "Le stilton",
      "Le roquefort",
      "Le bleu d'Auvergne",
      "Le gorgonzola"
    ],
    "reponse": 1
  },
  {
    "id": "q1333",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 35 ÷ 7 ?",
    "options": [
      "8",
      "5",
      "7",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q1334",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien du chaos et de la tempête a tué son frère Osiris ?",
    "options": [
      "Thot",
      "Horus",
      "Anubis",
      "Seth"
    ],
    "reponse": 3
  },
  {
    "id": "q1335",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kosovo ?",
    "options": [
      "Kigali",
      "Tirana",
      "Pristina",
      "Paris"
    ],
    "reponse": 2
  },
  {
    "id": "q1336",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle zone volcanique et sismique majeure encercle un vaste océan, concentrant l'essentiel des séismes et éruptions de la planète ?",
    "options": [
      "La dorsale médio-atlantique",
      "La faille de San Andreas",
      "La ceinture de feu du Pacifique",
      "Le Triangle de corail"
    ],
    "reponse": 2
  },
  {
    "id": "q1337",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 20 ?",
    "options": [
      "6",
      "3",
      "9",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q1338",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 120 ?",
    "options": [
      "20",
      "18",
      "22",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q1339",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Vanuatu ?",
    "options": [
      "🇻🇺",
      "🇰🇬",
      "🇬🇼",
      "🇯🇲"
    ],
    "reponse": 0
  },
  {
    "id": "q1340",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel terme désigne, dans la mythologie nordique, la fin du monde et le combat final entre dieux et géants ?",
    "options": [
      "Le Valhalla",
      "Le Midgard",
      "Le Ragnarök",
      "Le Bifrost"
    ],
    "reponse": 2
  },
  {
    "id": "q1341",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 190 ÷ 10 ?",
    "options": [
      "17",
      "16",
      "18",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q1342",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Asie",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q1343",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDXXVI en chiffres romains ?",
    "options": [
      "2426",
      "2424",
      "2427",
      "2431"
    ],
    "reponse": 0
  },
  {
    "id": "q1344",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rôle et d'action met en scène un sorcier nommé Geralt de Riv ?",
    "options": [
      "Skyrim",
      "Dragon Age",
      "Dark Souls",
      "The Witcher"
    ],
    "reponse": 3
  },
  {
    "id": "q1345",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Tadjikistan",
      "Trinité-et-Tobago",
      "Macédoine du Nord",
      "Haïti"
    ],
    "reponse": 2
  },
  {
    "id": "q1346",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pologne ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1347",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film culte de 1942, se déroulant au Maroc pendant la Seconde Guerre mondiale, réunit Humphrey Bogart et Ingrid Bergman ?",
    "options": [
      "Le Faucon maltais",
      "Les Enchaînés",
      "Le Troisième Homme",
      "Casablanca"
    ],
    "reponse": 3
  },
  {
    "id": "q1348",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel personnage grec s'est envolé avec des ailes de cire et de plumes, mais est mort en s'approchant trop près du Soleil ?",
    "options": [
      "Dédale",
      "Bellérophon",
      "Phaéton",
      "Icare"
    ],
    "reponse": 3
  },
  {
    "id": "q1349",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 15 h ?",
    "options": [
      "934",
      "913",
      "900",
      "1000"
    ],
    "reponse": 2
  },
  {
    "id": "q1350",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 26 au carré ?",
    "options": [
      "676",
      "590",
      "657",
      "730"
    ],
    "reponse": 0
  },
  {
    "id": "q1351",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel sport olympique consiste à faire avancer une embarcation à l'aide de rames, en solo ou en équipage ?",
    "options": [
      "Le paddle",
      "L'aviron",
      "La voile",
      "Le canoë-kayak"
    ],
    "reponse": 1
  },
  {
    "id": "q1352",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Maldives ?",
    "options": [
      "🇦🇿",
      "🇫🇮",
      "🇰🇭",
      "🇲🇻"
    ],
    "reponse": 3
  },
  {
    "id": "q1353",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Bosnie-Herzégovine ?",
    "options": [
      "🇧🇦",
      "🇸🇰",
      "🇩🇰",
      "🇨🇱"
    ],
    "reponse": 0
  },
  {
    "id": "q1354",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 352 en chiffres romains ?",
    "options": [
      "CCCLI",
      "CCCXLII",
      "CCCLII",
      "CCCL"
    ],
    "reponse": 2
  },
  {
    "id": "q1355",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Afghanistan",
      "Géorgie",
      "Ghana",
      "Cambodge"
    ],
    "reponse": 2
  },
  {
    "id": "q1356",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du système d'exploitation mobile développé par Google ?",
    "options": [
      "Android",
      "iOS",
      "Symbian",
      "BlackBerry OS"
    ],
    "reponse": 0
  },
  {
    "id": "q1357",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport dit-on qu'un joueur a réalisé un « triple double » ?",
    "options": [
      "Le basket-ball",
      "Le volley-ball",
      "Le baseball",
      "Le football américain"
    ],
    "reponse": 0
  },
  {
    "id": "q1358",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 au carré ?",
    "options": [
      "16",
      "17",
      "12",
      "14"
    ],
    "reponse": 0
  },
  {
    "id": "q1359",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇨 De quel pays est-ce le drapeau ?",
    "options": [
      "Guyana",
      "Haïti",
      "Seychelles",
      "Allemagne"
    ],
    "reponse": 2
  },
  {
    "id": "q1360",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Panama ?",
    "options": [
      "Balboa",
      "Shilling somalien",
      "Guarani",
      "Peso mexicain"
    ],
    "reponse": 0
  },
  {
    "id": "q1361",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Afghanistan ?",
    "options": [
      "🇸🇳",
      "🇦🇫",
      "🇩🇰",
      "🇹🇷"
    ],
    "reponse": 1
  },
  {
    "id": "q1362",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Éthiopie ?",
    "options": [
      "🇨🇬",
      "🇪🇹",
      "🇭🇹",
      "🇳🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q1363",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel géant nordique surveille le pont arc-en-ciel Bifrost ?",
    "options": [
      "Vidar",
      "Baldr",
      "Tyr",
      "Heimdall"
    ],
    "reponse": 3
  },
  {
    "id": "q1364",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel réseau de routes commerciales antiques reliait la Chine à l'Europe et au Moyen-Orient ?",
    "options": [
      "La route de la soie",
      "La route de l'encens",
      "La route de l'ambre",
      "La route des épices"
    ],
    "reponse": 0
  },
  {
    "id": "q1365",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 252 ÷ 14 ?",
    "options": [
      "15",
      "18",
      "22",
      "14"
    ],
    "reponse": 1
  },
  {
    "id": "q1366",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle légende attribue à une fermière normande, Marie Harel, l'invention d'un célèbre fromage à pâte molle et croûte fleurie ?",
    "options": [
      "Le brie",
      "Le pont-l'évêque",
      "Le coulommiers",
      "Le camembert"
    ],
    "reponse": 3
  },
  {
    "id": "q1367",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Bosnie-Herzégovine ?",
    "options": [
      "Escudo cap-verdien",
      "Mark convertible",
      "Som kirghize",
      "Peso dominicain"
    ],
    "reponse": 1
  },
  {
    "id": "q1368",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Brésil ?",
    "options": [
      "🇧🇷",
      "🇹🇲",
      "🇦🇹",
      "🇧🇫"
    ],
    "reponse": 0
  },
  {
    "id": "q1369",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3700 en chiffres romains ?",
    "options": [
      "MMMDCC",
      "MMMDCCI",
      "MMMDCXCVIII",
      "MMMDCXCIX"
    ],
    "reponse": 0
  },
  {
    "id": "q1370",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 963 - 261 ?",
    "options": [
      "699",
      "704",
      "702",
      "705"
    ],
    "reponse": 2
  },
  {
    "id": "q1371",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Botswana ?",
    "options": [
      "Roupie mauricienne",
      "Pula",
      "Peso chilien",
      "Rouble biélorusse"
    ],
    "reponse": 1
  },
  {
    "id": "q1372",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2782 en chiffres romains ?",
    "options": [
      "MMDCCLXXXII",
      "MMDCCXCII",
      "MMDCCLXXXIV",
      "MMDCCLXXII"
    ],
    "reponse": 0
  },
  {
    "id": "q1373",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇯🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Tunisie",
      "France",
      "Jamaïque",
      "Monaco"
    ],
    "reponse": 2
  },
  {
    "id": "q1374",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel géant grec a été condamné à porter le monde sur ses épaules ?",
    "options": [
      "Cronos",
      "Ouranos",
      "Prométhée",
      "Atlas"
    ],
    "reponse": 3
  },
  {
    "id": "q1375",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 236 + 606 ?",
    "options": [
      "842",
      "841",
      "840",
      "845"
    ],
    "reponse": 0
  },
  {
    "id": "q1376",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Moldavie ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1377",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel physicien français a découvert la radioactivité naturelle en 1896 ?",
    "options": [
      "Ernest Rutherford",
      "Henri Becquerel",
      "Pierre Curie",
      "Wilhelm Röntgen"
    ],
    "reponse": 1
  },
  {
    "id": "q1378",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 806 - 108 ?",
    "options": [
      "695",
      "698",
      "700",
      "699"
    ],
    "reponse": 1
  },
  {
    "id": "q1379",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCCLXVII en chiffres romains ?",
    "options": [
      "868",
      "866",
      "865",
      "867"
    ],
    "reponse": 3
  },
  {
    "id": "q1380",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 772 + 402 ?",
    "options": [
      "1177",
      "1174",
      "1175",
      "1172"
    ],
    "reponse": 1
  },
  {
    "id": "q1381",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Uranium ?",
    "options": [
      "U",
      "Po",
      "Ga",
      "Pu"
    ],
    "reponse": 0
  },
  {
    "id": "q1382",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 388 + 211 ?",
    "options": [
      "600",
      "598",
      "599",
      "596"
    ],
    "reponse": 2
  },
  {
    "id": "q1383",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de m dans 32 km ?",
    "options": [
      "36789",
      "28951",
      "28403",
      "32000"
    ],
    "reponse": 3
  },
  {
    "id": "q1384",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock américain a pour chanteur Anthony Kiedis, connu pour « Californication » ?",
    "options": [
      "Red Hot Chili Peppers",
      "Pearl Jam",
      "Foo Fighters",
      "Nirvana"
    ],
    "reponse": 0
  },
  {
    "id": "q1385",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 738 en chiffres romains ?",
    "options": [
      "DCCXXXVII",
      "DCCXXXVIII",
      "DCCXLVIII",
      "DCCXXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1386",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle réunion diplomatique de 1814-1815 a redessiné la carte de l'Europe après les guerres napoléoniennes ?",
    "options": [
      "Le traité de Westphalie",
      "La conférence de Berlin",
      "Le congrès de Vienne",
      "Le traité de Versailles"
    ],
    "reponse": 2
  },
  {
    "id": "q1387",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 108 ÷ 6 ?",
    "options": [
      "19",
      "22",
      "18",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q1388",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1535 et 1626 ?",
    "options": [
      "88",
      "105",
      "91",
      "108"
    ],
    "reponse": 2
  },
  {
    "id": "q1389",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 888 - 832 ?",
    "options": [
      "53",
      "54",
      "56",
      "55"
    ],
    "reponse": 2
  },
  {
    "id": "q1390",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 17 min ?",
    "options": [
      "908",
      "1020",
      "879",
      "1101"
    ],
    "reponse": 1
  },
  {
    "id": "q1391",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1276 et 1481 ?",
    "options": [
      "207",
      "230",
      "205",
      "206"
    ],
    "reponse": 2
  },
  {
    "id": "q1392",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Hg » ?",
    "options": [
      "Mercure",
      "Palladium",
      "Xénon",
      "Gadolinium"
    ],
    "reponse": 0
  },
  {
    "id": "q1393",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 8 ?",
    "options": [
      "127",
      "96",
      "112",
      "113"
    ],
    "reponse": 2
  },
  {
    "id": "q1394",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel navigateur italien a donné indirectement son prénom au continent américain ?",
    "options": [
      "Amerigo Vespucci",
      "Fernand de Magellan",
      "Christophe Colomb",
      "Jean Cabot"
    ],
    "reponse": 0
  },
  {
    "id": "q1395",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Argentine ?",
    "options": [
      "Ngultrum",
      "Peso argentin",
      "Vatu",
      "Peso cubain"
    ],
    "reponse": 1
  },
  {
    "id": "q1396",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Azerbaïdjan ?",
    "options": [
      "Océanie",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1397",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel DJ et producteur français est connu pour « One More Time » au sein de Daft Punk ?",
    "options": [
      "Martin Solveig",
      "Bob Sinclar",
      "David Guetta",
      "Thomas Bangalter"
    ],
    "reponse": 3
  },
  {
    "id": "q1398",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de temps dure une mi-temps au football ?",
    "options": [
      "30 minutes",
      "45 minutes",
      "40 minutes",
      "50 minutes"
    ],
    "reponse": 1
  },
  {
    "id": "q1399",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel satellite artificiel, lancé par l'URSS en 1957, a marqué le début de la course à l'espace ?",
    "options": [
      "Explorer 1",
      "Spoutnik 1",
      "Vostok 1",
      "Apollo 11"
    ],
    "reponse": 1
  },
  {
    "id": "q1400",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCMXXIV en chiffres romains ?",
    "options": [
      "1929",
      "1922",
      "1926",
      "1924"
    ],
    "reponse": 3
  },
  {
    "id": "q1401",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle chaîne de montagnes traverse l'Amérique du Sud d'un bout à l'autre ?",
    "options": [
      "La cordillère des Andes",
      "Les Rocheuses",
      "La Sierra Madre",
      "La cordillère Centrale"
    ],
    "reponse": 0
  },
  {
    "id": "q1402",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 260 ml ?",
    "options": [
      "23",
      "20",
      "26",
      "27"
    ],
    "reponse": 2
  },
  {
    "id": "q1403",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3524 en chiffres romains ?",
    "options": [
      "MMMDXXIX",
      "MMMDXXV",
      "MMMDXXIV",
      "MMMDXIX"
    ],
    "reponse": 2
  },
  {
    "id": "q1404",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 ÷ 3 ?",
    "options": [
      "29",
      "31",
      "30",
      "33"
    ],
    "reponse": 2
  },
  {
    "id": "q1405",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2984 en chiffres romains ?",
    "options": [
      "MMCMLXXXVI",
      "MMCMLXXXIII",
      "MMCMLXXXIV",
      "MMCMXCIV"
    ],
    "reponse": 2
  },
  {
    "id": "q1406",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1649 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "17e siècle",
      "15e siècle",
      "16e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1407",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Honduras ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q1408",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Batman dans « The Dark Knight » et l'ensemble de sa trilogie ?",
    "options": [
      "George Clooney",
      "Michael Keaton",
      "Ben Affleck",
      "Christian Bale"
    ],
    "reponse": 3
  },
  {
    "id": "q1409",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 169 - 136 ?",
    "options": [
      "35",
      "30",
      "33",
      "34"
    ],
    "reponse": 2
  },
  {
    "id": "q1410",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel terme désigne le stockage et le traitement de données sur des serveurs distants accessibles via internet ?",
    "options": [
      "Le cloud computing",
      "Le grid computing",
      "Le quantum computing",
      "Le edge computing"
    ],
    "reponse": 0
  },
  {
    "id": "q1411",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Liberia ?",
    "options": [
      "Monrovia",
      "Conakry",
      "Manama",
      "Beyrouth"
    ],
    "reponse": 0
  },
  {
    "id": "q1412",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 100 ?",
    "options": [
      "25",
      "29",
      "28",
      "23"
    ],
    "reponse": 0
  },
  {
    "id": "q1413",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel est le plus long fleuve du monde ?",
    "options": [
      "Le Yangtsé",
      "Le Nil",
      "L'Amazone",
      "Le Mississippi"
    ],
    "reponse": 1
  },
  {
    "id": "q1414",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel organe assure la production de la bile, qui aide à digérer les graisses ?",
    "options": [
      "Le foie",
      "La rate",
      "L'estomac",
      "Le pancréas"
    ],
    "reponse": 0
  },
  {
    "id": "q1415",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du service de messagerie électronique gratuit lancé par Google en 2004 ?",
    "options": [
      "Yahoo Mail",
      "Hotmail",
      "Gmail",
      "Outlook"
    ],
    "reponse": 2
  },
  {
    "id": "q1416",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Gambie ?",
    "options": [
      "Port Moresby",
      "Londres",
      "Riyad",
      "Banjul"
    ],
    "reponse": 3
  },
  {
    "id": "q1417",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la République dominicaine ?",
    "options": [
      "Dollar bahaméen",
      "Peso dominicain",
      "Franc rwandais",
      "Kwanza"
    ],
    "reponse": 1
  },
  {
    "id": "q1418",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Saint-Marin ?",
    "options": [
      "🇲🇩",
      "🇸🇲",
      "🇧🇸",
      "🇧🇳"
    ],
    "reponse": 1
  },
  {
    "id": "q1419",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Plomb ?",
    "options": [
      "Tc",
      "Pb",
      "Os",
      "Mg"
    ],
    "reponse": 1
  },
  {
    "id": "q1420",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « La Métamorphose », où un homme se réveille transformé en insecte ?",
    "options": [
      "Stefan Zweig",
      "Hermann Hesse",
      "Franz Kafka",
      "Thomas Mann"
    ],
    "reponse": 2
  },
  {
    "id": "q1421",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « N » ?",
    "options": [
      "Argon",
      "Cobalt",
      "Aluminium",
      "Azote"
    ],
    "reponse": 3
  },
  {
    "id": "q1422",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Mongolie ?",
    "options": [
      "Shilling ougandais",
      "Tugrik",
      "Leu roumain",
      "Dollar néo-zélandais"
    ],
    "reponse": 1
  },
  {
    "id": "q1423",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 940 + 924 ?",
    "options": [
      "1865",
      "1864",
      "1862",
      "1867"
    ],
    "reponse": 1
  },
  {
    "id": "q1424",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Corée du Nord ?",
    "options": [
      "Europe",
      "Asie",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1425",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 228 - 59 ?",
    "options": [
      "170",
      "168",
      "166",
      "169"
    ],
    "reponse": 3
  },
  {
    "id": "q1426",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel arbre à feuilles persistantes est traditionnellement décoré à Noël ?",
    "options": [
      "Le if",
      "Le pin",
      "Le cyprès",
      "Le sapin"
    ],
    "reponse": 3
  },
  {
    "id": "q1427",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Par quel stade intermédiaire, vivant dans l'eau et muni d'une queue, passe une grenouille avant de devenir adulte ?",
    "options": [
      "La nymphe",
      "La chrysalide",
      "La larve",
      "Le têtard"
    ],
    "reponse": 3
  },
  {
    "id": "q1428",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Cap-Vert ?",
    "options": [
      "🇰🇵",
      "🇺🇸",
      "🇨🇻",
      "🇱🇮"
    ],
    "reponse": 2
  },
  {
    "id": "q1429",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Suriname ?",
    "options": [
      "Tugrik",
      "Dollar surinamais",
      "Shilling somalien",
      "Lempira"
    ],
    "reponse": 1
  },
  {
    "id": "q1430",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 240 ÷ 15 ?",
    "options": [
      "16",
      "14",
      "17",
      "20"
    ],
    "reponse": 0
  },
  {
    "id": "q1431",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel comportement vocal les loups utilisent-ils pour communiquer à longue distance avec le reste de la meute ?",
    "options": [
      "Le jappement",
      "Le hurlement",
      "L'aboiement",
      "Le grognement"
    ],
    "reponse": 1
  },
  {
    "id": "q1432",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 175 - 39 ?",
    "options": [
      "138",
      "133",
      "134",
      "136"
    ],
    "reponse": 3
  },
  {
    "id": "q1433",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Portugal ?",
    "options": [
      "Lisbonne",
      "Sanaa",
      "Antananarivo",
      "Abuja"
    ],
    "reponse": 0
  },
  {
    "id": "q1434",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Danemark ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1435",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Tadjikistan ?",
    "options": [
      "🇵🇰",
      "🇰🇲",
      "🇪🇷",
      "🇹🇯"
    ],
    "reponse": 3
  },
  {
    "id": "q1436",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Hongrie ?",
    "options": [
      "Port-Louis",
      "Freetown",
      "Budapest",
      "Ouagadougou"
    ],
    "reponse": 2
  },
  {
    "id": "q1437",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Turkménistan ?",
    "options": [
      "Caracas",
      "Yamoussoukro",
      "Madrid",
      "Achgabat"
    ],
    "reponse": 3
  },
  {
    "id": "q1438",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays abrite la ville sainte de La Mecque ?",
    "options": [
      "La Jordanie",
      "L'Arabie saoudite",
      "L'Irak",
      "Les Émirats arabes unis"
    ],
    "reponse": 1
  },
  {
    "id": "q1439",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le plus grand reptile vivant actuellement ?",
    "options": [
      "Le varan de Komodo",
      "L'anaconda",
      "Le crocodile marin",
      "L'alligator"
    ],
    "reponse": 2
  },
  {
    "id": "q1440",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 49 ÷ 7 ?",
    "options": [
      "7",
      "6",
      "8",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q1441",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel détroit relie la mer de Marmara à la mer Noire, en traversant la ville d'Istanbul ?",
    "options": [
      "Le détroit de Kertch",
      "Le Bosphore",
      "Les Dardanelles",
      "Le détroit d'Otrante"
    ],
    "reponse": 1
  },
  {
    "id": "q1442",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ukraine ?",
    "options": [
      "Peso cubain",
      "Manat azerbaïdjanais",
      "Hryvnia",
      "Livre turque"
    ],
    "reponse": 2
  },
  {
    "id": "q1443",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 × 6 ?",
    "options": [
      "43",
      "37",
      "41",
      "42"
    ],
    "reponse": 3
  },
  {
    "id": "q1444",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1225 et 1375 ?",
    "options": [
      "130",
      "162",
      "150",
      "161"
    ],
    "reponse": 2
  },
  {
    "id": "q1445",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu hindou est représenté avec une tête d'éléphant ?",
    "options": [
      "Shiva",
      "Ganesh",
      "Brahma",
      "Vishnou"
    ],
    "reponse": 1
  },
  {
    "id": "q1446",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bénin ?",
    "options": [
      "Livre égyptienne",
      "Franc CFA",
      "Rouble biélorusse",
      "Dollar australien"
    ],
    "reponse": 1
  },
  {
    "id": "q1447",
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
    "id": "q1448",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est surnommé le « roi de la jungle » ?",
    "options": [
      "Le lion",
      "Le jaguar",
      "Le léopard",
      "Le tigre"
    ],
    "reponse": 0
  },
  {
    "id": "q1449",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Turquie ?",
    "options": [
      "Balboa",
      "Peso colombien",
      "Livre turque",
      "Ringgit"
    ],
    "reponse": 2
  },
  {
    "id": "q1450",
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
    "id": "q1451",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2578 en chiffres romains ?",
    "options": [
      "MMDLXVIII",
      "MMDLXXIX",
      "MMDLXXXVIII",
      "MMDLXXVIII"
    ],
    "reponse": 3
  },
  {
    "id": "q1452",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Nickel ?",
    "options": [
      "Ni",
      "Se",
      "Fe",
      "Nb"
    ],
    "reponse": 0
  },
  {
    "id": "q1453",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur est le créateur de la saga « Star Wars » ?",
    "options": [
      "Ridley Scott",
      "James Cameron",
      "George Lucas",
      "Steven Spielberg"
    ],
    "reponse": 2
  },
  {
    "id": "q1454",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 749 - 162 ?",
    "options": [
      "584",
      "590",
      "587",
      "586"
    ],
    "reponse": 2
  },
  {
    "id": "q1455",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 841 ?",
    "options": [
      "27",
      "29",
      "24",
      "31"
    ],
    "reponse": 1
  },
  {
    "id": "q1456",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel mausolée de marbre blanc, en Inde, a été construit par un empereur moghol en mémoire de son épouse ?",
    "options": [
      "Le Fort Rouge",
      "Le Palais du Vent",
      "Le Taj Mahal",
      "Le Temple d'Or"
    ],
    "reponse": 2
  },
  {
    "id": "q1457",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mexique ?",
    "options": [
      "Kingston",
      "Port-Louis",
      "Mexico",
      "Amman"
    ],
    "reponse": 2
  },
  {
    "id": "q1458",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 ÷ 5 ?",
    "options": [
      "17",
      "22",
      "18",
      "15"
    ],
    "reponse": 2
  },
  {
    "id": "q1459",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Tanzanie ?",
    "options": [
      "Mogadiscio",
      "Helsinki",
      "Dodoma",
      "Monrovia"
    ],
    "reponse": 2
  },
  {
    "id": "q1460",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3277 en chiffres romains ?",
    "options": [
      "MMMCCLXVII",
      "MMMCCLXXXII",
      "MMMCCLXXVII",
      "MMMCCLXXVI"
    ],
    "reponse": 2
  },
  {
    "id": "q1461",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 343 + 502 ?",
    "options": [
      "843",
      "848",
      "845",
      "844"
    ],
    "reponse": 2
  },
  {
    "id": "q1462",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 285 ÷ 15 ?",
    "options": [
      "16",
      "19",
      "21",
      "17"
    ],
    "reponse": 1
  },
  {
    "id": "q1463",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 40000 kg ?",
    "options": [
      "46",
      "40",
      "47",
      "39"
    ],
    "reponse": 1
  },
  {
    "id": "q1464",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation française met en scène un village gaulois résistant à l'envahisseur romain ?",
    "options": [
      "Astérix",
      "Wakfu",
      "Les Triplettes de Belleville",
      "Kirikou"
    ],
    "reponse": 0
  },
  {
    "id": "q1465",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Inde ?",
    "options": [
      "New Delhi",
      "Yaoundé",
      "Copenhague",
      "Washington"
    ],
    "reponse": 0
  },
  {
    "id": "q1466",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Afghanistan ?",
    "options": [
      "Tachkent",
      "Bandar Seri Begawan",
      "Port-Louis",
      "Kaboul"
    ],
    "reponse": 3
  },
  {
    "id": "q1467",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 346 + 246 ?",
    "options": [
      "592",
      "590",
      "591",
      "589"
    ],
    "reponse": 0
  },
  {
    "id": "q1468",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français des Lumières a écrit « Candide » ?",
    "options": [
      "Denis Diderot",
      "Jean-Jacques Rousseau",
      "Montesquieu",
      "Voltaire"
    ],
    "reponse": 3
  },
  {
    "id": "q1469",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se situe l'Égypte ?",
    "options": [
      "Asie",
      "Afrique",
      "Océanie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1470",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Slovénie ?",
    "options": [
      "Forint",
      "Real brésilien",
      "Euro",
      "Guarani"
    ],
    "reponse": 2
  },
  {
    "id": "q1471",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quelles cinq disciplines combine le pentathlon moderne, inventé par Pierre de Coubertin ?",
    "options": [
      "Natation, plongeon, voile, aviron et escrime",
      "Escrime, natation, équitation, course et tir",
      "Course, saut, lancer, natation et lutte",
      "Ski, tir, course, natation et vélo"
    ],
    "reponse": 1
  },
  {
    "id": "q1472",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Argon ?",
    "options": [
      "Ar",
      "Sb",
      "Ru",
      "Nd"
    ],
    "reponse": 0
  },
  {
    "id": "q1473",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCLXXX en chiffres romains ?",
    "options": [
      "3670",
      "3685",
      "3680",
      "3681"
    ],
    "reponse": 2
  },
  {
    "id": "q1474",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ukraine ?",
    "options": [
      "🇨🇴",
      "🇸🇪",
      "🇺🇦",
      "🇨🇮"
    ],
    "reponse": 2
  },
  {
    "id": "q1475",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Vietnam ?",
    "options": [
      "Quetzal",
      "Dollar bahaméen",
      "Dong",
      "Baht"
    ],
    "reponse": 2
  },
  {
    "id": "q1476",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Luxembourg ?",
    "options": [
      "Asie",
      "Afrique",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1477",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Soufre ?",
    "options": [
      "Bi",
      "S",
      "Ra",
      "K"
    ],
    "reponse": 1
  },
  {
    "id": "q1478",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ti » ?",
    "options": [
      "Néodyme",
      "Titane",
      "Oxygène",
      "Plomb"
    ],
    "reponse": 1
  },
  {
    "id": "q1479",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCCLXXIII en chiffres romains ?",
    "options": [
      "863",
      "873",
      "868",
      "878"
    ],
    "reponse": 1
  },
  {
    "id": "q1480",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Actinium ?",
    "options": [
      "N",
      "Np",
      "Sb",
      "Ac"
    ],
    "reponse": 3
  },
  {
    "id": "q1481",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Liberia",
      "Iran",
      "Suisse",
      "Turkménistan"
    ],
    "reponse": 3
  },
  {
    "id": "q1482",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Allemagne",
      "Albanie",
      "Côte d'Ivoire",
      "Malte"
    ],
    "reponse": 1
  },
  {
    "id": "q1483",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 × 2 ?",
    "options": [
      "32",
      "33",
      "27",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q1484",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CLVI en chiffres romains ?",
    "options": [
      "156",
      "146",
      "155",
      "161"
    ],
    "reponse": 0
  },
  {
    "id": "q1485",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Gabon ?",
    "options": [
      "Libreville",
      "Moroni",
      "Victoria",
      "Bichkek"
    ],
    "reponse": 0
  },
  {
    "id": "q1486",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1710 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "19e siècle",
      "17e siècle",
      "16e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q1487",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Comores ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q1488",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Slovénie ?",
    "options": [
      "Asie",
      "Europe",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q1489",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 150 ?",
    "options": [
      "50",
      "39",
      "45",
      "40"
    ],
    "reponse": 2
  },
  {
    "id": "q1490",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 688 en chiffres romains ?",
    "options": [
      "DCLXXXIII",
      "DCLXXXVI",
      "DCXCIII",
      "DCLXXXVIII"
    ],
    "reponse": 3
  },
  {
    "id": "q1491",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Magnésium ?",
    "options": [
      "Na",
      "Ne",
      "Ru",
      "Mg"
    ],
    "reponse": 3
  },
  {
    "id": "q1492",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Macédoine du Nord ?",
    "options": [
      "🇧🇿",
      "🇸🇪",
      "🇳🇬",
      "🇲🇰"
    ],
    "reponse": 3
  },
  {
    "id": "q1493",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quel pont aérien de 1948-1949 a permis de ravitailler une capitale allemande bloquée par l'URSS ?",
    "options": [
      "Le pont aérien de Berlin",
      "Le pont aérien de Corée",
      "Le débarquement de Berlin",
      "L'opération Chastise"
    ],
    "reponse": 0
  },
  {
    "id": "q1494",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Tl » ?",
    "options": [
      "Tantale",
      "Phosphore",
      "Thallium",
      "Ytterbium"
    ],
    "reponse": 2
  },
  {
    "id": "q1495",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Maurice ?",
    "options": [
      "🇹🇲",
      "🇲🇺",
      "🇧🇭",
      "🇰🇼"
    ],
    "reponse": 1
  },
  {
    "id": "q1496",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Dans quel pays a été fondé le service de streaming musical Spotify ?",
    "options": [
      "Le Royaume-Uni",
      "L'Allemagne",
      "Les États-Unis",
      "La Suède"
    ],
    "reponse": 3
  },
  {
    "id": "q1497",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 621 - 47 ?",
    "options": [
      "577",
      "574",
      "575",
      "571"
    ],
    "reponse": 1
  },
  {
    "id": "q1498",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Portugal ?",
    "options": [
      "Océanie",
      "Asie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1499",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type de jumeaux partage exactement le même patrimoine génétique ?",
    "options": [
      "Les vrais jumeaux (monozygotes)",
      "Les faux jumeaux",
      "Les jumeaux dizygotes",
      "Aucun"
    ],
    "reponse": 0
  },
  {
    "id": "q1500",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 586 - 430 ?",
    "options": [
      "154",
      "157",
      "158",
      "156"
    ],
    "reponse": 3
  },
  {
    "id": "q1501",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Rubidium ?",
    "options": [
      "He",
      "Rb",
      "Cm",
      "Cr"
    ],
    "reponse": 1
  },
  {
    "id": "q1502",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Bulgarie ?",
    "options": [
      "Lev bulgare",
      "Riel",
      "Franc congolais",
      "Lilangeni"
    ],
    "reponse": 0
  },
  {
    "id": "q1503",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal produit de la soie pour tisser sa toile ?",
    "options": [
      "Le scarabée",
      "L'araignée",
      "Les deux (araignée et ver à soie)",
      "Le ver à soie"
    ],
    "reponse": 1
  },
  {
    "id": "q1504",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 20 ?",
    "options": [
      "313",
      "315",
      "298",
      "280"
    ],
    "reponse": 3
  },
  {
    "id": "q1505",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel groupe de grands singes africains est génétiquement le plus proche de l'être humain ?",
    "options": [
      "Les orangs-outans",
      "Les gorilles",
      "Les gibbons",
      "Les chimpanzés"
    ],
    "reponse": 3
  },
  {
    "id": "q1506",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain britannique a écrit « Sa Majesté des mouches » ?",
    "options": [
      "William Golding",
      "J.D. Salinger",
      "John Steinbeck",
      "William Faulkner"
    ],
    "reponse": 0
  },
  {
    "id": "q1507",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal marin possède huit bras et est considéré comme très intelligent ?",
    "options": [
      "La seiche",
      "L'étoile de mer",
      "La pieuvre",
      "Le calmar"
    ],
    "reponse": 2
  },
  {
    "id": "q1508",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 500 ?",
    "options": [
      "277",
      "250",
      "254",
      "240"
    ],
    "reponse": 1
  },
  {
    "id": "q1509",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle créature de la mythologie grecque a une tête de lion, un corps de chèvre et une queue de serpent ?",
    "options": [
      "Le Minotaure",
      "L'Hydre de Lerne",
      "La Chimère",
      "Cerbère"
    ],
    "reponse": 2
  },
  {
    "id": "q1510",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel fleuve traverse la ville du Caire ?",
    "options": [
      "Le Congo",
      "Le Niger",
      "Le Nil",
      "Le Zambèze"
    ],
    "reponse": 2
  },
  {
    "id": "q1511",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel roi de Sparte est l'époux d'Hélène, dont l'enlèvement déclenche la guerre de Troie ?",
    "options": [
      "Agamemnon",
      "Pâris",
      "Priam",
      "Ménélas"
    ],
    "reponse": 3
  },
  {
    "id": "q1512",
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
    "id": "q1513",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Espagne ?",
    "options": [
      "🇰🇿",
      "🇲🇳",
      "🇰🇬",
      "🇪🇸"
    ],
    "reponse": 3
  },
  {
    "id": "q1514",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de construction et de gestion permet de bâtir des villes ?",
    "options": [
      "Cities: Skylines",
      "SimCity",
      "Tropico",
      "Les Sims"
    ],
    "reponse": 1
  },
  {
    "id": "q1515",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel guitariste britannique du groupe The Who est réputé pour détruire sa guitare sur scène en fin de concert ?",
    "options": [
      "Eric Clapton",
      "Jimmy Page",
      "Keith Richards",
      "Pete Townshend"
    ],
    "reponse": 3
  },
  {
    "id": "q1516",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Autriche ?",
    "options": [
      "🇷🇼",
      "🇦🇺",
      "🇬🇪",
      "🇦🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q1517",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 340 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "3e siècle",
      "4e siècle",
      "5e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1518",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3798 en chiffres romains ?",
    "options": [
      "MMMDCCXCVI",
      "MMMDCCXCVIII",
      "MMMDCCXCIII",
      "MMMDCCXCIX"
    ],
    "reponse": 1
  },
  {
    "id": "q1519",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel architecte sino-américain a conçu la pyramide de verre du musée du Louvre, inaugurée en 1989 ?",
    "options": [
      "Jean Nouvel",
      "Norman Foster",
      "Renzo Piano",
      "Ieoh Ming Pei"
    ],
    "reponse": 3
  },
  {
    "id": "q1520",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDII en chiffres romains ?",
    "options": [
      "2507",
      "2503",
      "2502",
      "2500"
    ],
    "reponse": 2
  },
  {
    "id": "q1521",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport utilise les termes « strike » et « spare » ?",
    "options": [
      "Le bowling",
      "Le baseball",
      "Le cricket",
      "Le billard"
    ],
    "reponse": 0
  },
  {
    "id": "q1522",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLXVII en chiffres romains ?",
    "options": [
      "2467",
      "2462",
      "2466",
      "2468"
    ],
    "reponse": 0
  },
  {
    "id": "q1523",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 × 4 ?",
    "options": [
      "72",
      "64",
      "69",
      "73"
    ],
    "reponse": 1
  },
  {
    "id": "q1524",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Maroc ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1525",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 10 ?",
    "options": [
      "190",
      "207",
      "206",
      "198"
    ],
    "reponse": 0
  },
  {
    "id": "q1526",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel bâtiment culturel, reconnaissable à ses voiles blanches en forme de coquillages, se dresse dans un port australien classé à l'UNESCO ?",
    "options": [
      "La tour Q1",
      "Le Sydney Opera House",
      "Le Harbour Bridge",
      "Darling Harbour"
    ],
    "reponse": 1
  },
  {
    "id": "q1527",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Panama ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 3
  },
  {
    "id": "q1528",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 605 + 70 ?",
    "options": [
      "675",
      "677",
      "678",
      "673"
    ],
    "reponse": 0
  },
  {
    "id": "q1529",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1764 en chiffres romains ?",
    "options": [
      "MDCCLXII",
      "MDCCLXIV",
      "MDCCLXIX",
      "MDCCLXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1530",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du phénomène par lequel un serpent change de peau ?",
    "options": [
      "La régénération",
      "L'hibernation",
      "La mue",
      "La métamorphose"
    ],
    "reponse": 2
  },
  {
    "id": "q1531",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 80 ?",
    "options": [
      "6",
      "2",
      "4",
      "1"
    ],
    "reponse": 2
  },
  {
    "id": "q1532",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Oman ?",
    "options": [
      "Moscou",
      "Mascate",
      "Islamabad",
      "Pékin"
    ],
    "reponse": 1
  },
  {
    "id": "q1533",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel canal relie la mer Méditerranée à la mer Rouge ?",
    "options": [
      "Le canal de Corinthe",
      "Le canal de Panama",
      "Le canal du Midi",
      "Le canal de Suez"
    ],
    "reponse": 3
  },
  {
    "id": "q1534",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain sud-africain a reçu le prix Nobel pour « Disgrâce » ?",
    "options": [
      "Doris Lessing",
      "J.M. Coetzee",
      "Wole Soyinka",
      "Nadine Gordimer"
    ],
    "reponse": 1
  },
  {
    "id": "q1535",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 192 heure(s) ?",
    "options": [
      "8",
      "6",
      "11",
      "10"
    ],
    "reponse": 0
  },
  {
    "id": "q1536",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2565 en chiffres romains ?",
    "options": [
      "MMDLXV",
      "MMDLXVII",
      "MMDLV",
      "MMDLXXV"
    ],
    "reponse": 0
  },
  {
    "id": "q1537",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 20 ?",
    "options": [
      "360",
      "325",
      "387",
      "385"
    ],
    "reponse": 0
  },
  {
    "id": "q1538",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation Pixar raconte l'histoire d'un vieil homme qui fait voler sa maison avec des ballons ?",
    "options": [
      "Le Voyage d'Arlo",
      "Vice-versa",
      "Coco",
      "Là-haut"
    ],
    "reponse": 3
  },
  {
    "id": "q1539",
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
    "id": "q1540",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Pakistan ?",
    "options": [
      "Tokyo",
      "Dublin",
      "Islamabad",
      "Kigali"
    ],
    "reponse": 2
  },
  {
    "id": "q1541",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 18 ÷ 9 ?",
    "options": [
      "0",
      "2",
      "3",
      "-1"
    ],
    "reponse": 1
  },
  {
    "id": "q1542",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 400 ?",
    "options": [
      "63",
      "55",
      "60",
      "69"
    ],
    "reponse": 2
  },
  {
    "id": "q1543",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport le terrain est-il appelé un « green » pour la zone autour du trou ?",
    "options": [
      "Le curling",
      "Le bowling",
      "Le golf",
      "Le croquet"
    ],
    "reponse": 2
  },
  {
    "id": "q1544",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Suriname",
      "Myanmar",
      "Serbie",
      "Égypte"
    ],
    "reponse": 3
  },
  {
    "id": "q1545",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 200 mm ?",
    "options": [
      "24",
      "17",
      "20",
      "25"
    ],
    "reponse": 2
  },
  {
    "id": "q1546",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 940 - 475 ?",
    "options": [
      "468",
      "465",
      "462",
      "463"
    ],
    "reponse": 1
  },
  {
    "id": "q1547",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Bahamas ?",
    "options": [
      "🇦🇹",
      "🇸🇬",
      "🇧🇸",
      "🇨🇱"
    ],
    "reponse": 2
  },
  {
    "id": "q1548",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du processus par lequel les oiseaux migrateurs changent de région selon les saisons ?",
    "options": [
      "L'hibernation",
      "L'estivation",
      "La mue",
      "La migration"
    ],
    "reponse": 3
  },
  {
    "id": "q1549",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Kazakhstan",
      "Inde",
      "Djibouti",
      "Andorre"
    ],
    "reponse": 2
  },
  {
    "id": "q1550",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Namibie ?",
    "options": [
      "🇮🇪",
      "🇲🇽",
      "🇮🇹",
      "🇳🇦"
    ],
    "reponse": 3
  },
  {
    "id": "q1551",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 5 ?",
    "options": [
      "87",
      "90",
      "101",
      "78"
    ],
    "reponse": 1
  },
  {
    "id": "q1552",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 484 ?",
    "options": [
      "23",
      "24",
      "26",
      "22"
    ],
    "reponse": 3
  },
  {
    "id": "q1553",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1139 et 1282 ?",
    "options": [
      "155",
      "163",
      "143",
      "138"
    ],
    "reponse": 2
  },
  {
    "id": "q1554",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit la saga « Le Seigneur des anneaux » ?",
    "options": [
      "Terry Pratchett",
      "C.S. Lewis",
      "J.R.R. Tolkien",
      "George R.R. Martin"
    ],
    "reponse": 2
  },
  {
    "id": "q1555",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 21 au carré ?",
    "options": [
      "441",
      "488",
      "398",
      "406"
    ],
    "reponse": 0
  },
  {
    "id": "q1556",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Libye ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1557",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bangladesh ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q1558",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport utilise-t-on les termes « pat » et « eagle » liés au score d'un trou ?",
    "options": [
      "Le curling",
      "Le tir à l'arc",
      "Le golf",
      "Le bowling"
    ],
    "reponse": 2
  },
  {
    "id": "q1559",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3607 en chiffres romains ?",
    "options": [
      "MMMDCIX",
      "MMMDCII",
      "MMMDCVII",
      "MMMDCVI"
    ],
    "reponse": 2
  },
  {
    "id": "q1560",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série animée met en scène une famille jaune vivant à Springfield, dont le père travaille dans une centrale nucléaire ?",
    "options": [
      "Bob's Burgers",
      "South Park",
      "Les Simpson",
      "Family Guy"
    ],
    "reponse": 2
  },
  {
    "id": "q1561",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel dramaturge français a écrit « Phèdre » et « Andromaque » ?",
    "options": [
      "Molière",
      "Pierre Corneille",
      "Voltaire",
      "Jean Racine"
    ],
    "reponse": 3
  },
  {
    "id": "q1562",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Irlande ?",
    "options": [
      "Europe",
      "Afrique",
      "Amérique du Sud",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q1563",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Cuba ?",
    "options": [
      "La Havane",
      "San José",
      "Lisbonne",
      "Bamako"
    ],
    "reponse": 0
  },
  {
    "id": "q1564",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel arbre produit les glands ?",
    "options": [
      "Le chêne",
      "Le hêtre",
      "Le châtaignier",
      "Le noisetier"
    ],
    "reponse": 0
  },
  {
    "id": "q1565",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Congo ?",
    "options": [
      "Franc CFA",
      "Riyal yéménite",
      "Livre turque",
      "Peso colombien"
    ],
    "reponse": 0
  },
  {
    "id": "q1566",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 19 décennie(s) ?",
    "options": [
      "166",
      "190",
      "211",
      "167"
    ],
    "reponse": 1
  },
  {
    "id": "q1567",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Bosnie-Herzégovine",
      "Roumanie",
      "République tchèque",
      "Belgique"
    ],
    "reponse": 1
  },
  {
    "id": "q1568",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Fr » ?",
    "options": [
      "Terbium",
      "Fer",
      "Gallium",
      "Francium"
    ],
    "reponse": 3
  },
  {
    "id": "q1569",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène une mariée cherchant à se venger, armée d'un sabre japonais ?",
    "options": [
      "Pulp Fiction",
      "Django Unchained",
      "Kill Bill",
      "Reservoir Dogs"
    ],
    "reponse": 2
  },
  {
    "id": "q1570",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 130 ÷ 10 ?",
    "options": [
      "14",
      "13",
      "15",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q1571",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cameroun ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q1572",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pd » ?",
    "options": [
      "Palladium",
      "Calcium",
      "Zinc",
      "Iridium"
    ],
    "reponse": 0
  },
  {
    "id": "q1573",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 38 siècle(s) ?",
    "options": [
      "4386",
      "4295",
      "3800",
      "4174"
    ],
    "reponse": 2
  },
  {
    "id": "q1574",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur incarne le personnage principal dans « Gladiator » ?",
    "options": [
      "Russell Crowe",
      "Ralph Fiennes",
      "Colin Firth",
      "Russell Brand"
    ],
    "reponse": 0
  },
  {
    "id": "q1575",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 12000 g ?",
    "options": [
      "14",
      "10",
      "12",
      "11"
    ],
    "reponse": 2
  },
  {
    "id": "q1576",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 962 - 521 ?",
    "options": [
      "444",
      "442",
      "443",
      "441"
    ],
    "reponse": 3
  },
  {
    "id": "q1577",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel processus permet à une graine de se transformer en jeune plante ?",
    "options": [
      "La photosynthèse",
      "La fécondation",
      "La pollinisation",
      "La germination"
    ],
    "reponse": 3
  },
  {
    "id": "q1578",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Moldavie",
      "Australie",
      "Ghana",
      "Kazakhstan"
    ],
    "reponse": 3
  },
  {
    "id": "q1579",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCMLXXIII en chiffres romains ?",
    "options": [
      "2973",
      "2963",
      "2971",
      "2968"
    ],
    "reponse": 0
  },
  {
    "id": "q1580",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de mémoire conserve les données même lorsque l'ordinateur est éteint ?",
    "options": [
      "La mémoire de stockage (disque dur, SSD)",
      "Les registres",
      "La mémoire vive (RAM)",
      "Le cache processeur"
    ],
    "reponse": 0
  },
  {
    "id": "q1581",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 2 × 17 ?",
    "options": [
      "34",
      "33",
      "31",
      "38"
    ],
    "reponse": 0
  },
  {
    "id": "q1582",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Népal",
      "Lettonie",
      "Estonie",
      "Liechtenstein"
    ],
    "reponse": 3
  },
  {
    "id": "q1583",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇨 De quel pays est-ce le drapeau ?",
    "options": [
      "Inde",
      "Équateur",
      "Congo",
      "Corée du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q1584",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 ÷ 2 ?",
    "options": [
      "4",
      "6",
      "7",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q1585",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1390 et 1548 ?",
    "options": [
      "158",
      "174",
      "175",
      "130"
    ],
    "reponse": 0
  },
  {
    "id": "q1586",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Zimbabwe ?",
    "options": [
      "🇮🇩",
      "🇿🇼",
      "🇩🇴",
      "🇲🇦"
    ],
    "reponse": 1
  },
  {
    "id": "q1587",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Espagne",
      "Cameroun",
      "Bahamas",
      "Azerbaïdjan"
    ],
    "reponse": 2
  },
  {
    "id": "q1588",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Vanadium ?",
    "options": [
      "Lu",
      "K",
      "Tc",
      "V"
    ],
    "reponse": 3
  },
  {
    "id": "q1589",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quel enseignant canadien est l'inventeur du basket-ball, en 1891 ?",
    "options": [
      "Walter Camp",
      "James Naismith",
      "William G. Morgan",
      "Abner Doubleday"
    ],
    "reponse": 1
  },
  {
    "id": "q1590",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 637 + 401 ?",
    "options": [
      "1036",
      "1040",
      "1037",
      "1038"
    ],
    "reponse": 3
  },
  {
    "id": "q1591",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 432 - 130 ?",
    "options": [
      "299",
      "300",
      "304",
      "302"
    ],
    "reponse": 3
  },
  {
    "id": "q1592",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 675 + 573 ?",
    "options": [
      "1246",
      "1248",
      "1247",
      "1250"
    ],
    "reponse": 1
  },
  {
    "id": "q1593",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1158 en chiffres romains ?",
    "options": [
      "MCLXVIII",
      "MCLVIII",
      "MCLIII",
      "MCXLVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q1594",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument est joué en le pinçant, avec généralement six cordes ?",
    "options": [
      "La mandoline",
      "Le ukulélé",
      "La guitare",
      "Le banjo"
    ],
    "reponse": 2
  },
  {
    "id": "q1595",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 6000 ml ?",
    "options": [
      "6",
      "7",
      "8",
      "3"
    ],
    "reponse": 0
  },
  {
    "id": "q1596",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "El Salvador",
      "Costa Rica",
      "Mexique",
      "Gambie"
    ],
    "reponse": 1
  },
  {
    "id": "q1597",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de câble est le plus couramment utilisé pour relier un ordinateur à un réseau local filaire ?",
    "options": [
      "Le câble Ethernet",
      "Le câble coaxial",
      "Le câble HDMI",
      "Le câble USB"
    ],
    "reponse": 0
  },
  {
    "id": "q1598",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 285 + 23 ?",
    "options": [
      "310",
      "308",
      "309",
      "305"
    ],
    "reponse": 1
  },
  {
    "id": "q1599",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de km dans 17000 m ?",
    "options": [
      "18",
      "20",
      "17",
      "13"
    ],
    "reponse": 2
  },
  {
    "id": "q1600",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Albanie ?",
    "options": [
      "Lek",
      "Lev bulgare",
      "Rouble russe",
      "Lempira"
    ],
    "reponse": 0
  },
  {
    "id": "q1601",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du plus petit oiseau du monde ?",
    "options": [
      "Le colibri",
      "Le roitelet",
      "Le moineau",
      "La mésange"
    ],
    "reponse": 0
  },
  {
    "id": "q1602",
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
    "id": "q1603",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 20 ?",
    "options": [
      "9",
      "6",
      "11",
      "8"
    ],
    "reponse": 3
  },
  {
    "id": "q1604",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat vietnamien est une soupe de nouilles de riz au bouillon parfumé, souvent au bœuf ?",
    "options": [
      "Le bun cha",
      "Le pho",
      "Le banh mi",
      "Les nems"
    ],
    "reponse": 1
  },
  {
    "id": "q1605",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 17 siècle(s) ?",
    "options": [
      "1700",
      "1923",
      "1577",
      "1763"
    ],
    "reponse": 0
  },
  {
    "id": "q1606",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Éthiopie ?",
    "options": [
      "Harare",
      "Addis-Abeba",
      "Budapest",
      "Dili"
    ],
    "reponse": 1
  },
  {
    "id": "q1607",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Mongolie",
      "Guyana",
      "Canada",
      "Paraguay"
    ],
    "reponse": 2
  },
  {
    "id": "q1608",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel scientifique français a mis au point la pasteurisation et le vaccin contre la rage ?",
    "options": [
      "Marie Curie",
      "Louis Pasteur",
      "Claude Bernard",
      "Antoine Lavoisier"
    ],
    "reponse": 1
  },
  {
    "id": "q1609",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 3 h ?",
    "options": [
      "164",
      "160",
      "173",
      "180"
    ],
    "reponse": 3
  },
  {
    "id": "q1610",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve El Salvador ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q1611",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la Barbade ?",
    "options": [
      "🇳🇴",
      "🇵🇭",
      "🇧🇧",
      "🇱🇾"
    ],
    "reponse": 2
  },
  {
    "id": "q1612",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Royaume-Uni ?",
    "options": [
      "Tala",
      "Pula",
      "Birr",
      "Livre sterling"
    ],
    "reponse": 3
  },
  {
    "id": "q1613",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Liban ?",
    "options": [
      "Balboa",
      "Livre libanaise",
      "Escudo cap-verdien",
      "Tenge"
    ],
    "reponse": 1
  },
  {
    "id": "q1614",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle expérience réalisée par Newton a démontré que la lumière blanche est en réalité composée de plusieurs couleurs ?",
    "options": [
      "La décomposition par un prisme",
      "La chambre noire",
      "Le miroir sphérique",
      "La diffraction par un réseau"
    ],
    "reponse": 0
  },
  {
    "id": "q1615",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « VPN » ?",
    "options": [
      "Verified Public Network",
      "Virtual Private Network",
      "Virtual Public Node",
      "Visual Private Node"
    ],
    "reponse": 1
  },
  {
    "id": "q1616",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Montevideo est la capitale de quel pays ?",
    "options": [
      "Brunei",
      "Samoa",
      "Slovénie",
      "Uruguay"
    ],
    "reponse": 3
  },
  {
    "id": "q1617",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quelle est la durée de vie moyenne d'un papillon monarque adulte ?",
    "options": [
      "Quelques semaines (sauf la génération migratrice)",
      "Une journée",
      "Plusieurs années",
      "Un mois exactement"
    ],
    "reponse": 0
  },
  {
    "id": "q1618",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Liban",
      "Érythrée",
      "Andorre",
      "Kazakhstan"
    ],
    "reponse": 1
  },
  {
    "id": "q1619",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 300 ?",
    "options": [
      "75",
      "80",
      "79",
      "65"
    ],
    "reponse": 0
  },
  {
    "id": "q1620",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 878 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "8e siècle",
      "7e siècle",
      "9e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1621",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 36 t ?",
    "options": [
      "36000",
      "35333",
      "31308",
      "30927"
    ],
    "reponse": 0
  },
  {
    "id": "q1622",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Philippines ?",
    "options": [
      "Manille",
      "Séoul",
      "Oslo",
      "Erevan"
    ],
    "reponse": 0
  },
  {
    "id": "q1623",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 992 - 342 ?",
    "options": [
      "647",
      "653",
      "651",
      "650"
    ],
    "reponse": 3
  },
  {
    "id": "q1624",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel petit mammifère volant utilise l'écholocation pour se repérer et chasser dans l'obscurité ?",
    "options": [
      "La chauve-souris",
      "L'engoulevent",
      "La chouette",
      "Le hibou"
    ],
    "reponse": 0
  },
  {
    "id": "q1625",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 122 - 90 ?",
    "options": [
      "32",
      "29",
      "33",
      "34"
    ],
    "reponse": 0
  },
  {
    "id": "q1626",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bulgarie ?",
    "options": [
      "Afrique",
      "Océanie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q1627",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Co » ?",
    "options": [
      "Azote",
      "Francium",
      "Cobalt",
      "Césium"
    ],
    "reponse": 2
  },
  {
    "id": "q1628",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Belize",
      "Vietnam",
      "Roumanie",
      "Rwanda"
    ],
    "reponse": 0
  },
  {
    "id": "q1629",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel programmeur finlandais a créé le noyau du système d'exploitation Linux en 1991 ?",
    "options": [
      "Dennis Ritchie",
      "Linus Torvalds",
      "Richard Stallman",
      "Ken Thompson"
    ],
    "reponse": 1
  },
  {
    "id": "q1630",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur français a signé « Amélie Poulain » ?",
    "options": [
      "Jean-Pierre Jeunet",
      "François Ozon",
      "Michel Gondry",
      "Luc Besson"
    ],
    "reponse": 0
  },
  {
    "id": "q1631",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1982 en chiffres romains ?",
    "options": [
      "MCMLXXXII",
      "MCMLXXXIII",
      "MCMLXXXI",
      "MCMLXXXIV"
    ],
    "reponse": 0
  },
  {
    "id": "q1632",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Islamabad est la capitale de quel pays ?",
    "options": [
      "Lituanie",
      "Bosnie-Herzégovine",
      "Portugal",
      "Pakistan"
    ],
    "reponse": 3
  },
  {
    "id": "q1633",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle cité antique de Jordanie, taillée dans une falaise de grès rose, était une étape clé des routes commerciales du désert ?",
    "options": [
      "Pétra",
      "Baalbek",
      "Palmyre",
      "Persépolis"
    ],
    "reponse": 0
  },
  {
    "id": "q1634",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Sierra Leone ?",
    "options": [
      "🇯🇴",
      "🇵🇱",
      "🇱🇷",
      "🇸🇱"
    ],
    "reponse": 3
  },
  {
    "id": "q1635",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCXXVI en chiffres romains ?",
    "options": [
      "3726",
      "3725",
      "3724",
      "3716"
    ],
    "reponse": 0
  },
  {
    "id": "q1636",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Monrovia est la capitale de quel pays ?",
    "options": [
      "Belgique",
      "États-Unis",
      "Danemark",
      "Liberia"
    ],
    "reponse": 3
  },
  {
    "id": "q1637",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kosovo ?",
    "options": [
      "Euro",
      "Som kirghize",
      "Franc djiboutien",
      "Riel"
    ],
    "reponse": 0
  },
  {
    "id": "q1638",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Islande ?",
    "options": [
      "Couronne islandaise",
      "Tenge",
      "Dong",
      "Riyal yéménite"
    ],
    "reponse": 0
  },
  {
    "id": "q1639",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel poète italien du Moyen Âge est l'auteur de « La Divine Comédie » ?",
    "options": [
      "Boccace",
      "Pétrarque",
      "Dante Alighieri",
      "Machiavel"
    ],
    "reponse": 2
  },
  {
    "id": "q1640",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a dominé historiquement le rugby avec les « All Blacks » ?",
    "options": [
      "L'Australie",
      "L'Afrique du Sud",
      "La Nouvelle-Zélande",
      "Les Fidji"
    ],
    "reponse": 2
  },
  {
    "id": "q1641",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 250 ?",
    "options": [
      "55",
      "46",
      "50",
      "51"
    ],
    "reponse": 2
  },
  {
    "id": "q1642",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Syrie ?",
    "options": [
      "🇪🇹",
      "🇰🇼",
      "🇸🇾",
      "🇧🇯"
    ],
    "reponse": 2
  },
  {
    "id": "q1643",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 106 - 10 ?",
    "options": [
      "98",
      "94",
      "93",
      "96"
    ],
    "reponse": 3
  },
  {
    "id": "q1644",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom de la galaxie qui contient notre système solaire ?",
    "options": [
      "Le Grand Nuage de Magellan",
      "Andromède",
      "La galaxie du Tourbillon",
      "La Voie lactée"
    ],
    "reponse": 3
  },
  {
    "id": "q1645",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 35 m ?",
    "options": [
      "37612",
      "35000",
      "33293",
      "35030"
    ],
    "reponse": 1
  },
  {
    "id": "q1646",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 248 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "1e siècle",
      "3e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1647",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de balisage sert de base à la structure des pages web ?",
    "options": [
      "HTML",
      "CSS",
      "XML",
      "JSON"
    ],
    "reponse": 0
  },
  {
    "id": "q1648",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Pékin est la capitale de quel pays ?",
    "options": [
      "Niger",
      "Azerbaïdjan",
      "Liban",
      "Chine"
    ],
    "reponse": 3
  },
  {
    "id": "q1649",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 288 ÷ 12 ?",
    "options": [
      "24",
      "19",
      "27",
      "20"
    ],
    "reponse": 0
  },
  {
    "id": "q1650",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Strontium ?",
    "options": [
      "Cm",
      "Sr",
      "Cu",
      "Tl"
    ],
    "reponse": 1
  },
  {
    "id": "q1651",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 2000 mg ?",
    "options": [
      "2",
      "5",
      "-1",
      "1"
    ],
    "reponse": 0
  },
  {
    "id": "q1652",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Maroc ?",
    "options": [
      "Podgorica",
      "Rabat",
      "Brazzaville",
      "Astana"
    ],
    "reponse": 1
  },
  {
    "id": "q1653",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kaboul est la capitale de quel pays ?",
    "options": [
      "Afghanistan",
      "Sierra Leone",
      "Colombie",
      "Seychelles"
    ],
    "reponse": 0
  },
  {
    "id": "q1654",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quels petits fichiers stockés par un navigateur permettent à un site de se souvenir d'un utilisateur ?",
    "options": [
      "Les caches",
      "Les cookies",
      "Les scripts",
      "Les plugins"
    ],
    "reponse": 1
  },
  {
    "id": "q1655",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Liban ?",
    "options": [
      "🇬🇦",
      "🇫🇯",
      "🇱🇧",
      "🇱🇺"
    ],
    "reponse": 2
  },
  {
    "id": "q1656",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec de la guerre est réputé violent et impulsif, contrairement à Athéna plus stratège ?",
    "options": [
      "Arès",
      "Apollon",
      "Hermès",
      "Héphaïstos"
    ],
    "reponse": 0
  },
  {
    "id": "q1657",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "De quelle matière est principalement composée la corne du rhinocéros ?",
    "options": [
      "Du cartilage",
      "De la kératine",
      "De l'ivoire",
      "De l'os"
    ],
    "reponse": 1
  },
  {
    "id": "q1658",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Combien de rounds compte généralement un championnat du monde de boxe poids lourds ?",
    "options": [
      "8",
      "15",
      "12",
      "10"
    ],
    "reponse": 2
  },
  {
    "id": "q1659",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Honduras ?",
    "options": [
      "Balboa",
      "Peso cubain",
      "Dalasi",
      "Lempira"
    ],
    "reponse": 3
  },
  {
    "id": "q1660",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est le plus grand prédateur terrestre carnivore actuel ?",
    "options": [
      "L'ours brun",
      "Le lion",
      "Le tigre",
      "L'ours polaire"
    ],
    "reponse": 3
  },
  {
    "id": "q1661",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel acteur a incarné le professeur Dumbledore dans les deux premiers films « Harry Potter » ?",
    "options": [
      "Anthony Hopkins",
      "Richard Harris",
      "Michael Gambon",
      "Ian McKellen"
    ],
    "reponse": 1
  },
  {
    "id": "q1662",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bandar Seri Begawan est la capitale de quel pays ?",
    "options": [
      "Bhoutan",
      "Brunei",
      "Guinée",
      "Kosovo"
    ],
    "reponse": 1
  },
  {
    "id": "q1663",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel événement festif brésilien, précédant le carême, rassemble chaque année des millions de participants à Rio de Janeiro ?",
    "options": [
      "La Fête des Rois",
      "Le carnaval de Rio",
      "Le Mardi gras de La Nouvelle-Orléans",
      "La Fête de la musique"
    ],
    "reponse": 1
  },
  {
    "id": "q1664",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Macédoine du Nord ?",
    "options": [
      "Dollar guyanien",
      "Somoni",
      "Denar macédonien",
      "Franc guinéen"
    ],
    "reponse": 2
  },
  {
    "id": "q1665",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1551 et 1674 ?",
    "options": [
      "145",
      "143",
      "110",
      "123"
    ],
    "reponse": 3
  },
  {
    "id": "q1666",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 300 appartient à quel siècle ?",
    "options": [
      "2e siècle",
      "4e siècle",
      "3e siècle",
      "1e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1667",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Malte ?",
    "options": [
      "Océanie",
      "Europe",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q1668",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Qui a écrit « Le Journal d'un fou » et « Les Âmes mortes » ?",
    "options": [
      "Nicolas Gogol",
      "Ivan Tourgueniev",
      "Fiodor Dostoïevski",
      "Léon Tolstoï"
    ],
    "reponse": 0
  },
  {
    "id": "q1669",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 316 - 214 ?",
    "options": [
      "102",
      "104",
      "101",
      "103"
    ],
    "reponse": 0
  },
  {
    "id": "q1670",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle industrie cinématographique, basée à Mumbai, produit le plus grand nombre de films au monde chaque année ?",
    "options": [
      "Nollywood",
      "le cinéma chinois",
      "Bollywood",
      "Hollywood"
    ],
    "reponse": 2
  },
  {
    "id": "q1671",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Phnom Penh est la capitale de quel pays ?",
    "options": [
      "Libye",
      "Cambodge",
      "Égypte",
      "Norvège"
    ],
    "reponse": 1
  },
  {
    "id": "q1672",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCLXV en chiffres romains ?",
    "options": [
      "3167",
      "3163",
      "3165",
      "3170"
    ],
    "reponse": 2
  },
  {
    "id": "q1673",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel désert de sel, le plus vaste du monde, se trouve en Bolivie sur l'Altiplano ?",
    "options": [
      "La vallée de la Mort",
      "Le désert de Sonora",
      "Le Salar de Uyuni",
      "Le désert d'Atacama"
    ],
    "reponse": 2
  },
  {
    "id": "q1674",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Congo ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1675",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle technologie de registre distribué et infalsifiable sert de base au Bitcoin et à de nombreuses cryptomonnaies ?",
    "options": [
      "Le peer-to-peer",
      "Le grid computing",
      "Le cloud",
      "La blockchain"
    ],
    "reponse": 3
  },
  {
    "id": "q1676",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Lituanie ?",
    "options": [
      "🇲🇦",
      "🇱🇦",
      "🇧🇹",
      "🇱🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q1677",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 918 en chiffres romains ?",
    "options": [
      "CMXX",
      "CMXXIII",
      "CMXVIII",
      "CMXVII"
    ],
    "reponse": 2
  },
  {
    "id": "q1678",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène un vaisseau spatial explorant la galaxie, créée par Gene Roddenberry ?",
    "options": [
      "Battlestar Galactica",
      "Stargate",
      "Star Trek",
      "Star Wars"
    ],
    "reponse": 2
  },
  {
    "id": "q1679",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel archipel appartient à l'Équateur et abrite une faune unique étudiée par Darwin ?",
    "options": [
      "Les îles Galápagos",
      "Les Maldives",
      "Les Seychelles",
      "Les îles Canaries"
    ],
    "reponse": 0
  },
  {
    "id": "q1680",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Hafnium ?",
    "options": [
      "Ag",
      "Hf",
      "I",
      "N"
    ],
    "reponse": 1
  },
  {
    "id": "q1681",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Zinc ?",
    "options": [
      "Tb",
      "Zn",
      "K",
      "Np"
    ],
    "reponse": 1
  },
  {
    "id": "q1682",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Hydrogène ?",
    "options": [
      "H",
      "Cd",
      "Th",
      "Bi"
    ],
    "reponse": 0
  },
  {
    "id": "q1683",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2545 en chiffres romains ?",
    "options": [
      "MMDXLIV",
      "MMDXLVI",
      "MMDXLV",
      "MMDLV"
    ],
    "reponse": 2
  },
  {
    "id": "q1684",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2739 en chiffres romains ?",
    "options": [
      "MMDCCXXXVIII",
      "MMDCCXXXIX",
      "MMDCCXLI",
      "MMDCCXXXVII"
    ],
    "reponse": 1
  },
  {
    "id": "q1685",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument à percussion est composé de plusieurs tambours et cymbales, utilisé dans les groupes de rock ?",
    "options": [
      "Le xylophone",
      "Les congas",
      "La batterie",
      "Le tambourin"
    ],
    "reponse": 2
  },
  {
    "id": "q1686",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Biélorussie ?",
    "options": [
      "San José",
      "Erevan",
      "Kampala",
      "Minsk"
    ],
    "reponse": 3
  },
  {
    "id": "q1687",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 2000 mm ?",
    "options": [
      "0",
      "-1",
      "2",
      "1"
    ],
    "reponse": 2
  },
  {
    "id": "q1688",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Kenya",
      "Irak",
      "Estonie",
      "Slovaquie"
    ],
    "reponse": 2
  },
  {
    "id": "q1689",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo met en scène un chasseur de trésors nommé Nathan Drake ?",
    "options": [
      "Indiana Jones",
      "Uncharted",
      "Tomb Raider",
      "Assassin's Creed"
    ],
    "reponse": 1
  },
  {
    "id": "q1690",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCXLII en chiffres romains ?",
    "options": [
      "3143",
      "3141",
      "3142",
      "3140"
    ],
    "reponse": 2
  },
  {
    "id": "q1691",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 998 en chiffres romains ?",
    "options": [
      "CMXCVIII",
      "MIII",
      "CMXCIII",
      "M"
    ],
    "reponse": 0
  },
  {
    "id": "q1692",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Dysprosium ?",
    "options": [
      "Na",
      "Pt",
      "Dy",
      "Tb"
    ],
    "reponse": 2
  },
  {
    "id": "q1693",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 77 ÷ 11 ?",
    "options": [
      "9",
      "7",
      "10",
      "6"
    ],
    "reponse": 1
  },
  {
    "id": "q1694",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "La Valette est la capitale de quel pays ?",
    "options": [
      "Philippines",
      "Malte",
      "Irlande",
      "Costa Rica"
    ],
    "reponse": 1
  },
  {
    "id": "q1695",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 140 ÷ 10 ?",
    "options": [
      "12",
      "16",
      "14",
      "15"
    ],
    "reponse": 2
  },
  {
    "id": "q1696",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1226 et 1279 ?",
    "options": [
      "53",
      "51",
      "57",
      "56"
    ],
    "reponse": 0
  },
  {
    "id": "q1697",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel courant artistique du début du XXe siècle rejette la logique et célèbre l'absurde, incarné par Marcel Duchamp ?",
    "options": [
      "Le dadaïsme",
      "Le surréalisme",
      "L'expressionnisme",
      "Le futurisme"
    ],
    "reponse": 0
  },
  {
    "id": "q1698",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Congo ?",
    "options": [
      "Lisbonne",
      "Lilongwe",
      "Tbilissi",
      "Brazzaville"
    ],
    "reponse": 3
  },
  {
    "id": "q1699",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 127 en chiffres romains ?",
    "options": [
      "CXVII",
      "CXXVI",
      "CXXVIII",
      "CXXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q1700",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel scientifique a formulé la théorie de la relativité ?",
    "options": [
      "Niels Bohr",
      "Max Planck",
      "Isaac Newton",
      "Albert Einstein"
    ],
    "reponse": 3
  },
  {
    "id": "q1701",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLXIII en chiffres romains ?",
    "options": [
      "2463",
      "2468",
      "2453",
      "2462"
    ],
    "reponse": 0
  },
  {
    "id": "q1702",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle région semi-aride borde le Sahara au sud, entre le désert et la savane ?",
    "options": [
      "La Corne de l'Afrique",
      "Le Maghreb",
      "Le Sahel",
      "Le Kalahari"
    ],
    "reponse": 2
  },
  {
    "id": "q1703",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays est le berceau historique du tennis moderne, avec le tournoi de Wimbledon ?",
    "options": [
      "L'Australie",
      "Le Royaume-Uni",
      "La France",
      "Les États-Unis"
    ],
    "reponse": 1
  },
  {
    "id": "q1704",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXLI en chiffres romains ?",
    "options": [
      "3241",
      "3240",
      "3243",
      "3239"
    ],
    "reponse": 0
  },
  {
    "id": "q1705",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Sur quel fleuve africain se trouvent les chutes Victoria ?",
    "options": [
      "Le Zambèze",
      "Le Congo",
      "Le Nil",
      "Le Niger"
    ],
    "reponse": 0
  },
  {
    "id": "q1706",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle crise de 1962 a opposé Washington et Moscou après la découverte d'armes soviétiques sur une île proche de la Floride ?",
    "options": [
      "La crise de Suez",
      "La baie des Cochons",
      "La crise des missiles de Cuba",
      "La crise de Berlin"
    ],
    "reponse": 2
  },
  {
    "id": "q1707",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de plateforme met en scène un marsupial orange qui tournoie sur lui-même pour vaincre ses ennemis ?",
    "options": [
      "Sonic",
      "Spyro",
      "Rayman",
      "Crash Bandicoot"
    ],
    "reponse": 3
  },
  {
    "id": "q1708",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de rythme fait jouer les joueurs avec une fausse guitare en plastique ?",
    "options": [
      "Rock Band",
      "Guitar Hero",
      "SingStar",
      "Just Dance"
    ],
    "reponse": 1
  },
  {
    "id": "q1709",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Soudan ?",
    "options": [
      "🇹🇹",
      "🇹🇿",
      "🇸🇩",
      "🇪🇬"
    ],
    "reponse": 2
  },
  {
    "id": "q1710",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1534 en chiffres romains ?",
    "options": [
      "MDXXIX",
      "MDXXXIX",
      "MDXXXIV",
      "MDXXXV"
    ],
    "reponse": 2
  },
  {
    "id": "q1711",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 10 ?",
    "options": [
      "3",
      "4",
      "2",
      "5"
    ],
    "reponse": 1
  },
  {
    "id": "q1712",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1906 en chiffres romains ?",
    "options": [
      "MCMVIII",
      "MCMVI",
      "MDCCCXCVI",
      "MCMXVI"
    ],
    "reponse": 1
  },
  {
    "id": "q1713",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle montagne russe est le point culminant d'Europe ?",
    "options": [
      "Le Mont Blanc",
      "L'Elbrouz",
      "Le mont Olympe",
      "Le Ben Nevis"
    ],
    "reponse": 1
  },
  {
    "id": "q1714",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Néon ?",
    "options": [
      "Ne",
      "Sb",
      "Tb",
      "Ge"
    ],
    "reponse": 0
  },
  {
    "id": "q1715",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de trous compte un parcours de golf standard ?",
    "options": [
      "18",
      "20",
      "16",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q1716",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Na » ?",
    "options": [
      "Argon",
      "Fer",
      "Ytterbium",
      "Sodium"
    ],
    "reponse": 3
  },
  {
    "id": "q1717",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Dans quel pays scandinave le handball moderne a-t-il été codifié à la fin du XIXe et au début du XXe siècle ?",
    "options": [
      "La Suède",
      "La Norvège",
      "La Finlande",
      "Le Danemark"
    ],
    "reponse": 3
  },
  {
    "id": "q1718",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Pyongyang est la capitale de quel pays ?",
    "options": [
      "Congo",
      "Corée du Nord",
      "Guyana",
      "Lituanie"
    ],
    "reponse": 1
  },
  {
    "id": "q1719",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCLXIV en chiffres romains ?",
    "options": [
      "2166",
      "2164",
      "2163",
      "2169"
    ],
    "reponse": 1
  },
  {
    "id": "q1720",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 180 ÷ 10 ?",
    "options": [
      "18",
      "21",
      "15",
      "22"
    ],
    "reponse": 0
  },
  {
    "id": "q1721",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale sud-américaine se trouve à plus de 3500 mètres d'altitude ?",
    "options": [
      "Bogota",
      "La Paz",
      "Lima",
      "Quito"
    ],
    "reponse": 1
  },
  {
    "id": "q1722",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel objet doré, à l'origine du jugement de Pâris, a indirectement déclenché la guerre de Troie ?",
    "options": [
      "La Toison d'or",
      "Le sceptre d'Agamemnon",
      "Le bouclier d'Achille",
      "La pomme de discorde"
    ],
    "reponse": 3
  },
  {
    "id": "q1723",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation met en scène des jouets qui prennent vie, dont un cow-boy nommé Woody ?",
    "options": [
      "Rebelle",
      "Coco",
      "Toy Story",
      "Cars"
    ],
    "reponse": 2
  },
  {
    "id": "q1724",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Tb » ?",
    "options": [
      "Ruthénium",
      "Aluminium",
      "Terbium",
      "Carbone"
    ],
    "reponse": 2
  },
  {
    "id": "q1725",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 18 ?",
    "options": [
      "300",
      "357",
      "324",
      "354"
    ],
    "reponse": 2
  },
  {
    "id": "q1726",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 889 + 35 ?",
    "options": [
      "924",
      "921",
      "922",
      "926"
    ],
    "reponse": 0
  },
  {
    "id": "q1727",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Porto-Novo est la capitale de quel pays ?",
    "options": [
      "Maurice",
      "Libye",
      "Serbie",
      "Bénin"
    ],
    "reponse": 3
  },
  {
    "id": "q1728",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bruxelles est la capitale de quel pays ?",
    "options": [
      "Ukraine",
      "Belgique",
      "Népal",
      "Irlande"
    ],
    "reponse": 1
  },
  {
    "id": "q1729",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Djibouti ?",
    "options": [
      "Ouguiya",
      "Roupie indienne",
      "Franc djiboutien",
      "Dollar américain"
    ],
    "reponse": 2
  },
  {
    "id": "q1730",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Washington est la capitale de quel pays ?",
    "options": [
      "Malawi",
      "États-Unis",
      "Lesotho",
      "Guinée"
    ],
    "reponse": 1
  },
  {
    "id": "q1731",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 6 m ?",
    "options": [
      "5073",
      "6207",
      "6000",
      "6805"
    ],
    "reponse": 2
  },
  {
    "id": "q1732",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de simulation de vie permet de construire des maisons et de contrôler le quotidien de personnages virtuels ?",
    "options": [
      "Animal Crossing",
      "SimCity",
      "Les Sims",
      "Second Life"
    ],
    "reponse": 2
  },
  {
    "id": "q1733",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Mogadiscio est la capitale de quel pays ?",
    "options": [
      "Émirats arabes unis",
      "Roumanie",
      "Espagne",
      "Somalie"
    ],
    "reponse": 3
  },
  {
    "id": "q1734",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Zambie ?",
    "options": [
      "🇹🇱",
      "🇿🇲",
      "🇯🇲",
      "🇧🇼"
    ],
    "reponse": 1
  },
  {
    "id": "q1735",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 621 - 37 ?",
    "options": [
      "584",
      "582",
      "585",
      "587"
    ],
    "reponse": 0
  },
  {
    "id": "q1736",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Émirats arabes unis ?",
    "options": [
      "Franc CFA",
      "Rial iranien",
      "Dirham",
      "Manat azerbaïdjanais"
    ],
    "reponse": 2
  },
  {
    "id": "q1737",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène un parrain de la mafia du New Jersey qui consulte une psychiatre ?",
    "options": [
      "The Good Wife",
      "Better Call Saul",
      "Suits",
      "Les Soprano"
    ],
    "reponse": 3
  },
  {
    "id": "q1738",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument, une femme drapée tenant une torche, a été offert par la France aux États-Unis en 1886 ?",
    "options": [
      "L'Empire State Building",
      "Le Rockefeller Center",
      "La statue de la Liberté",
      "Le pont de Brooklyn"
    ],
    "reponse": 2
  },
  {
    "id": "q1739",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 100 ÷ 10 ?",
    "options": [
      "11",
      "10",
      "12",
      "9"
    ],
    "reponse": 1
  },
  {
    "id": "q1740",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouzbékistan",
      "Barbade",
      "Érythrée",
      "Italie"
    ],
    "reponse": 0
  },
  {
    "id": "q1741",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur mexicain a signé « Gravity » et « Roma » ?",
    "options": [
      "Robert Rodriguez",
      "Alejandro González Iñárritu",
      "Guillermo del Toro",
      "Alfonso Cuarón"
    ],
    "reponse": 3
  },
  {
    "id": "q1742",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Dans quel pays le fleuve Amazone prend-il sa source, dans la cordillère des Andes ?",
    "options": [
      "La Bolivie",
      "Le Pérou",
      "L'Équateur",
      "La Colombie"
    ],
    "reponse": 1
  },
  {
    "id": "q1743",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Asmara est la capitale de quel pays ?",
    "options": [
      "Érythrée",
      "Chili",
      "Monténégro",
      "République démocratique du Congo"
    ],
    "reponse": 0
  },
  {
    "id": "q1744",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1167 et 1441 ?",
    "options": [
      "309",
      "289",
      "274",
      "276"
    ],
    "reponse": 2
  },
  {
    "id": "q1745",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1821 et 1872 ?",
    "options": [
      "57",
      "51",
      "60",
      "45"
    ],
    "reponse": 1
  },
  {
    "id": "q1746",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film raconte l'histoire d'un poisson-clown nommé Marin partant à la recherche de son fils ?",
    "options": [
      "Le Monde de Nemo",
      "Vice-versa",
      "Le Monde de Dory",
      "Là-haut"
    ],
    "reponse": 0
  },
  {
    "id": "q1747",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Belmopan est la capitale de quel pays ?",
    "options": [
      "États-Unis",
      "Bénin",
      "Arabie saoudite",
      "Belize"
    ],
    "reponse": 3
  },
  {
    "id": "q1748",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle cérémonie américaine récompense chaque année les films avec des statuettes dorées ?",
    "options": [
      "Les Emmy Awards",
      "Les BAFTA",
      "Les Golden Globes",
      "Les Oscars"
    ],
    "reponse": 3
  },
  {
    "id": "q1749",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock a été formé par Mick Jagger et Keith Richards ?",
    "options": [
      "The Who",
      "The Kinks",
      "The Beatles",
      "The Rolling Stones"
    ],
    "reponse": 3
  },
  {
    "id": "q1750",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle écrivaine française est l'autrice du roman autobiographique « L'Amant » ?",
    "options": [
      "Marguerite Duras",
      "Françoise Sagan",
      "Annie Ernaux",
      "Nathalie Sarraute"
    ],
    "reponse": 0
  },
  {
    "id": "q1751",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur est célèbre pour ses films d'horreur comme « Psychose » et « Les Oiseaux » ?",
    "options": [
      "Stanley Kubrick",
      "Wes Craven",
      "John Carpenter",
      "Alfred Hitchcock"
    ],
    "reponse": 3
  },
  {
    "id": "q1752",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2271 en chiffres romains ?",
    "options": [
      "MMCCLXXI",
      "MMCCLXIX",
      "MMCCLXXVI",
      "MMCCLXXIII"
    ],
    "reponse": 0
  },
  {
    "id": "q1753",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Crime et Châtiment » ?",
    "options": [
      "Fiodor Dostoïevski",
      "Ivan Tourgueniev",
      "Léon Tolstoï",
      "Nicolas Gogol"
    ],
    "reponse": 0
  },
  {
    "id": "q1754",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Tungstène ?",
    "options": [
      "Ho",
      "W",
      "P",
      "Sc"
    ],
    "reponse": 1
  },
  {
    "id": "q1755",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 78 ÷ 3 ?",
    "options": [
      "25",
      "21",
      "26",
      "30"
    ],
    "reponse": 2
  },
  {
    "id": "q1756",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Suède ?",
    "options": [
      "Téhéran",
      "Asuncion",
      "Stockholm",
      "Windhoek"
    ],
    "reponse": 2
  },
  {
    "id": "q1757",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇻🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Chili",
      "Venezuela",
      "Gabon",
      "Libye"
    ],
    "reponse": 1
  },
  {
    "id": "q1758",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve France ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Afrique",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q1759",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « C » ?",
    "options": [
      "Cérium",
      "Carbone",
      "Brome",
      "Aluminium"
    ],
    "reponse": 1
  },
  {
    "id": "q1760",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel processus consiste à transformer des données pour les rendre illisibles sans une clé spécifique ?",
    "options": [
      "La virtualisation",
      "L'indexation",
      "La compression",
      "Le chiffrement"
    ],
    "reponse": 3
  },
  {
    "id": "q1761",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇨 De quel pays est-ce le drapeau ?",
    "options": [
      "Madagascar",
      "Espagne",
      "Libye",
      "Monaco"
    ],
    "reponse": 3
  },
  {
    "id": "q1762",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Tellure ?",
    "options": [
      "Bi",
      "Y",
      "Kr",
      "Te"
    ],
    "reponse": 3
  },
  {
    "id": "q1763",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre est le principal représentant du mouvement pop art américain avec ses boîtes de soupe Campbell ?",
    "options": [
      "Robert Rauschenberg",
      "Jasper Johns",
      "Andy Warhol",
      "Roy Lichtenstein"
    ],
    "reponse": 2
  },
  {
    "id": "q1764",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Trinité-et-Tobago",
      "Chypre",
      "Guinée-Bissau",
      "Costa Rica"
    ],
    "reponse": 0
  },
  {
    "id": "q1765",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2171 en chiffres romains ?",
    "options": [
      "MMCLXIX",
      "MMCLXVI",
      "MMCLXXI",
      "MMCLXXIII"
    ],
    "reponse": 2
  },
  {
    "id": "q1766",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Monaco ?",
    "options": [
      "🇧🇦",
      "🇦🇪",
      "🇲🇨",
      "🇵🇰"
    ],
    "reponse": 2
  },
  {
    "id": "q1767",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Niobium ?",
    "options": [
      "Os",
      "Cu",
      "Nb",
      "As"
    ],
    "reponse": 2
  },
  {
    "id": "q1768",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 24 ÷ 2 ?",
    "options": [
      "15",
      "12",
      "13",
      "9"
    ],
    "reponse": 1
  },
  {
    "id": "q1769",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film de science-fiction met en scène un adolescent voyageant dans le temps à bord d'une voiture de sport modifiée ?",
    "options": [
      "Terminator",
      "Retour vers le futur",
      "Interstellar",
      "Looper"
    ],
    "reponse": 1
  },
  {
    "id": "q1770",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 500 ?",
    "options": [
      "114",
      "111",
      "115",
      "125"
    ],
    "reponse": 3
  },
  {
    "id": "q1771",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du fondateur d'Amazon ?",
    "options": [
      "Elon Musk",
      "Tim Cook",
      "Larry Ellison",
      "Jeff Bezos"
    ],
    "reponse": 3
  },
  {
    "id": "q1772",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel duo américain des années 1960-70 est connu pour « The Sound of Silence » et « Bridge over Troubled Water » ?",
    "options": [
      "The Everly Brothers",
      "Simon & Garfunkel",
      "Hall & Oates",
      "The Righteous Brothers"
    ],
    "reponse": 1
  },
  {
    "id": "q1773",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la Barbade ?",
    "options": [
      "Dollar barbadien",
      "Dinar irakien",
      "Leu moldave",
      "Zloty"
    ],
    "reponse": 0
  },
  {
    "id": "q1774",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mali ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Europe",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q1775",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de programmation est symbolisé par un logo représentant un serpent ?",
    "options": [
      "Ruby",
      "PHP",
      "Python",
      "Perl"
    ],
    "reponse": 2
  },
  {
    "id": "q1776",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCXCIV en chiffres romains ?",
    "options": [
      "3194",
      "3189",
      "3184",
      "3204"
    ],
    "reponse": 0
  },
  {
    "id": "q1777",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 26 t ?",
    "options": [
      "26000",
      "29265",
      "22895",
      "25254"
    ],
    "reponse": 0
  },
  {
    "id": "q1778",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Mo » ?",
    "options": [
      "Francium",
      "Molybdène",
      "Cérium",
      "Neptunium"
    ],
    "reponse": 1
  },
  {
    "id": "q1779",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 437 - 45 ?",
    "options": [
      "391",
      "394",
      "392",
      "395"
    ],
    "reponse": 2
  },
  {
    "id": "q1780",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Berne est la capitale de quel pays ?",
    "options": [
      "Kosovo",
      "Suisse",
      "Portugal",
      "Islande"
    ],
    "reponse": 1
  },
  {
    "id": "q1781",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 au carré ?",
    "options": [
      "366",
      "360",
      "372",
      "361"
    ],
    "reponse": 3
  },
  {
    "id": "q1782",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel dramaturge norvégien est considéré comme le père du théâtre moderne, auteur de « Maison de poupée » ?",
    "options": [
      "August Strindberg",
      "Anton Tchekhov",
      "Bertolt Brecht",
      "Henrik Ibsen"
    ],
    "reponse": 3
  },
  {
    "id": "q1783",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel organe humain est responsable de la filtration du sang et de la production d'urine ?",
    "options": [
      "Le rein",
      "Le foie",
      "La vessie",
      "Le pancréas"
    ],
    "reponse": 0
  },
  {
    "id": "q1784",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 600 min ?",
    "options": [
      "10",
      "7",
      "11",
      "12"
    ],
    "reponse": 0
  },
  {
    "id": "q1785",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle figure suprême de la mythologie chinoise règne sur le ciel et l'ensemble des divinités taoïstes ?",
    "options": [
      "Le Roi des Singes",
      "L'Empereur de Jade",
      "Le Dragon céleste",
      "Guanyin"
    ],
    "reponse": 1
  },
  {
    "id": "q1786",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 974 - 77 ?",
    "options": [
      "897",
      "895",
      "900",
      "894"
    ],
    "reponse": 0
  },
  {
    "id": "q1787",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel mammifère marin est le plus intelligent après l'humain selon de nombreuses études ?",
    "options": [
      "Le dauphin",
      "L'otarie",
      "Le phoque",
      "La baleine"
    ],
    "reponse": 0
  },
  {
    "id": "q1788",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Barbade ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q1789",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 401 + 462 ?",
    "options": [
      "866",
      "865",
      "862",
      "863"
    ],
    "reponse": 3
  },
  {
    "id": "q1790",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Tc » ?",
    "options": [
      "Protactinium",
      "Argon",
      "Carbone",
      "Technétium"
    ],
    "reponse": 3
  },
  {
    "id": "q1791",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Biélorussie ?",
    "options": [
      "Yuan",
      "Tugrik",
      "Rouble biélorusse",
      "Forint"
    ],
    "reponse": 2
  },
  {
    "id": "q1792",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 63 - 23 ?",
    "options": [
      "38",
      "40",
      "42",
      "39"
    ],
    "reponse": 1
  },
  {
    "id": "q1793",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur au style visuel très symétrique et coloré a signé « The Grand Budapest Hotel » ?",
    "options": [
      "Spike Jonze",
      "Wes Anderson",
      "Tim Burton",
      "Yórgos Lánthimos"
    ],
    "reponse": 1
  },
  {
    "id": "q1794",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Cameroun ?",
    "options": [
      "Quetzal",
      "Kyat",
      "Franc CFA",
      "Livre égyptienne"
    ],
    "reponse": 2
  },
  {
    "id": "q1795",
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
    "id": "q1796",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec des voyageurs et des voleurs est aussi le messager des dieux ?",
    "options": [
      "Arès",
      "Dionysos",
      "Apollon",
      "Hermès"
    ],
    "reponse": 3
  },
  {
    "id": "q1797",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Danemark ?",
    "options": [
      "Dinar libyen",
      "Dinar jordanien",
      "Couronne danoise",
      "Dollar bahaméen"
    ],
    "reponse": 2
  },
  {
    "id": "q1798",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Gabon ?",
    "options": [
      "🇬🇦",
      "🇫🇯",
      "🇸🇦",
      "🇲🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q1799",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien suprême est associé au soleil et considéré comme le créateur du monde ?",
    "options": [
      "Ptah",
      "Osiris",
      "Amon",
      "Rê"
    ],
    "reponse": 3
  },
  {
    "id": "q1800",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Belize ?",
    "options": [
      "Bamako",
      "Kigali",
      "Dili",
      "Belmopan"
    ],
    "reponse": 3
  },
  {
    "id": "q1801",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 789 + 338 ?",
    "options": [
      "1127",
      "1130",
      "1126",
      "1125"
    ],
    "reponse": 0
  },
  {
    "id": "q1802",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quels sont les deux frères jumeaux fondateurs légendaires de Rome ?",
    "options": [
      "Cronos et Zeus",
      "Énée et Ascagne",
      "Castor et Pollux",
      "Romulus et Remus"
    ],
    "reponse": 3
  },
  {
    "id": "q1803",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Copenhague est la capitale de quel pays ?",
    "options": [
      "Vietnam",
      "Mexique",
      "Danemark",
      "Serbie"
    ],
    "reponse": 2
  },
  {
    "id": "q1804",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Dans la mythologie grecque, quel peuple était composé exclusivement de guerrières redoutées ?",
    "options": [
      "Les Amazones",
      "Les Danaïdes",
      "Les Walkyries",
      "Les Ménades"
    ],
    "reponse": 0
  },
  {
    "id": "q1805",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1041 en chiffres romains ?",
    "options": [
      "MXXXI",
      "MXXXVI",
      "MXLI",
      "MXL"
    ],
    "reponse": 2
  },
  {
    "id": "q1806",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDL en chiffres romains ?",
    "options": [
      "1540",
      "1550",
      "1545",
      "1549"
    ],
    "reponse": 1
  },
  {
    "id": "q1807",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 34000 g ?",
    "options": [
      "38",
      "41",
      "40",
      "34"
    ],
    "reponse": 3
  },
  {
    "id": "q1808",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel fleuve prend sa source en Suisse et traverse l'Allemagne et les Pays-Bas avant de rejoindre la mer du Nord ?",
    "options": [
      "La Seine",
      "Le Rhin",
      "Le Danube",
      "L'Escaut"
    ],
    "reponse": 1
  },
  {
    "id": "q1809",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo d'horreur psychologique se déroule dans une ville américaine plongée dans un épais brouillard et hantée par des créatures monstrueuses ?",
    "options": [
      "Silent Hill",
      "Resident Evil",
      "Dead Space",
      "Outlast"
    ],
    "reponse": 0
  },
  {
    "id": "q1810",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 1000 ?",
    "options": [
      "500",
      "465",
      "459",
      "510"
    ],
    "reponse": 0
  },
  {
    "id": "q1811",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu hindou est le préservateur de l'univers, connu pour ses avatars comme Krishna et Rama ?",
    "options": [
      "Indra",
      "Vishnou",
      "Shiva",
      "Brahma"
    ],
    "reponse": 1
  },
  {
    "id": "q1812",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 31 kg ?",
    "options": [
      "30961",
      "26015",
      "31000",
      "28470"
    ],
    "reponse": 2
  },
  {
    "id": "q1813",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 162 ÷ 9 ?",
    "options": [
      "14",
      "20",
      "18",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q1814",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « S » ?",
    "options": [
      "Cérium",
      "Fluor",
      "Soufre",
      "Tellure"
    ],
    "reponse": 2
  },
  {
    "id": "q1815",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle est la déesse de l'amour et de la beauté dans la mythologie grecque ?",
    "options": [
      "Artémis",
      "Héra",
      "Athéna",
      "Aphrodite"
    ],
    "reponse": 3
  },
  {
    "id": "q1816",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCCLXVII en chiffres romains ?",
    "options": [
      "1867",
      "1857",
      "1862",
      "1866"
    ],
    "reponse": 0
  },
  {
    "id": "q1817",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 742 - 432 ?",
    "options": [
      "307",
      "310",
      "308",
      "309"
    ],
    "reponse": 1
  },
  {
    "id": "q1818",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "République démocratique du Congo",
      "Papouasie-Nouvelle-Guinée",
      "Afghanistan",
      "Bénin"
    ],
    "reponse": 1
  },
  {
    "id": "q1819",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Mongolie ?",
    "options": [
      "Madrid",
      "Victoria",
      "Oulan-Bator",
      "Malabo"
    ],
    "reponse": 2
  },
  {
    "id": "q1820",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "République tchèque",
      "Kirghizstan",
      "Brunei",
      "Pérou"
    ],
    "reponse": 0
  },
  {
    "id": "q1821",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de la République tchèque ?",
    "options": [
      "Tachkent",
      "Dacca",
      "Suva",
      "Prague"
    ],
    "reponse": 3
  },
  {
    "id": "q1822",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2939 en chiffres romains ?",
    "options": [
      "MMCMXXXVII",
      "MMCMXXXIX",
      "MMCMXXXIV",
      "MMCMXLIV"
    ],
    "reponse": 1
  },
  {
    "id": "q1823",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Li » ?",
    "options": [
      "Lithium",
      "Béryllium",
      "Sélénium",
      "Étain"
    ],
    "reponse": 0
  },
  {
    "id": "q1824",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 × 9 ?",
    "options": [
      "26",
      "27",
      "24",
      "32"
    ],
    "reponse": 1
  },
  {
    "id": "q1825",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Corée du Nord ?",
    "options": [
      "Ouagadougou",
      "Pyongyang",
      "Oslo",
      "Amsterdam"
    ],
    "reponse": 1
  },
  {
    "id": "q1826",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Ruthénium ?",
    "options": [
      "Ru",
      "Np",
      "Sm",
      "Cm"
    ],
    "reponse": 0
  },
  {
    "id": "q1827",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Dans quelle structure de la cellule l'ADN est-il principalement contenu ?",
    "options": [
      "Le noyau",
      "Le ribosome",
      "La membrane",
      "Le cytoplasme"
    ],
    "reponse": 0
  },
  {
    "id": "q1828",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a signé « Apocalypse Now », plongée dans la guerre du Vietnam ?",
    "options": [
      "Oliver Stone",
      "Stanley Kubrick",
      "Michael Cimino",
      "Francis Ford Coppola"
    ],
    "reponse": 3
  },
  {
    "id": "q1829",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 450 + 481 ?",
    "options": [
      "929",
      "934",
      "931",
      "933"
    ],
    "reponse": 2
  },
  {
    "id": "q1830",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 1600 année(s) ?",
    "options": [
      "14",
      "16",
      "17",
      "19"
    ],
    "reponse": 1
  },
  {
    "id": "q1831",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 20 min ?",
    "options": [
      "1200",
      "1220",
      "1160",
      "1107"
    ],
    "reponse": 0
  },
  {
    "id": "q1832",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouganda",
      "Guyana",
      "Chine",
      "Paraguay"
    ],
    "reponse": 2
  },
  {
    "id": "q1833",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle échelle mesure l'acidité ou la basicité d'une solution ?",
    "options": [
      "L'échelle de Richter",
      "L'échelle de Beaufort",
      "L'échelle de Kelvin",
      "L'échelle de pH"
    ],
    "reponse": 3
  },
  {
    "id": "q1834",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage de programmation est très utilisé pour l'analyse de données et l'intelligence artificielle ?",
    "options": [
      "Fortran",
      "Python",
      "Assembleur",
      "COBOL"
    ],
    "reponse": 1
  },
  {
    "id": "q1835",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Tantale ?",
    "options": [
      "Rh",
      "Sc",
      "Ta",
      "Gd"
    ],
    "reponse": 2
  },
  {
    "id": "q1836",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle philosophe française est l'autrice du « Deuxième Sexe », essai fondateur du féminisme ?",
    "options": [
      "Françoise Sagan",
      "Hannah Arendt",
      "Simone Weil",
      "Simone de Beauvoir"
    ],
    "reponse": 3
  },
  {
    "id": "q1837",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suisse ?",
    "options": [
      "Afrique",
      "Océanie",
      "Europe",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q1838",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 150 ÷ 10 ?",
    "options": [
      "15",
      "12",
      "18",
      "17"
    ],
    "reponse": 0
  },
  {
    "id": "q1839",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Tadjikistan ?",
    "options": [
      "Leu roumain",
      "Rial omanais",
      "Somoni",
      "Dinar koweïtien"
    ],
    "reponse": 2
  },
  {
    "id": "q1840",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 29 au carré ?",
    "options": [
      "841",
      "830",
      "873",
      "865"
    ],
    "reponse": 0
  },
  {
    "id": "q1841",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 144 ?",
    "options": [
      "14",
      "13",
      "9",
      "12"
    ],
    "reponse": 3
  },
  {
    "id": "q1842",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1917 et 1932 ?",
    "options": [
      "18",
      "14",
      "12",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q1843",
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
    "id": "q1844",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale européenne est construite sur plusieurs îles reliées par des ponts ?",
    "options": [
      "Copenhague",
      "Venise",
      "Stockholm",
      "Amsterdam"
    ],
    "reponse": 2
  },
  {
    "id": "q1845",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Hanoï est la capitale de quel pays ?",
    "options": [
      "Venezuela",
      "Niger",
      "Lituanie",
      "Vietnam"
    ],
    "reponse": 3
  },
  {
    "id": "q1846",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est célèbre pour ses douze travaux ?",
    "options": [
      "Persée",
      "Héraclès (Hercule)",
      "Thésée",
      "Achille"
    ],
    "reponse": 1
  },
  {
    "id": "q1847",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel guitariste et chanteur américain de blues, surnommé « Le Roi du Blues », est associé à sa guitare Lucille ?",
    "options": [
      "Buddy Guy",
      "Muddy Waters",
      "B.B. King",
      "Eric Clapton"
    ],
    "reponse": 2
  },
  {
    "id": "q1848",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel océan est le plus vaste ?",
    "options": [
      "L'océan Atlantique",
      "L'océan Indien",
      "L'océan Arctique",
      "L'océan Pacifique"
    ],
    "reponse": 3
  },
  {
    "id": "q1849",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quel arrêt technique obligatoire les pilotes de Formule 1 doivent-ils effectuer au moins une fois pendant une course ?",
    "options": [
      "Un changement de casque",
      "Un dépassement obligatoire",
      "Un changement de pneus",
      "Un ravitaillement en essence"
    ],
    "reponse": 2
  },
  {
    "id": "q1850",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Radium ?",
    "options": [
      "C",
      "Ra",
      "Po",
      "Pu"
    ],
    "reponse": 1
  },
  {
    "id": "q1851",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Australie ?",
    "options": [
      "Beyrouth",
      "Paramaribo",
      "Belmopan",
      "Canberra"
    ],
    "reponse": 3
  },
  {
    "id": "q1852",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 989 + 301 ?",
    "options": [
      "1289",
      "1293",
      "1290",
      "1291"
    ],
    "reponse": 2
  },
  {
    "id": "q1853",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Turquie ?",
    "options": [
      "Washington",
      "Ankara",
      "Accra",
      "Sofia"
    ],
    "reponse": 1
  },
  {
    "id": "q1854",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 3300 cm ?",
    "options": [
      "37",
      "30",
      "36",
      "33"
    ],
    "reponse": 3
  },
  {
    "id": "q1855",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nairobi est la capitale de quel pays ?",
    "options": [
      "Monténégro",
      "Sierra Leone",
      "Kenya",
      "France"
    ],
    "reponse": 2
  },
  {
    "id": "q1856",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport dit-on qu'un joueur « sert » et que l'adversaire « retourne » ?",
    "options": [
      "Le badminton",
      "Le volley-ball",
      "Le tennis de table",
      "Le tennis"
    ],
    "reponse": 3
  },
  {
    "id": "q1857",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel élément est essentiel à la respiration humaine, absorbé par les poumons ?",
    "options": [
      "Le dioxyde de carbone",
      "L'oxygène",
      "L'azote",
      "L'hydrogène"
    ],
    "reponse": 1
  },
  {
    "id": "q1858",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCXII en chiffres romains ?",
    "options": [
      "212",
      "213",
      "207",
      "202"
    ],
    "reponse": 0
  },
  {
    "id": "q1859",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel supercalculateur d'IBM a battu le champion du monde d'échecs Garry Kasparov en 1997 ?",
    "options": [
      "Watson",
      "Deep Thought",
      "AlphaGo",
      "Deep Blue"
    ],
    "reponse": 3
  },
  {
    "id": "q1860",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle planète possède le plus grand volcan du système solaire, Olympus Mons ?",
    "options": [
      "Jupiter",
      "Vénus",
      "Mercure",
      "Mars"
    ],
    "reponse": 3
  },
  {
    "id": "q1861",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 5 × 12 ?",
    "options": [
      "51",
      "60",
      "65",
      "56"
    ],
    "reponse": 1
  },
  {
    "id": "q1862",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Serbie ?",
    "options": [
      "Asie",
      "Afrique",
      "Europe",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q1863",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel cycle de quatre opéras de Richard Wagner s'inspire de la mythologie germanique ?",
    "options": [
      "Tristan et Isolde",
      "L'Anneau du Nibelung",
      "Parsifal",
      "Lohengrin"
    ],
    "reponse": 1
  },
  {
    "id": "q1864",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Costa Rica ?",
    "options": [
      "Roupie mauricienne",
      "Taka",
      "Colon costaricain",
      "Peso chilien"
    ],
    "reponse": 2
  },
  {
    "id": "q1865",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « O » ?",
    "options": [
      "Carbone",
      "Oxygène",
      "Américium",
      "Indium"
    ],
    "reponse": 1
  },
  {
    "id": "q1866",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle console a été lancée par Sony en 1994, marquant son entrée dans les jeux vidéo ?",
    "options": [
      "La PlayStation",
      "La Dreamcast",
      "La Nintendo 64",
      "La Saturn"
    ],
    "reponse": 0
  },
  {
    "id": "q1867",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Madrid est la capitale de quel pays ?",
    "options": [
      "Maurice",
      "Portugal",
      "Laos",
      "Espagne"
    ],
    "reponse": 3
  },
  {
    "id": "q1868",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 229 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "1e siècle",
      "2e siècle",
      "3e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q1869",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Re » ?",
    "options": [
      "Rhénium",
      "Bismuth",
      "Argon",
      "Thallium"
    ],
    "reponse": 0
  },
  {
    "id": "q1870",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 75 ÷ 5 ?",
    "options": [
      "14",
      "18",
      "17",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q1871",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Guyana ?",
    "options": [
      "Dinar libyen",
      "Roupie indienne",
      "Dollar guyanien",
      "Loti"
    ],
    "reponse": 2
  },
  {
    "id": "q1872",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Combien de points vaut un but au football ?",
    "options": [
      "1",
      "0",
      "3",
      "2"
    ],
    "reponse": 0
  },
  {
    "id": "q1873",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle baie canadienne connaît les marées les plus hautes du monde, jusqu'à 16 mètres d'amplitude ?",
    "options": [
      "La baie de Fundy",
      "La baie de Chesapeake",
      "La baie d'Hudson",
      "La baie de Californie"
    ],
    "reponse": 0
  },
  {
    "id": "q1874",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Japon ?",
    "options": [
      "Dodoma",
      "Tokyo",
      "Georgetown",
      "Tachkent"
    ],
    "reponse": 1
  },
  {
    "id": "q1875",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 189 ÷ 7 ?",
    "options": [
      "31",
      "28",
      "27",
      "23"
    ],
    "reponse": 2
  },
  {
    "id": "q1876",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Béryllium ?",
    "options": [
      "Cr",
      "Be",
      "Nb",
      "Dy"
    ],
    "reponse": 1
  },
  {
    "id": "q1877",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 2 × 13 ?",
    "options": [
      "21",
      "25",
      "26",
      "28"
    ],
    "reponse": 2
  },
  {
    "id": "q1878",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Suède ?",
    "options": [
      "🇭🇷",
      "🇮🇶",
      "🇸🇪",
      "🇯🇵"
    ],
    "reponse": 2
  },
  {
    "id": "q1879",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a signé « Parasite », Palme d'or à Cannes en 2019 ?",
    "options": [
      "Park Chan-wook",
      "Lee Chang-dong",
      "Bong Joon-ho",
      "Kim Ki-duk"
    ],
    "reponse": 2
  },
  {
    "id": "q1880",
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
    "id": "q1881",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « He » ?",
    "options": [
      "Ytterbium",
      "Germanium",
      "Hélium",
      "Osmium"
    ],
    "reponse": 2
  },
  {
    "id": "q1882",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays africain compte davantage de pyramides que l'Égypte, héritage de l'ancien royaume de Koush ?",
    "options": [
      "Le Pérou",
      "Le Mexique",
      "Le Soudan",
      "L'Égypte"
    ],
    "reponse": 2
  },
  {
    "id": "q1883",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Rwanda ?",
    "options": [
      "Tbilissi",
      "Pyongyang",
      "Washington",
      "Kigali"
    ],
    "reponse": 3
  },
  {
    "id": "q1884",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1639 appartient à quel siècle ?",
    "options": [
      "16e siècle",
      "18e siècle",
      "17e siècle",
      "15e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1885",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Cambodge ?",
    "options": [
      "🇰🇭",
      "🇬🇦",
      "🇳🇮",
      "🇺🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q1886",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel service de stockage en ligne propose 15 Go d'espace gratuit et est intégré à Gmail ?",
    "options": [
      "iCloud",
      "Google Drive",
      "Dropbox",
      "OneDrive"
    ],
    "reponse": 1
  },
  {
    "id": "q1887",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pérou ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Océanie",
      "Afrique"
    ],
    "reponse": 0
  },
  {
    "id": "q1888",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a créé l'iPhone ?",
    "options": [
      "Microsoft",
      "Apple",
      "Samsung",
      "Google"
    ],
    "reponse": 1
  },
  {
    "id": "q1889",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est l'animal terrestre ayant la plus longue espérance de vie ?",
    "options": [
      "L'éléphant",
      "La baleine",
      "Le perroquet",
      "La tortue géante"
    ],
    "reponse": 3
  },
  {
    "id": "q1890",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 133 jour(s) ?",
    "options": [
      "15",
      "16",
      "18",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q1891",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle fondation développe le navigateur web libre Firefox ?",
    "options": [
      "La fondation Apache",
      "La fondation Wikimedia",
      "La fondation Mozilla",
      "La fondation Linux"
    ],
    "reponse": 2
  },
  {
    "id": "q1892",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Russie ?",
    "options": [
      "Tala",
      "Couronne danoise",
      "Rouble russe",
      "Dirham marocain"
    ],
    "reponse": 2
  },
  {
    "id": "q1893",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu égyptien du vent et de l'air soutient le ciel ?",
    "options": [
      "Thot",
      "Nout",
      "Shou",
      "Geb"
    ],
    "reponse": 2
  },
  {
    "id": "q1894",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel grand félin africain vit en groupes appelés « prides » et est surnommé le roi de la savane ?",
    "options": [
      "Le guépard",
      "L'hyène",
      "Le lion",
      "Le léopard"
    ],
    "reponse": 2
  },
  {
    "id": "q1895",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Lettonie ?",
    "options": [
      "Rial iranien",
      "Dinar jordanien",
      "Dollar zimbabwéen",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q1896",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Madagascar ?",
    "options": [
      "Guarani",
      "Ariary",
      "Dollar canadien",
      "Riyal qatari"
    ],
    "reponse": 1
  },
  {
    "id": "q1897",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Pays-Bas ?",
    "options": [
      "Afrique",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1898",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1374 et 1547 ?",
    "options": [
      "195",
      "157",
      "173",
      "168"
    ],
    "reponse": 2
  },
  {
    "id": "q1899",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DXXXVIII en chiffres romains ?",
    "options": [
      "533",
      "537",
      "539",
      "538"
    ],
    "reponse": 3
  },
  {
    "id": "q1900",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Autriche ?",
    "options": [
      "Roupie indienne",
      "Franc djiboutien",
      "Euro",
      "Dollar néo-zélandais"
    ],
    "reponse": 2
  },
  {
    "id": "q1901",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de m dans 4 km ?",
    "options": [
      "3912",
      "4200",
      "3498",
      "4000"
    ],
    "reponse": 3
  },
  {
    "id": "q1902",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 40 min ?",
    "options": [
      "2551",
      "2400",
      "2092",
      "2538"
    ],
    "reponse": 1
  },
  {
    "id": "q1903",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel détroit sépare l'Asie de l'Amérique du Nord ?",
    "options": [
      "Le détroit de Malacca",
      "Le détroit de Gibraltar",
      "Le détroit de Béring",
      "Le détroit de Cook"
    ],
    "reponse": 2
  },
  {
    "id": "q1904",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec du feu et de la forge est boiteux et forgeron des autres dieux ?",
    "options": [
      "Dionysos",
      "Arès",
      "Héphaïstos",
      "Hermès"
    ],
    "reponse": 2
  },
  {
    "id": "q1905",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Manille est la capitale de quel pays ?",
    "options": [
      "Laos",
      "Honduras",
      "Philippines",
      "Angola"
    ],
    "reponse": 2
  },
  {
    "id": "q1906",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 7 × 20 ?",
    "options": [
      "138",
      "153",
      "140",
      "156"
    ],
    "reponse": 2
  },
  {
    "id": "q1907",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film de Disney met en scène une princesse aux pouvoirs de glace nommée Elsa ?",
    "options": [
      "Blanche-Neige",
      "Vaiana",
      "La Reine des neiges",
      "Raiponce"
    ],
    "reponse": 2
  },
  {
    "id": "q1908",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Suriname",
      "Thaïlande",
      "Panama",
      "Géorgie"
    ],
    "reponse": 0
  },
  {
    "id": "q1909",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel instrument compte généralement 88 touches ?",
    "options": [
      "Le piano",
      "L'accordéon",
      "L'orgue",
      "Le clavecin"
    ],
    "reponse": 0
  },
  {
    "id": "q1910",
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
    "id": "q1911",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel terme désigne un logiciel malveillant qui chiffre les fichiers d'une victime et exige une rançon pour les déverrouiller ?",
    "options": [
      "Un logiciel espion",
      "Un cheval de Troie",
      "Un rançongiciel",
      "Un ver informatique"
    ],
    "reponse": 2
  },
  {
    "id": "q1912",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 3 au carré ?",
    "options": [
      "9",
      "6",
      "7",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q1913",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Somalie",
      "Brunei",
      "Cuba",
      "Érythrée"
    ],
    "reponse": 2
  },
  {
    "id": "q1914",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 × 19 ?",
    "options": [
      "190",
      "176",
      "173",
      "205"
    ],
    "reponse": 0
  },
  {
    "id": "q1915",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Laos ?",
    "options": [
      "Couronne norvégienne",
      "Nakfa",
      "Kip",
      "Ouguiya"
    ],
    "reponse": 2
  },
  {
    "id": "q1916",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guatemala ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 0
  },
  {
    "id": "q1917",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 453 en chiffres romains ?",
    "options": [
      "CDLIII",
      "CDLV",
      "CDLII",
      "CDXLVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q1918",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Al » ?",
    "options": [
      "Tellure",
      "Tungstène",
      "Aluminium",
      "Étain"
    ],
    "reponse": 2
  },
  {
    "id": "q1919",
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
    "id": "q1920",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Tous les combien d'années ont lieu les Jeux olympiques d'été ?",
    "options": [
      "5 ans",
      "4 ans",
      "2 ans",
      "3 ans"
    ],
    "reponse": 1
  },
  {
    "id": "q1921",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guinée-Bissau ?",
    "options": [
      "Océanie",
      "Afrique",
      "Asie",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q1922",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Chili ?",
    "options": [
      "🇨🇱",
      "🇮🇳",
      "🇸🇳",
      "🇩🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q1923",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Danemark ?",
    "options": [
      "Moroni",
      "Alger",
      "Copenhague",
      "Moscou"
    ],
    "reponse": 2
  },
  {
    "id": "q1924",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 348 - 31 ?",
    "options": [
      "317",
      "314",
      "315",
      "320"
    ],
    "reponse": 0
  },
  {
    "id": "q1925",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lisbonne est la capitale de quel pays ?",
    "options": [
      "Portugal",
      "Philippines",
      "Mongolie",
      "Danemark"
    ],
    "reponse": 0
  },
  {
    "id": "q1926",
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
    "id": "q1927",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 203 ÷ 7 ?",
    "options": [
      "33",
      "25",
      "29",
      "27"
    ],
    "reponse": 2
  },
  {
    "id": "q1928",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Roumanie ?",
    "options": [
      "Mascate",
      "Ljubljana",
      "Bucarest",
      "Manama"
    ],
    "reponse": 2
  },
  {
    "id": "q1929",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 100 ?",
    "options": [
      "20",
      "17",
      "19",
      "22"
    ],
    "reponse": 0
  },
  {
    "id": "q1930",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Togo ?",
    "options": [
      "Bandar Seri Begawan",
      "Ouagadougou",
      "Pristina",
      "Lomé"
    ],
    "reponse": 3
  },
  {
    "id": "q1931",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Seychelles ?",
    "options": [
      "Suva",
      "Victoria",
      "Tachkent",
      "Dodoma"
    ],
    "reponse": 1
  },
  {
    "id": "q1932",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Nicaragua",
      "Tunisie",
      "Arménie",
      "Liechtenstein"
    ],
    "reponse": 1
  },
  {
    "id": "q1933",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCDLXXXIV en chiffres romains ?",
    "options": [
      "2474",
      "2484",
      "2479",
      "2483"
    ],
    "reponse": 1
  },
  {
    "id": "q1934",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Skopje est la capitale de quel pays ?",
    "options": [
      "Liberia",
      "Estonie",
      "Macédoine du Nord",
      "Danemark"
    ],
    "reponse": 2
  },
  {
    "id": "q1935",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Liberia",
      "Pologne",
      "Monténégro",
      "Royaume-Uni"
    ],
    "reponse": 1
  },
  {
    "id": "q1936",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel fil, donné par la fille du roi de Crète à Thésée, lui a permis de ressortir du labyrinthe après avoir vaincu le Minotaure ?",
    "options": [
      "Le fil de Pénélope",
      "Le fil d'Ariane",
      "Le fil des Parques",
      "La toile d'Arachné"
    ],
    "reponse": 1
  },
  {
    "id": "q1937",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 127 - 41 ?",
    "options": [
      "87",
      "85",
      "88",
      "86"
    ],
    "reponse": 3
  },
  {
    "id": "q1938",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Le Comte de Monte-Cristo » ?",
    "options": [
      "Stendhal",
      "Victor Hugo",
      "Alexandre Dumas",
      "Gustave Flaubert"
    ],
    "reponse": 2
  },
  {
    "id": "q1939",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 896 + 20 ?",
    "options": [
      "913",
      "919",
      "918",
      "916"
    ],
    "reponse": 3
  },
  {
    "id": "q1940",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport les joueurs utilisent-ils un « maillet » ?",
    "options": [
      "Le golf",
      "Le hockey sur gazon",
      "Le polo",
      "Le croquet"
    ],
    "reponse": 2
  },
  {
    "id": "q1941",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1400 en chiffres romains ?",
    "options": [
      "MCDV",
      "MCCCXCVIII",
      "MCCCXCV",
      "MCD"
    ],
    "reponse": 3
  },
  {
    "id": "q1942",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le nom de la molécule qui porte l'information génétique dans les cellules ?",
    "options": [
      "La protéine",
      "Le glucose",
      "L'ARN",
      "L'ADN"
    ],
    "reponse": 3
  },
  {
    "id": "q1943",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Combien de temps un chameau peut-il rester sans boire d'eau, grâce à ses bosses de graisse ?",
    "options": [
      "Une journée",
      "Quelques heures",
      "Plusieurs jours voire semaines",
      "Il boit tous les jours"
    ],
    "reponse": 2
  },
  {
    "id": "q1944",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 402 en chiffres romains ?",
    "options": [
      "CDII",
      "CDI",
      "CCCXCVII",
      "CDXII"
    ],
    "reponse": 0
  },
  {
    "id": "q1945",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1749 et 1848 ?",
    "options": [
      "81",
      "104",
      "98",
      "99"
    ],
    "reponse": 3
  },
  {
    "id": "q1946",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Os » ?",
    "options": [
      "Osmium",
      "Francium",
      "Azote",
      "Platine"
    ],
    "reponse": 0
  },
  {
    "id": "q1947",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 1100 année(s) ?",
    "options": [
      "14",
      "12",
      "11",
      "10"
    ],
    "reponse": 2
  },
  {
    "id": "q1948",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Monténégro ?",
    "options": [
      "🇿🇲",
      "🇱🇻",
      "🇲🇪",
      "🇨🇱"
    ],
    "reponse": 2
  },
  {
    "id": "q1949",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Roméo et Juliette » ?",
    "options": [
      "William Shakespeare",
      "Oscar Wilde",
      "Christopher Marlowe",
      "Ben Jonson"
    ],
    "reponse": 0
  },
  {
    "id": "q1950",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle sitcom américaine met en scène un groupe de scientifiques geeks et leur voisine serveuse ?",
    "options": [
      "Silicon Valley",
      "The Big Bang Theory",
      "Young Sheldon",
      "Community"
    ],
    "reponse": 1
  },
  {
    "id": "q1951",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 255 ÷ 15 ?",
    "options": [
      "20",
      "17",
      "15",
      "19"
    ],
    "reponse": 1
  },
  {
    "id": "q1952",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un extraterrestre resté sur Terre et aidé par des enfants ?",
    "options": [
      "Rencontres du troisième type",
      "Arrival",
      "E.T. l'extra-terrestre",
      "District 9"
    ],
    "reponse": 2
  },
  {
    "id": "q1953",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 15 kg ?",
    "options": [
      "13789",
      "15000",
      "13970",
      "14542"
    ],
    "reponse": 1
  },
  {
    "id": "q1954",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat portugais est une pâtisserie à base de crème et de pâte feuilletée, très populaire à Lisbonne ?",
    "options": [
      "Le pão de ló",
      "Le queijadas",
      "Le bolo de arroz",
      "Le pastel de nata"
    ],
    "reponse": 3
  },
  {
    "id": "q1955",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Royaume-Uni ?",
    "options": [
      "Yaoundé",
      "Conakry",
      "Londres",
      "Buenos Aires"
    ],
    "reponse": 2
  },
  {
    "id": "q1956",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel biologiste autrichien est le père de la génétique moderne grâce à ses travaux sur les petits pois ?",
    "options": [
      "James Watson",
      "Gregor Mendel",
      "Francis Crick",
      "Charles Darwin"
    ],
    "reponse": 1
  },
  {
    "id": "q1957",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 au carré ?",
    "options": [
      "361",
      "324",
      "323",
      "360"
    ],
    "reponse": 1
  },
  {
    "id": "q1958",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « URL » ?",
    "options": [
      "Uniform Resource Locator",
      "United Resource Location",
      "Universal Reference Link",
      "Unique Record Locator"
    ],
    "reponse": 0
  },
  {
    "id": "q1959",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Maputo est la capitale de quel pays ?",
    "options": [
      "Mozambique",
      "Costa Rica",
      "Cap-Vert",
      "Suriname"
    ],
    "reponse": 0
  },
  {
    "id": "q1960",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport de combat porte-t-on un kimono appelé « keikogi » et peut-on frapper avec les pieds et les poings ?",
    "options": [
      "Le sumo",
      "Le judo",
      "Le karaté",
      "L'aïkido"
    ],
    "reponse": 2
  },
  {
    "id": "q1961",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 5 ?",
    "options": [
      "71",
      "75",
      "62",
      "65"
    ],
    "reponse": 3
  },
  {
    "id": "q1962",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rb » ?",
    "options": [
      "Holmium",
      "Rubidium",
      "Polonium",
      "Néon"
    ],
    "reponse": 1
  },
  {
    "id": "q1963",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Nicaragua",
      "Finlande",
      "Chili",
      "Biélorussie"
    ],
    "reponse": 3
  },
  {
    "id": "q1964",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 10 année(s) ?",
    "options": [
      "0",
      "1",
      "4",
      "-2"
    ],
    "reponse": 1
  },
  {
    "id": "q1965",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 × 6 ?",
    "options": [
      "56",
      "69",
      "55",
      "60"
    ],
    "reponse": 3
  },
  {
    "id": "q1966",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Espagne ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q1967",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2775 en chiffres romains ?",
    "options": [
      "MMDCCLXXXV",
      "MMDCCLXXV",
      "MMDCCLXXIV",
      "MMDCCLXV"
    ],
    "reponse": 1
  },
  {
    "id": "q1968",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 807 + 751 ?",
    "options": [
      "1557",
      "1556",
      "1561",
      "1558"
    ],
    "reponse": 3
  },
  {
    "id": "q1969",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇴🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Oman",
      "Arménie",
      "Bosnie-Herzégovine",
      "Irak"
    ],
    "reponse": 0
  },
  {
    "id": "q1970",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le seul mammifère capable de voler activement ?",
    "options": [
      "La chauve-souris",
      "Le phalanger",
      "Le colibri",
      "L'écureuil volant"
    ],
    "reponse": 0
  },
  {
    "id": "q1971",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle créature grecque, mi-femme mi-oiseau, attirait les marins par son chant ?",
    "options": [
      "Les Nymphes",
      "Les Harpies",
      "Les Gorgones",
      "Les Sirènes"
    ],
    "reponse": 3
  },
  {
    "id": "q1972",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Où sont produits les globules rouges dans le corps humain ?",
    "options": [
      "Dans la moelle osseuse",
      "Dans les reins",
      "Dans la rate",
      "Dans le foie"
    ],
    "reponse": 0
  },
  {
    "id": "q1973",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1550 et 1713 ?",
    "options": [
      "158",
      "156",
      "176",
      "163"
    ],
    "reponse": 3
  },
  {
    "id": "q1974",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du réseau social basé sur des messages courts, longtemps limités à 140 puis 280 caractères ?",
    "options": [
      "Tumblr",
      "Twitter",
      "Facebook",
      "Reddit"
    ],
    "reponse": 1
  },
  {
    "id": "q1975",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de la République démocratique du Congo ?",
    "options": [
      "Peso chilien",
      "Franc congolais",
      "Dong",
      "Rouble biélorusse"
    ],
    "reponse": 1
  },
  {
    "id": "q1976",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Brazzaville est la capitale de quel pays ?",
    "options": [
      "Arabie saoudite",
      "Estonie",
      "Congo",
      "Namibie"
    ],
    "reponse": 2
  },
  {
    "id": "q1977",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Malte ?",
    "options": [
      "Dollar zimbabwéen",
      "Manat turkmène",
      "Euro",
      "Dinar tunisien"
    ],
    "reponse": 2
  },
  {
    "id": "q1978",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « I » ?",
    "options": [
      "Iode",
      "Holmium",
      "Praséodyme",
      "Terbium"
    ],
    "reponse": 0
  },
  {
    "id": "q1979",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 474 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "5e siècle",
      "4e siècle",
      "3e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q1980",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1023 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "12e siècle",
      "11e siècle",
      "9e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q1981",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel gaz noble est utilisé dans certaines enseignes lumineuses colorées ?",
    "options": [
      "L'argon",
      "L'hélium",
      "Le néon",
      "Le xénon"
    ],
    "reponse": 2
  },
  {
    "id": "q1982",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Inde",
      "Norvège",
      "Suriname",
      "Soudan"
    ],
    "reponse": 3
  },
  {
    "id": "q1983",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal est capable de porter jusqu'à plusieurs fois son propre poids, symbole de force chez les insectes ?",
    "options": [
      "L'abeille",
      "La sauterelle",
      "La fourmi",
      "Le scarabée"
    ],
    "reponse": 2
  },
  {
    "id": "q1984",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 12 ?",
    "options": [
      "155",
      "156",
      "136",
      "144"
    ],
    "reponse": 1
  },
  {
    "id": "q1985",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve République tchèque ?",
    "options": [
      "Océanie",
      "Asie",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q1986",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle échelle sert à mesurer la magnitude des séismes ?",
    "options": [
      "L'échelle de Kelvin",
      "L'échelle de Richter",
      "L'échelle de Mercalli",
      "L'échelle de Beaufort"
    ],
    "reponse": 1
  },
  {
    "id": "q1987",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « F » ?",
    "options": [
      "Américium",
      "Yttrium",
      "Carbone",
      "Fluor"
    ],
    "reponse": 3
  },
  {
    "id": "q1988",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel processus permet aux plantes de produire leur propre énergie à partir de la lumière ?",
    "options": [
      "La transpiration",
      "La photosynthèse",
      "La fermentation",
      "La respiration"
    ],
    "reponse": 1
  },
  {
    "id": "q1989",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle chaîne de montagnes sépare l'Espagne de la France ?",
    "options": [
      "Le Massif central",
      "Les Pyrénées",
      "Les Apennins",
      "Les Alpes"
    ],
    "reponse": 1
  },
  {
    "id": "q1990",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 106 + 830 ?",
    "options": [
      "935",
      "938",
      "937",
      "936"
    ],
    "reponse": 3
  },
  {
    "id": "q1991",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 1200 année(s) ?",
    "options": [
      "12",
      "14",
      "11",
      "13"
    ],
    "reponse": 0
  },
  {
    "id": "q1992",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle région polaire est un continent, contrairement à l'Arctique qui est un océan gelé ?",
    "options": [
      "La Sibérie",
      "Le Groenland",
      "L'Alaska",
      "L'Antarctique"
    ],
    "reponse": 3
  },
  {
    "id": "q1993",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 200 ÷ 8 ?",
    "options": [
      "23",
      "25",
      "21",
      "24"
    ],
    "reponse": 1
  },
  {
    "id": "q1994",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 417 - 131 ?",
    "options": [
      "286",
      "284",
      "285",
      "287"
    ],
    "reponse": 0
  },
  {
    "id": "q1995",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suriname ?",
    "options": [
      "Océanie",
      "Afrique",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q1996",
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
    "id": "q1997",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 113 + 237 ?",
    "options": [
      "353",
      "348",
      "347",
      "350"
    ],
    "reponse": 3
  },
  {
    "id": "q1998",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel félin est le seul à ne pas pouvoir rentrer complètement ses griffes ?",
    "options": [
      "Le lynx",
      "Le guépard",
      "Le tigre",
      "Le lion"
    ],
    "reponse": 1
  },
  {
    "id": "q1999",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 180 ÷ 12 ?",
    "options": [
      "16",
      "17",
      "15",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q2000",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Cameroun ?",
    "options": [
      "Mogadiscio",
      "Yaoundé",
      "Le Caire",
      "Manama"
    ],
    "reponse": 1
  },
  {
    "id": "q2001",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Nigeria ?",
    "options": [
      "Naira",
      "Livre soudanaise",
      "Franc CFA",
      "Kina"
    ],
    "reponse": 0
  },
  {
    "id": "q2002",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel jeune homme grec est tombé amoureux de son propre reflet dans l'eau, donnant son nom à un trait de caractère ?",
    "options": [
      "Narcisse",
      "Hyacinthe",
      "Ganymède",
      "Adonis"
    ],
    "reponse": 0
  },
  {
    "id": "q2003",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel langage est principalement utilisé pour mettre en forme les pages web (couleurs, mise en page) ?",
    "options": [
      "HTML",
      "CSS",
      "JavaScript",
      "SQL"
    ],
    "reponse": 1
  },
  {
    "id": "q2004",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle chercheuse a reçu deux prix Nobel, en physique et en chimie ?",
    "options": [
      "Marie Curie",
      "Dorothy Hodgkin",
      "Ada Lovelace",
      "Rosalind Franklin"
    ],
    "reponse": 0
  },
  {
    "id": "q2005",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 9000 g ?",
    "options": [
      "12",
      "11",
      "8",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q2006",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCCXIII en chiffres romains ?",
    "options": [
      "818",
      "813",
      "823",
      "814"
    ],
    "reponse": 1
  },
  {
    "id": "q2007",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 636 + 649 ?",
    "options": [
      "1285",
      "1288",
      "1282",
      "1287"
    ],
    "reponse": 0
  },
  {
    "id": "q2008",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène une bande de braqueurs surnommés par des villes espagnoles comme Tokyo et Berlin ?",
    "options": [
      "La Casa de Papel",
      "Élite",
      "Vis a vis",
      "Narcos"
    ],
    "reponse": 0
  },
  {
    "id": "q2009",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Hongrie",
      "El Salvador",
      "Espagne",
      "Gabon"
    ],
    "reponse": 2
  },
  {
    "id": "q2010",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel terme désigne un logiciel dont le code est public, librement accessible et modifiable par tous ?",
    "options": [
      "Un logiciel freemium",
      "Un logiciel open source",
      "Un logiciel propriétaire",
      "Un logiciel shareware"
    ],
    "reponse": 1
  },
  {
    "id": "q2011",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 22 ÷ 2 ?",
    "options": [
      "13",
      "12",
      "11",
      "10"
    ],
    "reponse": 2
  },
  {
    "id": "q2012",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMVII en chiffres romains ?",
    "options": [
      "3007",
      "3005",
      "3012",
      "3009"
    ],
    "reponse": 0
  },
  {
    "id": "q2013",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Turquie ?",
    "options": [
      "🇧🇯",
      "🇹🇷",
      "🇨🇿",
      "🇧🇭"
    ],
    "reponse": 1
  },
  {
    "id": "q2014",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pr » ?",
    "options": [
      "Praséodyme",
      "Gadolinium",
      "Cobalt",
      "Actinium"
    ],
    "reponse": 0
  },
  {
    "id": "q2015",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle créature grecque mi-homme mi-cheval, nommée Chiron, était réputée pour sa sagesse et son savoir médical ?",
    "options": [
      "Un cyclope",
      "Un faune",
      "Un centaure",
      "Un satyre"
    ],
    "reponse": 2
  },
  {
    "id": "q2016",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur autrichien du XIXe siècle est surnommé le « roi de la valse » ?",
    "options": [
      "Johannes Brahms",
      "Franz Schubert",
      "Franz Lehár",
      "Johann Strauss II"
    ],
    "reponse": 3
  },
  {
    "id": "q2017",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Malte",
      "Macédoine du Nord",
      "Niger",
      "Koweït"
    ],
    "reponse": 0
  },
  {
    "id": "q2018",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Estonie ?",
    "options": [
      "Europe",
      "Afrique",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q2019",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Azerbaïdjan ?",
    "options": [
      "Lisbonne",
      "Port Moresby",
      "Dacca",
      "Bakou"
    ],
    "reponse": 3
  },
  {
    "id": "q2020",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Canada ?",
    "options": [
      "🇧🇩",
      "🇬🇳",
      "🇨🇦",
      "🇹🇭"
    ],
    "reponse": 2
  },
  {
    "id": "q2021",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Inde ?",
    "options": [
      "🇻🇪",
      "🇾🇪",
      "🇮🇳",
      "🇵🇰"
    ],
    "reponse": 2
  },
  {
    "id": "q2022",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Nicaragua ?",
    "options": [
      "Managua",
      "Achgabat",
      "Lisbonne",
      "San José"
    ],
    "reponse": 0
  },
  {
    "id": "q2023",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 15 ?",
    "options": [
      "75",
      "86",
      "79",
      "78"
    ],
    "reponse": 0
  },
  {
    "id": "q2024",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Espagne ?",
    "options": [
      "Livre soudanaise",
      "Loti",
      "Euro",
      "Manat azerbaïdjanais"
    ],
    "reponse": 2
  },
  {
    "id": "q2025",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 589 + 472 ?",
    "options": [
      "1064",
      "1060",
      "1058",
      "1061"
    ],
    "reponse": 3
  },
  {
    "id": "q2026",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Syrie ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Nord",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q2027",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 25 ?",
    "options": [
      "12",
      "13",
      "16",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q2028",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle planète du système solaire possède les anneaux les plus visibles ?",
    "options": [
      "Jupiter",
      "Saturne",
      "Uranus",
      "Neptune"
    ],
    "reponse": 1
  },
  {
    "id": "q2029",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 249 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "2e siècle",
      "1e siècle",
      "4e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2030",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 573 - 233 ?",
    "options": [
      "340",
      "339",
      "341",
      "342"
    ],
    "reponse": 0
  },
  {
    "id": "q2031",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle galette plate, souvent utilisée pour garnir des kebabs ou des falafels, est originaire du Moyen-Orient ?",
    "options": [
      "La tortilla",
      "La naan",
      "Le pain pita",
      "La focaccia"
    ],
    "reponse": 2
  },
  {
    "id": "q2032",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de combat met en scène des personnages comme Ryu et Ken ?",
    "options": [
      "Street Fighter",
      "Mortal Kombat",
      "King of Fighters",
      "Tekken"
    ],
    "reponse": 0
  },
  {
    "id": "q2033",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 35 siècle(s) ?",
    "options": [
      "3500",
      "3617",
      "3995",
      "3342"
    ],
    "reponse": 0
  },
  {
    "id": "q2034",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 225 ?",
    "options": [
      "15",
      "14",
      "12",
      "18"
    ],
    "reponse": 0
  },
  {
    "id": "q2035",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 × 5 ?",
    "options": [
      "47",
      "38",
      "44",
      "45"
    ],
    "reponse": 3
  },
  {
    "id": "q2036",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 6 ?",
    "options": [
      "81",
      "98",
      "87",
      "90"
    ],
    "reponse": 3
  },
  {
    "id": "q2037",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 13 ?",
    "options": [
      "66",
      "67",
      "65",
      "59"
    ],
    "reponse": 2
  },
  {
    "id": "q2038",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Japon ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Afrique",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2039",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 664 en chiffres romains ?",
    "options": [
      "DCLXIV",
      "DCLXIII",
      "DCLXVI",
      "DCLXII"
    ],
    "reponse": 0
  },
  {
    "id": "q2040",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Londres est la capitale de quel pays ?",
    "options": [
      "Indonésie",
      "Tadjikistan",
      "Royaume-Uni",
      "Comores"
    ],
    "reponse": 2
  },
  {
    "id": "q2041",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Riga est la capitale de quel pays ?",
    "options": [
      "Lettonie",
      "Belize",
      "États-Unis",
      "Chypre"
    ],
    "reponse": 0
  },
  {
    "id": "q2042",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Yamoussoukro est la capitale de quel pays ?",
    "options": [
      "Gabon",
      "Côte d'Ivoire",
      "Qatar",
      "Samoa"
    ],
    "reponse": 1
  },
  {
    "id": "q2043",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport le terrain s'appelle-t-il un « ring » ?",
    "options": [
      "La boxe",
      "Le catch",
      "L'escrime",
      "Le judo"
    ],
    "reponse": 0
  },
  {
    "id": "q2044",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 120 ?",
    "options": [
      "27",
      "23",
      "24",
      "21"
    ],
    "reponse": 2
  },
  {
    "id": "q2045",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Sélénium ?",
    "options": [
      "Dy",
      "Se",
      "Co",
      "Np"
    ],
    "reponse": 1
  },
  {
    "id": "q2046",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 300 ?",
    "options": [
      "39",
      "47",
      "46",
      "45"
    ],
    "reponse": 3
  },
  {
    "id": "q2047",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 500 ?",
    "options": [
      "25",
      "22",
      "30",
      "21"
    ],
    "reponse": 0
  },
  {
    "id": "q2048",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 793 - 353 ?",
    "options": [
      "439",
      "441",
      "440",
      "438"
    ],
    "reponse": 2
  },
  {
    "id": "q2049",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 100 ?",
    "options": [
      "11",
      "9",
      "12",
      "10"
    ],
    "reponse": 3
  },
  {
    "id": "q2050",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film met en scène un vaisseau spatial où un ordinateur nommé HAL 9000 se rebelle ?",
    "options": [
      "2001, l'Odyssée de l'espace",
      "Alien",
      "Gravity",
      "Interstellar"
    ],
    "reponse": 0
  },
  {
    "id": "q2051",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Protactinium ?",
    "options": [
      "Tl",
      "Ru",
      "Pa",
      "In"
    ],
    "reponse": 2
  },
  {
    "id": "q2052",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Malaisie ?",
    "options": [
      "Metical",
      "Somoni",
      "Dollar américain",
      "Ringgit"
    ],
    "reponse": 3
  },
  {
    "id": "q2053",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 105 ÷ 5 ?",
    "options": [
      "21",
      "25",
      "24",
      "19"
    ],
    "reponse": 0
  },
  {
    "id": "q2054",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Guatemala",
      "Mongolie",
      "Venezuela",
      "Suède"
    ],
    "reponse": 1
  },
  {
    "id": "q2055",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Corée du Sud ?",
    "options": [
      "🇰🇷",
      "🇧🇾",
      "🇧🇹",
      "🇮🇩"
    ],
    "reponse": 0
  },
  {
    "id": "q2056",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Somalie ?",
    "options": [
      "Dinar irakien",
      "Leu roumain",
      "Mark convertible",
      "Shilling somalien"
    ],
    "reponse": 3
  },
  {
    "id": "q2057",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 48 ÷ 2 ?",
    "options": [
      "28",
      "21",
      "19",
      "24"
    ],
    "reponse": 3
  },
  {
    "id": "q2058",
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
    "id": "q2059",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Zimbabwe",
      "Slovénie",
      "Koweït",
      "Japon"
    ],
    "reponse": 1
  },
  {
    "id": "q2060",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 1000 ml ?",
    "options": [
      "-2",
      "0",
      "-1",
      "1"
    ],
    "reponse": 3
  },
  {
    "id": "q2061",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 798 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "9e siècle",
      "7e siècle",
      "8e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2062",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 8 ?",
    "options": [
      "61",
      "63",
      "73",
      "64"
    ],
    "reponse": 3
  },
  {
    "id": "q2063",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Slovaquie ?",
    "options": [
      "🇹🇯",
      "🇺🇦",
      "🇸🇰",
      "🇱🇷"
    ],
    "reponse": 2
  },
  {
    "id": "q2064",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel concours musical annuel réunit des artistes représentant différents pays européens depuis 1956 ?",
    "options": [
      "Coachella",
      "Le Festival de Sanremo",
      "L'Eurovision",
      "Les Victoires de la musique"
    ],
    "reponse": 2
  },
  {
    "id": "q2065",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de min dans 2040 s ?",
    "options": [
      "30",
      "32",
      "35",
      "34"
    ],
    "reponse": 3
  },
  {
    "id": "q2066",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Guinée-Bissau ?",
    "options": [
      "🇬🇼",
      "🇻🇪",
      "🇦🇺",
      "🇹🇷"
    ],
    "reponse": 0
  },
  {
    "id": "q2067",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 10 ?",
    "options": [
      "7",
      "5",
      "6",
      "9"
    ],
    "reponse": 2
  },
  {
    "id": "q2068",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 23000 mg ?",
    "options": [
      "24",
      "19",
      "23",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q2069",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « 1984 » et « La Ferme des animaux » ?",
    "options": [
      "Ray Bradbury",
      "Aldous Huxley",
      "George Orwell",
      "H.G. Wells"
    ],
    "reponse": 2
  },
  {
    "id": "q2070",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Laos ?",
    "options": [
      "🇱🇦",
      "🇸🇨",
      "🇱🇸",
      "🇳🇱"
    ],
    "reponse": 0
  },
  {
    "id": "q2071",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel recueil de poèmes de Victor Hugo évoque notamment le deuil de sa fille Léopoldine ?",
    "options": [
      "Les Contemplations",
      "Odes et Ballades",
      "La Légende des siècles",
      "Les Châtiments"
    ],
    "reponse": 0
  },
  {
    "id": "q2072",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est l'état de la matière dans lequel les molécules sont les plus proches les unes des autres ?",
    "options": [
      "Liquide",
      "Plasma",
      "Gazeux",
      "Solide"
    ],
    "reponse": 3
  },
  {
    "id": "q2073",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 683 + 26 ?",
    "options": [
      "708",
      "709",
      "707",
      "711"
    ],
    "reponse": 1
  },
  {
    "id": "q2074",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel modèle d'architecture réseau répartit les tâches entre des machines qui demandent des services et d'autres qui les fournissent ?",
    "options": [
      "Le modèle client-serveur",
      "Le modèle peer-to-peer",
      "Le modèle cloud",
      "Le modèle mainframe"
    ],
    "reponse": 0
  },
  {
    "id": "q2075",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quelle était la principale fonction défensive de la Grande Muraille de Chine ?",
    "options": [
      "Servir de système d'irrigation",
      "Marquer une frontière religieuse",
      "Faciliter le commerce avec l'Europe",
      "Protéger le pays des invasions venues du nord"
    ],
    "reponse": 3
  },
  {
    "id": "q2076",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Podgorica est la capitale de quel pays ?",
    "options": [
      "France",
      "Tadjikistan",
      "Suriname",
      "Monténégro"
    ],
    "reponse": 3
  },
  {
    "id": "q2077",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1996 appartient à quel siècle ?",
    "options": [
      "20e siècle",
      "18e siècle",
      "21e siècle",
      "19e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2078",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Colombie ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q2079",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 32 min ?",
    "options": [
      "2022",
      "1941",
      "2237",
      "1920"
    ],
    "reponse": 3
  },
  {
    "id": "q2080",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poème épique latin raconte la fuite d'un héros troyen après la chute de sa cité, jusqu'à la fondation de Rome ?",
    "options": [
      "L'Énéide",
      "L'Odyssée",
      "La Pharsale",
      "L'Iliade"
    ],
    "reponse": 0
  },
  {
    "id": "q2081",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1515 en chiffres romains ?",
    "options": [
      "MDXVI",
      "MDXVII",
      "MDXIV",
      "MDXV"
    ],
    "reponse": 3
  },
  {
    "id": "q2082",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel trompettiste américain, figure majeure du jazz moderne, est l'auteur de l'album « Kind of Blue » ?",
    "options": [
      "Chet Baker",
      "Louis Armstrong",
      "Miles Davis",
      "Dizzy Gillespie"
    ],
    "reponse": 2
  },
  {
    "id": "q2083",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel test, souvent constitué d'images ou de textes déformés, sert à distinguer un humain d'un robot sur un site web ?",
    "options": [
      "Le CAPTCHA",
      "Le cookie",
      "Le CVV",
      "Le token"
    ],
    "reponse": 0
  },
  {
    "id": "q2084",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Samarium ?",
    "options": [
      "S",
      "Eu",
      "Sm",
      "Na"
    ],
    "reponse": 2
  },
  {
    "id": "q2085",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel roman américain de 1960 aborde le racisme dans le sud des États-Unis à travers les yeux d'une fillette ?",
    "options": [
      "La Couleur pourpre",
      "Autant en emporte le vent",
      "Ne tirez pas sur l'oiseau moqueur",
      "Beloved"
    ],
    "reponse": 2
  },
  {
    "id": "q2086",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 308 en chiffres romains ?",
    "options": [
      "CCCIII",
      "CCCVIII",
      "CCCVII",
      "CCCXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q2087",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 331 - 151 ?",
    "options": [
      "182",
      "183",
      "177",
      "180"
    ],
    "reponse": 3
  },
  {
    "id": "q2088",
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
    "id": "q2089",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 44 ÷ 4 ?",
    "options": [
      "8",
      "11",
      "14",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q2090",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 692 + 316 ?",
    "options": [
      "1005",
      "1011",
      "1010",
      "1008"
    ],
    "reponse": 3
  },
  {
    "id": "q2091",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène une famille royale britannique à travers les décennies ?",
    "options": [
      "Downton Abbey",
      "The Crown",
      "Victoria",
      "Bridgerton"
    ],
    "reponse": 1
  },
  {
    "id": "q2092",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Comment appelle-t-on les redoutables divinités grecques de la vengeance, filles de la Nuit ?",
    "options": [
      "Les Érinyes",
      "Les Moires",
      "Les Harpies",
      "Les Charites"
    ],
    "reponse": 0
  },
  {
    "id": "q2093",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu grec du soleil conduit un char à travers le ciel chaque jour ?",
    "options": [
      "Hermès",
      "Hypérion",
      "Hélios",
      "Apollon"
    ],
    "reponse": 2
  },
  {
    "id": "q2094",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 49 ?",
    "options": [
      "10",
      "7",
      "6",
      "5"
    ],
    "reponse": 1
  },
  {
    "id": "q2095",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel roi des dieux nordiques a sacrifié un œil pour obtenir la sagesse ?",
    "options": [
      "Thor",
      "Odin",
      "Freyr",
      "Tyr"
    ],
    "reponse": 1
  },
  {
    "id": "q2096",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de kg dans 29000 g ?",
    "options": [
      "33",
      "24",
      "29",
      "25"
    ],
    "reponse": 2
  },
  {
    "id": "q2097",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat japonais consiste en du riz vinaigré accompagné de poisson cru ?",
    "options": [
      "Les ramens",
      "Les yakitoris",
      "Les tempuras",
      "Les sushis"
    ],
    "reponse": 3
  },
  {
    "id": "q2098",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 300 ?",
    "options": [
      "77",
      "90",
      "91",
      "78"
    ],
    "reponse": 1
  },
  {
    "id": "q2099",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 88 ÷ 8 ?",
    "options": [
      "13",
      "9",
      "11",
      "10"
    ],
    "reponse": 2
  },
  {
    "id": "q2100",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel esclave romain a mené une révolte de gladiateurs contre la République en 73 avant J.-C. ?",
    "options": [
      "Spartacus",
      "Vercingétorix",
      "Hannibal",
      "Brennus"
    ],
    "reponse": 0
  },
  {
    "id": "q2101",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de g dans 24000 mg ?",
    "options": [
      "28",
      "24",
      "26",
      "27"
    ],
    "reponse": 1
  },
  {
    "id": "q2102",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur américain est surnommé « le King » du rock 'n' roll ?",
    "options": [
      "Little Richard",
      "Jerry Lee Lewis",
      "Elvis Presley",
      "Chuck Berry"
    ],
    "reponse": 2
  },
  {
    "id": "q2103",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Fe » ?",
    "options": [
      "Sélénium",
      "Osmium",
      "Zirconium",
      "Fer"
    ],
    "reponse": 3
  },
  {
    "id": "q2104",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète français est l'auteur d'« Illuminations » et « Une saison en enfer » ?",
    "options": [
      "Charles Baudelaire",
      "Paul Verlaine",
      "Arthur Rimbaud",
      "Stéphane Mallarmé"
    ],
    "reponse": 2
  },
  {
    "id": "q2105",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 171 ÷ 9 ?",
    "options": [
      "15",
      "19",
      "22",
      "23"
    ],
    "reponse": 1
  },
  {
    "id": "q2106",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Haïti ?",
    "options": [
      "Brazzaville",
      "Bandar Seri Begawan",
      "San José",
      "Port-au-Prince"
    ],
    "reponse": 3
  },
  {
    "id": "q2107",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Danemark ?",
    "options": [
      "🇩🇰",
      "🇲🇩",
      "🇯🇴",
      "🇪🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q2108",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 12 l ?",
    "options": [
      "12000",
      "12868",
      "11895",
      "10589"
    ],
    "reponse": 0
  },
  {
    "id": "q2109",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Turkménistan ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Asie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q2110",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ghana ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q2111",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCMVIII en chiffres romains ?",
    "options": [
      "3918",
      "3909",
      "3908",
      "3910"
    ],
    "reponse": 2
  },
  {
    "id": "q2112",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Sierra Leone ?",
    "options": [
      "Europe",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q2113",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo social met en scène un équipage devant démasquer un ou plusieurs imposteurs parmi eux ?",
    "options": [
      "Fall Guys",
      "Loup-Garou en ligne",
      "Town of Salem",
      "Among Us"
    ],
    "reponse": 3
  },
  {
    "id": "q2114",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Syrie",
      "Australie",
      "Chypre",
      "Luxembourg"
    ],
    "reponse": 3
  },
  {
    "id": "q2115",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Mongolie ?",
    "options": [
      "🇸🇷",
      "🇵🇬",
      "🇲🇳",
      "🇮🇪"
    ],
    "reponse": 2
  },
  {
    "id": "q2116",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel loup gigantesque, enfant de Loki, est destiné à dévorer Odin lors du Ragnarök ?",
    "options": [
      "Garm",
      "Sköll",
      "Hati",
      "Fenrir"
    ],
    "reponse": 3
  },
  {
    "id": "q2117",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 ÷ 5 ?",
    "options": [
      "5",
      "4",
      "2",
      "-1"
    ],
    "reponse": 2
  },
  {
    "id": "q2118",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle capitale asiatique est construite sur plusieurs deltas et canaux, surnommée la « Venise de l'Orient » ?",
    "options": [
      "Manille",
      "Jakarta",
      "Hanoï",
      "Bangkok"
    ],
    "reponse": 3
  },
  {
    "id": "q2119",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 289 ?",
    "options": [
      "19",
      "17",
      "20",
      "21"
    ],
    "reponse": 1
  },
  {
    "id": "q2120",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2831 en chiffres romains ?",
    "options": [
      "MMDCCCXXXII",
      "MMDCCCXXVI",
      "MMDCCCXXIX",
      "MMDCCCXXXI"
    ],
    "reponse": 3
  },
  {
    "id": "q2121",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Roumanie ?",
    "options": [
      "Leu roumain",
      "Yuan",
      "Forint",
      "Riyal saoudien"
    ],
    "reponse": 0
  },
  {
    "id": "q2122",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur français est connu pour « Formidable » et « Papaoutai » ?",
    "options": [
      "Orelsan",
      "Maître Gims",
      "Grand Corps Malade",
      "Stromae"
    ],
    "reponse": 3
  },
  {
    "id": "q2123",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMLXXXIX en chiffres romains ?",
    "options": [
      "2089",
      "2090",
      "2079",
      "2084"
    ],
    "reponse": 0
  },
  {
    "id": "q2124",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 530 + 194 ?",
    "options": [
      "725",
      "724",
      "723",
      "721"
    ],
    "reponse": 1
  },
  {
    "id": "q2125",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de t dans 34000 kg ?",
    "options": [
      "39",
      "34",
      "41",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q2126",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guinée ?",
    "options": [
      "Europe",
      "Afrique",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q2127",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1363 et 1368 ?",
    "options": [
      "5",
      "2",
      "4",
      "3"
    ],
    "reponse": 0
  },
  {
    "id": "q2128",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Argentine ?",
    "options": [
      "🇰🇼",
      "🇮🇶",
      "🇦🇷",
      "🇱🇧"
    ],
    "reponse": 2
  },
  {
    "id": "q2129",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 60 ÷ 2 ?",
    "options": [
      "34",
      "26",
      "30",
      "35"
    ],
    "reponse": 2
  },
  {
    "id": "q2130",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Plutonium ?",
    "options": [
      "N",
      "Pb",
      "Pu",
      "Pa"
    ],
    "reponse": 2
  },
  {
    "id": "q2131",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel rappeur français a fondé le groupe NTM avec Kool Shen ?",
    "options": [
      "Booba",
      "MC Solaar",
      "Rohff",
      "JoeyStarr"
    ],
    "reponse": 3
  },
  {
    "id": "q2132",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Germinal » et fait partie du mouvement naturaliste ?",
    "options": [
      "Alphonse Daudet",
      "Émile Zola",
      "Gustave Flaubert",
      "Guy de Maupassant"
    ],
    "reponse": 1
  },
  {
    "id": "q2133",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Kenya ?",
    "options": [
      "Shilling kényan",
      "Dinar koweïtien",
      "Livre turque",
      "Peso colombien"
    ],
    "reponse": 0
  },
  {
    "id": "q2134",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Italie ?",
    "options": [
      "Kinshasa",
      "Bogota",
      "Rome",
      "Nairobi"
    ],
    "reponse": 2
  },
  {
    "id": "q2135",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le pays le plus peuplé d'Afrique ?",
    "options": [
      "L'Égypte",
      "L'Éthiopie",
      "Le Nigeria",
      "La République démocratique du Congo"
    ],
    "reponse": 2
  },
  {
    "id": "q2136",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la formule chimique de l'eau ?",
    "options": [
      "O2",
      "H2O",
      "CO2",
      "H2O2"
    ],
    "reponse": 1
  },
  {
    "id": "q2137",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de temps dure un quart-temps au basket-ball (règles FIBA) ?",
    "options": [
      "12 minutes",
      "10 minutes",
      "8 minutes",
      "15 minutes"
    ],
    "reponse": 1
  },
  {
    "id": "q2138",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a tenu un journal intime devenu célèbre en se cachant avec sa famille à Amsterdam pendant l'Occupation, avant de mourir dans un camp ?",
    "options": [
      "Viktor Frankl",
      "Elie Wiesel",
      "Primo Levi",
      "Anne Frank"
    ],
    "reponse": 3
  },
  {
    "id": "q2139",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3729 en chiffres romains ?",
    "options": [
      "MMMDCCXXVII",
      "MMMDCCXXIX",
      "MMMDCCXIX",
      "MMMDCCXXXI"
    ],
    "reponse": 1
  },
  {
    "id": "q2140",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 335 - 47 ?",
    "options": [
      "288",
      "290",
      "291",
      "289"
    ],
    "reponse": 0
  },
  {
    "id": "q2141",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Azerbaïdjan",
      "Corée du Sud",
      "Rwanda",
      "Maurice"
    ],
    "reponse": 0
  },
  {
    "id": "q2142",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle proportion approximative de la surface terrestre est recouverte d'eau ?",
    "options": [
      "Environ 90 %",
      "Environ 70 %",
      "Environ 40 %",
      "Environ 55 %"
    ],
    "reponse": 1
  },
  {
    "id": "q2143",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel hérisson bleu très rapide est la mascotte de Sega ?",
    "options": [
      "Rayman",
      "Crash Bandicoot",
      "Sonic",
      "Mario"
    ],
    "reponse": 2
  },
  {
    "id": "q2144",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Téhéran est la capitale de quel pays ?",
    "options": [
      "Émirats arabes unis",
      "Corée du Nord",
      "Kenya",
      "Iran"
    ],
    "reponse": 3
  },
  {
    "id": "q2145",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 370 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "5e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2146",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Tunisie ?",
    "options": [
      "Dinar tunisien",
      "Dinar libyen",
      "Roupie seychelloise",
      "Forint"
    ],
    "reponse": 0
  },
  {
    "id": "q2147",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de survie et de crafting se déroule sur une île après un crash d'avion, développé par Endnight Games ?",
    "options": [
      "The Forest",
      "Raft",
      "Subnautica",
      "Green Hell"
    ],
    "reponse": 0
  },
  {
    "id": "q2148",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel est le surnom par lequel on désigne Édith Piaf, en référence à sa petite taille et sa voix puissante ?",
    "options": [
      "L'Alouette de France",
      "La Môme",
      "La Voix d'or",
      "La Diva de Paris"
    ],
    "reponse": 1
  },
  {
    "id": "q2149",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Fidji ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q2150",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Brunei ?",
    "options": [
      "Afrique",
      "Europe",
      "Asie",
      "Amérique du Nord"
    ],
    "reponse": 2
  },
  {
    "id": "q2151",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle fête mexicaine, célébrée début novembre, honore les défunts avec des autels colorés et des crânes en sucre ?",
    "options": [
      "Le jour des Morts",
      "Le Cinco de Mayo",
      "Le Carnaval de Veracruz",
      "La Toussaint"
    ],
    "reponse": 0
  },
  {
    "id": "q2152",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Malawi ?",
    "options": [
      "Océanie",
      "Afrique",
      "Amérique du Nord",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q2153",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 679 - 141 ?",
    "options": [
      "538",
      "540",
      "536",
      "539"
    ],
    "reponse": 0
  },
  {
    "id": "q2154",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel auteur français a écrit « Les Liaisons dangereuses » ?",
    "options": [
      "l'abbé Prévost",
      "Choderlos de Laclos",
      "Pierre de Marivaux",
      "Denis Diderot"
    ],
    "reponse": 1
  },
  {
    "id": "q2155",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1909 en chiffres romains ?",
    "options": [
      "MCMX",
      "MCMIX",
      "MCMIV",
      "MCMXI"
    ],
    "reponse": 1
  },
  {
    "id": "q2156",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CMLIII en chiffres romains ?",
    "options": [
      "943",
      "953",
      "951",
      "955"
    ],
    "reponse": 1
  },
  {
    "id": "q2157",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Tanzanie ?",
    "options": [
      "🇨🇾",
      "🇸🇩",
      "🇪🇹",
      "🇹🇿"
    ],
    "reponse": 3
  },
  {
    "id": "q2158",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rh » ?",
    "options": [
      "Zirconium",
      "Sélénium",
      "Rhodium",
      "Calcium"
    ],
    "reponse": 2
  },
  {
    "id": "q2159",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 30 siècle(s) ?",
    "options": [
      "3478",
      "3020",
      "3000",
      "3425"
    ],
    "reponse": 2
  },
  {
    "id": "q2160",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Samoa ?",
    "options": [
      "🇸🇦",
      "🇺🇾",
      "🇼🇸",
      "🇸🇬"
    ],
    "reponse": 2
  },
  {
    "id": "q2161",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2660 en chiffres romains ?",
    "options": [
      "MMDCLXII",
      "MMDCLIX",
      "MMDCLX",
      "MMDCL"
    ],
    "reponse": 2
  },
  {
    "id": "q2162",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel sport olympique se pratique sur un praticable et inclut le saut de cheval ?",
    "options": [
      "L'acrosport",
      "La gymnastique",
      "Le trampoline",
      "Le patinage"
    ],
    "reponse": 1
  },
  {
    "id": "q2163",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 8 × 15 ?",
    "options": [
      "119",
      "120",
      "104",
      "125"
    ],
    "reponse": 1
  },
  {
    "id": "q2164",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Lesotho ?",
    "options": [
      "Loti",
      "Euro",
      "Somoni",
      "Sol péruvien"
    ],
    "reponse": 0
  },
  {
    "id": "q2165",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Fables », dont « Le Corbeau et le Renard » ?",
    "options": [
      "Charles Perrault",
      "Voltaire",
      "Jean de La Fontaine",
      "Molière"
    ],
    "reponse": 2
  },
  {
    "id": "q2166",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Népal ?",
    "options": [
      "Bakou",
      "Katmandou",
      "Khartoum",
      "Bratislava"
    ],
    "reponse": 1
  },
  {
    "id": "q2167",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Praséodyme ?",
    "options": [
      "Zn",
      "Ti",
      "Mg",
      "Pr"
    ],
    "reponse": 3
  },
  {
    "id": "q2168",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Eswatini ?",
    "options": [
      "Lilangeni",
      "Manat turkmène",
      "Birr",
      "Dollar canadien"
    ],
    "reponse": 0
  },
  {
    "id": "q2169",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle horloge monumentale, logée dans une tour du palais de Westminster à Londres, est mondialement connue sous un surnom ?",
    "options": [
      "L'horloge de Greenwich",
      "L'horloge astronomique de Berne",
      "Big Ben",
      "La tour de l'horloge de Prague"
    ],
    "reponse": 2
  },
  {
    "id": "q2170",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel est le nom de code de la société mère de Google depuis 2015 ?",
    "options": [
      "ByteDance",
      "Berkshire",
      "Meta",
      "Alphabet"
    ],
    "reponse": 3
  },
  {
    "id": "q2171",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vilnius est la capitale de quel pays ?",
    "options": [
      "Zambie",
      "Serbie",
      "Zimbabwe",
      "Lituanie"
    ],
    "reponse": 3
  },
  {
    "id": "q2172",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Arménie ?",
    "options": [
      "Dram",
      "Shilling tanzanien",
      "Vatu",
      "Lari"
    ],
    "reponse": 0
  },
  {
    "id": "q2173",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Venezuela ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Europe",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q2174",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 720 heure(s) ?",
    "options": [
      "34",
      "30",
      "23",
      "29"
    ],
    "reponse": 1
  },
  {
    "id": "q2175",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quelle créature grecque changeait quiconque la regardait en pierre ?",
    "options": [
      "Le Sphinx",
      "La Méduse",
      "Les Sirènes",
      "La Chimère"
    ],
    "reponse": 1
  },
  {
    "id": "q2176",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle entreprise a développé le système d'exploitation macOS pour ses ordinateurs ?",
    "options": [
      "Apple",
      "Google",
      "IBM",
      "Microsoft"
    ],
    "reponse": 0
  },
  {
    "id": "q2177",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCLXVIII en chiffres romains ?",
    "options": [
      "668",
      "670",
      "667",
      "669"
    ],
    "reponse": 0
  },
  {
    "id": "q2178",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 × 13 ?",
    "options": [
      "131",
      "119",
      "143",
      "130"
    ],
    "reponse": 3
  },
  {
    "id": "q2179",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Reykjavik est la capitale de quel pays ?",
    "options": [
      "Slovénie",
      "Pologne",
      "Vietnam",
      "Islande"
    ],
    "reponse": 3
  },
  {
    "id": "q2180",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe britannique a sorti l'album « Abbey Road » ?",
    "options": [
      "The Rolling Stones",
      "The Beatles",
      "The Who",
      "Pink Floyd"
    ],
    "reponse": 1
  },
  {
    "id": "q2181",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète latin est l'auteur d'un vaste recueil de mythes racontant des transformations, intitulé « Métamorphoses » ?",
    "options": [
      "Virgile",
      "Sénèque",
      "Ovide",
      "Horace"
    ],
    "reponse": 2
  },
  {
    "id": "q2182",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1550 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "14e siècle",
      "17e siècle",
      "16e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2183",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel océan borde à la fois l'Afrique, l'Asie et l'Australie ?",
    "options": [
      "L'océan Pacifique",
      "L'océan Indien",
      "L'océan Atlantique",
      "L'océan Austral"
    ],
    "reponse": 1
  },
  {
    "id": "q2184",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Érythrée ?",
    "options": [
      "🇰🇵",
      "🇪🇷",
      "🇨🇬",
      "🇭🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q2185",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Zimbabwe ?",
    "options": [
      "Nouakchott",
      "Harare",
      "Sarajevo",
      "Kingston"
    ],
    "reponse": 1
  },
  {
    "id": "q2186",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays d'Amérique du Sud, très étroit, s'étend sur plus de 4000 km du nord au sud le long du Pacifique ?",
    "options": [
      "L'Argentine",
      "La Colombie",
      "Le Chili",
      "Le Pérou"
    ],
    "reponse": 2
  },
  {
    "id": "q2187",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 9 l ?",
    "options": [
      "7629",
      "9591",
      "7834",
      "9000"
    ],
    "reponse": 3
  },
  {
    "id": "q2188",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport peut-on gagner par « K.O. » ?",
    "options": [
      "La boxe",
      "Le karaté",
      "La lutte",
      "Le judo"
    ],
    "reponse": 0
  },
  {
    "id": "q2189",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel sculpteur italien de la Renaissance a réalisé le « David » exposé à Florence ?",
    "options": [
      "Michel-Ange",
      "Léonard de Vinci",
      "Bernini",
      "Donatello"
    ],
    "reponse": 0
  },
  {
    "id": "q2190",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 80 ?",
    "options": [
      "48",
      "40",
      "44",
      "46"
    ],
    "reponse": 0
  },
  {
    "id": "q2191",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu inca du Soleil était considéré comme l'ancêtre divin des empereurs incas ?",
    "options": [
      "Inti",
      "Illapa",
      "Pachamama",
      "Viracocha"
    ],
    "reponse": 0
  },
  {
    "id": "q2192",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nouvelle-Zélande ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Océanie",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q2193",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 34 kg ?",
    "options": [
      "28952",
      "34000",
      "35163",
      "32966"
    ],
    "reponse": 1
  },
  {
    "id": "q2194",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tbilissi est la capitale de quel pays ?",
    "options": [
      "Pakistan",
      "Eswatini",
      "Guyana",
      "Géorgie"
    ],
    "reponse": 3
  },
  {
    "id": "q2195",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Guatemala ?",
    "options": [
      "Sum ouzbek",
      "Escudo cap-verdien",
      "Roupie indienne",
      "Quetzal"
    ],
    "reponse": 3
  },
  {
    "id": "q2196",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel physicien a découvert la loi de la gravitation universelle ?",
    "options": [
      "Albert Einstein",
      "Isaac Newton",
      "Johannes Kepler",
      "Galilée"
    ],
    "reponse": 1
  },
  {
    "id": "q2197",
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
    "id": "q2198",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 % de 25 ?",
    "options": [
      "6",
      "3",
      "4",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q2199",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 117 ÷ 9 ?",
    "options": [
      "10",
      "15",
      "13",
      "16"
    ],
    "reponse": 2
  },
  {
    "id": "q2200",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle dynastie franque, dont Clovis fut le plus célèbre représentant, a régné avant les Carolingiens ?",
    "options": [
      "Les Carolingiens",
      "Les Capétiens",
      "Les Valois",
      "Les Mérovingiens"
    ],
    "reponse": 3
  },
  {
    "id": "q2201",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lomé est la capitale de quel pays ?",
    "options": [
      "Togo",
      "Liechtenstein",
      "Zambie",
      "Costa Rica"
    ],
    "reponse": 0
  },
  {
    "id": "q2202",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 800 ?",
    "options": [
      "416",
      "394",
      "387",
      "400"
    ],
    "reponse": 3
  },
  {
    "id": "q2203",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1630 et 1923 ?",
    "options": [
      "284",
      "293",
      "327",
      "338"
    ],
    "reponse": 1
  },
  {
    "id": "q2204",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bénin ?",
    "options": [
      "Europe",
      "Afrique",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q2205",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle console de jeu hybride, sortie en 2017, se joue aussi bien sur téléviseur qu'en mode portable grâce à des manettes détachables ?",
    "options": [
      "La 3DS",
      "La Wii U",
      "La Nintendo Switch",
      "La PS Vita"
    ],
    "reponse": 2
  },
  {
    "id": "q2206",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 121 ?",
    "options": [
      "13",
      "10",
      "11",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q2207",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Pays-Bas ?",
    "options": [
      "Kip",
      "Peso argentin",
      "Euro",
      "Rouble biélorusse"
    ],
    "reponse": 2
  },
  {
    "id": "q2208",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Irlande ?",
    "options": [
      "🇦🇷",
      "🇵🇾",
      "🇮🇪",
      "🇰🇬"
    ],
    "reponse": 2
  },
  {
    "id": "q2209",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 400 ?",
    "options": [
      "225",
      "173",
      "200",
      "190"
    ],
    "reponse": 2
  },
  {
    "id": "q2210",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kinshasa est la capitale de quel pays ?",
    "options": [
      "Liechtenstein",
      "Maurice",
      "République démocratique du Congo",
      "Maldives"
    ],
    "reponse": 2
  },
  {
    "id": "q2211",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 974 - 125 ?",
    "options": [
      "849",
      "851",
      "852",
      "848"
    ],
    "reponse": 0
  },
  {
    "id": "q2212",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel courant artistique du début du XXe siècle, mené par Picasso et Braque, décompose les formes en volumes géométriques ?",
    "options": [
      "Le futurisme",
      "L'expressionnisme",
      "Le cubisme",
      "Le fauvisme"
    ],
    "reponse": 2
  },
  {
    "id": "q2213",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇫🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Royaume-Uni",
      "Djibouti",
      "Finlande",
      "Croatie"
    ],
    "reponse": 2
  },
  {
    "id": "q2214",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port Moresby est la capitale de quel pays ?",
    "options": [
      "Papouasie-Nouvelle-Guinée",
      "Irlande",
      "Congo",
      "Bosnie-Herzégovine"
    ],
    "reponse": 0
  },
  {
    "id": "q2215",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 681 + 285 ?",
    "options": [
      "968",
      "963",
      "966",
      "967"
    ],
    "reponse": 2
  },
  {
    "id": "q2216",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 287 + 149 ?",
    "options": [
      "439",
      "437",
      "436",
      "434"
    ],
    "reponse": 2
  },
  {
    "id": "q2217",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur français a joué dans « Intouchables » aux côtés d'Omar Sy ?",
    "options": [
      "Gérard Depardieu",
      "François Cluzet",
      "Jean Dujardin",
      "Vincent Cassel"
    ],
    "reponse": 1
  },
  {
    "id": "q2218",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 27 min ?",
    "options": [
      "1850",
      "1877",
      "1620",
      "1817"
    ],
    "reponse": 2
  },
  {
    "id": "q2219",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bénin ?",
    "options": [
      "Port-d'Espagne",
      "Kuala Lumpur",
      "Maputo",
      "Porto-Novo"
    ],
    "reponse": 3
  },
  {
    "id": "q2220",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Haïti ?",
    "options": [
      "🇧🇪",
      "🇮🇳",
      "🇭🇹",
      "🇵🇭"
    ],
    "reponse": 2
  },
  {
    "id": "q2221",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 615 + 961 ?",
    "options": [
      "1573",
      "1576",
      "1578",
      "1579"
    ],
    "reponse": 1
  },
  {
    "id": "q2222",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle spécialité chinoise consiste en une volaille rôtie à la peau croustillante et caramélisée, traditionnellement servie en fines lamelles avec des crêpes ?",
    "options": [
      "Le riz cantonais",
      "Le canard laqué de Pékin",
      "Les raviolis vapeur",
      "Le porc aigre-doux"
    ],
    "reponse": 1
  },
  {
    "id": "q2223",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Singapour",
      "Namibie",
      "Italie",
      "Pérou"
    ],
    "reponse": 2
  },
  {
    "id": "q2224",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel peintre flamand du XVIIe siècle est célèbre pour ses scènes religieuses et portraits, comme « La Descente de croix » ?",
    "options": [
      "Jacob Jordaens",
      "Pierre Paul Rubens",
      "Antoine van Dyck",
      "Frans Hals"
    ],
    "reponse": 1
  },
  {
    "id": "q2225",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Soudan",
      "Pérou",
      "Algérie",
      "Honduras"
    ],
    "reponse": 1
  },
  {
    "id": "q2226",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de tir coopératif met en scène quatre survivants face à des hordes de zombies ?",
    "options": [
      "Back 4 Blood",
      "Killing Floor",
      "Left 4 Dead",
      "State of Decay"
    ],
    "reponse": 2
  },
  {
    "id": "q2227",
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
    "id": "q2228",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Maroc ?",
    "options": [
      "Escudo cap-verdien",
      "Kina",
      "Dirham marocain",
      "Colon costaricain"
    ],
    "reponse": 2
  },
  {
    "id": "q2229",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de km dans 19000 m ?",
    "options": [
      "15",
      "22",
      "19",
      "18"
    ],
    "reponse": 2
  },
  {
    "id": "q2230",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 × 9 ?",
    "options": [
      "98",
      "90",
      "99",
      "82"
    ],
    "reponse": 1
  },
  {
    "id": "q2231",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène une équipe qui doit faire exploser une météorite pour sauver la Terre, avec Bruce Willis ?",
    "options": [
      "Deep Impact",
      "2012",
      "Le Jour d'après",
      "Armageddon"
    ],
    "reponse": 3
  },
  {
    "id": "q2232",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 18000 s ?",
    "options": [
      "8",
      "4",
      "2",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q2233",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel site collaboratif, lancé en 2001, propose une encyclopédie librement modifiable par ses utilisateurs ?",
    "options": [
      "Wikipédia",
      "Wikia",
      "Britannica en ligne",
      "Quora"
    ],
    "reponse": 0
  },
  {
    "id": "q2234",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel insecte produit le miel ?",
    "options": [
      "Le bourdon",
      "La guêpe",
      "L'abeille",
      "La fourmi"
    ],
    "reponse": 2
  },
  {
    "id": "q2235",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Tunisie ?",
    "options": [
      "🇹🇳",
      "🇧🇳",
      "🇮🇷",
      "🇬🇲"
    ],
    "reponse": 0
  },
  {
    "id": "q2236",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 120 ÷ 12 ?",
    "options": [
      "11",
      "7",
      "10",
      "12"
    ],
    "reponse": 2
  },
  {
    "id": "q2237",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 75 % de 200 ?",
    "options": [
      "144",
      "150",
      "162",
      "130"
    ],
    "reponse": 1
  },
  {
    "id": "q2238",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays a inventé le sport du sumo ?",
    "options": [
      "La Chine",
      "Le Japon",
      "La Mongolie",
      "La Corée"
    ],
    "reponse": 1
  },
  {
    "id": "q2239",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Bulgarie ?",
    "options": [
      "🇰🇲",
      "🇧🇬",
      "🇬🇦",
      "🇬🇶"
    ],
    "reponse": 1
  },
  {
    "id": "q2240",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mozambique ?",
    "options": [
      "Amérique du Nord",
      "Afrique",
      "Europe",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q2241",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Yémen ?",
    "options": [
      "Afrique",
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2242",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Lettonie ?",
    "options": [
      "Windhoek",
      "Addis-Abeba",
      "Victoria",
      "Riga"
    ],
    "reponse": 3
  },
  {
    "id": "q2243",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1017 et 1094 ?",
    "options": [
      "63",
      "77",
      "70",
      "67"
    ],
    "reponse": 1
  },
  {
    "id": "q2244",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1992 appartient à quel siècle ?",
    "options": [
      "21e siècle",
      "19e siècle",
      "18e siècle",
      "20e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2245",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel naturaliste britannique a développé la théorie de l'évolution par sélection naturelle ?",
    "options": [
      "Gregor Mendel",
      "Alfred Russel Wallace",
      "Charles Darwin",
      "Louis Pasteur"
    ],
    "reponse": 2
  },
  {
    "id": "q2246",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CXXVI en chiffres romains ?",
    "options": [
      "125",
      "126",
      "121",
      "128"
    ],
    "reponse": 1
  },
  {
    "id": "q2247",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 336 - 22 ?",
    "options": [
      "317",
      "313",
      "315",
      "314"
    ],
    "reponse": 3
  },
  {
    "id": "q2248",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 430 + 388 ?",
    "options": [
      "817",
      "818",
      "820",
      "815"
    ],
    "reponse": 1
  },
  {
    "id": "q2249",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République démocratique du Congo ?",
    "options": [
      "🇲🇷",
      "🇹🇲",
      "🇨🇩",
      "🇸🇲"
    ],
    "reponse": 2
  },
  {
    "id": "q2250",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1826 en chiffres romains ?",
    "options": [
      "MDCCCXXXVI",
      "MDCCCXVI",
      "MDCCCXXI",
      "MDCCCXXVI"
    ],
    "reponse": 3
  },
  {
    "id": "q2251",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cl dans 5 l ?",
    "options": [
      "500",
      "525",
      "571",
      "542"
    ],
    "reponse": 0
  },
  {
    "id": "q2252",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Côte d'Ivoire",
      "Russie",
      "Panama",
      "Maldives"
    ],
    "reponse": 2
  },
  {
    "id": "q2253",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est surnommé le « Roi de la pop » ?",
    "options": [
      "Prince",
      "James Brown",
      "Michael Jackson",
      "Elvis Presley"
    ],
    "reponse": 2
  },
  {
    "id": "q2254",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1697 en chiffres romains ?",
    "options": [
      "MDCCVII",
      "MDCCII",
      "MDCXCIX",
      "MDCXCVII"
    ],
    "reponse": 3
  },
  {
    "id": "q2255",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Namibie ?",
    "options": [
      "Amman",
      "Hanoï",
      "Windhoek",
      "Tokyo"
    ],
    "reponse": 2
  },
  {
    "id": "q2256",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel objet sacré, composé de trois triangles dorés, confère sagesse, force et courage dans la saga « The Legend of Zelda » ?",
    "options": [
      "La Triforce",
      "Le Sheikah Slate",
      "La Master Sword",
      "L'Ocarina du Temps"
    ],
    "reponse": 0
  },
  {
    "id": "q2257",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 743 + 724 ?",
    "options": [
      "1464",
      "1467",
      "1465",
      "1469"
    ],
    "reponse": 1
  },
  {
    "id": "q2258",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 800 - 165 ?",
    "options": [
      "636",
      "635",
      "632",
      "634"
    ],
    "reponse": 1
  },
  {
    "id": "q2259",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Th » ?",
    "options": [
      "Fer",
      "Thorium",
      "Argent",
      "Arsenic"
    ],
    "reponse": 1
  },
  {
    "id": "q2260",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Guinée ?",
    "options": [
      "Riel",
      "Franc guinéen",
      "Naira",
      "Franc congolais"
    ],
    "reponse": 1
  },
  {
    "id": "q2261",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tirana est la capitale de quel pays ?",
    "options": [
      "Albanie",
      "États-Unis",
      "Tanzanie",
      "Lituanie"
    ],
    "reponse": 0
  },
  {
    "id": "q2262",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 460 appartient à quel siècle ?",
    "options": [
      "6e siècle",
      "4e siècle",
      "3e siècle",
      "5e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2263",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ru » ?",
    "options": [
      "Niobium",
      "Terbium",
      "Ruthénium",
      "Zinc"
    ],
    "reponse": 2
  },
  {
    "id": "q2264",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Saint-Domingue est la capitale de quel pays ?",
    "options": [
      "Guyana",
      "Roumanie",
      "République dominicaine",
      "Sénégal"
    ],
    "reponse": 2
  },
  {
    "id": "q2265",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mg dans 29 g ?",
    "options": [
      "31038",
      "33587",
      "29000",
      "28147"
    ],
    "reponse": 2
  },
  {
    "id": "q2266",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Libye ?",
    "options": [
      "🇱🇾",
      "🇲🇿",
      "🇨🇷",
      "🇸🇲"
    ],
    "reponse": 0
  },
  {
    "id": "q2267",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Rabat est la capitale de quel pays ?",
    "options": [
      "Jordanie",
      "Maroc",
      "Colombie",
      "Mongolie"
    ],
    "reponse": 1
  },
  {
    "id": "q2268",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 3900 cm ?",
    "options": [
      "35",
      "40",
      "39",
      "45"
    ],
    "reponse": 2
  },
  {
    "id": "q2269",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Rwanda ?",
    "options": [
      "Franc rwandais",
      "Lempira",
      "Riyal saoudien",
      "Birr"
    ],
    "reponse": 0
  },
  {
    "id": "q2270",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur a signé « Inception » et « Interstellar » ?",
    "options": [
      "Ridley Scott",
      "David Fincher",
      "Christopher Nolan",
      "Denis Villeneuve"
    ],
    "reponse": 2
  },
  {
    "id": "q2271",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Sur quelle surface se joue traditionnellement le tournoi de tennis de Roland-Garros ?",
    "options": [
      "La moquette",
      "La terre battue",
      "Le dur",
      "Le gazon"
    ],
    "reponse": 1
  },
  {
    "id": "q2272",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Chypre ?",
    "options": [
      "🇵🇹",
      "🇰🇲",
      "🇩🇴",
      "🇨🇾"
    ],
    "reponse": 3
  },
  {
    "id": "q2273",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle compétition annuelle oppose la France, l'Angleterre, l'Écosse, le Pays de Galles, l'Irlande et l'Italie en rugby ?",
    "options": [
      "Le Rugby Championship",
      "La Coupe d'Europe",
      "Le Tournoi des Six Nations",
      "La Coupe du monde"
    ],
    "reponse": 2
  },
  {
    "id": "q2274",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel homme politique a dirigé la Terreur pendant la Révolution française avant d'être guillotiné en 1794 ?",
    "options": [
      "Robespierre",
      "Danton",
      "Marat",
      "Mirabeau"
    ],
    "reponse": 0
  },
  {
    "id": "q2275",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Mozambique",
      "Singapour",
      "Moldavie",
      "Kazakhstan"
    ],
    "reponse": 2
  },
  {
    "id": "q2276",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Cadmium ?",
    "options": [
      "Ca",
      "Au",
      "Cd",
      "Fe"
    ],
    "reponse": 2
  },
  {
    "id": "q2277",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel pianiste et compositeur américain est célèbre pour ses comédies musicales comme « Rhapsody in Blue » ?",
    "options": [
      "George Gershwin",
      "Leonard Bernstein",
      "Irving Berlin",
      "Cole Porter"
    ],
    "reponse": 0
  },
  {
    "id": "q2278",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Moldavie ?",
    "options": [
      "🇨🇺",
      "🇲🇩",
      "🇯🇴",
      "🇺🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q2279",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 12 × 19 ?",
    "options": [
      "214",
      "228",
      "250",
      "238"
    ],
    "reponse": 1
  },
  {
    "id": "q2280",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Lilongwe est la capitale de quel pays ?",
    "options": [
      "Malawi",
      "Malte",
      "Canada",
      "Islande"
    ],
    "reponse": 0
  },
  {
    "id": "q2281",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Seychelles ?",
    "options": [
      "Dalasi",
      "Peso uruguayen",
      "Rial iranien",
      "Roupie seychelloise"
    ],
    "reponse": 3
  },
  {
    "id": "q2282",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 16 au carré ?",
    "options": [
      "256",
      "282",
      "252",
      "233"
    ],
    "reponse": 0
  },
  {
    "id": "q2283",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le lac le plus profond du monde, situé en Sibérie ?",
    "options": [
      "Le lac Baïkal",
      "La mer Caspienne",
      "Le lac Supérieur",
      "Le lac Victoria"
    ],
    "reponse": 0
  },
  {
    "id": "q2284",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Corée du Sud ?",
    "options": [
      "Won sud-coréen",
      "Cordoba",
      "Shilling somalien",
      "Tala"
    ],
    "reponse": 0
  },
  {
    "id": "q2285",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quels sont les deux mouvements techniques disputés en haltérophilie olympique ?",
    "options": [
      "Le développé et le squat",
      "La traction et la poussée",
      "L'arraché et l'épaulé-jeté",
      "Le soulevé de terre et le développé couché"
    ],
    "reponse": 2
  },
  {
    "id": "q2286",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Angola ?",
    "options": [
      "🇧🇫",
      "🇦🇴",
      "🇨🇩",
      "🇦🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q2287",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Andorre ?",
    "options": [
      "Europe",
      "Océanie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 0
  },
  {
    "id": "q2288",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 35 m ?",
    "options": [
      "2983",
      "3189",
      "3500",
      "3248"
    ],
    "reponse": 2
  },
  {
    "id": "q2289",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Mascate est la capitale de quel pays ?",
    "options": [
      "Maldives",
      "Libye",
      "Oman",
      "Maroc"
    ],
    "reponse": 2
  },
  {
    "id": "q2290",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel canal artificiel français, achevé au XVIIe siècle, relie l'Atlantique à la Méditerranée par voie fluviale ?",
    "options": [
      "Le canal de Corinthe",
      "Le canal de Suez",
      "Le canal de Panama",
      "Le canal du Midi"
    ],
    "reponse": 3
  },
  {
    "id": "q2291",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Liechtenstein ?",
    "options": [
      "🇬🇾",
      "🇱🇮",
      "🇻🇺",
      "🇦🇱"
    ],
    "reponse": 1
  },
  {
    "id": "q2292",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1792 en chiffres romains ?",
    "options": [
      "MDCCXCVII",
      "MDCCXC",
      "MDCCLXXXVII",
      "MDCCXCII"
    ],
    "reponse": 3
  },
  {
    "id": "q2293",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 11 ?",
    "options": [
      "218",
      "209",
      "224",
      "206"
    ],
    "reponse": 1
  },
  {
    "id": "q2294",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'anthologie britannique explore les dérives inquiétantes de la technologie à travers des épisodes indépendants ?",
    "options": [
      "Electric Dreams",
      "Love, Death & Robots",
      "La Quatrième Dimension",
      "Black Mirror"
    ],
    "reponse": 3
  },
  {
    "id": "q2295",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal marin possède une corne unique, lui valant le surnom de « licorne des mers » ?",
    "options": [
      "Le dauphin",
      "Le requin-scie",
      "L'espadon",
      "Le narval"
    ],
    "reponse": 3
  },
  {
    "id": "q2296",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Moroni est la capitale de quel pays ?",
    "options": [
      "Burkina Faso",
      "Niger",
      "Brunei",
      "Comores"
    ],
    "reponse": 3
  },
  {
    "id": "q2297",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 473 - 55 ?",
    "options": [
      "419",
      "417",
      "418",
      "415"
    ],
    "reponse": 2
  },
  {
    "id": "q2298",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Népal ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Europe",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q2299",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 124 + 237 ?",
    "options": [
      "359",
      "361",
      "358",
      "364"
    ],
    "reponse": 1
  },
  {
    "id": "q2300",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3092 en chiffres romains ?",
    "options": [
      "MMMXCIV",
      "MMMXCVII",
      "MMMXCII",
      "MMMXCIII"
    ],
    "reponse": 2
  },
  {
    "id": "q2301",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Maurice ?",
    "options": [
      "Niamey",
      "Managua",
      "Port-Louis",
      "Prague"
    ],
    "reponse": 2
  },
  {
    "id": "q2302",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chine ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Afrique",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q2303",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 351 ÷ 13 ?",
    "options": [
      "27",
      "23",
      "30",
      "26"
    ],
    "reponse": 0
  },
  {
    "id": "q2304",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Radon ?",
    "options": [
      "Pt",
      "Rn",
      "S",
      "Mo"
    ],
    "reponse": 1
  },
  {
    "id": "q2305",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Malawi ?",
    "options": [
      "🇭🇹",
      "🇲🇼",
      "🇹🇿",
      "🇪🇨"
    ],
    "reponse": 1
  },
  {
    "id": "q2306",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Au football, quelle couleur de carton entraîne l'exclusion définitive d'un joueur du terrain ?",
    "options": [
      "Orange",
      "Bleu",
      "Jaune",
      "Rouge"
    ],
    "reponse": 3
  },
  {
    "id": "q2307",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Gambie ?",
    "options": [
      "Tala",
      "Franc CFA",
      "Dalasi",
      "Peso chilien"
    ],
    "reponse": 2
  },
  {
    "id": "q2308",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cl dans 160 ml ?",
    "options": [
      "19",
      "12",
      "14",
      "16"
    ],
    "reponse": 3
  },
  {
    "id": "q2309",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 678 + 87 ?",
    "options": [
      "765",
      "767",
      "766",
      "764"
    ],
    "reponse": 0
  },
  {
    "id": "q2310",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCDLXXVI en chiffres romains ?",
    "options": [
      "3476",
      "3478",
      "3481",
      "3477"
    ],
    "reponse": 0
  },
  {
    "id": "q2311",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Mali ?",
    "options": [
      "Nicosie",
      "Bamako",
      "Séoul",
      "Jakarta"
    ],
    "reponse": 1
  },
  {
    "id": "q2312",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 108 mois ?",
    "options": [
      "7",
      "10",
      "9",
      "12"
    ],
    "reponse": 2
  },
  {
    "id": "q2313",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bhoutan ?",
    "options": [
      "Thimphou",
      "Naypyidaw",
      "Brasilia",
      "Nassau"
    ],
    "reponse": 0
  },
  {
    "id": "q2314",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 389 - 133 ?",
    "options": [
      "256",
      "259",
      "254",
      "258"
    ],
    "reponse": 0
  },
  {
    "id": "q2315",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 128 ÷ 8 ?",
    "options": [
      "19",
      "16",
      "12",
      "15"
    ],
    "reponse": 1
  },
  {
    "id": "q2316",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Qui a réalisé « Pulp Fiction » et « Kill Bill » ?",
    "options": [
      "Quentin Tarantino",
      "David Fincher",
      "Martin Scorsese",
      "Christopher Nolan"
    ],
    "reponse": 0
  },
  {
    "id": "q2317",
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
    "id": "q2318",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Eu » ?",
    "options": [
      "Europium",
      "Nickel",
      "Terbium",
      "Osmium"
    ],
    "reponse": 0
  },
  {
    "id": "q2319",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le mammifère terrestre réputé le plus lent au monde, vivant dans les arbres d'Amérique du Sud ?",
    "options": [
      "Le tapir",
      "Le paresseux",
      "Le tamanoir",
      "Le fourmilier"
    ],
    "reponse": 1
  },
  {
    "id": "q2320",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Nicaragua ?",
    "options": [
      "🇰🇵",
      "🇳🇮",
      "🇨🇴",
      "🇳🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q2321",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport les athlètes utilisent-ils une longue tige flexible pour se propulser au-dessus d'une barre ?",
    "options": [
      "Le triple saut",
      "Le saut en longueur",
      "Le saut à la perche",
      "Le saut en hauteur"
    ],
    "reponse": 2
  },
  {
    "id": "q2322",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Potassium ?",
    "options": [
      "K",
      "Zn",
      "Ne",
      "Gd"
    ],
    "reponse": 0
  },
  {
    "id": "q2323",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Égypte ?",
    "options": [
      "🇹🇯",
      "🇸🇻",
      "🇪🇬",
      "🇼🇸"
    ],
    "reponse": 2
  },
  {
    "id": "q2324",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 × 9 ?",
    "options": [
      "115",
      "108",
      "103",
      "101"
    ],
    "reponse": 1
  },
  {
    "id": "q2325",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Ouzbékistan ?",
    "options": [
      "Peso dominicain",
      "Forint",
      "Sum ouzbek",
      "Roupie indienne"
    ],
    "reponse": 2
  },
  {
    "id": "q2326",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Pérou ?",
    "options": [
      "Dollar jamaïcain",
      "Sol péruvien",
      "Dollar guyanien",
      "Baht"
    ],
    "reponse": 1
  },
  {
    "id": "q2327",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Qatar ?",
    "options": [
      "🇧🇾",
      "🇪🇪",
      "🇹🇬",
      "🇶🇦"
    ],
    "reponse": 3
  },
  {
    "id": "q2328",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Paris est la capitale de quel pays ?",
    "options": [
      "Soudan",
      "France",
      "Honduras",
      "Arabie saoudite"
    ],
    "reponse": 1
  },
  {
    "id": "q2329",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Am » ?",
    "options": [
      "Rhénium",
      "Césium",
      "Dysprosium",
      "Américium"
    ],
    "reponse": 3
  },
  {
    "id": "q2330",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Cap-Vert ?",
    "options": [
      "Praia",
      "Port-Louis",
      "Thimphou",
      "Achgabat"
    ],
    "reponse": 0
  },
  {
    "id": "q2331",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCXIX en chiffres romains ?",
    "options": [
      "2721",
      "2718",
      "2720",
      "2719"
    ],
    "reponse": 3
  },
  {
    "id": "q2332",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel geste, au football, consiste à propulser le ballon en le frappant du front ou du crâne ?",
    "options": [
      "Un contrôle",
      "Une volée",
      "Un centre",
      "Une tête"
    ],
    "reponse": 3
  },
  {
    "id": "q2333",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Notre-Dame de Paris » ?",
    "options": [
      "Stendhal",
      "Victor Hugo",
      "Alexandre Dumas",
      "Honoré de Balzac"
    ],
    "reponse": 1
  },
  {
    "id": "q2334",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Ouzbékistan ?",
    "options": [
      "🇸🇪",
      "🇵🇬",
      "🇺🇿",
      "🇲🇿"
    ],
    "reponse": 2
  },
  {
    "id": "q2335",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quelle autrice britannique a créé la détective Miss Marple et Hercule Poirot ?",
    "options": [
      "Agatha Christie",
      "Dorothy L. Sayers",
      "P.D. James",
      "Ruth Rendell"
    ],
    "reponse": 0
  },
  {
    "id": "q2336",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1314 en chiffres romains ?",
    "options": [
      "MCCCXV",
      "MCCCXVI",
      "MCCCXIV",
      "MCCCXXIV"
    ],
    "reponse": 2
  },
  {
    "id": "q2337",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 547 - 520 ?",
    "options": [
      "27",
      "24",
      "25",
      "30"
    ],
    "reponse": 0
  },
  {
    "id": "q2338",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Oman",
      "Jamaïque",
      "Nigeria",
      "Turquie"
    ],
    "reponse": 3
  },
  {
    "id": "q2339",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCLXIX en chiffres romains ?",
    "options": [
      "2169",
      "2170",
      "2164",
      "2179"
    ],
    "reponse": 0
  },
  {
    "id": "q2340",
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
    "id": "q2341",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Technétium ?",
    "options": [
      "W",
      "Sc",
      "Tc",
      "Sr"
    ],
    "reponse": 2
  },
  {
    "id": "q2342",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Minsk est la capitale de quel pays ?",
    "options": [
      "Botswana",
      "Biélorussie",
      "Paraguay",
      "Bulgarie"
    ],
    "reponse": 1
  },
  {
    "id": "q2343",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel réseau social a été fondé par Mark Zuckerberg en 2004 ?",
    "options": [
      "Twitter",
      "Instagram",
      "Facebook",
      "LinkedIn"
    ],
    "reponse": 2
  },
  {
    "id": "q2344",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 8 année(s) ?",
    "options": [
      "96",
      "83",
      "100",
      "111"
    ],
    "reponse": 0
  },
  {
    "id": "q2345",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 794 + 921 ?",
    "options": [
      "1715",
      "1716",
      "1714",
      "1712"
    ],
    "reponse": 0
  },
  {
    "id": "q2346",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 40 ÷ 8 ?",
    "options": [
      "5",
      "7",
      "4",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q2347",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bangladesh ?",
    "options": [
      "Livre sterling",
      "Dollar guyanien",
      "Taka",
      "Som kirghize"
    ],
    "reponse": 2
  },
  {
    "id": "q2348",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 31 cm ?",
    "options": [
      "291",
      "310",
      "331",
      "335"
    ],
    "reponse": 1
  },
  {
    "id": "q2349",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Erevan est la capitale de quel pays ?",
    "options": [
      "Ukraine",
      "Portugal",
      "Bulgarie",
      "Arménie"
    ],
    "reponse": 3
  },
  {
    "id": "q2350",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 350 ÷ 14 ?",
    "options": [
      "24",
      "20",
      "25",
      "28"
    ],
    "reponse": 2
  },
  {
    "id": "q2351",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Tm » ?",
    "options": [
      "Rhodium",
      "Argon",
      "Thulium",
      "Cobalt"
    ],
    "reponse": 2
  },
  {
    "id": "q2352",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1665 et 1672 ?",
    "options": [
      "7",
      "5",
      "8",
      "9"
    ],
    "reponse": 0
  },
  {
    "id": "q2353",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 8 × 19 ?",
    "options": [
      "147",
      "152",
      "143",
      "131"
    ],
    "reponse": 1
  },
  {
    "id": "q2354",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom scientifique de l'étoile autour de laquelle la Terre tourne ?",
    "options": [
      "Sirius",
      "Alpha du Centaure",
      "Le Soleil",
      "Proxima du Centaure"
    ],
    "reponse": 2
  },
  {
    "id": "q2355",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Monaco",
      "Kenya",
      "Chine",
      "Bulgarie"
    ],
    "reponse": 1
  },
  {
    "id": "q2356",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Tanzanie ?",
    "options": [
      "Nakfa",
      "Dollar bélizien",
      "Rial omanais",
      "Shilling tanzanien"
    ],
    "reponse": 3
  },
  {
    "id": "q2357",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1403 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "13e siècle",
      "16e siècle",
      "14e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2358",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ta » ?",
    "options": [
      "Américium",
      "Rhénium",
      "Magnésium",
      "Tantale"
    ],
    "reponse": 3
  },
  {
    "id": "q2359",
    "categorie": "Nature & Animaux",
    "difficulte": 3,
    "question": "Quel est le nom du bébé du kangourou ?",
    "options": [
      "Le kangourou nain",
      "Le petit",
      "Le joey",
      "Le kanga"
    ],
    "reponse": 2
  },
  {
    "id": "q2360",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le plus grand mammifère terrestre actuel ?",
    "options": [
      "Le rhinocéros",
      "L'éléphant d'Afrique",
      "L'hippopotame",
      "La girafe"
    ],
    "reponse": 1
  },
  {
    "id": "q2361",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Ukraine",
      "Comores",
      "Biélorussie",
      "Chili"
    ],
    "reponse": 1
  },
  {
    "id": "q2362",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Ghana ?",
    "options": [
      "🇬🇭",
      "🇸🇰",
      "🇪🇬",
      "🇬🇧"
    ],
    "reponse": 0
  },
  {
    "id": "q2363",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 9 ?",
    "options": [
      "119",
      "117",
      "116",
      "128"
    ],
    "reponse": 1
  },
  {
    "id": "q2364",
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
    "id": "q2365",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Palladium ?",
    "options": [
      "Pd",
      "Mo",
      "Te",
      "B"
    ],
    "reponse": 0
  },
  {
    "id": "q2366",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Pakistan ?",
    "options": [
      "🇹🇲",
      "🇵🇭",
      "🇩🇯",
      "🇵🇰"
    ],
    "reponse": 3
  },
  {
    "id": "q2367",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain colombien a reçu le prix Nobel de littérature pour « Cent ans de solitude » ?",
    "options": [
      "Mario Vargas Llosa",
      "Gabriel García Márquez",
      "Jorge Luis Borges",
      "Pablo Neruda"
    ],
    "reponse": 1
  },
  {
    "id": "q2368",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Russie ?",
    "options": [
      "Moscou",
      "Tripoli",
      "Freetown",
      "Ankara"
    ],
    "reponse": 0
  },
  {
    "id": "q2369",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 2000 ml ?",
    "options": [
      "5",
      "4",
      "0",
      "2"
    ],
    "reponse": 3
  },
  {
    "id": "q2370",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1086 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "10e siècle",
      "9e siècle",
      "12e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2371",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation Disney raconte l'histoire d'un jeune Mexicain rêvant de devenir musicien, le jour des morts ?",
    "options": [
      "Encanto",
      "La Reine des neiges",
      "Vaiana",
      "Coco"
    ],
    "reponse": 3
  },
  {
    "id": "q2372",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 220 ÷ 11 ?",
    "options": [
      "23",
      "19",
      "22",
      "20"
    ],
    "reponse": 3
  },
  {
    "id": "q2373",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle est la plus haute chute d'eau du monde, située au Venezuela ?",
    "options": [
      "Les chutes Victoria",
      "Les chutes Angel",
      "Les chutes d'Iguaçu",
      "Les chutes du Niagara"
    ],
    "reponse": 1
  },
  {
    "id": "q2374",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Sodium ?",
    "options": [
      "Am",
      "Na",
      "In",
      "Tb"
    ],
    "reponse": 1
  },
  {
    "id": "q2375",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Chine ?",
    "options": [
      "🇫🇷",
      "🇨🇳",
      "🇧🇾",
      "🇩🇴"
    ],
    "reponse": 1
  },
  {
    "id": "q2376",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 363 - 7 ?",
    "options": [
      "353",
      "356",
      "359",
      "357"
    ],
    "reponse": 1
  },
  {
    "id": "q2377",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Arabie saoudite ?",
    "options": [
      "Riyal saoudien",
      "Sol péruvien",
      "Roupie népalaise",
      "Roupie mauricienne"
    ],
    "reponse": 0
  },
  {
    "id": "q2378",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 au carré ?",
    "options": [
      "49",
      "45",
      "55",
      "51"
    ],
    "reponse": 0
  },
  {
    "id": "q2379",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Damas est la capitale de quel pays ?",
    "options": [
      "Syrie",
      "Corée du Nord",
      "Sénégal",
      "République tchèque"
    ],
    "reponse": 0
  },
  {
    "id": "q2380",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel type de logiciel malveillant se déguise en programme légitime pour tromper l'utilisateur ?",
    "options": [
      "Un cheval de Troie",
      "Un rançongiciel",
      "Un ver informatique",
      "Un spyware uniquement"
    ],
    "reponse": 0
  },
  {
    "id": "q2381",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel festival de musique de 1969, dans l'État de New York, est devenu le symbole de la contre-culture hippie ?",
    "options": [
      "Le festival de l'île de Wight",
      "Live Aid",
      "Woodstock",
      "Monterey Pop Festival"
    ],
    "reponse": 2
  },
  {
    "id": "q2382",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bamako est la capitale de quel pays ?",
    "options": [
      "Madagascar",
      "Sierra Leone",
      "Zimbabwe",
      "Mali"
    ],
    "reponse": 3
  },
  {
    "id": "q2383",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Kazakhstan ?",
    "options": [
      "Nassau",
      "Addis-Abeba",
      "Astana",
      "Dodoma"
    ],
    "reponse": 2
  },
  {
    "id": "q2384",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 967 - 254 ?",
    "options": [
      "711",
      "716",
      "710",
      "713"
    ],
    "reponse": 3
  },
  {
    "id": "q2385",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Angola ?",
    "options": [
      "Europe",
      "Afrique",
      "Amérique du Sud",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q2386",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Équateur ?",
    "options": [
      "Euro",
      "Dollar américain",
      "Kip",
      "Riyal saoudien"
    ],
    "reponse": 1
  },
  {
    "id": "q2387",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock britannique a pour chanteur emblématique Freddie Mercury ?",
    "options": [
      "Deep Purple",
      "Queen",
      "The Rolling Stones",
      "Led Zeppelin"
    ],
    "reponse": 1
  },
  {
    "id": "q2388",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCLIII en chiffres romains ?",
    "options": [
      "763",
      "754",
      "752",
      "753"
    ],
    "reponse": 3
  },
  {
    "id": "q2389",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 120 ?",
    "options": [
      "32",
      "31",
      "30",
      "36"
    ],
    "reponse": 3
  },
  {
    "id": "q2390",
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
    "id": "q2391",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 300 ?",
    "options": [
      "120",
      "126",
      "113",
      "116"
    ],
    "reponse": 0
  },
  {
    "id": "q2392",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 586 - 333 ?",
    "options": [
      "253",
      "254",
      "251",
      "256"
    ],
    "reponse": 0
  },
  {
    "id": "q2393",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Chlore ?",
    "options": [
      "I",
      "Cl",
      "Pr",
      "Co"
    ],
    "reponse": 1
  },
  {
    "id": "q2394",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 10 × 4 ?",
    "options": [
      "40",
      "33",
      "36",
      "46"
    ],
    "reponse": 0
  },
  {
    "id": "q2395",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel langage de programmation, créé par Dennis Ritchie, a servi de base à des langages modernes comme C++ et Java ?",
    "options": [
      "Le Pascal",
      "Le langage C",
      "Le langage B",
      "Le Fortran"
    ],
    "reponse": 1
  },
  {
    "id": "q2396",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 784 ?",
    "options": [
      "28",
      "31",
      "32",
      "26"
    ],
    "reponse": 0
  },
  {
    "id": "q2397",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 14 année(s) ?",
    "options": [
      "192",
      "168",
      "143",
      "169"
    ],
    "reponse": 1
  },
  {
    "id": "q2398",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Praia est la capitale de quel pays ?",
    "options": [
      "Roumanie",
      "Cap-Vert",
      "Kosovo",
      "Bangladesh"
    ],
    "reponse": 1
  },
  {
    "id": "q2399",
    "categorie": "Histoire",
    "difficulte": 1,
    "question": "Quel artisan allemand du XVe siècle est à l'origine de l'imprimerie à caractères mobiles en Europe ?",
    "options": [
      "Léonard de Vinci",
      "Albrecht Dürer",
      "Nicolas Copernic",
      "Johannes Gutenberg"
    ],
    "reponse": 3
  },
  {
    "id": "q2400",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CXXI en chiffres romains ?",
    "options": [
      "126",
      "121",
      "116",
      "131"
    ],
    "reponse": 1
  },
  {
    "id": "q2401",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 372 mois ?",
    "options": [
      "29",
      "38",
      "31",
      "35"
    ],
    "reponse": 2
  },
  {
    "id": "q2402",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur allemand est l'auteur de la « 9e Symphonie » alors qu'il était devenu sourd ?",
    "options": [
      "Johann Sebastian Bach",
      "Ludwig van Beethoven",
      "Johannes Brahms",
      "Wolfgang Amadeus Mozart"
    ],
    "reponse": 1
  },
  {
    "id": "q2403",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 542 + 825 ?",
    "options": [
      "1369",
      "1368",
      "1367",
      "1366"
    ],
    "reponse": 2
  },
  {
    "id": "q2404",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat indien est un curry crémeux à la tomate, servi avec une viande marinée au yaourt et aux épices, très populaire en Occident ?",
    "options": [
      "Le poulet tikka masala",
      "Le biryani",
      "Le tandoori",
      "Le korma"
    ],
    "reponse": 0
  },
  {
    "id": "q2405",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 966 + 613 ?",
    "options": [
      "1580",
      "1579",
      "1576",
      "1577"
    ],
    "reponse": 1
  },
  {
    "id": "q2406",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Albanie",
      "Ouganda",
      "Somalie",
      "Guinée"
    ],
    "reponse": 2
  },
  {
    "id": "q2407",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1741 et 1799 ?",
    "options": [
      "57",
      "58",
      "51",
      "48"
    ],
    "reponse": 1
  },
  {
    "id": "q2408",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un boxeur qui affronte Apollo Creed pour devenir champion ?",
    "options": [
      "Raging Bull",
      "Million Dollar Baby",
      "Rocky",
      "Creed"
    ],
    "reponse": 2
  },
  {
    "id": "q2409",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kosovo ?",
    "options": [
      "🇸🇪",
      "🇽🇰",
      "🇧🇭",
      "🇧🇬"
    ],
    "reponse": 1
  },
  {
    "id": "q2410",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Burkina Faso ?",
    "options": [
      "Dinar algérien",
      "Dinar irakien",
      "Ngultrum",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q2411",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ge » ?",
    "options": [
      "Osmium",
      "Germanium",
      "Molybdène",
      "Azote"
    ],
    "reponse": 1
  },
  {
    "id": "q2412",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Pologne ?",
    "options": [
      "Dollar canadien",
      "Zloty",
      "Rouble russe",
      "Shilling somalien"
    ],
    "reponse": 1
  },
  {
    "id": "q2413",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 20 × 10 ?",
    "options": [
      "200",
      "208",
      "203",
      "223"
    ],
    "reponse": 0
  },
  {
    "id": "q2414",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 297 ÷ 11 ?",
    "options": [
      "26",
      "24",
      "31",
      "27"
    ],
    "reponse": 3
  },
  {
    "id": "q2415",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Algérie ?",
    "options": [
      "Katmandou",
      "Alger",
      "Kaboul",
      "Port Moresby"
    ],
    "reponse": 1
  },
  {
    "id": "q2416",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Bahreïn ?",
    "options": [
      "Shilling somalien",
      "Dinar bahreïni",
      "Bolivar",
      "Rouble biélorusse"
    ],
    "reponse": 1
  },
  {
    "id": "q2417",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit les aventures du commissaire Maigret ?",
    "options": [
      "Agatha Christie",
      "Arthur Conan Doyle",
      "Georges Simenon",
      "Boileau-Narcejac"
    ],
    "reponse": 2
  },
  {
    "id": "q2418",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇪🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Éthiopie",
      "Hongrie",
      "Bahamas",
      "Australie"
    ],
    "reponse": 0
  },
  {
    "id": "q2419",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Kingston est la capitale de quel pays ?",
    "options": [
      "Jamaïque",
      "Bénin",
      "Gabon",
      "Chine"
    ],
    "reponse": 0
  },
  {
    "id": "q2420",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 au carré ?",
    "options": [
      "65",
      "64",
      "63",
      "67"
    ],
    "reponse": 1
  },
  {
    "id": "q2421",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 7 kg ?",
    "options": [
      "7850",
      "6801",
      "7000",
      "6006"
    ],
    "reponse": 2
  },
  {
    "id": "q2422",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « HTTP » ?",
    "options": [
      "Hyperlink Transport Protocol",
      "HyperText Transfer Protocol",
      "Home Text Transport Protocol",
      "High Transfer Text Protocol"
    ],
    "reponse": 1
  },
  {
    "id": "q2423",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien de groupes sanguins principaux existe-t-il dans le système ABO ?",
    "options": [
      "6",
      "3",
      "4",
      "2"
    ],
    "reponse": 2
  },
  {
    "id": "q2424",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1530 et 1607 ?",
    "options": [
      "71",
      "83",
      "77",
      "88"
    ],
    "reponse": 2
  },
  {
    "id": "q2425",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de joueurs compose une équipe de water-polo dans l'eau ?",
    "options": [
      "6",
      "9",
      "8",
      "7"
    ],
    "reponse": 3
  },
  {
    "id": "q2426",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Tadjikistan ?",
    "options": [
      "Douchanbé",
      "Wellington",
      "Washington",
      "La Havane"
    ],
    "reponse": 0
  },
  {
    "id": "q2427",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 2 × 20 ?",
    "options": [
      "43",
      "38",
      "40",
      "39"
    ],
    "reponse": 2
  },
  {
    "id": "q2428",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 502 + 911 ?",
    "options": [
      "1412",
      "1413",
      "1414",
      "1416"
    ],
    "reponse": 1
  },
  {
    "id": "q2429",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ir » ?",
    "options": [
      "Lutécium",
      "Iridium",
      "Radon",
      "Étain"
    ],
    "reponse": 1
  },
  {
    "id": "q2430",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel auteur français du XVIIe siècle a écrit « Le Malade imaginaire » et « Le Bourgeois gentilhomme » ?",
    "options": [
      "Jean de La Fontaine",
      "Jean Racine",
      "Molière",
      "Pierre Corneille"
    ],
    "reponse": 2
  },
  {
    "id": "q2431",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 42 ÷ 7 ?",
    "options": [
      "7",
      "8",
      "4",
      "6"
    ],
    "reponse": 3
  },
  {
    "id": "q2432",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu grec règne sur les océans et les mers ?",
    "options": [
      "Zeus",
      "Hermès",
      "Poséidon",
      "Hadès"
    ],
    "reponse": 2
  },
  {
    "id": "q2433",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CMXL en chiffres romains ?",
    "options": [
      "950",
      "940",
      "935",
      "938"
    ],
    "reponse": 1
  },
  {
    "id": "q2434",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 412 en chiffres romains ?",
    "options": [
      "CDII",
      "CDXIV",
      "CDXI",
      "CDXII"
    ],
    "reponse": 3
  },
  {
    "id": "q2435",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série britannique met en scène une jeune sorcière maladroite dans une école de magie nommée Cackle's Academy ?",
    "options": [
      "Merlin",
      "The Worst Witch",
      "Charmed",
      "A Discovery of Witches"
    ],
    "reponse": 1
  },
  {
    "id": "q2436",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur a créé la trilogie « The Dark Knight » avec Batman ?",
    "options": [
      "Christopher Nolan",
      "Zack Snyder",
      "Sam Raimi",
      "Tim Burton"
    ],
    "reponse": 0
  },
  {
    "id": "q2437",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Mali ?",
    "options": [
      "🇹🇭",
      "🇲🇱",
      "🇮🇷",
      "🇸🇷"
    ],
    "reponse": 1
  },
  {
    "id": "q2438",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Port-Louis est la capitale de quel pays ?",
    "options": [
      "Ghana",
      "Pakistan",
      "Mauritanie",
      "Maurice"
    ],
    "reponse": 3
  },
  {
    "id": "q2439",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Ouganda ?",
    "options": [
      "Port-au-Prince",
      "Kampala",
      "Ottawa",
      "Damas"
    ],
    "reponse": 1
  },
  {
    "id": "q2440",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des zombies envahissant les États-Unis, suivant un groupe de survivants menés par Rick ?",
    "options": [
      "The Walking Dead",
      "Z Nation",
      "Fear the Walking Dead",
      "The Last of Us"
    ],
    "reponse": 0
  },
  {
    "id": "q2441",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel désert côtier d'Amérique du Sud est considéré comme le plus aride du monde ?",
    "options": [
      "Le désert d'Atacama",
      "Le désert de Patagonie",
      "Le désert de Sonora",
      "Le désert du Kalahari"
    ],
    "reponse": 0
  },
  {
    "id": "q2442",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Arabie saoudite ?",
    "options": [
      "Kaboul",
      "Jakarta",
      "Riyad",
      "Vienne"
    ],
    "reponse": 2
  },
  {
    "id": "q2443",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Belgique ?",
    "options": [
      "Couronne suédoise",
      "Shilling tanzanien",
      "Dollar américain",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q2444",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CCCLX en chiffres romains ?",
    "options": [
      "360",
      "355",
      "350",
      "358"
    ],
    "reponse": 0
  },
  {
    "id": "q2445",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1857 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "20e siècle",
      "17e siècle",
      "19e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2446",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Togo ?",
    "options": [
      "🇹🇬",
      "🇵🇪",
      "🇬🇦",
      "🇺🇸"
    ],
    "reponse": 0
  },
  {
    "id": "q2447",
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
    "id": "q2448",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel duo a fondé Google ?",
    "options": [
      "Steve Jobs et Steve Wozniak",
      "Jeff Bezos et Elon Musk",
      "Bill Gates et Paul Allen",
      "Larry Page et Sergey Brin"
    ],
    "reponse": 3
  },
  {
    "id": "q2449",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un jeune sorcier orphelin qui découvre qu'il est célèbre dans le monde de la magie ?",
    "options": [
      "Harry Potter à l'école des sorciers",
      "Eragon",
      "Percy Jackson",
      "Le Monde de Narnia"
    ],
    "reponse": 0
  },
  {
    "id": "q2450",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ho » ?",
    "options": [
      "Niobium",
      "Holmium",
      "Hélium",
      "Chrome"
    ],
    "reponse": 1
  },
  {
    "id": "q2451",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "D'où vient historiquement le terme anglais désignant une erreur informatique, popularisé par Grace Hopper ?",
    "options": [
      "Un insecte réellement retrouvé coincé dans un relais d'ordinateur",
      "Une comparaison avec un virus biologique",
      "Une erreur de traduction technique",
      "Une abréviation d'un terme militaire"
    ],
    "reponse": 0
  },
  {
    "id": "q2452",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle sitcom américaine raconte, à coups de flashbacks, comment le narrateur a rencontré la mère de ses enfants ?",
    "options": [
      "How I Met Your Mother",
      "Friends",
      "New Girl",
      "Scrubs"
    ],
    "reponse": 0
  },
  {
    "id": "q2453",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du navigateur web développé par Google ?",
    "options": [
      "Safari",
      "Firefox",
      "Edge",
      "Chrome"
    ],
    "reponse": 3
  },
  {
    "id": "q2454",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a signé « Le Silence des agneaux » ?",
    "options": [
      "Ridley Scott",
      "David Fincher",
      "Jonathan Demme",
      "Michael Mann"
    ],
    "reponse": 2
  },
  {
    "id": "q2455",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 338 ÷ 13 ?",
    "options": [
      "30",
      "31",
      "23",
      "26"
    ],
    "reponse": 3
  },
  {
    "id": "q2456",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1797 et 1833 ?",
    "options": [
      "41",
      "34",
      "38",
      "36"
    ],
    "reponse": 3
  },
  {
    "id": "q2457",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle déesse égyptienne, souvent représentée avec une tête de chat, protège le foyer ?",
    "options": [
      "Bastet",
      "Isis",
      "Hathor",
      "Sekhmet"
    ],
    "reponse": 0
  },
  {
    "id": "q2458",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel type de voix masculine est le plus aigu ?",
    "options": [
      "La basse",
      "Le ténor",
      "Le contre-ténor",
      "Le baryton"
    ],
    "reponse": 1
  },
  {
    "id": "q2459",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle température correspond au zéro absolu, où toute agitation thermique cesse théoriquement ?",
    "options": [
      "-200 °C",
      "-373 °C",
      "-273,15 °C",
      "-100 °C"
    ],
    "reponse": 2
  },
  {
    "id": "q2460",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCXLV en chiffres romains ?",
    "options": [
      "3640",
      "3645",
      "3643",
      "3635"
    ],
    "reponse": 1
  },
  {
    "id": "q2461",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 3 siècle(s) ?",
    "options": [
      "334",
      "314",
      "300",
      "282"
    ],
    "reponse": 2
  },
  {
    "id": "q2462",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Chypre",
      "Bhoutan",
      "Thaïlande",
      "Togo"
    ],
    "reponse": 3
  },
  {
    "id": "q2463",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 27 siècle(s) ?",
    "options": [
      "2335",
      "2969",
      "2437",
      "2700"
    ],
    "reponse": 3
  },
  {
    "id": "q2464",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Croatie ?",
    "options": [
      "Zagreb",
      "Lisbonne",
      "Ankara",
      "Rome"
    ],
    "reponse": 0
  },
  {
    "id": "q2465",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Équateur ?",
    "options": [
      "🇩🇪",
      "🇪🇨",
      "🇧🇼",
      "🇮🇩"
    ],
    "reponse": 1
  },
  {
    "id": "q2466",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Colombie ?",
    "options": [
      "🇨🇴",
      "🇹🇲",
      "🇬🇳",
      "🇮🇷"
    ],
    "reponse": 0
  },
  {
    "id": "q2467",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1002 et 1156 ?",
    "options": [
      "154",
      "174",
      "132",
      "172"
    ],
    "reponse": 0
  },
  {
    "id": "q2468",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Xénon ?",
    "options": [
      "Xe",
      "B",
      "Y",
      "Tb"
    ],
    "reponse": 0
  },
  {
    "id": "q2469",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène des personnages coincés sur une île mystérieuse après un crash d'avion ?",
    "options": [
      "The Wilds",
      "Yellowjackets",
      "Manifest",
      "Lost, les disparus"
    ],
    "reponse": 3
  },
  {
    "id": "q2470",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 262 - 3 ?",
    "options": [
      "257",
      "259",
      "256",
      "258"
    ],
    "reponse": 1
  },
  {
    "id": "q2471",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇵🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Timor oriental",
      "Philippines",
      "Zambie",
      "Japon"
    ],
    "reponse": 1
  },
  {
    "id": "q2472",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2358 en chiffres romains ?",
    "options": [
      "MMCCCLVIII",
      "MMCCCLVII",
      "MMCCCLXIII",
      "MMCCCLXVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q2473",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Don Quichotte » ?",
    "options": [
      "Lope de Vega",
      "Miguel de Cervantès",
      "Pedro Calderón de la Barca",
      "Federico García Lorca"
    ],
    "reponse": 1
  },
  {
    "id": "q2474",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 36 ?",
    "options": [
      "3",
      "8",
      "4",
      "6"
    ],
    "reponse": 3
  },
  {
    "id": "q2475",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film de 1939 suit une jeune fille du Kansas emportée par une tornade dans un monde peuplé d'un épouvantail et d'un homme en fer-blanc ?",
    "options": [
      "Le Magicien d'Oz",
      "Peter Pan",
      "Alice au pays des merveilles",
      "Charlie et la Chocolaterie"
    ],
    "reponse": 0
  },
  {
    "id": "q2476",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 312 ÷ 12 ?",
    "options": [
      "29",
      "27",
      "26",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q2477",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2671 en chiffres romains ?",
    "options": [
      "MMDCLXVI",
      "MMDCLXIX",
      "MMDCLXXXI",
      "MMDCLXXI"
    ],
    "reponse": 3
  },
  {
    "id": "q2478",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel maillot du Tour de France récompense le meilleur grimpeur, reconnaissable à son motif rouge et blanc ?",
    "options": [
      "Le maillot à pois",
      "Le maillot vert",
      "Le maillot jaune",
      "Le maillot blanc"
    ],
    "reponse": 0
  },
  {
    "id": "q2479",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel jeu de précision se joue avec des boules colorées numérotées et une queue, sur un tapis vert ?",
    "options": [
      "Le bowling",
      "Le billard",
      "Le croquet",
      "Le snooker"
    ],
    "reponse": 1
  },
  {
    "id": "q2480",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Combien de dents possède un adulte humain en moyenne (dents de sagesse incluses) ?",
    "options": [
      "28",
      "30",
      "32",
      "34"
    ],
    "reponse": 2
  },
  {
    "id": "q2481",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMXCI en chiffres romains ?",
    "options": [
      "2101",
      "2090",
      "2086",
      "2091"
    ],
    "reponse": 3
  },
  {
    "id": "q2482",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur a mis en scène « Titanic » et « Avatar » ?",
    "options": [
      "Peter Jackson",
      "James Cameron",
      "Steven Spielberg",
      "Ridley Scott"
    ],
    "reponse": 1
  },
  {
    "id": "q2483",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mali ?",
    "options": [
      "Riyal yéménite",
      "Franc CFA",
      "Rufiyaa",
      "Couronne norvégienne"
    ],
    "reponse": 1
  },
  {
    "id": "q2484",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Gambie ?",
    "options": [
      "🇮🇷",
      "🇾🇪",
      "🇳🇿",
      "🇬🇲"
    ],
    "reponse": 3
  },
  {
    "id": "q2485",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle unité mesure traditionnellement la quantité d'énergie apportée par un aliment ?",
    "options": [
      "La calorie",
      "Le watt",
      "L'ampère",
      "Le pascal"
    ],
    "reponse": 0
  },
  {
    "id": "q2486",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Madame Bovary » ?",
    "options": [
      "Gustave Flaubert",
      "Honoré de Balzac",
      "Émile Zola",
      "Guy de Maupassant"
    ],
    "reponse": 0
  },
  {
    "id": "q2487",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Colombie ?",
    "options": [
      "Quetzal",
      "Dollar canadien",
      "Peso colombien",
      "Kip"
    ],
    "reponse": 2
  },
  {
    "id": "q2488",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument romain, amphithéâtre, pouvait accueillir des dizaines de milliers de spectateurs pour des combats de gladiateurs ?",
    "options": [
      "Les thermes de Caracalla",
      "Le Colisée",
      "Le Panthéon",
      "Le Forum romain"
    ],
    "reponse": 1
  },
  {
    "id": "q2489",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel phénomène explique pourquoi le ciel est bleu ?",
    "options": [
      "La diffusion de la lumière",
      "L'absorption",
      "La polarisation",
      "La réfraction"
    ],
    "reponse": 0
  },
  {
    "id": "q2490",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quelle est la principale nourriture du panda géant ?",
    "options": [
      "Le bambou",
      "Les fruits",
      "Les feuilles d'eucalyptus",
      "Le poisson"
    ],
    "reponse": 0
  },
  {
    "id": "q2491",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bagdad est la capitale de quel pays ?",
    "options": [
      "Vietnam",
      "Bangladesh",
      "Irak",
      "Malawi"
    ],
    "reponse": 2
  },
  {
    "id": "q2492",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Thaïlande",
      "Albanie",
      "Espagne",
      "Venezuela"
    ],
    "reponse": 0
  },
  {
    "id": "q2493",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Venezuela ?",
    "options": [
      "Franc congolais",
      "Dollar canadien",
      "Bolivar",
      "Dollar bahaméen"
    ],
    "reponse": 2
  },
  {
    "id": "q2494",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Allemagne ?",
    "options": [
      "Cordoba",
      "Dollar libérien",
      "Franc suisse",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q2495",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Uruguay ?",
    "options": [
      "Alger",
      "Doha",
      "Londres",
      "Montevideo"
    ],
    "reponse": 3
  },
  {
    "id": "q2496",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDXVIII en chiffres romains ?",
    "options": [
      "1516",
      "1517",
      "1518",
      "1513"
    ],
    "reponse": 2
  },
  {
    "id": "q2497",
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
    "id": "q2498",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel style de musique électronique est né à Chicago dans les années 1980 ?",
    "options": [
      "La house",
      "La trance",
      "Le dubstep",
      "La techno"
    ],
    "reponse": 0
  },
  {
    "id": "q2499",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 635 - 103 ?",
    "options": [
      "530",
      "529",
      "531",
      "532"
    ],
    "reponse": 3
  },
  {
    "id": "q2500",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 80 ?",
    "options": [
      "6",
      "8",
      "7",
      "11"
    ],
    "reponse": 1
  },
  {
    "id": "q2501",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Rome est la capitale de quel pays ?",
    "options": [
      "Grèce",
      "Tunisie",
      "Mauritanie",
      "Italie"
    ],
    "reponse": 3
  },
  {
    "id": "q2502",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 546 + 437 ?",
    "options": [
      "983",
      "986",
      "984",
      "980"
    ],
    "reponse": 0
  },
  {
    "id": "q2503",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quelle partie du cerveau est responsable de l'équilibre et de la coordination des mouvements ?",
    "options": [
      "Le cortex",
      "Le cervelet",
      "L'hippocampe",
      "Le thalamus"
    ],
    "reponse": 1
  },
  {
    "id": "q2504",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le plus grand organe du corps humain ?",
    "options": [
      "Le foie",
      "La peau",
      "Le cerveau",
      "L'intestin"
    ],
    "reponse": 1
  },
  {
    "id": "q2505",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Costa Rica ?",
    "options": [
      "Paramaribo",
      "San José",
      "Budapest",
      "Vienne"
    ],
    "reponse": 1
  },
  {
    "id": "q2506",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel roman de Franz Kafka met en scène un homme arrêté et jugé sans jamais connaître la nature de son crime ?",
    "options": [
      "Le Procès",
      "Le Château",
      "L'Amérique",
      "La Métamorphose"
    ],
    "reponse": 0
  },
  {
    "id": "q2507",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1227 et 1309 ?",
    "options": [
      "69",
      "82",
      "86",
      "91"
    ],
    "reponse": 1
  },
  {
    "id": "q2508",
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
    "id": "q2509",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Katmandou est la capitale de quel pays ?",
    "options": [
      "Colombie",
      "Myanmar",
      "Népal",
      "Érythrée"
    ],
    "reponse": 2
  },
  {
    "id": "q2510",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 149 - 78 ?",
    "options": [
      "73",
      "72",
      "69",
      "71"
    ],
    "reponse": 3
  },
  {
    "id": "q2511",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Samoa ?",
    "options": [
      "Océanie",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q2512",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo d'aventure met en scène un archéologue nommé Lara Croft ?",
    "options": [
      "Tomb Raider",
      "Prince of Persia",
      "Uncharted",
      "Indiana Jones"
    ],
    "reponse": 0
  },
  {
    "id": "q2513",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Victoria est la capitale de quel pays ?",
    "options": [
      "Trinité-et-Tobago",
      "Malte",
      "Malaisie",
      "Seychelles"
    ],
    "reponse": 3
  },
  {
    "id": "q2514",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Chez le paon, quelle est la fonction principale de l'impressionnante roue de plumes déployée par le mâle ?",
    "options": [
      "Séduire les femelles lors de la parade nuptiale",
      "Effrayer les rivaux uniquement",
      "Réguler sa température corporelle",
      "Se camoufler des prédateurs"
    ],
    "reponse": 0
  },
  {
    "id": "q2515",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle chanteuse française d'origine égyptienne est connue pour « Bambino » et « Il venait d'avoir 18 ans » ?",
    "options": [
      "Juliette Gréco",
      "Édith Piaf",
      "Barbara",
      "Dalida"
    ],
    "reponse": 3
  },
  {
    "id": "q2516",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Santiago est la capitale de quel pays ?",
    "options": [
      "Chili",
      "Inde",
      "Gabon",
      "Sénégal"
    ],
    "reponse": 0
  },
  {
    "id": "q2517",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCII en chiffres romains ?",
    "options": [
      "2692",
      "2702",
      "2701",
      "2704"
    ],
    "reponse": 1
  },
  {
    "id": "q2518",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Hf » ?",
    "options": [
      "Hafnium",
      "Fer",
      "Fluor",
      "Ytterbium"
    ],
    "reponse": 0
  },
  {
    "id": "q2519",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3078 en chiffres romains ?",
    "options": [
      "MMMLXVIII",
      "MMMLXXVIII",
      "MMMLXXIX",
      "MMMLXXXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q2520",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Comores ?",
    "options": [
      "Lima",
      "Dacca",
      "Moroni",
      "Budapest"
    ],
    "reponse": 2
  },
  {
    "id": "q2521",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Gabon ?",
    "options": [
      "Franc CFA",
      "Colon costaricain",
      "Livre syrienne",
      "Lev bulgare"
    ],
    "reponse": 0
  },
  {
    "id": "q2522",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel fleuve des Enfers grecs symbolise la frontière entre le monde des vivants et celui des morts ?",
    "options": [
      "Le Cocyte",
      "L'Achéron",
      "Le Styx",
      "Le Léthé"
    ],
    "reponse": 2
  },
  {
    "id": "q2523",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de s dans 23 min ?",
    "options": [
      "1325",
      "1495",
      "1380",
      "1168"
    ],
    "reponse": 2
  },
  {
    "id": "q2524",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel oiseau de proie est réputé pour sa vue exceptionnelle et chasse en plein jour ?",
    "options": [
      "Le vautour",
      "L'aigle",
      "Le hibou",
      "La chouette"
    ],
    "reponse": 1
  },
  {
    "id": "q2525",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cr » ?",
    "options": [
      "Thorium",
      "Fer",
      "Ruthénium",
      "Chrome"
    ],
    "reponse": 3
  },
  {
    "id": "q2526",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Le Rouge et le Noir » ?",
    "options": [
      "Stendhal",
      "Gustave Flaubert",
      "Honoré de Balzac",
      "Prosper Mérimée"
    ],
    "reponse": 0
  },
  {
    "id": "q2527",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1664 et 1740 ?",
    "options": [
      "75",
      "76",
      "66",
      "78"
    ],
    "reponse": 1
  },
  {
    "id": "q2528",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le rôle principal de la reine au sein d'une colonie de fourmis ou d'abeilles ?",
    "options": [
      "Pondre les œufs",
      "Défendre la colonie",
      "Construire le nid",
      "Chercher la nourriture"
    ],
    "reponse": 0
  },
  {
    "id": "q2529",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel romancier américain a écrit « Gatsby le Magnifique » ?",
    "options": [
      "F. Scott Fitzgerald",
      "William Faulkner",
      "John Steinbeck",
      "Ernest Hemingway"
    ],
    "reponse": 0
  },
  {
    "id": "q2530",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série met en scène des policiers et des trafiquants de drogue à Baltimore ?",
    "options": [
      "True Detective",
      "Homicide",
      "The Wire",
      "The Shield"
    ],
    "reponse": 2
  },
  {
    "id": "q2531",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de année(s) dans 48 mois ?",
    "options": [
      "2",
      "1",
      "6",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q2532",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Niger ?",
    "options": [
      "Niamey",
      "Amsterdam",
      "Bangkok",
      "San José"
    ],
    "reponse": 0
  },
  {
    "id": "q2533",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Athènes est la capitale de quel pays ?",
    "options": [
      "Biélorussie",
      "Botswana",
      "Grèce",
      "Monténégro"
    ],
    "reponse": 2
  },
  {
    "id": "q2534",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de jour(s) dans 11 semaine(s) ?",
    "options": [
      "89",
      "90",
      "77",
      "82"
    ],
    "reponse": 2
  },
  {
    "id": "q2535",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Norvège ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q2536",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Côte d'Ivoire ?",
    "options": [
      "Yamoussoukro",
      "Tripoli",
      "Addis-Abeba",
      "La Valette"
    ],
    "reponse": 0
  },
  {
    "id": "q2537",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 % de 1000 ?",
    "options": [
      "48",
      "50",
      "53",
      "43"
    ],
    "reponse": 1
  },
  {
    "id": "q2538",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Burkina Faso ?",
    "options": [
      "🇨🇭",
      "🇷🇼",
      "🇧🇫",
      "🇬🇼"
    ],
    "reponse": 2
  },
  {
    "id": "q2539",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 170 appartient à quel siècle ?",
    "options": [
      "3e siècle",
      "1e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2540",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Krypton ?",
    "options": [
      "Kr",
      "Ar",
      "N",
      "S"
    ],
    "reponse": 0
  },
  {
    "id": "q2541",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCXXXIX en chiffres romains ?",
    "options": [
      "1639",
      "1637",
      "1649",
      "1641"
    ],
    "reponse": 0
  },
  {
    "id": "q2542",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 × 8 ?",
    "options": [
      "34",
      "30",
      "32",
      "29"
    ],
    "reponse": 2
  },
  {
    "id": "q2543",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Irak ?",
    "options": [
      "Océanie",
      "Asie",
      "Afrique",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q2544",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2303 en chiffres romains ?",
    "options": [
      "MMCCCIV",
      "MMCCCIII",
      "MMCCCI",
      "MMCCCVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q2545",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Vanuatu ?",
    "options": [
      "Canberra",
      "Katmandou",
      "Naypyidaw",
      "Port-Vila"
    ],
    "reponse": 3
  },
  {
    "id": "q2546",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle boisson chaude est préparée à partir de grains torréfiés et moulus ?",
    "options": [
      "La chicorée",
      "Le thé",
      "Le café",
      "Le chocolat chaud"
    ],
    "reponse": 2
  },
  {
    "id": "q2547",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 50 ?",
    "options": [
      "6",
      "8",
      "4",
      "5"
    ],
    "reponse": 3
  },
  {
    "id": "q2548",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série télévisée met en scène des familles nobles s'affrontant dans un monde nommé Westeros ?",
    "options": [
      "Vikings",
      "Game of Thrones",
      "The Witcher",
      "The Last Kingdom"
    ],
    "reponse": 1
  },
  {
    "id": "q2549",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Jakarta est la capitale de quel pays ?",
    "options": [
      "Chine",
      "Somalie",
      "Indonésie",
      "Royaume-Uni"
    ],
    "reponse": 2
  },
  {
    "id": "q2550",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de Liverpool est composé de John Lennon, Paul McCartney, George Harrison et Ringo Starr ?",
    "options": [
      "The Beatles",
      "Herman's Hermits",
      "The Kinks",
      "The Hollies"
    ],
    "reponse": 0
  },
  {
    "id": "q2551",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle bataille de 1916, l'une des plus meurtrières du premier conflit mondial, s'est déroulée dans l'est de la France ?",
    "options": [
      "La bataille de Iéna",
      "La bataille de la Somme",
      "La bataille des Ardennes",
      "La bataille de Verdun"
    ],
    "reponse": 3
  },
  {
    "id": "q2552",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Kirghizstan",
      "Monténégro",
      "Espagne",
      "Haïti"
    ],
    "reponse": 3
  },
  {
    "id": "q2553",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Côte d'Ivoire ?",
    "options": [
      "Franc djiboutien",
      "Roupie népalaise",
      "Franc congolais",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q2554",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Saint-Marin ?",
    "options": [
      "Manat turkmène",
      "Cedi",
      "Som kirghize",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q2555",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série d'animation suit un jeune héros capable de maîtriser les quatre éléments pour rétablir la paix dans son monde ?",
    "options": [
      "Naruto",
      "La Légende de Korra",
      "Avatar, le dernier maître de l'air",
      "Le Roi Shaman"
    ],
    "reponse": 2
  },
  {
    "id": "q2556",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3703 en chiffres romains ?",
    "options": [
      "MMMDCXCVIII",
      "MMMDCCIII",
      "MMMDCCIV",
      "MMMDCCV"
    ],
    "reponse": 1
  },
  {
    "id": "q2557",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 476 - 354 ?",
    "options": [
      "122",
      "123",
      "125",
      "124"
    ],
    "reponse": 0
  },
  {
    "id": "q2558",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 × 4 ?",
    "options": [
      "23",
      "20",
      "24",
      "22"
    ],
    "reponse": 2
  },
  {
    "id": "q2559",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de rôle et d'action très exigeant, développé par From Software en collaboration avec un célèbre romancier de fantasy, est sorti en 2022 ?",
    "options": [
      "Dark Souls III",
      "Elden Ring",
      "Bloodborne",
      "Sekiro"
    ],
    "reponse": 1
  },
  {
    "id": "q2560",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 108000 s ?",
    "options": [
      "25",
      "30",
      "36",
      "32"
    ],
    "reponse": 1
  },
  {
    "id": "q2561",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel rapace nocturne est capable de voler presque sans bruit grâce à la structure particulière de ses plumes ?",
    "options": [
      "Le vautour",
      "L'aigle",
      "Le faucon",
      "Le hibou (ou la chouette)"
    ],
    "reponse": 3
  },
  {
    "id": "q2562",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Mercure ?",
    "options": [
      "Os",
      "Ne",
      "Cd",
      "Hg"
    ],
    "reponse": 3
  },
  {
    "id": "q2563",
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
    "id": "q2564",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 704 + 936 ?",
    "options": [
      "1637",
      "1640",
      "1642",
      "1638"
    ],
    "reponse": 1
  },
  {
    "id": "q2565",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Brunei ?",
    "options": [
      "Vaduz",
      "Bandar Seri Begawan",
      "Achgabat",
      "Lisbonne"
    ],
    "reponse": 1
  },
  {
    "id": "q2566",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1611 en chiffres romains ?",
    "options": [
      "MDCXXI",
      "MDCIX",
      "MDCX",
      "MDCXI"
    ],
    "reponse": 3
  },
  {
    "id": "q2567",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Chisinau est la capitale de quel pays ?",
    "options": [
      "Moldavie",
      "Eswatini",
      "Myanmar",
      "Thaïlande"
    ],
    "reponse": 0
  },
  {
    "id": "q2568",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dakar est la capitale de quel pays ?",
    "options": [
      "Sénégal",
      "République démocratique du Congo",
      "Maldives",
      "Haïti"
    ],
    "reponse": 0
  },
  {
    "id": "q2569",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel mouvement artistique décoratif, né à la fin du XIXe siècle, se caractérise par des lignes courbes inspirées des formes végétales ?",
    "options": [
      "L'Art déco",
      "Le Bauhaus",
      "L'Art nouveau",
      "Le baroque"
    ],
    "reponse": 2
  },
  {
    "id": "q2570",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Macédoine du Nord ?",
    "options": [
      "Afrique",
      "Europe",
      "Amérique du Sud",
      "Océanie"
    ],
    "reponse": 1
  },
  {
    "id": "q2571",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle est la déesse nordique de l'amour, de la beauté et de la fertilité ?",
    "options": [
      "Freyja",
      "Frigg",
      "Sif",
      "Idunn"
    ],
    "reponse": 0
  },
  {
    "id": "q2572",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Égypte ?",
    "options": [
      "Peso colombien",
      "Loti",
      "Livre égyptienne",
      "Dram"
    ],
    "reponse": 2
  },
  {
    "id": "q2573",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 197 + 749 ?",
    "options": [
      "948",
      "944",
      "946",
      "947"
    ],
    "reponse": 2
  },
  {
    "id": "q2574",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Bangladesh ?",
    "options": [
      "Port-au-Prince",
      "Dacca",
      "Addis-Abeba",
      "Oslo"
    ],
    "reponse": 1
  },
  {
    "id": "q2575",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 898 + 944 ?",
    "options": [
      "1840",
      "1842",
      "1841",
      "1839"
    ],
    "reponse": 1
  },
  {
    "id": "q2576",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle région désertique s'étend sur le sud-ouest des États-Unis et le nord du Mexique ?",
    "options": [
      "Le désert de Sonora",
      "Le désert de Chihuahua",
      "Le désert d'Atacama",
      "Le désert de Mojave"
    ],
    "reponse": 0
  },
  {
    "id": "q2577",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dili est la capitale de quel pays ?",
    "options": [
      "Vietnam",
      "Népal",
      "Suriname",
      "Timor oriental"
    ],
    "reponse": 3
  },
  {
    "id": "q2578",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 299 ÷ 13 ?",
    "options": [
      "21",
      "27",
      "23",
      "26"
    ],
    "reponse": 2
  },
  {
    "id": "q2579",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3005 en chiffres romains ?",
    "options": [
      "MMMX",
      "MMMIII",
      "MMMV",
      "MMM"
    ],
    "reponse": 2
  },
  {
    "id": "q2580",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCMXXVI en chiffres romains ?",
    "options": [
      "2924",
      "2926",
      "2931",
      "2921"
    ],
    "reponse": 1
  },
  {
    "id": "q2581",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 424 + 684 ?",
    "options": [
      "1105",
      "1109",
      "1111",
      "1108"
    ],
    "reponse": 3
  },
  {
    "id": "q2582",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle sauce française à base de jaune d'œuf et de beurre accompagne souvent les asperges ou le poisson ?",
    "options": [
      "La sauce béarnaise",
      "La sauce mornay",
      "La sauce hollandaise",
      "La sauce béchamel"
    ],
    "reponse": 2
  },
  {
    "id": "q2583",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇫 De quel pays est-ce le drapeau ?",
    "options": [
      "Corée du Sud",
      "Afghanistan",
      "Lesotho",
      "Bangladesh"
    ],
    "reponse": 1
  },
  {
    "id": "q2584",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "New Delhi est la capitale de quel pays ?",
    "options": [
      "Croatie",
      "Paraguay",
      "Inde",
      "Biélorussie"
    ],
    "reponse": 2
  },
  {
    "id": "q2585",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quelle récompense cinématographique suprême est décernée chaque année lors du festival de Cannes ?",
    "options": [
      "L'Ours d'or",
      "Le Lion d'or",
      "L'Oscar du meilleur film",
      "La Palme d'or"
    ],
    "reponse": 3
  },
  {
    "id": "q2586",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel gâteau traditionnel français est dégusté le jour de l'Épiphanie, contenant une fève ?",
    "options": [
      "La bûche de Noël",
      "La galette des rois",
      "Le gâteau des rois provençal",
      "Le kouglof"
    ],
    "reponse": 1
  },
  {
    "id": "q2587",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bratislava est la capitale de quel pays ?",
    "options": [
      "Slovaquie",
      "Espagne",
      "Botswana",
      "Sierra Leone"
    ],
    "reponse": 0
  },
  {
    "id": "q2588",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Soudan ?",
    "options": [
      "Khartoum",
      "Managua",
      "Tbilissi",
      "Alger"
    ],
    "reponse": 0
  },
  {
    "id": "q2589",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 718 en chiffres romains ?",
    "options": [
      "DCCVIII",
      "DCCXVIII",
      "DCCXVII",
      "DCCXXVIII"
    ],
    "reponse": 1
  },
  {
    "id": "q2590",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇾 De quel pays est-ce le drapeau ?",
    "options": [
      "Australie",
      "Malaisie",
      "Nouvelle-Zélande",
      "Guatemala"
    ],
    "reponse": 1
  },
  {
    "id": "q2591",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 9 × 14 ?",
    "options": [
      "121",
      "126",
      "119",
      "109"
    ],
    "reponse": 1
  },
  {
    "id": "q2592",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Maldives ?",
    "options": [
      "Denar macédonien",
      "Roupie indonésienne",
      "Rufiyaa",
      "Dinar koweïtien"
    ],
    "reponse": 2
  },
  {
    "id": "q2593",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 144 ÷ 8 ?",
    "options": [
      "19",
      "15",
      "18",
      "14"
    ],
    "reponse": 2
  },
  {
    "id": "q2594",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 625 ?",
    "options": [
      "24",
      "23",
      "25",
      "21"
    ],
    "reponse": 2
  },
  {
    "id": "q2595",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Chili ?",
    "options": [
      "Sofia",
      "Wellington",
      "Santiago",
      "Rome"
    ],
    "reponse": 2
  },
  {
    "id": "q2596",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Terbium ?",
    "options": [
      "Ni",
      "Tb",
      "Yb",
      "Ac"
    ],
    "reponse": 1
  },
  {
    "id": "q2597",
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
    "id": "q2598",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Algérie ?",
    "options": [
      "🇯🇴",
      "🇱🇦",
      "🇩🇿",
      "🇧🇦"
    ],
    "reponse": 2
  },
  {
    "id": "q2599",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 552 heure(s) ?",
    "options": [
      "26",
      "25",
      "23",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q2600",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇮 De quel pays est-ce le drapeau ?",
    "options": [
      "Turkménistan",
      "Liechtenstein",
      "Côte d'Ivoire",
      "Madagascar"
    ],
    "reponse": 2
  },
  {
    "id": "q2601",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Botswana ?",
    "options": [
      "Asie",
      "Afrique",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q2602",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Guinée",
      "Iran",
      "Yémen",
      "Corée du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q2603",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur français, surnommé « l'Idole des jeunes », est resté une icône du rock hexagonal pendant plus de 50 ans ?",
    "options": [
      "Sylvie Vartan",
      "Claude François",
      "Johnny Hallyday",
      "Eddy Mitchell"
    ],
    "reponse": 2
  },
  {
    "id": "q2604",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Canada ?",
    "options": [
      "Livre soudanaise",
      "Balboa",
      "Dollar canadien",
      "Franc comorien"
    ],
    "reponse": 2
  },
  {
    "id": "q2605",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 60 ÷ 3 ?",
    "options": [
      "21",
      "20",
      "24",
      "19"
    ],
    "reponse": 1
  },
  {
    "id": "q2606",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quelle campagne militaire de Napoléon en 1798 visait notamment à couper la route des Indes aux Britanniques ?",
    "options": [
      "La campagne d'Italie",
      "La campagne de Russie",
      "La campagne d'Espagne",
      "La campagne d'Égypte"
    ],
    "reponse": 3
  },
  {
    "id": "q2607",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Finlande ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Europe",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q2608",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 917 + 797 ?",
    "options": [
      "1715",
      "1712",
      "1711",
      "1714"
    ],
    "reponse": 3
  },
  {
    "id": "q2609",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel réalisateur est connu pour « Jurassic Park » et « E.T. » ?",
    "options": [
      "Steven Spielberg",
      "George Lucas",
      "James Cameron",
      "Martin Scorsese"
    ],
    "reponse": 0
  },
  {
    "id": "q2610",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Madagascar ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Europe",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q2611",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 30 année(s) ?",
    "options": [
      "360",
      "421",
      "375",
      "380"
    ],
    "reponse": 0
  },
  {
    "id": "q2612",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Germanium ?",
    "options": [
      "He",
      "Pu",
      "F",
      "Ge"
    ],
    "reponse": 3
  },
  {
    "id": "q2613",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Liechtenstein ?",
    "options": [
      "Océanie",
      "Afrique",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q2614",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle ville historique du Mali, ancien grand centre commercial et intellectuel, se trouve aux portes du Sahara ?",
    "options": [
      "Djenné",
      "Tombouctou",
      "Gao",
      "Ouagadougou"
    ],
    "reponse": 1
  },
  {
    "id": "q2615",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCCXL en chiffres romains ?",
    "options": [
      "1241",
      "1238",
      "1250",
      "1240"
    ],
    "reponse": 3
  },
  {
    "id": "q2616",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 11 année(s) ?",
    "options": [
      "123",
      "132",
      "140",
      "112"
    ],
    "reponse": 1
  },
  {
    "id": "q2617",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2458 en chiffres romains ?",
    "options": [
      "MMCDXLVIII",
      "MMCDLVIII",
      "MMCDLXVIII",
      "MMCDLXIII"
    ],
    "reponse": 1
  },
  {
    "id": "q2618",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Libye ?",
    "options": [
      "Tripoli",
      "Antananarivo",
      "Port-au-Prince",
      "Freetown"
    ],
    "reponse": 0
  },
  {
    "id": "q2619",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel groupe a sorti l'album culte « Rumours » en 1977 ?",
    "options": [
      "Eagles",
      "Toto",
      "Chicago",
      "Fleetwood Mac"
    ],
    "reponse": 3
  },
  {
    "id": "q2620",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat italien est une fine pâte garnie de tomate, mozzarella et basilic ?",
    "options": [
      "La bruschetta",
      "La calzone",
      "La focaccia",
      "La pizza margherita"
    ],
    "reponse": 3
  },
  {
    "id": "q2621",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 91 - 34 ?",
    "options": [
      "56",
      "60",
      "57",
      "54"
    ],
    "reponse": 2
  },
  {
    "id": "q2622",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1203 en chiffres romains ?",
    "options": [
      "MCCV",
      "MCCI",
      "MCCIII",
      "MCCII"
    ],
    "reponse": 2
  },
  {
    "id": "q2623",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film met en scène un homme qui revit la même journée en boucle ?",
    "options": [
      "La Vie est belle",
      "Un jour sans fin",
      "Click",
      "About Time"
    ],
    "reponse": 1
  },
  {
    "id": "q2624",
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
    "id": "q2625",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Bosnie-Herzégovine",
      "Suriname",
      "Ouzbékistan",
      "Maurice"
    ],
    "reponse": 0
  },
  {
    "id": "q2626",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bahreïn ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Afrique",
      "Europe"
    ],
    "reponse": 1
  },
  {
    "id": "q2627",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 844 + 102 ?",
    "options": [
      "944",
      "948",
      "946",
      "943"
    ],
    "reponse": 2
  },
  {
    "id": "q2628",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Asuncion est la capitale de quel pays ?",
    "options": [
      "Trinité-et-Tobago",
      "Algérie",
      "Nigeria",
      "Paraguay"
    ],
    "reponse": 3
  },
  {
    "id": "q2629",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quelle ville est surnommée la « Ville lumière » ?",
    "options": [
      "Rome",
      "New York",
      "Londres",
      "Paris"
    ],
    "reponse": 3
  },
  {
    "id": "q2630",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2867 en chiffres romains ?",
    "options": [
      "MMDCCCLXXVII",
      "MMDCCCLVII",
      "MMDCCCLXII",
      "MMDCCCLXVII"
    ],
    "reponse": 3
  },
  {
    "id": "q2631",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 200 ?",
    "options": [
      "26",
      "34",
      "35",
      "30"
    ],
    "reponse": 3
  },
  {
    "id": "q2632",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Grèce ?",
    "options": [
      "Athènes",
      "Windhoek",
      "Accra",
      "Mascate"
    ],
    "reponse": 0
  },
  {
    "id": "q2633",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel est le nom du premier ordinateur personnel grand public d'Apple, sorti en 1984 ?",
    "options": [
      "Le Lisa",
      "Le Macintosh",
      "L'iMac",
      "L'Apple II"
    ],
    "reponse": 1
  },
  {
    "id": "q2634",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 23 jour(s) ?",
    "options": [
      "556",
      "601",
      "552",
      "504"
    ],
    "reponse": 2
  },
  {
    "id": "q2635",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMLXXXV en chiffres romains ?",
    "options": [
      "2090",
      "2083",
      "2086",
      "2085"
    ],
    "reponse": 3
  },
  {
    "id": "q2636",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 584 en chiffres romains ?",
    "options": [
      "DLXXXV",
      "DLXXXIV",
      "DLXXXVI",
      "DLXXIX"
    ],
    "reponse": 1
  },
  {
    "id": "q2637",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie l'acronyme « IoT », très utilisé pour désigner l'électroménager, les montres ou les capteurs reliés à internet ?",
    "options": [
      "Internet Operating Terminal",
      "Internet of Things (Internet des objets)",
      "Input Output Technology",
      "Integrated Online Tool"
    ],
    "reponse": 1
  },
  {
    "id": "q2638",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Guyana ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Océanie",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q2639",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle région française est l'appellation d'origine exclusive du vin effervescent qui porte son nom ?",
    "options": [
      "La Bourgogne",
      "La Champagne",
      "L'Alsace",
      "La Provence"
    ],
    "reponse": 1
  },
  {
    "id": "q2640",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 300 ÷ 12 ?",
    "options": [
      "25",
      "26",
      "24",
      "28"
    ],
    "reponse": 0
  },
  {
    "id": "q2641",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu hindou de la destruction et de la transformation fait partie de la Trimurti avec Brahma et Vishnou ?",
    "options": [
      "Shiva",
      "Ganesh",
      "Indra",
      "Agni"
    ],
    "reponse": 0
  },
  {
    "id": "q2642",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3856 en chiffres romains ?",
    "options": [
      "MMMDCCCLVII",
      "MMMDCCCLXI",
      "MMMDCCCXLVI",
      "MMMDCCCLVI"
    ],
    "reponse": 3
  },
  {
    "id": "q2643",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain américain a écrit « Le Vieil Homme et la Mer » ?",
    "options": [
      "John Steinbeck",
      "F. Scott Fitzgerald",
      "Ernest Hemingway",
      "William Faulkner"
    ],
    "reponse": 2
  },
  {
    "id": "q2644",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Norvège ?",
    "options": [
      "Couronne norvégienne",
      "Kyat",
      "Guarani",
      "Peso dominicain"
    ],
    "reponse": 0
  },
  {
    "id": "q2645",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain allemand est l'auteur de « Faust », récit d'un pacte avec le diable ?",
    "options": [
      "Johann Wolfgang von Goethe",
      "Thomas Mann",
      "Heinrich Heine",
      "Friedrich Schiller"
    ],
    "reponse": 0
  },
  {
    "id": "q2646",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 ÷ 3 ?",
    "options": [
      "2",
      "5",
      "3",
      "4"
    ],
    "reponse": 3
  },
  {
    "id": "q2647",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien d'épreuves d'athlétisme compose le décathlon masculin ?",
    "options": [
      "12",
      "7",
      "10",
      "8"
    ],
    "reponse": 2
  },
  {
    "id": "q2648",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 267 - 95 ?",
    "options": [
      "169",
      "173",
      "170",
      "172"
    ],
    "reponse": 3
  },
  {
    "id": "q2649",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel événement de 1773, dans un port de la côte est américaine, a vu des colons jeter des cargaisons à l'eau pour protester contre des taxes britanniques ?",
    "options": [
      "Le massacre de Boston",
      "La Boston Tea Party",
      "Le siège de Boston",
      "La marche du sel"
    ],
    "reponse": 1
  },
  {
    "id": "q2650",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu nordique est associé au tonnerre et manie un marteau nommé Mjöllnir ?",
    "options": [
      "Loki",
      "Odin",
      "Baldr",
      "Thor"
    ],
    "reponse": 3
  },
  {
    "id": "q2651",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1739 et 1998 ?",
    "options": [
      "228",
      "259",
      "262",
      "243"
    ],
    "reponse": 1
  },
  {
    "id": "q2652",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays a pour capitale Berne, bien que ce ne soit pas sa plus grande ville ?",
    "options": [
      "La Suisse",
      "Les Pays-Bas",
      "L'Autriche",
      "La Belgique"
    ],
    "reponse": 0
  },
  {
    "id": "q2653",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle agglomération est considérée comme la plus peuplée du monde, avec l'aire urbaine la plus vaste ?",
    "options": [
      "Delhi",
      "Mexico",
      "Tokyo",
      "Shanghai"
    ],
    "reponse": 2
  },
  {
    "id": "q2654",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 932 + 493 ?",
    "options": [
      "1426",
      "1425",
      "1423",
      "1428"
    ],
    "reponse": 1
  },
  {
    "id": "q2655",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel ensemble de films de super-héros interconnectés, réunissant Iron Man, Thor et les Avengers, forme une continuité partagée depuis 2008 ?",
    "options": [
      "L'Univers cinématographique Marvel (MCU)",
      "Le DC Extended Universe",
      "L'univers X-Men classique",
      "L'univers Star Wars"
    ],
    "reponse": 0
  },
  {
    "id": "q2656",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Nigeria ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q2657",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel duo de chercheurs a découvert la structure en double hélice de l'ADN en 1953 ?",
    "options": [
      "Watson et Crick",
      "Pasteur et Koch",
      "Bohr et Rutherford",
      "Curie et Becquerel"
    ],
    "reponse": 0
  },
  {
    "id": "q2658",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 1380 min ?",
    "options": [
      "26",
      "23",
      "22",
      "21"
    ],
    "reponse": 1
  },
  {
    "id": "q2659",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 19 jour(s) ?",
    "options": [
      "503",
      "481",
      "456",
      "437"
    ],
    "reponse": 2
  },
  {
    "id": "q2660",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Cuba ?",
    "options": [
      "Shilling somalien",
      "Peso cubain",
      "Kwacha malawite",
      "Leu moldave"
    ],
    "reponse": 1
  },
  {
    "id": "q2661",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 ÷ 4 ?",
    "options": [
      "1",
      "5",
      "6",
      "3"
    ],
    "reponse": 3
  },
  {
    "id": "q2662",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat coréen consiste en du chou fermenté et épicé, servi en accompagnement ?",
    "options": [
      "Le kimchi",
      "Le bibimbap",
      "Le tteokbokki",
      "Le bulgogi"
    ],
    "reponse": 0
  },
  {
    "id": "q2663",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Guinée équatoriale ?",
    "options": [
      "🇳🇴",
      "🇫🇷",
      "🇬🇶",
      "🇹🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q2664",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1610 et 1704 ?",
    "options": [
      "77",
      "94",
      "104",
      "87"
    ],
    "reponse": 1
  },
  {
    "id": "q2665",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 15 au carré ?",
    "options": [
      "207",
      "225",
      "250",
      "201"
    ],
    "reponse": 1
  },
  {
    "id": "q2666",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Yémen ?",
    "options": [
      "Athènes",
      "Mascate",
      "Sanaa",
      "La Valette"
    ],
    "reponse": 2
  },
  {
    "id": "q2667",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Colombie ?",
    "options": [
      "Bogota",
      "Stockholm",
      "Abuja",
      "Bangkok"
    ],
    "reponse": 0
  },
  {
    "id": "q2668",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇼 De quel pays est-ce le drapeau ?",
    "options": [
      "Bosnie-Herzégovine",
      "Maldives",
      "Botswana",
      "Émirats arabes unis"
    ],
    "reponse": 2
  },
  {
    "id": "q2669",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle déesse égyptienne du ciel est représentée avalant le soleil chaque soir ?",
    "options": [
      "Hathor",
      "Bastet",
      "Isis",
      "Nout"
    ],
    "reponse": 3
  },
  {
    "id": "q2670",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Guinée équatoriale ?",
    "options": [
      "Malabo",
      "Tegucigalpa",
      "Gaborone",
      "Wellington"
    ],
    "reponse": 0
  },
  {
    "id": "q2671",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 × 18 ?",
    "options": [
      "183",
      "173",
      "198",
      "180"
    ],
    "reponse": 3
  },
  {
    "id": "q2672",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quelle méthode de production du champagne implique une seconde fermentation directement en bouteille ?",
    "options": [
      "La méthode ancestrale",
      "La méthode Charmat",
      "La macération carbonique",
      "La méthode traditionnelle"
    ],
    "reponse": 3
  },
  {
    "id": "q2673",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 72 ÷ 4 ?",
    "options": [
      "20",
      "18",
      "19",
      "15"
    ],
    "reponse": 1
  },
  {
    "id": "q2674",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel insecte est connu pour sa métamorphose spectaculaire, de chenille à adulte ailé ?",
    "options": [
      "La sauterelle",
      "Le papillon",
      "La coccinelle",
      "La libellule"
    ],
    "reponse": 1
  },
  {
    "id": "q2675",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇭 De quel pays est-ce le drapeau ?",
    "options": [
      "Bahreïn",
      "Cameroun",
      "Maroc",
      "Équateur"
    ],
    "reponse": 0
  },
  {
    "id": "q2676",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle technique de natation, où les bras alternent au-dessus de l'eau, est considérée comme la plus rapide en compétition ?",
    "options": [
      "La brasse",
      "Le crawl (nage libre)",
      "Le papillon",
      "Le dos crawlé"
    ],
    "reponse": 1
  },
  {
    "id": "q2677",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇶 De quel pays est-ce le drapeau ?",
    "options": [
      "Guinée équatoriale",
      "Portugal",
      "Comores",
      "Irak"
    ],
    "reponse": 3
  },
  {
    "id": "q2678",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 328 + 482 ?",
    "options": [
      "813",
      "810",
      "808",
      "807"
    ],
    "reponse": 1
  },
  {
    "id": "q2679",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel film d'Alfred Hitchcock met en scène un homme sujet au vertige, obsédé par une femme qu'il croit morte ?",
    "options": [
      "Pas de printemps pour Marnie",
      "La Mort aux trousses",
      "Sueurs froides",
      "Fenêtre sur cour"
    ],
    "reponse": 2
  },
  {
    "id": "q2680",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays compte le plus d'habitants au monde en 2024 ?",
    "options": [
      "L'Inde",
      "La Chine",
      "Les États-Unis",
      "L'Indonésie"
    ],
    "reponse": 0
  },
  {
    "id": "q2681",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 170 en chiffres romains ?",
    "options": [
      "CLXX",
      "CLX",
      "CLXV",
      "CLXXX"
    ],
    "reponse": 0
  },
  {
    "id": "q2682",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCXLII en chiffres romains ?",
    "options": [
      "2137",
      "2144",
      "2132",
      "2142"
    ],
    "reponse": 3
  },
  {
    "id": "q2683",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Yémen ?",
    "options": [
      "🇦🇩",
      "🇾🇪",
      "🇩🇯",
      "🇱🇺"
    ],
    "reponse": 1
  },
  {
    "id": "q2684",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle est la plus grande île du monde ?",
    "options": [
      "Madagascar",
      "La Nouvelle-Guinée",
      "Le Groenland",
      "Bornéo"
    ],
    "reponse": 2
  },
  {
    "id": "q2685",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1881 appartient à quel siècle ?",
    "options": [
      "18e siècle",
      "17e siècle",
      "20e siècle",
      "19e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q2686",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 440 + 20 ?",
    "options": [
      "457",
      "462",
      "460",
      "458"
    ],
    "reponse": 2
  },
  {
    "id": "q2687",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 18 × 19 ?",
    "options": [
      "343",
      "342",
      "361",
      "325"
    ],
    "reponse": 1
  },
  {
    "id": "q2688",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Lituanie ?",
    "options": [
      "Rial omanais",
      "Dong",
      "Euro",
      "Dollar guyanien"
    ],
    "reponse": 2
  },
  {
    "id": "q2689",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de m dans 28 km ?",
    "options": [
      "28000",
      "25291",
      "30055",
      "27576"
    ],
    "reponse": 0
  },
  {
    "id": "q2690",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Malte ?",
    "options": [
      "🇰🇷",
      "🇪🇬",
      "🇲🇹",
      "🇸🇩"
    ],
    "reponse": 2
  },
  {
    "id": "q2691",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Malte ?",
    "options": [
      "Skopje",
      "Buenos Aires",
      "La Valette",
      "Kingston"
    ],
    "reponse": 2
  },
  {
    "id": "q2692",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Niger ?",
    "options": [
      "🇯🇲",
      "🇨🇺",
      "🇳🇪",
      "🇦🇺"
    ],
    "reponse": 2
  },
  {
    "id": "q2693",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est composé de plus de 17 000 îles en Asie du Sud-Est ?",
    "options": [
      "L'Indonésie",
      "Les Philippines",
      "La Malaisie",
      "La Thaïlande"
    ],
    "reponse": 0
  },
  {
    "id": "q2694",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 701 + 369 ?",
    "options": [
      "1070",
      "1069",
      "1071",
      "1067"
    ],
    "reponse": 0
  },
  {
    "id": "q2695",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Croatie ?",
    "options": [
      "🇮🇩",
      "🇬🇹",
      "🇧🇫",
      "🇭🇷"
    ],
    "reponse": 3
  },
  {
    "id": "q2696",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vientiane est la capitale de quel pays ?",
    "options": [
      "Maroc",
      "Comores",
      "Yémen",
      "Laos"
    ],
    "reponse": 3
  },
  {
    "id": "q2697",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 27000 mm ?",
    "options": [
      "27",
      "33",
      "26",
      "21"
    ],
    "reponse": 0
  },
  {
    "id": "q2698",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Chili ?",
    "options": [
      "Peso chilien",
      "Shilling somalien",
      "Balboa",
      "Dollar barbadien"
    ],
    "reponse": 0
  },
  {
    "id": "q2699",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel plombier moustachu est le héros de nombreux jeux Nintendo ?",
    "options": [
      "Yoshi",
      "Mario",
      "Wario",
      "Luigi"
    ],
    "reponse": 1
  },
  {
    "id": "q2700",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2294 en chiffres romains ?",
    "options": [
      "MMCCXCII",
      "MMCCLXXXIV",
      "MMCCCIV",
      "MMCCXCIV"
    ],
    "reponse": 3
  },
  {
    "id": "q2701",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Yb » ?",
    "options": [
      "Fluor",
      "Technétium",
      "Neptunium",
      "Ytterbium"
    ],
    "reponse": 3
  },
  {
    "id": "q2702",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ar » ?",
    "options": [
      "Carbone",
      "Yttrium",
      "Argon",
      "Francium"
    ],
    "reponse": 2
  },
  {
    "id": "q2703",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Mauritanie ?",
    "options": [
      "🇭🇷",
      "🇲🇷",
      "🇱🇾",
      "🇦🇴"
    ],
    "reponse": 1
  },
  {
    "id": "q2704",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Émirats arabes unis ?",
    "options": [
      "🇹🇲",
      "🇸🇻",
      "🇻🇪",
      "🇦🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q2705",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Guinée ?",
    "options": [
      "Conakry",
      "Dodoma",
      "Dili",
      "Dublin"
    ],
    "reponse": 0
  },
  {
    "id": "q2706",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Islande ?",
    "options": [
      "Amérique du Sud",
      "Océanie",
      "Afrique",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q2707",
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
    "id": "q2708",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Fidji ?",
    "options": [
      "Dollar fidjien",
      "Roupie pakistanaise",
      "Dollar surinamais",
      "Dong"
    ],
    "reponse": 0
  },
  {
    "id": "q2709",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Cap-Vert ?",
    "options": [
      "Amérique du Nord",
      "Océanie",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q2710",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDCCXLV en chiffres romains ?",
    "options": [
      "1744",
      "1735",
      "1740",
      "1745"
    ],
    "reponse": 3
  },
  {
    "id": "q2711",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel traité de 1957 a fondé la Communauté économique européenne, ancêtre de l'Union européenne ?",
    "options": [
      "Le traité de Rome",
      "Le traité de Paris",
      "Le traité de Lisbonne",
      "Le traité de Maastricht"
    ],
    "reponse": 0
  },
  {
    "id": "q2712",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 768 + 119 ?",
    "options": [
      "890",
      "888",
      "886",
      "887"
    ],
    "reponse": 3
  },
  {
    "id": "q2713",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Eswatini ?",
    "options": [
      "🇹🇭",
      "🇦🇹",
      "🇽🇰",
      "🇸🇿"
    ],
    "reponse": 3
  },
  {
    "id": "q2714",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇹🇯 De quel pays est-ce le drapeau ?",
    "options": [
      "Suisse",
      "Tadjikistan",
      "Libye",
      "Saint-Marin"
    ],
    "reponse": 1
  },
  {
    "id": "q2715",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel récipient, ouvert par curiosité, a libéré tous les maux de l'humanité selon le mythe grec, ne laissant que l'espérance à l'intérieur ?",
    "options": [
      "L'urne d'Hestia",
      "Le coffre de Prométhée",
      "La boîte de Pandore",
      "Le vase d'Héra"
    ],
    "reponse": 2
  },
  {
    "id": "q2716",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel opticien néerlandais est crédité de l'invention de la première lunette astronomique, perfectionnée ensuite par Galilée ?",
    "options": [
      "Johannes Kepler",
      "Hans Lippershey",
      "Antonie van Leeuwenhoek",
      "Christiaan Huygens"
    ],
    "reponse": 1
  },
  {
    "id": "q2717",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Serbie ?",
    "options": [
      "🇵🇱",
      "🇷🇸",
      "🇧🇪",
      "🇲🇨"
    ],
    "reponse": 1
  },
  {
    "id": "q2718",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Norvège ?",
    "options": [
      "🇲🇬",
      "🇲🇰",
      "🇳🇴",
      "🇬🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q2719",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Bismuth ?",
    "options": [
      "Bi",
      "Se",
      "Y",
      "Ca"
    ],
    "reponse": 0
  },
  {
    "id": "q2720",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Jamaïque ?",
    "options": [
      "Bratislava",
      "Niamey",
      "Kingston",
      "Abuja"
    ],
    "reponse": 2
  },
  {
    "id": "q2721",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Paraguay ?",
    "options": [
      "🇧🇯",
      "🇷🇴",
      "🇨🇻",
      "🇵🇾"
    ],
    "reponse": 3
  },
  {
    "id": "q2722",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Jordanie",
      "Nigeria",
      "Singapour",
      "Namibie"
    ],
    "reponse": 3
  },
  {
    "id": "q2723",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz est le principal responsable de l'effet de serre d'origine humaine ?",
    "options": [
      "Le méthane uniquement",
      "L'azote",
      "Le dioxyde de carbone",
      "L'oxygène"
    ],
    "reponse": 2
  },
  {
    "id": "q2724",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel musicien grec est descendu aux Enfers pour tenter de ramener son épouse défunte, Eurydice ?",
    "options": [
      "Thésée",
      "Ulysse",
      "Héraclès",
      "Orphée"
    ],
    "reponse": 3
  },
  {
    "id": "q2725",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Quelle est la tenue traditionnellement exigée des joueurs sur les courts du tournoi de Wimbledon ?",
    "options": [
      "Une tenue entièrement blanche",
      "Une tenue libre",
      "Une tenue aux couleurs du club",
      "Une tenue noire"
    ],
    "reponse": 0
  },
  {
    "id": "q2726",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Autriche",
      "Guinée-Bissau",
      "Mali",
      "Belgique"
    ],
    "reponse": 0
  },
  {
    "id": "q2727",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de plateforme met en scène un hérisson qui collecte des anneaux dorés ?",
    "options": [
      "Kirby",
      "Mega Man",
      "Sonic the Hedgehog",
      "Mario"
    ],
    "reponse": 2
  },
  {
    "id": "q2728",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays domine traditionnellement le tennis de table au niveau mondial ?",
    "options": [
      "Le Japon",
      "La Chine",
      "La Corée du Sud",
      "L'Allemagne"
    ],
    "reponse": 1
  },
  {
    "id": "q2729",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de kg dans 21 t ?",
    "options": [
      "21000",
      "17609",
      "21964",
      "24003"
    ],
    "reponse": 0
  },
  {
    "id": "q2730",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne le Dr Indiana Jones ?",
    "options": [
      "Michael Douglas",
      "Harrison Ford",
      "Kurt Russell",
      "Tom Selleck"
    ],
    "reponse": 1
  },
  {
    "id": "q2731",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Si » ?",
    "options": [
      "Tantale",
      "Phosphore",
      "Béryllium",
      "Silicium"
    ],
    "reponse": 3
  },
  {
    "id": "q2732",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Mexico est la capitale de quel pays ?",
    "options": [
      "Samoa",
      "Yémen",
      "Mexique",
      "Vietnam"
    ],
    "reponse": 2
  },
  {
    "id": "q2733",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Georgetown est la capitale de quel pays ?",
    "options": [
      "Guyana",
      "Canada",
      "Pologne",
      "Yémen"
    ],
    "reponse": 0
  },
  {
    "id": "q2734",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Cambodge ?",
    "options": [
      "Phnom Penh",
      "Oslo",
      "Canberra",
      "Mascate"
    ],
    "reponse": 0
  },
  {
    "id": "q2735",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des braqueurs de haute technologie en France, adaptée en plusieurs saisons Netflix, centrée sur le Louvre ?",
    "options": [
      "Le Bureau des Légendes",
      "La Casa de Papel",
      "Lupin",
      "Vernon Subutex"
    ],
    "reponse": 2
  },
  {
    "id": "q2736",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Mbabane est la capitale de quel pays ?",
    "options": [
      "Eswatini",
      "Biélorussie",
      "Trinité-et-Tobago",
      "Haïti"
    ],
    "reponse": 0
  },
  {
    "id": "q2737",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle actrice a incarné Katniss Everdeen dans « Hunger Games » ?",
    "options": [
      "Shailene Woodley",
      "Emma Stone",
      "Kristen Stewart",
      "Jennifer Lawrence"
    ],
    "reponse": 3
  },
  {
    "id": "q2738",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Iran ?",
    "options": [
      "🇲🇰",
      "🇻🇳",
      "🇮🇷",
      "🇺🇿"
    ],
    "reponse": 2
  },
  {
    "id": "q2739",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sofia est la capitale de quel pays ?",
    "options": [
      "Danemark",
      "Pologne",
      "Bulgarie",
      "Kenya"
    ],
    "reponse": 2
  },
  {
    "id": "q2740",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série de l'univers Star Wars suit un chasseur de primes solitaire protégeant un mystérieux enfant vert ?",
    "options": [
      "The Mandalorian",
      "Ahsoka",
      "Le Livre de Boba Fett",
      "Andor"
    ],
    "reponse": 0
  },
  {
    "id": "q2741",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 9 ?",
    "options": [
      "0",
      "1",
      "3",
      "6"
    ],
    "reponse": 2
  },
  {
    "id": "q2742",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Belize ?",
    "options": [
      "Loti",
      "Hryvnia",
      "Franc rwandais",
      "Dollar bélizien"
    ],
    "reponse": 3
  },
  {
    "id": "q2743",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Kr » ?",
    "options": [
      "Hafnium",
      "Lanthane",
      "Krypton",
      "Chrome"
    ],
    "reponse": 2
  },
  {
    "id": "q2744",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Suriname ?",
    "options": [
      "Canberra",
      "Naypyidaw",
      "Paramaribo",
      "Kinshasa"
    ],
    "reponse": 2
  },
  {
    "id": "q2745",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 746 + 824 ?",
    "options": [
      "1568",
      "1571",
      "1573",
      "1570"
    ],
    "reponse": 3
  },
  {
    "id": "q2746",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre est célèbre pour ses tournesols et ses champs de blé peints en Provence ?",
    "options": [
      "Paul Gauguin",
      "Paul Cézanne",
      "Vincent van Gogh",
      "Henri Matisse"
    ],
    "reponse": 2
  },
  {
    "id": "q2747",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle boisson japonaise traditionnelle est obtenue par fermentation du riz ?",
    "options": [
      "Le mirin",
      "Le saké",
      "Le shochu",
      "Le soju"
    ],
    "reponse": 1
  },
  {
    "id": "q2748",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Venezuela ?",
    "options": [
      "🇬🇧",
      "🇯🇴",
      "🇧🇦",
      "🇻🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q2749",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Guinée équatoriale ?",
    "options": [
      "Lari",
      "Dinar serbe",
      "Peso philippin",
      "Franc CFA"
    ],
    "reponse": 3
  },
  {
    "id": "q2750",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du magasin d'applications d'Apple ?",
    "options": [
      "App Store",
      "Play Store",
      "Windows Store",
      "Galaxy Store"
    ],
    "reponse": 0
  },
  {
    "id": "q2751",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de France ?",
    "options": [
      "🇫🇷",
      "🇲🇹",
      "🇸🇲",
      "🇾🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q2752",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 420 ÷ 14 ?",
    "options": [
      "33",
      "31",
      "30",
      "28"
    ],
    "reponse": 2
  },
  {
    "id": "q2753",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Bénin",
      "Brunei",
      "Congo",
      "Costa Rica"
    ],
    "reponse": 1
  },
  {
    "id": "q2754",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Chypre ?",
    "options": [
      "Lari",
      "Manat turkmène",
      "Franc congolais",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q2755",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCV en chiffres romains ?",
    "options": [
      "2695",
      "2703",
      "2715",
      "2705"
    ],
    "reponse": 3
  },
  {
    "id": "q2756",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇮🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Belgique",
      "Iran",
      "Kosovo",
      "Portugal"
    ],
    "reponse": 1
  },
  {
    "id": "q2757",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Achgabat est la capitale de quel pays ?",
    "options": [
      "Népal",
      "Turkménistan",
      "Inde",
      "Estonie"
    ],
    "reponse": 1
  },
  {
    "id": "q2758",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCXXXIV en chiffres romains ?",
    "options": [
      "3136",
      "3134",
      "3133",
      "3129"
    ],
    "reponse": 1
  },
  {
    "id": "q2759",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3769 en chiffres romains ?",
    "options": [
      "MMMDCCLXXI",
      "MMMDCCLXVIII",
      "MMMDCCLXIX",
      "MMMDCCLXIV"
    ],
    "reponse": 2
  },
  {
    "id": "q2760",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 821 + 354 ?",
    "options": [
      "1172",
      "1175",
      "1177",
      "1173"
    ],
    "reponse": 1
  },
  {
    "id": "q2761",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 30 ÷ 2 ?",
    "options": [
      "15",
      "12",
      "16",
      "13"
    ],
    "reponse": 0
  },
  {
    "id": "q2762",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Oman ?",
    "options": [
      "🇴🇲",
      "🇬🇪",
      "🇬🇦",
      "🇱🇻"
    ],
    "reponse": 0
  },
  {
    "id": "q2763",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Dans quel sport utilise-t-on un filet, une raquette et un volant ?",
    "options": [
      "Le tennis",
      "Le badminton",
      "Le tennis de table",
      "Le squash"
    ],
    "reponse": 1
  },
  {
    "id": "q2764",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Guinée-Bissau",
      "Kosovo",
      "Mozambique",
      "Fidji"
    ],
    "reponse": 2
  },
  {
    "id": "q2765",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Le Petit Chaperon rouge » et « Cendrillon » sous forme de contes ?",
    "options": [
      "Les frères Grimm",
      "Charles Perrault",
      "Jean de La Fontaine",
      "Andersen"
    ],
    "reponse": 1
  },
  {
    "id": "q2766",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat libanais est une salade à base de persil, boulgour, tomate et menthe ?",
    "options": [
      "Le taboulé",
      "Le fattouche",
      "Le houmous",
      "Le falafel"
    ],
    "reponse": 0
  },
  {
    "id": "q2767",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MDXCIX en chiffres romains ?",
    "options": [
      "1601",
      "1598",
      "1599",
      "1589"
    ],
    "reponse": 2
  },
  {
    "id": "q2768",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 40 siècle(s) ?",
    "options": [
      "3419",
      "4225",
      "4000",
      "3726"
    ],
    "reponse": 2
  },
  {
    "id": "q2769",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Cameroun ?",
    "options": [
      "🇭🇳",
      "🇳🇦",
      "🇳🇴",
      "🇨🇲"
    ],
    "reponse": 3
  },
  {
    "id": "q2770",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Thulium ?",
    "options": [
      "Cu",
      "Tm",
      "Fr",
      "Fe"
    ],
    "reponse": 1
  },
  {
    "id": "q2771",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le plus grand animal terrestre actuel ?",
    "options": [
      "La girafe",
      "L'éléphant d'Afrique",
      "L'hippopotame",
      "Le rhinocéros"
    ],
    "reponse": 1
  },
  {
    "id": "q2772",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel dieu aztèque, représenté sous la forme d'un serpent à plumes, est associé à la sagesse et au vent ?",
    "options": [
      "Tlaloc",
      "Quetzalcoatl",
      "Tezcatlipoca",
      "Huitzilopochtli"
    ],
    "reponse": 1
  },
  {
    "id": "q2773",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "République tchèque",
      "Iran",
      "Brésil",
      "Royaume-Uni"
    ],
    "reponse": 2
  },
  {
    "id": "q2774",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur, leader de Nirvana, est décédé en 1994 et reste une icône du grunge ?",
    "options": [
      "Layne Staley",
      "Chris Cornell",
      "Eddie Vedder",
      "Kurt Cobain"
    ],
    "reponse": 3
  },
  {
    "id": "q2775",
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
    "id": "q2776",
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
    "id": "q2777",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays organise traditionnellement le Super Bowl, finale du football américain ?",
    "options": [
      "Le Canada",
      "Le Royaume-Uni",
      "Le Mexique",
      "Les États-Unis"
    ],
    "reponse": 3
  },
  {
    "id": "q2778",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français est composé de pâte à choux garnie de crème et glacée au chocolat, en forme allongée ?",
    "options": [
      "L'éclair",
      "Le religieuse",
      "Le paris-brest",
      "Le mille-feuille"
    ],
    "reponse": 0
  },
  {
    "id": "q2779",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Portugal ?",
    "options": [
      "🇻🇺",
      "🇵🇹",
      "🇦🇩",
      "🇦🇱"
    ],
    "reponse": 1
  },
  {
    "id": "q2780",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Liberia ?",
    "options": [
      "Gourde",
      "Couronne norvégienne",
      "Dollar libérien",
      "Kina"
    ],
    "reponse": 2
  },
  {
    "id": "q2781",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "🇪🇷",
      "🇵🇬",
      "🇿🇲",
      "🇲🇻"
    ],
    "reponse": 1
  },
  {
    "id": "q2782",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Combien d'heures par jour un koala passe-t-il en moyenne à dormir ?",
    "options": [
      "Environ 20 heures",
      "Environ 12 heures",
      "Environ 4 heures",
      "Environ 8 heures"
    ],
    "reponse": 0
  },
  {
    "id": "q2783",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CDLXXXIII en chiffres romains ?",
    "options": [
      "482",
      "493",
      "483",
      "481"
    ],
    "reponse": 2
  },
  {
    "id": "q2784",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 728 + 238 ?",
    "options": [
      "963",
      "969",
      "966",
      "967"
    ],
    "reponse": 2
  },
  {
    "id": "q2785",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Pérou ?",
    "options": [
      "🇸🇱",
      "🇻🇪",
      "🇸🇾",
      "🇵🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q2786",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Haïti",
      "Namibie",
      "Danemark",
      "Inde"
    ],
    "reponse": 2
  },
  {
    "id": "q2787",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film du studio Ghibli met en scène une fillette qui doit travailler dans les bains d'un monde des esprits pour sauver ses parents transformés en cochons ?",
    "options": [
      "Le Château ambulant",
      "Mon voisin Totoro",
      "Princesse Mononoké",
      "Le Voyage de Chihiro"
    ],
    "reponse": 3
  },
  {
    "id": "q2788",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Quel nombre représente XC en chiffres romains ?",
    "options": [
      "88",
      "90",
      "85",
      "100"
    ],
    "reponse": 1
  },
  {
    "id": "q2789",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de heure(s) dans 5 jour(s) ?",
    "options": [
      "140",
      "134",
      "120",
      "113"
    ],
    "reponse": 2
  },
  {
    "id": "q2790",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1962 et 1980 ?",
    "options": [
      "17",
      "18",
      "20",
      "23"
    ],
    "reponse": 1
  },
  {
    "id": "q2791",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est l'unité de mesure de la force dans le Système international ?",
    "options": [
      "Le joule",
      "Le pascal",
      "Le newton",
      "Le watt"
    ],
    "reponse": 2
  },
  {
    "id": "q2792",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel est le plus grand lac d'eau douce du monde en superficie ?",
    "options": [
      "Le lac Supérieur",
      "Le lac Baïkal",
      "Le lac Victoria",
      "La mer Caspienne"
    ],
    "reponse": 0
  },
  {
    "id": "q2793",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Dans quel sport utilise-t-on le terme « smash » pour un coup offensif puissant ?",
    "options": [
      "Le tennis uniquement",
      "Le tennis et le badminton",
      "Le volley-ball uniquement",
      "Le squash uniquement"
    ],
    "reponse": 1
  },
  {
    "id": "q2794",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel monstre mi-homme mi-taureau vivait dans le labyrinthe de Crète ?",
    "options": [
      "Le Cyclope",
      "Le Sphinx",
      "Le Minotaure",
      "Cerbère"
    ],
    "reponse": 2
  },
  {
    "id": "q2795",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 23 m ?",
    "options": [
      "23305",
      "21735",
      "23000",
      "19856"
    ],
    "reponse": 2
  },
  {
    "id": "q2796",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Tunisie ?",
    "options": [
      "Belgrade",
      "Bridgetown",
      "Tunis",
      "Achgabat"
    ],
    "reponse": 2
  },
  {
    "id": "q2797",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 112 ÷ 8 ?",
    "options": [
      "11",
      "16",
      "17",
      "14"
    ],
    "reponse": 3
  },
  {
    "id": "q2798",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel supersoldat casqué est le héros de la saga de jeux vidéo « Halo » ?",
    "options": [
      "Doom Guy",
      "Marcus Fenix",
      "Isaac Clarke",
      "Master Chief"
    ],
    "reponse": 3
  },
  {
    "id": "q2799",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 567 - 64 ?",
    "options": [
      "503",
      "502",
      "504",
      "506"
    ],
    "reponse": 0
  },
  {
    "id": "q2800",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Chypre ?",
    "options": [
      "Tripoli",
      "Nairobi",
      "Nicosie",
      "Antananarivo"
    ],
    "reponse": 2
  },
  {
    "id": "q2801",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1836 appartient à quel siècle ?",
    "options": [
      "20e siècle",
      "17e siècle",
      "19e siècle",
      "18e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2802",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 81 ?",
    "options": [
      "8",
      "7",
      "12",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q2803",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 90 ÷ 9 ?",
    "options": [
      "8",
      "10",
      "12",
      "13"
    ],
    "reponse": 1
  },
  {
    "id": "q2804",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Carbone ?",
    "options": [
      "U",
      "C",
      "Po",
      "Hf"
    ],
    "reponse": 1
  },
  {
    "id": "q2805",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Maldives ?",
    "options": [
      "Mogadiscio",
      "Port-au-Prince",
      "Malé",
      "Athènes"
    ],
    "reponse": 2
  },
  {
    "id": "q2806",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel film de 1933, plusieurs fois adapté depuis, met en scène un gigantesque gorille escaladant un gratte-ciel new-yorkais ?",
    "options": [
      "Mighty Joe Young",
      "King Kong",
      "Rampage",
      "Godzilla"
    ],
    "reponse": 1
  },
  {
    "id": "q2807",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 60 % de 400 ?",
    "options": [
      "262",
      "240",
      "223",
      "268"
    ],
    "reponse": 1
  },
  {
    "id": "q2808",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel entrepreneur a fondé Apple en 1976 dans un garage californien, aux côtés de l'ingénieur Wozniak ?",
    "options": [
      "Ronald Wayne",
      "Paul Allen",
      "Steve Jobs",
      "Bill Gates"
    ],
    "reponse": 2
  },
  {
    "id": "q2809",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Finlande ?",
    "options": [
      "Euro",
      "Kwanza",
      "Gourde",
      "Loti"
    ],
    "reponse": 0
  },
  {
    "id": "q2810",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Be » ?",
    "options": [
      "Gadolinium",
      "Fluor",
      "Brome",
      "Béryllium"
    ],
    "reponse": 3
  },
  {
    "id": "q2811",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 698 - 318 ?",
    "options": [
      "379",
      "377",
      "382",
      "380"
    ],
    "reponse": 3
  },
  {
    "id": "q2812",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 1000 ?",
    "options": [
      "222",
      "255",
      "218",
      "250"
    ],
    "reponse": 3
  },
  {
    "id": "q2813",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Allemagne",
      "Rwanda",
      "Équateur",
      "Samoa"
    ],
    "reponse": 0
  },
  {
    "id": "q2814",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 250 ?",
    "options": [
      "124",
      "120",
      "135",
      "125"
    ],
    "reponse": 3
  },
  {
    "id": "q2815",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Panama ?",
    "options": [
      "🇱🇦",
      "🇨🇩",
      "🇶🇦",
      "🇵🇦"
    ],
    "reponse": 3
  },
  {
    "id": "q2816",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Dublin est la capitale de quel pays ?",
    "options": [
      "Serbie",
      "Chypre",
      "Irlande",
      "Ouzbékistan"
    ],
    "reponse": 2
  },
  {
    "id": "q2817",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 9 × 15 ?",
    "options": [
      "135",
      "117",
      "124",
      "131"
    ],
    "reponse": 0
  },
  {
    "id": "q2818",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 196 jour(s) ?",
    "options": [
      "30",
      "27",
      "25",
      "28"
    ],
    "reponse": 3
  },
  {
    "id": "q2819",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 955 en chiffres romains ?",
    "options": [
      "CMLV",
      "CMLXV",
      "CMLVII",
      "CMLIV"
    ],
    "reponse": 0
  },
  {
    "id": "q2820",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 433 + 136 ?",
    "options": [
      "572",
      "569",
      "568",
      "571"
    ],
    "reponse": 1
  },
  {
    "id": "q2821",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 716 - 324 ?",
    "options": [
      "394",
      "392",
      "391",
      "395"
    ],
    "reponse": 1
  },
  {
    "id": "q2822",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Serbie ?",
    "options": [
      "Zagreb",
      "Kinshasa",
      "Caracas",
      "Belgrade"
    ],
    "reponse": 3
  },
  {
    "id": "q2823",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Pérou ?",
    "options": [
      "Bridgetown",
      "Ljubljana",
      "Freetown",
      "Lima"
    ],
    "reponse": 3
  },
  {
    "id": "q2824",
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
    "id": "q2825",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Brome ?",
    "options": [
      "Br",
      "Ce",
      "O",
      "Co"
    ],
    "reponse": 0
  },
  {
    "id": "q2826",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Kazakhstan",
      "Tanzanie",
      "Hongrie",
      "Luxembourg"
    ],
    "reponse": 2
  },
  {
    "id": "q2827",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bichkek est la capitale de quel pays ?",
    "options": [
      "République démocratique du Congo",
      "Kirghizstan",
      "Samoa",
      "Pologne"
    ],
    "reponse": 1
  },
  {
    "id": "q2828",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2201 en chiffres romains ?",
    "options": [
      "MMCCI",
      "MMCXCIX",
      "MMCC",
      "MMCCXI"
    ],
    "reponse": 0
  },
  {
    "id": "q2829",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 13 au carré ?",
    "options": [
      "169",
      "148",
      "152",
      "178"
    ],
    "reponse": 0
  },
  {
    "id": "q2830",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quel protocole permet le partage de fichiers de pair à pair, souvent utilisé pour les téléchargements volumineux ?",
    "options": [
      "Le HTTP",
      "Le BitTorrent",
      "Le SMTP",
      "Le FTP"
    ],
    "reponse": 1
  },
  {
    "id": "q2831",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 3 ?",
    "options": [
      "48",
      "46",
      "51",
      "43"
    ],
    "reponse": 2
  },
  {
    "id": "q2832",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 323 - 248 ?",
    "options": [
      "75",
      "74",
      "78",
      "76"
    ],
    "reponse": 0
  },
  {
    "id": "q2833",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 27 au carré ?",
    "options": [
      "683",
      "758",
      "729",
      "662"
    ],
    "reponse": 2
  },
  {
    "id": "q2834",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇧 De quel pays est-ce le drapeau ?",
    "options": [
      "Hongrie",
      "Algérie",
      "Yémen",
      "Barbade"
    ],
    "reponse": 3
  },
  {
    "id": "q2835",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal marin est capable de régénérer un bras entier, voire un individu complet à partir d'un seul bras dans certains cas ?",
    "options": [
      "L'étoile de mer",
      "La méduse",
      "L'oursin",
      "Le crabe"
    ],
    "reponse": 0
  },
  {
    "id": "q2836",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain français a écrit la trilogie marseillaise « Marius, Fanny, César » ?",
    "options": [
      "Alphonse Daudet",
      "Jean Giono",
      "Frédéric Mistral",
      "Marcel Pagnol"
    ],
    "reponse": 3
  },
  {
    "id": "q2837",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3490 en chiffres romains ?",
    "options": [
      "MMMCDLXXXIX",
      "MMMCDXCV",
      "MMMCDXC",
      "MMMCDXCI"
    ],
    "reponse": 2
  },
  {
    "id": "q2838",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Lituanie ?",
    "options": [
      "Georgetown",
      "Copenhague",
      "Vilnius",
      "Reykjavik"
    ],
    "reponse": 2
  },
  {
    "id": "q2839",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇬🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Niger",
      "Mauritanie",
      "Malawi",
      "Gambie"
    ],
    "reponse": 3
  },
  {
    "id": "q2840",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Suisse ?",
    "options": [
      "Tallinn",
      "Porto-Novo",
      "Stockholm",
      "Berne"
    ],
    "reponse": 3
  },
  {
    "id": "q2841",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Oman",
      "Turquie",
      "Madagascar",
      "Pologne"
    ],
    "reponse": 2
  },
  {
    "id": "q2842",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 72 - 29 ?",
    "options": [
      "46",
      "43",
      "41",
      "40"
    ],
    "reponse": 1
  },
  {
    "id": "q2843",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Myanmar ?",
    "options": [
      "Tirana",
      "Naypyidaw",
      "Buenos Aires",
      "Kigali"
    ],
    "reponse": 1
  },
  {
    "id": "q2844",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cl » ?",
    "options": [
      "Gallium",
      "Hélium",
      "Iridium",
      "Chlore"
    ],
    "reponse": 3
  },
  {
    "id": "q2845",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Sierra Leone ?",
    "options": [
      "Freetown",
      "New Delhi",
      "Doha",
      "Sofia"
    ],
    "reponse": 0
  },
  {
    "id": "q2846",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel poète et romancier français a écrit « Le Grand Meaulnes » ?",
    "options": [
      "François Mauriac",
      "Marcel Proust",
      "André Gide",
      "Alain-Fournier"
    ],
    "reponse": 3
  },
  {
    "id": "q2847",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de m dans 13 km ?",
    "options": [
      "13036",
      "13903",
      "13000",
      "13181"
    ],
    "reponse": 2
  },
  {
    "id": "q2848",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Estonie ?",
    "options": [
      "Bamako",
      "Podgorica",
      "Tallinn",
      "Séoul"
    ],
    "reponse": 2
  },
  {
    "id": "q2849",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 3 × 15 ?",
    "options": [
      "39",
      "45",
      "43",
      "42"
    ],
    "reponse": 1
  },
  {
    "id": "q2850",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Suva est la capitale de quel pays ?",
    "options": [
      "Pakistan",
      "Bhoutan",
      "Fidji",
      "République dominicaine"
    ],
    "reponse": 2
  },
  {
    "id": "q2851",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 849 - 830 ?",
    "options": [
      "21",
      "18",
      "16",
      "19"
    ],
    "reponse": 3
  },
  {
    "id": "q2852",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné James Bond dans « Skyfall » et « Spectre » ?",
    "options": [
      "Sean Connery",
      "Daniel Craig",
      "Roger Moore",
      "Pierce Brosnan"
    ],
    "reponse": 1
  },
  {
    "id": "q2853",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Estonie",
      "Chine",
      "Moldavie",
      "Honduras"
    ],
    "reponse": 3
  },
  {
    "id": "q2854",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Jamaïque ?",
    "options": [
      "Afrique",
      "Amérique du Nord",
      "Océanie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q2855",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel dieu romain équivaut à Zeus dans la mythologie grecque ?",
    "options": [
      "Neptune",
      "Mercure",
      "Jupiter",
      "Mars"
    ],
    "reponse": 2
  },
  {
    "id": "q2856",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 351 + 270 ?",
    "options": [
      "624",
      "620",
      "621",
      "622"
    ],
    "reponse": 2
  },
  {
    "id": "q2857",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 54 + 90 ?",
    "options": [
      "144",
      "141",
      "145",
      "143"
    ],
    "reponse": 0
  },
  {
    "id": "q2858",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Lu » ?",
    "options": [
      "Technétium",
      "Lutécium",
      "Bismuth",
      "Thorium"
    ],
    "reponse": 1
  },
  {
    "id": "q2859",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Er » ?",
    "options": [
      "Potassium",
      "Radon",
      "Erbium",
      "Germanium"
    ],
    "reponse": 2
  },
  {
    "id": "q2860",
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
    "id": "q2861",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇳 De quel pays est-ce le drapeau ?",
    "options": [
      "Algérie",
      "Sénégal",
      "Saint-Marin",
      "Gambie"
    ],
    "reponse": 1
  },
  {
    "id": "q2862",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz les plantes absorbent-elles principalement lors de la photosynthèse ?",
    "options": [
      "L'oxygène",
      "Le dioxyde de carbone",
      "L'azote",
      "L'hydrogène"
    ],
    "reponse": 1
  },
  {
    "id": "q2863",
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
    "id": "q2864",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal est le plus grand des primates ?",
    "options": [
      "Le gorille",
      "Le chimpanzé",
      "Le babouin",
      "L'orang-outan"
    ],
    "reponse": 0
  },
  {
    "id": "q2865",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1983 en chiffres romains ?",
    "options": [
      "MCMLXXVIII",
      "MCMLXXIII",
      "MCMLXXXIII",
      "MCMLXXXVIII"
    ],
    "reponse": 2
  },
  {
    "id": "q2866",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇩 De quel pays est-ce le drapeau ?",
    "options": [
      "Mauritanie",
      "Danemark",
      "République démocratique du Congo",
      "Allemagne"
    ],
    "reponse": 2
  },
  {
    "id": "q2867",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « Frankenstein ou le Prométhée moderne » ?",
    "options": [
      "Mary Shelley",
      "Emily Brontë",
      "Jane Austen",
      "Bram Stoker"
    ],
    "reponse": 0
  },
  {
    "id": "q2868",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Phosphore ?",
    "options": [
      "P",
      "Hg",
      "Cr",
      "Cs"
    ],
    "reponse": 0
  },
  {
    "id": "q2869",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1933 en chiffres romains ?",
    "options": [
      "MCMXXXII",
      "MCMXXVIII",
      "MCMXXXIII",
      "MCMXXXI"
    ],
    "reponse": 2
  },
  {
    "id": "q2870",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Indonésie",
      "Ghana",
      "Bulgarie",
      "Myanmar"
    ],
    "reponse": 3
  },
  {
    "id": "q2871",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 180 ÷ 9 ?",
    "options": [
      "20",
      "23",
      "18",
      "16"
    ],
    "reponse": 0
  },
  {
    "id": "q2872",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Koweït ?",
    "options": [
      "Europe",
      "Asie",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q2873",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Mauritanie",
      "Cameroun",
      "Corée du Nord",
      "Mali"
    ],
    "reponse": 0
  },
  {
    "id": "q2874",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCI en chiffres romains ?",
    "options": [
      "2101",
      "2100",
      "2103",
      "2099"
    ],
    "reponse": 0
  },
  {
    "id": "q2875",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur et compositeur français, provocateur et sulfureux, est l'auteur de « Je t'aime... moi non plus » ?",
    "options": [
      "Renaud",
      "Jacques Dutronc",
      "Michel Polnareff",
      "Serge Gainsbourg"
    ],
    "reponse": 3
  },
  {
    "id": "q2876",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le point le plus bas de la surface terrestre accessible à pied, une étendue d'eau très salée entre Israël et la Jordanie ?",
    "options": [
      "La mer Morte",
      "La dépression de Danakil",
      "Le lac Assal",
      "La mer Caspienne"
    ],
    "reponse": 0
  },
  {
    "id": "q2877",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 76 ÷ 4 ?",
    "options": [
      "16",
      "19",
      "20",
      "23"
    ],
    "reponse": 1
  },
  {
    "id": "q2878",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CXXXI en chiffres romains ?",
    "options": [
      "131",
      "133",
      "136",
      "129"
    ],
    "reponse": 0
  },
  {
    "id": "q2879",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 13 cm ?",
    "options": [
      "130",
      "118",
      "112",
      "109"
    ],
    "reponse": 0
  },
  {
    "id": "q2880",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle danse et musique brésilienne rythme traditionnellement le carnaval de Rio ?",
    "options": [
      "Le maracatu",
      "La bossa nova",
      "La samba",
      "Le forró"
    ],
    "reponse": 2
  },
  {
    "id": "q2881",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 144 heure(s) ?",
    "options": [
      "7",
      "5",
      "3",
      "6"
    ],
    "reponse": 3
  },
  {
    "id": "q2882",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le nom du détroit séparant l'Europe de l'Afrique ?",
    "options": [
      "Le détroit de Malacca",
      "Le détroit de Béring",
      "Le détroit de Bosphore",
      "Le détroit de Gibraltar"
    ],
    "reponse": 3
  },
  {
    "id": "q2883",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale des Pays-Bas ?",
    "options": [
      "Amsterdam",
      "Bratislava",
      "Amman",
      "Dili"
    ],
    "reponse": 0
  },
  {
    "id": "q2884",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 192 ÷ 8 ?",
    "options": [
      "24",
      "26",
      "25",
      "28"
    ],
    "reponse": 0
  },
  {
    "id": "q2885",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 268 - 11 ?",
    "options": [
      "260",
      "257",
      "254",
      "255"
    ],
    "reponse": 1
  },
  {
    "id": "q2886",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇽 De quel pays est-ce le drapeau ?",
    "options": [
      "Mexique",
      "Hongrie",
      "Oman",
      "Érythrée"
    ],
    "reponse": 0
  },
  {
    "id": "q2887",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Baryum ?",
    "options": [
      "Ba",
      "Tc",
      "N",
      "V"
    ],
    "reponse": 0
  },
  {
    "id": "q2888",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 361 - 301 ?",
    "options": [
      "58",
      "63",
      "61",
      "60"
    ],
    "reponse": 3
  },
  {
    "id": "q2889",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Monaco ?",
    "options": [
      "Amérique du Sud",
      "Europe",
      "Asie",
      "Afrique"
    ],
    "reponse": 1
  },
  {
    "id": "q2890",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Thaïlande ?",
    "options": [
      "Moscou",
      "Amsterdam",
      "Bangkok",
      "Mbabane"
    ],
    "reponse": 2
  },
  {
    "id": "q2891",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1810 et 1928 ?",
    "options": [
      "109",
      "125",
      "135",
      "118"
    ],
    "reponse": 3
  },
  {
    "id": "q2892",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nicosie est la capitale de quel pays ?",
    "options": [
      "Chypre",
      "Canada",
      "Venezuela",
      "France"
    ],
    "reponse": 0
  },
  {
    "id": "q2893",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Malaisie ?",
    "options": [
      "Alger",
      "Kuala Lumpur",
      "Praia",
      "Port-Vila"
    ],
    "reponse": 1
  },
  {
    "id": "q2894",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Yémen",
      "Liberia",
      "Eswatini",
      "Cameroun"
    ],
    "reponse": 3
  },
  {
    "id": "q2895",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quelle partie du corps de l'escargot lui sert à la fois de maison et de protection ?",
    "options": [
      "Sa mue",
      "Son exosquelette",
      "Sa coquille",
      "Sa carapace"
    ],
    "reponse": 2
  },
  {
    "id": "q2896",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 6 × 18 ?",
    "options": [
      "98",
      "108",
      "97",
      "106"
    ],
    "reponse": 1
  },
  {
    "id": "q2897",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le plus petit pays du monde ?",
    "options": [
      "Le Liechtenstein",
      "Monaco",
      "Le Vatican",
      "Saint-Marin"
    ],
    "reponse": 2
  },
  {
    "id": "q2898",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel studio japonais a créé la saga « Final Fantasy » ?",
    "options": [
      "Bandai Namco",
      "Capcom",
      "Konami",
      "Square Enix"
    ],
    "reponse": 3
  },
  {
    "id": "q2899",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quelle série d'animation met en scène un garçon capable de se transformer en de nombreuses créatures, appelé Ben ?",
    "options": [
      "Randy Cunningham",
      "Ben 10",
      "Danny Phantom",
      "Generator Rex"
    ],
    "reponse": 1
  },
  {
    "id": "q2900",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Bulgarie ?",
    "options": [
      "Lomé",
      "Banjul",
      "Saint-Domingue",
      "Sofia"
    ],
    "reponse": 3
  },
  {
    "id": "q2901",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Jordanie ?",
    "options": [
      "Asie",
      "Afrique",
      "Amérique du Sud",
      "Océanie"
    ],
    "reponse": 0
  },
  {
    "id": "q2902",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Thaïlande ?",
    "options": [
      "🇬🇳",
      "🇺🇦",
      "🇦🇷",
      "🇹🇭"
    ],
    "reponse": 3
  },
  {
    "id": "q2903",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel est le roi des dieux dans la mythologie nordique ?",
    "options": [
      "Loki",
      "Odin",
      "Freyr",
      "Thor"
    ],
    "reponse": 1
  },
  {
    "id": "q2904",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série met en scène des adolescents affrontant des phénomènes surnaturels dans la ville de Hawkins ?",
    "options": [
      "Stranger Things",
      "Dark",
      "Locke & Key",
      "The OA"
    ],
    "reponse": 0
  },
  {
    "id": "q2905",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Jamaïque ?",
    "options": [
      "Taka",
      "Dollar bahaméen",
      "Dollar jamaïcain",
      "Peso argentin"
    ],
    "reponse": 2
  },
  {
    "id": "q2906",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel fleuve européen traverse notamment l'Allemagne, l'Autriche et la Hongrie avant de se jeter dans la mer Noire ?",
    "options": [
      "L'Elbe",
      "Le Danube",
      "La Volga",
      "Le Rhin"
    ],
    "reponse": 1
  },
  {
    "id": "q2907",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Bosnie-Herzégovine ?",
    "options": [
      "Amérique du Nord",
      "Europe",
      "Asie",
      "Amérique du Sud"
    ],
    "reponse": 1
  },
  {
    "id": "q2908",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur polonais du XIXe siècle est célèbre pour ses nocturnes et ses œuvres pour piano ?",
    "options": [
      "Frédéric Chopin",
      "Sergueï Rachmaninov",
      "Franz Liszt",
      "Robert Schumann"
    ],
    "reponse": 0
  },
  {
    "id": "q2909",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1324 et 1599 ?",
    "options": [
      "286",
      "250",
      "316",
      "275"
    ],
    "reponse": 3
  },
  {
    "id": "q2910",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « GPU » ?",
    "options": [
      "Graphics Processing Unit",
      "General Processing Unit",
      "Global Processor Utility",
      "Gaming Processing Unit"
    ],
    "reponse": 0
  },
  {
    "id": "q2911",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 6 kg ?",
    "options": [
      "5541",
      "6000",
      "6443",
      "6591"
    ],
    "reponse": 1
  },
  {
    "id": "q2912",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel plat français est servi brûlant dans un bol avec une tranche de pain et du fromage fondu, à base de légumes caramélisés au beurre ?",
    "options": [
      "Le velouté de légumes",
      "Le pot-au-feu",
      "La bouillabaisse",
      "La soupe à l'oignon"
    ],
    "reponse": 3
  },
  {
    "id": "q2913",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 155 - 53 ?",
    "options": [
      "103",
      "102",
      "100",
      "101"
    ],
    "reponse": 1
  },
  {
    "id": "q2914",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇭🇷 De quel pays est-ce le drapeau ?",
    "options": [
      "Seychelles",
      "Albanie",
      "Paraguay",
      "Croatie"
    ],
    "reponse": 3
  },
  {
    "id": "q2915",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Jordanie ?",
    "options": [
      "Amman",
      "Kigali",
      "Athènes",
      "Bakou"
    ],
    "reponse": 0
  },
  {
    "id": "q2916",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel est le plus grand félin sauvage du monde ?",
    "options": [
      "Le léopard",
      "Le lion",
      "Le jaguar",
      "Le tigre de Sibérie"
    ],
    "reponse": 3
  },
  {
    "id": "q2917",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle chaîne de montagnes sépare l'Europe et l'Asie ?",
    "options": [
      "Les Carpates",
      "Le Caucase",
      "L'Oural",
      "Les Alpes"
    ],
    "reponse": 2
  },
  {
    "id": "q2918",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de la République tchèque ?",
    "options": [
      "🇨🇿",
      "🇺🇿",
      "🇦🇫",
      "🇬🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q2919",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel animal change de couleur pour se fondre dans son environnement ?",
    "options": [
      "Le caméléon",
      "La grenouille",
      "Le gecko",
      "Le lézard"
    ],
    "reponse": 0
  },
  {
    "id": "q2920",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Que signifie l'acronyme « IA » couramment utilisé en informatique ?",
    "options": [
      "Interaction avancée",
      "Information analytique",
      "Intelligence artificielle",
      "Interface automatisée"
    ],
    "reponse": 2
  },
  {
    "id": "q2921",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo d'aventure en monde ouvert, sorti par Nintendo en 2017, a marqué un tournant pour une célèbre saga de fantasy dont le héros est vêtu de vert ?",
    "options": [
      "Majora's Mask",
      "Twilight Princess",
      "The Legend of Zelda: Breath of the Wild",
      "Ocarina of Time"
    ],
    "reponse": 2
  },
  {
    "id": "q2922",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie le sigle « HTML » ?",
    "options": [
      "Home Tool Markup Language",
      "HyperText Markup Language",
      "Hyperlink Text Machine Language",
      "High Tech Modern Language"
    ],
    "reponse": 1
  },
  {
    "id": "q2923",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 × 12 ?",
    "options": [
      "83",
      "75",
      "85",
      "84"
    ],
    "reponse": 3
  },
  {
    "id": "q2924",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 520 - 248 ?",
    "options": [
      "272",
      "271",
      "269",
      "273"
    ],
    "reponse": 0
  },
  {
    "id": "q2925",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCXCVI en chiffres romains ?",
    "options": [
      "3294",
      "3296",
      "3298",
      "3291"
    ],
    "reponse": 1
  },
  {
    "id": "q2926",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Somalie ?",
    "options": [
      "Asie",
      "Europe",
      "Amérique du Sud",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q2927",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur est connu pour le tube « Billie Jean » et l'album « Thriller » ?",
    "options": [
      "Stevie Wonder",
      "Lionel Richie",
      "Michael Jackson",
      "Prince"
    ],
    "reponse": 2
  },
  {
    "id": "q2928",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 933 - 582 ?",
    "options": [
      "351",
      "349",
      "353",
      "352"
    ],
    "reponse": 0
  },
  {
    "id": "q2929",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel monument mégalithique préhistorique se trouve dans la plaine de Salisbury en Angleterre ?",
    "options": [
      "Les alignements de Carnac",
      "Avebury",
      "Stonehenge",
      "Newgrange"
    ],
    "reponse": 2
  },
  {
    "id": "q2930",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 534 - 161 ?",
    "options": [
      "371",
      "375",
      "373",
      "374"
    ],
    "reponse": 2
  },
  {
    "id": "q2931",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle est la déesse grecque de la justice et de l'ordre divin ?",
    "options": [
      "Thémis",
      "Tyché",
      "Némésis",
      "Diké"
    ],
    "reponse": 0
  },
  {
    "id": "q2932",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Lettonie ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 0
  },
  {
    "id": "q2933",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel pays abrite la plus grande partie de la forêt amazonienne ?",
    "options": [
      "Le Pérou",
      "Le Brésil",
      "Le Venezuela",
      "La Colombie"
    ],
    "reponse": 1
  },
  {
    "id": "q2934",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Mauritanie ?",
    "options": [
      "Asie",
      "Océanie",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q2935",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Venezuela ?",
    "options": [
      "Apia",
      "Caracas",
      "Phnom Penh",
      "Londres"
    ],
    "reponse": 1
  },
  {
    "id": "q2936",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Quel volcan italien, toujours actif, domine la baie de Naples et a enseveli une cité romaine en 79 après J.-C. ?",
    "options": [
      "Le Stromboli",
      "Le Vulcano",
      "L'Etna",
      "Le Vésuve"
    ],
    "reponse": 3
  },
  {
    "id": "q2937",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quelle romancière française est l'autrice des romans « Claudine », publiés au début du XXe siècle ?",
    "options": [
      "Colette",
      "Anna de Noailles",
      "George Sand",
      "Marguerite Yourcenar"
    ],
    "reponse": 0
  },
  {
    "id": "q2938",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇲🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Mali",
      "Éthiopie",
      "Belgique",
      "Jordanie"
    ],
    "reponse": 0
  },
  {
    "id": "q2939",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel boxeur américain, surnommé « The Greatest », est resté une légende de la boxe poids lourds ?",
    "options": [
      "Joe Frazier",
      "Muhammad Ali",
      "Mike Tyson",
      "George Foreman"
    ],
    "reponse": 1
  },
  {
    "id": "q2940",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3160 en chiffres romains ?",
    "options": [
      "MMMCLX",
      "MMMCLXII",
      "MMMCL",
      "MMMCLXI"
    ],
    "reponse": 0
  },
  {
    "id": "q2941",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCCCXCIX en chiffres romains ?",
    "options": [
      "2399",
      "2404",
      "2398",
      "2400"
    ],
    "reponse": 0
  },
  {
    "id": "q2942",
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
    "id": "q2943",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quelle ville portuaire du Maroc fait face à Gibraltar ?",
    "options": [
      "Agadir",
      "Rabat",
      "Tanger",
      "Casablanca"
    ],
    "reponse": 2
  },
  {
    "id": "q2944",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « In » ?",
    "options": [
      "Technétium",
      "Chrome",
      "Lanthane",
      "Indium"
    ],
    "reponse": 3
  },
  {
    "id": "q2945",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quelle célèbre course de voile, la plus ancienne compétition sportive internationale encore disputée, porte le nom d'un trophée du XIXe siècle ?",
    "options": [
      "La Coupe de l'America",
      "Le Vendée Globe",
      "La Volvo Ocean Race",
      "La Route du Rhum"
    ],
    "reponse": 0
  },
  {
    "id": "q2946",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 392 + 779 ?",
    "options": [
      "1168",
      "1171",
      "1173",
      "1169"
    ],
    "reponse": 1
  },
  {
    "id": "q2947",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 580 - 479 ?",
    "options": [
      "104",
      "99",
      "103",
      "101"
    ],
    "reponse": 3
  },
  {
    "id": "q2948",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 15000 mm ?",
    "options": [
      "13",
      "11",
      "12",
      "15"
    ],
    "reponse": 3
  },
  {
    "id": "q2949",
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
    "id": "q2950",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1032 en chiffres romains ?",
    "options": [
      "MXXXI",
      "MXXXVII",
      "MXXXII",
      "MXXXIII"
    ],
    "reponse": 2
  },
  {
    "id": "q2951",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Jordanie",
      "Bulgarie",
      "Madagascar",
      "Colombie"
    ],
    "reponse": 3
  },
  {
    "id": "q2952",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 621 - 197 ?",
    "options": [
      "424",
      "425",
      "422",
      "427"
    ],
    "reponse": 0
  },
  {
    "id": "q2953",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Y » ?",
    "options": [
      "Strontium",
      "Yttrium",
      "Thallium",
      "Nickel"
    ],
    "reponse": 1
  },
  {
    "id": "q2954",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Guinée ?",
    "options": [
      "🇹🇿",
      "🇬🇳",
      "🇦🇱",
      "🇵🇬"
    ],
    "reponse": 1
  },
  {
    "id": "q2955",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de jour(s) dans 20 semaine(s) ?",
    "options": [
      "160",
      "138",
      "140",
      "150"
    ],
    "reponse": 2
  },
  {
    "id": "q2956",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle fête hindoue des lumières symbolise la victoire de la lumière sur les ténèbres ?",
    "options": [
      "Holi",
      "Navratri",
      "Dussehra",
      "Divali"
    ],
    "reponse": 3
  },
  {
    "id": "q2957",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 457 + 995 ?",
    "options": [
      "1454",
      "1455",
      "1451",
      "1452"
    ],
    "reponse": 3
  },
  {
    "id": "q2958",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel dramaturge grec de l'Antiquité est l'auteur d'« Œdipe roi » ?",
    "options": [
      "Euripide",
      "Sophocle",
      "Eschyle",
      "Aristophane"
    ],
    "reponse": 1
  },
  {
    "id": "q2959",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Autriche ?",
    "options": [
      "Vienne",
      "Rome",
      "Manille",
      "Port-Louis"
    ],
    "reponse": 0
  },
  {
    "id": "q2960",
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
    "id": "q2961",
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
    "id": "q2962",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Le Caire est la capitale de quel pays ?",
    "options": [
      "Maroc",
      "Égypte",
      "Bulgarie",
      "Norvège"
    ],
    "reponse": 1
  },
  {
    "id": "q2963",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1688 appartient à quel siècle ?",
    "options": [
      "15e siècle",
      "16e siècle",
      "17e siècle",
      "18e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q2964",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 75 % de 120 ?",
    "options": [
      "90",
      "85",
      "99",
      "94"
    ],
    "reponse": 0
  },
  {
    "id": "q2965",
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
    "id": "q2966",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel savant a énoncé les trois lois du mouvement en physique classique ?",
    "options": [
      "Isaac Newton",
      "Galilée",
      "Albert Einstein",
      "Blaise Pascal"
    ],
    "reponse": 0
  },
  {
    "id": "q2967",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre norvégien est l'auteur du tableau « Le Cri » ?",
    "options": [
      "Egon Schiele",
      "Edvard Munch",
      "Gustav Klimt",
      "Vassily Kandinsky"
    ],
    "reponse": 1
  },
  {
    "id": "q2968",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 25 année(s) ?",
    "options": [
      "300",
      "337",
      "332",
      "329"
    ],
    "reponse": 0
  },
  {
    "id": "q2969",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Thaïlande ?",
    "options": [
      "Dollar namibien",
      "Baht",
      "Ouguiya",
      "Dollar fidjien"
    ],
    "reponse": 1
  },
  {
    "id": "q2970",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Allemagne ?",
    "options": [
      "Berlin",
      "Mbabane",
      "Douchanbé",
      "Lisbonne"
    ],
    "reponse": 0
  },
  {
    "id": "q2971",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 12 au carré ?",
    "options": [
      "147",
      "144",
      "148",
      "132"
    ],
    "reponse": 1
  },
  {
    "id": "q2972",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 293 - 96 ?",
    "options": [
      "195",
      "198",
      "200",
      "197"
    ],
    "reponse": 3
  },
  {
    "id": "q2973",
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
    "id": "q2974",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Myanmar ?",
    "options": [
      "Amérique du Sud",
      "Asie",
      "Europe",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q2975",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 420 + 290 ?",
    "options": [
      "707",
      "710",
      "709",
      "712"
    ],
    "reponse": 1
  },
  {
    "id": "q2976",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel personnage mythologique grec est condamné à pousser éternellement un rocher en haut d'une colline ?",
    "options": [
      "Ixion",
      "Prométhée",
      "Sisyphe",
      "Tantale"
    ],
    "reponse": 2
  },
  {
    "id": "q2977",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DLXXXIII en chiffres romains ?",
    "options": [
      "593",
      "582",
      "583",
      "581"
    ],
    "reponse": 2
  },
  {
    "id": "q2978",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Antananarivo est la capitale de quel pays ?",
    "options": [
      "Myanmar",
      "Indonésie",
      "Laos",
      "Madagascar"
    ],
    "reponse": 3
  },
  {
    "id": "q2979",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Paraguay ?",
    "options": [
      "Le Caire",
      "Asuncion",
      "Alger",
      "Varsovie"
    ],
    "reponse": 1
  },
  {
    "id": "q2980",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 327 appartient à quel siècle ?",
    "options": [
      "4e siècle",
      "2e siècle",
      "5e siècle",
      "3e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q2981",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mm dans 13 m ?",
    "options": [
      "11167",
      "14148",
      "13000",
      "11587"
    ],
    "reponse": 2
  },
  {
    "id": "q2982",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel chanteur britannique est connu pour « Rocket Man » et ses lunettes extravagantes ?",
    "options": [
      "Elton John",
      "Freddie Mercury",
      "Rod Stewart",
      "David Bowie"
    ],
    "reponse": 0
  },
  {
    "id": "q2983",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain a créé le personnage de Dracula ?",
    "options": [
      "Edgar Allan Poe",
      "Mary Shelley",
      "Bram Stoker",
      "H.P. Lovecraft"
    ],
    "reponse": 2
  },
  {
    "id": "q2984",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1473 et 1741 ?",
    "options": [
      "269",
      "285",
      "281",
      "268"
    ],
    "reponse": 3
  },
  {
    "id": "q2985",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de sets faut-il gagner pour remporter un match de tennis en 5 sets (Grand Chelem messieurs) ?",
    "options": [
      "3",
      "2",
      "4",
      "5"
    ],
    "reponse": 0
  },
  {
    "id": "q2986",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel violoniste et compositeur italien du XVIIIe siècle est réputé pour sa virtuosité légendaire ?",
    "options": [
      "Arcangelo Corelli",
      "Antonio Vivaldi",
      "Niccolò Paganini",
      "Giuseppe Tartini"
    ],
    "reponse": 2
  },
  {
    "id": "q2987",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 397 - 59 ?",
    "options": [
      "338",
      "337",
      "341",
      "340"
    ],
    "reponse": 0
  },
  {
    "id": "q2988",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Conakry est la capitale de quel pays ?",
    "options": [
      "Cameroun",
      "Cuba",
      "Guinée",
      "Cambodge"
    ],
    "reponse": 2
  },
  {
    "id": "q2989",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3217 en chiffres romains ?",
    "options": [
      "MMMCCXVI",
      "MMMCCXII",
      "MMMCCXVII",
      "MMMCCXV"
    ],
    "reponse": 2
  },
  {
    "id": "q2990",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 330 ÷ 15 ?",
    "options": [
      "25",
      "22",
      "19",
      "18"
    ],
    "reponse": 1
  },
  {
    "id": "q2991",
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
    "id": "q2992",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Yttrium ?",
    "options": [
      "K",
      "Y",
      "Sc",
      "Pu"
    ],
    "reponse": 1
  },
  {
    "id": "q2993",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 278 - 52 ?",
    "options": [
      "228",
      "226",
      "223",
      "224"
    ],
    "reponse": 1
  },
  {
    "id": "q2994",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2755 en chiffres romains ?",
    "options": [
      "MMDCCL",
      "MMDCCLX",
      "MMDCCLV",
      "MMDCCLVII"
    ],
    "reponse": 2
  },
  {
    "id": "q2995",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Oulan-Bator est la capitale de quel pays ?",
    "options": [
      "Australie",
      "Mongolie",
      "Togo",
      "Maurice"
    ],
    "reponse": 1
  },
  {
    "id": "q2996",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 751 + 838 ?",
    "options": [
      "1591",
      "1590",
      "1589",
      "1592"
    ],
    "reponse": 2
  },
  {
    "id": "q2997",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Rhodium ?",
    "options": [
      "Mo",
      "Nd",
      "Ni",
      "Rh"
    ],
    "reponse": 3
  },
  {
    "id": "q2998",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de cm dans 370 mm ?",
    "options": [
      "31",
      "39",
      "41",
      "37"
    ],
    "reponse": 3
  },
  {
    "id": "q2999",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel est le nom du système d'exploitation open source dont le logo est un pingouin ?",
    "options": [
      "Linux",
      "Android",
      "BSD",
      "Unix"
    ],
    "reponse": 0
  },
  {
    "id": "q3000",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Alger est la capitale de quel pays ?",
    "options": [
      "Bhoutan",
      "Algérie",
      "Nouvelle-Zélande",
      "Bahamas"
    ],
    "reponse": 1
  },
  {
    "id": "q3001",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Rwanda ?",
    "options": [
      "Asie",
      "Europe",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 2
  },
  {
    "id": "q3002",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel pays alpin est réputé pour avoir perfectionné le chocolat au lait au XIXe siècle, avec des maisons comme Nestlé et Lindt ?",
    "options": [
      "La Suisse",
      "La Belgique",
      "L'Autriche",
      "La France"
    ],
    "reponse": 0
  },
  {
    "id": "q3003",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film Disney met en scène un jeune héritier de la savane africaine nommé Simba ?",
    "options": [
      "Madagascar",
      "Zootopie",
      "Kung Fu Panda",
      "Le Roi Lion"
    ],
    "reponse": 3
  },
  {
    "id": "q3004",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Maldives ?",
    "options": [
      "Afrique",
      "Europe",
      "Océanie",
      "Asie"
    ],
    "reponse": 3
  },
  {
    "id": "q3005",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel dramaturge français du XVIIIe siècle est l'auteur du « Mariage de Figaro » ?",
    "options": [
      "Marivaux",
      "Diderot",
      "Beaumarchais",
      "Voltaire"
    ],
    "reponse": 2
  },
  {
    "id": "q3006",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 4 ?",
    "options": [
      "69",
      "76",
      "68",
      "63"
    ],
    "reponse": 2
  },
  {
    "id": "q3007",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Haïti ?",
    "options": [
      "Gourde",
      "Franc CFA",
      "Roupie indonésienne",
      "Sum ouzbek"
    ],
    "reponse": 0
  },
  {
    "id": "q3008",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel sculpteur mythique grec est tombé amoureux d'une statue qu'il avait lui-même créée ?",
    "options": [
      "Dédale",
      "Prométhée",
      "Pygmalion",
      "Héphaïstos"
    ],
    "reponse": 2
  },
  {
    "id": "q3009",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Xe » ?",
    "options": [
      "Brome",
      "Mercure",
      "Xénon",
      "Zinc"
    ],
    "reponse": 2
  },
  {
    "id": "q3010",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur a incarné le Joker dans « The Dark Knight » (2008) ?",
    "options": [
      "Jack Nicholson",
      "Joaquin Phoenix",
      "Heath Ledger",
      "Jared Leto"
    ],
    "reponse": 2
  },
  {
    "id": "q3011",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel instrument est le plus grand de la famille des cordes frottées, joué debout ou assis avec un pied ?",
    "options": [
      "Le violoncelle",
      "Le violon",
      "L'alto",
      "La contrebasse"
    ],
    "reponse": 3
  },
  {
    "id": "q3012",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCXXIV en chiffres romains ?",
    "options": [
      "3724",
      "3729",
      "3719",
      "3723"
    ],
    "reponse": 0
  },
  {
    "id": "q3013",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 4 ?",
    "options": [
      "3",
      "0",
      "2",
      "1"
    ],
    "reponse": 2
  },
  {
    "id": "q3014",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Jordanie ?",
    "options": [
      "🇯🇴",
      "🇵🇹",
      "🇸🇴",
      "🇳🇪"
    ],
    "reponse": 0
  },
  {
    "id": "q3015",
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
    "id": "q3016",
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
    "id": "q3017",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 17 ?",
    "options": [
      "255",
      "259",
      "271",
      "287"
    ],
    "reponse": 0
  },
  {
    "id": "q3018",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇫 De quel pays est-ce le drapeau ?",
    "options": [
      "Burkina Faso",
      "Panama",
      "Congo",
      "Madagascar"
    ],
    "reponse": 0
  },
  {
    "id": "q3019",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Slovénie ?",
    "options": [
      "Hanoï",
      "Port-d'Espagne",
      "La Valette",
      "Ljubljana"
    ],
    "reponse": 3
  },
  {
    "id": "q3020",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 36 ÷ 12 ?",
    "options": [
      "1",
      "3",
      "4",
      "5"
    ],
    "reponse": 1
  },
  {
    "id": "q3021",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cl dans 22 l ?",
    "options": [
      "2359",
      "2200",
      "2321",
      "1838"
    ],
    "reponse": 1
  },
  {
    "id": "q3022",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quelle tragédie grecque antique met en scène une magicienne qui se venge de Jason en tuant ses propres enfants ?",
    "options": [
      "Antigone",
      "Médée",
      "Électre",
      "Phèdre"
    ],
    "reponse": 1
  },
  {
    "id": "q3023",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Irak ?",
    "options": [
      "🇳🇿",
      "🇵🇦",
      "🇮🇶",
      "🇹🇱"
    ],
    "reponse": 2
  },
  {
    "id": "q3024",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Mauritanie ?",
    "options": [
      "Wellington",
      "Riyad",
      "Nouakchott",
      "Dili"
    ],
    "reponse": 2
  },
  {
    "id": "q3025",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série britannique met en scène une famille de gangsters de Birmingham au début du XXe siècle ?",
    "options": [
      "Gangs of London",
      "Boardwalk Empire",
      "Peaky Blinders",
      "The Krays"
    ],
    "reponse": 2
  },
  {
    "id": "q3026",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Botswana ?",
    "options": [
      "Libreville",
      "La Valette",
      "New Delhi",
      "Gaborone"
    ],
    "reponse": 3
  },
  {
    "id": "q3027",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 au carré ?",
    "options": [
      "266",
      "312",
      "256",
      "289"
    ],
    "reponse": 3
  },
  {
    "id": "q3028",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 676 ?",
    "options": [
      "28",
      "26",
      "27",
      "31"
    ],
    "reponse": 1
  },
  {
    "id": "q3029",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros grec participe à la quête de la Toison d'or avec les Argonautes ?",
    "options": [
      "Thésée",
      "Persée",
      "Achille",
      "Jason"
    ],
    "reponse": 3
  },
  {
    "id": "q3030",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quelle danse de couple, née dans les quartiers populaires de Buenos Aires à la fin du XIXe siècle, est devenue un symbole national argentin ?",
    "options": [
      "La salsa",
      "La bachata",
      "La rumba",
      "Le tango"
    ],
    "reponse": 3
  },
  {
    "id": "q3031",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Bakou est la capitale de quel pays ?",
    "options": [
      "Azerbaïdjan",
      "Kirghizstan",
      "États-Unis",
      "Turquie"
    ],
    "reponse": 0
  },
  {
    "id": "q3032",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Thallium ?",
    "options": [
      "Zn",
      "As",
      "F",
      "Tl"
    ],
    "reponse": 3
  },
  {
    "id": "q3033",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCXCIX en chiffres romains ?",
    "options": [
      "3394",
      "3399",
      "3404",
      "3398"
    ],
    "reponse": 1
  },
  {
    "id": "q3034",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de mois dans 27 année(s) ?",
    "options": [
      "296",
      "269",
      "374",
      "324"
    ],
    "reponse": 3
  },
  {
    "id": "q3035",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 166 - 165 ?",
    "options": [
      "4",
      "2",
      "-2",
      "1"
    ],
    "reponse": 3
  },
  {
    "id": "q3036",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Équateur",
      "Brunei",
      "République dominicaine",
      "Monaco"
    ],
    "reponse": 2
  },
  {
    "id": "q3037",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Maximus dans « Gladiator », rôle qui lui a valu l'Oscar ?",
    "options": [
      "Hugh Jackman",
      "Russell Brand",
      "Russell Crowe",
      "Eric Bana"
    ],
    "reponse": 2
  },
  {
    "id": "q3038",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 120 - 54 ?",
    "options": [
      "65",
      "67",
      "66",
      "69"
    ],
    "reponse": 2
  },
  {
    "id": "q3039",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel micro-État européen, enclavé dans le sud de la France, est le deuxième plus petit pays du monde ?",
    "options": [
      "Le Liechtenstein",
      "Saint-Marin",
      "Le Vatican",
      "Monaco"
    ],
    "reponse": 3
  },
  {
    "id": "q3040",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2933 en chiffres romains ?",
    "options": [
      "MMCMXXXIII",
      "MMCMXXXI",
      "MMCMXXXIV",
      "MMCMXXIII"
    ],
    "reponse": 0
  },
  {
    "id": "q3041",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1841 en chiffres romains ?",
    "options": [
      "MDCCCLI",
      "MDCCCXLII",
      "MDCCCXXXI",
      "MDCCCXLI"
    ],
    "reponse": 3
  },
  {
    "id": "q3042",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel courant artistique du XIXe siècle, dont Monet est une figure majeure, cherche à capter la lumière et l'instant ?",
    "options": [
      "L'impressionnisme",
      "Le surréalisme",
      "Le cubisme",
      "Le fauvisme"
    ],
    "reponse": 0
  },
  {
    "id": "q3043",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2654 en chiffres romains ?",
    "options": [
      "MMDCLIII",
      "MMDCLV",
      "MMDCLIV",
      "MMDCXLIV"
    ],
    "reponse": 2
  },
  {
    "id": "q3044",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Trois Mousquetaires » ?",
    "options": [
      "Prosper Mérimée",
      "Théophile Gautier",
      "Victor Hugo",
      "Alexandre Dumas"
    ],
    "reponse": 3
  },
  {
    "id": "q3045",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Vietnam ?",
    "options": [
      "🇱🇺",
      "🇴🇲",
      "🇲🇿",
      "🇻🇳"
    ],
    "reponse": 3
  },
  {
    "id": "q3046",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle licence de jeux vidéo, souvent controversée pour sa violence, permet d'incarner un criminel évoluant dans une ville américaine en monde ouvert ?",
    "options": [
      "Saints Row",
      "Mafia",
      "Watch Dogs",
      "Grand Theft Auto"
    ],
    "reponse": 3
  },
  {
    "id": "q3047",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 19 × 9 ?",
    "options": [
      "174",
      "185",
      "171",
      "191"
    ],
    "reponse": 2
  },
  {
    "id": "q3048",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel gaz représente environ 21 % de l'atmosphère terrestre et est essentiel à la respiration ?",
    "options": [
      "Le dioxyde de carbone",
      "L'argon",
      "L'oxygène",
      "L'azote"
    ],
    "reponse": 2
  },
  {
    "id": "q3049",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCCCLIII en chiffres romains ?",
    "options": [
      "3358",
      "3351",
      "3352",
      "3353"
    ],
    "reponse": 3
  },
  {
    "id": "q3050",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Iron Man dans l'univers cinématographique Marvel ?",
    "options": [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth"
    ],
    "reponse": 0
  },
  {
    "id": "q3051",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel mammifère marin utilise l'écholocation pour se repérer et chasser ?",
    "options": [
      "Le lamantin",
      "L'otarie",
      "Le dauphin",
      "Le phoque"
    ],
    "reponse": 2
  },
  {
    "id": "q3052",
    "categorie": "Cinéma",
    "difficulte": 3,
    "question": "Quel réalisateur a mis en scène « Le Fabuleux Destin d'Amélie Poulain » et « Alien, la résurrection » ?",
    "options": [
      "Marc Caro",
      "Luc Besson",
      "Jean-Pierre Jeunet",
      "Léos Carax"
    ],
    "reponse": 2
  },
  {
    "id": "q3053",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Bore ?",
    "options": [
      "Tc",
      "Se",
      "Ge",
      "B"
    ],
    "reponse": 3
  },
  {
    "id": "q3054",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom du satellite naturel de la Terre ?",
    "options": [
      "La Lune",
      "Europe",
      "Phobos",
      "Titan"
    ],
    "reponse": 0
  },
  {
    "id": "q3055",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle unité mesure la vitesse d'un processeur ?",
    "options": [
      "Le watt",
      "Le bit",
      "L'octet",
      "Le hertz (GHz)"
    ],
    "reponse": 3
  },
  {
    "id": "q3056",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Oxygène ?",
    "options": [
      "O",
      "Ce",
      "Cd",
      "Sn"
    ],
    "reponse": 0
  },
  {
    "id": "q3057",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Angola ?",
    "options": [
      "Franc congolais",
      "Kwanza",
      "Dollar namibien",
      "Livre libanaise"
    ],
    "reponse": 1
  },
  {
    "id": "q3058",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Hongrie ?",
    "options": [
      "Peso philippin",
      "Forint",
      "Couronne danoise",
      "Dollar zimbabwéen"
    ],
    "reponse": 1
  },
  {
    "id": "q3059",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2636 en chiffres romains ?",
    "options": [
      "MMDCXXXVII",
      "MMDCXXXVIII",
      "MMDCXXXVI",
      "MMDCXLI"
    ],
    "reponse": 2
  },
  {
    "id": "q3060",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle vitamine est principalement produite par la peau grâce au soleil ?",
    "options": [
      "La vitamine A",
      "La vitamine B12",
      "La vitamine C",
      "La vitamine D"
    ],
    "reponse": 3
  },
  {
    "id": "q3061",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel chimiste a établi le tableau périodique des éléments ?",
    "options": [
      "John Dalton",
      "Marie Curie",
      "Dmitri Mendeleïev",
      "Antoine Lavoisier"
    ],
    "reponse": 2
  },
  {
    "id": "q3062",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Berlin est la capitale de quel pays ?",
    "options": [
      "Bahreïn",
      "Allemagne",
      "Pakistan",
      "Lituanie"
    ],
    "reponse": 1
  },
  {
    "id": "q3063",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Les antibiotiques permettent-ils de traiter une infection virale comme la grippe ?",
    "options": [
      "Oui, contre certains virus seulement",
      "Non, ils n'agissent que sur les bactéries",
      "Oui, mais à forte dose",
      "Oui, systématiquement"
    ],
    "reponse": 1
  },
  {
    "id": "q3064",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Polonium ?",
    "options": [
      "Ca",
      "P",
      "Po",
      "Bi"
    ],
    "reponse": 2
  },
  {
    "id": "q3065",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 168 ÷ 7 ?",
    "options": [
      "24",
      "20",
      "25",
      "22"
    ],
    "reponse": 0
  },
  {
    "id": "q3066",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3996 en chiffres romains ?",
    "options": [
      "MMMCMXCVI",
      "MMMCMXCVII",
      "MMMCMXCV",
      "MMMCMXCVIII"
    ],
    "reponse": 0
  },
  {
    "id": "q3067",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle est approximativement la vitesse du son dans l'air à température ambiante ?",
    "options": [
      "Environ 1 000 m/s",
      "Environ 34 m/s",
      "Environ 340 m/s",
      "Environ 3 400 m/s"
    ],
    "reponse": 2
  },
  {
    "id": "q3068",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle grande salle nordique accueille les guerriers morts au combat, choisis par Odin ?",
    "options": [
      "Le Valhalla",
      "Le Midgard",
      "Le Niflheim",
      "L'Asgard"
    ],
    "reponse": 0
  },
  {
    "id": "q3069",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Chine ?",
    "options": [
      "Lomé",
      "Pékin",
      "San José",
      "Tallinn"
    ],
    "reponse": 1
  },
  {
    "id": "q3070",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel rongeur bâtit des barrages sur les rivières avec du bois ?",
    "options": [
      "Le ragondin",
      "La loutre",
      "Le rat musqué",
      "Le castor"
    ],
    "reponse": 3
  },
  {
    "id": "q3071",
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
    "id": "q3072",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Azerbaïdjan ?",
    "options": [
      "Balboa",
      "Manat azerbaïdjanais",
      "Tenge",
      "Ariary"
    ],
    "reponse": 1
  },
  {
    "id": "q3073",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 671 - 520 ?",
    "options": [
      "151",
      "154",
      "152",
      "148"
    ],
    "reponse": 0
  },
  {
    "id": "q3074",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 340 - 25 ?",
    "options": [
      "317",
      "312",
      "318",
      "315"
    ],
    "reponse": 3
  },
  {
    "id": "q3075",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente D en chiffres romains ?",
    "options": [
      "500",
      "499",
      "490",
      "510"
    ],
    "reponse": 0
  },
  {
    "id": "q3076",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 677 - 348 ?",
    "options": [
      "327",
      "329",
      "330",
      "332"
    ],
    "reponse": 1
  },
  {
    "id": "q3077",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 125 ÷ 5 ?",
    "options": [
      "25",
      "21",
      "20",
      "29"
    ],
    "reponse": 0
  },
  {
    "id": "q3078",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇽🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Kosovo",
      "Thaïlande",
      "Côte d'Ivoire",
      "Barbade"
    ],
    "reponse": 0
  },
  {
    "id": "q3079",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Trinité-et-Tobago ?",
    "options": [
      "Banjul",
      "Yaoundé",
      "Port-d'Espagne",
      "Achgabat"
    ],
    "reponse": 2
  },
  {
    "id": "q3080",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Nigeria ?",
    "options": [
      "🇨🇴",
      "🇽🇰",
      "🇬🇭",
      "🇳🇬"
    ],
    "reponse": 3
  },
  {
    "id": "q3081",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Luanda est la capitale de quel pays ?",
    "options": [
      "Zimbabwe",
      "Allemagne",
      "Angola",
      "Liechtenstein"
    ],
    "reponse": 2
  },
  {
    "id": "q3082",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Kenya ?",
    "options": [
      "🇭🇹",
      "🇱🇷",
      "🇨🇩",
      "🇰🇪"
    ],
    "reponse": 3
  },
  {
    "id": "q3083",
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
    "id": "q3084",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Belize ?",
    "options": [
      "Europe",
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q3085",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Comment appelle-t-on la technique consistant à submerger un site web de requêtes pour le rendre inaccessible ?",
    "options": [
      "Un hameçonnage",
      "Une attaque par déni de service (DDoS)",
      "Un rançongiciel",
      "Un virus"
    ],
    "reponse": 1
  },
  {
    "id": "q3086",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le plus grand organe interne (viscère) du corps humain ?",
    "options": [
      "Le rein",
      "L'estomac",
      "Le poumon",
      "Le foie"
    ],
    "reponse": 3
  },
  {
    "id": "q3087",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Belize ?",
    "options": [
      "🇳🇦",
      "🇧🇿",
      "🇬🇹",
      "🇸🇿"
    ],
    "reponse": 1
  },
  {
    "id": "q3088",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle nymphe grecque, punie par Héra, ne pouvait plus que répéter les derniers mots prononcés par les autres ?",
    "options": [
      "Écho",
      "Syrinx",
      "Daphné",
      "Calypso"
    ],
    "reponse": 0
  },
  {
    "id": "q3089",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Japon ?",
    "options": [
      "Real brésilien",
      "Yen",
      "Peso philippin",
      "Kina"
    ],
    "reponse": 1
  },
  {
    "id": "q3090",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Mexique ?",
    "options": [
      "Dollar fidjien",
      "Rouble biélorusse",
      "Peso mexicain",
      "Quetzal"
    ],
    "reponse": 2
  },
  {
    "id": "q3091",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Myanmar ?",
    "options": [
      "🇨🇺",
      "🇲🇾",
      "🇵🇾",
      "🇲🇲"
    ],
    "reponse": 3
  },
  {
    "id": "q3092",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Qui est considérée comme la première programmeuse de l'histoire, pour ses travaux sur la machine analytique de Babbage ?",
    "options": [
      "Hedy Lamarr",
      "Ada Lovelace",
      "Margaret Hamilton",
      "Grace Hopper"
    ],
    "reponse": 1
  },
  {
    "id": "q3093",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel jeu vidéo de simulation de vie sur une île, édité par Nintendo, permet de pêcher, décorer sa maison et rendre visite à ses voisins ?",
    "options": [
      "Animal Crossing",
      "My Time at Portia",
      "Stardew Valley",
      "Les Sims"
    ],
    "reponse": 0
  },
  {
    "id": "q3094",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 322 ÷ 14 ?",
    "options": [
      "22",
      "21",
      "23",
      "20"
    ],
    "reponse": 2
  },
  {
    "id": "q3095",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel chanteur français est connu pour la chanson « Ne me quitte pas » ?",
    "options": [
      "Jacques Brel",
      "Charles Aznavour",
      "Léo Ferré",
      "Georges Brassens"
    ],
    "reponse": 0
  },
  {
    "id": "q3096",
    "categorie": "Histoire",
    "difficulte": 3,
    "question": "Quelle conférence de 1884-1885 a organisé le partage colonial de l'Afrique entre puissances européennes ?",
    "options": [
      "La conférence de Berlin",
      "Le congrès de Vienne",
      "La conférence de Yalta",
      "Le traité de Versailles"
    ],
    "reponse": 0
  },
  {
    "id": "q3097",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « H » ?",
    "options": [
      "Hélium",
      "Hydrogène",
      "Argon",
      "Francium"
    ],
    "reponse": 1
  },
  {
    "id": "q3098",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 441 - 89 ?",
    "options": [
      "352",
      "351",
      "354",
      "350"
    ],
    "reponse": 0
  },
  {
    "id": "q3099",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle invention de Guglielmo Marconi a révolutionné les communications au XXe siècle ?",
    "options": [
      "La télévision",
      "Le télégraphe",
      "La radio",
      "Le téléphone"
    ],
    "reponse": 2
  },
  {
    "id": "q3100",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel style musical est né à la Jamaïque dans les années 1960, popularisé par Bob Marley ?",
    "options": [
      "Le ska",
      "Le blues",
      "Le calypso",
      "Le reggae"
    ],
    "reponse": 3
  },
  {
    "id": "q3101",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ni » ?",
    "options": [
      "Nickel",
      "Étain",
      "Praséodyme",
      "Lanthane"
    ],
    "reponse": 0
  },
  {
    "id": "q3102",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Trinité-et-Tobago ?",
    "options": [
      "🇫🇮",
      "🇧🇯",
      "🇸🇬",
      "🇹🇹"
    ],
    "reponse": 3
  },
  {
    "id": "q3103",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel acteur a incarné Tony Montana dans « Scarface » ?",
    "options": [
      "Sylvester Stallone",
      "Al Pacino",
      "Joe Pesci",
      "Robert De Niro"
    ],
    "reponse": 1
  },
  {
    "id": "q3104",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel dessert français est un assemblage de pâte feuilletée et de crème pâtissière en plusieurs couches ?",
    "options": [
      "Le saint-honoré",
      "L'éclair",
      "Le paris-brest",
      "Le mille-feuille"
    ],
    "reponse": 3
  },
  {
    "id": "q3105",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇨🇱 De quel pays est-ce le drapeau ?",
    "options": [
      "Chili",
      "Autriche",
      "Chine",
      "Kirghizstan"
    ],
    "reponse": 0
  },
  {
    "id": "q3106",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de min dans 2340 s ?",
    "options": [
      "39",
      "34",
      "31",
      "43"
    ],
    "reponse": 0
  },
  {
    "id": "q3107",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel est le nom du plus grand oiseau terrestre, incapable de voler ?",
    "options": [
      "Le kiwi",
      "Le casoar",
      "L'émeu",
      "L'autruche"
    ],
    "reponse": 3
  },
  {
    "id": "q3108",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1886 appartient à quel siècle ?",
    "options": [
      "17e siècle",
      "18e siècle",
      "19e siècle",
      "20e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q3109",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel est le nom du maillot porté par le leader du classement général du Tour de France ?",
    "options": [
      "Le maillot jaune",
      "Le maillot à pois",
      "Le maillot vert",
      "Le maillot blanc"
    ],
    "reponse": 0
  },
  {
    "id": "q3110",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Japon ?",
    "options": [
      "🇨🇭",
      "🇯🇵",
      "🇯🇲",
      "🇦🇴"
    ],
    "reponse": 1
  },
  {
    "id": "q3111",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1163 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "11e siècle",
      "13e siècle",
      "12e siècle"
    ],
    "reponse": 3
  },
  {
    "id": "q3112",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de h dans 2160 min ?",
    "options": [
      "36",
      "29",
      "42",
      "41"
    ],
    "reponse": 0
  },
  {
    "id": "q3113",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Quel animal marin urticant ne possède ni cerveau ni cœur ?",
    "options": [
      "L'étoile de mer",
      "L'oursin",
      "L'anémone de mer",
      "La méduse"
    ],
    "reponse": 3
  },
  {
    "id": "q3114",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel peintre hollandais du XVIIe siècle a peint « La Jeune Fille à la perle » ?",
    "options": [
      "Pieter de Hooch",
      "Johannes Vermeer",
      "Rembrandt",
      "Frans Hals"
    ],
    "reponse": 1
  },
  {
    "id": "q3115",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle cérémonie américaine récompense chaque année les meilleurs artistes et albums de musique ?",
    "options": [
      "Les Grammy Awards",
      "Les Brit Awards",
      "Les Oscars",
      "Les MTV Music Awards"
    ],
    "reponse": 0
  },
  {
    "id": "q3116",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tachkent est la capitale de quel pays ?",
    "options": [
      "Liberia",
      "Mozambique",
      "Ouzbékistan",
      "Soudan"
    ],
    "reponse": 2
  },
  {
    "id": "q3117",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 40 % de 120 ?",
    "options": [
      "43",
      "48",
      "47",
      "51"
    ],
    "reponse": 1
  },
  {
    "id": "q3118",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇳🇵 De quel pays est-ce le drapeau ?",
    "options": [
      "Vanuatu",
      "Ukraine",
      "Népal",
      "Royaume-Uni"
    ],
    "reponse": 2
  },
  {
    "id": "q3119",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel scientifique a proposé au début du XXe siècle la théorie de la dérive des continents ?",
    "options": [
      "Alfred Wegener",
      "Arthur Holmes",
      "James Hutton",
      "Charles Lyell"
    ],
    "reponse": 0
  },
  {
    "id": "q3120",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse américaine est surnommée « Queen of Pop » ?",
    "options": [
      "Cher",
      "Madonna",
      "Britney Spears",
      "Lady Gaga"
    ],
    "reponse": 1
  },
  {
    "id": "q3121",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 50 % de 60 ?",
    "options": [
      "35",
      "30",
      "26",
      "27"
    ],
    "reponse": 1
  },
  {
    "id": "q3122",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 145 ÷ 5 ?",
    "options": [
      "27",
      "29",
      "34",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q3123",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 196 ÷ 7 ?",
    "options": [
      "33",
      "30",
      "28",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q3124",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel est le nom du processus par lequel l'eau passe de l'état liquide à l'état gazeux ?",
    "options": [
      "L'évaporation",
      "La fusion",
      "La sublimation",
      "La condensation"
    ],
    "reponse": 0
  },
  {
    "id": "q3125",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1193 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "13e siècle",
      "12e siècle",
      "10e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q3126",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Sénégal ?",
    "options": [
      "Franc CFA",
      "Dollar australien",
      "Livre soudanaise",
      "Dinar jordanien"
    ],
    "reponse": 0
  },
  {
    "id": "q3127",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau des Pays-Bas ?",
    "options": [
      "🇨🇲",
      "🇹🇬",
      "🇳🇱",
      "🇴🇲"
    ],
    "reponse": 2
  },
  {
    "id": "q3128",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Suisse",
      "Autriche",
      "Somalie",
      "Laos"
    ],
    "reponse": 3
  },
  {
    "id": "q3129",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Afghanistan ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Asie",
      "Afrique"
    ],
    "reponse": 2
  },
  {
    "id": "q3130",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Côte d'Ivoire ?",
    "options": [
      "🇨🇬",
      "🇪🇸",
      "🇬🇦",
      "🇨🇮"
    ],
    "reponse": 3
  },
  {
    "id": "q3131",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 16 ?",
    "options": [
      "292",
      "249",
      "286",
      "272"
    ],
    "reponse": 3
  },
  {
    "id": "q3132",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quel groupe de rock irlandais a pour chanteur Bono ?",
    "options": [
      "U2",
      "Boyzone",
      "The Cranberries",
      "Thin Lizzy"
    ],
    "reponse": 0
  },
  {
    "id": "q3133",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quelle chanteuse britannique a connu un immense succès avec l'album « 21 » ?",
    "options": [
      "Duffy",
      "Adele",
      "Florence Welch",
      "Amy Winehouse"
    ],
    "reponse": 1
  },
  {
    "id": "q3134",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Quel marsupial australien se nourrit presque exclusivement de feuilles d'eucalyptus ?",
    "options": [
      "Le koala",
      "Le kangourou",
      "Le wombat",
      "Le wallaby"
    ],
    "reponse": 0
  },
  {
    "id": "q3135",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇧🇹 De quel pays est-ce le drapeau ?",
    "options": [
      "Bhoutan",
      "Angola",
      "Belgique",
      "Pakistan"
    ],
    "reponse": 0
  },
  {
    "id": "q3136",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Moldavie ?",
    "options": [
      "Manat turkmène",
      "Tenge",
      "Couronne islandaise",
      "Leu moldave"
    ],
    "reponse": 3
  },
  {
    "id": "q3137",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel fromage français est traditionnellement moulé en forme de cœur ou de losange, originaire de Normandie ?",
    "options": [
      "Le Camembert",
      "Le Neufchâtel",
      "Le Pont-l'Évêque",
      "Le Livarot"
    ],
    "reponse": 1
  },
  {
    "id": "q3138",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Pakistan ?",
    "options": [
      "Sum ouzbek",
      "Roupie pakistanaise",
      "Dinar tunisien",
      "Dollar namibien"
    ],
    "reponse": 1
  },
  {
    "id": "q3139",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCCCXXXVII en chiffres romains ?",
    "options": [
      "3836",
      "3837",
      "3827",
      "3832"
    ],
    "reponse": 1
  },
  {
    "id": "q3140",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2449 en chiffres romains ?",
    "options": [
      "MMCDLIV",
      "MMCDXLIX",
      "MMCDXLIV",
      "MMCDL"
    ],
    "reponse": 1
  },
  {
    "id": "q3141",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 × 12 ?",
    "options": [
      "187",
      "182",
      "166",
      "180"
    ],
    "reponse": 3
  },
  {
    "id": "q3142",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Quel écrivain français de la Renaissance est l'auteur des géants « Gargantua » et « Pantagruel » ?",
    "options": [
      "François Rabelais",
      "Clément Marot",
      "Michel de Montaigne",
      "Joachim du Bellay"
    ],
    "reponse": 0
  },
  {
    "id": "q3143",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 34 h ?",
    "options": [
      "2331",
      "2209",
      "2108",
      "2040"
    ],
    "reponse": 3
  },
  {
    "id": "q3144",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quelle déesse grecque, enlevée par Hadès, passe une partie de l'année aux Enfers, expliquant ainsi les saisons ?",
    "options": [
      "Artémis",
      "Déméter",
      "Perséphone",
      "Héra"
    ],
    "reponse": 2
  },
  {
    "id": "q3145",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Syrie ?",
    "options": [
      "Livre syrienne",
      "Dollar bahaméen",
      "Shilling tanzanien",
      "Escudo cap-verdien"
    ],
    "reponse": 0
  },
  {
    "id": "q3146",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 900 ?",
    "options": [
      "30",
      "33",
      "27",
      "34"
    ],
    "reponse": 0
  },
  {
    "id": "q3147",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Addis-Abeba est la capitale de quel pays ?",
    "options": [
      "Éthiopie",
      "Monténégro",
      "Jordanie",
      "Nouvelle-Zélande"
    ],
    "reponse": 0
  },
  {
    "id": "q3148",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelles sont les deux mascottes historiquement rivales des consoles Nintendo et Sega dans les années 1990 ?",
    "options": [
      "Crash Bandicoot et Spyro",
      "Link et Kirby",
      "Mario et Sonic",
      "Pac-Man et Q*bert"
    ],
    "reponse": 2
  },
  {
    "id": "q3149",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « P » ?",
    "options": [
      "Lanthane",
      "Protactinium",
      "Phosphore",
      "Or"
    ],
    "reponse": 2
  },
  {
    "id": "q3150",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de min dans 20 h ?",
    "options": [
      "1200",
      "1226",
      "1094",
      "1285"
    ],
    "reponse": 0
  },
  {
    "id": "q3151",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Angola ?",
    "options": [
      "Luanda",
      "Beyrouth",
      "Prague",
      "Erevan"
    ],
    "reponse": 0
  },
  {
    "id": "q3152",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel grand lac africain borde le Kenya, l'Ouganda et la Tanzanie ?",
    "options": [
      "Le lac Tchad",
      "Le lac Victoria",
      "Le lac Malawi",
      "Le lac Tanganyika"
    ],
    "reponse": 1
  },
  {
    "id": "q3153",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel type de rayonnement, découvert par Röntgen en 1895, permet d'imager l'intérieur du corps humain ?",
    "options": [
      "Les rayons X",
      "Les infrarouges",
      "Les rayons gamma",
      "Les ultraviolets"
    ],
    "reponse": 0
  },
  {
    "id": "q3154",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de stratégie en temps réel oppose Zergs, Protoss et Terrans ?",
    "options": [
      "Age of Empires",
      "Command & Conquer",
      "StarCraft",
      "Warcraft"
    ],
    "reponse": 2
  },
  {
    "id": "q3155",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle forme géométrique caractérise la molécule d'ADN ?",
    "options": [
      "La spirale simple",
      "La double hélice",
      "La chaîne linéaire",
      "Le zigzag"
    ],
    "reponse": 1
  },
  {
    "id": "q3156",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 5 × 14 ?",
    "options": [
      "68",
      "70",
      "76",
      "77"
    ],
    "reponse": 1
  },
  {
    "id": "q3157",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 1000 ?",
    "options": [
      "292",
      "338",
      "298",
      "300"
    ],
    "reponse": 3
  },
  {
    "id": "q3158",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film de 1994 raconte la vie d'un homme simple d'esprit qui traverse les grands événements du XXe siècle ?",
    "options": [
      "Rain Man",
      "Big",
      "The Truman Show",
      "Forrest Gump"
    ],
    "reponse": 3
  },
  {
    "id": "q3159",
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
    "id": "q3160",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1030 appartient à quel siècle ?",
    "options": [
      "10e siècle",
      "9e siècle",
      "11e siècle",
      "12e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q3161",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMLXII en chiffres romains ?",
    "options": [
      "3052",
      "3062",
      "3064",
      "3063"
    ],
    "reponse": 1
  },
  {
    "id": "q3162",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série met en scène deux frères vampires amoureux de la même jeune femme dans la ville de Mystic Falls ?",
    "options": [
      "True Blood",
      "The Vampire Diaries",
      "Teen Wolf",
      "Vampire Academy"
    ],
    "reponse": 1
  },
  {
    "id": "q3163",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 2918 en chiffres romains ?",
    "options": [
      "MMCMXXIII",
      "MMCMXVIII",
      "MMCMXIX",
      "MMCMXVI"
    ],
    "reponse": 1
  },
  {
    "id": "q3164",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1374 en chiffres romains ?",
    "options": [
      "MCCCLXXIX",
      "MCCCLXXIV",
      "MCCCLXXV",
      "MCCCLXXVI"
    ],
    "reponse": 1
  },
  {
    "id": "q3165",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel sinistre de 1666 a détruit une grande partie du centre historique d'une capitale britannique ?",
    "options": [
      "L'incendie du Reichstag",
      "Le grand incendie de Rome",
      "Le grand incendie de Londres",
      "Le blitz de Londres"
    ],
    "reponse": 2
  },
  {
    "id": "q3166",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Khartoum est la capitale de quel pays ?",
    "options": [
      "Estonie",
      "Afghanistan",
      "Finlande",
      "Soudan"
    ],
    "reponse": 3
  },
  {
    "id": "q3167",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel physicien britannique a marqué la cosmologie moderne par ses travaux sur les trous noirs, exposés dans un best-seller de vulgarisation ?",
    "options": [
      "Brian Cox",
      "Roger Penrose",
      "Stephen Hawking",
      "Freeman Dyson"
    ],
    "reponse": 2
  },
  {
    "id": "q3168",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel manga et anime japonais met en scène un jeune ninja rejeté par son village car il abrite un renard à neuf queues ?",
    "options": [
      "Naruto",
      "Bleach",
      "One Piece",
      "Dragon Ball"
    ],
    "reponse": 0
  },
  {
    "id": "q3169",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel écrivain et architecte catalan est l'auteur de la Sagrada Familia à Barcelone ?",
    "options": [
      "Ricardo Bofill",
      "Santiago Calatrava",
      "Rafael Moneo",
      "Antoni Gaudí"
    ],
    "reponse": 3
  },
  {
    "id": "q3170",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit les aventures de Tintin ?",
    "options": [
      "Franquin",
      "Peyo",
      "Hergé",
      "Morris"
    ],
    "reponse": 2
  },
  {
    "id": "q3171",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇪 De quel pays est-ce le drapeau ?",
    "options": [
      "Suède",
      "Philippines",
      "Luxembourg",
      "El Salvador"
    ],
    "reponse": 0
  },
  {
    "id": "q3172",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Manganèse ?",
    "options": [
      "Mg",
      "Sb",
      "Mo",
      "Mn"
    ],
    "reponse": 3
  },
  {
    "id": "q3173",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇶🇦 De quel pays est-ce le drapeau ?",
    "options": [
      "Norvège",
      "Géorgie",
      "Uruguay",
      "Qatar"
    ],
    "reponse": 3
  },
  {
    "id": "q3174",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Maurice ?",
    "options": [
      "Asie",
      "Europe",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q3175",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1065 et 1260 ?",
    "options": [
      "170",
      "202",
      "195",
      "207"
    ],
    "reponse": 2
  },
  {
    "id": "q3176",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 853 - 60 ?",
    "options": [
      "790",
      "794",
      "791",
      "793"
    ],
    "reponse": 3
  },
  {
    "id": "q3177",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Lesotho ?",
    "options": [
      "🇨🇦",
      "🇸🇬",
      "🇨🇿",
      "🇱🇸"
    ],
    "reponse": 3
  },
  {
    "id": "q3178",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Nassau est la capitale de quel pays ?",
    "options": [
      "Somalie",
      "Kazakhstan",
      "Bahamas",
      "Botswana"
    ],
    "reponse": 2
  },
  {
    "id": "q3179",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 324 ÷ 12 ?",
    "options": [
      "26",
      "27",
      "22",
      "28"
    ],
    "reponse": 1
  },
  {
    "id": "q3180",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien du soleil est souvent représenté avec une tête de faucon ?",
    "options": [
      "Horus",
      "Seth",
      "Rê (Rê-Horakhty)",
      "Anubis"
    ],
    "reponse": 2
  },
  {
    "id": "q3181",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 6 × 16 ?",
    "options": [
      "96",
      "102",
      "106",
      "108"
    ],
    "reponse": 0
  },
  {
    "id": "q3182",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 507 + 59 ?",
    "options": [
      "563",
      "568",
      "569",
      "566"
    ],
    "reponse": 3
  },
  {
    "id": "q3183",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 9 ÷ 3 ?",
    "options": [
      "6",
      "2",
      "3",
      "0"
    ],
    "reponse": 2
  },
  {
    "id": "q3184",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Ac » ?",
    "options": [
      "Bismuth",
      "Thallium",
      "Europium",
      "Actinium"
    ],
    "reponse": 3
  },
  {
    "id": "q3185",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu grec est le père de tous les dieux olympiens selon la généalogie classique ?",
    "options": [
      "Zeus",
      "Ouranos",
      "Poséidon",
      "Cronos"
    ],
    "reponse": 3
  },
  {
    "id": "q3186",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇸🇰 De quel pays est-ce le drapeau ?",
    "options": [
      "Guatemala",
      "Monténégro",
      "Mexique",
      "Slovaquie"
    ],
    "reponse": 3
  },
  {
    "id": "q3187",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MCDXLI en chiffres romains ?",
    "options": [
      "1441",
      "1446",
      "1443",
      "1436"
    ],
    "reponse": 0
  },
  {
    "id": "q3188",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Fluor ?",
    "options": [
      "Ta",
      "La",
      "Xe",
      "F"
    ],
    "reponse": 3
  },
  {
    "id": "q3189",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Érythrée ?",
    "options": [
      "Phnom Penh",
      "Lomé",
      "Bratislava",
      "Asmara"
    ],
    "reponse": 3
  },
  {
    "id": "q3190",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie « API » en programmation ?",
    "options": [
      "Application Programming Interface",
      "Advanced Programming Interface",
      "Automated Program Instruction",
      "Application Process Integration"
    ],
    "reponse": 0
  },
  {
    "id": "q3191",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Sb » ?",
    "options": [
      "Uranium",
      "Strontium",
      "Néon",
      "Antimoine"
    ],
    "reponse": 3
  },
  {
    "id": "q3192",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Philippines ?",
    "options": [
      "Peso philippin",
      "Gourde",
      "Cedi",
      "Kwacha zambien"
    ],
    "reponse": 0
  },
  {
    "id": "q3193",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 8 × 6 ?",
    "options": [
      "49",
      "48",
      "53",
      "55"
    ],
    "reponse": 1
  },
  {
    "id": "q3194",
    "categorie": "Littérature",
    "difficulte": 3,
    "question": "Quel écrivain français, également musicien de jazz, est l'auteur de « L'Écume des jours » ?",
    "options": [
      "Boris Vian",
      "Albert Camus",
      "Jacques Prévert",
      "Raymond Queneau"
    ],
    "reponse": 0
  },
  {
    "id": "q3195",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Quel poète grec de l'Antiquité est traditionnellement crédité de « l'Iliade » et de « l'Odyssée » ?",
    "options": [
      "Hésiode",
      "Homère",
      "Sophocle",
      "Euripide"
    ],
    "reponse": 1
  },
  {
    "id": "q3196",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 25 siècle(s) ?",
    "options": [
      "2104",
      "2250",
      "2500",
      "2309"
    ],
    "reponse": 2
  },
  {
    "id": "q3197",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Cs » ?",
    "options": [
      "Césium",
      "Terbium",
      "Holmium",
      "Aluminium"
    ],
    "reponse": 0
  },
  {
    "id": "q3198",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 30 cl ?",
    "options": [
      "320",
      "323",
      "293",
      "300"
    ],
    "reponse": 3
  },
  {
    "id": "q3199",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Dans quel film culte Leonardo DiCaprio joue-t-il un personnage nommé Jack Dawson ?",
    "options": [
      "Inception",
      "Gatsby le Magnifique",
      "Titanic",
      "Le Loup de Wall Street"
    ],
    "reponse": 2
  },
  {
    "id": "q3200",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie d'Algérie ?",
    "options": [
      "Dinar algérien",
      "Rial iranien",
      "Nakfa",
      "Quetzal"
    ],
    "reponse": 0
  },
  {
    "id": "q3201",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 526 - 165 ?",
    "options": [
      "361",
      "358",
      "363",
      "360"
    ],
    "reponse": 0
  },
  {
    "id": "q3202",
    "categorie": "Cinéma",
    "difficulte": 2,
    "question": "Quel réalisateur excentrique est connu pour « Edward aux mains d'argent » et « Beetlejuice » ?",
    "options": [
      "Wes Anderson",
      "Guillermo del Toro",
      "Terry Gilliam",
      "Tim Burton"
    ],
    "reponse": 3
  },
  {
    "id": "q3203",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1739 appartient à quel siècle ?",
    "options": [
      "19e siècle",
      "18e siècle",
      "16e siècle",
      "17e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q3204",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1260 et 1496 ?",
    "options": [
      "241",
      "251",
      "224",
      "236"
    ],
    "reponse": 3
  },
  {
    "id": "q3205",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quelle série britannique de science-fiction, diffusée depuis 1963, met en scène un extraterrestre voyageant dans le temps à bord d'une cabine téléphonique bleue ?",
    "options": [
      "Sliders",
      "Torchwood",
      "Doctor Who",
      "Red Dwarf"
    ],
    "reponse": 2
  },
  {
    "id": "q3206",
    "categorie": "Sciences",
    "difficulte": 3,
    "question": "Quel physicien danois a proposé un modèle de l'atome avec des électrons en orbites ?",
    "options": [
      "Werner Heisenberg",
      "Max Planck",
      "Niels Bohr",
      "Erwin Schrödinger"
    ],
    "reponse": 2
  },
  {
    "id": "q3207",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle série sud-coréenne met en scène des joueurs surendettés participant à des jeux d'enfants mortels pour une somme colossale ?",
    "options": [
      "Parasite",
      "The Platform",
      "Alice in Borderland",
      "Squid Game"
    ],
    "reponse": 3
  },
  {
    "id": "q3208",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Corée du Sud ?",
    "options": [
      "Bangkok",
      "Ankara",
      "Tbilissi",
      "Séoul"
    ],
    "reponse": 3
  },
  {
    "id": "q3209",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Kenya ?",
    "options": [
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique",
      "Europe"
    ],
    "reponse": 2
  },
  {
    "id": "q3210",
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
    "id": "q3211",
    "categorie": "Histoire",
    "difficulte": 2,
    "question": "Quel assassinat commis à Sarajevo en 1914 a déclenché la Première Guerre mondiale ?",
    "options": [
      "L'assassinat de Raspoutine",
      "L'assassinat de Jean Jaurès",
      "L'assassinat de François-Ferdinand",
      "L'assassinat du tsar Alexandre II"
    ],
    "reponse": 2
  },
  {
    "id": "q3212",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Portugal ?",
    "options": [
      "Yen",
      "Dinar irakien",
      "Euro",
      "Manat turkmène"
    ],
    "reponse": 2
  },
  {
    "id": "q3213",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Maseru est la capitale de quel pays ?",
    "options": [
      "Brésil",
      "Lesotho",
      "Iran",
      "Barbade"
    ],
    "reponse": 1
  },
  {
    "id": "q3214",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMCMLXXXVIII en chiffres romains ?",
    "options": [
      "2990",
      "2988",
      "2983",
      "2987"
    ],
    "reponse": 1
  },
  {
    "id": "q3215",
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
    "id": "q3216",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Dy » ?",
    "options": [
      "Dysprosium",
      "Yttrium",
      "Vanadium",
      "Ruthénium"
    ],
    "reponse": 0
  },
  {
    "id": "q3217",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de siècle(s) dans 2400 année(s) ?",
    "options": [
      "27",
      "29",
      "24",
      "26"
    ],
    "reponse": 2
  },
  {
    "id": "q3218",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « As » ?",
    "options": [
      "Technétium",
      "Europium",
      "Xénon",
      "Arsenic"
    ],
    "reponse": 3
  },
  {
    "id": "q3219",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Qui a cofondé Instagram avec Mike Krieger en 2010 ?",
    "options": [
      "Kevin Systrom",
      "Tom Anderson",
      "Evan Spiegel",
      "Jack Dorsey"
    ],
    "reponse": 0
  },
  {
    "id": "q3220",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de année(s) dans 24 siècle(s) ?",
    "options": [
      "2400",
      "2442",
      "2168",
      "2465"
    ],
    "reponse": 0
  },
  {
    "id": "q3221",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Algérie ?",
    "options": [
      "Asie",
      "Amérique du Sud",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q3222",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de semaine(s) dans 112 jour(s) ?",
    "options": [
      "12",
      "15",
      "16",
      "17"
    ],
    "reponse": 2
  },
  {
    "id": "q3223",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1067 et 1212 ?",
    "options": [
      "128",
      "164",
      "125",
      "145"
    ],
    "reponse": 3
  },
  {
    "id": "q3224",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1589 en chiffres romains ?",
    "options": [
      "MDXCI",
      "MDXC",
      "MDLXXIX",
      "MDLXXXIX"
    ],
    "reponse": 3
  },
  {
    "id": "q3225",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de ml dans 3 l ?",
    "options": [
      "3368",
      "3063",
      "3240",
      "3000"
    ],
    "reponse": 3
  },
  {
    "id": "q3226",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 811 - 804 ?",
    "options": [
      "9",
      "6",
      "4",
      "7"
    ],
    "reponse": 3
  },
  {
    "id": "q3227",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Papouasie-Nouvelle-Guinée ?",
    "options": [
      "Belgrade",
      "Quito",
      "Apia",
      "Port Moresby"
    ],
    "reponse": 3
  },
  {
    "id": "q3228",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 13 × 10 ?",
    "options": [
      "122",
      "130",
      "147",
      "121"
    ],
    "reponse": 1
  },
  {
    "id": "q3229",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe de rock américain, mené par Axl Rose, est connu pour « Sweet Child o' Mine » ?",
    "options": [
      "Bon Jovi",
      "Van Halen",
      "Guns N' Roses",
      "Aerosmith"
    ],
    "reponse": 2
  },
  {
    "id": "q3230",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pt » ?",
    "options": [
      "Antimoine",
      "Platine",
      "Bore",
      "Or"
    ],
    "reponse": 1
  },
  {
    "id": "q3231",
    "categorie": "Nature & Animaux",
    "difficulte": 1,
    "question": "Combien de pattes possède une araignée ?",
    "options": [
      "4",
      "6",
      "10",
      "8"
    ],
    "reponse": 3
  },
  {
    "id": "q3232",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 60 année(s) ?",
    "options": [
      "3",
      "5",
      "6",
      "7"
    ],
    "reponse": 2
  },
  {
    "id": "q3233",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Croatie ?",
    "options": [
      "Livre turque",
      "Franc comorien",
      "Shilling tanzanien",
      "Euro"
    ],
    "reponse": 3
  },
  {
    "id": "q3234",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Syrie ?",
    "options": [
      "Kigali",
      "Phnom Penh",
      "Bagdad",
      "Damas"
    ],
    "reponse": 3
  },
  {
    "id": "q3235",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 978 + 556 ?",
    "options": [
      "1537",
      "1533",
      "1534",
      "1536"
    ],
    "reponse": 2
  },
  {
    "id": "q3236",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 151 - 66 ?",
    "options": [
      "86",
      "88",
      "85",
      "87"
    ],
    "reponse": 2
  },
  {
    "id": "q3237",
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
    "id": "q3238",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Arabie saoudite ?",
    "options": [
      "🇸🇦",
      "🇵🇰",
      "🇨🇩",
      "🇲🇰"
    ],
    "reponse": 0
  },
  {
    "id": "q3239",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Que signifie « USB » ?",
    "options": [
      "United Serial Board",
      "Universal System Bus",
      "Universal Serial Bus",
      "Unified System Board"
    ],
    "reponse": 2
  },
  {
    "id": "q3240",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Bénin ?",
    "options": [
      "🇬🇦",
      "🇨🇻",
      "🇧🇭",
      "🇧🇯"
    ],
    "reponse": 3
  },
  {
    "id": "q3241",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Lesotho ?",
    "options": [
      "Canberra",
      "Harare",
      "Maseru",
      "Pyongyang"
    ],
    "reponse": 2
  },
  {
    "id": "q3242",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 473 appartient à quel siècle ?",
    "options": [
      "5e siècle",
      "4e siècle",
      "3e siècle",
      "6e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q3243",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 2051 appartient à quel siècle ?",
    "options": [
      "19e siècle",
      "22e siècle",
      "21e siècle",
      "20e siècle"
    ],
    "reponse": 2
  },
  {
    "id": "q3244",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 471 - 160 ?",
    "options": [
      "308",
      "311",
      "312",
      "310"
    ],
    "reponse": 1
  },
  {
    "id": "q3245",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de m dans 6000 mm ?",
    "options": [
      "8",
      "7",
      "6",
      "5"
    ],
    "reponse": 2
  },
  {
    "id": "q3246",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Vienne est la capitale de quel pays ?",
    "options": [
      "Vanuatu",
      "Maldives",
      "Autriche",
      "Bahamas"
    ],
    "reponse": 2
  },
  {
    "id": "q3247",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 743 - 661 ?",
    "options": [
      "79",
      "83",
      "81",
      "82"
    ],
    "reponse": 3
  },
  {
    "id": "q3248",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Zirconium ?",
    "options": [
      "Al",
      "Au",
      "Zr",
      "Fe"
    ],
    "reponse": 2
  },
  {
    "id": "q3249",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 590 + 464 ?",
    "options": [
      "1051",
      "1053",
      "1054",
      "1055"
    ],
    "reponse": 2
  },
  {
    "id": "q3250",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit la pièce de théâtre « Cyrano de Bergerac » ?",
    "options": [
      "Pierre Corneille",
      "Edmond Rostand",
      "Molière",
      "Jean Racine"
    ],
    "reponse": 1
  },
  {
    "id": "q3251",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 126 ÷ 14 ?",
    "options": [
      "7",
      "12",
      "11",
      "9"
    ],
    "reponse": 3
  },
  {
    "id": "q3252",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 185 - 54 ?",
    "options": [
      "134",
      "131",
      "132",
      "128"
    ],
    "reponse": 1
  },
  {
    "id": "q3253",
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
    "id": "q3254",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 680 en chiffres romains ?",
    "options": [
      "DCLXXV",
      "DCLXXXV",
      "DCLXXXII",
      "DCLXXX"
    ],
    "reponse": 3
  },
  {
    "id": "q3255",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quel plat grec est composé de couches d'aubergines, de viande hachée et de béchamel gratinées ?",
    "options": [
      "Le tzatziki",
      "Les souvlakis",
      "La moussaka",
      "La feta grillée"
    ],
    "reponse": 2
  },
  {
    "id": "q3256",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Argent ?",
    "options": [
      "Ag",
      "Re",
      "Cu",
      "Sr"
    ],
    "reponse": 0
  },
  {
    "id": "q3257",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie des Bahamas ?",
    "options": [
      "Dollar bahaméen",
      "Yen",
      "Denar macédonien",
      "Dinar algérien"
    ],
    "reponse": 0
  },
  {
    "id": "q3258",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 1937 en chiffres romains ?",
    "options": [
      "MCMXLVII",
      "MCMXXXVII",
      "MCMXXXVIII",
      "MCMXXXV"
    ],
    "reponse": 1
  },
  {
    "id": "q3259",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Saint-Marin ?",
    "options": [
      "Asie",
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe"
    ],
    "reponse": 3
  },
  {
    "id": "q3260",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Allemagne ?",
    "options": [
      "🇩🇪",
      "🇲🇨",
      "🇧🇦",
      "🇦🇩"
    ],
    "reponse": 0
  },
  {
    "id": "q3261",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Pourquoi un son ne peut-il pas se propager dans le vide spatial ?",
    "options": [
      "Il n'y a pas de matière pour transporter les vibrations",
      "La gravité l'en empêche",
      "La température y est trop basse",
      "La lumière brouille le signal"
    ],
    "reponse": 0
  },
  {
    "id": "q3262",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente CDXXXIX en chiffres romains ?",
    "options": [
      "438",
      "440",
      "429",
      "439"
    ],
    "reponse": 3
  },
  {
    "id": "q3263",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau d'Uruguay ?",
    "options": [
      "🇨🇲",
      "🇺🇾",
      "🇫🇮",
      "🇰🇪"
    ],
    "reponse": 1
  },
  {
    "id": "q3264",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 138 + 262 ?",
    "options": [
      "403",
      "401",
      "397",
      "400"
    ],
    "reponse": 3
  },
  {
    "id": "q3265",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de g dans 10 kg ?",
    "options": [
      "10000",
      "10675",
      "10711",
      "10780"
    ],
    "reponse": 0
  },
  {
    "id": "q3266",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Quelle entreprise a créé le moteur de recherche Bing ?",
    "options": [
      "Yahoo",
      "Google",
      "Microsoft",
      "Amazon"
    ],
    "reponse": 2
  },
  {
    "id": "q3267",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 443 + 782 ?",
    "options": [
      "1225",
      "1222",
      "1227",
      "1224"
    ],
    "reponse": 0
  },
  {
    "id": "q3268",
    "categorie": "Sport",
    "difficulte": 3,
    "question": "Quelle célèbre course hippique britannique à obstacles se déroule chaque année sur l'hippodrome d'Aintree ?",
    "options": [
      "Le Cheltenham Gold Cup",
      "L'Ascot",
      "Le Grand National",
      "Le Derby d'Epsom"
    ],
    "reponse": 2
  },
  {
    "id": "q3269",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel compositeur allemand a écrit l'oratorio « Le Messie », très joué à l'occasion de Noël ?",
    "options": [
      "Antonio Vivaldi",
      "Johann Sebastian Bach",
      "Joseph Haydn",
      "Georg Friedrich Haendel"
    ],
    "reponse": 3
  },
  {
    "id": "q3270",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quelle particule subatomique porte une charge négative ?",
    "options": [
      "Le photon",
      "Le proton",
      "L'électron",
      "Le neutron"
    ],
    "reponse": 2
  },
  {
    "id": "q3271",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quelle est la racine carrée de 529 ?",
    "options": [
      "25",
      "19",
      "23",
      "24"
    ],
    "reponse": 2
  },
  {
    "id": "q3272",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse française est connue pour « La Vie en rose » ?",
    "options": [
      "Édith Piaf",
      "Barbara",
      "Dalida",
      "Mireille Mathieu"
    ],
    "reponse": 0
  },
  {
    "id": "q3273",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Nicaragua ?",
    "options": [
      "Cordoba",
      "Rial omanais",
      "Couronne danoise",
      "Ariary"
    ],
    "reponse": 0
  },
  {
    "id": "q3274",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Pa » ?",
    "options": [
      "Protactinium",
      "Ytterbium",
      "Antimoine",
      "Rhénium"
    ],
    "reponse": 0
  },
  {
    "id": "q3275",
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
    "id": "q3276",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quel texte sacré maya raconte la création du monde et les aventures de héros jumeaux ?",
    "options": [
      "Le Chilam Balam",
      "Le Popol Vuh",
      "Le Codex de Dresde",
      "Le Rabinal Achí"
    ],
    "reponse": 1
  },
  {
    "id": "q3277",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Ouganda ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Afrique",
      "Océanie"
    ],
    "reponse": 2
  },
  {
    "id": "q3278",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau de Roumanie ?",
    "options": [
      "🇿🇼",
      "🇳🇱",
      "🇽🇰",
      "🇷🇴"
    ],
    "reponse": 3
  },
  {
    "id": "q3279",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMXLVII en chiffres romains ?",
    "options": [
      "2052",
      "2042",
      "2046",
      "2047"
    ],
    "reponse": 3
  },
  {
    "id": "q3280",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇺🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Ouganda",
      "Congo",
      "Biélorussie",
      "Malaisie"
    ],
    "reponse": 0
  },
  {
    "id": "q3281",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMDCCLIII en chiffres romains ?",
    "options": [
      "2743",
      "2763",
      "2753",
      "2755"
    ],
    "reponse": 2
  },
  {
    "id": "q3282",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 30 % de 400 ?",
    "options": [
      "118",
      "105",
      "120",
      "134"
    ],
    "reponse": 2
  },
  {
    "id": "q3283",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle spécialité suisse, à base de pommes de terre râpées et dorées à la poêle, accompagne souvent la fondue ou la raclette ?",
    "options": [
      "Le gruyère fondu",
      "La fondue",
      "Le rösti",
      "La raclette"
    ],
    "reponse": 2
  },
  {
    "id": "q3284",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Aluminium ?",
    "options": [
      "Al",
      "U",
      "Po",
      "Cs"
    ],
    "reponse": 0
  },
  {
    "id": "q3285",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 456 en chiffres romains ?",
    "options": [
      "CDLXI",
      "CDLVI",
      "CDLI",
      "CDXLVI"
    ],
    "reponse": 1
  },
  {
    "id": "q3286",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 251 + 279 ?",
    "options": [
      "533",
      "530",
      "532",
      "527"
    ],
    "reponse": 1
  },
  {
    "id": "q3287",
    "categorie": "Culture générale",
    "difficulte": 3,
    "question": "Quel dessert autrichien est un gâteau au chocolat nappé de confiture d'abricot, originaire de Vienne ?",
    "options": [
      "Le linzertorte",
      "Le strudel",
      "Le sachertorte",
      "Le kaiserschmarrn"
    ],
    "reponse": 2
  },
  {
    "id": "q3288",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1210 et 1489 ?",
    "options": [
      "289",
      "307",
      "242",
      "279"
    ],
    "reponse": 3
  },
  {
    "id": "q3289",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Naypyidaw est la capitale de quel pays ?",
    "options": [
      "Philippines",
      "Azerbaïdjan",
      "Myanmar",
      "Tunisie"
    ],
    "reponse": 2
  },
  {
    "id": "q3290",
    "categorie": "Sport",
    "difficulte": 2,
    "question": "Combien de mètres fait la distance d'un marathon ?",
    "options": [
      "45 km",
      "42,195 km",
      "40 km",
      "50 km"
    ],
    "reponse": 1
  },
  {
    "id": "q3291",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇲 De quel pays est-ce le drapeau ?",
    "options": [
      "Arménie",
      "Qatar",
      "Suisse",
      "Jamaïque"
    ],
    "reponse": 0
  },
  {
    "id": "q3292",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 105 + 936 ?",
    "options": [
      "1039",
      "1040",
      "1041",
      "1038"
    ],
    "reponse": 2
  },
  {
    "id": "q3293",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇰🇬 De quel pays est-ce le drapeau ?",
    "options": [
      "Philippines",
      "Mexique",
      "Japon",
      "Kirghizstan"
    ],
    "reponse": 3
  },
  {
    "id": "q3294",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie de Zambie ?",
    "options": [
      "Lek",
      "Couronne suédoise",
      "Kwacha zambien",
      "Livre égyptienne"
    ],
    "reponse": 2
  },
  {
    "id": "q3295",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 14 × 15 ?",
    "options": [
      "210",
      "217",
      "224",
      "207"
    ],
    "reponse": 0
  },
  {
    "id": "q3296",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel dieu égyptien de la mort et de la renaissance est aussi le juge des âmes ?",
    "options": [
      "Rê",
      "Seth",
      "Osiris",
      "Anubis"
    ],
    "reponse": 2
  },
  {
    "id": "q3297",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Finlande ?",
    "options": [
      "Ottawa",
      "Helsinki",
      "Bagdad",
      "Damas"
    ],
    "reponse": 1
  },
  {
    "id": "q3298",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 138 ÷ 6 ?",
    "options": [
      "24",
      "21",
      "23",
      "26"
    ],
    "reponse": 2
  },
  {
    "id": "q3299",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3282 en chiffres romains ?",
    "options": [
      "MMMCCLXXXIII",
      "MMMCCLXXXII",
      "MMMCCLXXX",
      "MMMCCXCII"
    ],
    "reponse": 1
  },
  {
    "id": "q3300",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quel héros grec tue le lion de Némée lors de son premier travail ?",
    "options": [
      "Héraclès (Hercule)",
      "Jason",
      "Thésée",
      "Persée"
    ],
    "reponse": 0
  },
  {
    "id": "q3301",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quel phénomène désigne l'augmentation progressive de la température moyenne de l'atmosphère terrestre, liée aux activités humaines ?",
    "options": [
      "La subduction",
      "L'effet Doppler",
      "Le réchauffement climatique",
      "L'inversion thermique"
    ],
    "reponse": 2
  },
  {
    "id": "q3302",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Somalie ?",
    "options": [
      "Kampala",
      "Mogadiscio",
      "Caracas",
      "Windhoek"
    ],
    "reponse": 1
  },
  {
    "id": "q3303",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇩🇿 De quel pays est-ce le drapeau ?",
    "options": [
      "Timor oriental",
      "Guinée",
      "Arménie",
      "Algérie"
    ],
    "reponse": 3
  },
  {
    "id": "q3304",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Abou Dabi est la capitale de quel pays ?",
    "options": [
      "République tchèque",
      "Inde",
      "Vietnam",
      "Émirats arabes unis"
    ],
    "reponse": 3
  },
  {
    "id": "q3305",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1268 et 1447 ?",
    "options": [
      "179",
      "188",
      "170",
      "205"
    ],
    "reponse": 0
  },
  {
    "id": "q3306",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quelle ville est la capitale économique du Nigeria, bien que ce ne soit pas la capitale politique ?",
    "options": [
      "Lagos",
      "Abuja",
      "Ibadan",
      "Kano"
    ],
    "reponse": 0
  },
  {
    "id": "q3307",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel espion britannique fictif, matricule 007, est adapté au cinéma depuis les années 1960 ?",
    "options": [
      "Mission Impossible",
      "James Bond (007)",
      "Jason Bourne",
      "Kingsman"
    ],
    "reponse": 1
  },
  {
    "id": "q3308",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Quelle est la température d'ébullition de l'eau au niveau de la mer ?",
    "options": [
      "100 °C",
      "80 °C",
      "120 °C",
      "90 °C"
    ],
    "reponse": 0
  },
  {
    "id": "q3309",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de l dans 3600 cl ?",
    "options": [
      "31",
      "44",
      "28",
      "36"
    ],
    "reponse": 3
  },
  {
    "id": "q3310",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de décennie(s) dans 300 année(s) ?",
    "options": [
      "29",
      "35",
      "30",
      "25"
    ],
    "reponse": 2
  },
  {
    "id": "q3311",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Malawi ?",
    "options": [
      "Dacca",
      "Canberra",
      "Lilongwe",
      "Skopje"
    ],
    "reponse": 2
  },
  {
    "id": "q3312",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 15 % de 500 ?",
    "options": [
      "85",
      "75",
      "83",
      "71"
    ],
    "reponse": 1
  },
  {
    "id": "q3313",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle guerre mythologique grecque a opposé les jeunes dieux olympiens à leurs prédécesseurs, les Titans ?",
    "options": [
      "La Gigantomachie",
      "La Titanomachie",
      "La guerre des dieux nordiques",
      "La guerre de Troie"
    ],
    "reponse": 1
  },
  {
    "id": "q3314",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 3188 en chiffres romains ?",
    "options": [
      "MMMCLXXXIX",
      "MMMCXCIII",
      "MMMCLXXXVIII",
      "MMMCLXXVIII"
    ],
    "reponse": 2
  },
  {
    "id": "q3315",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 654 - 327 ?",
    "options": [
      "327",
      "328",
      "324",
      "330"
    ],
    "reponse": 0
  },
  {
    "id": "q3316",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 649 + 743 ?",
    "options": [
      "1394",
      "1389",
      "1390",
      "1392"
    ],
    "reponse": 3
  },
  {
    "id": "q3317",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Banjul est la capitale de quel pays ?",
    "options": [
      "Macédoine du Nord",
      "Slovaquie",
      "Italie",
      "Gambie"
    ],
    "reponse": 3
  },
  {
    "id": "q3318",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Autriche ?",
    "options": [
      "Europe",
      "Océanie",
      "Amérique du Nord",
      "Afrique"
    ],
    "reponse": 0
  },
  {
    "id": "q3319",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Kazakhstan",
      "Serbie",
      "Hongrie",
      "Congo"
    ],
    "reponse": 1
  },
  {
    "id": "q3320",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Que signifie « GIF », format d'image animée populaire ?",
    "options": [
      "General Interchange File",
      "Global Image Format",
      "Graphic Image File",
      "Graphics Interchange Format"
    ],
    "reponse": 3
  },
  {
    "id": "q3321",
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
    "id": "q3322",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 795 + 217 ?",
    "options": [
      "1012",
      "1010",
      "1013",
      "1011"
    ],
    "reponse": 0
  },
  {
    "id": "q3323",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Se » ?",
    "options": [
      "Yttrium",
      "Cérium",
      "Sélénium",
      "Fer"
    ],
    "reponse": 2
  },
  {
    "id": "q3324",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quelle disposition de clavier, la plus répandue dans les pays anglophones, tire son nom des six premières lettres de sa rangée supérieure ?",
    "options": [
      "DVORAK",
      "QWERTY",
      "AZERTY",
      "QWERTZ"
    ],
    "reponse": 1
  },
  {
    "id": "q3325",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 64 - 38 ?",
    "options": [
      "26",
      "29",
      "23",
      "25"
    ],
    "reponse": 0
  },
  {
    "id": "q3326",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMDCLI en chiffres romains ?",
    "options": [
      "3651",
      "3661",
      "3649",
      "3652"
    ],
    "reponse": 0
  },
  {
    "id": "q3327",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle actrice incarne Hermione Granger dans la saga « Harry Potter » ?",
    "options": [
      "Emilia Clarke",
      "Emma Roberts",
      "Emma Stone",
      "Emma Watson"
    ],
    "reponse": 3
  },
  {
    "id": "q3328",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 2 × 6 ?",
    "options": [
      "14",
      "11",
      "12",
      "9"
    ],
    "reponse": 2
  },
  {
    "id": "q3329",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 291 + 878 ?",
    "options": [
      "1169",
      "1171",
      "1168",
      "1170"
    ],
    "reponse": 0
  },
  {
    "id": "q3330",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 457 - 134 ?",
    "options": [
      "325",
      "320",
      "322",
      "323"
    ],
    "reponse": 3
  },
  {
    "id": "q3331",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale du Qatar ?",
    "options": [
      "Skopje",
      "Kampala",
      "Kiev",
      "Doha"
    ],
    "reponse": 3
  },
  {
    "id": "q3332",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 960 + 522 ?",
    "options": [
      "1479",
      "1482",
      "1484",
      "1481"
    ],
    "reponse": 1
  },
  {
    "id": "q3333",
    "categorie": "Mythologie",
    "difficulte": 3,
    "question": "Quelle créature ne dormant jamais gardait la Toison d'or dans le mythe de Jason et les Argonautes ?",
    "options": [
      "L'Hydre de Lerne",
      "Ladon",
      "Le dragon de Colchide",
      "Python"
    ],
    "reponse": 2
  },
  {
    "id": "q3334",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Chypre ?",
    "options": [
      "Amérique du Nord",
      "Amérique du Sud",
      "Europe",
      "Asie"
    ],
    "reponse": 2
  },
  {
    "id": "q3335",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Seychelles ?",
    "options": [
      "Océanie",
      "Amérique du Sud",
      "Asie",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q3336",
    "categorie": "Informatique",
    "difficulte": 1,
    "question": "Quel format de fichier compressé porte l'extension « .zip » ?",
    "options": [
      "Une archive compressée",
      "Une image",
      "Une vidéo",
      "Un fichier audio"
    ],
    "reponse": 0
  },
  {
    "id": "q3337",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Lesotho ?",
    "options": [
      "Amérique du Sud",
      "Afrique",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q3338",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 % de 200 ?",
    "options": [
      "55",
      "51",
      "43",
      "50"
    ],
    "reponse": 3
  },
  {
    "id": "q3339",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Turkménistan ?",
    "options": [
      "🇧🇯",
      "🇹🇲",
      "🇱🇷",
      "🇨🇭"
    ],
    "reponse": 1
  },
  {
    "id": "q3340",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1027 appartient à quel siècle ?",
    "options": [
      "11e siècle",
      "12e siècle",
      "10e siècle",
      "9e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q3341",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 1148 appartient à quel siècle ?",
    "options": [
      "13e siècle",
      "12e siècle",
      "11e siècle",
      "10e siècle"
    ],
    "reponse": 1
  },
  {
    "id": "q3342",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur a écrit les quatre concertos des « Quatre Saisons » ?",
    "options": [
      "Johann Sebastian Bach",
      "Antonio Vivaldi",
      "Arcangelo Corelli",
      "Georg Friedrich Haendel"
    ],
    "reponse": 1
  },
  {
    "id": "q3343",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 2,
    "question": "Quel jeu vidéo de rôle et d'action se déroule dans un monde médiéval sombre très difficile, créé par From Software ?",
    "options": [
      "The Witcher",
      "Bloodborne",
      "Dark Souls",
      "Elden Ring"
    ],
    "reponse": 2
  },
  {
    "id": "q3344",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film met en scène un homme d'affaires qui construit un parc d'attractions avec de vrais dinosaures ?",
    "options": [
      "Godzilla",
      "King Kong",
      "Le Monde perdu",
      "Jurassic Park"
    ],
    "reponse": 3
  },
  {
    "id": "q3345",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Bosnie-Herzégovine ?",
    "options": [
      "Sarajevo",
      "Tachkent",
      "Doha",
      "Khartoum"
    ],
    "reponse": 0
  },
  {
    "id": "q3346",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien y a-t-il de cm dans 13 m ?",
    "options": [
      "1300",
      "1468",
      "1085",
      "1217"
    ],
    "reponse": 0
  },
  {
    "id": "q3347",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 3,
    "question": "Quel jeu vidéo de gestion de parc, sorti en 1999, permet de construire des attractions et montagnes russes ?",
    "options": [
      "Theme Park",
      "Zoo Tycoon",
      "RollerCoaster Tycoon",
      "Planet Coaster"
    ],
    "reponse": 2
  },
  {
    "id": "q3348",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 26 + 37 ?",
    "options": [
      "65",
      "63",
      "66",
      "61"
    ],
    "reponse": 1
  },
  {
    "id": "q3349",
    "categorie": "Sciences",
    "difficulte": 1,
    "question": "Combien de planètes compte le système solaire depuis 2006 ?",
    "options": [
      "7",
      "8",
      "9",
      "10"
    ],
    "reponse": 1
  },
  {
    "id": "q3350",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quelle saga de science-fiction met en scène les Jedi et les Sith ?",
    "options": [
      "Star Trek",
      "Star Wars",
      "Interstellar",
      "Dune"
    ],
    "reponse": 1
  },
  {
    "id": "q3351",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 4 × 12 ?",
    "options": [
      "40",
      "43",
      "49",
      "48"
    ],
    "reponse": 3
  },
  {
    "id": "q3352",
    "categorie": "Nature & Animaux",
    "difficulte": 2,
    "question": "Par quel moyen les abeilles indiquent-elles l'emplacement d'une source de nourriture à leurs congénères ?",
    "options": [
      "Un contact antennaire uniquement",
      "Une danse",
      "Une phéromone uniquement",
      "Un chant"
    ],
    "reponse": 1
  },
  {
    "id": "q3353",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MLXXXVII en chiffres romains ?",
    "options": [
      "1085",
      "1082",
      "1087",
      "1097"
    ],
    "reponse": 2
  },
  {
    "id": "q3354",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Roumanie ?",
    "options": [
      "Afrique",
      "Europe",
      "Amérique du Nord",
      "Asie"
    ],
    "reponse": 1
  },
  {
    "id": "q3355",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 7 × 7 ?",
    "options": [
      "50",
      "57",
      "49",
      "48"
    ],
    "reponse": 2
  },
  {
    "id": "q3356",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 25 au carré ?",
    "options": [
      "625",
      "585",
      "559",
      "617"
    ],
    "reponse": 0
  },
  {
    "id": "q3357",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de France ?",
    "options": [
      "Vientiane",
      "Paris",
      "Islamabad",
      "San José"
    ],
    "reponse": 1
  },
  {
    "id": "q3358",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Iode ?",
    "options": [
      "Ar",
      "I",
      "Mg",
      "Fe"
    ],
    "reponse": 1
  },
  {
    "id": "q3359",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel acteur incarne Wolverine dans la saga « X-Men » ?",
    "options": [
      "Ryan Reynolds",
      "Liev Schreiber",
      "Hugh Jackman",
      "Chris Hemsworth"
    ],
    "reponse": 2
  },
  {
    "id": "q3360",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Équateur ?",
    "options": [
      "Asie",
      "Océanie",
      "Afrique",
      "Amérique du Sud"
    ],
    "reponse": 3
  },
  {
    "id": "q3361",
    "categorie": "Littérature",
    "difficulte": 2,
    "question": "Qui a écrit « À la recherche du temps perdu » ?",
    "options": [
      "Louis-Ferdinand Céline",
      "André Gide",
      "Colette",
      "Marcel Proust"
    ],
    "reponse": 3
  },
  {
    "id": "q3362",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel élément chimique a pour symbole « Rn » ?",
    "options": [
      "Brome",
      "Plutonium",
      "Praséodyme",
      "Radon"
    ],
    "reponse": 3
  },
  {
    "id": "q3363",
    "categorie": "Drapeaux",
    "difficulte": 2,
    "question": "Quel est le drapeau du Congo ?",
    "options": [
      "🇧🇹",
      "🇸🇩",
      "🇨🇬",
      "🇲🇹"
    ],
    "reponse": 2
  },
  {
    "id": "q3364",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 400 ?",
    "options": [
      "37",
      "42",
      "34",
      "40"
    ],
    "reponse": 3
  },
  {
    "id": "q3365",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel plateau, le plus vaste et le plus élevé du monde, est surnommé le « toit du monde » ?",
    "options": [
      "L'Altiplano",
      "Le plateau iranien",
      "Le plateau tibétain",
      "Le plateau du Colorado"
    ],
    "reponse": 2
  },
  {
    "id": "q3366",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1104 et 1139 ?",
    "options": [
      "37",
      "35",
      "41",
      "39"
    ],
    "reponse": 1
  },
  {
    "id": "q3367",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Tegucigalpa est la capitale de quel pays ?",
    "options": [
      "Malte",
      "Honduras",
      "Gambie",
      "Venezuela"
    ],
    "reponse": 1
  },
  {
    "id": "q3368",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCCCLXXXVII en chiffres romains ?",
    "options": [
      "889",
      "877",
      "882",
      "887"
    ],
    "reponse": 3
  },
  {
    "id": "q3369",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Philippines ?",
    "options": [
      "Afrique",
      "Asie",
      "Amérique du Sud",
      "Amérique du Nord"
    ],
    "reponse": 1
  },
  {
    "id": "q3370",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Niger ?",
    "options": [
      "Amérique du Nord",
      "Asie",
      "Europe",
      "Afrique"
    ],
    "reponse": 3
  },
  {
    "id": "q3371",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur russe a écrit le ballet « Le Lac des cygnes » ?",
    "options": [
      "Modeste Moussorgski",
      "Sergueï Rachmaninov",
      "Igor Stravinsky",
      "Piotr Ilitch Tchaïkovski"
    ],
    "reponse": 3
  },
  {
    "id": "q3372",
    "categorie": "Géographie",
    "difficulte": 1,
    "question": "Sur quel continent se trouve Suède ?",
    "options": [
      "Europe",
      "Amérique du Nord",
      "Océanie",
      "Asie"
    ],
    "reponse": 0
  },
  {
    "id": "q3373",
    "categorie": "Musique",
    "difficulte": 1,
    "question": "Quelle chanteuse est connue pour ses tubes « Halo » et « Single Ladies » ?",
    "options": [
      "Rihanna",
      "Whitney Houston",
      "Beyoncé",
      "Alicia Keys"
    ],
    "reponse": 2
  },
  {
    "id": "q3374",
    "categorie": "Musique",
    "difficulte": 3,
    "question": "Quel musicien allemand est resté célèbre pour ses œuvres pour clavecin comme les « Variations Goldberg » ?",
    "options": [
      "Jean-Philippe Rameau",
      "Georg Friedrich Haendel",
      "Johann Sebastian Bach",
      "Domenico Scarlatti"
    ],
    "reponse": 2
  },
  {
    "id": "q3375",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Harare est la capitale de quel pays ?",
    "options": [
      "Venezuela",
      "Malaisie",
      "Sierra Leone",
      "Zimbabwe"
    ],
    "reponse": 3
  },
  {
    "id": "q3376",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien y a-t-il de jour(s) dans 888 heure(s) ?",
    "options": [
      "30",
      "31",
      "37",
      "38"
    ],
    "reponse": 2
  },
  {
    "id": "q3377",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel stratagème, imaginé par Ulysse, a permis aux Grecs de s'introduire dans la cité fortifiée qu'ils assiégeaient depuis dix ans ?",
    "options": [
      "Un tunnel souterrain",
      "Le cheval de Troie",
      "Le siège prolongé",
      "La trahison d'un prêtre"
    ],
    "reponse": 1
  },
  {
    "id": "q3378",
    "categorie": "Informatique",
    "difficulte": 2,
    "question": "Que signifie l'acronyme « CPU » ?",
    "options": [
      "Computer Processing Utility",
      "Core Processing Unit",
      "Central Processing Unit",
      "Central Program Unit"
    ],
    "reponse": 2
  },
  {
    "id": "q3379",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale de Samoa ?",
    "options": [
      "Sofia",
      "Islamabad",
      "Apia",
      "Caracas"
    ],
    "reponse": 2
  },
  {
    "id": "q3380",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Sanaa est la capitale de quel pays ?",
    "options": [
      "Yémen",
      "Uruguay",
      "Burkina Faso",
      "Venezuela"
    ],
    "reponse": 0
  },
  {
    "id": "q3381",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇻 De quel pays est-ce le drapeau ?",
    "options": [
      "Haïti",
      "Chypre",
      "Lettonie",
      "Malte"
    ],
    "reponse": 2
  },
  {
    "id": "q3382",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 39 ÷ 13 ?",
    "options": [
      "5",
      "4",
      "3",
      "0"
    ],
    "reponse": 2
  },
  {
    "id": "q3383",
    "categorie": "Informatique",
    "difficulte": 3,
    "question": "Quel est le premier langage de programmation considéré comme « orienté objet » très largement utilisé, créé par Sun Microsystems ?",
    "options": [
      "JavaScript",
      "C++",
      "Python",
      "Java"
    ],
    "reponse": 3
  },
  {
    "id": "q3384",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "L'année 33 appartient à quel siècle ?",
    "options": [
      "1e siècle",
      "3e siècle",
      "2e siècle",
      "4e siècle"
    ],
    "reponse": 0
  },
  {
    "id": "q3385",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 6 ÷ 2 ?",
    "options": [
      "6",
      "4",
      "1",
      "3"
    ],
    "reponse": 3
  },
  {
    "id": "q3386",
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
    "id": "q3387",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien d'années séparent 1552 et 1847 ?",
    "options": [
      "287",
      "295",
      "248",
      "336"
    ],
    "reponse": 1
  },
  {
    "id": "q3388",
    "categorie": "Capitales",
    "difficulte": 2,
    "question": "Doha est la capitale de quel pays ?",
    "options": [
      "Canada",
      "Suède",
      "Turkménistan",
      "Qatar"
    ],
    "reponse": 3
  },
  {
    "id": "q3389",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMLVI en chiffres romains ?",
    "options": [
      "2056",
      "2046",
      "2054",
      "2055"
    ],
    "reponse": 0
  },
  {
    "id": "q3390",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇷🇺 De quel pays est-ce le drapeau ?",
    "options": [
      "Érythrée",
      "Bahreïn",
      "Russie",
      "Afghanistan"
    ],
    "reponse": 2
  },
  {
    "id": "q3391",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quelle entreprise a créé la licence de jeux vidéo « Mario » ?",
    "options": [
      "Sega",
      "Nintendo",
      "Sony",
      "Capcom"
    ],
    "reponse": 1
  },
  {
    "id": "q3392",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇱🇸 De quel pays est-ce le drapeau ?",
    "options": [
      "Guatemala",
      "Paraguay",
      "Djibouti",
      "Lesotho"
    ],
    "reponse": 3
  },
  {
    "id": "q3393",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Étain ?",
    "options": [
      "Co",
      "Sn",
      "Os",
      "Re"
    ],
    "reponse": 1
  },
  {
    "id": "q3394",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 75 % de 500 ?",
    "options": [
      "369",
      "333",
      "343",
      "375"
    ],
    "reponse": 3
  },
  {
    "id": "q3395",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 18 ÷ 2 ?",
    "options": [
      "9",
      "7",
      "10",
      "6"
    ],
    "reponse": 0
  },
  {
    "id": "q3396",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 17 × 14 ?",
    "options": [
      "208",
      "230",
      "238",
      "244"
    ],
    "reponse": 2
  },
  {
    "id": "q3397",
    "categorie": "Mythologie",
    "difficulte": 1,
    "question": "Quel héros grec est le protagoniste de « l'Odyssée » d'Homère ?",
    "options": [
      "Achille",
      "Agamemnon",
      "Ajax",
      "Ulysse"
    ],
    "reponse": 3
  },
  {
    "id": "q3398",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente MMMCLXXIII en chiffres romains ?",
    "options": [
      "3171",
      "3163",
      "3173",
      "3178"
    ],
    "reponse": 2
  },
  {
    "id": "q3399",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays d'Amérique du Sud ne possède pas de côte maritime ?",
    "options": [
      "Le Chili",
      "L'Uruguay",
      "La Bolivie",
      "L'Équateur"
    ],
    "reponse": 2
  },
  {
    "id": "q3400",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Quel nombre représente DCXLVII en chiffres romains ?",
    "options": [
      "646",
      "652",
      "647",
      "642"
    ],
    "reponse": 2
  },
  {
    "id": "q3401",
    "categorie": "Culture générale",
    "difficulte": 2,
    "question": "Quelle est la monnaie du Koweït ?",
    "options": [
      "Peso chilien",
      "Livre sterling",
      "Dinar koweïtien",
      "Dollar namibien"
    ],
    "reponse": 2
  },
  {
    "id": "q3402",
    "categorie": "Jeux vidéo & Séries",
    "difficulte": 1,
    "question": "Quel manga et anime met en scène des pirates à la recherche d'un trésor légendaire ?",
    "options": [
      "Naruto",
      "Fairy Tail",
      "One Piece",
      "Bleach"
    ],
    "reponse": 2
  },
  {
    "id": "q3403",
    "categorie": "Mythologie",
    "difficulte": 2,
    "question": "Quels prêtres celtes, à la fois juges, enseignants et intermédiaires avec les dieux, étaient très respectés dans la société gauloise ?",
    "options": [
      "Les vates",
      "Les druides",
      "Les bardes",
      "Les eubages"
    ],
    "reponse": 1
  },
  {
    "id": "q3404",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel compositeur italien est célèbre pour ses opéras « La Traviata » et « Aïda » ?",
    "options": [
      "Giuseppe Verdi",
      "Gioachino Rossini",
      "Giacomo Puccini",
      "Vincenzo Bellini"
    ],
    "reponse": 0
  },
  {
    "id": "q3405",
    "categorie": "Géographie",
    "difficulte": 3,
    "question": "Quel pays possède le plus grand nombre de volcans actifs ?",
    "options": [
      "Le Japon",
      "L'Indonésie",
      "Le Chili",
      "Les Philippines"
    ],
    "reponse": 1
  },
  {
    "id": "q3406",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel pays est bordé par la mer Rouge et abrite le mont Sinaï ?",
    "options": [
      "Le Soudan",
      "L'Égypte",
      "La Jordanie",
      "L'Arabie saoudite"
    ],
    "reponse": 1
  },
  {
    "id": "q3407",
    "categorie": "Drapeaux",
    "difficulte": 1,
    "question": "🇦🇴 De quel pays est-ce le drapeau ?",
    "options": [
      "Angola",
      "Arménie",
      "Costa Rica",
      "République démocratique du Congo"
    ],
    "reponse": 0
  },
  {
    "id": "q3408",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Comment écrit-on 790 en chiffres romains ?",
    "options": [
      "DCCLXXXIX",
      "DCCC",
      "DCCXC",
      "DCCLXXXV"
    ],
    "reponse": 2
  },
  {
    "id": "q3409",
    "categorie": "Cinéma",
    "difficulte": 1,
    "question": "Quel film d'animation Pixar met en scène un rat parisien rêvant de devenir grand chef cuisinier ?",
    "options": [
      "Cars",
      "Le Voyage d'Arlo",
      "Ratatouille",
      "Rebelle"
    ],
    "reponse": 2
  },
  {
    "id": "q3410",
    "categorie": "Sciences",
    "difficulte": 2,
    "question": "Quel est le symbole chimique de l'élément Rhénium ?",
    "options": [
      "Re",
      "Se",
      "Ac",
      "Y"
    ],
    "reponse": 0
  },
  {
    "id": "q3411",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 434 + 527 ?",
    "options": [
      "960",
      "964",
      "958",
      "961"
    ],
    "reponse": 3
  },
  {
    "id": "q3412",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 10 % de 60 ?",
    "options": [
      "6",
      "4",
      "7",
      "8"
    ],
    "reponse": 0
  },
  {
    "id": "q3413",
    "categorie": "Musique",
    "difficulte": 2,
    "question": "Quel groupe pop formé de trois frères a connu le succès dans les années 2000 grâce à Disney Channel ?",
    "options": [
      "NSYNC",
      "Hanson",
      "Backstreet Boys",
      "Jonas Brothers"
    ],
    "reponse": 3
  },
  {
    "id": "q3414",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 977 - 604 ?",
    "options": [
      "373",
      "375",
      "374",
      "372"
    ],
    "reponse": 0
  },
  {
    "id": "q3415",
    "categorie": "Sport",
    "difficulte": 1,
    "question": "Quel pays organise traditionnellement le tournoi de tennis de Roland-Garros ?",
    "options": [
      "Les États-Unis",
      "Le Royaume-Uni",
      "L'Australie",
      "La France"
    ],
    "reponse": 3
  },
  {
    "id": "q3416",
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
    "id": "q3417",
    "categorie": "Culture générale",
    "difficulte": 1,
    "question": "Quel peintre italien de la Renaissance a peint le plafond de la chapelle Sixtine ?",
    "options": [
      "Le Titien",
      "Léonard de Vinci",
      "Michel-Ange",
      "Raphaël"
    ],
    "reponse": 2
  },
  {
    "id": "q3418",
    "categorie": "Capitales",
    "difficulte": 1,
    "question": "Quelle est la capitale d'Arménie ?",
    "options": [
      "Erevan",
      "Conakry",
      "Damas",
      "Vilnius"
    ],
    "reponse": 0
  },
  {
    "id": "q3419",
    "categorie": "Mathématiques",
    "difficulte": 2,
    "question": "Combien font 315 ÷ 15 ?",
    "options": [
      "21",
      "25",
      "19",
      "20"
    ],
    "reponse": 0
  },
  {
    "id": "q3420",
    "categorie": "Géographie",
    "difficulte": 2,
    "question": "Quel est le point culminant d'Afrique ?",
    "options": [
      "Le Kilimandjaro",
      "Le mont Cameroun",
      "Le mont Kenya",
      "Les Drakensberg"
    ],
    "reponse": 0
  },
  {
    "id": "q3421",
    "categorie": "Littérature",
    "difficulte": 1,
    "question": "Qui a écrit « Les Misérables » ?",
    "options": [
      "Honoré de Balzac",
      "Émile Zola",
      "Victor Hugo",
      "Gustave Flaubert"
    ],
    "reponse": 2
  },
  {
    "id": "q3422",
    "categorie": "Mathématiques",
    "difficulte": 1,
    "question": "Combien font 411 + 409 ?",
    "options": [
      "818",
      "821",
      "820",
      "817"
    ],
    "reponse": 2
  }
];
