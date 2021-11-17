const list = ()=>{
   
    const input = document.querySelector('.header__input'),
          btn = document.querySelector('.header__btn'),
          items = Array.from(document.querySelectorAll('.main__item')),
          wrapper = document.querySelector('.main__body');
    let storage = [...items];
    let i = 0;
    function createList(data) {
        if(!input.value == ''){
            let item = document.createElement('div');
            item.classList.add('main__item');
            item.dataset.id = i++

            item.innerHTML = `
                <div class="main__check">
                    <input type="checkbox">
                </div>
                <div class="main__text">${data}</div>
                <div class="main__close _icon-cross"></div>
            `

            wrapper.appendChild(item)
            input.value = ''

            storage.push(item); //add item
            reCount(); //recount number
            
            
        }
    }


    btn.addEventListener('click',function(e){
        createList(input.value)
    })

    input.addEventListener('keydown', function(e){//Click enter
        if(e.code == 'Enter'){
            createList(input.value)
        }
    })



/////////////Work with items



    const wrap = document.querySelector('.main__body'); //wrapper

    wrap.addEventListener('click',function(e){
        const target = e.target;
        
        if(target.closest('.main__item')&& !target.closest('.main__close')){ //active
            target.closest('.main__item').classList.toggle('_active')
            reCount();
        }
        
        if(target.closest('.main__close')){ //remove
            target.closest('.main__item').remove();
            storage.pop(target.closest('.main__item').dataset.id)     
            reCount();
        }
    })   
    


///////////////////////////////////////////////////////////// Works with filter

    const filter = document.querySelector('.filter-main');//Wrapper for all tabs
    const tabBtns = document.querySelectorAll('.filter-main__item');

    function removeDis() {
        storage.forEach(item=>{
            item.classList.remove('_disable');
        })
        tabBtns.forEach(tab=>{
            tab.classList.remove('_active')
        })
    }
    function showActive() {
        storage.forEach(item=>{
            if(item.classList.contains('_active')){ //active - completed
                item.classList.add('_disable');
            }
        })
    }
    function showCompeted() {
        storage.forEach(item=>{
            if(!item.classList.contains('_active')){//active - NOT   completed
                item.classList.add('_disable');
            }
        })
    }


    filter.addEventListener('click',function(e){
        const target = e.target;

        
        if(target.closest('.filter-main__item')){
            removeDis();
            target.classList.add('_active');
        }


        if(target.closest('.filter-main__all')){
            removeDis();
            target.classList.add('_active');
        }
        if(target.closest('.filter-main__active')){
            showActive()
        }
        if(target.closest('.filter-main__completed')){
            showCompeted()
        }

    })
    



/////////////////////////////////////// Work with  bottom btn (cancel, left)

    const clear = document.querySelector('.main__clear'),
          counter = document.querySelector('.main__counter span');

    clear.addEventListener('click',function(e){
        storage.forEach(item=>{
            if(item.classList.contains('_active')){
                item.remove();
            }
        })
        reCount();
    })
    
    function reCount() {
        let active = storage.filter(item => !item.classList.contains('_active')); 
        counter.textContent = active.length;
    }
        
    reCount();

}
export default list;