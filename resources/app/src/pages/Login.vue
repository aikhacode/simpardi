<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <!-- <img :src="'/images/logo-sipardi.png'" alt="logo sipardi" class="mb-5" style="width:35px; height:auto;"> -->
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5">
                        <img src="/images/logo-sipardi.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">Selamat Datang..</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>
                
                    <div class="w-full md:w-10 mx-auto">
                        <label for="nama" class="block text-900 text-xl font-medium mb-2">Nama</label>
                        <Dropdown @change="onChangeUser" class="w-full mb-3 h-49" v-model="selectedUser" :options="users" optionLabel="name" :filter="true" placeholder="Pilih user" :showClear="true">
                            <template #value="slotProps">
                                <div class="country-item country-item-value" v-if="slotProps.value">
                                    
                                    <div>{{slotProps.value.name}}</div>
                                </div>
                                <span v-else>
                                    {{slotProps.placeholder}}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="country-item">
                                    
                                    <div>{{slotProps.option.name}}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email" style="padding:1rem;" />
                
                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <!-- <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div> -->
                        <Button @click="login()" label="Sign In" class="w-full p-3 text-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from '@/store.js'
import { useRouter } from 'vue-router'
import Service from "@/service/UserService"

export default {

    data() {
        return {
            users:[],
            selectedUser:{},
            email: 'test@sipardi.ujung',
            password: '12345',
            checked: true,
            store: useStore(),
            router: useRouter(),
        }
    },
    UserService:null,
    created() {
        this.UserService = Service
        // console.log(this.store.parseApi())
    },
    mounted(){
        this.UserService.getUsers().then((res)=>{
            console.log('user res',res)
            this.users = res.map((item)=>{
                return {
                    name:item.username,
                    value:item.username,
                    email:item.email,
                }
            })

            console.log('user',this.users)

        })
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    },
    methods:{
        async login(){
           if (await this.store.doLogin({
            email:this.email,
            password:this.password
           })) {
              
               this.router.push('/dashboard') 
           } 
        },
        onChangeUser(){
            console.log(this.selectedUser)
            this.email = this.selectedUser.email
            this.password=''
        },
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}

.h-49{
    height: 49px;
}
</style>