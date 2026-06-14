const API = "http://localhost:5000";

let token = "";

async function register() {

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    const res = await fetch(`${API}/register`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password
        })
    });

    const data = await res.json();

    alert(data.message);
}

async function login(){

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const res = await fetch(`${API}/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password
        })
    });

    const data = await res.json();

    token = data.token;

    alert("Login Successful");

    getTasks();
}

async function addTask(){

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch(`${API}/tasks`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        },
        body:JSON.stringify({
            title,
            description
        })
    });

    getTasks();
}

async function getTasks(){

    const res = await fetch(`${API}/tasks`,{
        headers:{
            "Authorization":token
        }
    });

    const tasks = await res.json();

    let output="";

    tasks.forEach(task=>{

        output += `
        <div class="task">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <button onclick="deleteTask('${task._id}')">Delete</button>
        </div>
        `;
    });

    document.getElementById("taskList").innerHTML = output;
}

async function deleteTask(id){

    await fetch(`${API}/tasks/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":token
        }
    });

    getTasks();
}