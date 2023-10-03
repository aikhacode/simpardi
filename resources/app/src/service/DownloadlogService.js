import {useStore} from '@/store.js'
import axios from 'axios';



export default class Service {
   
    getDownloads() {
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/logdls'),
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
