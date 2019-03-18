package com.teachermate.pojo;

import com.teachermate.util.QuestionType;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
public class Question {
    private Integer id;
    /**
     * 单选题 type 1
     * 多选题 2
     * 填空题 3
     * 是非题 4
     * 简答题 5
     */
    private Integer type;
    private Integer course_id;
    private Integer chapter_id;
    private Integer difficult_level;
    private String content;
    private String[] answers; //BCD
    private String[] answer_type; //answer_type%5B%5D=0&answer_type%5B%5D=1
    private String answer_duration;
    //    private HashMap<String, String> answer_content; // {"0":"12","1":"123","2":"1212","3":"111","4":"121211"}
    //    private HashMap<String, String> pic_content; //{"0":"","1":"","2":"","3":"","4":""}
    private String answer_content; // {"0":"12","1":"123","2":"1212","3":"111","4":"121211"}
    private String pic_content; //{"0":"","1":"","2":"","3":"","4":""}
    private Integer teacherId;
    private boolean strict;
    private boolean case_sensitive;
    private String code;

    final static String[] QUESTION_TYPE = {"T0001", "T0002", "T0003", "T0004", "T0005"};

    public void setCode(Integer type) {
        this.code = QUESTION_TYPE[type - 1];
    }
}
