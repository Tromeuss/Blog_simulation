let loader = document.getElementById("loader-4");
let blog = document.getElementById("articles")
let erreur = document.getElementById("erreurr")
let titre = document.querySelector("#titre")
let texte = document.querySelector("#texte")
let bouton = document.getElementById("reload")


function reset () {
    erreur.classList.add("none")
    loader.classList.remove("none")
    blog.classList.add("none")
    bouton.classList.add("none")
}



function main(latence) {
    reset();
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
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



reset()
loader.classList.add("none")
bouton.classList.remove("none")
bouton.addEventListener("click", function() {

    main(2000)
    .then(data => {
        const articles = document.querySelectorAll('.article')
        articles.forEach((article, index)=> {
        article.querySelector('#titre').textContent = data[index].title;
        article.querySelector('#texte').textContent = data[index].body;
    })

    })

    .catch(error => {erreur.classList.remove("none"), loader.classList.add("none"), console.log(error)})
    
})

