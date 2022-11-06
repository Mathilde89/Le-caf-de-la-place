// Script avant utilisation prototype

 const ajoutAlcool = document.querySelector('#selectionType')
 const siAlcool= document.querySelector('#degre')
 siAlcool.style.display='none' 
 
  ajoutAlcool.addEventListener('change', function(){
     // console.log("ajout.value", ajoutAlcool.value)
     
     if (ajoutAlcool.value=="Boisson alcoolisée"){
         siAlcool.style.display='inline-block'
         
     } else {
         siAlcool.style.display='none'  
     }
 
 })
 
 // Reccupere la valeur des inputs. 
 // Mettre la valeur des inputs dans un objets puis tableau
 
 const nomProduitDOM=document.querySelector('#nomProduit')
 const nomQuantiteDOM=document.querySelector('#quantite')
 const PAHTDOM=document.querySelector('#PAHT')
 const PVHTDOM=document.querySelector('#PVHT')
 const selectTypeDOM=document.querySelector('#selectionType')
 const degreDOM=document.querySelector('#degre')
 
 const listProduct=[]
 
 const ajoutDOM=document.querySelector('#ajout')
 ajoutDOM.addEventListener('click', function(event){
     event.preventDefault()
     const product={
         Nom : nomProduitDOM.value,
         Quantité : nomQuantiteDOM.value,
         PrixAchat: PAHTDOM.value,
         PrixVente: PVHTDOM.value,
         Type: selectTypeDOM.value,
         Degre: degreDOM.value,
 
     }
     console.log(product)
     listProduct.push(product)
     console.log(listProduct)
 
 
 })