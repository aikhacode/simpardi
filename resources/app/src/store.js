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
            },
            document: {
                internal: {
                    count: 0,
                },
                external: {
                    count: 0,
                },
            },
            mail: {
                inbox: {
                    count: 0,
                },
                outbox: {
                    count: 0,
                },
            },
        };
    },
    actions: {
        isLoggedIn() {
            return this.authenticated;
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
        parseApi() {
            return `${location.protocol}//${location.hostname}/api`;
        },
    },
});
