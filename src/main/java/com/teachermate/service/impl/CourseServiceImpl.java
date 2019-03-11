package com.teachermate.service.impl;

import com.teachermate.dao.CourseDao;
import com.teachermate.pojo.Course;
import com.teachermate.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseDao courseDao;

    @Override
    public Integer create(Course course) {
        return courseDao.create(course);
    }

    @Override
    public void delete(Integer id) {
        courseDao.delete(id);
    }

    @Override
    public Course select_one(Integer id) {
        if (id == null) {
            return null;
        }
        return courseDao.select_one(id);
    }

    @Override
    public List<Course> select_list() {
        return courseDao.select_list();
    }

    @Override
    public List<Course> select(Course course) {
        return courseDao.select(course);
    }
}
