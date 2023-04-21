let todoitemsconatiner = document.getElementById("todo-items-containerid");


function getTodoListfromloacalstorage() {
    let stringifiedtodolist = localStorage.getItem("todoList");
    let parsedtodolist = JSON.parse(stringifiedtodolist);
    if (parsedtodolist === null) {
        return [];
    } else {
        return parsedtodolist;
    }
}
let todoList = getTodoListfromloacalstorage();

let todoscount = todoList.length;

function savetodo() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function tochangethstatus(checkboxid, labelid) {
    let checkboxelement = document.getElementById(checkboxid);
    let labelelement = document.getElementById(labelid);
    labelelement.classList.toggle("checked");
    let index = todoList.findIndex(function(eachitem) {
        if (checkboxid === "checkbox" + eachitem.id) {
            return true;
        } else {
            return false;
        }
    });
    let todoobject = todoList[index];
    if (todoobject.ischecked === false) {
        todoobject.ischecked = true;

    } else {
        todoobject.ischecked = false;
    }
}

function onDeleteTodo(todoid) {
    let todoelement = document.getElementById(todoid);
    todoitemsconatiner.removeChild(todoelement);
    let index = todoList.findIndex(function(eachitem) {
        if (todoid === "todo" + eachitem.id) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(index, 1);
}

function createandappend(todo) {
    let todoid = "todo" + todo.id;
    let checkboxid = "checkbox" + todo.id;
    let labelid = "label" + todo.id;

    let todoelement = document.createElement("li");
    todoelement.classList.add("todo-item-conatainer", "d-flex", "flex-row");
    todoelement.id = todoid;
    todoitemsconatiner.appendChild(todoelement);

    let checkboxelement = document.createElement("input");
    checkboxelement.type = "checkbox";
    checkboxelement.id = checkboxid;
    checkboxelement.checked = todo.ischecked;

    checkboxelement.onclick = function() {
        tochangethstatus(checkboxid, labelid);
    };

    checkboxelement.classList.add("checkbox-input");
    todoelement.appendChild(checkboxelement);


    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container", "d-flex", "flex-row");
    todoelement.appendChild(labelcontainer);


    let labelelement = document.createElement("label");
    labelelement.classList.add("checkbox-label");
    labelelement.id = labelid;
    labelelement.htmlFor = checkboxid;
    labelelement.textContent = todo.text;
    if (todo.ischecked === true) {
        labelelement.classList.add("checked");
    }
    labelcontainer.appendChild(labelelement);

    let deleteiconcontainer = document.createElement("div");
    deleteiconcontainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(deleteiconcontainer);

    let deleteicon = document.createElement("p");
    deleteicon.textContent="DELETE";
    deleteicon.onclick = function() {
        onDeleteTodo(todoid);

    };
    deleteiconcontainer.appendChild(deleteicon);
}

function addtodo() {
    let userinput = document.getElementById("userinputtext");
    let uservalue = userinput.value;
    if (uservalue === "") {
        alert("enter the valid text");
        return;
    }
    todoscount = todoscount + 1;
    let newtodo = {
        id: todoscount,
        text: uservalue,
        ischecked: false
    };
    todoList.push(newtodo);
    createandappend(newtodo);
    userinput.value = "";
}
for (let each of todoList) {
    createandappend(each);
}