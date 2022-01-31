const slides = [...document.getElementsByClassName('slider__item')]; //Переменная для хранения DOM-элемента карточки слайдера
const sliderInner = document.querySelector('.slider__inner');       //Переменная для хранения DOM-элемента внутреннего блока-контейнера содержимого слайдера
const slidesImg = [...document.getElementsByClassName('item-img')]; //Переменная для хранения DOM-элемента изображения внутри карточки слайдера
const sliderInfoBand = [...document.getElementsByClassName('info__band')]; //Переменная для хранения DOM-элемента названия группы в слайдере
const sliderInfoName = [...document.getElementsByClassName('info__name')]; //Переменная для хранения DOM-элемента названия песни в слайдере
const sliderInfoDuration = [...document.getElementsByClassName('info__duration')]; //Переменная для хранения DOM-элемента информации о длительности в слайдере
const sliderInfoTrack = [...document.getElementsByClassName('item__audio')]; //Переменная для хранения DOM-элемента аудио-файла в слайдере
const albumImg = document.querySelector('.album-image-box img'); //Переменная для хранения DOM-элемента блока-контейнера для картинки в панели управления треком
const trackName = document.querySelector('.track__name'); //Переменная для хранения DOM-элемента названия песни в панели управления треком
const bandName = document.querySelector('.band__name'); //Переменная для хранения DOM-элемента названия группы в панели управления треком
const mainAudio = document.getElementById('main-audio'); //Переменная для хранения DOM-элемента играющего в текущий момент трека
const playButton = document.querySelector('.controls__item_play-button'); //Переменная для хранения DOM-элемента кнопки, запускающей трек
const pauseButton = document.querySelector('.controls__item_pause-button'); //Переменная для хранения DOM-элемента кнопки, останавливающей трек
const recPlay = [...document.getElementsByClassName('item__play')]; //Переменная для хранения DOM-элемента кнопки внутри слайдера, запускающей трек
const recPause = [...document.getElementsByClassName('item__pause')]; //Переменная для хранения DOM-элемента кнопки внутри слайдера, останавливающей трек
const nextTrackButton = document.querySelector('.controls__item_next-track-button'); //Переменная для хранения DOM-элемента кнопки, запускающей следующий трек
const prevTrackButton = document.querySelector('.controls__item_prev-track-button'); //Переменная для хранения DOM-элемента кнопки, запускающей предыдущий трек
const progressBar = document.querySelector('.progress-bar'); //Переменная для хранения DOM-элемента прогресс-бара
const progressArea = document.querySelector('.progress-area'); //Переменная для хранения DOM-элемента блока-контейнера для прогресс-бара
const itemsControls = [...document.getElementsByClassName("item__controls")];

function pad(n) { //Если число меньше 10, добавляет в начало числа 0
    if (n < 10) //Если число меньше 10
        return "0" + n; //К числу слева добавляется 0
    return n; //Функция возвращает измененное число
}

function updateRec(){ //Обновляет блок с рекомендациями
    let indexes = [4, 13, 17]; //Инициализация массива со случайными числами от 0 до 18
    for(let i = 0; i < slidesImg.length; i++){ //Проходим по всем элементам в слайдере
        slidesImg[i].src = `./Resources/Images/${allTracks[indexes[i]].img}.jpg` //Случайным образом выбираем и устанавливаем обложку альбома в карточке слайдера
        sliderInfoBand[i].innerHTML = allTracks[indexes[i]].artist; //Случайным образом выбираем и устанавливаем название группы в карточке слайдера
        sliderInfoName[i].innerHTML = allTracks[indexes[i]].name; //Случайным образом выбираем и устанавливаем название песни в карточке слайдера
        sliderInfoTrack[i].src = `./Resources/Tracks/${allTracks[indexes[i]].src}.mp3`; //Случайным образом выбираем и устанавливаем трек в карточке слайдера
        sliderInfoTrack[i].onloadedmetadata = () =>{
            let minutes = Math.floor((sliderInfoTrack[i].duration % 3600)/60); //Получаем минуты
            let sec = sliderInfoTrack[i].duration % 60; //Получаем секунды
            sliderInfoDuration[i].innerHTML = `${minutes.toFixed(0)}:${pad(sec.toFixed(0))}`; //Записываем в поле с длительностью трека в карточке слайдера полученные значения минут и секунд
        }
        itemsControls[i].setAttribute("number", indexes[i]);
    }
}
let currentMusicIndex = JSON.parse(localStorage.getItem('current'));
let musicIndex = currentMusicIndex || Math.floor(Math.random() * allTracks.length); //Переменная, в которой хранится индекс трека в массиве объектов                                                                                                                                    //Иначе musicIndex присваивается значение из хранилища localStorage

