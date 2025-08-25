import env from "dotenv";
env.config();
import readlinesync from "readline-sync";
import { tavily } from "@tavily/core";

const searchapi = process.env.TAVILY_API || "";
import Groq from "groq-sdk";
import { searchWeb, availableFunctions } from "./functions.js";
const groq = new Groq({ apiKey: process.env.APIKEY });

let context = [
  {
    role: "system",
    content: `You are a smart personal assistant who answers the questions asked by the user. You also have access to following tools-  
    1. searchWeb({qn}:{qn:String}) this can search the web for useful information`,
  },
];

async function main(qn) {
  try {
    context.push({
      role: "user",
      content: qn,
    });

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      temperature: 0,
      messages: context,
      tools: [
        {
          type: "function",
          function: {
            name: "searchWeb",
            description: "Search the web to answer the given question",
            parameters: {
              type: "object",
              properties: {
                qn: {
                  type: "string",
                  description: "The question which is asked by the user",
                },
              },
              required: ["qn"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    let response = completion.choices[0]?.message?.content || "";
    

    let responsemsg = completion.choices[0].message;
    let toolcall = responsemsg.tool_calls;
    if (toolcall) {
      console.log("** tool/function was called by LLM ** ");

        for(const tool of toolcall){
             const functionName = tool.function.name;
            const functionToCall = availableFunctions[functionName];
            const functionArgs = JSON.parse(tool.function.arguments);
            const functionResponse = await functionToCall({qn:functionArgs.qn});

            context.push({
                tool_call_id: tool.id,
                role: "tool",
                name: functionName,
                content: functionResponse ?  (typeof functionResponse ==="string" ? functionResponse : JSON.stringify(functionResponse) ) : "No result",
            });

            
        const secondResponse = await groq.chat.completions.create({
            model: "openai/gpt-oss-20b",
            messages: context,
        });

        if(secondResponse){
            const final_res=secondResponse.choices[0].message.content
            console.log(final_res);

            context.push({
                role:"assistant",
                content:final_res
            })
            
            
        }
        }

    }else{
        //no toolcall so simply print response
        if (response) {
        console.log(response || "");
          context.push({
            role: "assistant",
            content: response,
          });
        }
    }

  } catch (error) {
    console.log("some error occured ", error);
  }
}

async function callModel() {
  while (true) {
    let qn = readlinesync.question("Enter your qn -> ");
    if (qn.trim().toLowerCase() === "exit") {
      return;
    }

    await main(qn);
  }
}
callModel();

const key = process.env.APIKEY;
// console.log(key);
