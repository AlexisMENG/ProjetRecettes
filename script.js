//Récupération des pièces depuis le fichier JSON

const reponse = await fetch('recettes_list.json');
const pieces = await reponse.json();


//Création de la ligne affichant le prix total des articles selectionnés, affiche initialement "0 €" et se rafraichit à chaque ajout et supression

const panier = document.getElementById("panier")
let prix_total = 0;
let montant = document.createElement("p")
montant.id = "montant"
montant.innerText = "le montant de votre panier s'élève à " +  prix_total + " € "
panier.appendChild(montant)

//Création d'un tableau de doublons : les noms des articles déja dans le panier sont placés dans ce tableau, 
//empechant l'execution de l'écouteur d'evenement du panier qui rajouterai sinon une nouvelle ligne de ce même article

let tableau_doublon = []



// Lancement des 2 fonctions qui vont créer la galerie et les favoris par défaut au lancement de la page.
// Elles récupérent les data de recettes_list.json : nom, prix, image, description, disponible et favoris

genererRecettes(pieces)


// genererRecettesfav(pieces)


function genererRecettes(pieces) {


// La boucle aura autant d'itérations que de recettes dans recettes_list

   for (let i=0; i< pieces.length; i++) {


// Création des balises de notre fiche article. l'image est mise dans un lien (miniaturisée en CSS) qui menera à la taille de l'image original lors du click
  

      const article = pieces[i];
      const sectionFiches = document.querySelector(".galerie .ensemble_fiches");
      const recette = document.createElement("div");
      recette.classList.add("recette")
      const img_box = document.createElement("div");
      img_box.classList.add("img_box")
      const fiche = document.createElement("article");
      fiche.id = article.nom
      const imageElement = document.createElement("img");
      imageElement.src = article.image;
      imageElement.title = "Cliquez pour agrandir";
      const lien = document.createElement("a");
      lien.href = article.image;
      const nomElement = document.createElement("h2");
      nomElement.innerText = article.nom;
      const prixElement = document.createElement("h3");
      prixElement.innerText = `${article.prix} € `;
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = article.description;
    
      // Si l'article n'est pas disponible, on affiche un petit texte "indisponible" par dessus l'image

      if (article.disponible === false){
         const texte_indisponible = document.createElement("p");
         texte_indisponible.innerText = "Indisponible";
         img_box.appendChild(texte_indisponible);

      }        
  
    // Rattachement des balises fiches au DOM
    
    fiche.appendChild(img_box);
    sectionFiches.appendChild(fiche);
    fiche.appendChild(recette);
    img_box.appendChild(lien);
    lien.appendChild(imageElement);
    recette.appendChild(nomElement);
    recette.appendChild(descriptionElement);
    recette.appendChild(prixElement);

    const clone_fiche = fiche.cloneNode(true);


    // Création des balises de la partie panier

    const ajoutPanier = document.createElement("div");
    const imagePanier = document.createElement("input");
    imagePanier.type ="image"
    imagePanier.src = "image/basket-shopping-solid.svg";
    imagePanier.id ="image_Panier"
    const textPanier = document.createElement("p");
    textPanier.innerText = "Ajouter au panier :"
    const inputPanier = document.createElement("input");
    inputPanier.type = "texte";
    inputPanier.id = "quantite_" + article.nom;
    inputPanier.placeholder = "Quantité";
    
    // Rattachement des balises panier au DOM

    ajoutPanier.appendChild(inputPanier);
    ajoutPanier.appendChild(textPanier);
    ajoutPanier.appendChild(imagePanier);
    recette.appendChild(ajoutPanier);

        
    // Création de la partie favoris : la fiche est clonée dans la variable clone ( reutiliser la fiche la déplace, ce n'est pas possible )
    // Mise en place de la condition d'affichage clone : l'article est en favoris

    const favoris = document.getElementById("ensemble_favoris")
       

       if (article.favori === true){

         favoris.appendChild(clone_fiche);

       }





   // Ajout du click sur le panier pour rajouter une ligne

imagePanier.addEventListener("click", function () {
    
   const baliseQuantite = document.getElementById(inputPanier.id)
   const quantite = baliseQuantite.value
   console.log(article.nom)
   console.log(quantite)

   // Recherche dans le tableau doublon si cet article à déja une ligne dans le panier (et donc dans le tableau aussi)

let recherche = tableau_doublon.find(

         (search) => search === article.nom,

            )

            console.log(recherche)

   // Condition : si l'article est dans le tableau, le reste de l'evenement click ne se produira pas
   
   if (recherche != article.nom && !isNaN(quantite) && quantite != 0 && article.disponible === true && (quantite > 0))  {

      console.log(recherche)
      console.log(article.nom)

   // Création de la phrase détaillant la quantité et le prix de l'article selectionné et actualisation du prix total

   let phrase = (quantite + " " + article.nom + " ( " + article.decoupe + " ) à " + article.prix + " € ")
   phrasePanier.classList.add("phrases_panier")
   console.log(phrase)
   phrasePanier.innerText=phrase
   prix_total += (quantite * article.prix)
   console.log(prix_total)
   montant.innerText = "le montant de votre panier s'élève à " +  prix_total + " € "
      
   // Rattachement de la ligne panier au DOM et actualisation du tableau doublon 
   
   lignePanier.appendChild(iconeFleche)
   lignePanier.appendChild(phrasePanier)
   lignePanier.appendChild(iconePoubelle)
   panier.appendChild(lignePanier)
   tableau_doublon.push(article.nom)
   console.log(tableau_doublon)

   }

   });
      
   // Création des balises de la partie suppression de ligne

    const iconePoubelle = document.createElement("input");
    iconePoubelle.type ="image"
    iconePoubelle.src = "image/trash-solid.svg";
    iconePoubelle.id ="icone_poubelle";
    const lignePanier = document.createElement("div");
    let phrasePanier = document.createElement("p");
    lignePanier.id ="ligne_panier_" +  article.nom;
    lignePanier.classList.add("ligne_et_poubelle");
    const iconeFleche = document.createElement("img");
    iconeFleche.id = "icone_fleche";
    iconeFleche.src = "image/arrow-right-solid.svg";

   // Ajout du click sur l'icone poubelle pour supprimer la ligne y correspondant, puis actualisation prix total et tableau doublon (si l'utilisateur veut de nouveau selectionner cet article plus tard)

    iconePoubelle.addEventListener("click", function () {
    const baliseQuantite = document.getElementById(inputPanier.id)
    const quantite = baliseQuantite.value
    prix_total -= (quantite * article.prix)
    prix_total = Math.round(prix_total * 100) / 100;
    console.log(prix_total)
    lignePanier.remove();
    phrasePanier.remove();
    montant.innerText = ""
    montant.innerText = "le montant de votre panier s'élève à " +  prix_total + " € "
    tableau_doublon = tableau_doublon.filter((tableau_doublon) => tableau_doublon !== article.nom)

    });

   }}

 // Création des 4 boutons de tris/filtres de la galerie : tri croissant/décroissant et filtre de pièces disponibles/toutes pièces
 // Après chaque utilisation de bouton, les fiches sont effacées et regénérées pour être mise à jours


