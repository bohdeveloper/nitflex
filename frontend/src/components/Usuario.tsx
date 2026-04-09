import './Usuario.css';

type UsuarioProps = {
    nombre: string;
    email: string;
    edad: number;
};

export const Usuario: React.FC<UsuarioProps> = ({ nombre, email, edad }) => {
    return (
        <div>
            <h2>{nombre}</h2>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Edad:</strong> {edad}</p>
        </div>
    );
};

export default Usuario;