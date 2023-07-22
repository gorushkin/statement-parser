export type Request<T, K> = (args: T) => Promise<Response<K>>;

export type Response<T> = { data: T; message: string; ok: true } | { error: string; ok: false };
