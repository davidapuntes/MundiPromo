/*La promise que devuelve el login, puede ser:
--satisfactoria--la guardará en el objeto result, con su email e id de usuario
o negativa:
--guardará un error con su código y mensaje... 

Todo es opcional, porque puede haber una u otra respuesta*/
export interface LoginResponse{
    result?:{
        email?:string,
        uId?:string
    },
    error?:{
        code?:string,
        message?:string
    }

}