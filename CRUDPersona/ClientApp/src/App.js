import { Container ,Row,Col, Card, CardHeader, CardBody, Button} from 'reactstrap'
import { TablaPersonas } from './components/TablaPersonas'
import React, { useState,useEffect } from 'react'
import { ModalPersona } from './components/ModalPersona'

const App = () => {
  const [personas,setPersonas]=useState([])
  const [mostrarModal,setMostrarModal] = useState(false)
  const [editar,setEditar]=useState(null)
  const mostrarPersonas= async()=>{
    const response = await fetch('/api/persona/Mostrar')
    if (response.ok){
    const data=await response.json();
    console.log(data)
    setPersonas(data)
    }else{
      console.log('Error en la lista')
      }
    }
  useEffect(()=>{
    mostrarPersonas();
  },[])

  const guardarPersona= async (persona)=>{
    const response=await fetch('api/persona/Agregar',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(persona)
    })
    if(response.ok){
      setMostrarModal(!mostrarModal);
      mostrarPersonas()
    }
  }

  const editarpersona= async (persona) => {
    const response = await fetch('api/persona/Editar',{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json; charset=utf-8'},
        body:JSON.stringify(persona)
    })
    if(response.ok){
      setMostrarModal(!mostrarModal);
      mostrarPersonas()
    }
  }

  const eliminarPersona = async(id)=>{
    var respuesta=window.confirm("Desea eliminar la persona?")
    if(!respuesta){
      return;
    }
    const response = await fetch('api/persona/Eliminar?id='+id,{
      method:'DELETE',
    })
    if (response.ok){
      mostrarPersonas()
    }
  }

  return (
    <Container>
      <Row className='mt-5'>
        <Col sm="12">
          <Card>
            <CardHeader>
              <h5>Lista de Personas</h5>
            </CardHeader>
            <CardBody>
              <Button size="sm" color='success'
              onClick={()=>setMostrarModal(!mostrarModal)}>Nueva Persona</Button>
              <hr/>
              <TablaPersonas 
              data={personas}
              setEditar={setEditar}
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              eliminarPersona={eliminarPersona}
              />

            </CardBody>
          </Card>
        </Col>


      </Row>
      <ModalPersona
      mostrarModal={mostrarModal}
      setMostrarModal={setMostrarModal}
      guardarPersona={guardarPersona}

      editar={editar}
      setEditar={setEditar}
      editarpersona={editarpersona}/>
      
     
    </Container>
    
  )
}

export default App