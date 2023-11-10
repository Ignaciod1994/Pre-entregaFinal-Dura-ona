

(async () => {
  const {value : pais} = await Swal.fire ({

    title: "Bienvenido a la casa RapiPrestamo",
    text: 'Selecciona tu pais',
    icon: 'success',
    confirmButtonText: 'Selecionar',
    footer: 'Esta es informacion obligatoria',
    padding: '1rem',
    backdrop: true,
    position: 'center',
    allowOutsideClick: true,
    allowEscapeKey: false,
    allowEnterKey: false,
    input: 'select',
    inputPlaceholder: 'Pais',
    inputValue: '',
    inputOptions: {
  
      mexico: 'Mexico',
      españa: 'España',
      argentina: 'Argentina',
      peru: 'Peru',
      bolivia: 'Bolivia',
      chile: 'Chile',
      brasil: 'Brasil',
      
    }})

    if (pais) {

      Swal.fire ("Eres de" +" "+ pais)
    }
})()

function informacionObligatoria (nombre, apellido, edad, documento, email , cantidad, cuotas, cuotaMensual) { 
  
  this.nombre= nombre; 
  this.apellido= apellido; 
  this.edad= edad; 
  this.documento= documento;
  this.email = email;
  this.cantidad = cantidad;  
  this.cuotas = cuotas;
  this.cuotaMensual = cuotaMensual;
  
  }

  const prestamos = JSON.parse(localStorage.getItem("usuarios")) || []


  function dividir(dato1, dato2) {
    let resultado = dato1 / dato2;
    return resultado;
  }
  
  function calcularCuota(cantidad, tasa, cuotas) {
    let tasaMensual = tasa / 100 / 12;
    let cuota = cantidad * (tasaMensual * Math.pow(1 + tasaMensual, cuotas)) / ((Math.pow(1 + tasaMensual, cuotas)) - 1);
    return cuota;
  }

 const formulario = document.getElementById ('formulario');
 formulario.addEventListener('submit', enviarForm);


  function enviarForm (e) {
   e.preventDefault()
  const nombre = document.getElementById('inputnombre').value;
  const apellido = document.getElementById('inputapellido').value;
  const edad =  parseInt (document.getElementById('inputedad').value);
  const documento = parseInt (document.getElementById('inputdni').value);
  const email = document.getElementById('inputemail').value;
  const cantidad = parseInt (document.getElementById('inputcantidad').value);
  const cuotas = parseInt (document.getElementById('inputcuotas').value);
  

  const tasaDeInteres = 75;
    

  const prestamoUsuario = {
     
    nombre : nombre,
    apellido : apellido, 
    edad : edad,
    documento : documento, 
    email : email,
   

  }

  localStorage.setItem ("usuario", JSON.stringify(prestamoUsuario))
  

  const resultadoDiv = document.getElementById ('resultado');

  if (cantidad > 10000) {
    const cuotaPrestamo = calcularCuota(cantidad, tasaDeInteres, cuotas);
    resultadoDiv.innerHTML= `Usted debe pagar ${cuotas} cuotas de ${cuotaPrestamo.toFixed(2)}`;

    const prestamo = new informacionObligatoria (nombre, apellido, edad, documento, email, cantidad, cuotas, cuotaPrestamo)
    prestamos.push (prestamo);
    localStorage.setItem ("usuarios", JSON.stringify(prestamos))


  } else {
    resultadoDiv.innerHTML ="El monto solicitado es menor al mínimo, por favor ingrese un importe mayor a 10000";
  }
  
  const { value: accept } = Swal.fire({

    title: "Terminos y condiciones",
    input: "checkbox",
    inputValue: 1,
    inputPlaceholder: `
      Acepto los terminos y condiciones
    `,
    confirmButtonText: `
      Continue&nbsp;<i class="fa fa-arrow-right"></i>
    `,
    inputValidator: (result) => {
      return !result && "You need to agree with T&C";
    }
  });
  if (accept) {
    Swal.fire("Estas de acuerdo con los terminos y condiciones");
  }

 }



 const encontradoDiv = document.getElementById ('encontrado');
 
 const buscarPrestamoPorNombre = () => { 
  const nombreBuscado = document.getElementById('buscarprestamo').value;
  const prestamoEncontrado = prestamos.find((prestamo) => prestamo.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
  encontradoDiv.innerHTML = `prestamoEncontrado`;


  if (prestamoEncontrado) {
     encontradoDiv.innerHTML = `Préstamo encontrado: Nombre: ${prestamoEncontrado.nombre} Apellido ${prestamoEncontrado.apellido} Cantidad: ${prestamoEncontrado.nombre}, Cuotas: ${prestamoEncontrado.cuotas}, Cuota Mensual: ${prestamoEncontrado.cuotaMensual.toFixed(2)}`

  } else {
   encontradoDiv.innerHTML = "No se encontró ningún préstamo para el nombre proporcionado"
  }
 }


const buscarButton = document.getElementById ('buscarButton');
buscarButton.addEventListener ('click', buscarPrestamoPorNombre);


