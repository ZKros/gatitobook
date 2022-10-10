import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

	constructor(
		private token: TokenService,

	) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		if (this.token.possuiToken()) {
			const token = this.token.retornaToken();
			const headers = new HttpHeaders().append('x-access-token', token);
			request = request.clone({ headers });
		}

		return next.handle(request);
	}
}
