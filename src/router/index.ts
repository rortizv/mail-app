import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TabletView from '../views/TabletView.vue';

function getInitialComponent() {
  if (window.matchMedia('(min-width: 768px)').matches) {
    return TabletView;
  } else {
    return HomePage;
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'DefaultView',
    component: getInitialComponent(),
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/tablet',
    name: 'Tablet',
    component: TabletView
  },
  {
    path: '/message/:id',
    name: 'view-message',
    component: () => import('../views/ViewMessagePage.vue')
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;