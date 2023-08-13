import { Button, Table } from 'reactstrap'

const TablaPersonas = ({data,setEditar,mostrarModal,setMostrarModal,eliminarPersona}) => {
    const enviarDatos=(persona)=>{
        setEditar(persona)
        setMostrarModal(!mostrarModal)
    }

  return (
    <Table striped responsive>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {
                (data.length < 1) ? (
                <tr>
                    <td colSpan='6'>Sin registros</td>

                </tr>
                ):(
                    data.map(items=>(
                        <tr key={items.id}>
                            <td>{items.nombre}</td>
                            <td>{items.apellido}</td>
                            <td>{items.direccion}</td>
                            <td>{items.telefono}</td>
                            <td>{items.correoElectronico}</td>
                            <td>
                                <Button color='primary' size='sm' className='me-2'
                                onClick={()=>enviarDatos(items)}>Editar</Button>
                                <Button color='danger' size='sm' onClick={()=>eliminarPersona(items.id)} >Eliminar</Button>
                            </td>

                        </tr>

                    ))
                )
            }

        </tbody>

    </Table>
    
  )
}

export {TablaPersonas}