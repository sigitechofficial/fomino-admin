import React from 'react'

const Adyen = () => {
    return (
        <>
            <div className='w-full h-max font-sans'>
                <div className='w-full max-h-[300px] relative'>
                    <img className='w-full h-full max-h-[300px] object-cover' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" />
                    <div className='w-[105px] h-[105px] rounded-lg bg-white absolute bottom-[-65px] left-[27px] shadow-lg p-[3px]'> <img className='w-full h-full object-cover rounded-lg' src="https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" alt="image" /></div>
                </div>

                <h4 className='font-semibold text-[24px] text-end mt-3 mr-6'>CHF 26,12</h4>
                <div className='mt-7 pl-8 pr-6'>
                    <h4 className='font-semibold text-[25px]'>Fomino</h4>
                    <p className='text-gray-800 leading-6 text-[14px] font-normal'>Payment for online ordering: PEIRC with <span className='font-semibold underline'>Fomino.ch</span></p>
                    <p className='text-gray-800 leading-6 text-[14px] font-normal'>Ref. IKEDC6676BBB</p>
                    <p className='underline underline-offset-4 text-[14px] font-medium text-end mt-3'>Cancel payment</p>
                </div>


            </div>
        </>
    )
}

export default Adyen