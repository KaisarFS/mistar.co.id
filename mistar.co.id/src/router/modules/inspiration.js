import Admin from "@/views/layout/admin";

const Inspiration = {
  path: "/inspiration",
  component: Admin,
  alwaysShow: true,
  meta: {
    title: "routes.cms",
    icon: "sidebar-icon-master-data.svg",
    roles: [4]
  },
  children: [
    {
      name: "Article",
      path: "article",
      component: () => import("@/views/admin/inspiration/Article"),
      meta: { roles: [4], title: "routes.article" },

    },
    {
      name: "Podcast",
      path: "podcast",
      component: () => import("@/views/admin/inspiration/Podcast"),
      meta: { roles: [4], title: "routes.podcast" }
    },
    {
      name: "Video",
      path: "video",
      component: () => import("@/views/admin/inspiration/Video"),
      meta: { roles: [4], title: "routes.video" }
    },
    {
      name: "E-book",
      path: "ebook",
      component: () => import("@/views/admin/inspiration/E-book"),
      meta: { roles: [4], title: "routes.ebook" }
    }
  ]
};

export default Inspiration;
