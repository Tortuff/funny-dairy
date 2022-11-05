import { Message } from 'primeng/api';

export class ToastMessage implements Message {
  severity?: ToastMessageSeverity;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  icon?: string;
  contentStyleClass?: string;
  styleClass?: string;

  constructor(message?: ToastMessage) {
    message && Object.assign(this, message);
  }
}

export class ToastErrorMessage extends ToastMessage {
  summary = `Error`;
  severity = ToastMessageSeverity.error;

  constructor(detail: string, meta?: Omit<ToastMessage, 'summary' | 'severity'>) {
    super();
    meta && Object.assign(this, meta);
    this.detail = detail;
  }
}

export class ToastSuccessMessage extends ToastMessage {
  summary = `Success`;
  severity = ToastMessageSeverity.success;

  constructor(detail: string, meta?: Omit<ToastMessage, 'summary' | 'severity'>) {
    super();
    meta && Object.assign(this, meta);
    this.detail = detail;
  }
}

export class ToastWarningMessage extends ToastMessage {
  summary = `Warning`;
  severity = ToastMessageSeverity.warning;

  constructor(detail: string, meta?: Omit<ToastMessage, 'summary' | 'severity'>) {
    super();
    meta && Object.assign(this, meta);
    this.detail = detail;
  }
}

export class ToastInfoMessage extends ToastMessage {
  summary = `Info`;
  severity = ToastMessageSeverity.info;

  constructor(detail: string, meta?: Omit<ToastMessage, 'summary' | 'severity'>) {
    super();
    meta && Object.assign(this, meta);
    this.detail = detail;
  }
}

export enum ToastMessageSeverity {
  success = 'success',
  warning = 'warn',
  info = 'info',
  error = 'error',
}
