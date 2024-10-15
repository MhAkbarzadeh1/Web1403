let inputs=process.argv.slice(2);
let commend=inputs[0];
let controllers = [
    {
        name: "sum",
        func: function sum(a,b){
            return a+b;
        }  
    },
    {
        name: "mul",
        func: function mul(a,b){
            return a*b;
        }
    },
    {
        name: "minus",
        func: function minus(a,b){
            return a-b;
        }
    }
]

controllers.forEach( function(item) {
    if(commend === item.name){
        console.log(item.func(+inputs[1],+inputs[2]))
    }
});

