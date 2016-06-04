$(function(){

    function sendNewsLetter(conteudo, inicio, fim){
        $.ajax({
            method: 'POST',
            url: 'newsletter.php',
            data: {
                inicio: inicio,
                fim: fim,
                conteudo: conteudo
            },
            dataType: 'json',
            success: function(r){
                if(r.concluido == 'nao'){
                    //acha a porcentagem de emails ja enviada
                    var por = Math.round((r.inicio*100)/r.total);
                    //muda a barra de progresso
                    $('.status').show().find('p').html('<b>'+r.inicio+' de '+r.total+' enviados!</b>');
                    $('progress').attr('value', por);
                    //reinicia o processo após 5 segundos
                    setTimeout(function(){
                        sendNewsLetter(r.conteudo, r.inicio, r.fim);
                    }, 5000);
                }else{
                    $('#enviar').text('Enviar').prop('disabled', false);

                    setTimeout(function(){
                        $('.status').fadeOut();
                        $('.status p').html('');
                    }, 1000);
                }
            }
        });
    }

    $('#enviar').on('click', function(e){
        e.preventDefault();
        $(this).prop('disabled', true).text('Aguarde...');
        var conteudo = tinyMCE.get('conteudo').getContent(); //pega o conteudo do mce
        var inicio = 0; //inicia do primeiro e-mail
        var fim = 2; //maximo de 2 emails por post

        sendNewsLetter(conteudo, inicio, fim); //inicia o procedimento
                
        return false;
    });
});