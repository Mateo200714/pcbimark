

window.addEventListener('load', () => {
    actualizar_datos_envio_formulario_guardados_pagina()
    actualizar_datos_producto_comprar()
    if (actualizar_datos_envio_formulario_guardados_pagina() === true) {
        comprobar_datos_envio_formulario(false)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    }
})
//datos prodructo comprar(carrito de compra)
{
    function actualizar_datos_producto_comprar() {
        const datos_producto = obtener_todos_datos_producto()
        /* datos_producto={
            name:'',<-text
            UrlImg:'',<-text
            price:279.99,<-number
            rebaja:null<-number % \\ null 
        } */

        const carrito = '#body-carrito'
        if (datos_producto.rebaja === null) {//sin rebaja
            $(carrito).html(`
            <div class="nombre-producto">
                <span>${datos_producto.name}</span>
            </div>
            <div class="otros-datos">
                <img draggable="false" src="/recursos/${datos_producto.UrlImg}.png" alt="Img Producto (${datos_producto.name})" loading="lazy">
                <div class="datos-precio-compra">
                    <div class="precio-producto">
                        <div class="titulo">
                            <span>Precio unidad</span>
                        </div>
                    <div>
                        <span>
                            <font>€</font>${datos_producto.price.toLocaleString()}
                        </span>
                    </div>
                    <div class="div-cantidad-compra">
                        <input type="number" name="" id="bt-cantidad-producto" min="1" max="5" value="1">
                    </div>
                    <div class="precio-final">
                        <div class="titulo">
                            <span>Precio final</span>
                        </div>
                        <div>
                            <span>
                                <font>€</font> ${datos_producto.price.toLocaleString()}
                            </span>
                        </div>
                    </div>
                    </div>
            </div>
            </div>`)
        }
        else {//en oferta
        }
    }
    const img_mostrar_esconder = '#img-mostrar-esconder-carrito'
    $(img_mostrar_esconder).click(function () {
        const carrito = $('#body-carrito')
        const datos = $('.datos-producto-comprar')
        const class_carrito_abierto = 'abierto'
        const class_carrito_cerrado = 'cerrado'

        if (carrito.css.display !== 'none') {
            carrito.animate({ top: '-175px' }, 375, () => {
                carrito.css.display = 'none'
            })
            $(img_mostrar_esconder).removeClass(class_carrito_abierto).addClass(class_carrito_cerrado)
            datos.animate({ height: '30px' }, 375)
        }
        else {
            carrito.css.display = ''
            carrito.animate({ top: '0px' }, 300)
            datos.animate({ height: '240px' }, 300)
            $(img_mostrar_esconder).removeClass(class_carrito_cerrado).addClass(class_carrito_abierto)
        }
    });
}
//formulario datos de envio
{
    function actualizar_datos_envio_formulario_guardados_pagina() {
        const data = JSON.parse(localStorage.getItem('datos_envio_formulario_guardados'))
        if (data !== null) {//actualizar formulario
            document.getElementById('nombre-apellidos').value = data.Nombre_Apellidos
            document.getElementById('pais-region').value = data.Pais_Region
            document.getElementById('numero-telefono').value = data.Numero_Telefono
            document.getElementById('Direccion-Entrega-1a').value = data.Direccion_Entrega_1
            document.getElementById('Direccion-Entrega-1b').value = data.Direccion_Entrega_2
            document.getElementById('codigo-postal').value = data.Codigo_Postal
            document.getElementById('ciudad').value = data.Ciudad
            document.getElementById('provincia').value = data.provincia
            document.getElementById('nif').value = data.nif
            return true
        }
        else {
            return false
        }
    }
    let datos_formulario_envio_correctos = {
        nombre_apellidos: false,
        pais_region: false,
        numero_telefono: false,
        direccion_entrega_1: false,
        codigo_postal: false,
        ciudad: false
    }
    function corregir_dato_formulario_nombre_apellidos(data) {
        if ((data.replaceAll(' ', '').length <= 50 && data.replaceAll(' ', '').length >= 2) && data.split(' ').length > 1) {//datos correctos
            document.getElementById("dato-invalido-nombre-apellidos").style.display = "none"
            datos_formulario_envio_correctos.nombre_apellidos = true
        }
        else {
            document.getElementById("dato-invalido-nombre-apellidos").style.display = "flex"
            datos_formulario_envio_correctos.nombre_apellidos = false
        }
    }
    function corregir_dato_formulario_pais_region(data) {
        if (data <= 50 && data >= 2) {//datos correctos
            document.getElementById("dato-invalido-Pais-Region").style.display = "none"
            datos_formulario_envio_correctos.pais_region = true
        }
        else {
            document.getElementById("dato-invalido-Pais-Region").style.display = "flex"
            datos_formulario_envio_correctos.pais_region = false
        }
    }
    function corregir_dato_formulario_numero_telefono(data) {
        if (data <= 20 && data >= 2) {//datos correctos
            document.getElementById("dato-invalido-numero-telefono").style.display = "none"
            datos_formulario_envio_correctos.numero_telefono = true
        }
        else {
            document.getElementById("dato-invalido-numero-telefono").style.display = "flex"
            datos_formulario_envio_correctos.numero_telefono = false
        }
    }
    function corregir_dato_formulario_direccion_entrega(data) {
        if (data <= 60 && data >= 2) {//datos correctos
            document.getElementById("dato-invalido-Direccion-Entrega-1a").style.display = "none"
            datos_formulario_envio_correctos.direccion_entrega_1 = true
        }
        else {
            document.getElementById("dato-invalido-Direccion-Entrega-1a").style.display = "flex"
            datos_formulario_envio_correctos.direccion_entrega_1 = false
        }
    }
    function corregir_dato_formulario_codigo_postal(data) {
        if (data <= 20 && data >= 2) {//datos correctos
            document.getElementById("dato-invalido-codigo-postal").style.display = "none"
            datos_formulario_envio_correctos.codigo_postal = true
        }
        else {
            document.getElementById("dato-invalido-codigo-postal").style.display = "flex"
            datos_formulario_envio_correctos.codigo_postal = false
        }
    }
    function corregir_dato_formulario_ciudad(data) {
        if (data <= 50 && data >= 1) {//datos correctos
            document.getElementById("dato-invalido-ciudad").style.display = "none"
            datos_formulario_envio_correctos.ciudad = true
        }
        else {
            document.getElementById("dato-invalido-ciudad").style.display = "flex"
            datos_formulario_envio_correctos.ciudad = false
        }
    }

    function comprobar_guardar_formulario_datos_envio_permitido() {
        let todos_datos_correctos = false
        if (datos_formulario_envio_correctos.nombre_apellidos) {
            todos_datos_correctos = true
        }
        else if (datos_formulario_envio_correctos.pais_region) {
            todos_datos_correctos = true
        }
        else if (datos_formulario_envio_correctos.numero_telefono) {
            todos_datos_correctos = true
        }
        else if (datos_formulario_envio_correctos.direccion_entrega_1) {
            todos_datos_correctos = true
        }
        else if (datos_formulario_envio_correctos.codigo_postal) {
            todos_datos_correctos = true
        }
        else if (datos_formulario_envio_correctos.ciudad) {
            todos_datos_correctos = true
        }
        if (todos_datos_correctos) {
            document.getElementById("bt-guardar-datos-envio").disabled = false;
        }
        else {
            document.getElementById("bt-guardar-datos-envio").disabled = true;
        }
    }
    function comprobar_continuar_formulario_datos_envio_permitido() {
        let todos_datos_correctos = true
        if (!datos_formulario_envio_correctos.nombre_apellidos) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.pais_region) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.numero_telefono) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.direccion_entrega_1) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.codigo_postal) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.ciudad) {
            todos_datos_correctos = false
        }
        if (todos_datos_correctos) {
            document.getElementById("bt-continuar-datos-envio").disabled = false;
        }
        else {
            document.getElementById("bt-continuar-datos-envio").disabled = true;
        }
    }
    function comprobar_continuar_formulario_datos_envio_instrucciones_permitido() {
        let todos_datos_correctos = true
        if (!datos_formulario_envio_correctos.nombre_apellidos) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.pais_region) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.numero_telefono) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.direccion_entrega_1) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.codigo_postal) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.ciudad) {
            todos_datos_correctos = false
        }
        if (todos_datos_correctos) {
            document.getElementById("bt-instrucciones-entrega").disabled = false;
        }
        else {
            document.getElementById("bt-instrucciones-entrega").disabled = true;
        }
    }

    document.getElementById('nombre-apellidos').addEventListener('change', () => {
        const data = document.getElementById('nombre-apellidos').value
        corregir_dato_formulario_nombre_apellidos(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })
    document.getElementById('pais-region').addEventListener('change', () => {
        const data = document.getElementById('pais-region').value.replaceAll(' ', '').length
        corregir_dato_formulario_pais_region(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })
    document.getElementById('numero-telefono').addEventListener('change', () => {
        const data = document.getElementById('numero-telefono').value.replaceAll(' ', '').length
        corregir_dato_formulario_numero_telefono(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })
    document.getElementById('codigo-postal').addEventListener('change', () => {
        const data = document.getElementById('codigo-postal').value.replaceAll(' ', '').length
        corregir_dato_formulario_codigo_postal(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })
    document.getElementById('Direccion-Entrega-1a').addEventListener('change', () => {
        const data = document.getElementById('Direccion-Entrega-1a').value.replaceAll(' ', '').length
        corregir_dato_formulario_direccion_entrega(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })
    document.getElementById('ciudad').addEventListener('change', () => {
        const data = document.getElementById('ciudad').value.replaceAll(' ', '').length
        corregir_dato_formulario_ciudad(data)
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    })

    function comprobar_datos_envio_formulario(guardar = false) {
        const data = {
            Nombre_Apellidos: document.getElementById('nombre-apellidos').value,
            Pais_Region: document.getElementById('pais-region').value,
            Numero_Telefono: document.getElementById('numero-telefono').value,
            Direccion_Entrega_1: document.getElementById('Direccion-Entrega-1a').value,
            Direccion_Entrega_2: document.getElementById('Direccion-Entrega-1b').value,
            Codigo_Postal: document.getElementById('codigo-postal').value,
            Ciudad: document.getElementById('ciudad').value,
            provincia: document.getElementById('provincia').value,
            nif: document.getElementById('nif').value
        }
        //comprobar si todos los datos son correctos
        corregir_dato_formulario_nombre_apellidos(data.Nombre_Apellidos)
        corregir_dato_formulario_pais_region(data.Pais_Region.replaceAll(' ', '').length)
        corregir_dato_formulario_numero_telefono(data.Numero_Telefono.replaceAll(' ', '').length)
        corregir_dato_formulario_direccion_entrega(data.Direccion_Entrega_1.replaceAll(' ', '').length)
        corregir_dato_formulario_codigo_postal(data.Codigo_Postal.replaceAll(' ', '').length)
        corregir_dato_formulario_ciudad(data.Ciudad.replaceAll(' ', '').length)

        let todos_datos_correctos = true
        if (!datos_formulario_envio_correctos.nombre_apellidos) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.pais_region) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.numero_telefono) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.direccion_entrega_1) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.codigo_postal) {
            todos_datos_correctos = false
        }
        else if (!datos_formulario_envio_correctos.ciudad) {
            todos_datos_correctos = false
        }
        if (todos_datos_correctos && guardar) {
            sessionStorage.setItem('datos_envio_formulario_temporal', JSON.stringify(data))
        }
        return todos_datos_correctos

    }
    document.getElementById('bt-continuar-datos-envio').addEventListener('click', (e) => {
        e.preventDefault()
        if (comprobar_datos_envio_formulario(true) === true) {//guardar datos formulario
            abrir_formulario_metodos_pago()
        }
        else {
            comprobar_guardar_formulario_datos_envio_permitido()
            comprobar_continuar_formulario_datos_envio_permitido()
            comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
        }
    })
    document.getElementById('bt-guardar-datos-envio').addEventListener('click', (e) => {
        e.preventDefault()
        const data = {
            Nombre_Apellidos: document.getElementById('nombre-apellidos').value,
            Pais_Region: document.getElementById('pais-region').value,
            Numero_Telefono: document.getElementById('numero-telefono').value,
            Direccion_Entrega_1: document.getElementById('Direccion-Entrega-1a').value,
            Direccion_Entrega_2: document.getElementById('Direccion-Entrega-1b').value,
            Codigo_Postal: document.getElementById('codigo-postal').value,
            Ciudad: document.getElementById('ciudad').value,
            provincia: document.getElementById('provincia').value,
            nif: document.getElementById('nif').value
        }
        localStorage.setItem('datos_envio_formulario_guardados', JSON.stringify(data))
    })
    document.getElementById('bt-instrucciones-entrega').addEventListener('click', (e) => {
        e.preventDefault()
        if (comprobar_datos_envio_formulario(true) === true) {
            abrir_formulario_instrucciones_entrega()
        }
        else {
            comprobar_guardar_formulario_datos_envio_permitido()
            comprobar_continuar_formulario_datos_envio_permitido()
            comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
        }
    })
}
//formularios instrucciones de envio
{
    function actualizar_nombre_cliente_instrucciones_envio() {
        const data = JSON.parse(sessionStorage.getItem('datos_envio_formulario_temporal')).Nombre_Apellidos.split(' ')

        let datos_mostrar = ""
        for (let i = 0; i < data.length; i++) {
            datos_mostrar += (data[i].charAt(0).toUpperCase() + data[i].slice(1)) + " "
        }
        $('#instrucciones-envio').find('#nombre-cliente').html(datos_mostrar)
    }
    function actualizar_direccion_cliente_instrucciones_envio() {
        const data = JSON.parse(sessionStorage.getItem('datos_envio_formulario_temporal'))

        let datos_mostrar = ""
        datos_mostrar += data.Direccion_Entrega_1 + ", "
        if (data.Direccion_Entrega_2 !== "") {
            datos_mostrar += data.Direccion_Entrega_2 + ", "
        }
        datos_mostrar += (data.Ciudad.charAt(0).toUpperCase() + data.Ciudad.slice(1))
        if (data.provincia !== "") {
            datos_mostrar += ", " + (data.provincia.charAt(0).toUpperCase() + data.provincia.slice(1))
        }
        datos_mostrar += ", " + data.Codigo_Postal
        datos_mostrar += ", " + (data.Pais_Region.charAt(0).toUpperCase() + data.Pais_Region.slice(1))

        $('#instrucciones-envio').find('#direccion-cliente').html(datos_mostrar)
    }
    let section_formulario = [
        'section-tipo-propeidad-0',
        'section-tipo-propeidad-1',
        'section-tipo-propeidad-2',
        'section-tipo-propeidad-3'
    ]
    function cerrar_preguntas_instrucciones_envio(pagina) {
        document.querySelectorAll(".text-pregunta").forEach((elemento) => {
            const divHermano = elemento.nextElementSibling;
            elemento.parentElement.style.paddingBottom = "0px"
            divHermano.style.display = "none";
        })
        document.querySelectorAll(".div-añadir-mas-instrucciones").forEach((elemento) => {
            elemento.style.display = "block"
        })
        document.querySelectorAll("#pregunta-adicional-1").forEach((elemento) => {
            elemento.style.display = "none"
        })
        document.querySelectorAll("#pregunta-adicional-2").forEach((elemento) => {
            elemento.style.display = "none"
        })
    }
    function eventos_formulario_instrucciones_envio() {
        //econder mostrar contenido preguntas
        document.querySelectorAll(".text-pregunta").forEach((elemento) => {
            elemento.addEventListener('click', () => {
                const divHermano = elemento.nextElementSibling;
                const img = elemento.querySelector('img')
                if (divHermano.style.display === "none") {
                    elemento.parentElement.style.paddingBottom = '8px'
                    if ($(elemento).parent().hasClass('cerrado-sabados-domingos')) {
                        divHermano.style.display = "flex";
                        img.className = "flecha-abrir-cerrar-pregunta-abierta"
                    }
                    else {
                        divHermano.style.display = "block";
                        img.className = "flecha-abrir-cerrar-pregunta-abierta"
                    }
                } else {
                    elemento.parentElement.style.paddingBottom = "0px"
                    divHermano.style.display = "none";
                    img.className = "flecha-abrir-cerrar-pregunta-cerrada"
                }
            });
        })
        //mostrar preguntras extra
        {
            section_formulario.forEach((elemento) => {
                document.getElementById(elemento).querySelector('.div-añadir-mas-instrucciones').querySelector('.añadir-instrucciones').addEventListener('click', () => {
                    document.getElementById(elemento).querySelector('.div-añadir-mas-instrucciones').style.display = "none"
                    document.getElementById(elemento).querySelector('#pregunta-adicional-1').style.display = "block"
                    document.getElementById(elemento).querySelector('#pregunta-adicional-2').style.display = "block"
                })
            })
        }
        //cambiar pagina formulario
        {
            const elemento_children = document.querySelector('.div-tipos-propiedades').children
            for (let i = 1; i < elemento_children.length; i++) {
                elemento_children[i].addEventListener('click', () => {
                    if (!$(elemento_children[i]).hasClass('bt-tipo-propiedades-activo')) {
                        //cambiar diseño botones
                        for (let j = 1; j < elemento_children.length; j++) {
                            $(elemento_children[j]).removeClass('bt-tipo-propiedades-activo');
                        }
                        $(elemento_children[i]).toggleClass('bt-tipo-propiedades-activo');
                        //cambiar pagina formulario
                        for (let j = 0; j < section_formulario.length; j++) {
                            $(`#${section_formulario[j]}`).css('display', 'none');
                        }
                        $(`#${section_formulario[i - 1]}`).css('display', 'block');
                        cerrar_preguntas_instrucciones_envio(i - 1)
                    }
                })
            }
        }
        //mostrar opciones vecino
        {
            document.querySelectorAll('.div-lista-opcion-check').forEach((elemento) => {
                $(elemento).on('click', () => {
                    if (elemento.attr("id") === 'opcion-vecino-lista') {
                    elemento.siblings('opciones-vecino').css('display','block')
                    }
                    else{
                        elemento.siblings('opciones-vecino').css('display','none')
                    }
                })
            })
        }
    }
}
//controlador de formularios
{
    function abrir_formulario_datos_envio() {
        document.getElementById("instrucciones-envio").style.display = "none"
        document.getElementById("metodos-pago").style.display = "none"
        document.getElementById("datos-envio").style.display = "block"
        comprobar_datos_envio_formulario()
        comprobar_guardar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_permitido()
        comprobar_continuar_formulario_datos_envio_instrucciones_permitido()
    }
    function abrir_formulario_instrucciones_entrega() {
        document.getElementById("metodos-pago").style.display = "none"
        document.getElementById("datos-envio").style.display = "none"
        document.getElementById("instrucciones-envio").style.display = "block"
        actualizar_nombre_cliente_instrucciones_envio()
        actualizar_direccion_cliente_instrucciones_envio()
        eventos_formulario_instrucciones_envio()
    }
    function abrir_formulario_metodos_pago() {
        document.getElementById("instrucciones-envio").style.display = "none"
        document.getElementById("datos-envio").style.display = "none"
        document.getElementById("metodos-pago").style.display = "block"
    }
}