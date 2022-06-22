import { defineStore } from 'pinia'
import axios from 'axios'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
// login api get data : {
//           role: String .....
//}
export const useStore = defineStore('main', {
  state:() => {
    return {
        authenticated: false,
        login: {
          userName: '',
          password: '',
          data:{
            role:'Admin'
          }
        },
        pegawai:{
          count:0,
        },
        document:{
          internal:{
            count:0,

          },
          external:{
            count:0,

          }
        },
        mail:{
          inbox:{
            count:0,
          },
          outbox:{
            count:0
          }
        }
    }
  },
  actions:{
    isLoggedIn(){
       return this.authenticated
    },
    doLogin(){
      // let res = await axios.get('')
      this.authenticated = true
      return this.authenticated
    },
    doLogout(){
      // let res = await axios.get('')
      this.authenticated = false
      return !this.authenticated
    }


  }
})