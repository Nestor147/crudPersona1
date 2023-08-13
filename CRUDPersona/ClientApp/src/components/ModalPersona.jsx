import React, { useEffect, useState } from 'react'
import {Modal, ModalBody, ModalHeader,Form, FormGroup,Label,Input,Button,ModalFooter} from 'reactstrap';

const modeloPersona={
  id:0,
  nombre:"",
  apellido:"",
  direccion:"",
  telefono:"",
  correoElectronico:""
}
const ModalPersona = ({mostrarModal,setMostrarModal,guardarPersona,editar,setEditar,editarpersona}) => {

  const [persona,setPersona]=useState(modeloPersona)

  const ObtenerdatosInput=(e)=>{
    const {name,value}=e.target
    console.log(name+ " : "+ value)
    setPersona({...persona,[name] :value})
  }

  const enviarDatos=()=>{
    if(persona.id===0){
      guardarPersona(persona)
    }else{
      editarpersona(persona)
    }
    setPersona(modeloPersona)
  }

  useEffect(()=>{
    if(editar!==null){
      setPersona(editar)
    }else{
      setPersona(modeloPersona)
    }
  },[editar])

  const cerrarModal=()=>{
    setMostrarModal(!mostrarModal)
    setEditar(null)
  }



  return (
    <Modal isOpen={mostrarModal}>
        <ModalHeader>
          {persona.id===0 ? 'NUEVA PERSONA' : 'EDITAR PERSONA'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label  >Nombre</Label>
              <Input name="nombre" onChange={(e)=>ObtenerdatosInput(e)} value={persona.nombre}/>
            </FormGroup>
            <FormGroup>
              <Label>Apellido</Label>
              <Input name="apellido" onChange={(e)=>ObtenerdatosInput(e)} value={persona.apellido}/>
            </FormGroup>
            <FormGroup>
              <Label>Direccion</Label>
              <Input name="direccion" onChange={(e)=>ObtenerdatosInput(e)} value={persona.direccion}/>
            </FormGroup>
            <FormGroup>
              <Label>Telefono</Label>
              <Input name="telefono" onChange={(e)=>ObtenerdatosInput(e)} value={persona.telefono}/>
            </FormGroup>
            <FormGroup>
              <Label>Correo</Label>
              <Input name="correoElectronico" onChange={(e)=>ObtenerdatosInput(e)} value={persona.correoElectronico}/>
            </FormGroup>

          </Form>
        </ModalBody>
        <ModalFooter>
        <Button color='primary' size='sm' onClick={enviarDatos}>Guardar</Button>
        <Button color='danger' size='sm' onClick={cerrarModal}>Cerrar</Button>
        </ModalFooter>
    </Modal>
  )
}

export {ModalPersona}