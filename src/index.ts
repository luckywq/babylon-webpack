
/*
//
import './styles/index.scss';
import 'pepjs';

import Game from './components/game';

window.addEventListener('DOMContentLoaded', () => {
    const game = new Game('#renderCanvas');
    game.doRender();
});

*/

import './styles/index.scss';
import 'pepjs';
import Learn from './components/iframe';
window.addEventListener('DOMContentLoaded', () => {
    const learn = new Learn('#renderCanvas');
    learn.render();
})
