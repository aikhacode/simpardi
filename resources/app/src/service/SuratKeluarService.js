import {useStore} from '@/store.js'
import axios from 'axios';



export default class Service {
    getSurats() {
        const store = useStore()

        return axios({
            method: 'get',
                url: useStore().parseApi('/suratkeluar'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/suratkeluar"))
                return res.data
            })
			
            
    }

    
}
