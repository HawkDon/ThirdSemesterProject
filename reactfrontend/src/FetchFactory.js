class FetchFactory {
    
    getFlights = (from, to, startDate, endDate) => {
        return fetch("https://hawkdon.dk/booking/api/travelflight/originlocation=" + from + "&destination="+ to +"&departuredate=" + startDate + "&returndate=" + endDate + "&sortby=totalfare")
        .then(res => res.json())
    }
  
  }
  
  const fetchFactory = new FetchFactory();
  export default fetchFactory;