window.addEventListener('load', () =>{ //Регистрируем событие load на глобальном объекте window и подгружаем данные о треке при загрузке окна браузера
    loadMusic(musicIndex); //Загружаем трек
    playingNow();
    updateRec();
    getText(bandName.innerHTML, trackName.innerHTML);
    setPlaylistsTracksAmount();
    styleFavoriteButton();
})

function loadMusic(indexNumb){ //Загружает основную информацию о треке
    trackName.innerHTML = allTracks[indexNumb].name; //Передает в панель управления название песни
    bandName.innerHTML = allTracks[indexNumb].artist; //Передает в панель управления название группы
    albumImg.src = `./Resources/Images/${allTracks[indexNumb].img}.jpg`; //Передает в панель управления обложку альбома
    albumImg.setAttribute("album", allTracks[indexNumb].album);
    albumImg.setAttribute("imgSource", allTracks[indexNumb].img);
    mainAudio.src = `./Resources/Tracks/${allTracks[indexNumb].src}.mp3` //Передает путь до музыкального файла текущего трека
    mainAudio.setAttribute("trackId", indexNumb);
    getText(bandName.innerHTML, trackName.innerHTML);
    styleFavoriteButton();
}

function playMusic(play, pause, audio) { //Включает текущий трек
    audio.play(); //Воспроизведение аудиодорожки
    play.classList.remove('active'); //Из списка классов кнопки проигрывания удаляется класс "active"
    pause.classList.add('active'); //В список классов кнопки паузы добавляется класс "active"
}

function pauseMusic(play, pause, audio) { //Ставит на паузу текущий трек
    audio.pause(); //Остановка аудиодорожки
    pause.classList.remove('active'); //Из списка классов кнопки паузы удаляется класс "active"
    play.classList.add('active'); //В список классов кнопки проигрывания добавляется класс "active"
}

function nextTrack() { //Запускает следующий по списку трек
    musicIndex++;
    musicIndex > allTracks.length - 1 ? musicIndex = 0 : musicIndex; //Если трек является последним в списке, запускается нулевой трек
    updateLocalStorageData("current", musicIndex);
    currentNow();
    playMusic(playButton, pauseButton, mainAudio);
}

function prevTrack() { //Запускает предыдущий по списку трек
    musicIndex--;
    musicIndex < 0 ? musicIndex = allTracks.length - 1 : musicIndex; //Если трек является последним в списке, запускается последний в списке трек
    updateLocalStorageData("current", musicIndex);
    currentNow();
    playMusic(playButton, pauseButton, mainAudio);
}

function shuffle () {
    let randIndex = Math.floor(Math.random() * allTracks.length);

    do{
        randIndex = Math.floor(Math.random() * allTracks.length); //Индекс следующего трека выбирается случайным образом
    }while(musicIndex === randIndex ); //Пока индекс текущего трека равен случайному числу
    musicIndex = randIndex; //Значению текущего трека присваивается случайное число
    currentNow(); //Загрузка основной информации о треке
    playMusic(playButton, pauseButton, mainAudio); //Воспроизведение трека
}

function repeat () {
    mainAudio.currentTime = 0;
    loadMusic(musicIndex);
    playMusic(playButton, pauseButton, mainAudio);
}

playButton.addEventListener('click', () =>{
    currentNow();
    playMusic(playButton, pauseButton, mainAudio);
    styleLiPlayButton('<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"></path></svg>', listOfTracks);
    styleLiPlayButton('<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"></path></svg>', currentPlaylist);
})

pauseButton.addEventListener('click', () =>{
    currentNow();
    pauseMusic(playButton, pauseButton, mainAudio); //Остановка текущего трека
    styleLiPlayButton('<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>', listOfTracks);
    styleLiPlayButton('<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>', currentPlaylist);
})

