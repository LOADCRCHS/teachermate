package com.teachermate.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Student {
    private Integer courseId;

    private long id;
    private String name;
    private String avatar;
    private String studNo;
    private int teamId;
    private String teamName;
    private int isHidden;
    private String clazz;
    private String comment;
    private String email;
    private String gender;
    private String QQ;
    private Date birthday;
    private String phone;
    private String introduction;
    private String degree;
    private String profession;
    private String location_id;
    private String class_name;
    private String department_name;
    private String college_name;
    private String specialty;
    private int status;
    private int deleted;

}
