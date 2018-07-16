$(()=> {
$('#table-product').DataTable();

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

// $("#code").focusout(()=>{
// let code = $("#code").val();
//
// })


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
          success: function (response) {
            setTimeout(function(){;
                $(element).empty();
                $(element).val(null).trigger("change");
                $(element).append('<option value="">Selecccionar. .</option>');
                response.forEach(function(son) {
                    $(element).append('<option value="'+son.id+'">'+son.name+'</option>');
                });
            }, 1000);
          },
          error: function (jqXHR) {
              alert('error', "Ha ocurrido un error al cargar los datos, por favor intente nuevamente.");

          }
     });
  });


$("#form-product").validate({
  rules: {
      code : {required:true, minlength: 4, maxlength: 10},
      name : {required:true, minlength: 4},
      description : {required:true},
      cost : {required:true},
      category : {required:true},
      brand : {required:true},


  },
  messages:{
      code: {required: "*Debe introducir un codigo",  minlength: "*Debe tener minimo 4 caracteres", maxlength: "*Debe tener maximo 10 caracteres" },
      name: {required: "*Debe introducir un nombre",  minlength: "*Debe tener minimo 4 caracteres" },
      description : {required: "*Debe introducir una descripción" },
      cost : {required: "*Debe introducir un precio para el producto" },
      category : {required: "*Debe introducir una categoria" },
      brand : {required: "*Debe introducir una marca" },
  },

  submitHandler: (form)=> {
        let data = $("#form-product").serialize();
          $.ajax({
              url: "save-product",
              type: 'POST',
              data: data,
              contentType: "application/x-www-form-urlencoded",
              dataType: "json",
              type: 'POST',
              success: function (response) {
                if(response.error == 0){
                  setTimeout(()=>{
                    $("#success-save").removeAttr('hidden');
                    $("#success-save").fadeOut(3000)
                    $("#message-success").text(response.mensaje)
                  }, 500)
                }else{
                  setTimeout(()=>{
                    $("#erro-save").removeAttr('hidden')
                    $("#erro-save").fadeOut(3000)
                    $("#message-danger").text(response.mensaje)
                  }, 500)
                }

              },
              error: function (response) {
                alert("se ha genarado un error");


              }
          });
      }
    })

    $('.eliminar-emp-rel').click(function () {
        let productId = $(this).attr('data-id');
        swal({
              title: 'Seguro que desea eliminar el producto?',
              text: "Una vez eliminado no se puede recuperar",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Borrar!'
            }).then((result) => {
              if (result.value)
              $.ajax({
                  url: "delete-product/"+productId,
                  type: 'GET',
                  contentType: "application/x-www-form-urlencoded",
                  dataType: "json",
                  success: function (response) {
                        setTimeout(function () {
                                swal(
                                  'Borrado!',
                                  'El producto se ha eliminado',
                                  'success'
                                )
                                location.reload();
                            }, 500);



                  },
                  error: function (response) {
                    alert("Error al Borrar Producto15")
                  }
              });



            })

    });







})
