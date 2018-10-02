declare module "@environment" {

  const env: {
    domain: string
    tenant: string
    loginUrl: string
    baseUrl: {
      "epassport": string
      "system-configuration": string
    }
  }

  export default env
}
