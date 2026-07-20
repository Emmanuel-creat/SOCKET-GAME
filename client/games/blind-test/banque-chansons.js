/**
 * Blind Texte — banque de manches intégrée.
 *
 * IMPORTANT (droit d'auteur) : cette banque ne contient AUCUN extrait de paroles.
 * Chaque manche décrit sa chanson par trois indices ORIGINAUX (du plus difficile au
 * plus facile) : thème, histoire, anecdotes, contexte. Les titres et noms d'artistes
 * sont des données factuelles. Pour jouer avec vos propres textes (si vous disposez
 * des droits nécessaires), utilisez « Mes manches » dans l'écran de configuration :
 * la plateforme affiche alors ce que VOUS fournissez, sous votre responsabilité.
 *
 * Format d'une entrée :
 *   titre    — la réponse « titre » attendue
 *   artiste  — la réponse « artiste » attendue
 *   alias    — variantes acceptées (autres graphies, nom court, interprète vs groupe)
 *   annee    — affichée à la révélation
 *   indices  — [difficile, moyen, facile] : révélés au fil du temps
 */

export const BANQUE_CHANSONS = [
  {
    titre: 'Bohemian Rhapsody', artiste: 'Queen', alias: ['freddie mercury'], annee: 1975,
    indices: [
      "Près de six minutes sans refrain : une ballade au piano qui bascule dans un opéra délirant, puis dans le hard rock.",
      "Le narrateur y confesse à sa mère un geste irréparable, avant un célèbre passage à mille voix où l'on invoque Galilée et Figaro.",
      "Chef-d'œuvre opéra-rock de 1975 — et la scène culte du casque audio dans la voiture de Wayne's World.",
    ],
  },
  {
    titre: 'Billie Jean', artiste: 'Michael Jackson', alias: ['mickael jackson', 'mj'], annee: 1982,
    indices: [
      "Une ligne de basse hypnotique ouvre ce titre où le chanteur nie être le père d'un enfant.",
      "Extrait de l'album le plus vendu de l'histoire, il parle d'une admiratrice un peu trop insistante.",
      "C'est en l'interprétant à la télévision que le Roi de la Pop a dévoilé le moonwalk au monde.",
    ],
  },
  {
    titre: 'Alors on danse', artiste: 'Stromae', alias: ['paul van haver'], annee: 2009,
    indices: [
      "Un saxophone entêtant, et une litanie de mots en cascade : études, boulot, dettes, divorce…",
      "Quand tout va mal, ce titre belge propose une seule échappatoire, répétée en boucle sur les pistes.",
      "Premier tube mondial du Bruxellois au chapeau et aux chaussettes colorées, avant Papaoutai.",
    ],
  },
  {
    titre: 'Papaoutai', artiste: 'Stromae', alias: ['paul van haver'], annee: 2013,
    indices: [
      "Sous un beat dansant, un enfant pose sans relâche la question qui fâche sur un père introuvable.",
      "Dans le clip, le chanteur joue un mannequin figé qu'un petit garçon tente désespérément de faire bouger.",
      "Le titre belge est une question phonétique : trois mots collés qui cherchent un papa disparu.",
    ],
  },
  {
    titre: 'La Vie en rose', artiste: 'Édith Piaf', alias: ['edith piaf', 'piaf'], annee: 1946,
    indices: [
      "Écrite au sortir de la guerre, cette chanson voit le monde changer de couleur dès qu'un certain regard se pose.",
      "Reprise par Louis Armstrong et Lady Gaga, elle est devenue LE cliché sonore de Paris dans le cinéma américain.",
      "L'hymne à l'amour en couleur de la Môme, la plus célèbre voix française du XXᵉ siècle.",
    ],
  },
  {
    titre: 'Ne me quitte pas', artiste: 'Jacques Brel', alias: ['brel'], annee: 1959,
    indices: [
      "Un homme s'abaisse à tout promettre — des perles de pluie venues de pays lointains — pour retenir celle qui part.",
      "Le chanteur belge disait que ce n'était pas une chanson d'amour mais « l'hymne à la lâcheté des hommes ».",
      "Supplique déchirante du plus grand chanteur belge, reprise dans le monde entier sous le titre « If You Go Away ».",
    ],
  },
  {
    titre: 'Imagine', artiste: 'John Lennon', alias: ['lennon'], annee: 1971,
    indices: [
      "Au piano, un exercice de pensée : un monde sans frontières, sans possessions, sans raisons de s'entretuer.",
      "Son auteur, lunettes rondes, l'a enregistrée dans son manoir anglais deux ans après la fin de son groupe légendaire.",
      "L'hymne pacifiste de l'ex-Beatle, devenu quasi officiel des cérémonies œcuméniques et des Jeux olympiques.",
    ],
  },
  {
    titre: 'Hey Jude', artiste: 'The Beatles', alias: ['beatles'], annee: 1968,
    indices: [
      "Écrite pour consoler le fils d'un ami en plein divorce, elle s'achève sur quatre minutes de « na na na ».",
      "Plus de sept minutes au total : un record pour un single numéro 1 à l'époque, malgré les radios réticentes.",
      "La ballade des Quatre de Liverpool qui s'adresse à un certain Jude, prénom en une syllabe.",
    ],
  },
  {
    titre: 'Smells Like Teen Spirit', artiste: 'Nirvana', alias: ['kurt cobain'], annee: 1991,
    indices: [
      "Quatre accords saturés, un clip dans un gymnase enfumé, et toute une génération X qui se reconnaît.",
      "Le titre vient d'un graffiti moqueur laissé par une amie du chanteur — qui ignorait que c'était une marque de déodorant.",
      "L'hymne grunge de Seattle, porté par la voix écorchée d'un chanteur blond disparu en 1994.",
    ],
  },
  {
    titre: 'Dancing Queen', artiste: 'ABBA', alias: [], annee: 1976,
    indices: [
      "Une jeune fille de dix-sept ans règne sur la piste, dans ce tube disco venu du froid.",
      "Seul numéro 1 américain du quatuor suédois, joué la veille du mariage du roi de Suède.",
      "Le plus grand succès du groupe de Mamma Mia, dont le nom est un palindrome.",
    ],
  },
  {
    titre: 'I Will Survive', artiste: 'Gloria Gaynor', alias: [], annee: 1978,
    indices: [
      "D'abord effrayée puis pétrifiée, une femme quittée découvre manche après manche qu'elle s'en sortira très bien sans lui.",
      "Enregistrée avec une vertèbre fracturée par une chanteuse qu'on disait finie, elle est devenue un hymne de résilience.",
      "LE tube disco de la revanche amoureuse — et le chant des supporters français en 1998.",
    ],
  },
  {
    titre: 'Hotel California', artiste: 'Eagles', alias: ['the eagles'], annee: 1976,
    indices: [
      "Un voyageur fatigué s'arrête pour la nuit dans un établissement dont, dit-on, on ne part jamais vraiment.",
      "Son final : l'un des duels de guitares les plus célèbres de l'histoire du rock, sur une autoroute sombre du désert.",
      "Le classique du groupe américain qui donne son nom à un hôtel doré de la côte Ouest.",
    ],
  },
  {
    titre: 'Take On Me', artiste: 'a-ha', alias: ['aha'], annee: 1985,
    indices: [
      "Un riff de synthé inoubliable et une note finale si haute que peu de chanteurs osent la tenter au karaoké.",
      "Son clip mêle prise de vue réelle et dessin au crayon : une lectrice de BD y est aspirée dans les cases.",
      "Le tube planétaire du trio norvégien des années 80, au nom de deux lettres et un tiret.",
    ],
  },
  {
    titre: 'Africa', artiste: 'Toto', alias: [], annee: 1982,
    indices: [
      "Des pluies bénies attendues sur tout un continent, dans ce soft rock devenu mème planétaire.",
      "Écrite par des musiciens de studio californiens qui n'avaient alors jamais mis les pieds sur le continent qu'ils chantent.",
      "Le tube du groupe au nom de chien du Magicien d'Oz, ressuscité par Internet.",
    ],
  },
  {
    titre: 'Lose Yourself', artiste: 'Eminem', alias: ['marshall mathers', 'slim shady'], annee: 2002,
    indices: [
      "Une seule chance, un seul moment : les paumes moites avant de monter sur scène, tout se joue maintenant.",
      "Bande originale d'un film semi-autobiographique tourné à Détroit, premier rap à gagner l'Oscar de la meilleure chanson.",
      "L'hymne du rappeur blond de 8 Mile.",
    ],
  },
  {
    titre: 'Viva la Vida', artiste: 'Coldplay', alias: [], annee: 2008,
    indices: [
      "Un roi déchu contemple les ruines de son règne, sur un tapis de cordes sans guitare ni batterie classiques.",
      "La pochette reprend « La Liberté guidant le peuple » de Delacroix ; le titre est emprunté à un tableau de Frida Kahlo.",
      "Le plus grand succès du groupe britannique de Chris Martin.",
    ],
  },
  {
    titre: 'Someone Like You', artiste: 'Adele', alias: ['adele adkins'], annee: 2011,
    indices: [
      "Voix et piano, rien d'autre : une femme apprend que son ancien amour s'est marié, et vient lui dire adieu.",
      "Interprétée en direct aux Brit Awards, elle a laissé la salle entière en larmes et propulsé l'album 21.",
      "La ballade de rupture de la chanteuse britannique au prénom-palindrome-raté, entre Rolling in the Deep et Hello.",
    ],
  },
  {
    titre: "L'Aventurier", artiste: 'Indochine', alias: [], annee: 1982,
    indices: [
      "Un héros de romans de gare — Bob Morane — y affronte l'Ombre Jaune sur une new wave au saxophone.",
      "Premier succès d'un groupe français au nom d'ancienne colonie, toujours en tournée quarante ans plus tard.",
      "Le tube de Nicola Sirkis où Bob Morane repart à l'assaut, seul contre tout guerrier.",
    ],
  },
  {
    titre: 'Mistral gagnant', artiste: 'Renaud', alias: ['renaud sechan'], annee: 1985,
    indices: [
      "Assis sur un banc, un père parle à sa fille du temps qui passe, des pigeons et de confiseries disparues.",
      "Son auteur à la voix cassée la jugeait trop intime pour l'album ; les Français l'ont élue plus belle chanson française.",
      "La tendre chanson du titi parisien, nommée d'après un bonbon à la poudre qui piquait.",
    ],
  },
  {
    titre: 'Le vent nous portera', artiste: 'Noir Désir', alias: ['noir desir'], annee: 2001,
    indices: [
      "Une guitare circulaire signée d'un certain Manu (Chao), et des instantanés de vies que le temps disperse.",
      "Dernier grand succès d'un groupe bordelais à l'histoire brutalement interrompue, souvent repris (Sophie Hunger…).",
      "Le titre du groupe de Bertrand Cantat où tout, poussières et caresses, finit emporté par le même souffle.",
    ],
  },
  {
    titre: 'Je veux', artiste: 'Zaz', alias: ['isabelle geffroy'], annee: 2010,
    indices: [
      "Ni suite au Ritz, ni bijoux de chez Chanel : la chanteuse réclame surtout qu'on la laisse être elle-même.",
      "Voix éraillée, swing manouche et énergie de rue : la carrière de son interprète a commencé à Montmartre.",
      "Le manifeste anti-bling de la chanteuse française au pseudonyme de trois lettres.",
    ],
  },
  {
    titre: 'Djadja', artiste: 'Aya Nakamura', alias: ['aya danioko'], annee: 2018,
    indices: [
      "Une mise au point cinglante adressée à un menteur qui raconte n'importe quoi — en catchana, paraît-il.",
      "Premier single d'une Franco-Malienne à dominer les classements européens depuis Piaf, langage inventé compris.",
      "Le tube de la chanteuse française la plus écoutée au monde, au nom de sushi... non, de mannequin japonais.",
    ],
  },
  {
    titre: 'Basique', artiste: 'Orelsan', alias: ['aurelien cotentin'], annee: 2017,
    indices: [
      "Des vérités simples assénées une par une, face caméra, en plan-séquence dans un parking.",
      "Le rappeur caennais y résume sa philosophie : pas besoin de compliqué quand on peut faire simple.",
      "Le tube de 2017 du rappeur de Caen : un titre d'un seul mot, devenu réplique du quotidien pour dire qu'une évidence... en est une.",
    ],
  },
  {
    titre: 'Highway to Hell', artiste: 'AC/DC', alias: ['acdc', 'ac dc'], annee: 1979,
    indices: [
      "Un riff de guitare parmi les plus reconnaissables du rock, pour décrire la vie épuisante des tournées.",
      "Dernier album enregistré avec le chanteur Bon Scott, disparu quelques mois plus tard.",
      "L'autoroute infernale du groupe australien au nom électrique, avec un guitariste en uniforme d'écolier.",
    ],
  },
];
