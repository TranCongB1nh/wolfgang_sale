'use client'

import React, { useState, useEffect } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';
import Image from 'next/image';

import { EffectFade, FreeMode, Autoplay, Navigation, Thumbs } from 'swiper/modules';

import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ShoppingCartCheckoutRoundedIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Link from 'next/link';

import { Alert } from '../Modal/AlertModal';

import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addItem } from '@/redux/features/cart-slice';
import { addToFavourite } from '@/redux/features/auth-slice';
import { SignFormModal } from '../Modal/SignFormModal';
import VoucherCard from '../Voucher/VoucherCard';

import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function ProductInfo({ product }) {
    const [user, setUser] = useState({});
    const router = useRouter()

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [amount, setAmount] = useState(1);
    const [size, setSize] = useState('S');

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.authReducer.value.isAuth);
    const userData = useAppSelector((state) => state.authReducer.value.user);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);

    const switchToSignIn = async () => {
        await setIsOpen(true)
        await setIsOpenSignIn(true)
        await setIsOpenSignUp(false);
    }

    const switchToSignUp = async () => {
        await setIsOpen(true)
        await setIsOpenSignIn(false)
        await setIsOpenSignUp(true);
    }

    const addFavourite = async () => {
        if (!isAuth) {
            switchToSignIn();
            return;
        }
        // dispatch(addToFavourite({_id: data._id}))
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + user._id + "/favourite", {
            cache: 'no-cache',
            method: "POST",
            body: JSON.stringify({ id: data._id }),
            headers: { 'Content-type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const addToCart = () => {
        if (amount <= 0) {
            return;
        }
        dispatch(
            addItem({
                _id: product._id,
                name: product.name,
                slug: product.slug,
                salePrice: product.salePrice,
                imageUrl: product.imageUrl,
                amount: amount,
                size,
            })
        );
        setAmount(1);
    };

    const buyNow = () => {
        if (amount <= 0) {
            return;
        }
        dispatch(
            addItem({
                _id: product._id,
                name: product.name,
                slug: product.slug,
                salePrice: product.salePrice,
                imageUrl: product.imageUrl,
                amount: amount,
            })
        );
        setAmount(1);
        router.push('/thanh-toan');
    }

    useEffect(() => {
        const getUser = async () => {
            // process.env.NEXT_PUBLIC_API_URL
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + userData._id)
                .then((res) => res.json())
                .then((res) => {
                    setUser(res);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        getUser();
    }, []);

    return (
        <div className='mygrid pt-[5px] min-h-[500px] flex justify-between'>
            {Object.keys(product).length !== 0 &&
                <>
                    <div className='w-[33%] h-full'>
                        {product.imageUrl !== undefined &&
                            <>
                                <Swiper
                                    loop={true}
                                    spaceBetween={10}
                                    navigation={true}
                                    effect={'fade'}
                                    autoplay={{
                                        delay: 4500,
                                        disableOnInteraction: false,
                                    }}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[EffectFade, Autoplay, FreeMode, Navigation, Thumbs]}
                                    className="myslide w-full aspect-square rounded-[10px] overflow-hidden mb-1"
                                >
                                    {product.imageList.map((item) =>
                                        <SwiperSlide key={item} className='!flex overflow-hidden'>
                                            <Image
                                                src={item}
                                                alt='product image'
                                                width={490}
                                                height={490}
                                                className="object-contain rounded-[10px]"
                                            />
                                        </SwiperSlide>
                                    )}
                                </Swiper>

                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="myslide2 w-full !h-[100px] box-border py-[10px]"
                                >
                                    {product.imageList.map((item) =>
                                        <SwiperSlide key={item + '1'}>
                                            <Image
                                                src={item}
                                                alt='product image'
                                                fill
                                                className="object-contain"
                                            />
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </>
                        }
                    </div>

                    <div className='w-[37%] h-full px-4'>
                        <h1 className='font-bold text-[20px] tracking-wider mb-0'>{product.category?.name} {product.name}</h1>

                        <div id="ratedStars" className='flex items-center mb-2'>
                            {Array.apply(null, Array(Math.round(product.rated))).map(function (_, i) {
                                return (
                                    <StarRoundedIcon key={i} className='!text-[30px] text-light-yellow' />
                                )
                            })}
                            {Array.apply(null, Array(Math.round(10 - product.rated))).map(function (_, i) {
                                return (
                                    <StarOutlineRoundedIcon key={i + 100} className='!text-[30px] text-light-yellow' />
                                )
                            })}
                            <span className='font-bold text-light-yellow ml-2 text-[16px]'>{product.rated} / 10</span>
                        </div>

                        <h2 className='text-[16px] font-normal'>Hãng sản xuất: <strong>{product.brand?.name}</strong></h2>
                        <h2 className='text-[16px] font-normal'>Tình trạng: <strong className='font-bold text-light-yellow'>Mới</strong></h2>
                        <h2 className='text-[16px] font-normal'>Kho: <strong className={`font-bold ${product.quantity > 0 ? 'text-[#27ae60]' : 'text-light-red'}`}>{product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</strong></h2>

                        <div className='w-full mt-2 mb-4 mx-1'>
                            <h2 className='myprice text-[30px] font-black text-light-red'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.salePrice)}</h2>
                            {product.salePrice !== product.normalPrice &&
                                <div className='flex items-end'>
                                    <span className='text-[#4e4e4e] text-[14px]'>Giá niêm yết: </span>
                                    <h2 className='ml-2 line-through text-[20px] font-medium text-[#757575]'>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.normalPrice)}</h2>
                                </div>
                            }
                        </div>

                        <div className='w-full italic text-light-gray my-2 text-[14px]'>
                            <p>✔ Bảo hành chính hãng. </p>
                            <p>✔ Hỗ trợ đổi mới trong 7 ngày. </p>
                            <p>✔ Miễn phí giao hàng cho các đơn hàng thành phố Hồ Chí Minh. </p>
                        </div>

                        <span className="w-full block  mt-4 text-[16px]">Kích thước</span>
                        <div className="w-full mt-1  flex items-center">
                            <button disabled={product?.size.indexOf('S') > -1 ? '' : 'disabled'} onClick={() => setSize('S')} className={`w-[50px] uppercase mr-1 h-[25px] text-[14px] font-bold rounded-full border-2 cursor-pointer hover:bg-[#00000063] ${size === 'S' ? 'bg-purple-400' : 'bg-none'} ${product?.size.indexOf('S') > -1 ? '' : 'border-[#5b5b5b66]  text-[#5b5b5b66]'} `}>S</button>
                            <button disabled={product?.size.indexOf('M') > -1 ? '' : 'disabled'} onClick={() => setSize('M')} className={`w-[50px] uppercase mr-1 h-[25px] text-[14px] font-bold rounded-full border-2 cursor-pointer hover:bg-[#00000063] ${size === 'M' ? 'bg-purple-400' : 'bg-none'} ${product?.size.indexOf('M') > -1 ? '' : 'border-[#5b5b5b66]  text-[#5b5b5b66]'}`}>M</button>
                            <button disabled={product?.size.indexOf('L') > -1 ? '' : 'disabled'} onClick={() => setSize('L')} className={`w-[50px] uppercase mr-1 h-[25px] text-[14px] font-bold rounded-full border-2 cursor-pointer hover:bg-[#00000063] ${size === 'L' ? 'bg-purple-400' : 'bg-none'} ${product?.size.indexOf('L') > -1 ? '' : 'border-[#5b5b5b66]  text-[#5b5b5b66]'}`}>L</button>
                            <button disabled={product?.size.indexOf('XL') > -1 ? '' : 'disabled'} onClick={() => setSize('XL')} className={`w-[50px] uppercase mr-1 h-[25px] text-[14px] font-bold rounded-full border-2 cursor-pointer hover:bg-[#00000063] ${size === 'XL' ? 'bg-purple-400' : 'bg-none'} ${product?.size.indexOf('XL') > -1 ? '' : 'border-[#5b5b5b66]  text-[#5b5b5b66]'}`}>XL</button>
                            <button disabled={product?.size.indexOf('2XL') > -1 ? '' : 'disabled'} onClick={() => setSize('2XL')} className={`w-[50px] uppercase mr-1 h-[25px] text-[14px] font-bold rounded-full border-2 cursor-pointer hover:bg-[#00000063] ${size === '2XL' ? 'bg-purple-400' : 'bg-none'} ${product?.size.indexOf('2XL') > -1 ? '' : 'border-[#5b5b5b66] text-[#5b5b5b66]'}`}>2XL</button>
                        </div>

                        <div className='w-full mt-4 flex items-center justify-between'>
                            <div className='flex justify-between items-center w-[140px] h-[35px] rounded-full overflow-hidden border border-[#5f5f5f] bg-white'>
                                <button
                                    onClick={(e) => amount > 0 && setAmount(amount - 1)}
                                    className='flex justify-center items-center w-[30%] h-full '
                                >
                                    <RemoveRoundedIcon />
                                </button>
                                {/* <span className='w-[40%] text-[15px] h-full flex justify-center items-center'>{amount}</span> */}
                                <input type="number" min={1} max={product.quantity} placeholder='0' className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[40%] text-[15px] outline-none text-center' value={amount} onChange={(e) => setAmount(e.target.value <= product.quantity ? e.target.value : product.quantity)} />
                                <button
                                    onClick={(e) => amount < product.quantity && setAmount(amount + 1)}
                                    className='flex justify-center items-center w-[30%] h-full '
                                >
                                    <AddRoundedIcon />
                                </button>
                            </div>
                            <div onClick={addFavourite} className='myhoverbutton overflow-hidden shadow-header flex justify-center text-white items-center px-2 h-[35px] ml-3 rounded-full duration-[0.2s] border border-light-red bg-light-red hover:bg-white hover:text-light-red cursor-pointer'>
                                <FavoriteRoundedIcon className='!text-[20px]' />
                                <span className='text-[13px] ml-1'>Yêu thích</span>
                            </div>
                        </div>

                        <div className='mt-3 w-full h-[100px] flex items-center justify-between'>
                            <button onClick={addToCart} className='mygradientbackground text-white font-bold uppercase text-[15px] w-[49%] h-full rounded-[10px] flex items-center justify-center'>
                                <AddShoppingCartRoundedIcon className='mr-1' />
                                Thêm vào giỏ hàng
                            </button>
                            <button onClick={buyNow} className='mygradientbackground2 text-white font-bold uppercase text-[15px] w-[49%] h-full rounded-[10px]'>
                                <ShoppingCartCheckoutRoundedIcon className='mr-1' />
                                Mua ngay
                            </button>

                        </div>
                        <div className='mt-3 w-full h-[100px]'>
                            <div class="sharethis-inline-share-buttons"></div>
                        </div>
                    </div>

                    <div className='w-[30%] h-full'>
                        <div className='w-full h-[30%] border rounded-[10px] p-2'>
                            <div className=' flex text-[#f8786a]'>
                                <SellRoundedIcon className='myicon  !text-[20px]' />
                                <Link href="#" className='text-[13px] leading-7 font-semibold'>Ưu đãi giảm khi mua kèm phụ kiện.</Link>
                            </div>
                            <div className=' flex text-[#f8786a]'>
                                <SellRoundedIcon className='myicon  !text-[20px]' />
                                <Link href="#" className='text-[13px] leading-7 font-semibold'>Ưu đãi giảm khi check in tại shop.</Link>
                            </div>
                            <div className=' flex text-[#f8786a]'>
                                <SellRoundedIcon className='myicon  !text-[20px]' />
                                <Link href="#" className='text-[13px] leading-7 font-semibold'>Giảm ngay 50.000đ cho khách mới.</Link>
                            </div>
                            <div className=' flex text-[#f8786a]'>
                                <SellRoundedIcon className='myicon  !text-[20px]' />
                                <Link href="#" className='text-[13px] leading-7 font-semibold'>Giảm ngay 100.000đ khi mua trên 2 sản phẩm của Nike.</Link>
                            </div>
                        </div>

                        <div className='w-full p-3 max-h-[70%] bg-light-gray mt-2 rounded-[10px]'>
                            <div className='w-full flex items-center justify-between'>
                                <h3 className='font-black text-[15px[ text-white'>Voucher của bạn</h3>
                                <Link href="/tai-khoan?ma-giam-gia" className='text-white text-[13px] underline hover:text-light-yellow'>Xem tất cả</Link>
                            </div>
                            <div className='w-full mt-2'>
                                <ul className='w-full'>
                                    {user?.vouchers?.map((item) =>
                                        <li className='w-full flex items-center justify-between bg-white h-[65px] my-2 rounded-[10px]'>
                                            <div className='h-full flex items-center'>
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
                                            {/* <span className='font-medium cursor-pointer text-[15px] text-light-yellow mr-2'>Áp dụng</span> */}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>


                    {/* <Alert isOpen={isOpenAlert} closeModal={() => setIsOpenAlert(false)} /> */}
                    <SignFormModal
                        isOpen={isOpen}
                        closeModal={() => setIsOpen(false)}

                        isOpenSignIn={isOpenSignIn}
                        switchToSignIn={switchToSignIn}

                        isOpenSignUp={isOpenSignUp}
                        switchToSignUp={switchToSignUp}
                    />
                </>
            }
        </div>
    )
}
