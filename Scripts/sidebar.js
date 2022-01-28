const burgerButton = document.querySelector('.burger-button'); //Переменная для хранения DOM-элемента кнопки-бургера
const sidebar = document.querySelector('.sidebar'); //Переменная для хранения DOM-элемента боковой панели

burgerButton.addEventListener('click', () =>{ //Регистрация события "click" на кнопке-бургере и отображение боковой панели
    sidebar.classList.toggle('close'); //Переключение CSS-класса на боковой панели
    if(sidebar.classList.contains('close')){ //Если с списке классов боковой панели содержится класс "close"
        burgerButton.style.setProperty('--span-color', '#fff'); //Переменная, в которой хранится цвет элементов кнопки-бургера, принимает значение #fff
    }else{
        burgerButton.style.setProperty('--span-color', '#c4c3c3'); //Переменная, в которой хранится цвет элементов кнопки-бургера, принимает значение #c4c3c3
    }
})