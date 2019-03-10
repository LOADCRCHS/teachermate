package com.teachermate.service;


import com.teachermate.pojo.Course;

import java.util.List;

public interface CourseService {
    Integer create(Course course);

    void delete(Integer id);

    Course select_one(Integer id);

    List<Course> select_list();

    List<Course> select(Course course);
}
