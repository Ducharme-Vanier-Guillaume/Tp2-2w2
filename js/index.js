//////////////////////////////////////////////////// DÉCLARATION VARIABLES ///////////////////////////////////

//Pour les audios utilisées
let audio = {
    succes: new Audio('sons/correct.mp3'),
    erreur: new Audio('sons/erreur.mp3'),
    click : new Audio('sons/click.mp3'),
    musicFond : new Audio('sons/musicFond.mp3')
};

// Numéro de la question courante
let noQuestion = 0; 

// Nombre de réponses justes
let nombreReponsesJustes = 0;

// Largeur de la barre au départ
let largeurEcrans = 0;

//Position de l'avion 
let positionAvion = 0;

//Position du quiz en Y au départ
let positionY = 100;

//Déclaration de prise de donné html pour l'intro
let barreChargement = document.querySelector(".conteneur");
let titreIntro = document.querySelector(".intro");

//Déclaration de prise de donné html pour la partie quiz
let zoneQuiz = document.querySelector(".quiz");
let sectionQuestion = document.querySelector("section");
let reponse = document.querySelector("#reponse")
let titreQuestion = document.querySelector(".titre-question");
let lesChoixDeReponses = document.querySelector(".les-choix-de-reponse");
let imageQuestion = document.querySelector(".imageIndefini");
let avion = document.querySelector(".avion");

//Déclaration de prise de donné html pour la fin
let zoneFin = document.querySelector(".fin");
let btnRecommencer = document.querySelector('.rejouer');

//Pour calculer le HighScore, s'il n'a jamais été enregistré on met 0
let HighScore; 
let elmHighScore = document.querySelector("#HighScore");
HighScore = localStorage.getItem("HighScore") || 0;


/////////////////////////////////////////////// FUNCTION POUR DEBUTER ET RECOMMENCER LE QUIZ /////////////////////////////////////

//Lorsque l'animation de la barre de chargement se fini, on appel la fonction afficherbouton qui affiche le bouton
barreChargement.addEventListener("animationend", afficherBoutonJouer);

// Créer un élément HTML de type div avec la class BOUTONJOUER que l'on incrémente le texter jouer à l'intérieur
// que l'on place après la barre de chargement, lorsque l'on click dessu il appel la function afficherQuiz qui 
// affiche le quiz et fait jouer le son du click et lance une music de fond
function afficherBoutonJouer(){
    //Crée et incrémente la div du bouton
    let boutonJouer = document.createElement("div");
    boutonJouer.classList.add("boutonJouer");
    boutonJouer.innerText = "Jouer"
    barreChargement.after(boutonJouer);

    //Lui ajouter des écouteur d'évènement
    boutonJouer.addEventListener('click', afficherQuestion);
    boutonJouer.addEventListener('click', sonIntro);   
}

// Fait jouer le son du bouton et le son d'arrière plan
function sonIntro(){
    audio.click.play();
    audio.musicFond.play();
}

// Gestion du bouton de redémarrage du quiz avec des évènement d'écoute qui appel la fonction recomencer et sonFin
btnRecommencer.addEventListener('click', recommencer);
btnRecommencer.addEventListener('click', sonFin);

// Fais jouer le son du bouton de fin 
function sonFin(){
    audio.click.play();
}

////////////////////////////////////////////////////// FUNCTIONS GESTION DU QUIZ  ///////////////////////////////////////////////////////


// afficherQuestion incrémente une animation au titre et la zone de quiz afin que chacun puisse monter vers le haut
// il écrti ensuite la question relié au numéro de la question grace à innerText. On affiche alors la question et les   
// les choix de réponses. Une fois un choix choisi, on appel la fonction VerifierReponse qui verifie si la reponse est  
// juste ou non. Puis on anime l'entré du quiz par le bas
function afficherQuestion() {
    titreIntro.style.animation = " bouger-intro cubic-bezier(0.97,0.01,0.36,0.99) 2.8s forwards" ;
    zoneQuiz.style.animation =  "bouger-quiz cubic-bezier(0.97,0.01,0.36,0.99) 2.8s forwards ";

    // Récupérer l'objet de la question en cours dans le tableau des questions
    let objetQuestion = lesQuestions[noQuestion];
    
    // Affecter le texte dans le titre de la question
    titreQuestion.innerText = objetQuestion.titre;

    // On commence par vider le conteneur des choix de réponses.
    lesChoixDeReponses.innerHTML = "";

    //Afiche la bonne image pour chaque question
    imageQuestion.style.backgroundImage = "url(" + objetQuestion.paysage + ")";

    // Puis on le remplit de nouveau avec les choix de réponses de la question
    let unChoix;
    for (let i = 0; i < objetQuestion.choix.length; i++) {
        //On crée la balise et on y affecte une classe CSS
        unChoix = document.createElement("div");
        unChoix.classList.add("choix");
            
        //On intègre la valeur du choix de réponse
        unChoix.innerText = objetQuestion.choix[i];
            
        //On affecte dynamiquement l'index de chaque choix
        unChoix.indexChoix = i;
            
        //On met un écouteur pour vérifier la réponse choisie
        unChoix.addEventListener("mousedown", verifierReponse);
            
        //On incrémente le choix, ce qui l'affiche
        lesChoixDeReponses.append(unChoix);
    }

        //On appel la requete AnimerSection pour faire monter le quiz 
        requestAnimationFrame(animerSection);

        //On appel donc la requete qui avance l'avion pour montrer la progression et on reanime l'arriver du quiz
        if (noQuestion > 0) {
            requestAnimationFrame(animerAvion);
            positionY = 100;
            requestAnimationFrame(animerSection);
        }
}

