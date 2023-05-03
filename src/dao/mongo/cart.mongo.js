const { cartModel } = require("./model/cart.model")

class CartManagerMongo {
    
    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }
    async getCartById(pid){
        try {            
            return await cartModel.findOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }

    }
    async addCart(newCart){
        try {
            
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }
   
    async addProduct(cid,pid){
        try {
            const cart = await cartModel.findOne({_id: cid})
            const product = cart.Products.find(producto =>producto.idProduct === pid);
            if(!product){
                return await cartModel.updateOne(
                    {_id: cid},
                    {$push: {products: {idProduct:pid, quantity: 1}}}
                )

            }else{
                return await cartModel.updateOne(
                    {_id: cid, "products.idProduct":pid},
                    {$inc: {"Products.$.quantity": 1}}
                )
            }


        } catch (error) {
            return new Error(error)
        }
    }
   
}

module.exports = new CartManagerMongo