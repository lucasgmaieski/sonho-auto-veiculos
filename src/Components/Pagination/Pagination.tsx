"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@/Contexts/Context';
import { useQueryParams } from '@/lib/utils';

type Props = {
    totalCount: number;
    slug: string;
    perPage: number
}
const Pagination = ({totalCount, slug, perPage} : Props) => {
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const { urlParams,changeUrlParams } = useContext(Context);
    const page = urlSearchParams.get('page') ?? '1'
    const [currentPage, setCurrentPage] = useState(Number(page));

    useEffect(() => {
        setCurrentPage(Number(urlSearchParams.get('page') ?? 1))
    }, [urlSearchParams]);

    console.log("totalcount: ", totalCount)
    const totalPages = Math.ceil(Number(totalCount) / Number(perPage));
  
    const onNextPage = () => {
      setCurrentPage(prevPage => prevPage + 1);
      setQueryParams({ ['page']: Number(currentPage) + 1 })
      changeUrlParams(urlSearchParams.toString());
    };
  
    const onPrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
        setQueryParams({ ['page']: Number(currentPage) > 1 ? Number(currentPage) - 1 : 1 })
        changeUrlParams(urlSearchParams.toString());
    };
  
  return (
    <div className={`flex items-center gap-1 mx-auto mt-5 ${totalCount <= perPage ? 'hidden' : 'block'} `}>
      <button className='p-2 rounded-lg bg-white text-2xl text-black disabled:opacity-80 disabled:cursor-not-allowed' onClick={onPrevPage} disabled={currentPage === 1}><MdOutlineKeyboardDoubleArrowLeft className="text-black"/></button>
      <span className='py-1 px-2 rounded-lg bg-white text-2xl text-black'> {currentPage} / {totalPages}</span>
      <button className='p-2 rounded-lg bg-white text-2xl text-black disabled:opacity-80 disabled:cursor-not-allowed' onClick={onNextPage} disabled={currentPage === totalPages}><MdOutlineKeyboardDoubleArrowRight className="text-black"/></button>
    </div>
  );
};

export default Pagination;