sliderInner.addEventListener('click', (e) => { //Регистрация события "click" внутри блока-контейнера для слайдера с рекомендациями и запуск трека по клику на карточку слайдера
    for(let i = 0; i < slides.length; i++){  //Цикл от 0 до значения количества карточек в слайдере
        pauseMusic(recPlay[i], recPause[i], mainAudio); //Каждый трек из карточки в слайдере ставится на паузу
    }
    let target = e.target.closest('div'); //Получение ближайшего тега <span>, по на котором произошло событие "click"
    if(target.matches(".item__controls")){ //Если в списке классов элемента, на котором произошло событие, содержится класс "item__play"
        if(!target.classList.contains("playing")){
            target.classList.add("playing");
            if(trackName.innerText !== sliderInfoName[itemsControls.indexOf(target)].innerText){
                recPlay[itemsControls.indexOf(target)].classList.remove('active'); //Из списка классов кнопки проигрывания в карточке слайдера удаляется класс "active"
                recPause[itemsControls.indexOf(target)].classList.add('active'); //В список классов кнопки паузы в карточке слайдера добавляется класс "active"
                let currentSlideAudioNumber = +target.getAttribute("number");
                updateLocalStorageData("current", currentSlideAudioNumber);
                musicIndex = currentSlideAudioNumber;
                currentNow();
                playMusic(playButton, pauseButton, mainAudio); //Запуск текущего трека
            }else{
                playMusic(playButton, pauseButton, mainAudio); //Запуск текущего трека
                recPlay[itemsControls.indexOf(target)].classList.remove('active'); //Из списка классов кнопки проигрывания в карточке слайдера удаляется класс "active"
                recPause[itemsControls.indexOf(target)].classList.add('active');  //В список классов кнопки паузы в карточке слайдера добавляется класс "active"
                }
        }else{
            target.classList.remove("playing");
            pauseMusic(playButton, pauseButton, mainAudio); //Остановка текущего трека
            recPlay[itemsControls.indexOf(target)].classList.add('active'); //В список классов кнопки проигрывания в карточке слайдера добавляется класс "active"
            recPause[itemsControls.indexOf(target)].classList.remove('active'); //Из списка классов кнопки паузы в карточке слайдера удаляется класс "active"
        }
    }
})

nextTrackButton.addEventListener('click', () => { //Регистрация события "click" на кнопке проигрывания следующего трека и воспроизведение следующего трека
    if(shuffleButton.classList.contains('shuffled')) {
        shuffle();
    } else {
        nextTrack();
    }
})

prevTrackButton.addEventListener('click', () => {  //Регистрация события "click" на кнопке проигрывания предыдущего трека и воспроизведение предыдущего трека
    if(shuffleButton.classList.contains('shuffled')) {
        shuffle();
    } else {
        prevTrack();
    }
})

mainAudio.addEventListener('timeupdate', (e) => {  //Регистрация события "timeupdate" на главном теге <audio> и изменение текущего времени трека
    const currentTime = e.target.currentTime; //Текущее время трека
    const duration = e.target.duration; //Общая продолжительность трека
    let progressWidth = (currentTime / duration) * 100; //Ширина прогресс-бара
    progressBar.style.width = `${progressWidth}%`; //Элементу progressBar задается значение ширины, хранящееся в перменной progressWidth

    let trackCurrentTime = document.querySelector('.current-time'); //Получение DOM-элемента, в котором хранится текущее время трека
    let trackDuration = document.querySelector('.duration'); //Получение DOM-элемента, в котором хранится общая длительность трека

    mainAudio.addEventListener('loadeddata', () => { //Регистрация события "loadeddata" на главном теге <audio> и получение данных о длительности трека
        let minutes = Math.floor((mainAudio.duration / 60)); //Вычисление минут
        let sec = Math.floor(mainAudio.duration % 60); //Вычисление секунд
        trackDuration.innerHTML = `${minutes}:${pad(sec)}` //В DOM-элемент, отображающий длительность трека, передается значение длительности трека в формате "минуты:секунды"
    });

    let minutesCurrent = Math.floor(mainAudio.currentTime/60); //Вычисление минут у текущего времени трека
        let secCurrent = Math.floor(mainAudio.currentTime % 60); //Вычисление секунд у текущего времени трека
        trackCurrentTime.innerHTML = `${minutesCurrent}:${pad(secCurrent)}` ////В DOM-элемент, отображающий текущее время трека, передается значение текущего времени трека в формате "минуты:секунды"
})

