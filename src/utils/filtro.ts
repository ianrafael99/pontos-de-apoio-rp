import { Categoria, PontoDeApoio } from '../types';

export type Filtro = 'todos' | Categoria;

const semAcento = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function filtrarPontos(
  pontos: PontoDeApoio[],
  filtro: Filtro,
  busca: string,
): PontoDeApoio[] {
  const termo = semAcento(busca.trim());
  return pontos.filter((p) => {
    const naCategoria = filtro === 'todos' || p.categorias.includes(filtro);
    const naBusca =
      termo === '' ||
      semAcento(p.nome).includes(termo) ||
      semAcento(p.endereco).includes(termo);
    return naCategoria && naBusca;
  });
}
