import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSugerencia } from "../../api/sugerencia";
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';

const DeleteSuge = (suge) => {
    const[NoSugerencia, setSugerencias] = useState(suge.suge)
    const queryClient = useQueryClient();

    const deleteSugerencias = useMutation({
        mutationFn: () => deleteSugerencia(suge.NoSugerencia),
        onSuccess: () => {
            queryClient.invalidateQueries("noticia");
        },
    });

    const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar la Sugerencia?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar la sugerencia"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteSugerencias.mutate(NoSugerencia, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "La sugerencia eliminada",
                            text: "Los datos han sido eliminados",
                            icon: "success"
                        }).then(() => {
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
export default DeleteSuge;