// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
  production: false,
};


export const Config = {
  TOKEN_ENDPOINT: 'http://schedulerdevservice.genems.com/',
  CLIENT_ID: '7974a6b7-b3f4-47e9-9b4f-e6b5a81d3b04',
  ID_TOKEN: 'id_token',
  GRANT_TYPE: 'password',
  SCOPE: '',
  REVOCATION_ENDPOINT: '',
  CLIENT_SECRET: 'test',
  REFRESH_TOKEN: 'refresh_token'
};

export const Api = {
  base_url: 'http://schedulerdevservice.genems.com/',
  insurance_base_url: 'https://testhlp.genems.com/'
};
export const App = {
  base_url: 'http://schedulerdev.genems.com/',
};