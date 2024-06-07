import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { ProdutoService } from 'src/app/services/ProdutosService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-produtos',
  templateUrl: './cadastro-produtos.component.html',
  styleUrls: ['./cadastro-produtos.component.scss'],
  providers: [ ProdutoService ]
})

export class CadastroProdutosComponent {
  @Output() produtoSalvo: EventEmitter<boolean> = new EventEmitter();

  public produto = new ProdutoModel();
  public pageIndex = 0;
  public pageSize = 10;
  
  constructor( private produtoService: ProdutoService, private toastr: ToastrService ){}

  ngOnInit() {
    this.produtoService.getProdutos(this.pageIndex, this.pageSize);
  }

  salvar() {
    this.produtoService.salvar(this.produto).subscribe({
      next: () => {        
        this.produtoSalvo.emit();
        this.limparCampos();
        this.toastr.success('Produto salvo com sucesso!')
      },
      error: (erro) => {
        this.toastr.error('Ocorreu um erro!')
      }      
    });    
  }

  limparCampos() {
    this.produto = new ProdutoModel();
  }

}
