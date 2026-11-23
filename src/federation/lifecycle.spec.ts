import { activateRemote } from './lifecycle';
import type { Dispose } from './contract';

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

describe('remote lifecycle', () => {
  it('disposes a completed mount exactly once', async () => {
    const ready = jasmine.createSpy('ready');
    const cleanup = jasmine.createSpy('cleanup');
    const error = jasmine.createSpy('error');
    const stop = activateRemote(async () => cleanup, ready, error, error);
    await tick();
    stop();
    stop();
    await tick();
    expect(ready).toHaveBeenCalledTimes(1);
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('cleans up a mount that resolves after destruction', async () => {
    let finish!: (value: Dispose) => void;
    const pending = new Promise<Dispose>((resolve) => { finish = resolve; });
    const ready = jasmine.createSpy('ready');
    const cleanup = jasmine.createSpy('cleanup');
    const error = jasmine.createSpy('error');
    const stop = activateRemote(() => pending, ready, error, error);
    stop();
    finish(cleanup);
    await tick();
    expect(ready).not.toHaveBeenCalled();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(error).not.toHaveBeenCalled();
  });

  it('reports mounting and asynchronous disposal failures', async () => {
    const failure = new Error('remote failed');
    const error = jasmine.createSpy('error');
    activateRemote(() => Promise.reject(failure), () => {}, error, error);
    const stop = activateRemote(async () => () => Promise.reject(failure), () => {}, error, error);
    await tick();
    stop();
    await tick();
    expect(error).toHaveBeenCalledTimes(2);
    expect(error).toHaveBeenCalledWith(failure);
  });
});
