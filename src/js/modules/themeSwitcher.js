const themeSwitcher = ()=>{
    
    const switcher = document.querySelector('.header__logo');
    const body = document.querySelector('body');

    switcher.addEventListener('click',function(e){
        body.classList.toggle('theme-light')
    })
    

}
export default themeSwitcher;