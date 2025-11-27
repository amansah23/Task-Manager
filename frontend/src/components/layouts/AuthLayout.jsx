import React from 'react';
// import UI_IMG from "../../assets/images/loginSignup-img.png";
import UI_GIF from "../../assets/images/Hii.gif";
// import UI_ILLUSTRATION from "../../assets/images/illustration.mp4";

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>

    <div className="hidden md:flex w-[40vw] h-screen items-center justify-center bg-[#FCFBFC]  overflow-hidden ">
        {/* <img src={UI_IMG} className='w-64 lg:w-[90%]' alt="UI_Image" /> */}
        <img src={UI_GIF} className='w-64 lg:w-[90%]' alt="UI_Image" />
        {/* <video autoPlay loop muted className=' lg:w-[90%]  ' alt="UI_Illustration" src={UI_ILLUSTRATION}></video> */}
      </div>

      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Task Manager</h2>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout
