import { useRef, useState } from 'react';
import './App.css';
import Axios from '../lib/Axios';
import Card from './Card';

const axios = new Axios();

axios.interceptors.request.use(
  function (config) {
    config.headers = {
      token: 'add by request interceptors',
    };
    config.metadata = {startTime: Date.now()};
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    response.extraData = 'add by response interceptors';
    // 接口请求耗时
    response.duration = Date.now() - response.config.metadata.startTime;
    return response;
  },
  function (error) {
    if (error.status === 404) {
      alert('返回状态码为404，重定向到404页面');
    }
    return Promise.reject(error);
  }
);

function App() {
  const [result, setResult] = useState({});
  const abortRef = useRef();

  const getData = async () => {
    const res = await axios.get(`https://run.mocky.io/v3/0a4e2970-39b4-4bb5-9a12-06e47408e2a3`);
    setResult({ ...result, get: JSON.stringify(res) });
  };

  const getRedirectData = async () => {
    await axios.get('https://run.mocky.io/v3/ba836dff-bbbf-4753-962e-d8a9db21bda1');
  };

  const getTimeoutData = async () => {
    await axios.get(
      'https://run.mocky.io/v3/0a4e2970-39b4-4bb5-9a12-06e47408e2a3?mocky-delay=20000ms',
      {
        timeout: 3000
      }
    );
  };

  const getAbortData = async () => {
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const res = await axios.get(
      `https://run.mocky.io/v3/0a4e2970-39b4-4bb5-9a12-06e47408e2a3?mocky-delay=10000ms`,
      {
        signal
      }
    );
    setResult({ ...result, abort: JSON.stringify(res) });
  };

  const onAbort = () => {
    abortRef.current.abort();
  };

  return (
    <div className="App">
      <h1>Axios Demo</h1>
      <div className='demo-wrap'>
        <Card text="Axios.get" onClick={getData} result={result.get} showResult />
        <Card text="拦截器处理返回状态码" onClick={getRedirectData} />
        <Card text="3s超时中断，打开network查看接口状态" onClick={getTimeoutData} />
        <Card
          text="手动中断测试，接口请求10s"
          onClick={getAbortData}
          result={result.abort}
          showResult
        >
          <button onClick={onAbort}>中断</button>
        </Card>
      </div>
    </div>
  );
}

export default App;
