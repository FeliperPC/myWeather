export default async function translateText(text) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=en|pt-br`);
    const data = await response.json();
    return data.responseData.translatedText;
}