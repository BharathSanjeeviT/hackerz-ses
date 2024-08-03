"use client"
import { useEffect, useState } from "react";
import Papa from 'papaparse';
import axios from "axios";
import { useSession } from "@/store";

const Home = () => {

  const { token } = useSession()
  const [file, setFile] = useState<File | null>(null);
  const [mails, setMails] = useState([""])
  const [body, setBody] = useState("")
  const [content, setContent] = useState("")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    handleTheCSVFileUploadByTheUser()
  }, [file])

  const handleTheCSVFileUploadChangeByTheUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  const SubmitForMail = async () => {
    if (!body || !content || !file) {
      alert("Please fill all the necessary things")
    } else {
      setLoad(true)
      try {
        await axios.post("https://qh5vqp7drdcqa6zsumyjnqy3ya0aynwh.lambda-url.ap-south-1.on.aws/user/ses",
          {
            mails,
            mail_content: content,
            mail_body: body
          }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        )
        alert("Mail sent")
      } catch (err) {
        alert("Error occured")
      }
      setLoad(true)
    }
  }

  const handleTheCSVFileUploadByTheUser = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          const data = result.data as string[][];
          const flattenedData = data.flat();
          setMails(flattenedData)
        },
      });
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center flex-col">
      <div className="flex justify-center items-center w-9/12 flex-col gap-5">

        <div className="w-full">
          <div className="my-2 pl-1">
            Subject
          </div>
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border-2 py-2 px-2 w-full"
            placeholder="body"
          />
        </div>


        <div className="w-full">
          <div className="my-2 pl-1">
            Content
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-2 py-2 px-2 w-full"
            placeholder="content"
          />
        </div>

        <input
          type="file"
          accept=".csv"
          className="border-2 py-2 px-2 w-full"
          onChange={handleTheCSVFileUploadChangeByTheUser}
        />

        <button
          className="bg-black text-white py-2 px-5 w-full hover:bg-[#21272a] transition-all"
          disabled={load}
          onClick={SubmitForMail}
        >
        {
          load ? 
          "Sending Mails" :
          "Send Mail"
        }
        </button>
      </div>
    </div>
  )
}
export default Home;
