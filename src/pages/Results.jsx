import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Results() { 
    const [searchParams] = useSearchParams();
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
}