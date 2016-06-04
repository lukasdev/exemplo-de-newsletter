<?php
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        //simula o envio de um e-mail
        sleep(2);

        $total = 10; //total de e-mails  a enviar

        $inicio = (int)$_POST['inicio']; //total de emails a pular
        $fim = (int)$_POST['fim']; // total de emails por post
        $conteudo = $_POST['conteudo']; //conteudo do newsletter
        if($inicio >= $total){ //se ja enviou todos para o loop
            die(json_encode([
            'concluido' => 'sim'
            ]));
        }
        //envia o e-mail aqui

        //proxima quantidade
        $inicio = $inicio+$fim;

        //caso não tenha acabado, retorna os novos parametros
        die(json_encode([
            'concluido' => 'nao',
            'inicio' => $inicio,
            'fim' => $fim,
            'conteudo' => $conteudo,
            'total' => $total
        ]));

    }