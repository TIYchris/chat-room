import axios from 'axios';
import Cookie from 'js-cookie';

// 'api-token-auth':"Authorization: Token ${token}";
var instance = axios.create();

instance.new = function (url) {
  this.defaults.baseURL = url;
  // this.defaults.headers = {'Content-Type' : 'application/x-www-form-urlencoded'};
};

if (Cookie.get('token')) {
  var token = Cookie.get('token');
  instance.interceptors.request.use(function(config){
    config.headers['Authorization'] = 'Token ' + token;
    return config;
  });
}

instance.login = function(user, pass) {
  return this.post('api-token-auth/', {username: user, password:pass})
    .then(function(resp){
      var token = resp.data.token;
      Cookie.set('token', token);
      this.interceptors.request.use(function(config){
        config.headers['Authorization'] = 'Token ' + token;
        return config;
      })
    }.bind(this))
};

instance.interceptors.request.use(function(config){
  return config;
});

export default instance;
