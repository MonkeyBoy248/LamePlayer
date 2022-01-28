const theme_light__toggle = document.getElementById('theme__light'); //Переменная для хранения DOM-элемента переключателя светлой темы
const settingsContainer = document.querySelector('.settings__container ul'); //Переменная для хранения DOM-элемента, в котором находятся переключатели темы
const body = document.body; //Переменная для хранения DOM-элемента body

document.addEventListener('DOMContentLoaded', () => { //Регистрация события "click" на объекте document и получение значения темы
    if(localStorage['theme'] == 'dark'){ //Если в хранилище localStorage по ключу "theme" находится "theme__dark"
        body.classList.replace('light', 'dark'); //В списке классов элемента body класс "light" заменяется на класс "dark"
    }else{
        body.classList.replace('dark', 'light'); //В списке классов элемента body класс "dark" заменяется на класс "light"
    }
})

function SetButtonStatus(elem){ //Устанавливает статус переключателя темы
    localStorage.setItem(elem.getAttribute('name'), elem.getAttribute('currentThemeColor')); //В хранилище localStorage записывается текущее состояние переключателя темы.
                                                                             //Ключом является значение атрибута name, а значением - значение атриута id
}

function GetButtonStatus(item) { //Получает статус переключателя темы
    return localStorage.getItem(item); //Из хранилища localStorage по ключу item
}

window.addEventListener('load', () => { //Регистрация события "load" на глобальном объекте window и устанавливаем положение кнопки в зависимости от темы
    let item = GetButtonStatus('theme'); //Получаем статус переключателя темы
    theme_light__toggle.setAttribute('currentThemeColor', item);
    if(item !== undefined) { //Если переменной item присвоено значение
        if(item === 'light'){
            theme_light__toggle.checked = true;
        }
    }
})

theme_light__toggle.addEventListener('click', () =>{ //Регистрация события "click" на переключателе светлой темы и переключение на светлую тему
    if(!theme_light__toggle.checked){
        switchThemeColor('light', 'dark');
    }else{
        switchThemeColor('dark', 'light');
    }
})

function switchThemeColor(currentColor, targetColor){
    body.classList.replace(currentColor, targetColor);
    theme_light__toggle.setAttribute('currentThemeColor', targetColor);
    SetButtonStatus(theme_light__toggle);
}

