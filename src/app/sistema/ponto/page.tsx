"use client";
import { CustomDialogPortal } from "@/components/ui/custom-dialog-portal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePonto } from "@/hooks/usePonto";
import { visualizarHoraTotal } from "../../../../services/pontoService";

export default function Ponto() {
   
    // temporario enquanto ainda não temos autenticação do usuario
    const [usuarioId] = useState("882d7da4-1cfd-4756-aaac-56f419b88fcf");

    const { meta, setMeta, ponto, formatHora, handleRegistrarPonto, dataSelecionada, proximoDia, diaAnterior, tempoTotal, quantidadeTotal, setRegistrouPonto, registrouPonto } = usePonto(usuarioId);

    

    return (
        <div className="flex h-full justify-center flex-col ">
            <div className="flex flex-row items-start justify-start text-start h-11 w-full mb-4">
                <h1 className="text-2xl">Gerenciamento de Ponto</h1>
            </div>
            <div className="w-full bg-gray-400 rounded-2xl flex flex-col items-center justify-center h-4/5 ">
                <div className=" h-96 w-96 bg-amber-50 flex flex-col  p-6 ">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-4">
                            <ChevronLeft 
                                onClick={diaAnterior}
                                className="cursor-pointer"
                            />
                            <h2>{dataSelecionada.toLocaleDateString("pt-BR", { weekday: "long" })}</h2>
                            <ChevronRight 
                                onClick={proximoDia}
                                className="cursor-pointer"
                            />
                        </div>
                        <span>{dataSelecionada.toLocaleDateString("pt-BR")}</span>
                    </div>
                    <div className="flex justify-center">
                        <span> {formatHora(ponto?.pontoInicial ?? null)} </span>
                        <span> - </span>
                        <span> {formatHora(ponto?.pontoFinal ?? null)} </span>
                    </div>
                    <div className="flex justify-between mt-auto mb-auto">
                        <div className="flex flex-col bg-gray-500 rounded-sm p-4">
                            <span>Tempo Total:</span>
                            <span>{tempoTotal}</span>
                        </div>
                        <div className="flex flex-col bg-gray-500 rounded-sm p-4">
                            <span>Qtd. Pausas:</span>
                            <span>{quantidadeTotal}</span>
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
                                                        value={meta}
                                                        onChange={(e) => setMeta(e.target.value)}
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
                        
                            <button onClick={handleRegistrarPonto} className="flex cursor-pointer " >
                                <span>Registrar Ponto</span>
                            </button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}