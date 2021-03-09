import Vue from 'vue'
import Vuex from 'vuex'

const authentication = {
    state: () => ({ }),
    mutations: { },
    actions: { },
    getters: { }
}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:  {
        authentication: authentication
    }
})

export default store
