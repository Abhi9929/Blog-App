function Hero() {
    return (
        <div className='hero py-14 min-h-[60vh] bg-[#FFC017] lg:bg-transparent border-black border-b-[1px]'>
            <div className='px-5 md:px-0 md:max-w-3xl lg:max-w-7xl mx-auto'>
                <div className='left '>
                    <h1 className='w-64 leading-[1.125] md:w-fit font-semibold text-6xl lg:text-8xl'>Stay curious.</h1>
                    <br />
                    <p className='mt-8 max-w-96 md:max-w-[30rem] md:font-semibold  font-normal text-2xl'>Discover stories, thinking, and expertise from writers on any topic.</p>
                    <br />
                    <button className='mt-8 py-2 px-12 bg-black text-white rounded-full font-semibold text-lg border-black'>
                        Start reading
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero