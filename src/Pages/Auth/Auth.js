import React, { useEffect, useState} from 'react';
import { Auth, Hub } from 'aws-amplify';

export default function CheckAuth() {
  //check if user is authenticated/logged in
  let [user, setUser] = useState(false)

    useEffect(() => {
        let updateUser = async () => {
            try {
                let user = await Auth.currentAuthenticatedUser()
                setUser(true)
            } catch {
                setUser(false)
            }
        }
        console.log("this is it: " + user);
        Hub.listen('auth', updateUser) //listen for login/signup events
        updateUser() //check manually first time bc no hub event
        return () => Hub.remove('auth', updateUser) //cleanup
    }, []);

    return user;
}