import Account from "../Account"

function Header() {
    return (
        <header className='w-full shadow-md'>
            <div className='px-2 py-4 md:px-4 lg:px-0 lg:max-w-[1350px] mx-auto'>
                <div className='w-full flex items-center justify-between'>
                    <div className="font-semibold text-xl">
                        Drafts
                    </div>
                    <div className='flex gap-6 items-center'>
                        <Account />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header