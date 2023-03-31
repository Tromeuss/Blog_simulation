let loader = document.getElementById("loader-4");
let blog = document.getElementById("articles")
let erreur = document.getElementById("erreurr")
let bouton = document.getElementById("reload")
let contour = document.getElementById("contour")
let lim = document.getElementById("limit")
let span = document.getElementById("span")





function reset () {
    erreur.classList.add("none")
    blog.classList.add("none")
    bouton.classList.add("none")
    contour.classList.add("none")

}



function main(latence, limit) {
    reset();
    lim.classList.add("none")
    span.classList.add("none")
    contour.classList.remove("none")
    loader.classList.remove("none")
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
          .then(res => {
            if (!res.ok) {
              reject(new Error('Erreur de requête'));
            } else {
              res.json()
                .then(data => {
                  resolve(data);
                })
                .catch(error => {
                  reject(error);
                });
                loader.classList.add("none")
                blog.classList.remove("none")
            }
          })
          .catch(error => {
            reject(error);
          });
      }, latence);
    });
  }




function art(nombre) {
    for(let i = 0; i<nombre; i++){
            // Création des éléments
      let divArticle = document.createElement("div");
      divArticle.className = "article";
      divArticle.id = "art";

      let h2Titre = document.createElement("h2");
      h2Titre.className = "titre";

      let pTexte = document.createElement("p");
      pTexte.className = "texte";

      let pDate = document.createElement("p");
      pDate.className = "date";

      let cont = document.getElementById("cont")
      let cont_deux = document.getElementById("cont2")


      // Ajout des éléments en tant qu'enfants de leurs parents respectifs
      divArticle.appendChild(h2Titre);
      divArticle.appendChild(pTexte);
      divArticle.appendChild(pDate);

      if(i %2 == 0) {
        cont.appendChild(divArticle);
      } else {
        cont_deux.appendChild(divArticle);
      }

    } 
}







reset()
loader.classList.add("none")
bouton.classList.add("none")

var inputValue = null
document.querySelector('#limit').addEventListener('input', function () {
  if(this.value.length > 0){
    bouton.classList.remove("none")
    inputValue = this.value
    
    return inputValue
  }})

bouton.addEventListener("click", function() {

    main(2000, inputValue)
    .then(data => {

        let nbr = data.length
        art(nbr)
        let divArticle = document.querySelectorAll(".article")
        for (let i = 0; i < nbr ; i++) {
          divArticle[i].querySelector('.titre').textContent = data[i].title;
          divArticle[i].querySelector('.texte').textContent = data[i].body;
        }

    })

    .catch(error => {erreur.classList.remove("none"), loader.classList.add("none"), console.log(error)})
    
})

