import { useEffect, useState } from "react";
import { buscarPontoDiario, registrarPonto, visualizarHoraTotal } from "../../services/pontoService";
import { toast } from "sonner";

export function usePonto(usuarioId: string) {
    const [ meta, setMeta ] = useState("");

    const [ponto, setPonto] = useState<{ pontoInicial: string; pontoFinal: string } | null>(null);

    const [dataSelecionada, setDataSelecionada] = useState(new Date());

    const [tempoTotal, setTempoTotal] = useState<string>('');

    function diaAnterior() {
        setDataSelecionada(prev => {
            const novaData = new Date(prev);
            novaData.setDate(prev.getDate() - 1);
            return novaData;
        });
    }

    function proximoDia() {
        setDataSelecionada(prev => {
            const novaData = new Date(prev);
            novaData.setDate(prev.getDate() + 1);
            return novaData;
        });
    }

    const formatHora = (isoString: string | null) => {
        if (!isoString) return "00:00:00";
        const date = new Date(isoString);
        return date.toLocaleTimeString("pt-BR", { hour12: false }); // HH:MM:SS
    };

     async function buscarPontoDoDia(data: Date) {
        try {
            const dataString = data.toISOString().split("T")[0]; // YYYY-MM-DD
            const pontos = await buscarPontoDiario(usuarioId, dataString);

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


    async function handleRegistrarPonto(e: React.FormEvent) {
        try {
            const ponto = await registrarPonto({id_usuario: usuarioId, meta});
            toast.success("Ponto registrado com sucesso!")
            buscarPontoDoDia(dataSelecionada);
        } catch {
            toast.error("Não foi possível registrar seu ponto")
        }
    }

    function formatarDuration(duration: string): string {
        const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/;
        const match = duration.match(regex);

        if (!match) return duration; // caso venha algo inesperado

        const horas = match[1] ? `${match[1]}h ` : "";
        const minutos = match[2] ? `${match[2]}min ` : "";
        const segundos = match[3] ? `${Math.floor(parseFloat(match[3]))}s` : "";

        const resultado = `${horas}${minutos}${segundos}`.trim();

        return resultado || "0s";
    }

    useEffect(() => {
        async function buscarTempo() {
        try {
            // Converte a data selecionada para formato yyyy-MM-dd
            const data = dataSelecionada.toISOString().split("T")[0];

            // Chama o endpoint do backend
            const resultado = await visualizarHoraTotal(usuarioId, data);

            const tempoFormatado = formatarDuration(resultado);

            // Atualiza o estado com o retorno do backend
            setTempoTotal(tempoFormatado);
        } catch (error) {
            console.error("Erro ao buscar tempo total:", error);
        }
        }

        buscarTempo();
    }, [dataSelecionada, usuarioId]);



    useEffect(() => {
        buscarPontoDoDia(dataSelecionada);
    }, [dataSelecionada]);

    return {
        meta,
        setMeta,
        ponto,
        formatHora,
        handleRegistrarPonto,
        dataSelecionada,
        diaAnterior,
        proximoDia,
        formatarDuration,
        tempoTotal,
        setTempoTotal
    };
}