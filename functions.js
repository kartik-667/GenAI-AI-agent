import {tavily} from '@tavily/core'
import env from 'dotenv'
env.config()
const api=process.env.TAVILY_API_KEY

const tvly = tavily({ apiKey: api });



export const searchWeb=async ({qn})=>{
    try {
        const res=await tvly.search(qn)
        console.log(res.results[0].content);
        
        
    } catch (error) {
        console.log('some error while websearch',error);
        
    }

}


export const availableFunctions={
    "searchWeb":searchWeb
}

// searchWeb("when was iphone 16 launched ?")