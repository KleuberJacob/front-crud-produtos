import { Component, Input } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';

@Component({
  selector: 'app-insert-produtos',
  templateUrl: './insert-produtos.component.html',
  styleUrls: ['./insert-produtos.component.scss']
})
export class InsertProdutosComponent {    
  @Input() renderizacao: any;

  public produto = new ProdutoModel();

  onEdicaoProduto(produto: ProdutoModel) {    
    this.produto.registro =  produto.registro;
    this.produto.nome =  produto.nome;
    this.produto.preco =  produto.preco;
  }

  onProdutoSalvo() {    
    this.renderizacao = true;
  }

  onProdutoSalvoEdit() {    
    this.renderizacao = true;
    this.produto = new ProdutoModel();
  }

  onReRender() {    
    this.renderizacao = false;
  }

}
