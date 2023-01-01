import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

    messages: Array<string> = [];
    subject = new Subject<Array<string>>();

    constructor() { }

    add(message: string) {
      this.clear();
      this.messages.push(message);
      this.subject.next(this.messages);
    }

    addSpringError(error: any): void {
      this.clear();
      console.log(error)
      this.extractMessages(error);
      this.subject.next(this.messages);
    }


    clear() {
      this.messages = [];
    }

  private extractMessages(error: any) {
      if (error.errors?.length > 0) {
        for (let err of error.errors) {
          this.messages.push("Pole: " + err.field + " -> " + err.defaultMessage);
        }
      } else {
        this.messages.push(error.message);
      }
    }
}
