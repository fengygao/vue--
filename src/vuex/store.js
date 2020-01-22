import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state : {
        count: 10,
        isLogin:0,
    },
    mutations : {
        addcount(state){
            state.count++
        },
        redcount(state){
            state.count--
        },
        changeLogin(state,data){
            state.isLogin = data;
        },
        changecount(state,data){
            state.count = data;
        }
    },
    actions : {
        addnum ({ commit }) {
            commit('addcount')                
        },
        rednum ({ commit }) {
            commit('redcount')                
        }
    }
})

export default store;