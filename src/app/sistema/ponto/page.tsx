import { CustomDialogPortal } from "@/components/ui/custom-dialog-portal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Ponto() {
    return (
        <div className="flex h-full justify-center flex-col ">
            <div className="flex flex-row items-start justify-start text-start h-11 w-full mb-4">
                <h1 className="text-2xl">Gerenciamento de Ponto</h1>
            </div>
            <div className="w-full bg-gray-400 rounded-2xl flex flex-col items-center justify-center h-4/5 ">
                <div className=" h-96 w-96 bg-amber-50 flex flex-col  p-6 ">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            <ChevronLeft />
                            <h2>Terça-Feira</h2>
                            <ChevronRight />
                        </div>
                        <span>01/10/2025</span>
                    </div>
                    <div className="flex justify-center">
                        <span>00:00:00 </span>
                        <span> - </span>
                        <span>00:00:00</span>
                    </div>
                    <div className="flex justify-between mt-auto mb-auto">
                        <div className="flex flex-col bg-gray-500 rounded-sm p-4">
                            <span>Tempo Total:</span>
                            <span>00:00:00</span>
                        </div>
                        <div className="flex flex-col bg-gray-500 rounded-sm p-4">
                            <span>Qtd. Pausas:</span>
                            <span>0</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                        <div className="flex bg-gray-500 rounded-sm p-2 justify-center flex-col  items-center">
                        
                           
                            <Dialog>
                                <DialogTrigger>Configuração de Ponto</DialogTrigger>
                                <CustomDialogPortal >
                                    <DialogContent className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <DialogHeader>
                                            <DialogTitle> Configuração de Ponto </DialogTitle>
                                            <DialogDescription>
                                                
                                                <div className="flex flex-col gap-2">
                                                    <span>Meta de horas por dia:</span>
                                                    <input
                                                        type="time"
                                                        className="rounded-lg border border-black p-2"
                                                    />
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>

                                </CustomDialogPortal>
                            </Dialog>
                            
                        </div>

                        <div className="flex bg-gray-500 rounded-sm p-2 justify-center flex-col  items-center">
                        
                            <button className="flex cursor-pointer " >
                                <span>Registrar Ponto</span>
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}