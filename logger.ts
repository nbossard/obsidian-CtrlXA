export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  NONE
}

export class Logger {
  private logLevel: LogLevel;

  constructor(logLevel: LogLevel = LogLevel.INFO) {
    this.logLevel = logLevel;
  }

  public setLogLevel(logLevel: string): void {
    switch (logLevel) {
      case 'DEBUG':
		this.logLevel = LogLevel.DEBUG;
		break;
      case 'INFO':
		this.logLevel = LogLevel.INFO;
		break;
      case 'WARNING':
		this.logLevel = LogLevel.WARNING;
		break;
      case 'ERROR':
		this.logLevel = LogLevel.ERROR;
		break;
      case 'NONE':
		this.logLevel = LogLevel.NONE;
        break;
      default:
		this.logLevel = LogLevel.INFO;
		break;
	}
  }


  private log(message: string, level: LogLevel): void {
    if (level >= this.logLevel) {
      const prefix = this.getLogPrefix();
      const prefixLevel = this.getLogLevelPrefix(level);
      console.log(`${prefix}${prefixLevel}${message}`);
    }
  }

  private getLogPrefix(): string {
    return 'CtrlXA - ';
  }

  private getLogLevelPrefix(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return 'DEBUG - ';
      case LogLevel.INFO:
        return 'INFO - ';
      case LogLevel.WARNING:
        return 'WARNING - ';
      case LogLevel.ERROR:
        return 'ERROR- ';
      default:
        return '';
    }
  }

  public debug(message: string): void {
    this.log(message, LogLevel.DEBUG);
  }

  public info(message: string): void {
    this.log(message, LogLevel.INFO);
  }

  public warning(message: string): void {
    this.log(message, LogLevel.WARNING);
  }

  public error(message: string): void {
    this.log(message, LogLevel.ERROR);
  }
}

