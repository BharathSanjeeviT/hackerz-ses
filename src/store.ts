import axios from "axios";
import { create } from "zustand"

interface SessionStore {
  token: string | null;
  signIn: (uname: string, pass: string) => Promise<boolean>,
  signOut: () => void,
}

const isClient = typeof window !== 'undefined';

const fetchTokenFromLocalStorage = () => {
  if(isClient){
    return localStorage.getItem("token")
  }else{
    return null;
  }
}
const setTokenToLocalStorage = (newToken: string) => {
  if(isClient){
    localStorage.setItem("token", newToken)
  }
  return;
}
const removeTokenFromLocalStorage = () => {
  if(isClient){
    localStorage.removeItem('token')
  }
  return;
}

export const useSession = create<SessionStore>((set) => ({
  token: fetchTokenFromLocalStorage(),
  signIn: async (uname, pass) => {
    try {
      const { data } = await axios.post(`https://qh5vqp7drdcqa6zsumyjnqy3ya0aynwh.lambda-url.ap-south-1.on.aws/user/login`,
        { uname, pass }
      );
      setTokenToLocalStorage(data.token)
      set(() => ({
        token: data.token,
      }))
      window.location.assign('/')
      return true;
    } catch (err) {
      console.log("pass wrong")
      console.log(err)
      return false;
    }
  },
  signOut: () => {
    removeTokenFromLocalStorage()
    window.location.reload()
  }

}))
