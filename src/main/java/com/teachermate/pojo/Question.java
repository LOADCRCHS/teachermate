package com.teachermate.pojo;

import lombok.Data;

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
    private String answer_content; // {"0":"12","1":"123","2":"1212","3":"111","4":"121211"}
    private String pic_content; //{"0":"","1":"","2":"","3":"","4":""}
    private Integer teacherId;
    private boolean strict;
    private boolean case_sensitive;
    private String code;

    private Integer question_id;
    private String serial_number;
    private Integer answer_count;
    private Integer count_ratio;
    private Integer is_answered;
    private boolean is_item_score;
    private Integer library_id;

    private String describe;
    private String question_open;
    private String answer_open;
    private String paper_id;
    private String review;


    public Integer getStrict() {
        return this.strict ? 1 : 0;
    }

    public Integer getCase_sensitive() {
        return this.case_sensitive ? 1 : 0;
    }

    public Integer getIs_item_score() {
        return this.is_item_score ? 1 : 0;
    }

    public void setIs_item_score(boolean is_item_score) {
        this.is_item_score = is_item_score;
    }


}
