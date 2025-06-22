function sum({a,b}){
    return a+b
}

const sumdeclaration={
    name:"sum",
    description:"this takes 2 arguments, a and b, calculates their sum and return them",
    parameters:{
        type:"Object",
        properties:{
            a:{
                type:"Number",
                description:"this is the first number that user enters"
            },
            b:{
                type:"Number",
                description:"this is the second number that user enters"
            }
        },
        required:['a','b']

    }
}

function isprime({num}){
    if(num<=1) return false;
    if(num==2) return true

    for(let i=2;i<=Math.sqrt(num);i++){
        if(num % i ==0){
            return false;
        }
    }

    return true;

}

const primedeclaration={
    name:"isprime",
    description:"this takes 1 argument a number and checks whether it is prime or not",
    parameters:{
        type:"Object",
        properties:{
            num:{
                type:"Number",
                description:"this is the  number that user enters"
            },
            
        },
        required:['num']

    }
}

function factorial({n}){
    if(n<=1) return 1;
    // return n*factorial(n-1)
    let ans=1;
    for(let i=n;i>=1;i--){
        ans*=i;
    }
    return ans
}


const factorialdeclaration={
    name:"factorial",
    description:"this takes 1 argument a number and finds factorial of it",
    parameters:{
        type:"Object",
        properties:{
            n:{
                type:"Number",
                description:"this is the  number that user enters"
            },
            
        },
        required:['n']

    }
}

export {factorial, sum, isprime, factorialdeclaration, sumdeclaration, primedeclaration}


// const crypto_key="19a6fee2-adf6-40cb-827e-f9ac4eb8e273"