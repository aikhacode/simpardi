import {useStore} from '@/store.js'
import axios from 'axios';
import {parseApi} from "@/helper"


export default class Service {
    getSurats() {
        const store = useStore()

        return axios({
            method: 'get',
                url: parseApi('/suratkeluar'),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then((res) => {
                // store.mail.outbox.data = res.data
                // console.log(res.data,store.parseApi("/suratkeluar"))
                return res.data
            })
			
            
    }

     getAgenda()
    {
        return axios({
            method: 'get',
                url: parseApi('/suratkeluar/agendano'),
                // headers:{
                //     "Authorization": `Bearer ${useStore().token}` 
                // }
        }).then((res) => {
                return res.data
        })
    }

    
}
