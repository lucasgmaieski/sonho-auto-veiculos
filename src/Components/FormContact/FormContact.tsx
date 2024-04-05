"use client"
import { useFormContact } from "@/app/hooks/useFormContact";
import { ErrorMessage } from "./ErrorMessage";
import { Checkbox } from "@/Components/ui/checkbox"
import { RiMailSendFill } from "react-icons/ri";

import Link from "next/link";

type Params = {

}
export default function FormContact() {
    const { errors, handleForm, handleSubmit, register, loading, message, success, handleInputChange, privacyCheck, setPrivacyCheck } = useFormContact()
    return (
        <form onSubmit={handleSubmit(handleForm)} className=' rounded-[18px] lg:mb-7 '>
            <label className='flex gap-2 flex-col pb-8 w-full'>
                <input type="text" id="name"  {...register('name')} placeholder='Nome completo' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                {errors.name && (
                    <ErrorMessage color='#fff' message={errors.name?.message} />
                )}
            </label>
            <div className="flex flex-col lg:flex-row lg:gap-4">
                <label className='flex gap-2 flex-col pb-8 w-full'>
                    <input type="text" id="state"  {...register('state')} placeholder='Estado' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                    {errors.state && (
                        <ErrorMessage color='#fff' message={errors.state?.message} />
                    )}
                </label>
                <label className='flex gap-2 flex-col pb-8 w-full'>
                    <input type="text" id="city"  {...register('city')} placeholder='Cidade' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                    {errors.city && (
                        <ErrorMessage color='#fff' message={errors.city?.message} />
                    )}
                </label>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-4">
                <label className='flex gap-2 flex-col pb-8 w-full'>
                    <input type="text" id="email"  {...register('email')} placeholder='E-mail' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                    {errors.email && (
                        <ErrorMessage color='#fff' message={errors.email?.message} />
                    )}
                </label>
                <label className='flex gap-2 flex-col pb-8 w-full'>
                    <input type="text" id="phone"  {...register('phone')} placeholder='Telefone' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                    {errors.phone && (
                        <ErrorMessage color='#fff' message={errors.phone?.message} />
                    )}
                </label>
            </div>
            <label className='flex gap-2 flex-col pb-8 w-full'>
                <textarea  id="message" {...register('message')} placeholder='Mensagem' onChange={handleInputChange} className='w-full bg-transparent border-2 dark:border-slate-600 border-slate-300 rounded-lg py-2 px-4 max-[360px]:text-xl text-2xl sm:text-2xl  dark:placeholder:text-white/60 placeholder:text-slate-400 dark:focus-visible:border-blue-600 focus-visible:border-blue-600 focus-visible:outline-none read-only:dark:focus-visible:border-slate-600 read-only:focus-visible:border-slate-300' readOnly={loading}/>
                {errors.message && (
                    <ErrorMessage color='#fff' message={errors.message?.message} />
                )}
            </label>
            {/* <label htmlFor="privacy">
                <input type="checkbox" name="privacy" id="privacy" />
                Ao enviar o formulário, eu concordo com as <Link href="/politica-de-privacidade">políticas de privacidade</Link> do Sonho Auto Veículos.
            </label> */}
            <div className="space-x-2 mb-5">
                <Checkbox  id="privacy" checked={privacyCheck} onCheckedChange={() => setPrivacyCheck(!privacyCheck)} disabled={loading} className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white data-[state=checked]:border-none"/>
                <label htmlFor="privacy" className="cursor-pointer">
                    Ao enviar o formulário, eu concordo com as <Link href="/politica-de-privacidade" className="underline hover:text-blue-500">políticas de privacidade</Link> do Sonho Auto Veículos.
                </label>
            </div>
    
            <button type="submit" className='relative bg-blue-500 text-white py-2 px-3 mt-6 rounded-lg w-fit block ml-auto uppercase text-xl sm:text-2xl font-semibold sm:py-3 sm:px-6 disabled:opacity-60 hover:bg-blue-600 transition-colors' disabled={loading || !privacyCheck}>
                {loading ? 
                    <> 
                        Enviando...
                        <svg aria-hidden="true" className="w-7 h-7 mx-auto text-gray-200 animate-spin dark:text-gray-100 fill-slate-600 inline ml-4 sm:w-9 sm:h-9" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/></svg>
                    </>
                :
                    <>
                        Enviar
                        <RiMailSendFill className="inline ml-3 "/>
                    </>
                }
            </button>
            <p className={`${message !== '' ? 'block' : 'hidden'} animate-fadeeout mt-7 border-2 ${success ? 'dark:border-green-500 border-green-400 dark:bg-green-400 bg-green-300' : 'dark:border-red-700 border-red-300 dark:bg-red-900 bg-red-200' }  rounded-lg w-fit p-3 mx-auto`}>{message}</p>
        </form>
    );
}