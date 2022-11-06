// Le Café Place souhaite pouvoir gérer son stock depuis une application web sur l'ordinateur du comptoir. L'application doit proposer les fonctionnalité suivantes:

// 1. L'utilisateur doit pourvoir ajouter un nouveau produit dans le stock. Chaque produit doit comporter les caractéristiques suivantes, qui seront saisies ou calculées automatiquement:
// - Nom
// - Quantité de produits
// - Prix d'achat HT
// - Prix de vente HT
// - Marge HT (calculée automatiquement)
// - Prix de vente TTC (calculé automatiquement)
// - Type ("Boisson alcoolisée", "Boisson non alcoolisée", "Autre")
// - Degré d'alcool (uniquement pour les alcools)

// Vous devrez utiliser des classes ou des prototypes pour la création des produits.
// 2. L'utilisateur doit pouvoir consulter la liste des produits avec toutes leurs informations. Il doit également pouvoir décrémenter ou incrémenter le niveau de stock de chaque produit. Un stock ne peut être négatif.
// 3. L'utilisateur doit pouvoir modifier les caractéristiques d'un produit ou le supprimer du stock.
// 4. Le stock doit être sauvegardé en localstorage et récupéré lors du chargement de la page pour conserver les informations.
// 5. L'interface doit être claire, simple d'utilisation et doit inclure idéalement un code couleur pour alerter du niveau de stock.


//si fini :
//mettre la valeur PV*Quantité en bas de la card


// FORMULAIRE
const ajoutAlcool = document.querySelector('#selectionType')
const siAlcool = document.querySelector('#degre')
const selecteurDOM = document.querySelector(`.container`)
siAlcool.style.display = 'none'

ajoutAlcool.addEventListener('change', function () {
    // console.log("ajout.value", ajoutAlcool.value)

    if (ajoutAlcool.value == "Boisson alcoolisée") {
        siAlcool.style.display = 'inline-block'

    } else {
        siAlcool.style.display = 'none'
    }

})
const quantiteNeg = document.querySelector('#quantite')

quantiteNeg.addEventListener('change', function () {

    if (quantiteNeg.value < 0) {
        quantiteNeg.value = 0
        alert("Attention vous avez rentré une valeur négative, par défaut la quantité sera mise à 0")

    }

})



// LOCAL STORAGE
//Affichage si déja présent dans local storage

const listProduct = []
function getProduct() {
    let productFetch = localStorage.getItem("product");

    if (productFetch == null) {
        console.log("localstorage vide")

        return [];
    } else {

        console.log("localstorage plein")

        for (var i = 0; i < JSON.parse(localStorage.getItem("product")).length; i++) {

            listProduct.push(JSON.parse(localStorage.getItem("product"))[i])
            console.log("tableao", listProduct)
        }
        // console.log("listProduct", tableauinit)

        
            
            for (var i = 0; i < listProduct.length; i++) {
                console.log("listProduc", listProduct[i])
                const affichcardinitDOM = document.createElement('div')
                affichcardinitDOM.classList.add('cards')

                affichcardinitDOM.innerHTML =
                    `
                    <div class="nivStock">
                    <div class="progression"></div>
                    </div>
                    <div class="info">
                    <div class="deleteCard"><i class="fa-regular fa-rectangle-xmark"></i>
                    </div>
                    <div class="infoBloc">
                    <form action="">
                    <div class="productItem"> <p>Produit : <input id="selectionNom" type="text" value=${listProduct[i].nom}></p></div>
                    <div class="productQuantite"><p>Quantité : ${listProduct[i].quantite}</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
                    <div class="productPA"><p>Prix d'achat HT : ${listProduct[i].paHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
                    <div class="productPV"><p>Prix de vente HT : ${listProduct[i].pvHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
                    <div class="productMarge"><p>Marge : ${listProduct[i].marge}%</p></div>
                    <div class="productPVTTC"><p>Prix de vente TTC : ${listProduct[i].pvTTC}€</p></div>
                    <div><p>Type de produit : 
                    <select name="type" id="selectionTypeCard">
                    <option value="">${listProduct[i].type}</option>
                    <option value="Boisson alcoolisée">Boisson alcoolisée</option>
                    <option value="Boisson non alcoolisée">Boisson non alcoolisée</option>
                    <option value="Autre">Autre</option>
                    </select></p></div>
                    <div class="productDegre" "productDegre"><p>Degré d'alcool (°): <input type="text" value=${listProduct[i].degre}></p></div>

                    </form>
                    </div>
                    `
                    selecteurDOM.append(affichcardinitDOM)
            }
        // })
    
    }
    return JSON.parse(productFetch);



}
    



