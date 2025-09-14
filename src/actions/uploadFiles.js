import axios from "axios"
import toast from "react-hot-toast";
const uploadFiles=async(formData)=>{
   try {
     const res=await axios.post(`${import.meta.env.VITE_API_URL}/file/upload`,
        formData,
  {withCredentials:true}
 
     )
     if(res.status==200){
        toast.success("File uploaded")
     }
   } catch (error) {
    toast.error(error.message)

    
   }


}
export default uploadFiles;