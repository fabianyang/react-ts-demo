import {observable} from 'mobx';


// var timer1: string;

class TimeCounter {
    @observable timer = 0;

    constructor() {
        // timer1 = 1;
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }
}

export default TimeCounter;