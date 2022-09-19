import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        name: "Home",
        path: "/",
        component: () => import("../views/Home/Home.vue"),
        meta: { title: "Part | Helium Plus" }
    },
    {
        name: "Single",
        path: "/single",
        params: ['articleId'],
        component: () => import("../views/Single/Single.vue"),
        meta: { title: "Part | Single" }
    },
    {
        name: "Register1",
        path: "/login",
        component: () => import("../views/Register1/Register1.vue"),
        meta: { title: "Part | Login" }
    },
    {
        name: "Register2",
        path: "/signup",
        params: ['phone'],
        component: () => import("../views/Register2/Register2.vue"),
        meta: { title: "Part | Signup " }
    },
    {
        name: "Register3",
        path: "/signup2",
        params: ['phone', 'name', 'email'],
        component: () => import("../views/Register3/Register3.vue"),
        meta: { title: "Part | Signup " }
    },
    {
        name: "ResterDone",
        path: "/registerdone",
        params: ['phone'],
        component: () => import("../views/RegisterDone/RegisterDone.vue"),
        meta: { title: "Part | RegisterDone " }
    },
    {
        name: "LoginPanel",
        path: "/login-panel",
        params: ['phone'],
        component: () => import("../views/Login/Login.vue"),
        meta: { title: "Part | panel " }
    },
    {
        name: "StoryWriting",
        path: "/storywriting",
        component: () => import("../views/StoryWriting/StoryWriting.vue"),
        meta: { title: "Part | Storywriting " }
    }, {
        name: "profile",
        path: "/profile",
        params: ['authorId', 'authorFirstName', 'authorLastName', 'authorUsername', 'authorImg'],
        component: () => import("../views/profile/profile.vue"),
        meta: { title: "Part | Profile " }
    }, {
        name: "HomePage",
        path: "/home",
        component: () => import("../views/HomePage/HomePage.vue"),
        meta: { title: "Part | HomePage " }
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.afterEach((to) => {
    const title = to.meta?.title
    if (!title) return

    document.title = title
})

export default router