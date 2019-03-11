package com.teachermate.pojo;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Course {
    private Integer id;
    private String name;
    private List<Student> students = new ArrayList<>();
    private List<Team> teams = new ArrayList<>();
}
