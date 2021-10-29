import axios from "axios";




axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

axios.interceptors.response.use(config => {
    return config
}, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
            const response = await axios.get(`/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return axios.request(originalRequest)
        } catch (e) {
            console.log('Not authorizes')
        }
    }
    throw error
})

export async function userLogin(email, password) {
    return axios.post('/api/login', {email, password})
}

export async function userRegistration(email, password) {
    return axios.post('/api/registration', {email, password})
}

export async function userLogout() {
    return axios.post('/api/logout')
}

// export default axios;