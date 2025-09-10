import axios from "axios"
import toast from "react-hot-toast";
const updateUser=async(data)=>{
   try {
     const res=await axios.post(`${import.meta.env.VITE_API_URL}/user/updateUser`,
         data,
  {withCredentials:true}
 
     )
     if(res.status==200){
        toast.success("user updated success")
     }
   } catch (error) {
    toast.error(error)

    
   }


}
export default updateUser;