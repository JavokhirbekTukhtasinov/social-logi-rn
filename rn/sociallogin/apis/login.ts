import { User } from "../src/atom/user"
import client from "../src/client"


export const facebookLogin  = async (user:User) => {
    try {   
        const {data} = await client.post(`user/login/facebook/`, user) 
        return data
    } catch (error) {
        console.log('error: ', error)
    }
}


export const googleLogin  = async (user:User) => {
    try {   
        const {data} = await client.post(`user/login/google/`, user) 
        return data
    } catch (error) {
        console.log('error: ', error)
    }
}