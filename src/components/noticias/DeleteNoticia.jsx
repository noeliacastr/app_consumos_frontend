import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNoticia } from '../../api/noticia';
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';

const DeleteNoticia = (noti) => {
    const[NoNoticias, setNoticias] = useState(noti.noti)
    const queryClient = useQueryClient();

    const deleteNoticias = useMutation({
        mutationFn: () => deleteNoticia(noti.NoNoticias),
        onSuccess: () => {
            queryClient.invalidateQueries("noticia");
        },
    });

    const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar la Noticia?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar noticia"
        }).then((result) => {
            if (result.isConfirmed) {
                // Realiza la mutación para eliminar la noticia
                deleteNoticias.mutate(NoNoticias, {
                    onSuccess: () => {
                        // Mostrar alerta de éxito
                        Swal.fire({
                            title: "Noticia eliminada",
                            text: "Los datos han sido eliminados",
                            icon: "success"
                        }).then(() => {
                            // Recargar la página después de que el usuario cierre la alerta
                            window.location.reload();
                        });
                    }
                });
            } else {
                // Si el usuario cancela
                result.dismiss === Swal.DismissReason.cancel;
            }
        });
    };





    return (
        <>
            <div className="align-right custom-button-delete">
                <Button 
                className="btn-3" 
                variant="danger" 
                onClick={handleConfirm}
                >
                    <span><i className="bi bi-trash3-fill"></i></span>
                    
                </Button>
            </div>
        </>
    );
};

export default DeleteNoticia;
