var config = { };

// should end in /
config.rootUrl  = process.env.ROOT_URL                  || 'http://localhost:8000/';

config.facebook = {
    appId:          process.env.FACEBOOK_APPID          || '824373247647109',
    appSecret:      process.env.FACEBOOK_APPSECRET      || '794f702c33aa1dbf0305d81a0d8e48b8',
    appNamespace:   process.env.FACEBOOK_APPNAMESPACE   || 'uclbbcast',
    redirectUri:    process.env.FACEBOOK_REDIRECTURI    ||  config.rootUrl + 'login/callback'
};

module.exports = config;
