function handleHttpErrors(res) {
    if (!res.ok) {
    const errorMessage = {message: res.statusText, status: res.status};
    throw errorMessage;
    }
    return res.json();
}

class FetchFactory {
    
    getFlights = (from, to, startDate, endDate) => {
        return fetch("https://hawkdon.dk/booking/api/travelflight/originlocation=" + from + "&destination="+ to +"&departuredate=" + startDate + "&returndate=" + endDate + "&sortby=totalfare")
        .then(handleHttpErrors)
    }

    getLabelsForAirports = () => {
        return fetch("https://hawkdon.dk/booking/api/airport/labels")
        .then(handleHttpErrors)
    }
  
  }
  
  const fetchFactory = new FetchFactory();
  export default fetchFactory;