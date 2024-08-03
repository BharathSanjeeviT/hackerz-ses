import axios from "axios";
import { create } from "zustand"

interface SessionStore {
  token: string | null;
  signIn: (uname: string, pass: string) => Promise<boolean>,
  signOut: () => void,

}

const fetchTokenFromLocalStorage = () => {
  return localStorage.getItem("token")
}

export const useSession = create<SessionStore>((set) => ({
  token: fetchTokenFromLocalStorage(),
  signIn: async (uname, pass) => {
    try {
      const { data } = await axios.post(`https://qh5vqp7drdcqa6zsumyjnqy3ya0aynwh.lambda-url.ap-south-1.on.aws/user/login`,
        { uname, pass }
      );
      localStorage.setItem("token", data.token)
      set(() => ({
        token: data.token,
      }))
      window.location.assign('/')
      return true;
    } catch (err) {
      return false;
    }
  },
  signOut: () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

}))
