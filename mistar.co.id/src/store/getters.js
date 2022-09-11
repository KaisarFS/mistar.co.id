const getters = {
  // App Modules
  g_language: state => state.app.language,
  g_version: state => state.app.app_version,
  g_snackbar: state => state.app.snackbar,
  g_full_loading: state => state.app.full_loading,
  // Permission Modules
  g_route_async: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  // User Modules
  g_roles: state => state.user.roles,
  g_token: state => state.user.token,
  g_modal_school_address: state => state.user.modal_school_address,
  g_user: state => state.user.user,
  g_school: state => state.user.school
};

export default getters;
