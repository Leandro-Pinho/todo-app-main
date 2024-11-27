const changeThemeBtn = document.querySelector('#change-theme')
const inputText = document.getElementById('AddTask')
const listContainer = document.querySelector('.list-container')
const trash = document.getElementById('trash')

changeThemeBtn.addEventListener('change', () => {
   document.body.classList.toggle('dark')
})


inputText.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (inputText.value === '') {
            alert("You must write something")
        } else {
            AddTask()
        }
      }
    }
)

function AddTask(){
    let li = document.createElement("li")
    li.innerHTML = inputText.value
    listContainer.appendChild(li)

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputText.value = ""
}

listContainer.addEventListener("click", function(e){
    /* se existir uma tarefa e para marcar checado, se estiver marcado é para desmarcar */
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        // saveData();
    } else if (e.target.tagName === "SPAN"){ /* se clicar no "x" na tarefa criada vai exclui-la */
        e.target.parentElement.remove();
        // saveData();
    }
}, false);

