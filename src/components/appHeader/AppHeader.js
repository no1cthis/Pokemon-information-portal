
import cl from './appHeader.module.scss';

const AppHeader = () => {
    return (
        <header className={cl.app__header}>
            <h1 className={cl.app__title}>
                <a href='#!'>
                    <span>Pokemon</span> information portal
                </a>
            </h1>
        </header>
    )
}

export default AppHeader;