export interface Fruta {
    id: number;
    nome: string;
    categoria: string;
    preco: number;
    imagem: string;
    descricao: string;
  }
  
  export interface ItemCarrinho extends Fruta {
    quantidade: number;
  }