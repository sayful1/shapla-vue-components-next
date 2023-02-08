import { ArgsInterface, FileObjectInterfaces, SuccessResponseInterface } from "./interfaces";

const pad = {
  left(pad: string, string: string) {
    return this.pad(pad, string, true);
  },
  right(pad: string, string: string) {
    return this.pad(pad, string, false);
  },
  pad(pad: string, string: string | undefined, left: boolean) {
    if (typeof string === "undefined") {
      return pad;
    }

    if (left) {
      return (pad + string).slice(-pad.length);
    }

    return (string + pad).substring(0, pad.length);
  }
};

/**
 * Calculate remaining time
 */
const timeRemaining = {
  averageSpeed: 0,
  _getMovingAverage(bytesBySecond: number): number {
    if (!this.averageSpeed) {
      this.averageSpeed = bytesBySecond;
    }

    return 0.005 * bytesBySecond + (1 - 0.005) * this.averageSpeed;
  },
  calculate(totalBytes: number, loadedBytes: number, timeStarted: number) {
    if (!totalBytes || !loadedBytes) {
      return 0;
    }

    const secondsElapsed = (new Date().getTime() - timeStarted) / 1000;
    const bytesBySecond = secondsElapsed ? loadedBytes / secondsElapsed : 0;

    return Math.ceil(
      (totalBytes - loadedBytes) / this._getMovingAverage(bytesBySecond)
    );
  }
};

/**
 * Get file Object
 */
const generateFileObject = (file: File, chunkSizeInBytes: number | null = null): FileObjectInterfaces => {
  if (!chunkSizeInBytes) {
    chunkSizeInBytes = file.size;
  }
  const numberOfChunks = Math.ceil(file.size / chunkSizeInBytes);
  return {
    id: Date.now() + Math.floor(Math.random() * 100).toString(),
    file: file,
    totalChunks: numberOfChunks,
    chunkSize: chunkSizeInBytes,
    currentChunkIndex: 0,
    chunkCompleteStatus: {},
    progress: 0,
    loadedBytes: 0,
    totalBytes: 0,
    timeStarted: (new Date).getTime(),
    secondsRemaining: 0,
    finished: false,
    cancelled: false,
    failed: false,
    xhr: null
  };
};

/**
 *
 * @param {ProgressEvent} oEvent
 * @param fileObject
 */
const updateProgress = (oEvent: ProgressEvent, fileObject: FileObjectInterfaces) => {
  if (oEvent.lengthComputable) {
    const chunkPercentComplete = Math.round(oEvent.loaded / oEvent.total * 100);
    const totalPercentComplete = Math.round(fileObject.currentChunkIndex / fileObject.totalChunks * 100 + chunkPercentComplete / fileObject.totalChunks);

    fileObject.chunkCompleteStatus[fileObject.currentChunkIndex] = {
      loaded: oEvent.loaded,
      total: oEvent.total
    };

    let loaded = 0, total = 0;
    for (const status in fileObject.chunkCompleteStatus) {
      const value = fileObject.chunkCompleteStatus[status];
      loaded += value.loaded;
      total += value.total;
    }

    fileObject.loadedBytes = loaded;
    fileObject.totalBytes = total;
    fileObject.progress = totalPercentComplete;
    if (0 === totalPercentComplete % 5 || 0 === fileObject.secondsRemaining) {
      fileObject.secondsRemaining = timeRemaining.calculate(fileObject.file.size, fileObject.loadedBytes, fileObject.timeStarted);
    }
  }
};

/**
 *
 * @param fileObject
 * @param {Number} start
 * @param {XMLHttpRequest} oReq
 * @param {Object} args
 * @returns {Promise<unknown>}
 */
const onUploaded = (fileObject: FileObjectInterfaces, start: number, oReq: XMLHttpRequest, args: ArgsInterface) => {
  const contentType = oReq.getResponseHeader("Content-Type"),
    isJsonResponse = (contentType && contentType.indexOf("application/json") !== -1),
    response = isJsonResponse ? JSON.parse(oReq.responseText) : oReq.responseText;

  return new Promise((resolve, reject) => {
    if (oReq.status >= 200 && oReq.status < 300) {
      //next chunk starts at + chunkSize from start
      start += fileObject.chunkSize;
      //if start is smaller than file size - we have more to still upload
      if (start < fileObject.file.size) {
        // Create the new chunk
        fileObject.currentChunkIndex++;
        resolve({ data: response, status: oReq.status, start: start });
      } else {
        fileObject.finished = true;
        resolve({ data: response, status: oReq.status });
      }
    } else {
      fileObject.failed = true;
      reject({ error: response, status: oReq.status });
    }
  });
};

const getChunkFormData = (args: ArgsInterface, chunk: Blob | File, fileObject: FileObjectInterfaces) => {
  const chunkFormData = new FormData();
  chunkFormData.append(args.paramName, chunk, fileObject.file.name);

  const params = {
    ...args.params,
    chunk: fileObject.currentChunkIndex.toString(),
    chunks: fileObject.totalChunks.toString(),
    name: fileObject.file.name
  };
  for (const [key, value] of Object.entries(params)) {
    chunkFormData.append(key, value);
  }
  return chunkFormData;
};

const uploadChunk = (fileObject: FileObjectInterfaces, start: number, args: ArgsInterface) => {
  return new Promise((resolve, reject) => {
    const chunkEnd = Math.min(start + fileObject.chunkSize, fileObject.file.size);
    const chunk = fileObject.file.slice(start, chunkEnd);

    const chunkFormData = getChunkFormData(args, chunk, fileObject);

    const oReq = new XMLHttpRequest();

    oReq.upload.addEventListener("progress", (event) => updateProgress(event, fileObject));
    oReq.open(args.method, args.url, true);

    const headers = { ...args.headers, Accept: "application/json" };
    for (const [headerName, headerValue] of Object.entries(headers)) {
      if (headerName && headerValue) {
        oReq.setRequestHeader(headerName, headerValue);
      }
    }

    const blobEnd = chunkEnd - 1;
    const contentRange = "bytes " + start + "-" + blobEnd + "/" + fileObject.file.size;
    oReq.setRequestHeader("Content-Range", contentRange);

    oReq.addEventListener("load", () => {
      onUploaded(fileObject, start, oReq, args).then((data: SuccessResponseInterface) => {
        if (data.start) {
          uploadChunk(fileObject, data.start, args)
            .then((_data) => resolve(_data))
            .catch((_data) => reject(_data));
        } else {
          resolve({ fileObject, data: data.data });
        }
      }).catch(error => {
        reject({ fileObject, error });
      });
    });
    oReq.send(chunkFormData);
  });
};

export {
  pad,
  timeRemaining,
  generateFileObject,
  uploadChunk
};