progressArea.addEventListener('click', (e) => { //Регистрация события "click" на прогресс-баре и изменение текущего времени трека по клику на прогресс-бар
    let progressBarWidthVal = progressArea.clientWidth; //Получение ширины прогресс-бара
    let clickedOffSetX = e.offsetX; //Получение значения отступа слева по оси X до места, по которому произошел клик
    let songDuration = mainAudio.duration; //Получение общей продолжительности трека

    mainAudio.currentTime = (clickedOffSetX / progressBarWidthVal) * songDuration; //Определение текущего времени трека, исходя из ширины прогресс-бара, отступа и продолжительности трека

    //playMusic(playButton, pauseButton, mainAudio);
})

const repeatButton = document.querySelector('.controls__item_repeat-track-button'); //Получение DOM-элемента кнопки повтора трека
const shuffleButton = document.querySelector('.controls__item_shuffle-button'); //Получение DOM-элемента кнопки перемешивания очереди треков

repeatButton.addEventListener('click', () => { //Регистрация события "click" на кнопке повтора, установка маркера повтора и стилизация кнопки
    if(!repeatButton.classList.contains('repeated')){ //Если в списке классов кнопки повтора есть класс "repeated"
        repeatButton.classList.add('repeated'); //В список классов кнопки повтора добавляется класс "repeated"
        repeatButton.innerHTML = '<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4zm-4-2V9h-1l-2 1v1h1.5v4H13z"></path></svg>'; //Меняется иконка кнопки повтора
    }else{  //Иначе
        repeatButton.classList.remove('repeated'); //Из списка классов кнопки повтора удаляется класс "repeated"
        repeatButton.innerHTML = '<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M149.3 152h213.3v62.4l85.3-83.2L362.7 48v62.4h-256v124.8h42.7V152zm213.4 208H149.3v-62.4L64 380.8l85.3 83.2v-62.4h256V276.8h-42.7V360z"></path></svg>'; //Меняется иконка кнопки повтора
    }

})

shuffleButton.addEventListener('click', () => { //Регистрация события "click" на кнопке перемешивания очереди треков и установка маркера перемешивания
    if(shuffleButton.classList.contains('shuffled')){ //Если в списке классов кнопки перемешивания есть класс "shuffled"
        shuffleButton.classList.remove('shuffled'); //Из списка классов кнопки перемешивания удаляестя класс "shuffled"
    }else{ //Иначе
        shuffleButton.classList.add('shuffled'); //В список классов кнопки перемешивания добавляется класс "shuffled"
    }
})

mainAudio.addEventListener('ended', () => { //Регистрация события "ended" на главном теге <audio> и запуск действий при окончании трека
    if(repeatButton.classList.contains('repeated')){ //Если в списке классов кнопки повтора есть класс "repeated"
       repeat();
    }else if(shuffleButton.classList.contains('shuffled')){ //Если же в списке классов кнопки перемешивания очереди есть класс "shuffled"
       shuffle();
    }else{ //Иначе
        nextTrack(); //Запуск следующего трека
    }
})

const volumeSlider = document.getElementById('volume__slider'); //Получение DOM-элемента индикатора громкости
const outputContainer = document.querySelector('.volume__output'); //Получение DOM-элемента, выводящего значение громкости в процентах на экран
outputContainer.innerHTML = volumeSlider.getAttribute('value'); //Получение числового значения громкости у индикатора громкости
volumeSlider.style.setProperty('--volume-slider-width', `${volumeSlider.value = volumeSlider.getAttribute('value')}%`) //Установка значения ширины индикатора громкости в зависимости от числового значения

