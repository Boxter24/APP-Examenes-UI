import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Categoria {
    categoriaId: number = 0;
    titulo: string = '';
    descripcion: string = '';      
}