const btn_croissant = document.querySelector(".btn_croissant");
const btn_decroissant = document.querySelector(".btn_decroissant");
const btn_filtrer = document.querySelector(".btn_filtrer");
const btn_tout = document.querySelector(".btn_tout");


btn_croissant.addEventListener("click", function () {
    
    pieces.sort(function(a,b) {
         return a.prix - b.prix;
    });
 
    
    document.querySelector(".galerie .ensemble_fiches").innerHTML = "";
    document.getElementById("ensemble_favoris").innerHTML = "";
    genererRecettes(pieces);
 
 
 });


 btn_decroissant.addEventListener("click", function () {
     
     pieces.sort(function(a,b) {
          return b.prix - a.prix;
     });
   
    document.querySelector(".galerie .ensemble_fiches").innerHTML = "";
    document.getElementById("ensemble_favoris").innerHTML = "";
   genererRecettes(pieces);
 
 
 
 });

 btn_filtrer.addEventListener("click", function () {

    const piecesFiltrees = pieces.filter(function(pieces) {
            return pieces.disponible === true;

    });
 
    console.log(piecesFiltrees);
    document.querySelector(".galerie .ensemble_fiches").innerHTML = "";
    document.getElementById("ensemble_favoris").innerHTML = "";
    genererRecettes(piecesFiltrees);


     
 
 });

 btn_tout.addEventListener("click", function () {
   document.querySelector(".galerie .ensemble_fiches").innerHTML = "";
   document.getElementById("ensemble_favoris").innerHTML = "";
    genererRecettes(pieces);
 
 });
 
 // Création du texte de présentation, data importées depuis presentation.json



