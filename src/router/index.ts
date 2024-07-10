import { createRouter, createWebHashHistory } from 'vue-router';
// import Login from '@/views/login/components/login-form.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: () => import('@/components/layout/default-layout.vue'),
    children: [
      {
        path: 'Log',
        name: 'Log',
        component: () => import('@/views/securitylog/index.vue'),
      },
      {
        path: 'Rule',
        name: 'Rule',
        children: [
          {
            path: 'RuleSet',
            name: 'RuleSet',
            component: () => import('@/views/rule/ruleset/index.vue'),
          },
          {
            path: 'RuleManage',
            name: 'RuleManage',
            component: () => import('@/views/rule/index.vue'),
          },
        ],
      },
      {
        path: 'Event',
        name: 'Event',
        component: () => import('@/views/event/index.vue'),
      },
      {
        path: 'system',
        name: 'user',
        children: [
          {
            path: 'users',
            name: 'users',
            component: () => import('@/views/users/index.vue'),
          },
          {
            path: 'roles',
            name: 'roles',
            component: () => import('@/views/roles/index.vue'),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
