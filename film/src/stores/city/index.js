const state = {
    nm: window.localStorage.getItem('nowNM') || '南京市'
};

const mutations = {
    CITY_INFO( state, payload ){
        state.nm = payload.nm;
    }
};

const actions = {

};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}
