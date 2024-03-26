import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs'; // log 파일을 관리할 폴더

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
});

const dailyOptions = (level: string) => {
  return {
    level,
    datePattern: 'YYYY-MM-DD',
    dirname: logDir + `/${level}`,
    filename: `%DATE%.${level}.log`,
    maxFiles: 30, //30일치 로그파일 저장
    zippedArchive: true, // 로그가 쌓이면 압축하여 관리
  };
};

export const WinstonLogger = WinstonModule.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({
      level: true,
      all: true,
      message: true,
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue',
      },
    }),
    winston.format.align(),
    winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      utilities.format.nestLike('SF', {
        colors: true,
        prettyPrint: true, // nest에서 제공하는 옵션. 로그 가독성을 높여줌
      }),
    ),
  ),
  transports: [
    new winston.transports.Console({
      level: env === 'prod' ? 'http' : 'silly',
    }),
    new DailyRotateFile(dailyOptions('info')),
    new DailyRotateFile(dailyOptions('error')),
    new DailyRotateFile(dailyOptions('warn')),
    new DailyRotateFile(dailyOptions('debug')),
  ],
});
