import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast, ToastOptions, ToastType } from './toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private subject = new Subject<Toast>();

  constructor() { }

  // habilitar la suscripcion al observable de toast
  onToast(): Observable<Toast> {
    return this.subject.asObservable();
  }

  public success(message: string, options?: ToastOptions): void {
    this.sendToast(new Toast({type: ToastType.Success, message, ...options}));
  }

  public error(message: string, options?: ToastOptions): void {
    this.sendToast(new Toast({type: ToastType.Error, message, ...options}));
  }

  public info(message: string, options?: ToastOptions): void {
    this.sendToast(new Toast({type: ToastType.Info, message, ...options}));
  }

  public warning(message: string, options?: ToastOptions): void {
    this.sendToast(new Toast({type: ToastType.Warning, message, ...options}));
  }

  // limpiar los toast
  clear(): void {
    this.subject.next(new Toast());
  }

  // emitir el toast
  private sendToast(toast: Toast): void {
    this.subject.next(toast);
  }

}
