<template>
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div  class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="getMenuModel()" @menuitem-click="onMenuItemClick" />
        </div>

        <div v-if="isLogin" class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
           
            <AppFooter />
        </div>
        <div v-else>
            <router-view />
            <AppFooter />
        </div>

        

		<!-- <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" /> -->
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import {useStore} from './store.js';

export default {
    emits: ['change-theme'],
    data() {
        return {
            store: useStore(),
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Home',
                    items: [{
                        label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard'
                    },
                    
                     ]
                },
				{
					label: 'Admin', 
                    role: 'Admin',
					items: [
						{label: 'Data User', icon: 'pi pi-fw pi-user', to: '/data-user'},

                        ]
                },
                {   label: 'ARSIP',
                    items: [
                        {label:'Kategori +',icon:'pi pi-fw pi-folder',
                          items: [ {label:'Kategori Surat',icon:'pi pi-fw pi-folder', to: '/categories'},
                                    {label:'Tipe No Surat',icon:'pi pi-fw pi-folder', to: '/tipesurats'}, 
                                    ],
                        },
                        {label: 'Data Pegawai', icon: 'pi pi-fw pi-users', to: '/data-pegawai'},
                        {label: "Dokumen Internal", icon: "pi pi-fw pi-folder", to: "/dokument-internal"},
                        {label: "Dokumen Eksternal", icon: "pi pi-fw pi-folder-open", to: "/dokument-eksternal"},
                        {label: 'Surat Masuk', icon: 'pi pi-fw pi-envelope', to: '/surat-masuk'},
                        {label: 'Surat Keluar', icon: 'pi pi-fw pi-briefcase', to: '/surat-keluar'},
                        {label: 'Distribusi', icon: 'pi pi-fw pi-folder', to: '/distribusi'},
                        ]
                },
                {   label: 'AKUN',
                    items: [

                        (useStore().isLoggedIn()) ? {label: 'Logout', icon: 'pi pi-fw pi-sign-out', to: '/logout'} : {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
                       
                        ]
                },
    //             {   label: 'ADJK',
    //                 items: [
				// 		{label: 'Input', icon: 'pi pi-fw pi-users', to: '/input'},
    //                     {label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel"},
    //                     {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "/invalidstate"},
				// 		{label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button'},
				// 		{label: 'Table', icon: 'pi pi-fw pi-table', to: '/table'},
				// 		{label: 'List', icon: 'pi pi-fw pi-list', to: '/list'},
				// 		{label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree'},
				// 		{label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel'},
				// 		{label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay'},
    //                     {label: "Media", icon: "pi pi-fw pi-image", to: "/media"},
				// 		{label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu'},
				// 		{label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages'},
				// 		{label: 'File', icon: 'pi pi-fw pi-file', to: '/file'},
				// 		{label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart'},
				// 		{label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc'},
				// 	]
				// },
    //             {
    //                 label: 'PrimeBlocks',
    //                 items: [
    //                     {label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: "NEW"},
    //                     {label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank'}
    //                 ]
    //             },
    //             {
    //                 label: 'Utilities',
    //                 items: [
    //                     {label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons'},
    //                     {label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank'},
    //                 ]
    //             },
				// {
				// 	label: 'Pages', icon: 'pi pi-fw pi-clone',
				// 	items: [
				// 		{label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud'},
				// 		{label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline'},
    //                     {label: 'Landing', icon: 'pi pi-fw pi-globe', to: '/landing'},
    //                     {label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
    //                     {label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error'},
    //                     {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound'},
    //                     {label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access'},
				// 		{label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'},
				// 	]
				// },
    //             {
    //                 label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
    //                 items: [
    //                     {
    //                         label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
    //                                 items: [
    //                                     {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
    //                                 ]
    //                             },
    //                             {
    //                                 label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
    //                                 items: [
    //                                     {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
    //                                 ]
    //                             },
    //                         ]
    //                     },
    //                     {
    //                         label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
    //                         items: [
    //                             {
    //                                 label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
    //                                 items: [
    //                                     {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
    //                                 ]
    //                             },
    //                             {
    //                                 label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
    //                                 items: [
    //                                     {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
    //                                     {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
    //                                 ]
    //                             }
    //                         ]
    //                     }
    //                 ]
    //             },
    //             {
    //                 label: 'Get Started', 
    //                 items: [
    //                     {label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {window.location = "#/documentation"}},
    //                     {label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {window.location = "https://github.com/primefaces/sakai-vue"}}
    //                 ]
    //             }
            ]
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        getMenuModel(){
            // if login true -> if role admin => all else only not role admin
            return this.store.isLoggedIn() ? this.menu.filter((val)=>{
                if (this.store.login.data.role == 'Admin') return true;
                else return (val.role == undefined || val.role != 'Admin')
            }) : this.menu.filter((val)=>{
                    return (val.role == undefined || val.role != 'Admin')
                })

            
        },
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
    computed: {
        isLogin: () => useStore().isLoggedIn(),
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "/images/logo-white.svg" : "/images/logo.svg";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
