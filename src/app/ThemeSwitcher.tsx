"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMenu, FiSun} from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null;
    return (
        <div>
            <button className="dark:block hidden" >
                <FiSun className="w-[28px] h-[28px] cursor-pointer text-white" onClick={() => setTheme("light")} tabIndex ={0}/>
            </button>
            <button className="dark:hidden block">
                <MdDarkMode className="w-[28px] h-[28px] cursor-pointer text-black" onClick={() => setTheme("dark")} tabIndex={0}/>
            </button>
        </div>
    );
}