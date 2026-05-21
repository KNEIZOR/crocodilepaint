import { api } from 'shared/api/api';

export function postCanvas(canvas: HTMLCanvasElement | null, id: string | undefined) {
    api
        .post(`/image?id=${id}`, {
            img: canvas?.toDataURL(),
        })
        .then((res) => console.log(res.data));
}
