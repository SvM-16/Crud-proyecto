import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { producto } from 'src/app/models/producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productoForm: FormGroup;
  titulo = 'Crear producto';
  id: string | null;

  constructor(private fb: FormBuilder,
              private router:Router,
              private toastr: ToastrService,
              private _productoService: ProductosService,
              private aRouter: ActivatedRoute) {
    this.productoForm = this.fb.group({
      producto:['', Validators.required],
      categoria:['', Validators.required],
      ubicacion:['', Validators.required],
      precio:['', Validators.required]
    })
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    console.log(this.productoForm)

    console.log(this.productoForm.get('producto')?.value)

    const PRODUCTO : producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if(this.id !== null){
      
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe(data =>{
      this.toastr.info('El producto fue actualizado!', 'actualizacion del producto !')
      this.router.navigate(['/lista-producto'])
      },error =>{
        console.log(error);
        this.productoForm.reset();
        this.toastr.error('Has tenido un error al guardalo','error')
      });

    }else{
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('El producto fue exitosamente registrado!', 'Producto registrado!')
        this.router.navigate(['/lista-producto'])
      },error =>{
        console.log(error);
        this.productoForm.reset();
        this.toastr.error('Has tenido un error al guardalo','error')
      })
    }
  }

  esEditar() {

    if(this.id !== null){
      this.titulo = 'Editar producto';
      this._productoService.obtenerProducto(this.id).subscribe(data =>{
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio
        })
      })
    }
  }

}
