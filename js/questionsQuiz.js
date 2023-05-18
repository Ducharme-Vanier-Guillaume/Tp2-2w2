
//Tableau pour les questions, divisé en 4 sous catégories, le titre, le paysage, le choix et les bonnes réponse
let lesQuestions = [
    {
        titre: "Dans quel pays se trouve la montagne de la Table, l’une des plus belle d’Afrique ?",
        paysage: "images/afriqueSud.jpg",
        choix: ['Afrique du Sud', 'Nigeria', 'Maroc', 'Turquie' ],
        bonneReponse: 0
    },
    {
        titre: "Où retrouve-t-on ces flancs de montagne séparés par la rivière du lac Lysefjord ?",
        paysage: "images/norvege.jpg",
        choix: ['Finlade', 'Norvège', 'Canada', 'Islande' ],
        bonneReponse: 1
    },
    {
        titre: "Dans quel pays se trouve cette chaine de montagnes digne du Hobbit ?",
        paysage: "images/GrosMorne.jpg",
        choix: ['Nouvelle-Zélande', 'Porto Rico', 'Canada', 'Géorgie' ],
        bonneReponse: 2,
    },
    {
        titre: "Dans quel pays se trouve cette formation de roche creusée par l'érosion ?",
        paysage: "images/Alberta.jpg",
        choix: ['Mexique', 'État-Unis', 'Canada', 'Espagne'],
        bonneReponse: 2
    },
    {
        titre: "Dans quel pays se trouve cette magnifique rivière à la couleur turquoise ?",
        paysage: "images/France.jpg",
        choix: ['Grèce', 'Espagne', 'Portugal', 'France'],
        bonneReponse: 3
    },
    {
        titre: "Dans quel pays d'Europe retrouve-t-on ce lac, nommé Schrecksee ?",
        paysage: "images/Allemagne.jpg",
        choix: ['Allemagne', 'Finlande', 'Jordanie', 'Danemark'],
        bonneReponse: 0
    },
    {
        titre: "Dans quel pays retrouve-t-on cette piscine naturelle, réchauffée par les volcans  ?",
        paysage: "images/CostaRica.jpg",
        choix: ['Costa-Rica', 'Bahamas', 'Hawaii', 'Nicaragua'],
        bonneReponse: 0
    }
];

// Le tableau pour les phrase incrémentés à la fin par rapport aux nombre de bonne réponses divisé en 1 sous catégorie
let resulat = [
    {
        phrase : " Très mauvais en géographie ! "
    },
    {
      phrase : " C'est déjà mieux que 0 ! "
    },
    {
        phrase : " Tu commences à t'améliorer, tranquillement ...  "
    },
    {
        phrase : " 42% c'est pas si pire.... "
    },
    {
        phrase : " Presque la moyenne"
    },
    {
        phrase : " Quand même, tu arrives bientôt au top "
    },
    {
         phrase : "Presqu'un parfait !"
    },
    {
        phrase : "Bravo tu connais tes paysages !"
    },
    
   
];