// AnimerAvion sert à faire bouger l'avion, représentant la barre d'avancement après chaque question
function animerAvion() {

    //On augmente l'avion vers la droite dépendament de la taille de l'écran de l'utilisateur
    largeurEcrans += ( (document.documentElement.clientWidth / 8));
    avion.style.left = largeurEcrans + "px";
    console.log(largeurEcrans) 
}

// AnimerSection sert à faire apparaitre le quiz par le bas à chaque question jusqu'à ce que le quiz soit dans son entierté
function animerSection() {

    //On fait monter la div de 1 
    positionY -= 1;
    sectionQuestion.style.transform = `translateY(${positionY}vw)`;

    // Si la div n'est pas à 0 cela continue
    if (positionY > 0) {
        requestAnimationFrame(animerSection);
    }
}


//VerifierReponse sert à vérifier si une réponse est correct ou non, dépendament du fait, une classe sera incrémenté    
//aux choix en css, l'animation varie entre les bonnes et mauvfais reponses. Si elle est bonne on augmente la valeur 
//du nombre de bonne réponse . Dans les 2 cas on fais jouer un son. 
function verifierReponse(event) {
    lesChoixDeReponses.classList.toggle('desactiver');

    //Pour les bonnes réponses, on incrémente la classe reponse-succes, on augmente de 1 les bonnes réponses et on  
    //Fais jouer un son
    if (event.target.indexChoix == lesQuestions[noQuestion].bonneReponse) {
        event.target.classList.add("reponse-succes")       
        nombreReponsesJustes++;
        audio.succes.play();    
    }
    //Pour les mauvaise réponses on incrémente la classe reponse-echec et on fais jouer le son
    else{
        event.target.classList.add("reponse-echec")
        audio.erreur.play();
    }

    //Lorsque l'animation est terminé on appel la function gererProchaineQuestion qui fait apparaitre la prochaine question
    event.target.addEventListener("animationend", gererProchaineQuestion);
}

// gererProchaineQuestion sert à appelé la prochaine question lorsque l'animation de vérification est terminé, on augmente  
// le nombre de questions passé pour savoir si nous avons fini, si oui on appel la fin du quiz 
function gererProchaineQuestion(event) {

    //On enlève l'écouteur précedent 
    event.target.removeEventListener("animationend", gererProchaineQuestion);

    // On réactive les clics sur les choix de réponse
    lesChoixDeReponses.classList.toggle('desactiver');
    
    // On incrémente noQuestion pour la  prochaine question à afficher
    noQuestion++;
    
    //S'il reste une question on l'affiche, sinon on appel la function afficherFinQuiz qui appel la fin du quiz
    if (noQuestion < lesQuestions.length) {
        afficherQuestion();
    } else {
        afficherFinQuiz();
    }
}

//////////////////////////////////////////// FUNCTION POUR LA FIN DU QUIZ ////////////////////////////////////////

//afficherFinQuiz ajoute une animation à la div de fin pour la faire apparaitre, On commence par incrémenter le plus haut score 
//dans la div HighScore, on affiche ensuite le texte dans le bouton pour rejouer, on affiche le nombre de bonnes réponses et puis   
//on affiche la phrase qui vient avec le nombre de bonne réponses
function afficherFinQuiz() {
    
    //Ajoute l'animation à la zone de fin
    zoneFin.style.animation = " bouger-fin 1s cubic-bezier(0.97,0.01,0.36,0.99)  forwards ";

    //Calcule le HighScore et l'incrémente en texte dans la div HighScore
    HighScore = Math.max(HighScore, nombreReponsesJustes);
    localStorage.setItem("HighScore", HighScore);
    elmHighScore.innerText = HighScore;

    //On affiche le texte rejouer dans le bouton Rejouer
    btnRecommencer.innerText = "Rejouer"
    
    // Créer dynamiquement la section qui contien le score, on l'afiche avant la div reponse
    let sectionResultat = document.createElement('section');
    sectionResultat.innerText = " Votre résultat est : " + nombreReponsesJustes + "/" + lesQuestions.length;
    sectionResultat.classList.add("resultat");
    reponse.before(sectionResultat);

    //Dependament du nombre de bonne réponse, une phrase est applique dans la div reponse
    let noReponse = nombreReponsesJustes;
    console.log(noReponse);
    reponse.innerText = resulat[noReponse].phrase;
}

///////////////////////////////////////////////// FUNCTION POUR RECOMMENCER LE QUIZ ///////////////////////////////////////

//function recommencer remet le quiz à sa base, on "reset" les valeurs. On incrémente une nouvelle animamtion à la fin 
//qui le fait redescendre. On affiche les question ce qui ne montre pas l'Animaiton du départ puis on efface le texte montrant les  
//résultats
function recommencer() {
    
    //Remet les valeurs initiales
    nombreReponsesJustes = 0;
    largeurEcrans = 0;
    noQuestion = 0;
    avion.style.left = 0 + "px"
     noReponse = 0;

    //Aplique l'animation pour la section du quiz
    zoneFin.style.animation = " remettre-quiz 2s cubic-bezier(0.97,0.01,0.36,0.99) forwards ";

    //On affiche les questions
    afficherQuestion();

    //Après 1500ms on enlève la section resultats
    setTimeout(effacerResulat, 1500); 
}

//effacerResultat efface les résulats afin qu'il puisse se mettre a jour lors de la prochaine partie
function effacerResulat(){
    document.querySelector(".resultat").remove();  
}

