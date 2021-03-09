import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null
    },
    getters: {
        isAuthenticated(state) {
            return state.token !== null && state.token !== undefined;
        },
    },
    mutations: {
        saveToken(state, token) {
            state.token = token;
        },
        saveUser(state, user) {
            state.user = user;
        },
        logout(state) {
            return new Promise((resolve, reject) => {
                axios.post('/api/logout', {},
                    {
                        headers: { 'Authorization': 'Bearer ' + state.token }
                    })
                    .then(response => {
                        localStorage.clear()
                        state.token = null;
                        state.user = null;
                        resolve(response);
                    })
                    .catch(error => {
                        localStorage.clear();
                        state.token = null;
                        state.user = null;
                        reject(error);
                    });
            })
        }
    },
    actions: {
        login(state, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                    email: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    const token = response.data.access_token;
                    localStorage.setItem('access_token', token);
                    state.commit('saveToken', token);
                    axios.get('/api/me',  { 'headers': { 'Authorization': 'Bearer ' + token}}).then(resp => {
                        let user = resp.data.data;
                        if (user.blocked) {
                            reject("User is currently blocked!");
                            return;
                        }
                        localStorage.setItem('user', JSON.stringify(user));
                        state.commit('saveUser', user);
                        resolve(response);
                    }).catch(error => {
                        reject(error);
                    });
                })
                .catch(error => {
                    reject(error);
                })
            })
        }
    }
});