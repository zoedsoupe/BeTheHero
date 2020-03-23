const express = require('express')

const app = express()

app.get('/', (Request, Response) => {
    return Response.json({
        evento: 'Semana OmniStack 11',
        aluno: 'Matheus de Souza Pessanha'
    })
})

app.listen(3333)