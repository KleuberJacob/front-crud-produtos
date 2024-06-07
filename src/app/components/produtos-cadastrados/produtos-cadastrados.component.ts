import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { ProdutoService } from 'src/app/services/ProdutosService';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-produtos-cadastrados',
  templateUrl: './produtos-cadastrados.component.html',
  styleUrls: ['./produtos-cadastrados.component.scss'],
  providers: [ProdutoService],
})
export class ProdutosCadastradosComponent implements OnInit, AfterViewInit {

  @Output() edicaoProduto: EventEmitter<any> = new EventEmitter();
  @Input() produtoSalvo: any;
  @Output() render: EventEmitter<any> = new EventEmitter();

  public produtos: ProdutoModel[] = [];
  public produto = new ProdutoModel();

  public pageSizeOptions: number[] = [5, 10, 25, 50];
  public paginaAtual = 0;
  public qtdItensNaPagina = 100;
  public qtdTotalItens = 0;

  displayedColumns: string[] = ['Registro', 'Nome', 'Preço', 'Excluir'];
  dataSource = new MatTableDataSource<ProdutoModel>(this.produtos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor( private produtoService: ProdutoService, private cdr: ChangeDetectorRef, private toastr: ToastrService ) {}

  ngOnInit() {
    this.getProdutos(this.paginaAtual, this.qtdItensNaPagina);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.produtoSalvo == true) {
      this.getProdutos(this.paginaAtual, this.qtdItensNaPagina);
      this.render.emit();
    }
  }

  getProdutos(pageIndex: number, pageSize: number) {
    this.produtoService.getProdutos(pageIndex, pageSize).subscribe({
      next: (data: ProdutoResponse) => {
        this.produtos = data.produtos;
        this.dataSource.data = this.produtos;
        this.qtdTotalItens = data.totalProdutos;
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.toastr.error("Ocorreu um erro na busca dos produtos!");
      }
    });
  }

  editarProduto(registro: string, nome: string, preco: number) {
    this.produto.registro = registro;
    this.produto.nome = nome;
    this.produto.preco = preco;
    this.edicaoProduto.emit(this.produto);
  }

  excluirProduto(registro: string) {
    this.produtoService.excluirProduto(registro).subscribe({
      next: () => {
        this.getProdutos(this.paginaAtual, this.qtdItensNaPagina);
        this.toastr.success("Produto excluido com sucesso!");
      },
      error: (error: any) => {
        this.toastr.error("Ocorreu um erro na exclusão do produto!")
      }
    });
  }

  handlePageEvent(pageEvent: PageEvent) {
    pageEvent.length = this.qtdTotalItens;
    this.paginaAtual = pageEvent.pageIndex;
  }

}

export interface ProdutoResponse {
    produtos: ProdutoModel[];
    totalProdutos: number;
}
