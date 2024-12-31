import React, { ReactNode } from 'react'


export default function TextFeild({placeholder, icon, label , registerfunction , error}) {

    return (
        <div>

            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-text dark:text-white">{label}</label>
            <div className="relative   bg-primary">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-white">
                    {icon}
                </div>
                <input
                    type="text"
                    id="input-group-1"
                    className="bg-primary border-white border-2 text-white text-sm rounded-lg block w-3/4 ps-10 p-2.5 placeholder:text-white"
                    placeholder={placeholder}
                    {...registerfunction} />
                   
            </div>
            {<p className='mt-2 text-red-600'>{error}</p>}

        </div>
    )
}
