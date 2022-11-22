import s from '../Styles/nav.module.css'
import SearchBar from './SearchBar'

export default function Navbar() {
    return (<div className={s.rootDiv}>
        <nav className={s.nav}>
        <a className={s.title} href="/home">DOGe APP</a>
        <SearchBar/>
        <a className={s.createDog} href="/dogs">Create Dog</a>
   
    </nav>
    </div>
    )
}