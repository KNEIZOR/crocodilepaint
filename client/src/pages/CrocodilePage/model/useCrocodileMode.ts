import { useLocation } from "react-router-dom"

export const useCrocodileMode = () => {
    const location = useLocation()

    if(location.pathname.includes('crocodile-2players')) return 'crocodile2'
    return 'crocodile1'
}