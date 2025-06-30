import { useNavigate } from 'react-router-dom';

export default {
    publicSrc:import.meta.env.VITE_BASE_URL,
    pageTo:(page:string)=>{
        const navigate = useNavigate();
        navigate(page);
    }
}
