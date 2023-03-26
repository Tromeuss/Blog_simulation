


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



function main (latence){ 
    reset()
    const r = setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=4')
        .then(res => {
            if (res.ok){
                res.json()
                .then(res => {
                const articles = document.querySelectorAll('.article')
                articles.forEach((article, index)=> {
                    article.querySelector('#titre').textContent = res[index].title;
                    article.querySelector('#texte').textContent = res[index].body;
                    
                })
                    loader.classList.add("none")
                    blog.classList.remove("none")
                })

            }else{
                throw new Error('Erreur de requête')
            }}) 

            

    }, latence);
    
}


reset()
loader.classList.add("none")
bouton.classList.remove("none")

bouton.addEventListener("click", function() {
    main(2000)

})