volumeSlider.addEventListener('input', (e) => { //Регистрация события "input" на индикаторе громкости и стилизация иконки кнопки громкости
  const value = e.target.value; //Получение числового значения громкости
  outputContainer.textContent = value; //Изменение значения громкости в тектовом контейнере
  mainAudio.volume = value / 100; //Изменение громкости основной аудиодорожки
  volumeSlider.style.setProperty('--volume-slider-width', `${volumeSlider.value}%`); //Установка значения ширины у индикатора громкости
  if(value <= 0){ //Если значение громкости равно 0
    //Иконка кнопки громкости меняется на "без звука"
     volumeButton.innerHTML = '<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 1.596a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M9.146 5.146a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"></path></svg>'
  }else if(value >= 1 && value < 68){ //Если же значение громкости между 1 и 67
    //Иконка кнопки громкости меняется на "средняя громкость"
      volumeButton.innerHTML = '<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"></path><path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"></path></svg>'
  }else{ //Иначе иконка кнопки громкости меняется на "высокая громкость"
      volumeButton.innerHTML = '<svg stroke="currentColor" fill="#fff" stroke-width="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"></path><path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"></path></svg>'
  }
});

const volumeButton = document.querySelector('.tools__item_volume-button'); //Получение DOM-элемента кнопки громкости
const volumeContainer = document.querySelector('.volume__container'); //Получение DOM-элемента блока-контейнера для индикатора громкости

volumeButton.addEventListener('click', () => { //Регистрация события "click" на кнопке громкости и управление отображением индикатора громкости на экране
    volumeContainer.classList.toggle('show'); //При нажатии на кнопку громкости, если в списке классов контейнера есть класс "show", то он удаляется, иначе - добавляется
})

document.addEventListener('click', function(e) { //Регистрация события "click" на объекте document
    //Если элемент, на котором сработало событие, не является кнопкой громкости, индикатором громкости и блоком-контейнером для индикатора громкости
    if(e.target.closest('span') !== volumeButton && e.target !== volumeSlider && e.target !== volumeContainer){
        volumeContainer.classList.remove('show'); //Блок-контейнер для индикатора громкости скрывается
    }
    if(e.target.closest('span') !== optionsButton){  //Если элемент, на котором сработало событие, не является кнопкой "О треке"
        aboutTrack.classList.add('hide'); //Блок с информацией о треке скрывается
    }
});

const optionsButton = document.querySelector('.tools__item_options-button'); //Получение DOM-элемента кнопки "О треке"
const aboutTrack = document.querySelector('.about-track__container'); //Получение DOM-элемента блока с информацией о треке


optionsButton.addEventListener('click', () => { //Регистрация события "click" на кнопке "О треке" и управление отображением блока-контейнера на странице
    aboutTrack.classList.toggle('hide'); //Отображение/скрытие блока с информацией о треке в зависимости от наличия в списке классов класса "hide"
})

const trackListContainer = document.querySelector('.track-list__container'); //Получение DOM-элемента блока-контейнера для списка треков
const mainContentInnerHeader = document.querySelector('.main-content__inner h2'); //Заголовок главного содержимого страницы

const queueButton = document.querySelector('.tools__item_queue-button'); //Получение DOM-элемента кнопки "Список треков" на панели управления

queueButton.addEventListener('click', () => { //Регистрация события "click" на кнопке "Список треков" на панели управления и отображение списка треков
    styleCurrentSidebarElement(document.querySelector(".sidebar__item_tracks"))
    ShowCurrentPage(trackListContainer, 'Треки'); //Отображение блока со списком треков
})

const listOfTracks = trackListContainer.querySelector('.list-of-tracks'); //Получение DOM-элемента списка треков

function getValuesArray (keyName, searchArray) {
    const valuesArray = [];
    searchArray.forEach((item) => {
        for (let key in item) {
            if (key === keyName) {
                valuesArray.push(item[key]);
            }
        }
    });

    return valuesArray;
}

