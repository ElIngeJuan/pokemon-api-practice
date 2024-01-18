import "../Stylesheets/Carta.css"

function Carta({nombre, imagen}){
    return(
    <div className="carta">
        <p className="carta-nombre">{nombre}</p>
        <div className="carta-circulo"></div>
        <img className="carta-imagen" src={imagen} alt={nombre}></img>
    </div>)
}

export default Carta;