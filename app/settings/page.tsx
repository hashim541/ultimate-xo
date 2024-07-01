'use client'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { FormEvent, Suspense } from 'react'

const Page = () => {

  const router = useRouter()
  const searchParams = useSearchParams()
  const settings = {
    mode: ['normal','infinite','ai'],
    players: ['2','3','4']
  }


  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as HTMLFormElement;
    const formData = new FormData(target)

    const data: {[key: string] : any} = {};

    formData.forEach((value,key) => data[key] = value)

    if(data.mode == 'ai' && Number(data.players) > 2){
      return router.push('/?players=2&mode=ai')
    }

    const newParams = new URLSearchParams(searchParams)
    newParams.set('players', data.players)
    newParams.set('mode',data.mode)
    
    router.push(`/?${newParams.toString()}`)
  }

  return (
    <section className="h-full flex flex-col justify-center items-center ">
        <form 
          onSubmit={ (e) => handelSubmit(e)}
          className='p-5 flex flex-col gap-7'
        >

          <h1 className='text-4xl font-bold mb-3 text-center'>Settings</h1>

          <div className='flex flex-col gap-2'>
            <label htmlFor="mode" className='text-xl '>Mode -</label>
            <select name="mode" id="mode" className='border px-3 py-1 rounded-sm w-60 text-lg capitalize'>
              {settings.mode.map(mode => (
                <option value={mode} className='capitalize'>{mode}</option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor="players"  className='text-xl '>Players -</label>
            <select name="players" id="players" className='border px-3 py-1 rounded-sm w-60 text-lg capitalize'>
              {settings.players.map(player => (
                <option value={player} className='capitalize'>{player}</option>
              ))}
            </select>
          </div>

          <button
            type='submit'
            className='bg-black text-white px-7 py-3 rounded-md mt-2 font-bold'
          >
            Apply Changes
          </button>
        </form>

    </section>
  )
}
const SettingsPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default SettingsPage;