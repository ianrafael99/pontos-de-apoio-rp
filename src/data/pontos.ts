import { PontoDeApoio } from '../types';

/**
 * Fonte dos nomes, endereços, horários e materiais:
 * Prefeitura de São José do Rio Preto – página "Pontos de Apoio"
 * https://www.riopreto.sp.gov.br/pontodeapoio
 *
 * As coordenadas foram obtidas pela geocodificação dos endereços oficiais e
 * são aproximadas: servem para ordenar por proximidade e abrir a rota no mapa.
 */
export const FONTE_OFICIAL = {
  nome: 'Prefeitura de São José do Rio Preto – Pontos de Apoio',
  url: 'https://www.riopreto.sp.gov.br/pontodeapoio',
  consultadoEm: '14/11/2026',
  telefonePrefeitura: '(17) 3203-1100',
};

export const PONTOS_DE_APOIO: PontoDeApoio[] = [
  {
    id: 'anna-celia',
    nome: 'Anna Célia',
    endereco: 'Rua Alcides Cardoso Treme / Rua Direitos Humanos',
    categorias: ['verdes', 'outros'],
    coordenada: { latitude: -20.778813, longitude: -49.3975909 },
  },
  {
    id: 'jardim-atlantico',
    nome: 'Jardim Atlântico',
    endereco: 'Av. Nametallah Youssef Tarraf / Rua Ramon Arnal Martinês',
    categorias: ['verdes', 'outros'],
    coordenada: { latitude: -20.7876769, longitude: -49.4133278 },
  },
  {
    id: 'castelinho',
    nome: 'Castelinho',
    endereco: 'Rua Ary Pereira, 940 / esquina com Rua Francisco Rilo',
    categorias: ['verdes'],
    coordenada: { latitude: -20.7734959, longitude: -49.3597057 },
  },
  {
    id: 'nova-esperanca',
    nome: 'Nova Esperança',
    endereco: 'Av. Accacio Fernandes / com Rua Walter Sternieri',
    categorias: ['verdes'],
    coordenada: { latitude: -20.7402896, longitude: -49.4203262 },
  },
  {
    id: 'vitoria-regia',
    nome: 'Vitória Régia – Soraya',
    endereco: 'Av. Nagib Gabriel, 5581-5600 – Jardim Vitória Régia',
    categorias: ['verdes'],
    coordenada: { latitude: -20.8244892, longitude: -49.3487761 },
  },
  {
    id: 'nazareth',
    nome: 'Nazareth',
    endereco:
      'Av. Dr. Solon Varginha / Rua Francisco Felipe Caputo / Rua Beni Roquette',
    categorias: ['verdes'],
    coordenada: { latitude: -20.7867362, longitude: -49.3650906 },
  },
  {
    id: 'santo-antonio',
    nome: 'Santo Antônio',
    endereco: 'R. Kazutoshi Sakakibara, 953',
    categorias: ['verdes'],
    coordenada: { latitude: -20.7585522, longitude: -49.402766 },
  },
  {
    id: 'sao-francisco',
    nome: 'São Francisco',
    endereco: 'Av. Benedito Rodrigues Lisboa, 1.100',
    categorias: ['verdes'],
    coordenada: { latitude: -20.843925, longitude: -49.384595 },
  },
  {
    id: 'engenheiro-schmitt',
    nome: 'Engenheiro Schmitt',
    endereco: 'Estr. Vicinal p/ Eng. Schmitt, 1414',
    categorias: ['outros'],
    coordenada: { latitude: -20.8551462, longitude: -49.3220726 },
  },
  {
    id: 'sao-jose-do-rio-preto-1',
    nome: 'São José do Rio Preto 1',
    endereco: 'Rua Professor Ernesto Vieira / Av. Marco Constantini',
    categorias: ['outros'],
    coordenada: { latitude: -20.7629061, longitude: -49.3659418 },
  },
  {
    id: 'parque-das-flores',
    nome: 'Parque das Flores',
    endereco: 'Rua Anna R. Liebana, 801 / Av. Valdomiro Lopes da Silva',
    categorias: ['outros'],
    coordenada: { latitude: -20.7754162, longitude: -49.3787779 },
  },
  {
    id: 'lealdade-e-amizade',
    nome: 'Lealdade e Amizade',
    endereco: 'Av. Geraldo de Paiva Ferreira / com Rua Monoel Micelli',
    categorias: ['outros'],
    coordenada: { latitude: -20.7554615, longitude: -49.3269671 },
  },
  {
    id: 'anna-angelica-gabriela',
    nome: 'Anna Angélica / Gabriela',
    endereco: 'Av. Bento Abelaria Gomes, 1461',
    categorias: ['outros'],
    coordenada: { latitude: -20.7930485, longitude: -49.4238261 },
  },
  {
    id: 'solo-sagrado',
    nome: 'Solo Sagrado',
    endereco:
      'Av. Alfredo Teodoro de Oliveira, 370, esquina com R. Olga Rillo Fragoso',
    categorias: ['outros'],
    coordenada: { latitude: -20.7697945, longitude: -49.4183202 },
    coordenadaAConfirmar: true,
  },
];

/** Unidades citadas pela Prefeitura que não estão recebendo materiais. */
export const PONTOS_FECHADOS = [
  { nome: 'Fazenda Ambiental', situacao: 'Em melhorias, sem data de reabertura' },
  { nome: 'Jardim Yolanda', situacao: 'Fechado por tempo indeterminado' },
  { nome: 'Jardim Conceição', situacao: 'Fechado em definitivo desde 6/5/2024' },
];

export const HORARIO_TEXTO = [
  'Segunda a sábado: das 7h às 19h',
  'Domingos: das 7h às 13h',
];

export const AVISO_FERIADOS =
  'Em feriados e pontos facultativos o horário pode mudar. Confira os avisos da Prefeitura.';

export const PODE_LEVAR = [
  'Resíduos verdes: troncos, galhos e restos de poda, jardinagem e paisagismo',
  'Madeira, plástico, metal, vidro, papel e papelão',
  'Móveis sem condições de uso',
  'Eletrodomésticos sem condições de uso',
  'Materiais cerâmicos (tijolo, pisos, azulejos etc.)',
  'Entulho de construção e demolição em pequena quantidade (até 1 m³)',
];

export const NAO_PODE_LEVAR = [
  'Entulho de construção e demolição acima de 1 m³',
  'Lixo doméstico',
  'Lixo hospitalar ou de serviços de saúde (dentistas, clínicas veterinárias, clínicas estéticas etc.)',
];

export const ROTULO_CATEGORIA = {
  verdes: 'Preferencial para resíduos verdes',
  outros: 'Outros resíduos',
} as const;
