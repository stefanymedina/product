$(function () {
  $("#cost").on({
      "focus": function (event) {
          $(event.target).select();
      },
      "keyup": function (event) {
          $(event.target).val(function (index, value ) {
              return value.replace(/\D/g, "")
                          .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                          .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
          });
      }
  });

  $(".categoryClass").on('change', function () {
      let element='#'+$(this).attr('data-id');
      let fatherId = $(this).val();
      console.log(element);

      $.ajax({
          url: "load-producto/"+fatherId,
          data: {},
          contentType: "application/x-www-form-urlencoded",
          dataType: "json",
          type: 'GET',
          // beforeSend: function () {
          //         loader(true);
          // }
          success: function (response) {
            setTimeout(function(){

                // loader(false);
                $(element).empty();
                $(element).val(null).trigger("change");
                $(element).append('<option value="">Selecccionar. .</option>');
                response.forEach(function(son) {
                    $(element).append('<option value="'+son.id+'">'+son.name+'</option>');
                });
            }, 1000);
          },
          // error: function (jqXHR) {
          //     //console.log(jqXHR);
          //     loader(false);
          //     if(parseInt(jqXHR.readyState) === 4){
          //         showMessage('error', 'El sistema ha cerrado la sessión. por favor recargue la pagina');
          //     }else{
          //           showMessage('error', "Ha ocurrido un error al cargar los datos, por favor intente nuevamente.");
          //     }
          // }
     });
  });


$("#form-product").validate({
  rules: {
      code : {required:true, minlength: 4, maxlength: 10},
      name : {required:true, minlength: 4},
      description : {required:true},
      cost : {required:true},

  },
  messages:{
      code: {required: "Debe introducir un codigo",  minlength: "Debe tener minimo 4 caracteres", maxlength: "Debe tener maximo 10 caracteres" },
      name: {required: "Debe introducir un nombre",  minlength: "Debe tener minimo 4 caracteres" },
      description : {required: "Debe introducir una descripción" },
      cost : {required: "Debe introducir un precio para el producto" },
  },
  submitHandler: function() {
  let data = new FormData(document.getElementById('formulario-datos-subasta'))
  alert("hola");
  // data.append('token', $('#_csrf_token').val())
  // ajaxRequest(constants.URL.SUBASTAS.DATOS, 'POST', data, 'respuestaAjaxExito', 'respuestaAjaxError', false, false)
}
})



})
