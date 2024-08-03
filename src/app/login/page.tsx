"use client"
import { useSession } from "@/store";
import { useState } from "react";

const Login = () => {
  const { signIn } = useSession()
  const [uname, setUname] = useState("") 
  const [pass, setPass] = useState("") 
  const[load, setLoad] = useState(false)
  const makeUserSignIn = async () => {
    if(!uname || !pass){
      alert("Username or Password cannot be empty")
    }else{
      setLoad(true)
      if(!await signIn(uname, pass)){
        alert("Wrong username or password")
      }
      setLoad(false)
    }
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="border-4 p-5 flex flex-col gap-5 border-black w-9/12 lg:w-4/12">

        <div className="flex justify-center text-3xl font-semibold">
          Email Service
        </div>

        <div className="flex flex-col">
          <div className="p-2 flex items-center">
            Username
          </div>
          <input
            value={uname}
            onChange={ (e) => setUname(e.target.value) }
            className="border-2 py-2 px-2 w-full"
            placeholder="username"
          />
        </div>

        <div className="flex flex-col">
          <div className="p-2 flex items-center">
            Password
          </div>
          <input
            value={pass}
            onChange={ (e) => setPass(e.target.value)}
            className="border-2 w-full py-2 px-2"
            type="password"
            placeholder="password"
          />
        </div>
      
        <div className="flex justify-center">
          <button className="bg-black text-white py-2 px-5 w-full hover:bg-[#21272a] transition-all"
          disabled={load}
            onClick={ () => makeUserSignIn() }
          >
          { load ? "Loading" : "Submit" }
          </button>
        </div>

      </div>
    </div>
  )
}
export default Login;
