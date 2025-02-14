try{
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response=>response.json())
        .then(data=>Display(data))
}catch(error){
    console.log(error.name)
}

function addTask(){
    let TaskVal=document.getElementById("inputdata");
    if (TaskVal){
        Display([],TaskVal.value);
        TaskVal.value="";
        searchfunc(); 
    }    
}

let Section=document.getElementById("section");
function Display(data = [], value = null){
    if(data.length){
        data.slice(0,10).forEach(x=>{
        let textDecoration = x.completed ? "line-through" : "none";
        let textColor = x.completed ? "red" : "";
        let templateEle=document.querySelector("template");
        let templateClone=templateEle.content.cloneNode(true);
        let ptag=templateClone.querySelector("p");
        ptag.innerText=x.title;
        ptag.style.textDecoration=textDecoration;
        ptag.style.color=textColor;
        Section.append(templateClone);
    });
    }
    if(value){
    let templateEle=document.querySelector("template");
    let templateClone=templateEle.content.cloneNode(true);
    ptag=templateClone.querySelector("p");
    ptag.innerText=value;
    Section.append(templateClone);
    }
}

let search=document.getElementById("inputdata")
search.addEventListener("keyup",searchfunc);
function searchfunc(){
    let search=document.getElementById("inputdata").value.toLocaleLowerCase();
    let divslist=Array.from(Section.getElementsByClassName("ToDoTasks"));
    divslist.forEach(div=>{
        let taskEle=div.querySelector("p");
        let task=taskEle?taskEle.textContent.toLocaleLowerCase():"";
        if(task.includes(search)){
            div.style.display="flex";
        }else{
            div.style.display="none";
        }
    })
}


function Editfunc(data){
    let div=data.parentElement;
    // console.log(div)
    let a=div.parentElement.querySelector("p");
    // console.log(a);
    let oldtext=a.innerText;
    a.style.textDecoration = "none";
    a.style.color = "white";
    a.innerHTML=`
    <input type="text" placeholder="${oldtext}"/>
    <button onclick=EditSubmit(this)> Submit </button>`
}


function EditSubmit(data){
    //console.log(data);       //<button onclick="EditSubmit(this)"> Submit </button>
    let a=data.parentElement;  //<p><input/><button>Submit</button>
    let b=a.querySelector("input");
    let newtext=b.value||b.placeholder;
    a.innerText = newtext;
}


function CompletedFunc(data){
    let div=data.parentElement;
    let text=div.parentElement.querySelector("p");
    // console.log(text);
    text.style.textDecoration="line-through";
    text.style.color="red";
}

function RemoveFunc(data){
    let div=data.parentElement;
    // console.log(div);
    div.parentElement.remove();
}

