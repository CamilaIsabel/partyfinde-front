import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6cf07a48 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _be96192a = () => interopDefault(import('..\\pages\\magic-link\\index.vue' /* webpackChunkName: "pages/magic-link/index" */))
const _cbc581fe = () => interopDefault(import('..\\pages\\paymentfailure\\index.vue' /* webpackChunkName: "pages/paymentfailure/index" */))
const _a5f2ca30 = () => interopDefault(import('..\\pages\\paymentsuccess\\index.vue' /* webpackChunkName: "pages/paymentsuccess/index" */))
const _d700f264 = () => interopDefault(import('..\\pages\\privacy-policy\\index.vue' /* webpackChunkName: "pages/privacy-policy/index" */))
const _1eeee2a6 = () => interopDefault(import('..\\pages\\profile\\index.vue' /* webpackChunkName: "pages/profile/index" */))
const _1ef404b0 = () => interopDefault(import('..\\pages\\profile\\index\\edit.vue' /* webpackChunkName: "pages/profile/index/edit" */))
const _295fac02 = () => interopDefault(import('..\\pages\\register\\index.vue' /* webpackChunkName: "pages/register/index" */))
const _79fb8240 = () => interopDefault(import('..\\pages\\register\\index\\index.vue' /* webpackChunkName: "pages/register/index/index" */))
const _5ede7630 = () => interopDefault(import('..\\pages\\register\\index\\details.vue' /* webpackChunkName: "pages/register/index/details" */))
const _5b0a3891 = () => interopDefault(import('..\\pages\\register\\index\\upload-your-photos.vue' /* webpackChunkName: "pages/register/index/upload-your-photos" */))
const _f493b968 = () => interopDefault(import('..\\pages\\reset-password\\index.vue' /* webpackChunkName: "pages/reset-password/index" */))
const _4c3d11d4 = () => interopDefault(import('..\\pages\\profile\\change-password\\index.vue' /* webpackChunkName: "pages/profile/change-password/index" */))
const _0874d86e = () => interopDefault(import('..\\pages\\list\\_type.vue' /* webpackChunkName: "pages/list/_type" */))
const _47453974 = () => interopDefault(import('..\\pages\\list\\_type\\stories\\_storyId.vue' /* webpackChunkName: "pages/list/_type/stories/_storyId" */))
const _0a96cbbc = () => interopDefault(import('..\\pages\\list\\_type\\_id.vue' /* webpackChunkName: "pages/list/_type/_id" */))
const _3ca3cdae = () => interopDefault(import('..\\pages\\list\\_type\\_id.vue\\index.vue' /* webpackChunkName: "pages/list/_type/_id.vue/index" */))
const _72210765 = () => interopDefault(import('..\\pages\\magic-link\\_magic.vue' /* webpackChunkName: "pages/magic-link/_magic" */))
const _003fc076 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _6cf07a48,
    name: "login"
  }, {
    path: "/magic-link",
    component: _be96192a,
    name: "magic-link"
  }, {
    path: "/paymentfailure",
    component: _cbc581fe,
    name: "paymentfailure"
  }, {
    path: "/paymentsuccess",
    component: _a5f2ca30,
    name: "paymentsuccess"
  }, {
    path: "/privacy-policy",
    component: _d700f264,
    name: "privacy-policy"
  }, {
    path: "/profile",
    component: _1eeee2a6,
    name: "profile",
    children: [{
      path: "edit",
      component: _1ef404b0,
      name: "profile-index-edit"
    }]
  }, {
    path: "/register",
    component: _295fac02,
    children: [{
      path: "",
      component: _79fb8240,
      name: "register-index"
    }, {
      path: "details",
      component: _5ede7630,
      name: "register-index-details"
    }, {
      path: "upload-your-photos",
      component: _5b0a3891,
      name: "register-index-upload-your-photos"
    }]
  }, {
    path: "/reset-password",
    component: _f493b968,
    name: "reset-password"
  }, {
    path: "/profile/change-password",
    component: _4c3d11d4,
    name: "profile-change-password"
  }, {
    path: "/list/:type?",
    component: _0874d86e,
    name: "list-type",
    children: [{
      path: "stories/:storyId?",
      component: _47453974,
      name: "list-type-stories-storyId"
    }, {
      path: ":id?",
      component: _0a96cbbc,
      name: "list-type-id"
    }, {
      path: ":id.vue",
      component: _3ca3cdae,
      name: "list-type-id.vue"
    }]
  }, {
    path: "/magic-link/:magic?",
    component: _72210765,
    name: "magic-link-magic"
  }, {
    path: "/",
    component: _003fc076,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
