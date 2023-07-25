import React, { useEffect, useState } from 'react';
import { useStateContext } from "../context/stateContext";
import img from '../assets/wallet.png'
import Loader from '../components/Loader';

const Profile = () => {
  const { address, getProfile } = useStateContext();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const data = await getProfile();
      if (data) {
        console.log(data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (address) {
      fetchProfile();
    }
  }, [address]);

  return (
    <div>
      {isLoading && <Loader />}
      {address && Object.keys(profile).length > 0 ? (
        <div
          className="max-w-md mx-auto text-white shadow-lg rounded-lg overflow-hidden mt-20"
          style={{
            background: 'linear-gradient(to right, #000000, #009193, #FFFFFF)',
          }}
        >
          <p className="text-center text-3xl">Profile</p>
          <div className="sm:items-center px-6 py-4">
            <div className='ml-36'>
              <img
                className="flex sm:mx-0 sm:flex-shrink-0 h-24 sm:h-32 sm:w-32 rounded-full object-cover object-center"
                src={profile.link === "www.link.com" ? "https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face.jpg" : profile.link}
                alt=""
              />
            </div>

            <div className="mt-4 sm:mt-0 sm:ml-4 sm:text-left text-center">
              <h1 className="text-xl leading-tight text-center mt-2">{profile.name}</h1>
              <p className="text-sm text-center mt-5">{address}</p>
              <p className="text-sm text-center">{profile.mail}</p>
              <p className='text-center mt-10'>About</p>
              <p className="text-sm text-center">{profile.about}</p>
              <div className="mt-4 flex sm:justify-start">
                <a href={profile.twitter} className="text-white hover:text-blue-500 mr-4">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    {/* Twitter icon path */}
                  </svg>
                </a>
                <a href={profile.github} className="text-white hover:text-black">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
                    {/* GitHub icon path */}
                  </svg>
                </a>
              </div>
              <div className='text-teal-500 mt-10'>
                <a href="/updateprofile" className='bg-white rounded-md px-4 py-2'>update profile</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='mt-10 text-4xl text-white bg-[#791355] px-28 py-20 md:flex'>
          <p className='my-auto'>connect your <span className=''>wallet</span> to see your profile</p>
          <p className='mt-28'>try reconnecting the wallet if you are not able to find the profile. we are working on it 😀</p>
          <img src={img} alt="" />
        </div>
      )}
    </div>
  );
}

export default Profile;
