
const user = {
    state:{
        loginToken:''
    },
    mutations:{
        SET_LOGIN_TOKEN:(state,token) => {
            state.loginToken = token
        }
    },
    getters:{
        loginToken(state) {
            return state.logintoken
        }
    }
}

export default user
