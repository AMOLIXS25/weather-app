import style from "./styles.css";

const index = () => {
    const rootElement = document.querySelector('#root');
    const titleElement = document.createElement('h1');
    titleElement.innerHTML = 'Webpack Config';
    rootElement.appendChild(titleElement);
}

index();