import React from 'react'
import { createAxios } from '../createAxios'

const useUserCrud = () => {

    const Authenticate = async (param) => {
        try {
            let res = await createAxios().post(`ApplicationUser/Authenticate`, param)
            return res
        }
        catch (err) {
            alert(err.message)
        }

    }
    return { Authenticate }
}
export default useUserCrud