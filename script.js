const dark = document.getElementById('toggleDark')

dark.addEventListener('click', () => {
  let body = document.body
   body.classList.toggle('dark')
})