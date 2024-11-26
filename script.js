const changeThemeBtn = document.querySelector('#change-theme')

changeThemeBtn.addEventListener('change', () => {
   document.body.classList.toggle('dark')
})