function createTrackListTemplate(array, ul, container){
    const songNames = getValuesArray("name", allTracks);
    const trackTemplate = document.querySelector("#track-template");
    ul.innerHTML = '';

    for(let i = 0; i < array.length; i++){
        const track = trackTemplate.content.cloneNode(true).children[0];

        track.setAttribute("li-index", `${i}`);
        track.setAttribute("track-id", `${songNames.indexOf(array[i]["name"])}`);

        const trackNumber = track.querySelector(".item__number");
        trackNumber.textContent = `${i + 1}`;

        const trackImg = track.querySelector(".item__cover");
        trackImg.setAttribute("src", `./Resources/Images/${array[i].img}.jpg`);

        const trackName = track.querySelector(".item__name");
        const trackArtist = track.querySelector(".item__artist");
        const trackAlbum = track.querySelector(".item__album");

        trackName.textContent = `${array[i].name}`;
        trackArtist.textContent = `${array[i].artist}`;
        trackAlbum.textContent = `${array[i].album}`;

        const trackAudio = track.querySelector("audio");
        trackAudio.setAttribute("class", `song-${i}`);
        trackAudio.setAttribute("src", `./Resources/Tracks/${array[i].src}.mp3`);

        const trackDuration = track.querySelector(".item__duration");
        trackDuration.setAttribute("id", `song-${i}`);


        ul.append(track); //Вставка элемента в список

        let liAudioDuration = track.querySelector(`#song-${i}`);
        let liAudioTag = track.querySelector(`.song-${i}`);

        liAudioTag.addEventListener('loadeddata', () => { //Регистрация события "loadeddata" на главном теге <audio> и получение данных о длительности трека
            let minutes = Math.floor((liAudioTag.duration / 60)); //Вычисление минут
            let sec = Math.floor(liAudioTag.duration % 60); //Вычисление секунд
            liAudioDuration.innerHTML = `${minutes}:${pad(sec)}` //В DOM-элемент, отображающий длительность трека, передается значение длительности трека в формате "минуты:секунды"
        })
    }
}
createTrackListTemplate(allTracks, listOfTracks, trackListContainer);

function styleLiPlayButton(inner, targetList){
    let currentLi = targetList.querySelector(".playing");
    if (currentLi) {
        currentLi.querySelector('.li__play').innerHTML = inner;
    }
}

function playingNow() {
    let allLiTags = document.getElementsByClassName("list-of-tracks__item");

    for (let i = 0; i < allLiTags.length; i++){
        if (+allLiTags[i].getAttribute("track-id") === musicIndex) {
            console.log(+allLiTags[i].getAttribute("track-id"));
            allLiTags[i].classList.add("playing");
        }else if (allLiTags[i].classList.contains("playing")) {
            allLiTags[i].classList.remove("playing");
        }
    }
}

function updateLocalStorageData(key, elem){
    localStorage.setItem(key, JSON.stringify(elem));
}

listOfTracks.addEventListener('click', (e) => {
    let targetElement = e.target.closest("li");
    clicked(targetElement, listOfTracks);
});

function currentNow () {
    let lastCurrentPosition = document.querySelectorAll('.current');
    let targetTracks= document.querySelectorAll(`li[track-id="${musicIndex}"]`);
    console.log(targetTracks);

    targetTracks.forEach((li) => {
        if(li.classList.contains('current')){
            pauseMusic(playButton, pauseButton, mainAudio);
            li.classList.remove('current');
            li.querySelector('.li__play').innerHTML = '<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>'
        }else{
            if(trackName.innerHTML !== li.querySelector('.item__name').innerHTML){
                loadMusic(musicIndex);
                playingNow();
                playMusic(playButton, pauseButton, mainAudio);
                li.querySelector('.li__play').innerHTML = '<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"></path></svg>';
            }else{
                playMusic(playButton, pauseButton, mainAudio);
                li.querySelector('.li__play').innerHTML = '<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-80 600c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"></path></svg>';
            }
            li.classList.add('current');
        }
    });

    if (lastCurrentPosition) {
        lastCurrentPosition.forEach((item) => {
            item.querySelector('.li__play').innerHTML = '<svg stroke="currentColor" fill="#0FA750" stroke-width="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm144.1 454.9L437.7 677.8a8.02 8.02 0 0 1-12.7-6.5V353.7a8 8 0 0 1 12.7-6.5L656.1 506a7.9 7.9 0 0 1 0 12.9z"></path></svg>';
            item.classList.remove("current");
        });
    }
}

function clicked(elem) {
    musicIndex = +elem.getAttribute("track-id");
    updateLocalStorageData("current", musicIndex);
    currentNow();

}

