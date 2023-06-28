import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const GET = async (request) => {

    return new Response(JSON.stringify("ok"), {status: 200})

}

export const POST = async (request) => {
    try {
        const {prompt} = await request.json();

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '256x256',
            response_format: "b64_json"
        })

        const image = response.data.data[0].b64_json;

        return new Response(JSON.stringify({photo: image}), {status: 200})

    } catch (error) {
        console.log("axios error")
        if (error.response) {
            console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return new Response(JSON.stringify({}), {status: 500})
    }

}