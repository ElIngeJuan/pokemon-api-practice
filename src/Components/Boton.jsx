import "../Stylesheets/Boton.css"

function Boton({icon, manejadorClick}){
    return(
    <div className="contenedor-boton">
        <button className="boton" onClick={manejadorClick}>
            {icon}
        </button>
        <div className="sombra-boton"></div>
    </div>

    )
}

export default Boton;