getProduct();



// const object1 = JSON.parse(localStorage.getItem("product"))[0];
// const object2 = JSON.parse(localStorage.getItem("product"))[1];
// console.log("objetfetch0", JSON.parse(localStorage.getItem("product"))[0])
// console.log("objetfetch1", JSON.parse(localStorage.getItem("product"))[1])
// console.log("objetfetch2", JSON.parse(localStorage.getItem("product"))[2])
// // console.log("objetfetch1", JSON.parse(localStorage.getItem("product")))





// Reccupere la valeur des inputs. 


const nomProduitDOM = document.querySelector('#nomProduit')
const nomQuantiteDOM = document.querySelector('#quantite')
const PAHTDOM = document.querySelector('#PAHT')
const PVHTDOM = document.querySelector('#PVHT')
const selectTypeDOM = document.querySelector('#selectionType')
const degreDOM = document.querySelector('#degre')
const divproductDegre = document.querySelector('.productDegre')

// const listProduct = []
const para = document.querySelector('p')



// Realisation du prototype

const ProductProto = function (nom, quantite, paHT, pvHT, type, degre,) {
    this.nom = nom
    this.quantite = quantite
    this.paHT = paHT
    this.pvHT = pvHT
    this.marge = 0
    this.pvTTC = 0
    this.type = type
    this.degre = degre
    // this.TVA = TVA
    this.calcmarge = function () {
        this.marge = Math.floor((this.pvHT - this.paHT) * 100 / this.paHT)
    }
    this.calcTTC = function () {
        let TVA = 0;
        if (this.type == "Boisson alcoolisée") {
            TVA = 1.2
        }
        if (this.type == "Boisson non alcoolisée") {
            TVA = 1.1
        }
        if (this.type == "Autre") {
            TVA = 1.05
        }
        return Math.floor(this.pvTTC = this.pvHT * TVA)
    }
    this.calcquantite = function () {
        if (this.quantite < 0) {
            this.quantite = 0
        }

    }

}

// Met les valeurs du formulaire dans le prototype
const ajoutDOM = document.querySelector('#ajout')
ajoutDOM.addEventListener('click', function (event) {
    event.preventDefault()

    const productInfo = new ProductProto(nomProduitDOM.value, nomQuantiteDOM.value, PAHTDOM.value, PVHTDOM.value, selectTypeDOM.value, degreDOM.value);
    // console.log(productInfo)

    // Met les valeurs du prototype dans le tableau
    listProduct.push(productInfo)

    showItemListInDom()



})

