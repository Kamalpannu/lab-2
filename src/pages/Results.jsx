import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FlightList from '../components/FlightList';
import NoResults from '../components/NoResults';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Results() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(()=>{fetch('/src/data/flights.json')
        .then((res) => res.json())
        .then((data) => {
            const results = data.filter((flight) =>
                flight.from.toLowerCase() === from.toLowerCase() &&
                flight.to.toLowerCase() === to.toLowerCase()
        );
        setFlights(results);
        setIsLoading(false);
       })},1000);
    }, [from, to]);
    if (isLoading) return <CircularProgress /> ;
    if (flights.length === 0) 
      return (
        <div>
          <NoResults from={from} to={to} />
          <Button variant="outlined"   onClick={() => {
            navigate('/');}}>BackToHome</Button>
        </div>
    )
    return (
      <div>
        <h2>Flights from {from} to {to}</h2>
        <FlightList flights={flights} />
        <Button variant="outlined"   onClick={() => {
          navigate('/');}}>BackToHome</Button>
      </div>
    );
}
