import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenu } from "../../api/menu";
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';

const DeleteMenu = (menu) => {
    const[NoMenu, setMenus] = useState(menu.menu)
    const queryClient = useQueryClient();

    const deleteMenus = useMutation({
        mutationFn: () => deleteMenu(menu.NoMenu),
        onSuccess: () => {
            queryClient.invalidateQueries("menu");
        },
    });

    const handleConfirm = () => {
        Swal.fire({
            title: "¿Seguro al eliminar el Menú?",
            text: "No se podran revertir los cambios",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar Menú"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMenus.mutate(NoMenu, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "El menú ha sido eliminada",
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
export default DeleteMenu;