// store/modules/user.js
const state = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    isLoggedIn: !!localStorage.getItem('userInfo')
}

const mutations = {
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
        state.isLoggedIn = !!userInfo
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
}

const actions = {
    setUserInfo({ commit }, userInfo) {
        commit('SET_USER_INFO', userInfo)
    }
}

const getters = {
    getUserInfo: state => state.userInfo,
    isLoggedIn: state => state.isLoggedIn
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
