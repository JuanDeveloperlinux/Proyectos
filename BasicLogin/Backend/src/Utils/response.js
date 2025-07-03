//esto es lo que se le va a decir al que use la api para saber si todo cool o no

export function success(req,res,mensaje="",status=200){
    res.status(status).send({
        error:false,
        status:status,
        body:mensaje
    })
}

export function error(req,res,mensaje="Error Interno",status=500){
    res.status(status).send({
        error:true,
        status:status,
        body:mensaje
        }
    )
}
