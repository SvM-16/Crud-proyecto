import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent implements OnInit {
  listProductos: producto[] = [];

  constructor(private _productoService: ProductosService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listProductos = data;
    },error =>{
      console.log(error);
      this.toastr.error('Has tenido un error con obtener el producto','error')
    })
  }

  deleteProducto(id: any){
    this._productoService.deleteProducto(id).subscribe(data =>{
      this.toastr.error('El producto fue eliminado con mucho exito','Producto eliminado');
      this.obtenerProductos();
    },error=>{
      this.toastr.error(error)
      this.toastr.error('Has tenido un error al eliminar','error')
    })
  }


}
