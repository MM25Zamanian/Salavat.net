export interface Route {
  path: string;
  name: string;
  icon: string;
  label: string;
  component: string;
  show_in_nav: boolean;
  action: () => Promise<void>;
}

/* sparkles-outline */

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    icon: 'home-outline',
    label: 'خانه',
    component: 'page-home',
    show_in_nav: true,
    action: async () => {
      await import('../pages/page-home.js');
    },
  },
  {
    path: '/campigan',
    name: 'campigan',
    icon: 'sparkles-outline',
    label: 'صلوات شمار',
    show_in_nav: true,
    component: 'page-counter',
    action: async () => {
      await import('../pages/page-counter.js');
    },
  },
  {
    path: '/about',
    name: 'about',
    icon: 'information-circle-outline',
    label: 'درباره ما',
    show_in_nav: true,
    component: 'page-about',
    action: async () => {
      await import('../pages/page-about.js');
    },
  },
  {
    path: '(.*)',
    name: 'not-found',
    icon: 'alert-outline',
    label: 'یافت نشد',
    show_in_nav: false,
    component: 'page-not-found',
    action: async () => {
      await import('../pages/page-not-found.js');
    },
  },
];
