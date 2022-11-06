function saveProduct(productFetch){
   
   
    localStorage.setItem("product",JSON.stringify(productFetch));
}

function getProduct (){
   let productFetch= localStorage.getItem("product");

   if (productFetch == null){
    console.log("localstorage vide")
    
    return [];
   } else{

       console.log("localstorage plein")
       return JSON.parse(productFetch);

   }
   
}

function addProduct(listProductFetch){
    let productFetch= getProduct();
    productFetch.push(listProductFetch);
    saveProduct(productFetch);
    
}

function removeProduct(indexFetch){
    let productFetch= getProduct();
     listProductFetch = listProductFetch.filter(listProductFetch[indexFetch] )
    
    saveProduct(productFetch)
    
}

