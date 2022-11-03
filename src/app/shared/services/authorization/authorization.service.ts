import { Injectable } from '@angular/core'
import { HttpService } from '@shared/services/http/http.service'

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  constructor(private readonly httpService: HttpService) {}
}
