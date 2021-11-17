import spoller from './libs/spoller';
import slider from './libs/slider';
import dynamicAdaptive from './libs/dynamicAdaptive';
import def from './services/default';

import list from './components/list'


import burger from './modules/burger';
import themeSwitcher from './modules/themeSwitcher'

// import getResource from './services/request'


window.onload = function (){
    list();
    def();
    burger();
    
    // spoller();
    // slider();
    dynamicAdaptive();
    themeSwitcher();
}