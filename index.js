const API_KEY="AIzaSyBoL09RoWmo06hw2RVEMf70kN8tWdPUl18"
import { GoogleGenAI } from "@google/genai";
import readlinesync, { question } from 'readline-sync'

import {factorial, sum, isprime, factorialdeclaration, sumdeclaration, primedeclaration} from './functions.js'

const ai = new GoogleGenAI({ apiKey:API_KEY});

const History=[] //stores in form of obj
const availableFnc={
    sum:sum,
    factorial:factorial,
    isprime:isprime
}

async function aifunction(question){
    try {
        
            History.push({
                role:"user",
                parts:[{text:question}]
            })
            
            while(true){
                
                    const response = await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: History,
                    config: {
                        systemInstruction:`You are an AI agent. you have access to tools like sum, check for prime and factorial.
                        
                        If you want to use these tools you can. 
                        In case of general questions, you can answer directly without using these tools`,
                    tools: [{
                      functionDeclarations: [factorialdeclaration,sumdeclaration,primedeclaration]
                    }],
                  },
                  });
                
                  if(response.functionCalls && response.functionCalls.length >0){
                    response.functionCalls.forEach(async (fnc)=>{ //get each function of function call
                        console.log(fnc);
                        
                        const {name,args}=fnc
                        const res=await availableFnc[name](args)
        
                
                        const functionResponsePart = {
                      name: name,
                      response: {
                        result: res,
                      },
                    };
                
                         History.push({
                             role: "model",
                        parts: [
                        {
                          functionCall: fnc,
                        },
                      ],
                    });
                
                     History.push({
                      role: "user",
                      parts: [
                        {
                          functionResponse: functionResponsePart,
                        },
                      ],
                    });
                
                        
                
                    })
                  }else{
                      if(response.text){
                        History.push({
                            role:"model",
                            parts:[{text:response.text}]
                        })
                      }
                    
                      console.log(response.text);
                      break; //no more func calls
                
                  }
        
            }
        
    } catch (error) {
        console.log("some error occured" + error.message);
        
        
    }


}

async function main(){
    const qn=readlinesync.question("Ask your qn-> ")
    if(qn.trim().toLowerCase() === "exit"){
        return
    }
    await aifunction(qn)

    main()
    
}

main()