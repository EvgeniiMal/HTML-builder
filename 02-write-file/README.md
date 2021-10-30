## Запись консольного ввода в файл

В файле **index.js** директории **02-write-file** напишите скрипт выводящий в консоль приветствие, ожидающий ввод текста, и записывающий введённый текст в файл.


### Общие правила:

- Запрещается использование любых сторонних модулей
- Каждое из заданий должно запускаться командой node <имя папки задания> выполненной в корневой директории
- Запрещается использование синхронных функций модуля fs такие как ```fs.statSync(path[, options])```, 
```fs.readFileSync(path[, options])``` и другие находящиеся в разделе [synchronous API](https://nodejs.org/api/fs.html#fs_synchronous_api)

### Требования

- [ ] Внутри папки 02-write-file находится 1 файл **index.js**
- [ ] При выполнении команды ```node 02-write-file``` в папке  ```02-write-file``` создаётся текстовый файл, а в консоль выводится приглашение на ввод текста(На ваш выбор)
- [ ] После ввода текста в каталоге ```02-write-file``` введённый текст должен быть записан в созданный ранее файл. Процесс не завершается и ждёт нового ввода.
- [ ] После следующего ввода созданный изначально текстовый файл дополняется новым текстом, процесс продолжает ждать ввод.
- [ ] При нажатии сочетания клавиш ```ctrl + c``` или вводе ```exit``` в консоль выводится прощальная фраза и процесс завершается.


### Цели задания
- Укрепить понимание основ работы событий и потоков в Node.js
- Работа с глобальным объектом process

### Описание
В данном задании вам предстоит написать программу считывающую ваш консольный ввод до момента принудительного завершения процесса ```ctrl + c``` или ввода ключевого слова **exit**. Порядок действий для выполнения задачи:
1. Импорт всех требуемых модулей.
2. Создание потока записи в текстовый файл
3. Вывод в консоль приветственного сообщения
4. Ожидание ввода текста пользователем, с дальнейшей проверкой ввода на наличие ключевого слова **exit**
5. Запись текста в файл
6. Ожидание дальнейшего ввода
7. Реализация прощального сообщения при остановке процесса

### Советы

Для успешного выполнения данного таска вам понадобятся знания о событиях и потоках приобретённые ранее, а так же следует изучить возможности глобального объекта process. Используя его события вы сможете, в том числе и перехватывать сигналы посылаемые процессу, например при нажатии ```ctrl + c```.

Читать что-либо из потока(stream) по строке за раз вам может помочь модуль Readline. Стандартный поток ввода stdin являясь ReadbleStream отлично подходит для этого. 

##### Полезные ссылки
*Обратите внимание, что переводы документации на русский язык могут быть устаревшими и не содержать всех современных возможностей модулей. Однако, основные концепции описанные там работают и по сей день. Для получения актуальной информации всегда используйте официальную документацию!*
- Process: 
    - [Process](https://nodejs.org/api/process.html)
    - [Process перевод на русском (nodejsdev.ru)](https://nodejsdev.ru/api/process/)
    - [Signal events](https://nodejs.org/api/process.html#process_signal_events)
    - [Сигнальные события (nodejsdev.ru)](https://nodejsdev.ru/api/process/#signal-events)
- Readline:
    - [Readline](https://nodejs.org/api/readline.html)
    - [Readline на русском (nodejsdev.ru)](https://nodejsdev.ru/api/readline/)
- События:  
    - [События от Metanit](https://metanit.com/web/nodejs/2.9.php)
    - [Understanding Node.js Event-Driven Architecture (FreeCodeCamp)](https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/)
    - [Event emitter](https://nodejs.dev/learn/the-nodejs-event-emitter)  
    - [Перевод документации Events (nodejsdev.ru)](https://nodejsdev.ru/api/events/)  
    - [События гайд (nodejsdev.ru)](https://nodejsdev.ru/guide/events/) 
- Потоки:
    - [Stream](https://nodejs.org/api/stream.html)  
    - [fs.createReadStream](https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options)
    - [Потоки (nodejsdev.ru)](https://nodejsdev.ru/api/stream/)
    - [Pipe (nodejsdev.ru)](https://nodejsdev.ru/guide/pipe/)
    - [Stream от Metanit](https://metanit.com/web/nodejs/2.10.php)  
    - [Pipe от Metanit](https://metanit.com/web/nodejs/2.11.php)  
- Модуль Path:
    - [Path](https://nodejs.org/api/path.html)   
    - [Path перевод на русский](https://nodejsdev.ru/api/path/)
