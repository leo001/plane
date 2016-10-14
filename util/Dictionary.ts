 /**
     * 字典
     * TypeScript字典中的Key只能为String 或者 Number
     * 使用方法：
     * 例如有个学生类Student,学生的学号为Number类型,需要将N个学生实例按照学号为Key，实例为Value的形式存入Dictionary
     * 定义：var dict: Dictionary<Student> = {};
     * 存入：dict[201038889066] = stu1;    //stu1是一个Student实例
     * 读取：var value = dict[201038889066];
     * 遍历：        for(var dicKey in dict)
     *                        console.log("key=" + dicKey + "value=" + dict[dicKey]);
     */
    export interface Dictionary<TValue> {
        [key: string]: TValue;
        [key: number]: TValue;
    }
