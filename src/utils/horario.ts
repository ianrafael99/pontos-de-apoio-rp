import { FaixaHorario } from '../types';

/** Horário regular de todos os Pontos de Apoio (0 = domingo … 6 = sábado). */
export function faixaDoDia(diaDaSemana: number): FaixaHorario {
  return diaDaSemana === 0 ? { abre: 7, fecha: 13 } : { abre: 7, fecha: 19 };
}

export interface Situacao {
  aberto: boolean;
  texto: string;
}

/** Diz se os Pontos de Apoio estão abertos no horário regular para a data informada. */
export function situacaoAgora(agora: Date): Situacao {
  const faixa = faixaDoDia(agora.getDay());
  const hora = agora.getHours() + agora.getMinutes() / 60;

  if (hora >= faixa.abre && hora < faixa.fecha) {
    return { aberto: true, texto: `Aberto agora · fecha às ${faixa.fecha}h` };
  }
  if (hora < faixa.abre) {
    return { aberto: false, texto: `Fechado · abre hoje às ${faixa.abre}h` };
  }
  const amanha = faixaDoDia((agora.getDay() + 1) % 7);
  return { aberto: false, texto: `Fechado · abre amanhã às ${amanha.abre}h` };
}
