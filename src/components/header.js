import './header.css';

export default function Header(){
    return(
        <div className="header-container">
            <span className="header-title">Pradle</span>
            <span className="header-dot">-</span>
            <span className="header-subtitle">Wordle but better</span>
        </div>
    );
}