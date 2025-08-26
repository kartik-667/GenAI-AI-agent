import {tavily} from '@tavily/core'
import env from 'dotenv'
env.config()
const api=process.env.TAVILY_API_KEY

const tvly = tavily({ apiKey: api });



export const searchWeb=async ({qn})=>{
    try {
        // const res=await tvly.search({query : qn})
        const res=await tvly.search(qn)
        const allres=res.results

        const final_res=allres.map((ele)=>{
            return ele.content
        }).join('\n\n')
        // console.log(final_res);

        return final_res;
        
        
        // if(res.results && res.results.length > 0){
        //     let answer=res.results[0].content
        //     console.log(answer);
            
        //     return answer
        // }
        // console.log();
        
        
    } catch (error) {
        console.log('some error while websearch',error);
        return "Web search failed"
        
    }

}


export const availableFunctions={
    "searchWeb":searchWeb
}

searchWeb({qn:"whats the price of mac ultra apple"})
// searchWeb({qn:"when was samsung s25 ultra launched ?"})