const pres = await fetch('presentation.json');
const presentation = await pres.json();
const main_text = document.querySelector(".main_text");
const texte_presentation = document.createElement("p");


for (let i=0; i< presentation.length; i++) {

     
   
const pres = presentation[i];

texte_presentation.innerText = pres.texte;
main_text.appendChild(texte_presentation)

}

// Création des fiches de l'équipe contenant le nom, une description ainsi qu'une photo, data importées depuis equipe.json

const team = await fetch('equipe.json');
const equipe = await team.json();
const team_box = document.querySelector(".team_box");

for (let i=0; i< equipe.length; i++) {
  
const team = equipe[i];

const profile = document.createElement("div");
profile.classList.add('profile')
const info = document.createElement("div");
info.classList.add('info')

const name = document.createElement("h2");
name.innerText=team.nom
name.classList.add('name')

const bio = document.createElement("p");
bio.innerText=team.bio
bio.classList.add('bio')

const image = document.createElement('img');
image.src = team.image;
   
team_box.appendChild(profile);
profile.appendChild(info);   
info.appendChild(name);  
info.appendChild(bio);
profile.appendChild(image);

}

//Création du script du formulaire de commande, on récupére les data saisies par l'utilisateur pour les injecter dans la fonction "afficher mail" ci bas
// On empêche le rechargement automatique de la page qui interromperais l'execution du code avec la méthode preventDefault()

const form = document.querySelector('form')



   form.addEventListener("submit",(event) => {
      event.preventDefault();
      const baliseNom = document.getElementById("nom")
      const nom = baliseNom.value
      const balisePrenom = document.getElementById("prenom")
      const prenom = balisePrenom.value
      const baliseTel = document.getElementById("tel")
      const tel = baliseTel.value
      const baliseAdresse = document.getElementById("adresse")
      const adresse = baliseAdresse.value

      afficherEmail(nom, prenom, tel, adresse)
   } 

)

// Récupération des boutons radio de livraison. Si livraison_oui est coché, l'input de saisie de l'adresse devient visible et inversement si livraison_non est coché

const adresse_postale = document.getElementById("adresse_postale")
const livraison_oui = document.getElementById("livraison_oui")
const livraison_non = document.getElementById("livraison_non")
let choix_livraison = false

livraison_oui.addEventListener("click", () => {

   adresse_postale.classList.remove("invisible")
   choix_livraison = true

  
});

livraison_non.addEventListener("click", () => {
   adresse_postale.classList.add("invisible")
   choix_livraison = false

});

// Création de la fonction afficherEmail, qui formate un mail en utilisant les données utilisateur et la liste des phrases du panier

function afficherEmail(nom, prenom, tel, adresse) {

const email = "alexis.f.m@hotmail.fr"
const tableau_phrases= document.querySelectorAll(".phrases_panier")
console.log(tableau_phrases)
let phrase_commande = ""

for (let i=0; i< tableau_phrases.length; i++) {

  phrase_commande += "%0D%0A" + "%0D%0A" + tableau_phrases[i].textContent;


}


let now = new Date()

let texte_livraison = ""

if (choix_livraison) {

   texte_livraison = `et je voudrais une livraison à l'adresse suivante : ${adresse}.`

}

else { 
   texte_livraison = `et j'irai moi même chercher ma commande.`
}


const mailto = `mailto:${email}?subject=Commande du ${now.toLocaleDateString("fr")}&body=Bonjour, je suis ${prenom} ${nom}. %0D%0A Je suis joignable au ${tel} ${texte_livraison} %0D%0A  %0D%0A J'aimerais pour cette commande : %0D%0A  ${phrase_commande} %0D%0A %0D%0A 
 Pour un  montant total de ${prix_total} €`
    location.href = mailto

}