const settings = document.querySelector('.settings__container'); //Получение DOM-элемента блока-контейнера с настройками
const mainContentInner = document.querySelector('.main-content__inner') //Получение DOM-элемента блока-контейнера с основным содержимым страницы


const sidebarItems = document.querySelector(".sidebar__items");
const recommendations = document.querySelector(".recommendations");


function ShowCurrentPage(elem, header) {
    mainContentInnerHeader.innerHTML = header;
    for(let page of mainContentInner.children){
        if(page.classList.contains("open")){
            page.classList.replace("open", "hide");
        }
    }
    elem.classList.replace("hide", "open");
}

sidebarItems.addEventListener("click", (e) => {
    let target = e.target.closest("li");
    styleCurrentSidebarElement(target);
    if(target.matches(".sidebar__item_tracks")){
        ShowCurrentPage(trackListContainer, 'Треки');
    }else if(target.matches(".sidebar__item_settings")){
        ShowCurrentPage(settings, 'Настройки');
    }else if(target.matches(".sidebar__item_main")){
        ShowCurrentPage(recommendations, "Рекомендации");
    }else if(target.matches(".sidebar__item_playlists")){
        ShowCurrentPage(playlistsContainer, "Плейлисты");
    }
})

function styleCurrentSidebarElement(targetItem){
    targetItem.classList.add("current-page");
    for(let item of sidebarItems.children){
        if(item !== targetItem){
            item.classList.remove("current-page");
        }
    }
}

const lyricsPopUpContainer = document.querySelector(".lyrics-pop-up__container");
const lyricsPopUpImg = document.querySelector(".lyrics-pop-up__album-icon");
const lyricsPopUpTrackName = document.querySelector(".lyrics-pop-up__track-name");
const lyricsPopUpBandName = document.querySelector(".lyrics-pop-up__band-name");
const lyricsPopUpLyricsText = document.querySelector(".lyrics-pop-up__lyrics");
const lyricsPopUpCloseBtn = document.querySelector(".lyrics-pop-up__close-button");

async function getText(band, track){
    try{
        let data = await fetch(`https://api.lyrics.ovh/v1/${band}/${track}`);
        let response = await data.json();

        document.querySelector(".about-track__item_show-lyrics").style.display = "flex";

        function setText() {
            let resSub = response.lyrics.substring(0, response.lyrics.indexOf("\r"));

            if(resSub.includes("Paroles de la chanson")){
                lyricsPopUpLyricsText.innerHTML =  response.lyrics.replace(resSub, "");
            }else{
                lyricsPopUpLyricsText.innerHTML = response.lyrics;
            }
        }
        function setTrackInfo(band, track){
            lyricsPopUpTrackName.innerHTML = track;
            lyricsPopUpBandName.innerHTML = band;
            lyricsPopUpImg.setAttribute("src", `${albumImg.getAttribute("src")}`);
        }
        setTrackInfo(band, track);
        setText();
    }
    catch{
        document.querySelector(".about-track__item_show-lyrics").style.display = "none";
    }

}

aboutTrack.addEventListener("click", (e) => {
    let target = e.target.closest("button");
    console.log(target);
    if(target.matches(".about-track__item_show-lyrics")){
        lyricsPopUpContainer.classList.add("show");
        document.body.classList.add("locked");
    }
})

lyricsPopUpCloseBtn.addEventListener("click", () => {
    lyricsPopUpContainer.classList.remove("show");
    document.body.classList.remove("locked");
})


const addToFavoritesButton = document.querySelector(".favorite-button");


let currentFavoriteTracks = JSON.parse(localStorage.getItem("favoriteTracks"));
const favoritesArray = currentFavoriteTracks || [];
console.log(favoritesArray);


class PlaylistSongs{
    constructor(trackId, name, artist, album, img, src){
        this.trackId = trackId;
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.img = img;
        this.src = src;
    }
}

