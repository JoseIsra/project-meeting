const routes = [
  {
    path: "/",
    name: "lobby",
    component: () => import("pages/Index.vue"),
  },
  {
    path: "/meet",
    name: "meet",
    component: () => import("components/EssentialLink.vue"),
  },
  {
    path: "/friend",
    name: "friend",
    component: () => import("components/Test.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
