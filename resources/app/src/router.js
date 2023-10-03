import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { useStore } from "./store.js";
import SuratKeluar from "./pages/SuratKeluar.vue"
import SuratMasuk from "./pages/SuratMasuk.vue"
import DokumentInternal from "./pages/DokumentInternal.vue"
import DokumentEksternal from "./pages/DokumentEksternal.vue"
import DataPegawai from "@/pages/DataPegawai.vue"
// import Pegawai from "@/pages/Pegawai.vue"

const routes = [
    {
        path: "/",
        name: "app",
        component: App,
        children: [
            {
                path: "",
                name: "hero",
                component: () => import("./pages/Hero.vue"),
            },
            {
                path: "/dashboard",
                name: "dashboard",
                component: () => import("./components/Dashboard.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/distribusi",
                name: "distribusi",
                component: () => import("./pages/Distribusi.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/data-user",
                name: "datauser",
                component: () => import("./pages/DataUser.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "/data-pegawai",
                name: "datapegawai",
                // component: () => import("./pages/DataPegawai.vue"),
                component: DataPegawai,
                meta: { requiresAuth: true },
            },
            {
                path: "/pegawai/:id",
                name: "datapegawaiedit",
                component: () => import("./pages/Pegawai.vue"),
                props: true,
                meta: { requiresAuth: true },
            },
             {
                path: "/categories",
                name: "categories",
                component: () => import("./pages/Category.vue"),
                // props: true,
                meta: { requiresAuth: true },
            },
            {
                path: "/tipesurats",
                name: "tipesurats",
                component: () => import("./pages/TipeSurat.vue"),
                // props: true,
                meta: { requiresAuth: true },
            },
            {
                path: "/categories/:id",
                name: "categoriesedit",
                component: () => import("./pages/CategoryEdit.vue"),
                props: true,
                meta: { requiresAuth: true },
            },
            {
                path: "/view-upload",
                name: "previewupload",
                component: () => import("./pages/PreviewUploads.vue"),
                // component: DokumentInternal,
                meta: { requiresAuth: true },
            },
            {
                path: "/dokument-internal",
                name: "dokumentinternal",
                // component: () => import("./pages/DokumentInternal.vue"),
                component: DokumentInternal,
                meta: { requiresAuth: true },
            },
            {
                path: "/dokument-eksternal",
                name: "dokumenteksternal",
                // component: () => import("./pages/DokumentEksternal.vue"),
                component: DokumentEksternal,
                meta: { requiresAuth: true },
            },
            {
                path: "/surat-masuk",
                name: "suratmasuk",
                // component: () => import("./pages/SuratMasuk.vue"),
                component: SuratMasuk,
                meta: { requiresAuth: true },
            },
            {
                path: "/surat-keluar",
                name: "suratkeluar",
                // component: () => import("./pages/SuratKeluar.vue"),
                component: SuratKeluar,
                meta: { requiresAuth: true },
                
            },
            // {
            //     path:'/input-surat-keluar',
            //     name:'inputsuratkeluar',
            //     component: () => import("./pages/InputSuratKeluar.vue"),
            // }
           

        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./pages/Login.vue"),
    },
    {
        path: "/logout",
        name: "logout",
        component: () => import("./pages/Logout.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const auth = useStore();

    
    // if (location.hostname != 'simpardi.test')
    if (to.meta.requiresAuth && !auth.isLoggedIn()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: "/login",
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        };
    }
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    next();
});

export default router;
