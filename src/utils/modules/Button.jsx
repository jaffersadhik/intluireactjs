// import React, { Children } from 'react'

// function Button({ Children }) {
//     return (
//         <>
//             <button
//                 className="bg-admin-color2    text-white font-bold py-2 px-4 rounded" type="submit" >
//                 {Children}
//             </button></>
//     )
// }

// export default Button


export function Button({
    children,
}) {
    return (
        <button className="bg-admin-color2 text-white font-bold py-2 px-4 rounded"
        type="submit">
        {children}
    </button>
    )
}