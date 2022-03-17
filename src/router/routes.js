const routes = [
  {
    path: "/",
    name: "lobby",
    component: () => import("components/FuJitsi"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
