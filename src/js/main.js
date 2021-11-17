import spoller from './libs/spoller';
import slider from './libs/slider';
import dynamicAdaptive from './libs/dynamicAdaptive';
import def from './services/default';

import list from './components/list'
import builder from './components/createList'

import burger from './modules/burger';


// import getResource from './services/request'


window.onload = function (){
    list();
    builder();
    def();
    burger();
    
    // spoller();
    // slider();
    dynamicAdaptive();
}