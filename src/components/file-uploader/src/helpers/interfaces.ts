interface FileObjectInterfaces {
  id: string;
  file: File;
  progress: number;
  failed: boolean;
  loadedBytes: number;
  totalBytes: number;
  timeStarted: number;
  secondsRemaining: number;
  finished: boolean;
  cancelled: boolean;
  xhr: null | XMLHttpRequest;
}

export { FileObjectInterfaces };
