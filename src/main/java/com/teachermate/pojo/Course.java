package com.teachermate.pojo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Course {
    private long id;
    private long teacherId;
    private long libraryId;
    private String name;
    private String code;
    private String cover;
    private String term;
    private int capacity;
    private boolean isLocked;
    private int isArchived;
    private boolean isInGroup;
    private int startYear;
    private int endYear;
    private int departmentId;
    private String qrCode;
    private String qrPath;
    private int studentNum;
    private int openRule;
    private int answerDuration;
    private int answerRule;
    private int signDuration;
    private boolean gpsOpen;
    private boolean isPublic;
    private String orgId;
    private String bbCourseId;
    private long overdueDate;
    private List<String> memberIds;
    private int signNum;
    private int discussionNum;
    private int questionNum;
    private int quizNum;
    private int coursewareNum;
    private int awardCount;
    private int assessmentCount;
    private int resourceNum;
    private List<String> assitants;
    private List<String> teams;
    private List<Long> students;
    private StudentInfoConstraints studentInfoConstraints;
}
