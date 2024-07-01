'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"


const Header = () => {

    const router = useRouter()

    return (
        <header className="px-10 py-5 flex  justify-between">
            <h1 className="text-2xl">ULTIMATE XO</h1>

            <button
                onClick={() => {
                    router.push('/settings')
                }}
            >
                <Image
                    src='/assets/setting.svg'
                    alt='seetting image'
                    width={30}
                    height={30}
                />
            </button>
        </header>
    )
}

export default Header