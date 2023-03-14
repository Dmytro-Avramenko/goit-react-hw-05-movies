// import { useEffect, useState } from 'react'

// const DEFAULT_DELAY = 500;

// export const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const timer = setTimeout(
//       () => setDebouncedValue(value),
//       delay || DEFAULT_DELAY)

//     return () => {
//       clearTimeout(timer)
//     }
//   }, [value, delay])

//   return debouncedValue
// };