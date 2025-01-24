import React from 'react';
import TextFeild from '../../SharedComponents/TextFeild/TextFeild';
import { FaAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { AUTH_URLS, axiosInstance } from '../../../Services/URLS/AUTH_URLS/AUTH_URLS';
import { EMAIL_VALIDATION, PASWORD_VALIDATION } from '../../../Services/Validation/VALIDATION';
import Icons from '../Login/Icons/Icons';

interface RegisterData {
  first_name: string,
  last_name: string,
  email:string, 
  password: string,
  role:string 
}

export default function Register() {

  const onSubmit = async (data: RegisterData) => {
  

    try {
      const res = await axiosInstance.post(AUTH_URLS.REGISTER,data)
      console.log(res);
      // navigate('/verify-account', {state: {email: data.email}})
      // toast?.success(res?.data?.message)
    } catch (error: any) {
      // toast?.error(error?.response?.data?.message) 
      console.log(error)
      const errors = error?.response?.data?.additionalInfo?.errors
      // for (const key in errors) {
      //   toast?.error(errors[key][0])
      // }     
    }    
  }


  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    setValue
  } = useForm();

  return (
    <>
     <div>
      <h1 className='text-text my-4'>Create your account and start using QuizWiz!</h1>
     </div>
     <Icons/>
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex'>
          <div className='basis-1/2'>
          <TextFeild 
          type={'text'}
          placeholder="Type your first name"
          icon={<FaAddressCard />}
          label="Your first name"
          registerfunction={register('first_name', {
            required: 'First name is required',
          })}
          error={errors?.firstName?.message}
          />
          </div>
          <div className='basis-1/2'>
          <TextFeild 
          placeholder="Type your Last name"
          type={'text'}
          icon={<FaAddressCard />}
          label="Your Last name"
          registerfunction={register('last_name', {
            required: 'Last name is required',
          })}
          error={errors?.lastName?.message}
          />
          </div>
          
          
        </div>
        <div >
        <TextFeild 
          placeholder="Type your email"
          icon={<MdEmail />}
          type={"text"}
          label="Type your email"
          registerfunction={register('email', EMAIL_VALIDATION)}
          error={errors?.email?.message}
          /> 
        </div>
        <div>

            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-text dark:text-white">Your role</label>
            <div className="relative   bg-primary">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
                <MdEmail />
                </div>
               <select className="bg-primary border-white border-2 text-white text-sm rounded-lg block w-3/4 ps-10 p-2.5 placeholder:text-white"
               {...register('role', {
                required: 'role is required',
              })}
               >
                <option value='Student' selected>Student</option>
                <option value="Instructor">Instructor</option>
               </select>
            </div>
            {/* {<p className='mt-2 text-red-600'></p>} */}
            {errors?.role && <p style={{color:"red",fontSize:'12px'}}>{String(errors?.role?.message)}</p>}

        </div>
        <div >
        <TextFeild 
          placeholder="Type your password"
          icon={<FaKey />}
          type={"password"}
          label="Password"
          registerfunction={register('password', PASWORD_VALIDATION)}
          error={errors?.password?.message}
          /> 
        </div>
        <button type="submit" 
        className="py-2.5 my-1.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Sign Up
        </button> 
      </form>
    </div>
    </>
  )
}
