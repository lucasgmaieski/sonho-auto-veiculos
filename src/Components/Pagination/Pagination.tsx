"use client";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "@/Contexts/Context";
import { useQueryParams } from "@/lib/utils";

type Props = {
    totalCount: number;
    slug: string;
    perPage: number;
};

const Pagination = ({ totalCount, slug, perPage }: Props) => {
    const { urlSearchParams, setQueryParams } = useQueryParams();
    const { urlParams, changeUrlParams } = useContext(Context);
    const page = urlSearchParams.get("page") ?? "1";
    const [currentPage, setCurrentPage] = useState(Number(page));

    useEffect(() => {
        setCurrentPage(Number(urlSearchParams.get("page") ?? 1));
    }, [urlSearchParams]);

    console.log("totalcount: ", totalCount);
    const totalPages = Math.ceil(Number(totalCount) / Number(perPage));

    const onNextPage = () => {
        setQueryParams({ ["page"]: Number(currentPage) + 1 });
        changeUrlParams(urlSearchParams.toString());
    };

    const onPrevPage = () => {
        setQueryParams({
            ["page"]: Number(currentPage) > 1 ? Number(currentPage) - 1 : 1,
        });
        changeUrlParams(urlSearchParams.toString());
    };

    const onPageChange = (page: number) => {
        setQueryParams({ ["page"]: page });
        changeUrlParams(urlSearchParams.toString());
    };

    return (
        <div
            className={`flex gap-1 w-fit mx-auto mt-5 text-xl ${
                totalCount <= perPage ? "hidden" : "block"
            }`}
        >
            <button
                className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch] disabled:opacity-80 disabled:cursor-not-allowed"
                onClick={onPrevPage}
                disabled={currentPage === 1}
            >
                <MdOutlineKeyboardDoubleArrowLeft className="text-black mx-auto" />
            </button>
            {currentPage > 2 && (
                <button
                    className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch]"
                    onClick={() => onPageChange(currentPage - 2)}
                >
                    {currentPage - 2}
                </button>
            )}
            {currentPage > 1 && (
                <button
                    className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch]"
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    {currentPage - 1}
                </button>
            )}
            {currentPage > 0 && (
                <button className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white  w-[3ch]">
                    {currentPage}
                </button>
            )}
            {currentPage < totalPages && (
                <button
                    className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch]"
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    {currentPage + 1}
                </button>
            )}
            {currentPage < totalPages - 1 && (
                <button
                    className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch]"
                    onClick={() => onPageChange(currentPage + 2)}
                >
                    {currentPage + 2}
                </button>
            )}
            <button
                className="p-2 rounded-lg bg-gray-300 hover:bg-gray-200 text-black w-[3ch] disabled:opacity-80 disabled:cursor-not-allowed"
                onClick={onNextPage}
                disabled={currentPage === totalPages}
            >
                <MdOutlineKeyboardDoubleArrowRight className="text-black mx-auto" />
            </button>
        </div>
    );
};

export default Pagination;