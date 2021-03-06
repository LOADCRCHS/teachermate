package com.teachermate.dao;

import com.teachermate.pojo.Course;
import com.teachermate.pojo.Course;

import java.util.List;

public interface CourseDao {
    Integer create(Course course);

    void delete(Integer id);

    void close(Integer id);

    Course select_one(Integer id);

    List<Course> select_list();

    List<Course> select(Course course);
}
