import {useStore} from '@/store.js'
import axios from 'axios';
import {parseApi,parseWeb} from "@/helper.js"


export default class Service {
    getTTD(disposisiId){
        return axios({
             method: 'get',
                url: parseApi(`/ttd/disposisi/${disposisiId}`),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data);        
    }
    
    getTipeSurats(){
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/tipesurat'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/suratkeluar"))
                            
                return res.data
            })
        
    }

    
    getSurats() {
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/suratmasuk'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/suratkeluar"))
                res.data = res.data.map((item)=>{
                    item.status_disposisi = (item.disposisis) ? true : false
                  
                    return item
                })
                
                return res.data
            })
			
            
    }

    getAgenda()
    {
        return axios({
            method: 'get',
                url: useStore().parseApi('/suratmasuk/agendano'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                return res.data
        })
    }

    
}
