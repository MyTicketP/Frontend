import Vue from 'vue'
import Router from 'vue-router';
import MenuBar from '../components/main/MenuBar.vue';
import Welcome from '../components/modules/Welcome.vue';
import Home from '../components/modules/Home.vue';
import Company from '../components/modules/Company.vue';
import Project from '../components/modules/Project.vue';
import Story from '../components/modules/Story.vue';
import Ticket from '../components/modules/Ticket.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '*', redirect: '/welcome'},
        { path: '/', redirect: '/welcome'},
        { path: '/welcome', name: 'welcome', component: Welcome},
        { path: '/home', name: 'home', component: Home},
        { path: '/company', name: 'company', component: Company},
        { path: '/project', name: 'project', component: Project},
        { path: '/story', name: 'story', component: Story},
        { path: '/ticket', name: 'ticket', component: Ticket},
        { path:'/main', name:'main', component: MenuBar}
      ]
})