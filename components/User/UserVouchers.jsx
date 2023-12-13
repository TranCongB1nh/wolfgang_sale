'use client'
import { useAppSelector } from '@/redux/store';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const UserVouchers = () => {
    const user = useAppSelector((state) => state.authReducer.value.user);

    const [userData, setUserData] = useState();

    const getUser = async () => {
        // process.env.NEXT_PUBLIC_API_URL
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id)
            .then((res) => res.json())
            .then((res) => {
                setUserData(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className='w-full h-full bg-white p-3 grid grid-cols-3 gap-4 overflow-hidden'>
            {userData?.vouchers?.map(item =>
                <div key={item._id} className='w-full h-[100px] rounded-[5px] shadow-menu flex items-center'>
                    <Image
                        src="/logo-1.png"
                        alt="logo"
                        width={70}
                        height={70}
                        className='object-contain'
                    />
                    <div className='w-[2px] h-[80%] bg-[#e0e0e0]'></div>
                    <div className='h-[80%] ml-2 flex flex-col justify-center'>
                        <h4 className='font-semibold text-[15px] text-black'>MÃ GIẢM GIÁ {item?.price / 1000}K</h4>
                        <p className='font-normal text-[13px] text-[#a3a3a3]'>Đơn tối thiểu {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item?.condition)}</p>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserVouchers