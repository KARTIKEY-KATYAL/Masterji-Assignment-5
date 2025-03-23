const input = document.getElementById("inputtext");

function markdowntext(){
    const input = document.getElementById("inputtext");
    const inputtext  = input.value
    document.getElementById("outputtext").innerHTML = marked.parse(inputtext);
}

input.addEventListener("input",markdowntext)