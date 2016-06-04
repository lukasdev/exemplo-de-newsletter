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
                if(r.concluido == 'sim'){
                    //se concluiu, para o loop
                    pararInterval = 1;
                }else{
                    //acha a porcentagem de emails ja enviada
                    var por = Math.round((r.inicio*100)/r.total);
                    //muda a barra de progresso
                    $('progress').attr('value', por);
                    //reinicia o processo após 5 segundos
                    setTimeout(function(){
                        sendNewsLetter(r.conteudo, r.inicio, r.fim);
                    }, 5000);
                }
            }
        });
    }
    var pararInterval = 0; //variavel que para a execução
    $('#enviar').on('click', function(e){
        e.preventDefault();
        var conteudo = tinyMCE.get('conteudo').getContent(); //pega o conteudo do mce
        var inicio = 0; //inicia do primeiro e-mail
        var fim = 2; //maximo de 2 emails por post

        sendNewsLetter(conteudo, inicio, fim); //inicia o procedimento
                
        return false;
    });
});