import  {error} from "./response.js"

function errors(err,req,res,next){
    console.error("[error]",err)
    const message = err.message || "error interno"
    const status = err.statusCode || 500

    error(req,res,message,status)
}

export default errors;