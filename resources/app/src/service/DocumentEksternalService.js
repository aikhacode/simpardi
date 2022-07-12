import {useStore} from '@/store.js'
import axios from 'axios';



export default class Service {
    getDocuments() {
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/document/eksternal'),
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
