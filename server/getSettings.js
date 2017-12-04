const defaults = {
    port: 8080,
    // Used to sign the session cookie
    // sessionSecret: 'development-secret',
    // All four settings below need to match ones configured in SSO
    // publicUrl: 'http://localhost:8080',
    // helsinkiAuthId: 'this-is-mock',
    // helsinkiAuthSecret: 'this-is-mock',
    // helsinkiTargetApp: 'linkedevents-ui',
}

const configKeys = ["port", "publicUrl", "helsinkiAuthId", "helsinkiAuthSecret", "helsinkiTargetApp", "sessionSecret"];

export default function getOptions() {
    let nconf = require('nconf');
    // We do not want the singleton, as webpack conf also uses nconf
    // with its own defaults
    nconf = new nconf.Provider();

    nconf.env(configKeys)
    if(process.env.NODE_ENV == 'development') {
        nconf.file({file: 'config_dev.json'})
    }
    nconf.defaults(defaults);

    nconf.required(configKeys)

    return nconf.get()
}
