import { history } from 'umi';
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { API_PREFIX } from '@/constants';
export interface ResponseData {
  code: number;
  data?: any;
  msg?: string;
}

console.log(process.env.NODE_ENV);


/**
 * 异常处理程序
 */
const errorHandler = (error: {
  response: Response;
  message: string;
  data: any;
}) => {
  const { response, message, data } = error;
  console.log(error);

  if (message === 'CustomError') {
    const { res } = data;
    const { msg } = res;

    notification.error({
      message: `提示`,
      description: msg,
    });
  }

  throw error; // 如果throw. 错误将继续抛出,走catch流程.
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  prefix: API_PREFIX,
});

request.use(async (ctx, next) => {
  await next();

  // 请求后
  const { res }: { res: ResponseData } = ctx;
  const { code, msg } = res;

  if (code !== 200) {
    return Promise.reject({
      data: ctx,
      message: 'CustomError',
    });
  }
});

export default request;
