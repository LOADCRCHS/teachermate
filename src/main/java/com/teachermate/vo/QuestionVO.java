package com.teachermate.vo;

import lombok.Data;

import java.util.HashMap;

@Data
public class QuestionVO {
    private long id;
    private int type;
    private String code; //T0004
    private String content;//<p>1233333</p>
    private String choice; //"AB"
    private String answer; //
    private String review;
    private HashMap<String, String> answerContent; // {"A":"22","B":"33","C":"44","D":"11"}
    private HashMap<String, String> picContent; //{"A":"","B":"","C":"","D":""}
    private int chapterId;
    private int difficultLevel;
    private int is_item_score;//1
    private int answerOpen;//0
    private int onTime;//1
    private int answerDuration;//5
    private String questionDuration;//NULL
    private int timing;//0
    private String openTime;
    private String lastOpenTime;
    private int answered;//0
    private long teacherId;
    private int strict;//0
    private int case_sensitive;//0
    private int subNum;//0
    private int refNum;//0
    private String summary;//1233333
    private String cover;
}
