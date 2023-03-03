# Description:

# Steps to run app:

## - First of all initialize DB with sequlize model in the project after that you can import data from csv file or register new users via API:

[CSV TABLE](sql-db.csv)

## - Clone the repository:

### `git clone https://github.com/Blckvia/users-api`

## - How to run project:

### 1. In the project directory, you need to go to:<br> `server/util/database.js` <br>and fill your database settings to connect. <br>2. After that you can run the server:

### `npm start`

<br>

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

# Тестовое задание для соискателя backend Node.js

### Разработайте API используя следующий стек технологий:

-     Node.js DONE

-     Express.js DONE

-     MySQL DONE

### Ваше API должно иметь следующие методы:

-     Регистрация пользователя (POST /user/register) DONE
-     Авторизация пользователя (POST /user/login) DONE
-     Редактирование пользователя (PUT /profile/[id]) DONE
-     Получение пользователя (GET /profile/[id]) DONE
-     Получение всех пользователей с пагинацией (GET /profiles?page=1, 10 на страницу) DONE

### Требования:

-     У каждого пользователя должно быть ID, Имя, Фамилия, Email, Пароль, Пол (Мужской, Женский), Фото, Дата регистрации. DONE

-     При регистрации указывает только Имя, Email, Пароль. DONE

-     При редактировании можно менять всю информацию кроме ID, Пароля, Дата регистрации. DONE

-     При получение всех пользователей с пагинацией сортировать по дате регистрации. DONE

-     В базе данных хранить только название файла, все фото должны лежать в папке и раздаваться статически. DONE

### Хорошо если будет:

-     Валидация входных параметров DONE

-     Используется ORM (Любая) DONE Sequelize was used;

-     Используется JWT DONE

-     Пароль будет хранится как хеш DONE

-     Проверка фото по размеру, и формату (до 10 мб, .jpg, .png) DONE

-     Весь код не будет в контроллерах. I hope so. DONE
