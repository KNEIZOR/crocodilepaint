import { routePath } from 'shared/config/routeConfig/routeConfig';
import { IChangeCardConfig } from './types';

export const changeCardConfig: IChangeCardConfig[] = [
    {
        title: 'PAINT ONLINE',
        text: 'Игра где вы со своими друзьями можете рисовать один рисунок',
        link: `${routePath.paint_online}/f${(+new Date()).toString(16)}`,
        classname: 'paint'
    },
    {
        title: 'CROCODILE',
        text: 'Игра где вы со своими друзьями можете рисовать один рисунок',
        link: `${routePath.crocodile}/f${(+new Date()).toString(16)}`,
        classname: 'crocodile'
    },
    {
        title: 'CROCODILE2',
        text: 'Игра где вы со своими друзьями можете рисовать один рисунок',
        link: `${routePath.crocodile_2players}/f${(+new Date()).toString(16)}`,
        classname: 'crocodile2'
    },
];
