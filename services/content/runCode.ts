import axios from "axios";

export const runCode = async (compilableCode: string, compiledStdin: any[], languageName: string) => {
    const options = {
        method: "POST",
        url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '148bd21388msh371e4376375abbep1af45djsn1627d694daa9',
            'X-RapidAPI-Host': 'onecompiler-apis.p.rapidapi.com'
        },
        data: {
            language: languageName,
            stdin: compiledStdin,
            files: [
                {
                    name: "index.js",
                    content: compilableCode,
                },
            ],
        },
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};