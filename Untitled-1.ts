
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('recipes_list.json');
const recipe = await reponse.json();


    // for (let i = 0; i < pieces.length; i++) {

        const article = recipe[0];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} €`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);
    
     
   

        [
            {
                "id": 1,
                "nom": "Fraisier",
                "prix": 10.5,
                "image": "image/fraisier.jpg",
                "description": "- Dacquoise amande - Crème diplomate Vanille - Fraises Françaises",
                "disponibilite": true,
                "favori": true
            },
        
         
            {
                "id": 2,
                "nom": "Cake design",
                "prix": 25,
                "image": "image/cake_design.jpg",
                "description": "Thème arc en ciel, licrone - Génoise vanille - Ganache chocolat au lait - Décor sucette meringue, Pâte à sucre, ganache vanille colorée",
                "disponibilite": true,
                "favori": true
            },
        
            {
                "id": 3,
                "nom": "Mignardises",
                "prix": 5.5,
                "image": "image/mignardises.jpg",
                "description": "Divers mignardises",
                "disponibilite": false,
                "favori": false
            },
            {
                "id": 4,
                "nom": "choux pistache",
                "prix": 3.25,
                "image": "image/choux_pistache.jpg",
                "description": "- Choux craquelin - Ganache pistache - Confit cassis/myrtille - Macarons pistache",
                "disponibilite": true,
                "favori": false
            },
        
            {
                "id": 5,
                "nom": "Liquide de frein",
                "prix": 9.60,
                "image": "image/liquide-frein.png",
                "description": "c'est du liquide de frein",
                "disponibilite": false,
                "favori": false
            }
        ]