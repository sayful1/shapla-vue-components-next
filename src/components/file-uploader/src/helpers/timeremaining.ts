const timeRemaining = {
  cache: {
    averageSpeed: null,
  },
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
  },
};

export default timeRemaining;
