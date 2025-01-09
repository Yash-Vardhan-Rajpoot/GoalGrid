// to hangle dark and light mode
const darkmode=document.querySelector('#dark');
darkmode.addEventListener("click",function(){
    const currentBgColor = document.body.style.backgroundColor;

    if (currentBgColor === "rgb(255, 255, 255)") {
        document.body.style.backgroundColor = "rgb(62, 62, 66)"; 
    } else if (currentBgColor === "rgb(62, 62, 66)") { 
        document.body.style.backgroundColor = "rgb(255, 255, 255)"; 
    }
})
//add task in container
let count=0;
const addbutton=document.querySelector("#add");
addbutton.addEventListener("click",function(){
    count++;
    const inputText=document.getElementById("input").value;
    const container=document.querySelector("#div1");
    const taskElement=document.createElement("h4");
    taskElement.textContent=`${count} - ${inputText}`;
    container.appendChild(taskElement);
    document.querySelector("#input").value="";
})
// deleting the task from comtainer
const deletebutton=document.querySelector("#delete");
deletebutton.addEventListener("click",function(){
    const container=document.querySelector("#div1");
    if(!container.lastElementChild){
        alert("sorry there is no task to delete!");
    }
    else {
        count--;
        container.lastElementChild.remove();
    }
})
