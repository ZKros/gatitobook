import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
	selector: 'app-comentarios',
	templateUrl: './comentarios.component.html',
	styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

	@Input() id!: number;
	comentarios$!: Observable<Comentarios>;
	comentarioForm!: FormGroup;

	constructor(
		private comentario: ComentariosService,
		private formBuilder: FormBuilder,
	) { }

	ngOnInit(): void {
		this.comentarios$ = this.comentario.buscarComentario(this.id);
		this.comentarioForm = this.formBuilder.group({
			comentario: ['', Validators.maxLength(300)],
		})
	}

	gravar(): void {
		const comentario = this.comentarioForm.get('comentario')?.value ?? '';

		this.comentarios$ = this.comentario.incluirComentario(this.id, comentario).pipe(
			switchMap(() => this.comentario.buscarComentario(this.id)),
			tap(() => {
				this.comentarioForm.reset();
				alert('Comentario salvo');
			})
		);

	}
}
