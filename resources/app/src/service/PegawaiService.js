import {useStore} from '@/store.js'
import axios from 'axios';
import {parseApi,parseWeb} from "@/helper.js"

export default class PegawaiService {

    getPegawai(id) {
		return axios({
            method: 'GET',
                url: parseApi('/pegawai/'+id),
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data);
	}

	savePegawai(peg){
		return axios({
            method: 'PUT',
                url: parseApi('/pegawai/'+peg.id),
                data: peg,
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data);	
	}

	deletePegawai(peg){
		return axios({
            method: 'DELETE',
                url: parseApi('/pegawai/'+peg.id),
                data: peg,
                headers:{
                    "Authorization": `Bearer ${useStore().token}` 
                }
        }).then(res => res.data);	
	}
	
}