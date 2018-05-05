function handleHttpErrors(res) {
    if (!res.ok) {
      throw {message:res.statusText,status:res.status};
    }
    return res.json();
}

class FetchFactory {
    
    getFlights = (from, to, startDate, endDate) => {
        return fetch("https://hawkdon.dk/booking/api/travelflight/originlocation=" + from + "&destination="+ to +"&departuredate=" + startDate + "&returndate=" + endDate + "&sortby=totalfare")
        .then(handleHttpErrors)
    }
  
  }
  
  const fetchFactory = new FetchFactory();
  export default fetchFactory;