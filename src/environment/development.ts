export default {
  domain: (window as any).CCMS_INFOS_CONFIG.UAL,
  tenant: (window as any).CCMS_INFOS_CONFIG.TENANT,
  loginUrl: "/login.html",
  baseUrl: {
    'epassport': "/epassport/v1",
    'system-configuration': '/system-configuration/v1'
  }
}