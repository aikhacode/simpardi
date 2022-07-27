import axios from "axios"
import {parseApi} from "@/helper"
import {useStore} from "@/store"

export default class ProductService {

	getTipeSurats(){


     return axios({
            method: 'GET',
                url: parseApi('/tipesurat'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data)

    }

    save(product,newMode=true){
    	return axios({
            method: (newMode) ? 'POST' : 'PUT',
                url: (newMode) ? parseApi('/tipesurat') : parseApi('/tipesurat/'+product.id),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                },
                data: product,
        }).then(res => res.data)
    }

    delete(product){
    	return axios({
            method: 'DELETE',
                url: parseApi('/tipesurat/'+product.id),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                },
                
        }).then(res => res.data)	
    }
	
}