import { Injectable } from "@angular/core";
import { ProdutoModel } from "../model/produtoModel";
import { Observable } from "rxjs";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({ 
    providedIn: 'root'
})
export class ProdutoService {
      
    constructor(private http: HttpClient) {}

    private apiUrlBase = 'http://localhost:8080/api/v1/produto';

    getHttpHeaderOptions() {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
    
        return { headers: headers, params: new HttpParams() }; 
    }
  
    getProdutos(pageIndex: number, pageSize: number): Observable<ProdutoResponse> {
        let options = this.getHttpHeaderOptions();

        options.params = options.params.set('pagina', `${pageIndex}`).set('qtdItens', `${pageSize}`);
        
        return this.http.get<ProdutoResponse>(this.apiUrlBase, options);
    }

    salvar(produto: ProdutoModel) {
        return this.http.post(this.apiUrlBase, produto);      
    }

    excluirProduto(registro: string) {
      let excluir = "excluir/";
      
      return this.http.delete(`${this.apiUrlBase}/${excluir}${registro}`);
    }

    editar(produto: ProdutoModel) {
      let editar = "editar/";
      
      return this.http.put(`${this.apiUrlBase}/${editar}${produto.registro}`, produto);    
    }
}

export interface ProdutoResponse {
    produtos: ProdutoModel[];
    totalProdutos: number;
}


    