function showItemListInDom() {

    selecteurDOM.innerHTML = ""

    listProduct.forEach(item => {
        const divDOM = document.createElement('div')
        const divDOM2 = document.createElement('div')
        const divDOM3 = document.createElement('div')

        divDOM3.classList.add('progression')
        divDOM2.append(divDOM3)

        divDOM2.classList.add('nivStock')
        divDOM.append(divDOM2)

        divDOM.classList.add(`cards`)


        const divDOM4 = document.createElement('div')
        const divDOM5 = document.createElement('div')
        const iconeClose = document.createElement('i')

        iconeClose.classList.add("fa-regular")
        iconeClose.classList.add("fa-rectangle-xmark")
        divDOM5.append(iconeClose)

        divDOM5.classList.add(`deleteCard`)
        divDOM4.append(divDOM5)



        divDOM4.classList.add(`info`)
        divDOM.append(divDOM4)
        const divDOM6 = document.createElement('div')
        item.calcmarge()
        item.calcTTC()
        item.calcquantite()

        divDOM6.classList.add("infoBloc")

        if (ajoutAlcool.value == "Boisson alcoolisée") {

            divDOM6.innerHTML =
                `
            <form action="">
        <div class="productItem"> <p>Produit : <input id="selectionNom" type="text" value=${item.nom}></p></div>
        <div class="productQuantite"><p>Quantité : ${item.quantite}</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productPA"><p>Prix d'achat HT : ${item.paHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productPV"><p>Prix de vente HT : ${item.pvHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productMarge"><p>Marge : ${item.marge}%</p></div>
        <div class="productPVTTC"><p>Prix de vente TTC : ${item.pvTTC}€</p></div>
        <div><p>Type de produit : 
            <select name="type" id="selectionTypeCard">
                <option value="">${item.type}</option>
                <option value="Boisson alcoolisée">Boisson alcoolisée</option>
                <option value="Boisson non alcoolisée">Boisson non alcoolisée</option>
                <option value="Autre">Autre</option>
            </select></p></div>
        <div class="productDegre" "productDegre"><p>Degré d'alcool (°): <input type="text" value=${item.degre}></p></div>
        
        </form>
        `
            divDOM4.append(divDOM6)

        } else {
            divDOM6.innerHTML =
                `<form  action=""></form>
        <div class="productItem"> <p>Produit : <input id="selectionNom" type="text" value=${item.nom}></p></div>
        <div class="productQuantite"><p>Quantité : ${item.quantite}</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productPA"><p>Prix d'achat HT : ${item.paHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productPV"><p>Prix de vente HT : ${item.pvHT}€</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>
        <div class="productMarge"><p>Marge : ${item.marge}%</p></div>
        <div class="productPVTTC"><p>Prix de vente TTC : ${item.pvTTC}€</p></div>
        <div><p>Type de produit : 
            <select name="type" id="selectionTypeCard">
                <option value="">${item.type}</option>
                <option value="Boisson alcoolisée">Boisson alcoolisée</option>
                <option value="Boisson non alcoolisée">Boisson non alcoolisée</option>
                <option value="Autre">Autre</option>
            </select></p></div>
            </form>
        `
            divDOM4.append(divDOM6)

        }

        //QUANTITE PLUS ET MINUS
        const iconePlusDOM = divDOM6.querySelector('.iconePlus')
        const iconeMinusDOM = divDOM6.querySelector('.iconeMinus')
        const divquantite = divDOM6.querySelector('.productQuantite')
        const divquantiteP = divquantite.querySelector('p')

        const divPA = divDOM6.querySelector('.productPA')
        const iconeMinusDOMPA = divPA.querySelector('.iconeMinus')
        const iconePlusDOMPA = divPA.querySelector('.iconePlus')
        const divPAP = divPA.querySelector('p')

        const divPV = divDOM6.querySelector('.productPV')
        const iconeMinusDOMPV = divPV.querySelector('.iconeMinus')
        const iconePlusDOMPV = divPV.querySelector('.iconePlus')
        const divPVP = divPV.querySelector('p')



        const divMarge = divDOM6.querySelector('.productMarge')
        const divPVTTC = divDOM6.querySelector('.productPVTTC')

        const barreprogression = divDOM2.querySelector('.progression')






        function calculNivStock() {
            let calcHprogression = 0;
            calcHprogression = item.quantite / nomQuantiteDOM.value * 100
            console.log("calcul", calcHprogression)
            // barreprogression.style.height = `100%`


            if (calcHprogression < 40) {
                barreprogression.style.background = "red"
                barreprogression.style.height = `${calcHprogression}%`

            }
            else if (calcHprogression < 70) {
                barreprogression.style.background = "orange"
                barreprogression.style.height = `${calcHprogression}%`

            }
            else if (calcHprogression < 100) {
                barreprogression.style.background = "green"
                barreprogression.style.height = `${calcHprogression}%`
            }

            else if (calcHprogression > 100) {
                barreprogression.style.background = "green"
                barreprogression.style.height = `100%`

            }

        }

        // TYPE & degre : Mise à jour du tableau si click dans la card


        const changeType = divDOM6.querySelector('#selectionNom')

        changeType.addEventListener('change', function () {
            item.nom = changeType.value

        })




        // QUANTITE : Icone Plus Moins
        iconeMinusDOM.addEventListener('click', function () {

            item.quantite--
            if (item.quantite <= 0) {
                item.quantite = 0
            }
            divquantiteP.innerText = `Quantité : ${item.quantite}`

            console.log(listProduct)
            //Niveau de stock

            calculNivStock()

        })

        iconePlusDOM.addEventListener('click', function () {
            item.quantite++
            divquantiteP.innerText = `Quantité : ${item.quantite}`
            console.log(listProduct)
            calculNivStock()

        })

        // PRIX ACHAT Plus et moins
        iconeMinusDOMPA.addEventListener('click', function () {

            item.paHT--
            if (item.paHT <= 0) {
                item.paHT = 0
            }
            divPAP.innerText = `Prix d'achat HT :  ${item.paHT}€`
            item.calcmarge()
            item.calcTTC()
            divMarge.innerText = `Marge : ${item.marge}%`
            divPVTTC.innerText = `Prix de vente TTC : ${item.pvTTC}€`

            console.log(listProduct)

        })

        iconePlusDOMPA.addEventListener('click', function () {
            item.paHT++
            divPAP.innerText = `Prix d'achat HT : ${item.paHT}€`
            item.calcmarge()
            item.calcTTC()
            divMarge.innerText = `Marge : ${item.marge}%`
            divPVTTC.innerText = `Prix de vente TTC : ${item.pvTTC}€`

            console.log(listProduct)


        })


        // PRIX VENTE Plus et moins
        iconeMinusDOMPV.addEventListener('click', function () {

            item.pvHT--
            if (item.pvHT <= 0) {
                item.pvHT = 0
            }
            divPVP.innerText = `Prix de vente HT :  ${item.pvHT}€`
            item.calcmarge()
            item.calcTTC()
            divMarge.innerText = `Marge : ${item.marge}%`
            divPVTTC.innerText = `Prix de vente TTC : ${item.pvTTC}€`


        })

        iconePlusDOMPV.addEventListener('click', function () {
            item.pvHT++
            divPVP.innerText = `Prix de vente HT : ${item.pvHT}€`
            item.calcmarge()
            item.calcTTC()
            divMarge.innerText = `Marge : ${item.marge}%`
            divPVTTC.innerText = `Prix de vente TTC : ${item.pvTTC}€`



        })

        const ajoutAlcoolCard = divDOM6.querySelector('#selectionTypeCard')
        const siAlcoolCard = divDOM6.querySelector('.productDegre')
        const DIVsiAlcoolCard = document.createElement('div')


        // <div class="productDegre" "productDegre"><p>Degré d'alcool : ${item.degre}°</p><div><i class="iconePlus fa-regular fa-square-plus"></i><i class="iconeMinus fa-regular fa-square-minus"></i></div></div>



        ajoutAlcoolCard.addEventListener('change', function () {

            if (ajoutAlcoolCard.value == "Boisson alcoolisée") {
                console.log(ajoutAlcoolCard.value)
                DIVsiAlcoolCard.innerHTML = `<p>Degré d'alcool (°): <input type="text" value=Saisir valeur></p>`
                DIVsiAlcoolCard.classList.add('productDegre')
                divDOM6.append(DIVsiAlcoolCard)


            } else {

                siAlcoolCard.remove()
                DIVsiAlcoolCard.remove()
            }
        })


        selecteurDOM.append(divDOM)

        // Sauvergarde le tableau listproduct dans le local storage
        // saveProduct(listProduct)
        addProduct(listProduct)




        // CLOSE
        iconeClose.addEventListener('click', function () {

            // divDOM.remove()

            divDOM.classList.add('move')
            setTimeout(() => {
                divDOM.remove()
                // Sauvergarde le tableau listproduct dans le local storage car des élements ont été enlevé
                

            }, 300);



            // delete element in array
            let numIndex = listProduct.indexOf(item)
            console.log('Index = ', numIndex)
            listProduct.splice(numIndex, 1)


        })



        // const tablFetch=[]
        // console.log(localStorage.getItem("product"))
        // tablFetch=localStorage.getItem("product")


        // localStorage.setItem("savedData", JSON.stringify([object1, object2 /*, etc*/]));
        // const object1 = JSON.parse(localStorage.getItem("product"))[0];
        // const object2 = JSON.parse(localStorage.getItem("product"))[1];
        // // object2 = JSON.parse(localStorage.getItem("product"))[1];
        // console.log(object1)
        // const newtableau=[]
        // newtableau.push(object1)
        // newtableau.push(object2)
        // console.log("newtableau", newtableau)

        // // Ajout dans Fetch
        // let numIndexFetch=listProduct.indexOf(item)

        // addProduct(listProduct[numIndexFetch])
        // // (listProduct)

        // console.log(listProduct)
        // console.log(localStorage.getItem("product"))

    })



}



//convertir le tableau en JSON
//SET ITEM DANS LE LOCAL STORAGE
//GET ITEM au rechargement de la page
// afficher les cards 