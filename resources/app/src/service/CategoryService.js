import axios from "axios"
import {parseApi} from "@/helper"
import {useStore} from "@/store"

export default class ProductService {

	getCategories(){


     return axios({
            method: 'GET',
                url: parseApi('/categories'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data)

    }

    save(product,newMode=true){
    	return axios({
            method: (newMode) ? 'POST' : 'PUT',
                url: (newMode) ? parseApi('/categories') : parseApi('/categories/'+product.id),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                },
                data: product,
        }).then(res => res.data)
    }

    delete(product){
    	return axios({
            method: 'DELETE',
                url: parseApi('/categories/'+product.id),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                },
                
        }).then(res => res.data)	
    }
	
}