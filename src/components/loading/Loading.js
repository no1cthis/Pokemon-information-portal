import loading from './loading.svg'
import cl from './Loading.module.scss'

const Loading = () =>{
    return(
        <img src={loading} className={cl.img} alt="Loading" />
        
    )
}

export default Loading;