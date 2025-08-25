import {tavily} from '@tavily/core'
import env from 'dotenv'
env.config()
const api=process.env.TAVILY_API_KEY

const tvly = tavily({ apiKey: api });



export const searchWeb=async ({qn})=>{
    try {
        // const res=await tvly.search({query : qn})
        const res=await tvly.search(qn)
        if(res.results && res.results.length > 0){
            let answer=res.results[0].content
            return answer
        }
        // console.log();
        
        
    } catch (error) {
        console.log('some error while websearch',error);
        return "Web search failed"
        
    }

}


export const availableFunctions={
    "searchWeb":searchWeb
}

// searchWeb("when was iphone 16 launched ?")