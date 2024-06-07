import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { ProdutoService } from 'src/app/services/ProdutosService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.scss'],  
})
export class EditarProdutoComponent {
  @Input() edicaoProduto: ProdutoModel = new ProdutoModel;
  @Output() produtoSalvoEdit: EventEmitter<boolean> = new EventEmitter();

  public produto = new ProdutoModel();

  constructor( private produtoService: ProdutoService, private toastr: ToastrService ) {}

  salvarEdicao() {
    this.produto.registro = this.edicaoProduto.registro;
    this.produto.nome = this.edicaoProduto.nome;
    this.produto.preco = this.edicaoProduto.preco !== null ? this.edicaoProduto.preco : 0;

    this.produtoService.editar(this.produto).subscribe({
      next: () => {        
        this.produtoSalvoEdit.emit();
        this.limparCampos();
        this.toastr.success("Produto editado com sucesso!");
      },
      error: (erro) => {
        this.toastr.error("Ocorreu um erro na edição do produto!");
      }      
    });    
  }  

  limparCampos() {
    this.edicaoProduto = new ProdutoModel();
  }

}
