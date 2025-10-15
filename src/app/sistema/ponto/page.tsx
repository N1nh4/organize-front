"use client";
import { CustomDialogPortal } from "@/components/ui/custom-dialog-portal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader } from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { buscarPontoDiario, registrarPonto } from "../../../../services/pontoService";
import { toast } from "sonner";

export default function Ponto() {
    const [ meta, setMeta ] = useState("");
    const [usuarioId] = useState("882d7da4-1cfd-4756-aaac-56f419b88fcf");

    const [ponto, setPonto] = useState<{ pontoInicial: string; pontoFinal: string } | null>(null);

    async function handleRegistrarPonto(e: React.FormEvent) {
        try {
            const ponto = await registrarPonto({id_usuario: usuarioId, meta});
            toast.success("Ponto registrado com sucesso!")
            buscarPontoHoje();
        } catch {
            toast.error("Não foi possível registrar seu ponto")
        }
    }

    const formatHora = (isoString: string | null) => {
        if (!isoString) return "00:00:00";
        const date = new Date(isoString);
        return date.toLocaleTimeString("pt-BR", { hour12: false }); // HH:MM:SS
    };

    async function buscarPontoHoje() {
        try {
            const hoje = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            const pontos = await buscarPontoDiario(usuarioId, hoje);

            if (pontos.length > 0) {
            // Ordena por pontoInicial
            const pontosOrdenados = pontos.sort(
                (a: any, b: any) => new Date(a.pontoInicial).getTime() - new Date(b.pontoInicial).getTime()
            );

            const primeiroPonto = pontosOrdenados[0].pontoInicial;
            const ultimoPonto = pontosOrdenados[pontosOrdenados.length - 1].pontoFinal;

            setPonto({
                pontoInicial: primeiroPonto,
                pontoFinal: ultimoPonto
            });
            }

        } catch (error) {
            console.error(error);
        }
        }


    useEffect(() => {
        buscarPontoHoje();
    }, []);


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
                        <span> {formatHora(ponto?.pontoInicial ?? null)} </span>
                        <span> - </span>
                        <span> {formatHora(ponto?.pontoFinal ?? null)} </span>
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