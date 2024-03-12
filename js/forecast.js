const key = "99Ju6pHGNHme4LgEKO3f8yNgTeN88Cgs";

const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();  

    console.log(data)
}

getCity("dhaka");