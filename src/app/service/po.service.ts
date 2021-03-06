import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {buildPathParams} from '../util/http-util';

const API_SERVER = environment.apiUrl;
const API_PATH = API_SERVER + '/purchaseOrder';

@Injectable({
  providedIn: 'root'
})
export class PoService {

  constructor(private http: HttpClient) {
  }

  getDefaultPo(id: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(API_PATH + '/getDefaultPo/' + id, {observe: 'response'});
  }

  create(po: any, assignmentId): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATH + '/save/' + assignmentId, po, {observe: 'response'});
  }

  findById(id: any): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(API_PATH + '/findById/' + id, {observe: 'response'});
  }

  downloadPO(poId): Observable<any> {
    return this.http.post<any>(API_PATH + '/exportPo/' + poId, null, {responseType: 'blob' as 'json'});
  }

  search(pmVtcCode, page, size, keyWord, orderBy, sortDirection,
         _rootFilters = [], _poFilters = [], _projectFilters = [], _candidateFilters = []): Observable<HttpResponse<any>> {
    const path = buildPathParams(page, size, keyWord, orderBy, sortDirection);
    const params = {
      rootFilters: _rootFilters,
      poFilters: _poFilters,
      projectFilters: _projectFilters,
      candidateFilters: _candidateFilters,
    };
    return this.http.post<HttpResponse<any>>(API_PATH + '/search/' + pmVtcCode + '/' + path, params, {observe: 'response'});
  }

  deleteById(id: any): Observable<HttpResponse<any>> {
    return this.http.delete(API_PATH + '/' + id, {observe: 'response'});
  }
}
