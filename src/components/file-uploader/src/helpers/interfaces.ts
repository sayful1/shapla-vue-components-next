interface FileObjectInterfaces {
  id: string;
  file: File;
  totalChunks: number;
  chunkSize: number;
  currentChunkIndex: number;
  chunkCompleteStatus: Record<number, { loaded: number; total: number; }>;
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

interface ArgsInterface {
  url: string;
  method: string;
  paramName: string;
  params: Record<string, string>;
  headers: Record<string, string>;
}

interface SuccessResponseInterface {
  data: string,
  status: number,
  start: number
}

export {
  FileObjectInterfaces,
  SuccessResponseInterface,
  ArgsInterface
};
