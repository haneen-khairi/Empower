import {toast} from 'react-toastify'
export function useSnackbar(){
    function showSnackbar(message , type , position , autoCloseTimeout){
        toast[type](message , {
            closeButton: true,
            position,
            autoClose: autoCloseTimeout,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            toastId: "custom-id-yes"
        })
    }
    return showSnackbar
}