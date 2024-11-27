const changeThemeBtn = document.querySelector('#change-theme')
const inputText = document.getElementById('AddTask')
const listContainer = document.querySelector('.list-container')

changeThemeBtn.addEventListener('change', () => {
   document.body.classList.toggle('dark')
})

function AddTask(){
    let li = document.createElement("li")
    li.innerHTML = inputText.value
    listContainer.appendChild(li)
}

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

