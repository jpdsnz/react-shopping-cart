//Coffee: price_1MgJ9qE8xYOT8PJXTGBHZODA
//Sunglasses: price_1MgJAjE8xYOT8PJX77w9xXWW
//Camera: price_1MgJBPE8xYOT8PJXK1J6yYYg


const productsArray = [
    {
        id: "price_1MgJ9qE8xYOT8PJXTGBHZODA",
        title: "Coffee", 
        price: 4.99
    },
    {
        id: "price_1MgJAjE8xYOT8PJX77w9xXWW",
        title: "Sunglasses", 
        price: 9.99
    },
    {
        id: "price_1MgJBPE8xYOT8PJXK1J6yYYg",
        title: "Camera", 
        price: 39.99
    },
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id)

    if(productData === undefined){
        console.log("Product data does not exist for ID: " + id);
        return undefined
    }

    return productData;
}

export { productsArray, getProductData };