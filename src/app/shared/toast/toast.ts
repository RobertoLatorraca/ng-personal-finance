export class Toast {
    type!: ToastType;
    message!: string;
    autoClose: boolean = true;
    keepAfterRouteChange: boolean = false;

    constructor(init?:Partial<Toast>) {
        Object.assign(this, init);
    }

}

export enum ToastType {
    Success,
    Error,
    Info,
    Warning
}

export class ToastOptions {
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
}
