import { defineStore } from "pinia";
import axios from "axios";
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
// login api get data : {
//           role: String .....
//}
export const useStore = defineStore("main", {
    state: () => {
        return {
            authenticated: false,
            currentPickDocumentInternal: {},
            userCurrentLoginName:'',
            token: "",
            login: {
                userName: "",
                password: "",
                data: {
                    role: "Admin",
                },

            },
            pegawai: {
                count: 0,
                data:[],
            },
            document: {
                internal: {
                    count: 0,
                    data:[]
                },
                external: {
                    count: 0,
                    data:[]
                },
            },
            mail: {
                inbox: {
                    count: 0,
                    data:[]
                },
                outbox: {
                    count: 0,
                    data:[]
                },
            },
            arsipsTemp:[],
           
        };
    },
    actions: {
        isAdmin(){
            return this.login.data.role == 'Admin'
        },
        isNotAdmin(){
            return this.login.data.role != 'Admin'
        },
        isLoggedIn() {
            return this.authenticated;
        },
        async getElementCount(element,elementVar){
              let api = this.parseApi();
            let headersList = {
                "Accept": "application/json",
                // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": `Bearer ${this.token}` 
               }
            let reqOptions = {
                url: this.parseApi()+element,
                method: "GET",
                headers: headersList,
              }
              
            try {
                let res = await axios.request(reqOptions)
                // console.log(res.data);
                elementVar.count = res.data.length
                
                return {
                    
                    count: res.data.length
                }
            } catch (err) {
                console.log(err.response.status);
                return false
            }
        },
        async getPegawai(){
            let api = this.parseApi();
            let headersList = {
                "Accept": "application/json",
                // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Authorization": `Bearer ${this.token}` 
               }
            let reqOptions = {
                url: this.parseApi()+'/pegawai',
                method: "GET",
                headers: headersList,
              }
              
            try {
                let res = await axios.request(reqOptions)
                // console.log(res.data);
                this.pegawai.count = res.data.length
                this.pegawai.data = res.data
                return {
                    data: res.data,
                    count: res.data.length
                }
            } catch (err) {
                console.log(err.response.status);
                return false
            }

            
        },
        async doLogin(obj) {
            let api = this.parseApi();
            try {
                let res = await axios.post(api + "/login", {
                    email: obj.email,
                    password: obj.password,
                });
                console.log(res.data);
                this.authenticated = true;
                this.token = res.data.token;
                 this.login.userName = res.data.user.name;
                this.login.email = res.data.user.email;
                this.login.userId = res.data.user.id;
                this.login.data.role = res.data.user.role;
                this.userCurrentLoginName = res.data.user.name;
            } catch (err) {
                console.log(err.response.status);
                this.authenticated = false;
            }

            return this.authenticated;
        },
        async doLogout() {
            // let res = await axios.get('')
            let api = this.parseApi();
            try {
             
                let headersList = {
                  "Accept": "application/json",
                  // "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                  "Authorization": `Bearer ${this.token}` 
                 }
                 
                 let reqOptions = {
                   url: this.parseApi()+'/logout',
                   method: "POST",
                   headers: headersList,
                 }
                 
                 let res = await axios.request(reqOptions)

                this.token = "";
                this.authenticated = false;
            } catch (err) {}

            return !this.authenticated;
        },
        parseApi(namespace='') {
            return `${location.protocol}//${location.hostname}/api${namespace}`;
        },
        get_authenticated_headers(){
            return {
              
                  "Accept": "application/json",
                  "Authorization": `Bearer ${this.token}` 
                }
        }

    },
});
