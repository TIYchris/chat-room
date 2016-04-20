import api from 'api/api';

api.new('https://fierce-stream-5433.herokuapp.com/api/');
// api.new('http://10.68.0.26:8000/api/');

export function login(user, pass) {
  return api.login(user, pass);
}

export function getUsers() {
  return api.get('users/users/');
}
