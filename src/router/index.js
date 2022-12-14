/*
 * @Date: 2022-06-08 08:55:57
 * @LastEditors: shen-xu
 * @LastEditTime: 2022-11-17 10:43:02
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/login";
import Layout from "@/views/layout";
import backlog from '@/views/backlog/index.vue'
import bank from '@/views/bank/index.vue'
import futuresmarket from '@/views/futuresmarket/index.vue'
import shareoptionmarket from '@/views/shareoptionmarket/index.vue'
import bankaccount from '@/views/bankaccount/index.vue'
import bankfacilities from '@/views/bankfacilities/index.vue'
import gtsstatistics from '@/views/gtsstatistics/index.vue'
import financialsupport from '@/views/Financialsupport/index.vue'
import gtssubaccountcloseout from '@/views/gtssubaccountcloseout/index.vue'
import gtssubaccountfloat from '@/views/gtssubaccountfloat/index.vue'
import gtssubaccountsplit from '@/views/gtssubaccountsplit/index.vue'
import gtsstatisticsshareoptions from '@/views/gtsstatisticsshareoptions/index.vue'
import adduser from '@/views/adduser/index.vue'
import addusers from '@/views/addusers/index.vue'
import windContractprice from '@/views/windcontractprice/index.vue'
import regulator from '@/views/regulator/index.vue'
import MenuList from '@/views/menuList/index.vue'
import page404 from '@/views/page404/index.vue';
import NProgress from 'nprogress'
Vue.use(VueRouter);
const routes = [
  { path: '/', redirect: '/Login' },
  { path: '/login', component: Login },
  {
    path: '/Layout', component: Layout, redirect: '/backlog',
    children: [
      { path: '/backlog', name: 'Backlog', component: backlog, meta: { keepAlive: true }, component: () => import('@/views/backlog/index.vue') },
      { path: '/bank', name: 'Bank', component: bank, meta: { keepAlive: true }, component: () => import('@/views/bank/index.vue') },
      { path: '/futuresmarket', name: 'Futuresmarket', component: futuresmarket, meta: { keepAlive: true }, component: () => import('@/views/futuresmarket/index.vue') },
      { path: '/shareoptionmarket', name: 'Shareoptionmarket', component: shareoptionmarket, meta: { keepAlive: true }, component: () => import('@/views/shareoptionmarket/index.vue') },
      { path: '/bankaccount', name: 'Bankaccount', component: bankaccount, meta: { keepAlive: true }, component: () => import('@/views/bankaccount/index.vue') },
      { path: '/bankfacilities', name: 'Bankfacilities', component: bankfacilities, meta: { keepAlive: true }, component: () => import('@/views/bankfacilities/index.vue') },
      { path: '/gtsstatistics', name: 'Gtsstatistics', component: gtsstatistics, meta: { keepAlive: true }, component: () => import('@/views/gtsstatistics/index.vue') },
      { path: '/financialsupport', name: 'Financialsupport', component: financialsupport, meta: { keepAlive: true }, component: () => import('@/views/Financialsupport/index.vue') },
      { path: '/gtssubaccountcloseout', name: "Gtssubaccountcloseout", component: gtssubaccountcloseout, meta: { keepAlive: true }, component: () => import('@/views/gtssubaccountcloseout/index.vue') },
      { path: '/gtssubaccountfloat', name: "Gtssubaccountfloat", component: gtssubaccountfloat, meta: { keepAlive: true }, component: () => import('@/views/gtssubaccountfloat/index.vue') },
      { path: '/gtssubaccountsplit', name: "Gtssubaccountsplit", component: gtssubaccountsplit, meta: { keepAlive: true }, component: () => import('@/views/gtssubaccountsplit/index.vue') },
      { path: '/gtsstatisticsshareoptions', name: "Gtsstatisticsshareoptions", component: gtsstatisticsshareoptions, meta: { keepAlive: true }, component: () => import('@/views/gtsstatisticsshareoptions/index.vue') },
      { path: '/adduser', name: 'AddUser', component: adduser, meta: { keepAlive: true }, component: () => import('@/views/adduser/index.vue') },
      { path: '/addusers', name: 'AddUsers', component: addusers, meta: { keepAlive: true }, component: () => import('@/views/addusers/index.vue') },
      { path: '/windcontractprice', name: 'WindContractprice', component: windContractprice, meta: { keepAlive: true }, component: () => import('@/views/windcontractprice/index.vue') },
      { path: '/regulator', name: 'Regulator', component: regulator, meta: { keepAlive: true }, component: () => import('@/views/regulator/index.vue') },
      { path: '/menuList', name: 'MenuList', component: MenuList, meta: { keepAlive: true }, component: () => import('@/views/menuList/index.vue') },
      { path: '*', name: 'Page404', component: page404, meta: { keepAlive: true }, component: () => import('@/views/page404/index.vue') },
    ]
  },
]
const router = new VueRouter({
  routes,
});
/* NProgress.configure({ showSpinner: false })
//?????????????????????NProgress.start()????????????????????????
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
}); */
//?????????????????????NProgress.done()???????????????
/* router.afterEach(() => {
  NProgress.done()
}) */
/* router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tockenstr = window.localStorage.getItem('token')
  if (!tockenstr) return next('/login')
  next()
}) */
/* router.beforeEach((to, from, next) => {
  // to ????????????????????????
  // from ?????????????????????????????????
  // next ???????????????,????????????
  //   next() ?????? next('/login') ????????????
  if (to.path === '/backlog') return next()
  // ??????token
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
}) */
export default router;
