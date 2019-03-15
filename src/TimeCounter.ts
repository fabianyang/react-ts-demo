import {observable} from 'mobx';


// var timer1: string;
/**
 * 复制 color
 * @param from clone from
 * @returns 返回 new instanced Color
* ```
* let a:color=color.clone(color.Red);
* ```
 */
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