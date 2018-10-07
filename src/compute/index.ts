import { Computed, AnyInput } from '../interface';
import Input from '../input/index';
import compute from './compute';
// 起点(单点|多点)
let startInput: AnyInput;
// 前一次的触电
let prevInput: AnyInput;
// 当前触点
let activeInput: AnyInput;
// 多点触碰的起点
let startMutliInput: AnyInput;
export default function (event: any): Computed {
    // 格式化设备输入数据
    const input = new Input(event);
    // 当前输入状态
    const { nativeEventType } = input;
    // [Start]
    if ('start' === nativeEventType) {
        // 上一步的触点
        // prevInput = undefined;
        // 当前点
        activeInput = input;
        // 起点(单点|多点)
        startInput = new Input(event);
        // 起点(多点)
        if (1 < input.pointerLength) {
            startMutliInput = input;
        } else {
            // 如果出现了单点, 那么之前的多点起点记录失效
            startMutliInput = undefined;
        }
    } else {
        // 读取上一点
        prevInput = activeInput;
        activeInput = input;
    }
    const computed = compute({
        nativeEventType,
        startMutliInput,
        startInput,
        prevInput,
        input,
    });

    return { ...input, ...computed, nativeEventType };
}; 