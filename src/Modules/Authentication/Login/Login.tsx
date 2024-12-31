
import TextFeild from "../../SharedComponents/TextFeild/TextFeild"
import { FaEnvelope } from "react-icons/fa";

import { useForm } from 'react-hook-form';
export default function Login() {
  const {register , handleSubmit , formState:{errors}}= useForm()
  return (
    <div>

      <form onSubmit={handleSubmit((data)=>console.log(data))}>


      {TextFeild({placeholder:'Email',
         icon:<FaEnvelope />,
         label:'Email',
         registerfunction:{...register('email',{required:"email is required"})},
         error:errors.email && errors.email.message})}
         

         
         </form>
    </div>
  )
}
