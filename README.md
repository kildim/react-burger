Приложение доступно в интернете по адресу: [http://kildim.nomoredomains.sbs](http://kildim.nomoredomains.sbs)\
Github Pages: [https://kildim.github.io/react-burger/](https://kildim.github.io/react-burger/)\
Репозиторий с кодом приложения: [https://github.com/kildim/react-burger](https://github.com/kildim/react-burger)

# О приложении React-Burger.

Приложение React-Burger представляет из себя SPA, написанное на [TypeScript](https://www.typescriptlang.org), предоставляет возможность размещения, отслеживания и предоставления статистики заказов в вымышленом кафе.
Пользовательский интерфейс приложения представлен в виде трёх страниц:
- Конструктор -- предоставляет возможность пользователю самостоятельно составить бургер из загружаемых с сервера ингредиентов и передать на сервер информацию о размещаемом заказе;
- Лента заказов -- предоставляет возможность отслеживать в режиме реального времени статистику исполнения заказов на сервере;
- Личный кабинет -- предоставляет возможность ввода личной информации клиента и доступ в режиме реального времени к статистике заказов конкретного пользователя.

В приложении реализован механизм аутентификации путём обмена токенами с сервером. Роутинг в приложении построен с использованием библиотеки [React Router](https://reactrouter.com). В приложении реализованы защищённые маршруты для реализации роутинга на страницу данных пользователя.

Управление состоянием реализовано на библиотеке [Redux](https://redux.js.org).

Механизм взаимодействия с сервером реализован на асинхронных GET/POST запросах к серверу с использованием [Thunks](https://github.com/reduxjs/redux-thunk?ysclid=l6ji9nrq1d861765937), обмен данными в режиме реального времени происходит с использованием технологии WebSocket.

Приложение для взаимодействия с пользователем применяет возможности по реализации технологии перетаскивания мышкой (DnD), предоставленные библиотекой [React DnD](https://react-dnd.github.io/react-dnd/about).

Приложение протестировано на основной сценарий прохождения неаутентифицированным пользователем процедуры составления и размещения заказа. Приложение так же проходит и модульные тесты кода редьюсеров. Для функционального тестирования была задействована библиотека [Cypress](https://www.cypress.io/features/). Модульное тестирование проходило при помощи библиотеки [Jest](https://jestjs.io) с использованием [Testing Library](https://testing-library.com).

Прочие библиотеки, использованные в приложении:
[CreateReactApplication](https://create-react-app.dev), [ReduxToolkit](https://redux-toolkit.js.org), [Day.js](https://day.js.org/en/).





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
