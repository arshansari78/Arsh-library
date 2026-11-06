import React from 'react'

export default function Card({ children, title }) {
    return (
        <div className='w-full px-4 py-4 hover:shadow-2xl rounded-xl items-center border-teal-900 border-t-4 shadow-lg p-9'>
            <h2 className='text-xl font-semibold mb-4'>{title}</h2>
            {children}
        </div>
    )
}