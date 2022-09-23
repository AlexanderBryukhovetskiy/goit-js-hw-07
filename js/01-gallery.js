//Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного зображення у модальному вікні. Подивися демо відео роботи галереї.
// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька ПІДЗАВДАНЬ:
// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки. https://cdnjs.com/libraries/basicLightbox/5.0.0
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами. https://basiclightbox.electerious.com/
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

// -------------------- РОЗМІТКА ЕЛЕМЕНТІВ ГАЛЕРЕЇ ------------------------
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.
/* 
<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div> 
*/ 
// Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. Заборони цю поведінку за замовчуванням.

//---------------------------------------------------------------------------
//Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. Бібліотекаи basicLightbox містить метод для програмного закриття модального вікна.
//-----------------------------------------------------------------------------

import { galleryItems } from './gallery-items.js';
// Change code below this line
//console.log(galleryItems);

//  -- 1. creating markup ---------
function createImageMarkup (galleryItemsMassiveOfObjs) { 
    return galleryItemsMassiveOfObjs.map( ({preview, original, description}) => {return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </div>`
    })
    .join('');
}

const imagesContainer = document.querySelector("div.gallery");
const imagesMarkup = createImageMarkup(galleryItems);
imagesContainer.insertAdjacentHTML("afterbegin", imagesMarkup);

//--- 2. showing selected image in modal window ---
imagesContainer.addEventListener('click', onImageHandleClick);

function onImageHandleClick (evt){
    evt.preventDefault();

    const isImage = evt.target.classList.contains('gallery__image');
    if ( !isImage ) {return};

    const activeImage = evt.target;
    
    const instance = basicLightbox.create(`
        <div class="modal">
            <img src="${activeImage.dataset.source}"/>
        </div>   
    `)
    instance.show();
   
    //--- 2.1. closing modal window by "Escape" key 
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            instance.close();
            document.removeEventListener("keydown", (e));
        }
    });
}
