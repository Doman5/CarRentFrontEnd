import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadResponse} from "./model/upload-response";

@Injectable({
  providedIn: 'root'
})
export class AdminCarImageService {

  constructor(private http: HttpClient) { }

  uploadImage(formData: FormData): Observable<UploadResponse> {
    return this.http.post<UploadResponse>("/api/admin/products/upload-image", formData);
  }
}
