import env from 'dotenv'
env.config()
import readlinesync from 'readline-sync'


import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.APIKEY });

let context=[] 


async function main(qn) {
    try {
        context.push({
            role:"user",
            content:qn
        })
        
        const completion = await groq.chat.completions
          .create({
            
            messages:context,
            model: "openai/gpt-oss-20b",
          })
          .then((chatCompletion) => {
            let response=chatCompletion.choices[0]?.message?.content || ""
            console.log(response || "");
            
            if(response){
                context.push({
                    role:"assistant",
                    content:response
                })

            }

            
          });
        
    } catch (error) {
        console.log("some error occured ",error);
        
        
    }
}

async function callModel(){
    while(true){
        let qn=readlinesync.question("Enter your qn -> ")
        if(qn.trim().toLowerCase()==="exit"){
            return
        }
    
        await main(qn)

    }


}
callModel()


const key=process.env.APIKEY
// console.log(key);