addToFavoritesButton.addEventListener("click", () => {
    if(favoritesArray.length === 0){
        favoritesArray.push(new PlaylistSongs(mainAudio.getAttribute("trackId"), trackName.innerHTML, bandName.innerHTML, albumImg.getAttribute("album"), albumImg.getAttribute("imgSource"), `${bandName.innerHTML} - ${trackName.innerHTML}`))
        updateLocalStorageData("favoriteTracks", favoritesArray);
        addToFavoritesButton.classList.add("liked");
    }
    else if(favoritesArray.some(element => element.trackId === mainAudio.getAttribute("trackId"))){
        let targetTrack = favoritesArray.find(element => element.trackId === mainAudio.getAttribute("trackId"));
        favoritesArray.splice(favoritesArray.indexOf(targetTrack), 1);
        updateLocalStorageData("favoriteTracks", favoritesArray);
        addToFavoritesButton.classList.remove("liked");
    }else{
        favoritesArray.push(new PlaylistSongs(mainAudio.getAttribute("trackId"), trackName.innerHTML, bandName.innerHTML, albumImg.getAttribute("album"), albumImg.getAttribute("imgSource"), `${bandName.innerHTML} - ${trackName.innerHTML}`))
        updateLocalStorageData("favoriteTracks", favoritesArray);
        addToFavoritesButton.classList.add("liked");
    }
    setPlaylistsTracksAmount();
    createTrackListTemplate(favoritesArray, currentPlaylist, currentPlaylistContainer)
})

let playlistsArray = [];
playlistsArray[0] = favoritesArray;
let playlistsTracksAmount = document.querySelector(".playlists__tracks-amount");

function setPlaylistsTracksAmount(){
    if(favoritesArray.length === 1){
        playlistsTracksAmount.innerHTML = `${favoritesArray.length} трек`;
    }else if((favoritesArray.length === 2) || (favoritesArray.length === 3) || (favoritesArray.length === 4)){
        playlistsTracksAmount.innerHTML = `${favoritesArray.length} трека`;
    }else{
        playlistsTracksAmount.innerHTML = `${favoritesArray.length} треков`;
    }
}

const playlistsContainer = document.querySelector(".playlists__container");

const currentPlaylistContainer = document.querySelector('.playlists__current-playlist-container');
const currentPlaylistName = document.querySelector('.playlists__current-playlist-name');
const currentPlaylist = document.querySelector('.playlists__current-playlist');

const playlistList = document.querySelector('.playlists__list');
const playlistItem = document.getElementsByClassName('playlists__item');
console.log(playlistItem);
const playlistsDivider = document.querySelector('.playlists__divider');

// for(let i = 1; i < playlistsArray.length; i++){
//     playlistItem[i].setAttribute('playlist-Id', i);
// }

playlistList.addEventListener('click', (e) => {
    let target = e.target.closest('li');
    let currentPlaylistIndex = target.getAttribute('playlist-id');
    showPlaylist(playlistsArray[currentPlaylistIndex], target);

})

function checkInFavorites () {
   const idArray = getValuesArray("trackId", favoritesArray);
   return idArray.includes(String(mainAudio.getAttribute("trackId")))
}

function styleFavoriteButton () {
    if (checkInFavorites()) {
        addToFavoritesButton.classList.add("liked");
    } else {
        addToFavoritesButton.classList.remove("liked");
    }
}

function showPlaylist(playlist, target){
    if(playlist.length > 0){
        currentPlaylist.innerHTML = '';
        playlistsDivider.classList.remove('hide');
        currentPlaylistContainer.classList.remove('hide');
        currentPlaylistName.innerHTML = target.getAttribute('name');
        createTrackListTemplate(playlist, currentPlaylist, currentPlaylistContainer);
    }
}

currentPlaylist.addEventListener('click', (e) => {
    let targetElement = e.target.closest("li");
    clicked(targetElement);
});

const searchInput = document.querySelector(".track-list__search-input");

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    [...listOfTracks.children].forEach((item) => {
        const isVisible = item.querySelector(".item__name").innerText.toLowerCase().includes(value) ||
            item.querySelector(".item__artist").innerText.toLowerCase().includes(value) ||
            item.querySelector(".item__album").innerText.toLowerCase().includes(value);

        item.classList.toggle("hide", !isVisible);
    })

    // const filteredTracks= allTracks.filter((item) => {
    //     return (item.name.toLowerCase().includes(value) ||
    //         item.artist.toLowerCase().includes(value) ||
    //         item.album.toLowerCase().includes(value));
    // });

    //createTrackListTemplate(filteredTracks, listOfTracks, trackListContainer);
    //playingNow();
})

