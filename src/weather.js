export default async function weather(city) {
    if(!city) throw new Error('Você precisa inserir uma cidade.');
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=S6AJYHB94VLKJEEDLQBKMXC55&contentType=json`)
    const data = await response.json();
    return data;
}
