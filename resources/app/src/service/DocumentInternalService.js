import {useStore} from '@/store.js'
import axios from 'axios';



export default class Service {
    getCategory(){
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/categories/INTERNAL'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/Documentkeluar"))
                
                
                return res.data
            })
    }

    getDocuments() {
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/document/internal'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/Documentkeluar"))
                
                
                return res.data
            })
			
            
    }

    
}
