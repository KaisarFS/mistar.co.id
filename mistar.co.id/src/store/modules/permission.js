import { asyncRoute, constantRoute } from "@/router";

function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

function filterAsyncRouter(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRoute.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;

        if (roles) {
          accessedRouters = filterAsyncRouter(asyncRoute, roles);
        }

        if (accessedRouters.length < 1) {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", "");
        } else {
          commit("SET_ROUTERS", accessedRouters);
        }
        resolve();
      });
    }
  }
};

export default permission;
