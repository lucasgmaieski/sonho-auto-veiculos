"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun} from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme } = useTheme();

    useEffect(() => {
        setMounted(true)
    }, []);

    if(!mounted) return null;
    return (
        <div>
            <button className="dark:block hidden" aria-label="Tema">
                <FiSun className="w-[28px] h-[28px] cursor-pointer text-white hover:text-blue-600 transition-colors" onClick={() => setTheme("light")} tabIndex ={0}/>
            </button>
            <button className="dark:hidden block" aria-label="Tema">
                <MdDarkMode className="w-[28px] h-[28px] cursor-pointer text-black hover:text-blue-600 transition-colors" onClick={() => setTheme("dark")} tabIndex={0}/>
            </button>
        </div>
    );
}