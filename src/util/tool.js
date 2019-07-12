const cache = {

    setCache(key, value) {

       localStorage.setItem(key,JSON.stringify(value))
    },

    getCache(key) {

        return JSON.parse(localStorage.getItem(key))
    }


}

export default cache
