import { useEffect, useState } from "react";
import { mainAxiosInstance } from "../api/axiosInstances";

export const useFetch = () => {
    const [genders, setGenders] = useState(null);
    const [species, setSpecies] = useState(null);
    const [breeds, setBreeds] = useState(null);

    useEffect(() => {
        const fetchGenders = async () => {  
            const res = await mainAxiosInstance.get(`/pet/gender/`);
            setGenders(res.data);
        }
        const fetchSpecies = async () => {
            const res = await mainAxiosInstance.get('/pet/species/');
            setSpecies(res.data);
        }
        const fetchBreeds = async () => {
            const res = await mainAxiosInstance.get(`/pet/breed/`);
            setBreeds(res.data);
        }
        fetchGenders();
        fetchSpecies();
        fetchBreeds();
    }, []);

    return { genders, species, breeds };
}