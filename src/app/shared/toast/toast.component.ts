import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Toast, ToastType } from './toast';
import { ToastService } from './toast.service';

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {

  @Input()
  autoCloseTime: number = 4000;

  toastType = ToastType;

  toasts: Toast[] = [];
  toastSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(private toastService: ToastService, private router: Router) {
    // subscripcion a las notificaciones de toast
    this.toastSubscription = this.toastService.onToast().subscribe(
      toast => {
        // limpiar el array al recibir un toast sin mensaje
        if (!toast.message) {
          // limpiar los toasts que no permanecen despues de un cambio de ruta
          this.toasts = this.toasts.filter(t => t.keepAfterRouteChange);
          // anular la permanencia despues de un cambio de ruta para los toasts restantes
          this.toasts.forEach(t => t.keepAfterRouteChange = false);
          return;
        }
        // añadir el toast al array
        this.toasts.push(toast);
        // ejecutar el autoclose del toast
        if (toast.autoClose) setTimeout(() => this.removeToast(toast), this.autoCloseTime);
      }
    );
    // limpiar toasts al navegar
    this.routerSubscription = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.toastService.clear();
        }
      }
    );
  }

  ngOnInit(): void {
  }

  // eliminar las subscripciones
  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }

  // remover el toast del array
  removeToast(toast: Toast): void {
    // verificar que el toast exista antes de removerlo
    if (!this.toasts.includes(toast)) return;
    this.toasts = this.toasts.filter(t => t != toast);
  }

  cssClass(toast: Toast) {
    if (!toast) return;
    let classes: string[] = [];
    const toastTypeClass = {
        [ToastType.Success]: 'toast-success',
        [ToastType.Error]: 'toast-error',
        [ToastType.Info]: 'toast-info',
        [ToastType.Warning]: 'toast-warning'
    }
    classes.push(toastTypeClass[toast.type]);
    return classes.join(' ');
  }

}
