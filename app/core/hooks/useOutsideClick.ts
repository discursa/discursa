import { useEffect, useRef } from "react"

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (event: any) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}
