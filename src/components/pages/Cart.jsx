export default function Cart() {

    const products = JSON.parse(localStorage.getItem('products')) || []

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p.code}>
                            <td>{p.code}</td>
                            <td>
                                <img src={p.image} alt="" />
                            </td>
                            <td>{p.name}</td>
                            <td>{p.description}</td>
                            <td>{p.price}</td>
                            <td><a href="#">Eliminar</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => localStorage.clear()}>Limpiar carrito</button>
        </>
    )
}
