package com.teachermate.pojo;

import lombok.Data;

import java.util.List;

@Data
public class Course {
    private Integer id;
    private String name;
    private List<Student> students;
    private List<Team> teams;
}
