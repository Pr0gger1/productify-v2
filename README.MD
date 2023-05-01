# О проекте

**Productify** - это ToDo веб-приложение, которое поможет пользователю планировать свой день. 
Данный проект является курсовой работой.

## Участники проекта
   [gfroge](https://github.com/gfroge) •
   [Pr0gger1](https://github.com/Pr0gger1) •
   [LilYxa](https://github.com/LilYxa)

## Установка зависимостей и настройка firebase
1. Установите необходимые для работы проекта зависимости _npm_ из `package.json`.
 
        npm i

2. Установите _firebase-tools_ глобально на свой компьютер.

        npm i -g firebase-tools

3. Авторизуйтесь в свой firebase аккаунт
        
        firebase login

4. Инициализируйте firebase в проекте

        firebase init
   ![img.png](https://miro.medium.com/v2/resize:fit:828/format:webp/1*x0PQ11A5zbE9yxH5bs8inw.png)
   ![img.png](https://miro.medium.com/v2/resize:fit:828/format:webp/1*0_CicrLFuPefpv79mMm6Ew.png)

   Используя пробел, выберите "Functions" и "Hosting", нажмите Enter
   Выберите "Use an existing project", затем выберите свой проект, нажмите Enter
   Далее следуйте скриншоту выше


5. После установки всех зависимостей и настройки firebase необходимо прописать в файле конфигурации `.env` свои данные firebase и т. д.

## Запуск проекта на dev сервере
Запуск проекта осуществляется из корневого каталога проекта командой:

    npm run start
---
## Деплой проекта
   Деплой проекта на хостинг firebase осуществляется командой:
   
      npm run deploy

При желании можно загружать production build также и на github, что настраивается в `firebase init` в разделе **Project Setup**